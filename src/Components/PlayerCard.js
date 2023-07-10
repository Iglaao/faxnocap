import React from "react";

export default function PlayerCard(props) {
  function formatValue(value) {
    var formattedVal = 0;
    if (value.toString().length > 9) {
      formattedVal = value / 1000000000;
      return formattedVal.toFixed(2) + "B";
    }
    if (value.toString().length > 6) {
      formattedVal = value / 1000000;
      return formattedVal.toFixed(2) + "M";
    }
    if (value.toString().length > 3) {
      formattedVal = value / 1000;
      return formattedVal.toFixed(2) + "K";
    }
    return value;
  }
  return (
    <>
      <div>{props.values.Name}</div>
      <table>
        <tbody>
          <tr>
            <th>Kill Fame:</th>
            <td>{formatValue(props.values.KillFame)}</td>
          </tr>
          <tr>
            <th>Death Fame:</th>
            <td>{formatValue(props.values.DeathFame)}</td>
          </tr>
          <tr>
            <th>Kill/Death Fame Ratio:</th>
            <td>{props.values.FameRatio.toFixed(2)}</td>
          </tr>
          <tr>
            <th>PvE Fame:</th>
            <td>{formatValue(props.values.LifetimeStatistics.PvE.Total)}</td>
          </tr>
          <tr>
            <th>Gathering Fame:</th>
            <td>
              {formatValue(props.values.LifetimeStatistics.Gathering.All.Total)}
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
