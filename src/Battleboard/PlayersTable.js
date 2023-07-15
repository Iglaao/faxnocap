import React, { useState } from "react";

export default function PlayersTable(props) {
  const [offset, setOffset] = useState(0);
  function incrementOffset() {
    if (Math.floor(props.battleboard.length / 10) === offset) return;
    setOffset(offset + 1);
  }
  function decrementOffset() {
    if (offset === 0) return;
    setOffset(offset - 1);
  }
  function setOffsetToStart() {
    setOffset(0);
  }
  function setOffsetToEnd() {
    setOffset(Math.floor(props.battleboard.length / 10));
  }
  return (
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
          {props.battleboard
            .slice(offset * 10, (offset + 1) * 10)
            .map((player, index) => (
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
      <button onClick={setOffsetToStart}>start</button>
      <button onClick={decrementOffset}>back</button>
      <button onClick={incrementOffset}>next</button>
      <button onClick={setOffsetToEnd}>end</button>
    </>
  );
}
