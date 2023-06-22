import React from "react";

export default function AllianceTable(props) {
  return (
    <>
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
          {props.info.map((alliance, index) => (
            <tr key={index}>
              <td>{alliance.Name}</td>
              <td>{alliance.Players}</td>
              <td>{alliance.Kills}</td>
              <td>{alliance.Deaths}</td>
              <td>{alliance.KillFame}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
