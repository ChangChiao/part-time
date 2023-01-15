import { useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { AxiosError } from 'axios';
import { useRecoilState } from 'recoil';
import { getQuery } from "@/utils";
import { userState } from '@/store/user';
import { getUser } from '@/utils/http/user';


export const CheckOrder = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [, setUser] = useRecoilState(userState);
  const orderId = getQuery(location.search, 'id');
  const queryUser = async () => {
    try {
      const result = await getUser();
      const { status, data } = result;
      if (status === 'success') {
        setUser(data);
      }
    } catch (error) {
      const err = error as AxiosError;
      if (err?.response?.status === 401 && location.pathname !== '/') {
        navigate('/');
      }
    }
  };
  useEffect(() => {
    queryUser();
  }, []);
  return (
    <div className="flex items-center justify-center h-[calc(100vh-164px)] text-white">
      <div>
        <h2 className="pb-10 text-xl">
          您的VIP訂閱已完成! 訂單編號
          <span className="pl-2 font-bold text-yellow-400">{orderId}</span>
        </h2>
        <img
          className="mx-auto h-36 w-36"
          src="/assets/images/finish.jpg"
          alt=""
        />
      </div>
    </div>
  );
};

export default CheckOrder;
