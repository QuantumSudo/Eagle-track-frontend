import React from "react";

const Search = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="mb-5">
      <input
        type="text"
        placeholder="Search items"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded"
      />
    </div>
  );
};

export default Search;