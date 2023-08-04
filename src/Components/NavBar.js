import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import DiscordIcon from "../Icons/discord_icon.svg";
import HomeIcon from "../Icons/home_icon.svg";
import SearchIcon from "../Icons/search_icon.svg";
import UsersIcon from "../Icons/users_icon.svg";
import HamburgerIcon from "../Icons/hamburger_icon.svg";

export default function NavBar() {
  const toggleButton = useRef(null);
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

  useEffect(() => {
    const navRightButtons = document.querySelector(".right-side");
    const navLeftButtons = document.querySelector(".left-side");
    toggleButton.current.addEventListener("click", () => {
      navRightButtons.classList.toggle("active");
      navLeftButtons.classList.toggle("active");
      console.log("click");
    });
  }, []);

  return (
    <>
      <nav className="navbar">
        <a href="#" className="toggle-button" ref={toggleButton}>
          <img src={HamburgerIcon} alt="Hamburger Icon" />
        </a>
        <div className="left-side">
          <div className="left-side navbtn">
            <button onClick={navigateToHomePage}>
              <img src={HomeIcon} alt="Home Icon" />
              Home
            </button>
          </div>
          <div className="left-side navbtn">
            <button onClick={navigateToPlayers}>
              <img src={UsersIcon} alt="Users Icon" />
              Player Stats
            </button>
          </div>
          <div className="left-side navbtn">
            <button onClick={navigateToBattleviewer}>
              <img src={SearchIcon} alt="Search Icon" />
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
