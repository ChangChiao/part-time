import { useMemo } from 'react';

import clsx from 'clsx';

type WatermarkProps = {
  status: number;
  isPick?: boolean;
};
const Watermark = ({ status, isPick }: WatermarkProps) => {
  const color = useMemo(() => {
    if (status === 1) {
      return isPick
        ? 'border-green-500 text-green-500'
        : 'border-red-500 text-red-500';
    }
    return 'border-white text-white';
  }, [status, isPick]);

  const text = useMemo(() => {
    if (status === 1) {
      return isPick ? '被選中' : '已結束';
    }
    return '已過期';
  }, [status, isPick]);
  return (
    <div
      className={clsx(
        'absolute top-0 left-0 z-20 w-full h-full',
        status !== 0 ? 'bg-black/50' : 'pointer-events-none'
      )}
    >
      {status !== 0 && (
        <div
          className={clsx(
            'absolute right-0 flex items-center justify-center w-56 h-56 text-4xl border-4 rounded-full opacity-30 top-0 rotate-12',
            color
          )}
        >
          {text}
        </div>
      )}
      <style jsx>
        {`
          .loading-text span {
            @apply animate-fadeOut;
          }
        `}
      </style>
    </div>
  );
};

export default Watermark;
