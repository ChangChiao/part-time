import { useState } from 'react';

export const usePagination = () => {
  const [pageCount, setPageCount] = useState<number>(0);
  return {
    pageCount,
    setPageCount,
  };
};
