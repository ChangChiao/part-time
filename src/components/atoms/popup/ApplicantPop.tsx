import { toast } from 'react-toastify';

import { useChat } from '@/hooks/useChat';
import { usePopupContext } from '@/hooks/usePopupContext';
import { pickStaff } from '@/utils/http/task';
import Avatar from '../Avatar';
import PopupTemplate from './PopupTemplate';

type ApplicantProps = {
  applicantList: User.UserInfo[];
  taskId: string;
};
const ApplicantPop = ({ applicantList, taskId }: ApplicantProps) => {
  const { showPopupName, setPopup } = usePopupContext();
  const { sendMessage } = useChat();
  const handleClick = async (id: string) => {
    const params = {
      taskId,
      staff: id,
    };
    const result = await pickStaff(params);
    if (result.status === 'success') {
      toast(result.message);
      setPopup('');
    }
  };

  // const sendMessage = async (id: string) => {
  //   if (pending) return;
  //   const sendData = {
  //     receiver: id,
  //   };
  //   try {
  //     setPending(true);
  //     const res = await getRoomId(sendData);
  //     const { roomId, name, avatar } = res.data;
  //     handleRoom({ roomId, name, avatar });
  //   } catch (error) {
  //     console.log('error', error);
  //   } finally {
  //     setPending(false);
  //   }
  // };

  return (
    <>
      {showPopupName === 'applicant' && (
        <PopupTemplate titleName="所有申請者">
          <ul>
            {applicantList.map((item: User.UserInfo) => (
              <li
                className="flex items-center justify-between py-2"
                key={item._id}
              >
                <div className="flex items-center">
                  <Avatar isVip={item.isVip} image={item.avatar} />
                  <span className="pl-2">{item.name}</span>
                </div>
                <div className="flex">
                  <button
                    className="w-16 mr-2 btn"
                    onClick={() => handleClick(item._id)}
                  >
                    選擇
                  </button>
                  <button
                    className="w-16 btn bg-cyan-700"
                    onClick={() => sendMessage(item._id)}
                  >
                    私訊
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </PopupTemplate>
      )}
    </>
  );
};

export default ApplicantPop;
