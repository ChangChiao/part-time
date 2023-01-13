import { toast } from 'react-toastify';

import { usePopupContext } from '../../../hooks/usePopupContext';
import { deleteTask } from '../../../utils/http';
import PopupTemplate from './PopupTemplate';

type ConfirmProps = {
  taskId: string;
  getList: () => void;
};
const ConfirmPop = ({ taskId, getList }: ConfirmProps) => {
  const { showPopupName, setPopup } = usePopupContext();
  const closePopup = () => {
    setPopup('');
  };
  const handleClick = async () => {
    const result = await deleteTask(taskId);
    if (result.status === 'success') {
      toast('刪除成功');
      setPopup('');
      getList();
    }
  };
  return (
    <>
      {showPopupName === 'confirm' && (
        <PopupTemplate isSmall={true} titleName="刪除任務">
          <div className="text-center">
            <p className="py-4">您確定要刪除任務?</p>
            <div className="flex">
              <button className="bg-gray-500 w-36 btn" onClick={closePopup}>
                取消
              </button>
              <button className="ml-2 w-36 btn" onClick={handleClick}>
                確定
              </button>
            </div>
          </div>
        </PopupTemplate>
      )}
    </>
  );
};

export default ConfirmPop;
