import React from "react";
import "../../Styles/header.css";
function Search() {
  return (
    <div>
      <input
        className="header_input"
        placeholder="What are you looking for  .."
        type="text"
      />
    </div>
  );
}

export default Search;
