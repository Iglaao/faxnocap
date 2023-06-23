import React, { useState } from "react";

export default function SeasonSelect({ onSelectChange, selectedSeason }) {
  const handleChange = (event) => {
    onSelectChange(event.target.value);
  };
  return (
    <>
      <label for="season">Choose a season: </label>
      <select
        name="season"
        id="season"
        value={selectedSeason}
        onChange={handleChange}
      >
        <option value="s20" selected="selected">
          S20
        </option>
        <option value="s21">S21</option>
        <option value="s22">S22</option>
        <option value="s23">S23</option>
      </select>
    </>
  );
}
