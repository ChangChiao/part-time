import { createOrder } from '@/utils/http/linePay';

const LinePay = () => {
  const genOrder = async () => {
    const res = await createOrder();
    console.log('res.data.url', res.data.url);
    window.location.replace(res.data.url);
  };
  return (
    <div>
      123
      <button onClick={genOrder}>確認訂購</button>
    </div>
  );
};

export default LinePay;
