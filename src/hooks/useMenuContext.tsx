import { createContext, useContext, useState } from 'react';

type PopupType = {
  isShowMenu: boolean;
  setShowMenu: (value: boolean) => void;
};

const Context = createContext<PopupType>({} as PopupType);

export const MenuContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isShowMenu, setShowMenu] = useState<boolean>(false);
  return (
    <Context.Provider value={{ isShowMenu, setShowMenu }}>
      {children}
    </Context.Provider>
  );
};

export const useMenuContext = () => {
  const popupContext = useContext(Context);
  return popupContext;
};
