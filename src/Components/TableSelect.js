import React from "react";

export default function TableSelect({ onSelectChange, selectedAmount }) {
  const handleChange = (event) => {
    onSelectChange(event.target.value);
  };
  return (
    <>
      <select
        value={selectedAmount}
        onChange={handleChange}
        className="table-select"
      >
        <option value={10}>10</option>
        <option value={25}>25</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
      </select>
    </>
  );
}
