import React from "react";
import { formatValue } from "../Functions/FameFormatter";
import PlayersIcon from "../Icons/Players_icon.svg";
import KillsIcon from "../Icons/Kills_icon.svg";
import KillFameIcon from "../Icons/KillFame_icon.svg";

export default function MostChart(props) {
  function display(atr, val) {
    if (atr === "KillFame") return formatValue(val);
    else return val;
  }

  function returnIcon(atr) {
    if (atr === "Players") return PlayersIcon;
    else if (atr === "Kills") return KillsIcon;
    else if (atr === "KillFame") return KillFameIcon;
  }

  return (
    <>
      <div>
        <div className="space-items" style={{ marginBottom: "15px" }}>
          <div>Most {props.atr.replace("KillFame", "Fame")}</div>
          <img
            style={{ paddingRight: "0px" }}
            src={returnIcon(props.atr)}
            alt={props.atr + " Icon"}
          />
        </div>
        <div className="bars">
          {props.data.data.map((temp, index) => (
            <div className="space-items">
              <div
                className={"bar-" + props.atr}
                style={{
                  width: `${Math.round(
                    (200 * temp[props.atr]) / props.data.max
                  )}px`,
                }}
              >
                <div className="bartooltip">
                  {display(props.atr, temp[props.atr])}
                </div>
              </div>
              <div className="barstext">{temp.Name}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
