import React from "react";

export default function PlayersTable(props) {
  return (
    console.log(props.info),
    (
      <>
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
            {props.info.map((player, index) => (
              <tr key={index}>
                <td>{player.Name}</td>
                <td>{player.GuildName}</td>
                <td>{player.AllianceName}</td>
                <td>{player.Kills}</td>
                <td>{player.Deaths}</td>
                <td>{player.KillFame}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    )
  );
}
