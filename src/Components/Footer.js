import React from "react";
import DiscordIcon from "../Icons/discord_icon.svg";

export default function Footer() {
  return (
    <>
      <footer className="footer">
        Just Fax, We don't cap. Made by
        <img src={DiscordIcon} alt="Discord Icon" />
        Iglaa
      </footer>
    </>
  );
}
