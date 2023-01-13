import { AiOutlinePlus } from 'react-icons/ai';
import { toast } from 'react-toastify';
import { useRecoilState } from 'recoil';

import { usePopupContext } from '@/hooks/usePopupContext';
import { userState } from '@/store/user';

const AddButton = () => {
  const [user] = useRecoilState(userState);
  const { setPopup } = usePopupContext();
  const handleClick = () => {
    if (!user?._id) {
      toast('請先登入!');
      return;
    }
    setPopup('taskAdd');
  };
  return (
    <button
      onClick={handleClick}
      className="fixed z-20 flex items-center justify-center w-20 h-20 text-3xl text-white rounded-full bottom-5 right-5 bg-cyan-900"
    >
      <AiOutlinePlus />
    </button>
  );
};

export default AddButton;
