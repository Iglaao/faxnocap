import React from "react";

// Battles per view
export default function BpvSelect({ onSelectChange, selectedAmount }) {
  const handleChange = (event) => {
    onSelectChange(event.target.value);
  };
  return (
    <>
      <select value={selectedAmount} onChange={handleChange}>
        <option value={10}>10</option>
        <option value={25}>25</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
      </select>
    </>
  );
}
