import { useState } from "react";
import "./index.css";

const DetailsItem = (props) => {
  const { details, deleteItem, addChecked, removeChecked } = props;
  const { name, email, role, id } = details;
  const check = (num) => {
    const item = document.getElementById(`check${num}`);
    if (item.checked) {
      addChecked(num);
    } else {
      removeChecked(num);
    }
  };
  return (
    <li>
      <div className="item-container">
        <span>
          <input
            type="checkbox"
            id={`check${id}`}
            onChange={() => {
              check(id);
            }}
          ></input>
        </span>
        <span>{name}</span>
        <span>{email}</span>
        <span>{role}</span>
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="100"
            height="100"
            viewBox="0 0 30 30"
            onClick={() => {
              deleteItem(id);
            }}
            className="delete-icon"
          >
            <path d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z"></path>
          </svg>
        </span>
      </div>
    </li>
  );
};

export default DetailsItem;
