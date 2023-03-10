import { useState, useRef, useEffect } from 'react';

import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import { AiOutlineClose, AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { MdArrowBackIosNew } from 'react-icons/md';
import { toast } from 'react-toastify';
import { useRecoilState } from 'recoil';
import io, { Socket } from 'socket.io-client';

import { BACKEND_URL } from '@/config';
import { roomState } from '@/store/room';
import { userState } from '@/store/user';
import { getCookie } from '@/utils/cookie';

import Avatar from '../atoms/Avatar';
import ChatLoading from './ChatLoading';
import ChatRoomInputBox from './ChatRoomInputBox';
import ChatRoomMessage from './ChatRoomMessage';

let socket: Socket | null = null;

const ChatRoom = ({ roomId, name, avatar, isOpen }: Chat.RoomState) => {
  const navigate = useNavigate();
  const [room, setRoom] = useRecoilState(roomState);
  let timer: ReturnType<typeof setTimeout>;
  const msgEl = useRef<HTMLDivElement>(null);
  // const socket = useRef<Socket>();
  const [user] = useRecoilState(userState);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [typingFlag, setTypingFlag] = useState<boolean>(false);
  // const [flagHistory, setFlagHistory] = useState<boolean>(false);
  const [messageList, setMessageList] = useState<Chat.Msg[]>([]);
  const messageRef = useRef(messageList);
  // const latestFlagHistory = useRef(flagHistory);
  const [newMsgFlag, setNewMsgFlag] = useState<boolean>(false);
  const fetchAllFlag = useRef<boolean>(false);
  const scrollRecord = useRef<number>(0);
  const latestFlagHistory = useRef<boolean>(false);
  const latestUser = useRef<Partial<User.UserInfo>>(user);

  useEffect(() => {
    latestUser.current = user;
  }, [user]);

  useEffect(() => {
    console.warn('messageList', messageList);
  }, [messageList]);

  const getHistory = () => {
    if (fetchAllFlag.current) return;
    const info = {
      lastTime: messageRef.current?.[0]?.createdAt,
    };
    setIsLoading(true);
    socket!.emit('history', info);
  };

  const endTyping = () => {
    socket!.emit('typing', false);
  };

  const userTyping = (key: string) => {
    if (key === 'Enter') {
      endTyping();
      return;
    }
    socket!.emit('typing', true);
    clearTimeout(timer);
    timer = setTimeout(() => {
      endTyping();
    }, 1500);
  };

  const sendMessage = (msg: string) => {
    const sendMsg = {
      message: msg,
      sender: user._id,
    };
    socket!.emit('chatMessage', sendMsg);
  };

  const scrollBottom = async () => {
    setNewMsgFlag(false);
    msgEl.current!.scrollTop = msgEl.current!.scrollHeight;
  };

  const closeRoom = () => {
    const keepRoom = room.filter(
      (item: Chat.RoomState) => item.roomId !== roomId
    );
    setRoom(keepRoom);
  };

  const handleOpen = () => {
    const updatedRoom = room.map((item: Chat.RoomState) => {
      if (item.roomId === roomId) {
        return {
          ...item,
          isOpen: !item.isOpen,
        };
      }
      return item;
    });
    setRoom(updatedRoom);
  };

  const detectTop = () => {
    msgEl.current!.addEventListener(
      'scroll',
      () => {
        if (msgEl.current?.scrollTop === 0) {
          scrollRecord.current = msgEl.current!.scrollHeight;
          console.log('getHistory');
          getHistory();
        }
      },
      false
    );
  };

  const scrollToCorrect = async () => {
    if (!msgEl.current) return;
    msgEl.current.scrollTop = msgEl.current.scrollHeight - scrollRecord.current;
  };

  const toPrevPage = () => {
    navigate(-1)
    setRoom([]);
  };

  useEffect(() => {
    console.warn('useEffect========');

    const token = getCookie('token');
    if (!token) {
      toast.error('??????????????????');
      navigate('/');
    }
    // socket?????????
    socket = io(`${BACKEND_URL}/chat`, {
      query: {
        token,
        room: roomId,
      },
      auth: {
        token,
      },
    });
    console.warn('socket', socket);

    // ????????????
    socket!.on('connect', () => {
      console.warn(' ????????????');
      // getHistory();
    });

    // ???????????????????????????
    socket!.on('chatMessage', (msg) => {
      console.warn('???????????????????????????', msg);
      messageRef.current = [...messageRef.current, msg];
      setMessageList(messageRef.current);

      if (!msgEl.current) return;
      if (
        msgEl.current.scrollHeight - msgEl.current.scrollTop >
        msgEl.current.clientHeight
      ) {
        if (latestUser.current?._id !== msg.sender) {
          setNewMsgFlag(true);
        }
      } else {
        scrollBottom();
      }
    });

    // ??????????????????
    socket!.on('history', (msgList) => {
      setIsLoading(false);
      console.warn('?????????????????????', msgList);
      messageRef.current = [...msgList, ...messageRef.current];
      setMessageList(messageRef.current);
      if (msgList.length < 30) {
        fetchAllFlag.current = true;
      }
      if (!latestFlagHistory.current) {
        scrollBottom();
        latestFlagHistory.current = true;
        console.log('toptoptoptop');
      } else {
        console.log('scrollToCorrect');

        scrollToCorrect();
      }
      // ????????????
    });
    socket!.on('typing', (boolean) => {
      setTypingFlag(boolean);
    });

    // ????????????
    socket!.on('error', (error) => {
      toast.error(error);
      navigate('/');
    });

    detectTop();

    return () => {
      socket!.emit('leaveRoom', roomId);
      socket!.off();
      socket!.disconnect();
      clearTimeout(timer);
    };
  }, []);

  return (
    <div
      className={clsx(
        'pointer-events-auto lg:ml-4 lg:w-[338px] overflow-hidden h-screen lg:h-[455px] rounded-tl-lg rounded-tr-lg relative',
        { 'lg:h-14': !isOpen }
      )}
    >
      <div className="flex items-center justify-between px-2 py-2 overflow-hidden text-white bg-cyan-800 h-14 lg:px-4">
        <div className="flex items-center">
          <MdArrowBackIosNew
            onClick={toPrevPage}
            className="block w-8 h-8 mr-2 text-white lg:hidden"
          />
          <Avatar image={avatar} />
          <span className="pl-4 font-bold">{name}</span>
          {typingFlag && (
            <span className="text-xs text-gray">?????????????????????...</span>
          )}
        </div>
        <div className="hidden lg:flex">
          {isOpen ? (
            <AiOutlineMinus
              className="w-6 h-6 cursor-pointer hover:opacity-50"
              onClick={handleOpen}
            />
          ) : (
            <AiOutlinePlus
              className="w-6 h-6 cursor-pointer hover:opacity-50"
              onClick={handleOpen}
            />
          )}
          <AiOutlineClose
            className="w-6 h-6 text-white cursor-pointer hover:opacity-50"
            onClick={closeRoom}
          />
        </div>
      </div>
      {isOpen && (
        <div
          id="messageContainer"
          ref={msgEl}
          className="h-[calc(100vh-56px-48px)] lg:h-[350px] relative bg-slate-100 overflow-y-auto"
        >
          {messageList.length === 0 && (
            <div className="py-2 text-sm text-center">??????????????????</div>
          )}
          {isLoading && (
            <div className="flex items-center justify-center pt-2 text-slate-700">
              ?????????
              <ChatLoading />
            </div>
          )}
          {messageList.map((message) => (
            <ChatRoomMessage key={message._id} {...message} />
          ))}
        </div>
      )}
      {newMsgFlag && (
        <div
          onClick={scrollBottom}
          className="absolute left-0 w-full h-12 p-2 text-white bg-black bottom-10 bg-opacity-40"
        >
          ???????????????
        </div>
      )}
      {isOpen && (
        <ChatRoomInputBox userTyping={userTyping} sendMessage={sendMessage} />
      )}
    </div>
  );
};

export default ChatRoom;
