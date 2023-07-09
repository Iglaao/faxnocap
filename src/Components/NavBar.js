import React from "react";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();
  const navigateToPlayers = () => {
    navigate("/players");
  };
  const navigateToHomePage = () => {
    navigate("/");
  };
  return (
    <nav>
      <button onClick={navigateToHomePage} type="button">
        Home
      </button>
      <button onClick={navigateToPlayers} type="button">
        Player Stats
      </button>
      <button href="">Battleboard Viewer</button>
      <button href="">Attendance</button>
    </nav>
  );
}
