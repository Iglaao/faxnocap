import React from "react";

export default function GuildTable(props) {
  return (
    <>
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
          {props.battleboard.map((guild, index) => (
            <tr key={index}>
              <td>{guild.Name}</td>
              <td>{guild.Alliance}</td>
              <td>{guild.Players}</td>
              <td>{guild.Kills}</td>
              <td>{guild.Deaths}</td>
              <td>{guild.KillFame}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
