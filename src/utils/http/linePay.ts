import service from './axiosConfig';
import { getAuthorizationHeader } from './header';

const PAY_PATH = `/linepay`;

export const createOrder = async () => {
  const headers = getAuthorizationHeader();
  return service.post<{}, Order.LinePayResponse>(
    `${PAY_PATH}`,
    {},
    { headers }
  );
};
