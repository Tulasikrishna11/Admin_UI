import "./index.css";
import { useState } from "react";

const PageNums = ({ n, pageNum }) => {
  const [activePage, setActivePage] = useState(1);
  const incrementPage = () => {
    const nextPage = activePage + 1;
    handlePageClick(nextPage);
  };
  const pages = Math.ceil(n / 10);
  const pageNumbers = [];

  for (let i = 1; i <= pages; i++) {
    pageNumbers.push(i);
  }

  const handlePageClick = (num) => {
    pageNum(num);
    setActivePage(num);
  };

  return (
    <div className="footer">
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
        <p className="page-num" onClick={incrementPage}>
          &gt;
        </p>
      </div>
    </div>
  );
};

export default PageNums;
