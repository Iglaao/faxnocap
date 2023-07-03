import React, { useEffect } from "react";
import NavBar from "../Components/NavBar";
import { useParams } from "react-router-dom";

export default function PlayerStatsPage({ match }) {
  const playerName = useParams().playerName;
  return (
    console.log(playerName),
    (
      <>
        <NavBar />
        <div>{playerName}</div>
      </>
    )
  );
}
