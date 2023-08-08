import React from "react";
import { formatValue } from "../Functions/FameFormatter";

export default function GuildInfoTable(props) {
  return (
    <>
      <table>
        <tbody>
          <tr>
            <th style={{ textAlign: "left" }}>Guild Name:</th>
            <td>{props.values.Name}</td>
          </tr>
          <tr>
            <th style={{ textAlign: "left" }}>Alliance Name:</th>
            <td>{props.values.AllianceTag}</td>
          </tr>
          <tr>
            <th style={{ textAlign: "left" }}>Kill Fame:</th>
            <td>{formatValue(props.values.KillFame)}</td>
          </tr>
          <tr>
            <th style={{ textAlign: "left" }}>Death Fame:</th>
            <td>{formatValue(props.values.DeathFame)}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
