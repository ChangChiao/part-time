import router from 'next/router';
import { toast } from 'react-toastify';
import { useRecoilState } from 'recoil';

import { roomState } from '@/store/room';
import { userState } from '@/store/user';
import { deleteAllCookies } from '@/utils';

import { useMenuContext } from './useMenuContext';
import { usePopupContext } from './usePopupContext';

export const useSign = () => {
  const { setShowMenu } = useMenuContext();
  const [, setRoom] = useRecoilState(roomState);
  const [user, setUser] = useRecoilState(userState);
  const { setPopup } = usePopupContext();

  const handleClose = () => {
    setShowMenu(false);
  };

  const signOut = () => {
    deleteAllCookies();
    setUser({});
    setRoom([]);
    toast('登出成功');
    if (router.pathname !== '/') {
      router.push('/');
    }
    handleClose();
  };

  const signIn = () => {
    setPopup('signIn');
    handleClose();
  };

  const toSetPage = () => {
    router.push('/userInfo');
    handleClose();
  };

  const handleClickMenu = ({ link, id }: Menu.MenuItem) => {
    if (!user?._id) {
      toast('請先登入!');
      return;
    }
    if (id === 'vip') {
      setPopup('upgrade');
      return;
    }
    router.push(link);
    handleClose();
  };

  return {
    signOut,
    signIn,
    handleClickMenu,
    toSetPage,
  };
};
