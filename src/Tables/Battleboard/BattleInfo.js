import React from "react";
import PlayersIcon from "../../Icons/Players_icon.svg";
import KillsIcon from "../../Icons/Kills_icon.svg";
import ClockIcon from "../../Icons/clock_icon.svg";
import TagIcon from "../../Icons/tag_icon.svg";
import TitleIcon from "../../Icons/title_icon.svg";

export default function BattleInfo(props) {
  function ReturnDate(date) {
    if (typeof date === "string") {
      return date.slice(0, 19).replaceAll("-", ".").replace("T", " ");
    } else {
      return date
        .toDate()
        .toLocaleString("en-GB", {
          timeZone: "UTC",
        })
        .replaceAll("/", ".");
    }
  }

  return (
    console.log(props),
    (
      <>
        <div className="table-style">
          <table>
            <tbody>
              <tr>
                <td>
                  <img src={TitleIcon} alt="Title Icon" />
                  Battle Title:
                </td>
                <td>{props.battleboard.Title}</td>
              </tr>
              <tr>
                <td>
                  <img src={TagIcon} alt="Tag Icon" />
                  Battle Id:
                </td>
                <td>{props.battleboard.Id}</td>
              </tr>
              <tr>
                <td>
                  <img src={ClockIcon} alt="Clock Icon" />
                  Start Time:
                </td>
                <td>{ReturnDate(props.battleboard.StartTime)}</td>
              </tr>
              <tr>
                <td>
                  <img src={PlayersIcon} alt="Players Icon" />
                  Total Players:
                </td>
                <td>{props.battleboard.TotalPlayers}</td>
              </tr>
              <tr>
                <td>
                  <img src={KillsIcon} alt="Kills Icon" />
                  Total Kills:
                </td>
                <td>{props.battleboard.TotalKills}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </>
    )
  );
}
