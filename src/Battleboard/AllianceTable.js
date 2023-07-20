import React, { useState } from "react";
import TableNavig from "../Components/TableNavig";
import { formatValue } from "../FameFormatter";

export default function AllianceTable(props) {
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
              <th>Players</th>
              <th>Kills</th>
              <th>Deaths</th>
              <th>Kill Fame</th>
            </tr>
          </thead>
          <tbody>
            {props.battleboard
              .slice(offset * 10, (offset + 1) * 10)
              .map((alliance, index) => (
                <tr key={index}>
                  <td>{alliance.Name}</td>
                  <td>{alliance.Players}</td>
                  <td>{alliance.Kills}</td>
                  <td>{alliance.Deaths}</td>
                  <td>{formatValue(alliance.KillFame)}</td>
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
