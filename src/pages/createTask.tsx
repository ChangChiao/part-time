import { useCallback, useEffect, useMemo, useState } from 'react';

import { NextPage } from 'next';

import ListItemSkeleton from '@/components/atoms/ListItemSkeleton';
import ApplicantPop from '@/components/atoms/popup/ApplicantPop';
import ConfirmPop from '@/components/atoms/popup/ConfirmPop';
import Tab from '@/components/atoms/Tab';
import CreateTaskItem from '@/components/createTask/CreateTaskItem';
import { usePopupContext } from '@/hooks/usePopupContext';
import { getUserCreateTaskList } from '@/utils/http/task';

const tabList = [
  { name: '進行中', id: 0 },
  { name: '已結束', id: 1 },
  { name: '已過期', id: 2 },
];

const CreateTask: NextPage = () => {
  const [tab, setTab] = useState<number>(0);
  const [pending, setPending] = useState<boolean>(false);
  const [taskId, setTaskId] = useState<string>('');
  const [taskList, setTaskList] = useState<Task.TaskWithApplicant[] | []>([]);
  const { showPopupName } = usePopupContext();
  const getList = useCallback(async () => {
    setPending(true);
    const res = await getUserCreateTaskList();
    setPending(false);
    if (res.status === 'success') {
      setTaskList(res.data as Task.TaskWithApplicant[]);
    }
    console.log('res', res);
  }, []);
  useEffect(() => {
    getList();
  }, []);

  const applicantList = useMemo(() => {
    return taskList.find((item) => item._id === taskId)?.applicant;
  }, [taskList, taskId]);

  const filterTaskList = useMemo(() => {
    return taskList.filter((item) => item.status === tab);
  }, [taskList, tab]);

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
      {filterTaskList?.map((item) => (
        <CreateTaskItem setTaskId={setTaskId} key={item._id} {...item} />
      ))}
      {/* <CreateTaskItem setTaskId={setTaskId} {...parma} /> */}
      {applicantList && (
        <ApplicantPop applicantList={applicantList} taskId={taskId} />
      )}

      {showPopupName === 'confirm' && (
        <ConfirmPop getList={getList} taskId={taskId} />
      )}
    </div>
  );
};
export default CreateTask;
