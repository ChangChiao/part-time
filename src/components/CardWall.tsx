import { useRef, useState, RefObject } from 'react';

import { usePopupContext } from '@/hooks/usePopupContext';

import Card from './atoms/Card';
import CardSkeleton from './atoms/CardSkeleton';
import CardPopup from './atoms/popup/CardPopup';

const CardWall = ({
  data,
}: {
  data: Task.TaskAPIResponse<Task.TaskDetail> | undefined;
}) => {
  // const queryTask = () => {
  //   const { query } = router;
  //   return getAllTask(query);
  // };

  // const { data: favorite } =

  // const list = useMemo(() => {
  //   return router.pathname === '/' ? taskList : favorite;
  // }, []);
  //   router.pathname === '/'
  //     ? [
  //         '/task/all',
  //         router.query.sortBy,
  //         router.query.sortOrder,
  //         router.query.city,
  //         router.query.keyword,
  //       ]
  //     : '/task/favorite',
  //   router.pathname === '/' ? queryTask : getUserFavorite
  // );
  const cardWallRef = useRef() as RefObject<HTMLDivElement>;
  const [detail, setDetail] = useState<Task.TaskDetail | undefined>(undefined);
  // const [cardList, setCardList] = useState<Task.TaskDetail[]>([]);
  const { showPopupName } = usePopupContext();

  const handleScroll = () => {
    if (cardWallRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = cardWallRef.current;
      if (scrollTop + clientHeight === scrollHeight) {
        console.log('isBottom!');
      }
    }
  };

  if (!data) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-around p-10 mx-auto max-w-[1600px]">
        {Array.from({ length: 6 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div>
      <div
        onScroll={handleScroll}
        ref={cardWallRef}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-around p-10 mx-auto max-w-[1600px]"
      >
        {data.data!.map((item: Task.TaskDetail) => (
          <Card key={item._id} {...item} setDetail={setDetail} />
        ))}
        {showPopupName === 'card' && detail && <CardPopup {...detail} />}
      </div>
      {data.data!.length === 0 && (
        <div className="text-center text-slate-300">暫無資料</div>
      )}
    </div>
  );
};

export default CardWall;
