import { genQueryStr } from '../url';
import service from './axiosConfig';
import { getAuthorizationImgHeader, getAuthorizationHeader } from './header';

const TASK_PATH = `/task`;

interface TaskParam {
  title: string;
  reward: number;
  description: string;
  cover: File;
  expire: string;
}

interface QueryTaskParam {
  [key: string]: string | string[] | undefined;
}

interface PickStaffParam {
  taskId: string;
  staff: string;
}

export const getAllTask = (param: QueryTaskParam) => {
  const queryStr = genQueryStr(param);
  let path = `${TASK_PATH}`;
  if (queryStr) {
    path += `?${queryStr}`;
  }
  return service.get<{}, Task.TaskAPIResponse<Task.TaskDetail>>(path);
};

export const getUserCreateTaskList = () => {
  const headers = getAuthorizationHeader();
  return service.get<{}, Task.TaskAPIResponse<Task.TaskDetail>>(
    `${TASK_PATH}/createTaskList`,
    {
      headers,
    }
  );
};

export const getUserApplyTaskList = () => {
  const headers = getAuthorizationHeader();
  return service.get<{}, Task.TaskAPIResponse<Task.TaskWithContact>>(
    `${TASK_PATH}/applyTaskList`,
    {
      headers,
    }
  );
};

export const addTask = (param: FormData) => {
  const headers = getAuthorizationImgHeader();
  return service.post<TaskParam, Task.TaskAPIResponse<{}>>(TASK_PATH, param, {
    headers,
  });
};

export const deleteTask = (taskId: string) => {
  const headers = getAuthorizationHeader();
  return service.delete<string, Task.TaskAPIResponse<{}>>(
    `${TASK_PATH}/${taskId}`,
    { headers }
  );
};

export const updateTask = async (param: Partial<TaskParam>) => {
  const headers = getAuthorizationImgHeader();
  return service.patch<
    Partial<TaskParam>,
    Task.TaskAPIResponse<Task.TaskDetail>
  >(`${TASK_PATH}/`, param, { headers });
};

export const applyTask = (taskId: string) => {
  const headers = getAuthorizationHeader();
  return service.patch<{}, Task.TaskAPIResponse<{}>>(
    `${TASK_PATH}/${taskId}/applicant`,
    {},
    { headers }
  );
};

export const cancelApplyTask = (taskId: string) => {
  const headers = getAuthorizationHeader();
  return service.delete(`${TASK_PATH}/${taskId}/applicant`, { headers });
};

export const pickStaff = ({ taskId, staff }: PickStaffParam) => {
  const headers = getAuthorizationHeader();
  return service.post<
    PickStaffParam,
    Task.TaskAPIResponse<Task.TaskWithApplicant>
  >(`${TASK_PATH}/${taskId}/staff`, { staff }, { headers });
};
