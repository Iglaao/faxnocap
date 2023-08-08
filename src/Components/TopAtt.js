import React from "react";
import TopKills from "../Icons/sword_icon.svg";
import TopAttend from "../Icons/calendar_icon.svg";
import TopDeaths from "../Icons/Kills_icon.svg";

export default function TopAtt(props) {
  function returnIcon(atr) {
    if (atr === "Kills") return TopKills;
    else if (atr === "Deaths") return TopDeaths;
    else if (atr === "Attendance") return TopAttend;
  }
  function returnColor(atr) {
    if (atr === "Kills") return [41, 175, 224];
    else if (atr === "Deaths") return [224, 41, 78];
    else if (atr === "Attendance") return [224, 166, 41];
  }

  return (
    <>
      <table style={{ width: "300px", padding: "5px 0px 5px 0px" }}>
        <thead>
          <tr>
            <th style={{ color: `rgb(${returnColor(props.atr)})` }}>
              Top {props.atr}
            </th>
            <th>
              <img
                style={{ paddingRight: "0px" }}
                src={returnIcon(props.atr)}
                alt={props.atr + " Icon"}
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {props.data.map((item, index) => (
            <tr key={index}>
              <td style={{ textAlign: "center" }}>{item.Name}</td>
              <td style={{ textAlign: "center" }}>{item[props.atr]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
