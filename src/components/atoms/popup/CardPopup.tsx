import { useMemo } from 'react';

import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { FiSend } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { useRecoilState } from 'recoil';

import { useChat } from '@/hooks/useChat';

import { usePopupContext } from '@/hooks/usePopupContext';
import { userState } from '@/store/user';
import { applyTask } from '@/utils/http';
import { removeFavorite, addFavorite } from '@/utils/http/collect';
import { getUser } from '@/utils/http/user';
import Avatar from '../Avatar';
import City from '../City';
import Expire from '../Expire';
import Reward from '../Reward';

const CardPopup = ({
  _id,
  title,
  description,
  cover = '/assets/images/image-equilibrium.jpg',
  author,
  reward,
  city,
  status,
  expire,
  unit,
}: Task.TaskDetail) => {
  const [user, setUser] = useRecoilState(userState);
  const { setPopup } = usePopupContext();
  const { sendMessage } = useChat();
  const closeTaskDetail = () => {
    setPopup('');
  };
  const handleClick = async () => {
    if (!_id) return;
    const res = await applyTask(_id);
    if (res.status === 'success') {
      toast(res.message);
      closeTaskDetail();
    }
  };

  const isFavorite = useMemo(() => {
    const idList = user.collect && user.collect.map((item) => item._id);
    console.log('idList', idList);

    return idList && idList.includes(_id);
  }, [user, _id]);

  const isInteractive = useMemo(() => {
    return user._id && status === 0;
  }, [user, status]);

  const handleFavorite = async () => {
    let result = null;
    if (isFavorite) {
      result = await removeFavorite(_id);
    } else {
      result = await addFavorite(_id);
    }
    if (result) {
      const res = await getUser();
      if (res.status === 'success') {
        setUser(res.data);
      }
      toast(result.message);
    }
  };

  return (
    <div className="fixed top-0 left-0 z-50 w-full h-full transition-all duration-300 ease-in-out">
      <div className="mask" onClick={closeTaskDetail}></div>
      <div className="absolute h-[800px] top-0 bottom-0 left-0 right-0 m-auto p-4 bg-blue-500 shadow-3xl w-96 rounded-xl">
        <div className="h-[350px] overflow-hidden">
          <img className="w-full" src={cover} alt="cover" />
        </div>
        <div className="flex items-center justify-between">
          <h3 className="py-2 text-xl font-semibold text-white break-words">
            {title}
          </h3>
          <div className="flex justify-end pt-2 text-3xl text-red-500">
            {isFavorite ? (
              <AiFillHeart
                className="cursor-pointer"
                onClick={handleFavorite}
              />
            ) : (
              <AiOutlineHeart
                className="cursor-pointer"
                onClick={handleFavorite}
              />
            )}
          </div>
        </div>
        <div className="">
          <div className="leading-9 text-gray-400  h-[150px] overflow-y-scroll break-words scrollbar scrollbar-thumb-gray-900 scrollbar-track-gray-100">
            {description}
          </div>
          <div className="flex justify-end py-2 text-sm font-bold text-secondary">
            <Reward reward={reward} unit={unit} />
          </div>
          <div className="flex items-center justify-between pb-10">
            <div className="flex items-center">
              <Avatar image={author.avatar} isVip={author.isVip} />
              <span className="pl-2 text-gray-400"> {author?.name}</span>
            </div>
            {isInteractive && (
              <button
                onClick={() => sendMessage(author._id)}
                className="flex items-center justify-center w-28 btn"
              >
                <FiSend className="mr-2" />
                傳送訊息
              </button>
            )}
          </div>
          <div className="flex items-center justify-between">
            <Expire expire={expire} />
            <span className="flex items-center text-gray-400">
              <City city={city} />
            </span>
          </div>
          {isInteractive && (
            <div className="flex items-center justify-center pt-4">
              <button className="bg-gray-500 btn" onClick={closeTaskDetail}>
                取消
              </button>
              <button onClick={handleClick} className="ml-2 btn">
                我要接任務
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardPopup;
