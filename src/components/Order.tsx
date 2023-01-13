import { useState, useRef, useEffect } from 'react';

import { PAY_URL } from '@/config';
import { createOrder } from '@/utils/http';

const Order = () => {
  const [orderInfo, setOrder] = useState<Partial<Order.OrderDetail>>({});
  const formEl = useRef<HTMLFormElement>(null);
  const handleOrder = async () => {
    const res = await createOrder();
    setOrder(res.data);
    console.log('res', res);
  };

  useEffect(() => {
    console.log('orderInfo--', orderInfo);
    console.log('Email--', orderInfo.user);
    if (orderInfo.MerchantID) {
      formEl?.current?.submit();
    }
  }, [orderInfo]);

  return (
    <div className="text-white">
      checkOrder
      <button onClick={handleOrder}>購買VIP</button>
      <form
        action={PAY_URL}
        id="pay"
        ref={formEl}
        className="hidden"
        method="post"
      >
        <input
          readOnly
          type="text"
          name="MerchantID"
          value={orderInfo.MerchantID || ''}
        />
        <input
          readOnly
          type="text"
          name="TradeSha"
          value={orderInfo.TradeSha || ''}
        />
        <input
          readOnly
          type="text"
          name="TradeInfo"
          value={orderInfo.TradeInfo || ''}
        />
        <input
          readOnly
          type="text"
          name="TimeStamp"
          value={orderInfo.TimeStamp || ''}
        />
        <input
          readOnly
          type="text"
          name="Version"
          value={orderInfo.Version || 1.5}
        />
        <input
          readOnly
          type="text"
          name="MerchantOrderNo"
          value={orderInfo.MerchantOrderNo || ''}
        />
        <input readOnly type="text" name="Amt" value={orderInfo.Amt || 0} />
        <input readOnly type="email" name="Email" value={orderInfo.Email} />
        <button type="submit">送出</button>
      </form>
    </div>
  );
};

export default Order;
