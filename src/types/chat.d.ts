declare namespace Chat {
  interface ChatAPIResponse<T> extends Api.ApiResponse {
    data: T;
  }
  interface RoomInfo {
    roomId: string;
    name: string;
    avatar: string;
    message?: Msg[];
  }
  interface RoomState extends RoomInfo {
    isOpen: Boolean;
  }
  interface Msg {
    _id: string;
    message: string;
    createdAt: string;
    sender: string;
  }
}
