import { useMemo, useState } from 'react';

// import { usePopupContext } from '../../hooks/usePopupContext';
import SignIn from '../../SignIn';
import SignUp from '../../SignUp';
import Tab from '../Tab';
import PopupTemplate from './PopupTemplate';

const tabList = [
  { id: 0, name: '登入' },
  { id: 1, name: '註冊' },
];

const SignInPop = () => {
  const [tab, setTab] = useState<number>(0);
  const popTitle = useMemo(() => {
    return tabList.find((item) => item.id === tab)?.name as string;
  }, [tab]);
  // const { showPopupName } = usePopupContext();
  return (
    <>
      <PopupTemplate titleName={popTitle}>
        {tab === 0 && <SignIn />}
        {tab === 1 && <SignUp />}
        <div className="absolute left-0 right-0 bottom-5">
          <Tab
            style="justify-center"
            tab={tab}
            setTab={setTab}
            tabList={tabList}
          />
        </div>
      </PopupTemplate>
    </>
  );
};

export default SignInPop;
