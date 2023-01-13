import { useRecoilState } from 'recoil';

import ChatRoom from '@/components/chat/ChatRoom';
import { roomState } from '@/store/room';

export const ChatRoomPage = () => {
  const [room] = useRecoilState(roomState);
  return <ChatRoom {...room?.[0]} />;
};

export default ChatRoomPage;
