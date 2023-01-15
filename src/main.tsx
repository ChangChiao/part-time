import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { RecoilRoot } from "recoil";
import { LoadingContextProvider } from "@/hooks/useLoadingContext";
import { PopupContextProvider } from "@/hooks/usePopupContext";
import { MenuContextProvider } from '@/hooks/useMenuContext';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/global.css';

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RecoilRoot>
      <LoadingContextProvider>
        <PopupContextProvider>
          <MenuContextProvider>
            <App />
          </MenuContextProvider>
        </PopupContextProvider>
      </LoadingContextProvider>
    </RecoilRoot>
  </React.StrictMode>
);
