import { useEffect, useState } from 'react';

import { useRecoilState } from 'recoil';

import { roomListState } from '@/store/room';
import { getChatRecord } from '@/utils/http/chat';

import Loading from '../atoms/Loading';
import ChatRoomListItem from './ChatRoomListItem';

const ChatRoomList = () => {
  const [roomList, updateRoomList] = useRecoilState(roomListState);
  const [pending, setPending] = useState<boolean>(false);

  const queryRoomList = async () => {
    setPending(true);
    try {
      const res = await getChatRecord();
      const { status, data } = res;
      if (status === 'success') {
        console.log('res', res);
        updateRoomList(data);
        console.log('chatRecord', data);
      }
    } catch (error) {
      console.log('error', error);
    } finally {
      setPending(false);
    }
  };

  useEffect(() => {
    queryRoomList();
  }, []);

  return (
    <section>
      <h1 className="title" />
      <ul className="w-4/5 pt-10 mx-auto">
        {roomList.map((room: Chat.RoomInfo) => (
          <ChatRoomListItem key={room.roomId} {...room} />
        ))}
        {pending && (
          <li className="flex items-center justify-center py-6 text-center">
            載入中...
            <Loading />
          </li>
        )}
        {!pending && roomList.length === 0 && (
          <li className="pt-10 text-center text-slate-400">暫無記錄</li>
        )}
      </ul>
    </section>
  );
};

export default ChatRoomList;
