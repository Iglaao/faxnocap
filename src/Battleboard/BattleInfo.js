import React from "react";

export default function BattleInfo(props) {
  return (
    <>
      <div>BattleInfo</div>
      <table>
        <tbody>
          <tr>
            <td>Battle Title:</td>
            <td>{props.info.Title}</td>
          </tr>
          <tr>
            <td>Battle Id:</td>
            <td>{props.info.Id}</td>
          </tr>
          <tr>
            <td>Start Time:</td>
            <td>
              {props.info.StartTime.toDate()
                .toLocaleString("en-GB", {
                  timeZone: "UTC",
                })
                .replaceAll("/", ".")}
            </td>
          </tr>
          <tr>
            <td>Total Players:</td>
            <td>{props.info.TotalPlayers}</td>
          </tr>
          <tr>
            <td>Total Kills:</td>
            <td>{props.info.TotalKills}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
