import { BsFillSuitHeartFill } from 'react-icons/bs';
import { MdOutlineAttachMoney } from 'react-icons/md';

import { formateTime } from '@/utils';

const FavoriteItem = ({
  title,
  description,
  cover = '/assets/images/image-equilibrium.jpg',
  reward,
  status,
  expire,
}: Task.TaskDetail) => {
  return (
    <div className="relative rounded-lg flex text-white shadow-lg min-h-[160px] p-4 bg-slate-800">
      {status === 1 && <div className="card-mask">已結束</div>}
      {status === 2 && <div className="card-mask">已過期</div>}
      <button className="absolute text-3xl top-5 right-10">
        <BsFillSuitHeartFill />
      </button>
      <span className="absolute right-10 bottom-5">{formateTime(expire)}</span>
      <div className="w-32">
        <img src={cover} alt="" />
      </div>
      <div className="w-3/4 pl-4 info">
        <div className="flex"></div>
        <h3 className="text-xl font-bold">{title}</h3>
        <span className="flex items-center text-secondary">
          <MdOutlineAttachMoney />
          {reward}
        </span>
        <p className="py-2">{description}</p>
      </div>
    </div>
  );
};

export default FavoriteItem;
