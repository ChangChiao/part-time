import service from './axiosConfig';
import { getAuthorizationHeader } from './header';

const TASK_PATH = `/collect`;

export const getFavorite = () => {
  const headers = getAuthorizationHeader();
  return service.get<{}, Task.TaskAPIResponse<{}>>(`${TASK_PATH}`, { headers });
};

export const addFavorite = (taskId: string) => {
  const headers = getAuthorizationHeader();
  return service.post<string, Task.TaskAPIResponse<{}>>(
    `${TASK_PATH}/${taskId}`,
    {},
    { headers }
  );
};

export const removeFavorite = (taskId: string) => {
  const headers = getAuthorizationHeader();
  return service.delete<string, Task.TaskAPIResponse<{}>>(
    `${TASK_PATH}/${taskId}`,
    { headers }
  );
};
