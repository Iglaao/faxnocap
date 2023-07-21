import React from "react";
import { formatValue } from "../FameFormatter";

export default function GuildInfoTable(props) {
  return (
    <>
      <table>
        <tbody>
          <table>
            <tbody>
              <tr>
                <th>Guild Name:</th>
                <td>{props.values.Name}</td>
              </tr>
              <tr>
                <th>Alliance Name:</th>
                <td>{props.values.AllianceTag}</td>
              </tr>
              <tr>
                <th>Kill Fame:</th>
                <td>{formatValue(props.values.KillFame)}</td>
              </tr>
              <tr>
                <th>Death Fame:</th>
                <td>{formatValue(props.values.DeathFame)}</td>
              </tr>
            </tbody>
          </table>
        </tbody>
      </table>
    </>
  );
}
