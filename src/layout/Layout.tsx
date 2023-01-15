import React, { useEffect, useCallback } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AxiosError } from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

import Loading from "@/components/atoms/Loading";
import SignInPop from "@/components/atoms/popup/SignInPop";
import VipPopup from "@/components/atoms/popup/VipPopup";
import ChatContainer from "@/components/chat/ChatContainer";
import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import Menu from "@/components/Menu";
import { useLoadingContext } from "@/hooks/useLoadingContext";
import { useMenuContext } from "@/hooks/useMenuContext";
import { usePopupContext } from "@/hooks/usePopupContext";
import { userState } from "@/store/user";
import { getUser } from "@/utils/http/user";

const Layout = () => {
  const { showPopupName } = usePopupContext();
  const { isShowLoading } = useLoadingContext();
  const { isShowMenu } = useMenuContext();
  const location = useLocation();
  const navigate = useNavigate();
  const [, setUser] = useRecoilState(userState);
  useEffect(() => {
    if (isShowMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isShowMenu]);
  const queryUser = useCallback(async () => {
    try {
      const result = await getUser();
      const { status, data } = result;
      if (status === "success") {
        setUser(data);
      }
    } catch (error) {
      const err = error as AxiosError;
      if (err?.response?.status === 401 && location.pathname !== "/") {
        console.log("gogog");
        navigate("/");
      }
    }
  }, [setUser]);

  useEffect(() => {
    queryUser();
    console.log("router.asPath", location.pathname);
  }, [queryUser]);

  const renderComp = () => {
    switch (showPopupName) {
      case "signIn":
        return <SignInPop />;
      case "upgrade":
        return <VipPopup />;
      default:
        return null;
    }
  };
  return (
    <div className="h-screen">
      <Header />
      {isShowMenu && <Menu />}
      <main className="min-h-[calc(100%-150px)] mt-20 md:mt-0">
        <Outlet />
        <ToastContainer />
      </main>
      <Footer />
      <ChatContainer />
      {isShowLoading && <Loading />}
    </div>
  );
};

export default Layout;
