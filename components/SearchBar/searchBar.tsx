import SearchIcon from "../../assets/search.svg";

const SearchBar = () => {
  return (
    <div className="flex align-middle justify-center py-5">
      <div className="relative w-72">
        <input
          type="text"
          placeholder="Sök efter produkt..."
          className="input w-full max-w-xs rounded-xl"
        />
        <SearchIcon className="absolute top-3 right-3 flex" />
      </div>
    </div>
  );
};

export default SearchBar;
