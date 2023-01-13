import { RefObject, useEffect, useRef } from 'react';

import { FiSend } from 'react-icons/fi';
import { toast } from 'react-toastify';

type ChatRoomInputBoxProps = {
  sendMessage: (msg: string) => void;
  userTyping: (key: string) => void;
};

const ChatRoomInputBox = ({
  sendMessage: sendMessageParent,
  userTyping,
}: ChatRoomInputBoxProps) => {
  const inputBox = useRef() as RefObject<HTMLDivElement>;
  const sendMessage = () => {
    let value = inputBox.current!.innerText;
    value = value.replace(/\n/g, '');
    if (value.length === 0) {
      toast.error('請輸入內容再送出訊息');
      return;
    }
    if (value.length > 100) {
      toast.error('輸入內容長度超過上限');
      return;
    }
    sendMessageParent(value);
    inputBox.current!.innerText = '';
    inputBox.current!.focus();
  };
  useEffect(() => {
    const keyEvent = new KeyboardEvent('keyup', {
      bubbles: true,
    });

    inputBox.current!.dispatchEvent(keyEvent);
    inputBox.current!.addEventListener('keypress', (e) => {
      userTyping(e.key);
      if (e.key === 'Enter') {
        sendMessage();
      }
    });
  }, []);
  return (
    <div className="fixed bottom-0 left-0 flex items-center justify-between w-full p-2 bg-slate-700 lg:absolute">
      <div
        className="bg-white min-h-[32px] max-h-36 flex items-center rounded-2xl w-11/12 break-all px-2 outline-none overflow-hidden"
        contentEditable="true"
        id="test"
        role="textbox"
        spellCheck="true"
        tabIndex={0}
        ref={inputBox}
      ></div>
      <FiSend onClick={sendMessage} className="text-white cursor-pointer" />
    </div>
  );
};

export default ChatRoomInputBox;
