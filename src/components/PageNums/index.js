import "./index.css";
import { useState } from "react";

const PageNums = ({ n, pageNum }) => {
  const [activePage, setActivePage] = useState(1);

  const pages = Math.ceil(n / 10);
  const pageNumbers = [];

  for (let i = 1; i <= pages; i++) {
    pageNumbers.push(i);
  }

  const nextPage = () => {
    const nextPage = activePage + 1;
    handlePageClick(nextPage);
  };

  const prevPage = () => {
    const prevPage = activePage - 1;
    handlePageClick(prevPage);
  };
  const handlePageClick = (num) => {
    pageNum(num);
    setActivePage(num);
  };
  const incrementPage = () => {
    if (activePage < pages) {
      nextPage();
    }
  };

  const decrementPage = () => {
    if (activePage > 1) {
      prevPage();
    }
  };
  const firstPage = () => {
    handlePageClick(1);
  };
  const lastPage = () => {
    handlePageClick(pages);
  };
  return (
    <div className="footer">
      <div className="first-page" onClick={firstPage}>
        &lt; &lt;
      </div>
      <div className="page-num" onClick={decrementPage}>
        &lt;
      </div>
      <div className="page-nums-container">
        {pageNumbers.map((num) => (
          <p
            key={num}
            className={`page-num ${activePage === num ? "active-page" : ""}`}
            onClick={() => handlePageClick(num)}
          >
            {num}
          </p>
        ))}
        <div className="page-num" onClick={incrementPage}>
          &gt;
        </div>
        <div className="last-page" onClick={lastPage}>
          &gt; &gt;
        </div>
      </div>
    </div>
  );
};

export default PageNums;
