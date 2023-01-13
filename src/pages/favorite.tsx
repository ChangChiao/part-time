import { useEffect, useState } from 'react';

import { NextPage } from 'next';

import CardWall from '@/components/CardWall';
import { getUserFavorite } from '@/utils/http/user';

export const Favorite: NextPage = () => {
  const [list, setList] = useState<
    Task.TaskAPIResponse<Task.TaskDetail> | undefined
  >(undefined);
  const queryCardList = async () => {
    const res = await getUserFavorite();
    if (res) {
      setList(res);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  useEffect(() => {
    queryCardList();
  }, []);

  return (
    <div>
      <CardWall data={list} />
    </div>
  );
};

export default Favorite;
