import { atom, selector } from 'recoil';

import { getUser } from '../utils/http/user';

export const userState = atom({
  key: 'user',
  default: {} as Partial<User.UserInfo>,
});

export const userInfoQuery = selector({
  key: 'userInfo',
  get: async () => {
    const response = await getUser();
    if (response.status === 'success') {
      return response.data;
    }
    return {};
  },
});
