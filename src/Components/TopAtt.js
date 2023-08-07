import React from "react";
import TopKills from "../Icons/sword_icon.svg";
import TopAttend from "../Icons/calendar_icon.svg";
import TopDeaths from "../Icons/Kills_icon.svg";

export default function TopAtt(props) {
  return (
    <>
      <div>
        <table>
          <tbody>
            <tr>
              <td>
                <img src={TopAttend} alt="Attendance Icon" />
                <span>Top attendance:</span>
              </td>
              <td>{props.data.Attendance.value}</td>
              <td>{props.data.Attendance.players}</td>
            </tr>
            <tr>
              <td>
                <img src={TopKills} alt="Kills Icon" />
                <span>Top kills:</span>
              </td>
              <td>{props.data.Kills.value}</td>
              <td>{props.data.Kills.players}</td>
            </tr>
            <tr>
              <td>
                <img src={TopDeaths} alt="Deaths Icon" />
                <span>Top deaths:</span>
              </td>
              <td>{props.data.Deaths.value}</td>
              <td>{props.data.Deaths.players}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
