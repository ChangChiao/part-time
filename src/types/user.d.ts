declare namespace User {
  interface UserInfo {
    _id: string;
    name: string;
    contact: string;
    collect: Task.TaskDetail[] | [];
    avatar: string;
    chatRecord: string;
    isVip: boolean;
  }

  interface UserInfoApiResponse {
    status: string;
    message: string;
    data: UserInfo;
  }
}
