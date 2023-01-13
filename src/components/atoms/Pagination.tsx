import ReactPaginate from 'react-paginate';

type PaginationParam = {
  pageCount: number; // 全部資料筆數
  setNowPage: (value: number) => void;
};

const Pagination = ({ pageCount, setNowPage }: PaginationParam) => {
  // Invoke when user click to request another page.
  const handlePageClick = (event: { selected: number }) => {
    setNowPage(event.selected);
  };
  return (
    <ReactPaginate
      breakLabel="..."
      previousLabel="上一頁"
      nextLabel="下一頁"
      onPageChange={handlePageClick}
      pageRangeDisplayed={30}
      pageCount={pageCount}
      // renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
