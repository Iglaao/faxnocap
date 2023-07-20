import React, { useState } from "react";
import TableNavig from "../Components/TableNavig";
import { formatValue } from "../FameFormatter";

export default function PlayersTable(props) {
  const [offset, setOffset] = useState(0);
  const [slice] = useState(10);

  const handleOffset = (s) => {
    setOffset(s);
  };
  return (
    <>
      <div className="table-style">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Guild</th>
              <th>Alliance</th>
              <th>Kills</th>
              <th>Deaths</th>
              <th>Kill Fame</th>
            </tr>
          </thead>
          <tbody>
            {props.battleboard
              .slice(offset * 10, (offset + 1) * 10)
              .map((player, index) => (
                <tr key={index}>
                  <td>{player.Name}</td>
                  <td>{player.GuildName}</td>
                  <td>{player.AllianceName}</td>
                  <td>{player.Kills}</td>
                  <td>{player.Deaths}</td>
                  <td>{formatValue(player.KillFame)}</td>
                </tr>
              ))}
          </tbody>
        </table>
        <TableNavig
          onTableChange={handleOffset}
          offsetValue={offset}
          sliceValue={slice}
          battles={props.battleboard.length}
        />
      </div>
    </>
  );
}
