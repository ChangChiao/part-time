import { useEffect, useMemo, useState } from 'react';

import AcceptedTaskItem from '@/components/applyTask/AcceptedTaskItem';
import ListItemSkeleton from '@/components/atoms/ListItemSkeleton';
import Tab from '@/components/atoms/Tab';
import { getUserApplyTaskList } from '@/utils/http';


const tabList = [
  { name: '進行中', id: 0 },
  { name: '已結束', id: 1 },
  { name: '已過期', id: 2 },
];

const AcceptedTask = () => {
  const [taskList, setTaskList] = useState<Task.TaskWithContact[] | []>([]);
  const [tab, setTab] = useState<number>(0);
  const [pending, setPending] = useState<boolean>(false);
  const getList = async () => {
    setPending(true);
    const res = await getUserApplyTaskList();
    setPending(false);
    if (res.status === 'success' && res.data) {
      setTaskList(res.data);
    }
  };

  const filterTaskList = useMemo(() => {
    return taskList.filter((item) => item.status === tab);
  }, [taskList, tab]);
  useEffect(() => {
    getList();
  }, []);
  return (
    <div className="wrapper">
      <Tab tab={tab} setTab={setTab} tabList={tabList} isDark={true} />
      {pending &&
        Array.from({ length: 4 }).map((_, i) => <ListItemSkeleton key={i} />)}
      {filterTaskList.length === 0 && !pending && (
        <div className="py-2 mx-auto text-center text-slate-400">
          <span>暫無紀錄</span>
        </div>
      )}
      {filterTaskList.map((item) => (
        <AcceptedTaskItem key={item._id} {...item} />
      ))}
      {/* <AcceptedTaskItem {...parma} /> */}
    </div>
  );
};
export default AcceptedTask;
