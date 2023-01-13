import service from './axiosConfig';
import { getAuthorizationHeader } from './header';

const PAY_PATH = `/chat`;

interface GetRoomIdParam {
  receiver: string;
}

export const getRoomId = async (sendData: GetRoomIdParam) => {
  const headers = getAuthorizationHeader();
  return service.post<GetRoomIdParam, Chat.ChatAPIResponse<Chat.RoomInfo>>(
    `${PAY_PATH}/room-info`,
    sendData,
    { headers }
  );
};

export const getChatRecord = async () => {
  const headers = getAuthorizationHeader();
  return service.get<{}, Chat.ChatAPIResponse<Chat.RoomInfo[]>>(
    `${PAY_PATH}/chat-record`,
    {
      headers,
    }
  );
};
