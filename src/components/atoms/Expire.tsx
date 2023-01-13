import React from 'react';

import { AiOutlineCalendar } from 'react-icons/ai';

import { formateTime } from '@/utils';

const Expire = ({ expire }: { expire: string }) => {
  return (
    <div className="flex items-center text-primary">
      <AiOutlineCalendar className="mr-2" /> 截止日 : {formateTime(expire)}
    </div>
  );
};

export default Expire;
