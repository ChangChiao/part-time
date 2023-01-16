const LoadingText = ['L', 'o', 'a', 'd', 'i', 'n', 'g', '...'];
import "../../styles/loading.css";
const Loading = () => {
  return (
    <div className="fixed top-0 z-50 flex items-center justify-center w-full h-full loading bg-black/50">
      <div className="w-20 text-xl text-white loading-text">
        {LoadingText.map((item, i) => (
          <span key={i}>{item}</span>
        ))}
      </div>
    </div>
  );
};

export default Loading;
