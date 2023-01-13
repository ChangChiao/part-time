import { useChat } from '@/hooks/useChat';
import { formateTime } from '@/utils/time';

import Avatar from '../atoms/Avatar';

const ChatRoomListItem = (room: Chat.RoomInfo) => {
  const { name, message: msg, avatar } = room;
  const { handleRoom } = useChat();
  const provideDefault = () => {
    return avatar ?? '/assets/images/user_default.png';
  };
  const goChatRoom = () => {
    handleRoom(room);
  };
  return (
    <li
      onClick={goChatRoom}
      className="rounded-lg bg-cyan-200/20 flex items-baseline p-4 h-[77px] mb-4 justify-between cursor-pointer"
    >
      <div className="flex">
        <Avatar image={provideDefault()} />
        <div className="flex-1 pl-2">
          <p className="font-bold">{name}</p>
          <p className="w-[200px] lg:w-80 h-10 whitespace-nowrap overflow-hidden overflow-ellipsis text-sm text-slate-300 ">
            {msg?.[0]?.message}
          </p>
        </div>
      </div>
      <span className="text-xs text-gray">
        {msg?.[0]?.createdAt && formateTime(msg?.[0]?.createdAt as string)}
      </span>
    </li>
  );
};

export default ChatRoomListItem;
