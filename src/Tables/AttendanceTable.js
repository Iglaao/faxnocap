import React from "react";
import { useNavigate } from "react-router-dom";
import useSortableData from "../Functions/SortableData";

export default function AttendanceTable(props) {
  const navigate = useNavigate();

  const { items, requestSort, sortConfig } = useSortableData(props.data, {
    key: "Attendance",
  });
  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };
  const navigateToPlayer = (player) => {
    navigate(`/playerStats/${player}`, {});
  };

  return (
    <>
      <div className="table-style">
        <table>
          <thead>
            <tr>
              <th>i</th>
              <th>
                <button
                  style={{
                    justifyContent: "left",
                  }}
                  onClick={() => requestSort("Name")}
                  className={getClassNamesFor("Name")}
                >
                  Name
                </button>
              </th>
              <th>
                <button
                  style={{ justifyContent: "right" }}
                  onClick={() => requestSort("Kills")}
                  className={getClassNamesFor("Kills")}
                >
                  Kills
                </button>
              </th>
              <th>
                <button
                  style={{ justifyContent: "right" }}
                  onClick={() => requestSort("Deaths")}
                  className={getClassNamesFor("Deaths")}
                >
                  Deaths
                </button>
              </th>
              <th>
                <button
                  style={{ justifyContent: "right" }}
                  onClick={() => requestSort("Attendance")}
                  className={getClassNamesFor("Attendance")}
                >
                  Attendance
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((player, index) => (
              <tr key={index}>
                <td style={{ textAlign: "center", wordBreak: "normal" }}>
                  {index}
                </td>
                <td style={{ textAlign: "left" }}>
                  <a
                    href=""
                    onClick={() => {
                      navigateToPlayer(player.Name);
                    }}
                  >
                    {player.Name}
                  </a>
                </td>
                <td style={{ paddingRight: "10px" }}>{player.Kills}</td>
                <td style={{ paddingRight: "10px" }}>{player.Deaths}</td>
                <td style={{ paddingRight: "10px" }}>{player.Attendance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
