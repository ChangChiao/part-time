import { useRecoilState } from 'recoil';

import { userState } from '@/store/user';

import Avatar from '../atoms/Avatar';
import City from '../atoms/City';
import Expire from '../atoms/Expire';
import Reward from '../atoms/Reward';
import Watermark from '../atoms/Watermark';

const AcceptedTaskItem = ({
  title,
  description,
  cover = '/assets/images/image-equilibrium.jpg',
  reward,
  author,
  status,
  staff,
  city,
  unit,
  expire,
}: Task.TaskWithContact) => {
  const [user] = useRecoilState(userState);
  return (
    <div className="relative overflow-hidden rounded-lg flex text-white shadow-lg min-h-[160px] p-4 mb-3 bg-slate-800">
      <span className="absolute flex items-center text-cyan-500 right-10 bottom-12">
        <City city={city} />
      </span>
      <div className="absolute right-10 bottom-5">
        <Expire expire={expire} />
      </div>
      <div className="w-32">
        <img src={cover} alt="" />
      </div>
      <div className="w-3/4 pl-4 info">
        <h3 className="text-xl font-bold">{title}</h3>
        <Reward reward={reward} unit={unit} />
        <p className="py-2">{description}</p>
        <div className="flex items-center">
          <Avatar isVip={author?.isVip} image={author?.avatar} />
          <span className="px-2"> {author?.name} </span>
          <div>聯絡方式：{author?.contact}</div>
        </div>
      </div>
      <Watermark status={status} isPick={staff?._id === user._id} />
    </div>
  );
};

export default AcceptedTaskItem;
