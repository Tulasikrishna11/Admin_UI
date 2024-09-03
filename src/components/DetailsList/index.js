import axios from "axios";
import { useEffect, useState } from "react";
import DetailsItem from "../DetailsItem";
import "./index.css";
import Titles from "../Titles";
import SearchBar from "../SearchBar";
import PageNums from "../PageNums";

const DetailsList = () => {
  const [data, updateData] = useState([]);
  const [initialData, updateInitialData] = useState([]);
  const [pageNumber, updatePage] = useState(1);
  const [checked, updatedChecked] = useState([]);
  const lastIndex = pageNumber * 10;
  const firstIndex = lastIndex - 10;

  const deleteItem = (id) => {
    const newList = initialData.filter((eachitem) => {
      return eachitem.id !== id;
    });
    updateInitialData(newList);
    updateData(newList);
  };

  const addChecked = (id) => {
    const updated = [...checked, id];
    updatedChecked(updated);
  };

  const removeChecked = (id) => {
    const updated = checked.filter((item) => {
      return item !== id;
    });
    updatedChecked(updated);
  };

  const deleteSelected = () => {
    const items = checked;
    const newList = initialData.filter((eachitem) => {
      return !items.includes(eachitem.id);
    });
    updateInitialData(newList);
    updateData(newList);
    updatedChecked([]);
  };
  const filter = (event) => {
    const userInput = event.target.value.toLowerCase();
    const filteredData = initialData.filter((eachitem) => {
      if (
        eachitem.name.toLowerCase().includes(userInput) ||
        eachitem.email.toLowerCase().includes(userInput) ||
        eachitem.role.toLowerCase().includes(userInput)
      ) {
        return true;
      }
      return false;
    });
    updateData(filteredData);
    updatePage(1);
  };

  const pageNum = (num) => {
    updatePage(num);
  };
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      );
      const data = response.data;
      updateData(data);
      updateInitialData(data);
    };
    fetchData();
  }, []);
  const requiredData = data.slice(firstIndex, lastIndex);
  return (
    <div className="list-container">
      <SearchBar filter={filter} />
      <ul className="details-list">
        <Titles />
        {requiredData.map((eachitem) => (
          <DetailsItem
            key={eachitem.id}
            details={eachitem}
            deleteItem={deleteItem}
            addChecked={addChecked}
            removeChecked={removeChecked}
          />
        ))}
      </ul>
      <button className="delete-selected" onClick={deleteSelected}>
        Delete Selected
      </button>
      <PageNums n={data.length} pageNum={pageNum} />
    </div>
  );
};
export default DetailsList;
