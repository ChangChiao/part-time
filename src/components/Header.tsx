import { useMemo } from 'react';

import clsx from 'clsx';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';

import { MENU } from '@/config';
import { useMenuContext } from '@/hooks/useMenuContext';
import { useSign } from '@/hooks/useSign';
import { userState } from '@/store/user';

import Avatar from './atoms/Avatar';

const Header = () => {
  const { isShowMenu, setShowMenu } = useMenuContext();
  const { data: session } = useSession();
  const { signIn, signOut, handleClickMenu, toSetPage } = useSign();
  console.log('session', session);
  const [user] = useRecoilState(userState);
  // const isShowMenu = useRef(false);
  const router = useRouter();
  const menuList = useMemo(() => {
    if (user.isVip) {
      return MENU.filter((item) => item.id !== 'vip');
    }
    return MENU;
  }, [user]);
  const handClick = () => {
    setShowMenu(!isShowMenu);
  };
  return (
    <header className="fixed top-0 z-50 flex items-center w-full h-16 px-4 text-white md:static bg-cyan-900">
      <Link href="/">
        <Image
          className="cursor-pointer"
          width={64}
          height={64}
          src={`/assets/logo/logo_task.png`}
          alt=""
        />
      </Link>

      <ul className="flex-1 hidden pl-10 md:flex">
        {menuList.map((item) => (
          <li
            onClick={() => handleClickMenu(item)}
            className={clsx(
              'mr-4 cursor-pointer pb-1 hover:text-slate-200',
              router.pathname === item.link && 'border-b border-white'
            )}
            key={item.text}
          >
            {item.text}
          </li>
        ))}
      </ul>

      <div className="items-center hidden md:flex">
        {user._id ? (
          <>
            <div
              className="flex items-center mr-6 cursor-pointer"
              onClick={toSetPage}
            >
              <Avatar
                isVip={user?.isVip}
                image={user?.avatar || '~/assets/avatar/1.png'}
              />
              <span className="pl-3">{user?.name ?? 'userName'}</span>
            </div>
            <button className="cursor-pointer" onClick={signOut}>
              登出
            </button>
          </>
        ) : (
          <button className="cursor-pointer" onClick={signIn}>
            登入
          </button>
        )}
      </div>
      <input type="checkbox" className="hidden peer" />
      <div
        onClick={handClick}
        className={clsx(
          isShowMenu && 'active',
          'mobile w-[40px] h-[40px] absolute top-0 right-[10px] cursor-pointer block md:hidden items-center justify-center'
        )}
      >
        <span className="hamburg"></span>
      </div>
      <style jsx>
        {`
          .mobile .hamburg {
            @apply bg-white w-full h-[3px] absolute top-[30px];
          }
          .hamburg::before {
            @apply -top-[12px];
          }
          .hamburg::after {
            @apply -bottom-[12px];
          }
          .mobile.active .hamburg {
            @apply rotate-45;
          }
          .mobile.active .hamburg::before {
            @apply rotate-90 top-0;
          }
          .mobile.active .hamburg::after {
            @apply rotate-90 bottom-0;
          }
          .hamburg::before,
          .hamburg::after {
            @apply bg-white content-[''] absolute w-full h-[3px] ease-in-out duration-[50];
          }
        `}
      </style>
    </header>
  );
};

export default Header;
