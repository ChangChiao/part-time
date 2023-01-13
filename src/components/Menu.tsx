import { useMemo } from 'react';

import { useRecoilState } from 'recoil';

import { MENU } from '@/config';
import { useSign } from '@/hooks/useSign';
import { userState } from '@/store/user';

import Avatar from './atoms/Avatar';

const Menu = () => {
  const { signIn, signOut, handleClickMenu, toSetPage } = useSign();
  const [user] = useRecoilState(userState);

  const menuList = useMemo(() => {
    if (user.isVip) {
      return MENU.filter((item) => item.id !== 'vip');
    }
    return MENU;
  }, [user]);

  return (
    <div className="fixed z-50 w-full h-screen p-4 text-white top-16 bg-cyan-900 md:hidden">
      {user._id && (
        <div className="flex items-center py-8" onClick={toSetPage}>
          <Avatar
            isVip={user?.isVip}
            image={user?.avatar || '/assets/avatar/1.png'}
          />
          <span className="pl-3">{user?.name ?? 'userName'}</span>
        </div>
      )}
      <ul className="pt-10">
        {menuList.map((item) => (
          <li
            onClick={() => handleClickMenu(item)}
            className="py-2"
            key={item.id}
          >
            {item.text}
          </li>
        ))}
        <li className="py-2">
          {user._id ? (
            <button onClick={signOut}>登出</button>
          ) : (
            <button onClick={signIn}>登入</button>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Menu;
