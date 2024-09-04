import React, { useState } from "react";
import "./DetailsItem.css";

const DetailsItem = ({
  details,
  deleteItem,
  addChecked,
  removeChecked,
  modifyChanges,
}) => {
  const { name, email, role, id, isChecked } = details;
  const [isEditable, setEditable] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const [editedRole, setEditedRole] = useState(role);
  const [editedEmail, setEditedEmail] = useState(email);
  const handleCheck = () => {
    const item = document.getElementById(`check${id}`);
    if (item.checked) {
      addChecked(id);
    } else {
      removeChecked(id);
    }
  };
  const saveChanges = () => {
    setEditable(false);
    modifyChanges(editedName, editedEmail, editedRole, id);
  };
  const handleNameChange = (e) => {
    setEditedName(e.target.value);
  };
  const enableEdit = () => {
    setEditable(true);
  };
  const handleEmailChange = (e) => {
    setEditedEmail(e.target.value);
  };
  const handleRoleChange = (e) => {
    setEditedRole(e.target.value);
  };
  return (
    <li>
      <div className="item-container">
        <span>
          <input
            type="checkbox"
            id={`check${id}`}
            onChange={handleCheck}
            checked={isChecked}
          />
        </span>
        <span>
          {isEditable ? (
            <input type="text" value={editedName} onChange={handleNameChange} />
          ) : (
            name
          )}
        </span>
        <span>
          {isEditable ? (
            <input
              type="text"
              value={editedEmail}
              onChange={handleEmailChange}
            />
          ) : (
            email
          )}
        </span>
        <span>
          {isEditable ? (
            <input type="text" value={editedRole} onChange={handleRoleChange} />
          ) : (
            role
          )}
        </span>
        <button onClick={enableEdit}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="100"
            height="100"
            viewBox="0 0 24 24"
            className="edit-icon"
          >
            <path d="M 16.9375 1.0625 L 3.875 14.125 L 1.0742188 22.925781 L 9.875 20.125 L 22.9375 7.0625 C 22.9375 7.0625 22.8375 4.9615 20.9375 3.0625 C 19.0375 1.1625 16.9375 1.0625 16.9375 1.0625 z M 17.3125 2.6875 C 18.3845 2.8915 19.237984 3.3456094 19.896484 4.0214844 C 20.554984 4.6973594 21.0185 5.595 21.3125 6.6875 L 19.5 8.5 L 15.5 4.5 L 16.9375 3.0625 L 17.3125 2.6875 z M 4.9785156 15.126953 C 4.990338 15.129931 6.1809555 15.430955 7.375 16.625 C 8.675 17.825 8.875 18.925781 8.875 18.925781 L 8.9179688 18.976562 L 5.3691406 20.119141 L 3.8730469 18.623047 L 4.9785156 15.126953 z"></path>
          </svg>
        </button>
        {isEditable && <button onClick={saveChanges}>Save</button>}
        <button className="delete" onClick={() => deleteItem(id)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100"
            height="100"
            viewBox="0 0 30 30"
            className="delete-icon"
          >
            <path d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z"></path>
          </svg>
        </button>
      </div>
    </li>
  );
};

export default DetailsItem;
