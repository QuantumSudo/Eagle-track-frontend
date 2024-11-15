import React from "react";

const Search = ({ searchQuery, setSearchQuery }) => (
  <input
    type="text"
    placeholder="Search items"
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
  />
);

export default Search;
