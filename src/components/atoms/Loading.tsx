const LoadingText = ['L', 'o', 'a', 'd', 'i', 'n', 'g', '...'];
const Loading = () => {
  return (
    <div className="fixed top-0 z-50 flex items-center justify-center w-full h-full loading bg-black/50">
      <div className="w-20 text-xl text-white loading-text">
        {LoadingText.map((item, i) => (
          <span key={i}>{item}</span>
        ))}
      </div>
      <style jsx>
        {`
          .loading-text span {
            @apply animate-fadeOut;
          }
          .loading-text span:nth-child(1) {
            @apply delay-100;
          }
          .loading-text span:nth-child(2) {
            @apply delay-200;
          }
          .loading-text span:nth-child(3) {
            @apply delay-300;
          }
          .loading-text span:nth-child(4) {
            @apply delay-[400ms];
          }
          .loading-text span:nth-child(5) {
            @apply delay-500;
          }
          .loading-text span:nth-child(6) {
            @apply delay-[600ms];
          }
          .loading-text span:nth-child(7) {
            @apply delay-700;
          }
        `}
      </style>
    </div>
  );
};

export default Loading;
