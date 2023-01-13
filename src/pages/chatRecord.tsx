import { NextPage } from 'next';

import ChatRoomList from '@/components/chat/ChatRoomList';

export const ChatRecord: NextPage = () => {
  return (
    <ul className="text-white">
      <ChatRoomList />
    </ul>
  );
};

export default ChatRecord;
