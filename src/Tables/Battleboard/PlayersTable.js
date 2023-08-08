import React, { useState } from "react";
import TableNavig from "../../Components/TableNavig";
import { formatValue } from "../../Functions/FameFormatter";
import useSortableData from "../../Functions/SortableData";

export default function PlayersTable(props) {
  const [offset, setOffset] = useState(0);
  const [slice] = useState(10);

  const { items, requestSort, sortConfig } = useSortableData(
    props.battleboard,
    { key: "Kills" }
  );
  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };
  const handleOffset = (s) => {
    setOffset(s);
  };

  return (
    <>
      <div className="table-style">
        <table>
          <thead>
            <tr>
              <th>
                <button
                  style={{ justifyContent: "left" }}
                  onClick={() => requestSort("Name")}
                  className={getClassNamesFor("Name")}
                >
                  Name
                </button>
              </th>
              <th>
                <button
                  style={{ justifyContent: "left" }}
                  onClick={() => requestSort("GuildName")}
                  className={getClassNamesFor("GuildName")}
                >
                  Guild
                </button>
              </th>
              <th>
                <button
                  style={{
                    justifyContent: "left",
                  }}
                  onClick={() => requestSort("AllianceName")}
                  className={getClassNamesFor("AllianceName")}
                >
                  Alliance
                </button>
              </th>
              <th>
                <button
                  onClick={() => requestSort("Kills")}
                  className={getClassNamesFor("Kills")}
                >
                  Kills
                </button>
              </th>
              <th>
                <button
                  onClick={() => requestSort("Deaths")}
                  className={getClassNamesFor("Deaths")}
                >
                  Deaths
                </button>
              </th>
              <th>
                <button
                  onClick={() => requestSort("KillFame")}
                  className={getClassNamesFor("KillFame")}
                >
                  Kill Fame
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {items
              .slice(offset * 10, (offset + 1) * 10)
              .map((player, index) => (
                <tr key={index}>
                  <td style={{ textAlign: "left", paddingLeft: "5px" }}>
                    {player.Name}
                  </td>
                  <td style={{ textAlign: "left" }}>{player.GuildName}</td>
                  <td style={{ textAlign: "left" }}>{player.AllianceName}</td>
                  <td>{player.Kills}</td>
                  <td>{player.Deaths}</td>
                  <td style={{ wordBreak: "keep-all" }}>
                    {formatValue(player.KillFame)}
                  </td>
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
