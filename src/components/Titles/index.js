import "./index.css";

const Titles = (props) => {
  const { checkAll, unCheckAll } = props;
  const toggleChecked = (event) => {
    if (event.target.checked) {
      checkAll();
    } else {
      unCheckAll();
    }
  };
  return (
    <div className="title-container">
      <span>
        <input type="checkbox" onClick={toggleChecked} id="titleCheckBox" />
      </span>
      <span>
        <b>Name</b>
      </span>
      <span>
        <b>Email</b>
      </span>
      <span>
        <b>Role</b>
      </span>
      <span>
        <b>Actions</b>
      </span>
    </div>
  );
};

export default Titles;
