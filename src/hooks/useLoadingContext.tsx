import { createContext, useContext, useState } from 'react';

type LoadingType = {
  isShowLoading: boolean;
  setLoading: (value: boolean) => void;
};

const Context = createContext<LoadingType>({} as LoadingType);

export const LoadingContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isShowLoading, setLoading] = useState<boolean>(false);
  return (
    <Context.Provider value={{ isShowLoading, setLoading }}>
      {children}
    </Context.Provider>
  );
};

export const useLoadingContext = () => {
  const loadingContext = useContext(Context);
  return loadingContext;
};
