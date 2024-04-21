import React from "react";
import { TextField } from "@material-ui/core";

function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <TextField
      label="Search Tasks"
      fullWidth
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
}

export default SearchBar;
