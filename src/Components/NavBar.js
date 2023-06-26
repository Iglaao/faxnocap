import React from "react";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();
  const navigateToPlayers = () => {
    navigate("/players");
  };
  return (
    <nav>
      <button onClick={navigateToPlayers} type="button">
        Player Stats
      </button>
      <button href="">Battleboard Viewer</button>
      <button href="">Attendance</button>
    </nav>
  );
}
