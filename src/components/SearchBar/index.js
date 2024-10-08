import "./index.css";
const SearchBar = (props) => {
  const { filter } = props;
  return (
    <div>
      <input
        type="search"
        placeholder="Search by name, email or role"
        className="search"
        onChange={filter}
        id="searchInput"
      ></input>
    </div>
  );
};

export default SearchBar;
