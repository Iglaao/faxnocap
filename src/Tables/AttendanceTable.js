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
      <table style={{ color: "white" }}>
        <thead>
          <tr>
            <th>i</th>
            <th>
              <button
                style={{ justifyContent: "left", paddingLeft: "5px" }}
                onClick={() => requestSort("Name")}
                className={getClassNamesFor("Name")}
              >
                Name
              </button>
            </th>
            <th>
              <button
                style={{ justifyContent: "left", paddingLeft: "5px" }}
                onClick={() => requestSort("Kills")}
                className={getClassNamesFor("Kills")}
              >
                Kills
              </button>
            </th>
            <th>
              <button
                style={{ justifyContent: "left", paddingLeft: "5px" }}
                onClick={() => requestSort("Deaths")}
                className={getClassNamesFor("Deaths")}
              >
                Deaths
              </button>
            </th>
            <th>
              <button
                style={{ justifyContent: "left", paddingLeft: "5px" }}
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
              <td>{index}</td>
              <td>
                <a
                  href=""
                  onClick={() => {
                    navigateToPlayer(player.Name);
                  }}
                >
                  {player.Name}
                </a>
              </td>
              <td>{player.Kills}</td>
              <td>{player.Deaths}</td>
              <td>{player.Attendance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
