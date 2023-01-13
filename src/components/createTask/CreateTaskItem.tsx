import { BiTrash } from 'react-icons/bi';
import { BsPeopleFill } from 'react-icons/bs';

import { usePopupContext } from '@/hooks/usePopupContext';

import Avatar from '../atoms/Avatar';
import City from '../atoms/City';
import Expire from '../atoms/Expire';
import Reward from '../atoms/Reward';
import Watermark from '../atoms/Watermark';

type CreateTaskProps = Task.TaskWithApplicant & {
  setTaskId: (param: string) => void;
};

const CreateTaskItem = ({
  _id,
  title,
  description,
  cover = '/assets/images/image-equilibrium.jpg',
  reward,
  status,
  staff,
  city,
  applicant,
  expire,
  unit,
  setTaskId,
}: CreateTaskProps) => {
  const { setPopup } = usePopupContext();
  const openDelete = async () => {
    setTaskId(_id);
    setPopup('confirm');
  };
  const handleApplicant = () => {
    setTaskId(_id);
    setPopup('applicant');
  };
  return (
    <div className="overflow-hidden relative rounded-lg mb-3 flex text-white shadow-lg min-h-[160px] p-4 bg-slate-800">
      {status === 2 && (
        <div className="absolute top-0 z-10 w-full h-full bg-black/40"></div>
      )}
      {status === 0 && (
        <button
          className="absolute text-3xl top-5 right-10"
          onClick={openDelete}
        >
          <BiTrash />
        </button>
      )}
      <span className="absolute flex items-center text-cyan-500 right-10 bottom-12">
        <City city={city} />
      </span>
      <div className="absolute right-10 bottom-5">
        <Expire expire={expire} />
      </div>
      <div className="w-32 h-32 overflow-hidden">
        <img src={cover} alt="" />
      </div>
      <div className="w-3/4 pl-4 info">
        <h3 className="text-xl font-bold">{title}</h3>
        {/* <div className="flex items-center text-secondary"> */}
        <Reward reward={reward} unit={unit} />
        {/* </div> */}
        <p className="py-2">{description}</p>
        {status === 0 && (
          <div className="flex">
            <div className="flex items-center pr-2">
              <BsPeopleFill className="mr-1" />
              申請人數 {applicant?.length}
            </div>
            {applicant.length > 0 && (
              <button onClick={handleApplicant} className="w-32 btn">
                查看所有申請人
              </button>
            )}
          </div>
        )}
        {status === 1 && (
          <div className="flex items-center">
            <span>合作夥伴</span>
            <div className="flex items-center pl-2">
              <Avatar isVip={staff.isVip} image={staff.avatar} />
              <span className="pl-2">{staff.name}</span>
            </div>
          </div>
        )}
      </div>
      <Watermark status={status} />
    </div>
  );
};

export default CreateTaskItem;
