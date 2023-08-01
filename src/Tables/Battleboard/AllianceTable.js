import React, { useState } from "react";
import TableNavig from "../../Components/TableNavig";
import { formatValue } from "../../Functions/FameFormatter";
import useSortableData from "../../Functions/SortableData";

export default function AllianceTable(props) {
  const [offset, setOffset] = useState(0);
  const [slice] = useState(10);

  const { items, requestSort, sortConfig } = useSortableData(
    props.battleboard,
    { key: "KillFame" }
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
                  onClick={() => requestSort("Name")}
                  className={getClassNamesFor("Name")}
                >
                  Name
                </button>
              </th>
              <th>
                <button
                  onClick={() => requestSort("Players")}
                  className={getClassNamesFor("Players")}
                >
                  Players
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
