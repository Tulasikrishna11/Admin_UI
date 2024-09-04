import axios from "axios";
import { useEffect, useState } from "react";
import DetailsItem from "../DetailsItem/DetailsItem";
import Titles from "../Titles";
import SearchBar from "../SearchBar";
import PageNums from "../PageNums";
import "./index.css";

const DetailsList = () => {
  const [data, setData] = useState([]);
  const [initialData, setInitialData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [checked, setChecked] = useState([]);

  const itemsPerPage = 10;
  const lastIndex = pageNumber * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const requiredData = data.slice(firstIndex, lastIndex);

  const deleteItem = (id) => {
    const newList = initialData.filter((item) => item.id !== id);
    setInitialData(newList);
    setData(newList);
  };

  const addChecked = (id) => {
    setChecked((prevChecked) => [...prevChecked, id]);
  };

  const removeChecked = (id) => {
    setChecked((prevChecked) => prevChecked.filter((item) => item !== id));
  };

  const deleteSelected = () => {
    const newList = initialData.filter((item) => !checked.includes(item.id));
    setInitialData(newList);
    setData(newList);
    setChecked([]);
  };

  const filter = (event) => {
    const userInput = event.target.value.toLowerCase();
    const filteredData = initialData.filter(
      (item) =>
        item.name.toLowerCase().includes(userInput) ||
        item.email.toLowerCase().includes(userInput) ||
        item.role.toLowerCase().includes(userInput)
    );
    setData(filteredData);
    setPageNumber(1);
  };

  const changePage = (num) => {
    setPageNumber(num);
  };
  const modifyChanges = (name, email, role, id) => {
    const modifiedList = initialData.map((eachItem) => {
      if (eachItem.id === id) {
        return {
          ...eachItem,
          name: name,
          email: email,
          role: role,
        };
      }
      return eachItem;
    });
    setInitialData(modifiedList);
    setData(modifiedList);
  };
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      );
      setData(response.data);
      setInitialData(response.data);
    };
    fetchData();
  }, []);

  const checkAll = () => {};
  return (
    <div className="list-container">
      <SearchBar filter={filter} />
      <ul className="details-list">
        <Titles checkAll={checkAll} />
        {requiredData.map((item) => (
          <DetailsItem
            key={item.id}
            details={item}
            deleteItem={deleteItem}
            addChecked={addChecked}
            removeChecked={removeChecked}
            modifyChanges={modifyChanges}
          />
        ))}
      </ul>
      <button className="delete-selected-button" onClick={deleteSelected}>
        Delete Selected
      </button>
      <PageNums n={data.length} pageNum={changePage} />
    </div>
  );
};

export default DetailsList;
