import { useNavigate } from 'react-router-dom';

const Pay = () => {
  const navigate = useNavigate();
  const handleOrder = async () => {
    navigate(`/checkOrder`);
  };
  return (
    <div>
      <button className="btn" onClick={handleOrder} type="submit">
        送出
      </button>
    </div>
  );
};

export default Pay;
