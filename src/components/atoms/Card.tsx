import clsx from 'clsx';
import { InView } from 'react-intersection-observer';
import { toast } from 'react-toastify';
import { useRecoilState } from 'recoil';

import { usePopupContext } from '@/hooks/usePopupContext';
import { userState } from '@/store/user';

import Avatar from './Avatar';
import City from './City';
import Expire from './Expire';
import Reward from './Reward';
import Watermark from './Watermark';

type CardProps = Task.TaskDetail & {
  setDetail: (value: Task.TaskDetail) => void;
};

const Card = ({
  _id,
  title,
  description,
  cover = '/assets/images/image-equilibrium.jpg',
  author,
  reward,
  status,
  staff,
  city,
  expire,
  unit,
  setDetail,
}: CardProps) => {
  const [user] = useRecoilState(userState);
  const { setPopup } = usePopupContext();
  const handleClick = () => {
    if (!user._id) {
      toast('請先登入');
      return;
    }
    setPopup('card');
    setDetail({
      _id,
      title,
      description,
      cover,
      author,
      reward,
      status,
      staff,
      expire,
      city,
      unit,
    });
  };

  const handleInView = (inView: boolean) => {
    // console.log('Inview---:', inView);
    if (!inView) return;
    const ele = document.getElementById(_id) as HTMLImageElement;
    const { src } = ele.dataset;
    ele.src = src!;
  };

  return (
    // <div
    //   onClick={handleClick}
    //   className="relative p-4 mb-10 bg-blue-500 shadow-3xl w-80 rounded-xl"
    // >
    <InView
      as="div"
      triggerOnce={true}
      onClick={handleClick}
      className={clsx([
        'relative p-4 mx-auto border-2 overflow-hidden border-slate-900/50 bg-blue-500 shadow-3xl w-80 min-h-[400px] rounded-xl',
        status === 0 ? 'cursor-pointer' : 'cursor-default',
      ])}
      onChange={handleInView}
    >
      <div className="w-full">
        <img
          id={_id}
          className="h-[200px] mx-auto"
          data-src={cover}
          alt="cover"
        />
      </div>
      <div className="">
        <h3 className="pt-4 overflow-hidden text-xl font-semibold text-white text-ellipsis">
          {title}
        </h3>
        {/* <div className="leading-9 text-gray-400">{description}</div> */}
        <div className="flex justify-end h-12 text-sm font-bold text-secondary">
          <Reward reward={reward} unit={unit} />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Avatar isVip={author?.isVip} image={author?.avatar} />
            <span className="pl-2 font-bold text-gray-200">{author?.name}</span>
          </div>
          <span className="flex items-center text-white">
            {/* <FaMapMarkerAlt />
            {city} */}
            <City city={city} />
          </span>
        </div>
        <div className="flex justify-end pt-2 text-sm">
          <Expire expire={expire} />
        </div>
      </div>
      <Watermark status={status} />
      <style jsx>
        {`
          .card-mask {
            @apply absolute top-0 left-0 flex items-center justify-center w-full h-full text-xl tracking-wider text-white translate-x-2 bg-black/50;
          }
        `}
      </style>
    </InView>
    // </div>
  );
};

export default Card;
