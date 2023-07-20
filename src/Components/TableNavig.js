import React from "react";
import PrevIcon from "../Icons/previous_icon.svg";
import DPrevIcon from "../Icons/double_previous_icon.svg";
import NextIcon from "../Icons/next_icon.svg";
import DNextIcon from "../Icons/double_next_icon.svg";

export default function TableNavig({
  onTableChange,
  offsetValue,
  sliceValue,
  battles,
}) {
  function incrementOffset() {
    if (Math.floor(battles / sliceValue) === offsetValue) return;
    onTableChange(offsetValue + 1);
  }
  function decrementOffset() {
    if (offsetValue === 0) return;
    onTableChange(offsetValue - 1);
  }
  function setOffsetToStart() {
    onTableChange(0);
  }
  function setOffsetToEnd() {
    onTableChange(Math.floor(battles / sliceValue));
  }

  if (battles > 10) {
    return (
      <>
        <button
          style={{ backgroundColor: "transparent" }}
          onClick={setOffsetToStart}
        >
          <img src={DPrevIcon} alt="Double Previous Icon" />
        </button>
        <button
          style={{ backgroundColor: "transparent" }}
          onClick={decrementOffset}
        >
          <img src={PrevIcon} alt="Previous Icon" />
        </button>
        <button
          style={{ backgroundColor: "transparent" }}
          onClick={incrementOffset}
        >
          <img src={NextIcon} alt="Next Icon" />
        </button>
        <button
          style={{ backgroundColor: "transparent" }}
          onClick={setOffsetToEnd}
        >
          <img src={DNextIcon} alt="Double Next Icon" />
        </button>
      </>
    );
  }
}
