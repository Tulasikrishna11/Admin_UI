import "./index.css";
const SearchBar = (props) => {
  const { filter } = props;
  return (
    <div>
      <input
        type="search"
        placeholder="Search "
        className="search"
        onChange={filter}
      ></input>
    </div>
  );
};

export default SearchBar;
