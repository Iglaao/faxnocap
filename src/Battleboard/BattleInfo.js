import React from "react";

export default function BattleInfo(props) {
  function ReturnDate(date) {
    if (typeof date === "string") {
      return date.slice(0, 19).replaceAll("-", ".").replace("T", " ");
    } else {
      return date
        .toDate()
        .toLocaleString("en-GB", {
          timeZone: "UTC",
        })
        .replaceAll("/", ".");
    }
  }

  return (
    <>
      <div className="table-style">
        <table>
          <tbody>
            <tr>
              <td>Battle Title:</td>
              <td>{props.battleboard.Title}</td>
            </tr>
            <tr>
              <td>Battle Id:</td>
              <td>{props.battleboard.Id}</td>
            </tr>
            <tr>
              <td>Start Time:</td>
              <td>{ReturnDate(props.battleboard.StartTime)}</td>
            </tr>
            <tr>
              <td>Total Players:</td>
              <td>{props.battleboard.TotalPlayers}</td>
            </tr>
            <tr>
              <td>Total Kills:</td>
              <td>{props.battleboard.TotalKills}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
