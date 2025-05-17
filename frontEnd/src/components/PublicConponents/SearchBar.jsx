import React from "react";
import { CiSearch } from "react-icons/ci";

const SearchBar = ({ query, setQuery }) => {
  return (
    <div className="flex items-center border rounded-md px-3 py-2 bg-white shadow-sm w-full max-w-md">
      <CiSearch className="text-gray-500 text-xl mr-2" />
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Rechercher des produits..."
        className="w-full focus:outline-none text-sm text-gray-800"
      />
    </div>
  );
};

export default SearchBar;
