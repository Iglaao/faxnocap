import React, { useState } from "react";

export default function AllianceTable(props) {
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
                <td>{alliance.KillFame}</td>
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
