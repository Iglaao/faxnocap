import React from "react";
import PlayersIcon from "../../Icons/Players_icon.svg";
import KillsIcon from "../../Icons/Kills_icon.svg";
import ClockIcon from "../../Icons/clock_icon.svg";
import TagIcon from "../../Icons/tag_icon.svg";
import TitleIcon from "../../Icons/title_icon.svg";

export default function battleHeader(props) {
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
    <>
      <div className="table-style" style={{ padding: "0px 0px 15px 0px" }}>
        <table>
          <tbody>
            <tr>
              <td>
                <div className="battleHeader">
                  <img src={TitleIcon} alt="Title Icon" />
                  <span>Battle Title:</span>
                </div>
              </td>
              <td className="battleData">{props.battleboard.Title}</td>
            </tr>
            <tr>
              <td>
                <div className="battleHeader">
                  <img src={TagIcon} alt="Tag Icon" />
                  Battle Id:
                </div>
              </td>
              <td className="battleData">{props.battleboard.Id}</td>
            </tr>
            <tr>
              <td>
                <div className="battleHeader">
                  <img src={ClockIcon} alt="Clock Icon" />
                  Start Time:
                </div>
              </td>
              <td className="battleData">
                {ReturnDate(props.battleboard.StartTime)}
              </td>
            </tr>
            <tr>
              <td>
                <div className="battleHeader">
                  <img src={PlayersIcon} alt="Players Icon" />
                  Total Players:
                </div>
              </td>
              <td className="battleData">{props.battleboard.TotalPlayers}</td>
            </tr>
            <tr>
              <td>
                <div className="battleHeader">
                  <img src={KillsIcon} alt="Kills Icon" />
                  Total Kills:
                </div>
              </td>
              <td className="battleData">{props.battleboard.TotalKills}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
