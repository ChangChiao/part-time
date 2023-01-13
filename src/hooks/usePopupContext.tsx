import { createContext, useContext, useEffect, useState } from 'react';

type PopupType = {
  showPopupName: string;
  setPopup: (value: string) => void;
};

const Context = createContext<PopupType>({} as PopupType);

export const PopupContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [showPopupName, setPopup] = useState<string>('');
  useEffect(() => {
    console.log('showPopupName', showPopupName);
  }, [showPopupName]);
  return (
    <Context.Provider value={{ showPopupName, setPopup }}>
      {children}
    </Context.Provider>
  );
};

export const usePopupContext = () => {
  const popupContext = useContext(Context);
  return popupContext;
};
