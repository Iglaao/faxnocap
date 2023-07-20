import React from "react";
import { formatValue } from "../FameFormatter";

export default function PlayerCard(props) {
  return (
    <>
      <div className="card">
        <div className="title">
          <div>{props.values.Name}</div>
        </div>
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
                {formatValue(
                  props.values.LifetimeStatistics.Gathering.All.Total
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
