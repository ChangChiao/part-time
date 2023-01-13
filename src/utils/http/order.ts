import service from './axiosConfig';
import { getAuthorizationHeader } from './header';

const PAY_PATH = `/order`;

export const createOrder = async () => {
  const headers = getAuthorizationHeader();
  return service.post<{}, Order.OrderAPIResponse>(
    `${PAY_PATH}`,
    {},
    { headers }
  );
};
