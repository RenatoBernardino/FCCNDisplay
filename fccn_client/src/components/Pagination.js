import { useSelector } from "react-redux";

function Pagination({ changePage }) {

  const page = useSelector((state) => state.interface.page);
  const total_pages = useSelector((state) => state.interface.total_pages);
  const loading = useSelector((state) => state.interface.loading);

  return (
    total_pages === 1 || loading ?
      (<div></div>)
      :
      (
        <div className="d-flex justify-content-end align-items-center my-2">
          {1 < page - 1 && (<div className="total-pages-button" onClick={() => changePage(1)}>Primeira página</div>)}
          {page === total_pages && total_pages > 2 && (<div className="page-button" onClick={() => changePage(page - 2)}>{page - 2}</div>)}
          {1 < page && (<div className="page-button" onClick={() => changePage(page - 1)}>{page - 1}</div>)}
          <div className="page-button selected-page" onClick={() => changePage(page)}>{page}</div>
          {total_pages > page + 1 && (<div className="page-button" onClick={() => changePage(page + 1)}>{page + 1}</div>)}
          {page === 1 && total_pages >= 3 && (<div className="page-button" onClick={() => changePage(page + 2)}>{page + 2}</div>)}
          {((total_pages > page + 1 && page !== 1) || (total_pages > page + 2 && page === 1)) && (<div className="total-pages-button" onClick={() => changePage(total_pages)}>Total {total_pages}</div>)}
        </div>
      )

  );

}

export default Pagination;