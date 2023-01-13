declare namespace Task {
  interface TaskDetail {
    _id: string;
    title: string;
    description: string;
    cover?: string;
    author: User.UserInfo;
    city: string;
    reward: number;
    unit: number;
    status: number;
    expire: string;
    staff: User.UserInfo;
    contactInfo?: string;
  }

  interface TaskAPIResponse<T> extends Api.ApiResponse {
    data?: T[];
  }

  interface TaskCreate {
    title: string;
    reward: number;
    description: string;
    expire: string;
  }

  interface TaskWithApplicant extends TaskDetail {
    applicant: User.UserInfo[] | [];
  }

  interface TaskWithContact extends TaskDetail {
    author: User.UserInfo;
  }
}
