import React from "react";

export default function BattleInfo(props) {
  return (
    <>
      <div>BattleInfo</div>
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
            <td>
              {props.battleboard.StartTime.toDate()
                .toLocaleString("en-GB", {
                  timeZone: "UTC",
                })
                .replaceAll("/", ".")}
            </td>
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
    </>
  );
}