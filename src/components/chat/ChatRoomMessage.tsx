import { useMemo } from 'react';

import clsx from 'clsx';
import { useRecoilState } from 'recoil';

import { userState } from '@/store/user';
import { formateTimeHours } from '@/utils/time';

type ChatRoomMessageProps = {
  message: string;
  _id: string;
  sender: string;
  createdAt: string;
};

const ChatRoomMessage = ({
  message,
  sender,
  createdAt,
}: ChatRoomMessageProps) => {
  const [user] = useRecoilState(userState);
  const isSelf = useMemo(() => {
    return user._id === sender;
  }, [sender, user]);
  return (
    <div className="m-4 lg:mx-2">
      <div className={clsx('flex items-end', isSelf && 'flex-row-reverse')}>
        <div
          className={clsx(
            'm-h-[20px] inline-flex max-w-[300px] text-slate-600 rounded-2xl border-2 border-slate-300 p-2',
            isSelf ? 'bg-slate-300' : 'bg-slate-200'
          )}
        >
          {message}
        </div>
        <span className="px-2 text-xs text-gray-400">
          {createdAt ? formateTimeHours(createdAt) : ''}
        </span>
      </div>
    </div>
  );
};

export default ChatRoomMessage;
