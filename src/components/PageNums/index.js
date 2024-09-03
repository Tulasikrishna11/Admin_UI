import "./index.css";
import { useState } from "react";

const PageNums = (props) => {
  const [activePage, updatePage] = useState(1);
  const { n } = props;
  const { pageNum } = props;
  const pages = Math.ceil(n / 10);
  const pageNumbers = [];
  for (let i = 1; i <= pages; i++) {
    pageNumbers.push(i);
  }
  const currentPage = (Num) => {
    pageNum(Num);
    updatePage(Num);
  };

  return (
    <div className="footer">
      <div className="page-nums-container">
        {pageNumbers.map((eachNum) => {
          return (
            <p
              key={eachNum}
              className={`page-num ${
                activePage === eachNum ? "active-page" : ""
              }`}
              id={`page${eachNum}`}
              onClick={() => {
                currentPage(eachNum);
              }}
            >
              {eachNum}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default PageNums;
