const CardSkeleton = () => {
  return (
    <div className="relative p-4 overflow-hidden bg-blue-500 rounded-lg shadow w-80 hover:shadow-md">
      <div className="flex flex-col animate-pulse">
        <div className="w-full bg-gray-900 rounded h-52"></div>
        <div className="flex flex-col mt-5">
          <div className="w-full h-5 bg-gray-900 rounded"></div>
          <div className="w-10/12 h-3 mt-2 bg-gray-900 rounded"></div>
        </div>

        <div className="grid grid-cols-2 mt-5 gap-x-2 gap-y-1">
          <div className="w-full h-3 mt-2 bg-gray-900 rounded"></div>
          <div className="w-full h-3 mt-2 bg-gray-900 rounded"></div>
        </div>

        <div className="flex items-center mt-5">
          <div>
            <div className="w-10 h-10 bg-gray-900 rounded-full"></div>
          </div>
          <div className="flex justify-between w-full ml-3">
            <div className="w-5/12 h-3 bg-gray-900 rounded"></div>
            <div className="w-2/12 h-3 bg-gray-900 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardSkeleton;
