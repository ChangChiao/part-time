import { useEffect } from 'react';

import { useRecoilState } from 'recoil';

import { roomState } from '@/store/room';

import ChatRoom from './ChatRoom';

const ChatRoomListItem = () => {
  const [room] = useRecoilState(roomState);
  useEffect(() => {
    console.log('room', room);
  }, [room]);
  return (
    <li className="fixed bottom-0 z-50 hidden w-4/5 pointer-events-none right-10 lg:flex lg:items-end lg:justify-end">
      {room.map((item: Chat.RoomState) => (
        <ChatRoom key={item.roomId} {...item} />
      ))}
    </li>
  );
};

export default ChatRoomListItem;
