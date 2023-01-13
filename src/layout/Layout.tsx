import React, { useEffect, useCallback } from 'react';

import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';

import Loading from '@/components/atoms/Loading';
import SignInPop from '@/components/atoms/popup/SignInPop';
// import TaskAddPop from '@/components/atoms/popup/TaskAddPop';
import VipPopup from '@/components/atoms/popup/VipPopup';
import ChatContainer from '@/components/chat/ChatContainer';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Menu from '@/components/Menu';
import { useLoadingContext } from '@/hooks/useLoadingContext';
import { useMenuContext } from '@/hooks/useMenuContext';
import { usePopupContext } from '@/hooks/usePopupContext';
import { userState } from '@/store/user';
import { getUser } from '@/utils/http/user';

const Layout = ({ children }: { children: React.ReactNode }) => {
  // const [isShowMenu, setShowMenu] = useState<boolean>(false);
  const { showPopupName } = usePopupContext();
  const { isShowLoading } = useLoadingContext();
  const { isShowMenu } = useMenuContext();
  const router = useRouter();
  const [, setUser] = useRecoilState(userState);
  // const router = useRouter();
  useEffect(() => {
    if (isShowMenu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isShowMenu]);
  const queryUser = useCallback(async () => {
    try {
      console.log('router', router);
      const result = await getUser();
      const { status, data } = result;
      if (status === 'success') {
        setUser(data);
      }
    } catch (error) {
      const err = error as AxiosError;
      if (err?.response?.status === 401 && router.asPath !== '/') {
        console.log('gogog');
        router.push('/');
      }
    }
  }, [setUser]);

  useEffect(() => {
    queryUser();
    console.log('router.asPath', router.asPath);
  }, [queryUser]);

  const renderComp = () => {
    switch (showPopupName) {
      case 'signIn':
        return <SignInPop />;
      case 'upgrade':
        return <VipPopup />;
      default:
        return null;
    }
  };
  return (
    <div className="h-screen">
      <Header />
      {isShowMenu && <Menu />}
      <main className="min-h-[calc(100%-150px)] mt-20 md:mt-0">{children}</main>
      <Footer />
      {renderComp()}
      <ChatContainer />
      {isShowLoading && <Loading />}
    </div>
  );
};

export default Layout;
