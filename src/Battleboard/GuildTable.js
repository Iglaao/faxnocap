import React, { useState } from "react";
import TableNavig from "../Components/TableNavig";
import { formatValue } from "../Functions/FameFormatter";

export default function GuildTable(props) {
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
              <th>Alliance</th>
              <th>Players</th>
              <th>Kills</th>
              <th>Deaths</th>
              <th>Kill Fame</th>
            </tr>
          </thead>
          <tbody>
            {props.battleboard
              .slice(offset * 10, (offset + 1) * 10)
              .map((guild, index) => (
                <tr key={index}>
                  <td>{guild.Name}</td>
                  <td>{guild.Alliance}</td>
                  <td>{guild.Players}</td>
                  <td>{guild.Kills}</td>
                  <td>{guild.Deaths}</td>
                  <td>{formatValue(guild.KillFame)}</td>
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
