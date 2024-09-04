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
    let modifiedList = initialData.map((eachItem) => {
      if (eachItem.id === id) {
        eachItem.isChecked = true;
      }
      return eachItem;
    });
    setInitialData(modifiedList);
  };

  const removeChecked = (id) => {
    let modifiedList = initialData.map((eachItem) => {
      if (eachItem.id === id) {
        eachItem.isChecked = false;
      }
      return eachItem;
    });
    setInitialData(modifiedList);
  };

  const deleteSelected = () => {
    console.log("event trigerred");
    const newList = initialData.filter((eachItem) => {
      return !eachItem.isChecked;
    });
    setInitialData(newList);
    setData(newList);
    document.getElementById("titleCheckBox").checked = false;
    filter();
  };

  const filter = () => {
    const userInput = document
      .getElementById("searchInput")
      .value.toLowerCase();
    // const userInput = event.target.value.toLowerCase();
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
    filter();
  }, [initialData]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      );
      const data = response.data.map((eachItem) => {
        return {
          ...eachItem,
          isChecked: false,
        };
      });
      setData(data);
      setInitialData(data);
    };
    fetchData();
  }, []);

  const checkAll = () => {
    const modifiedList = initialData.map((eachItem) => {
      if (requiredData.includes(eachItem)) {
        return { ...eachItem, isChecked: true };
      }
      return eachItem;
    });
    setInitialData(modifiedList);
    setData(modifiedList);
  };
  const unCheckAll = () => {
    const modifiedList = initialData.map((eachItem) => {
      if (requiredData.includes(eachItem)) {
        return { ...eachItem, isChecked: false };
      }
      return eachItem;
    });
    setInitialData(modifiedList);
    setData(modifiedList);
  };
  return (
    <div className="list-container">
      <SearchBar filter={filter} />
      <ul className="details-list">
        <Titles checkAll={checkAll} unCheckAll={unCheckAll} />
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
