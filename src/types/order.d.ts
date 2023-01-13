declare namespace Order {
  interface OrderDetail {
    _id: string;
    Amt: number;
    Email: string;
    ItemDesc: string;
    TradeInfo: string;
    TradeSha: string;
    MerchantID: string;
    Version: string;
    MerchantOrderNo: number;
    TimeStamp: number;
    orderStatus: number;
    payment: string;
    user: { email: string; _id: string };
  }
  interface OrderAPIResponse extends Api.ApiResponse {
    data: OrderDetail;
  }

  interface LinePayResponse extends Api.ApiResponse {
    data: {
      url: string;
    };
  }
}
