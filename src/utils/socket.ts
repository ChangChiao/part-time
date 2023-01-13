import io, { Socket } from 'socket.io-client';

import { BACKEND_URL } from '../config';

let socket: Socket | null = null;
export const initiateSocket = (token: string, roomId: string) => {
  socket = io(`${BACKEND_URL}/chat`, {
    query: {
      room: roomId,
    },
    auth: {
      token,
    },
  });
  return socket;
};
