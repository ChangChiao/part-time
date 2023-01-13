import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
  key: 'recoil-persist', // configuration stay the same too
  // storage: localStorage,
});

export const roomState = atom({
  key: 'room',
  default: [] as Chat.RoomInfo[],
  effects_UNSTABLE: [persistAtom],
});

export const roomListState = atom({
  key: 'roomList',
  default: [] as Chat.RoomInfo[],
  effects_UNSTABLE: [persistAtom],
});
