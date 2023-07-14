import React from "react";
import { useNavigate } from "react-router-dom";
import DiscordIcon from "../Icons/discord_icon.svg";
import HomeIcon from "../Icons/home_icon.svg";
import SearchIcon from "../Icons/search_icon.svg";
import UsersIcon from "../Icons/users_icon.svg";

export default function NavBar() {
  const navigate = useNavigate();
  const navigateToPlayers = () => {
    navigate("/players");
  };

  const navigateToHomePage = () => {
    navigate("/");
  };

  const navigateToBattleviewer = () => {
    navigate("/battleviewer");
  };

  const handleDiscordButton = () => {
    window.open("https://discord.gg/faxnocap", "_blank");
  };

  return (
    <>
      <nav className="navbar">
        <div className="left-side">
          <div className="left-side navbtn">
            <button onClick={navigateToHomePage}>
              <img src={HomeIcon} alt="Discord Icon" />
              Home
            </button>
          </div>
          <div className="left-side navbtn">
            <button onClick={navigateToPlayers}>
              <img src={UsersIcon} alt="Discord Icon" />
              Player Stats
            </button>
          </div>
          <div className="left-side navbtn">
            <button onClick={navigateToBattleviewer}>
              <img src={SearchIcon} alt="Discord Icon" />
              Battleboard Viewer
            </button>
          </div>
        </div>
        <div className="right-side">
          <div className="right-side navbtn">
            <button onClick={handleDiscordButton}>
              <img src={DiscordIcon} alt="Discord Icon" />
              Discord
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
