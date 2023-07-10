import React from "react";

export default function SearchBar({ keyword, onChange }) {
  return (
    <input
      key="search-bar"
      value={keyword}
      placeholder={"search player"}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
