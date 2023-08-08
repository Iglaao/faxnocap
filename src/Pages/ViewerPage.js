import React, { useState } from "react";
import NavBar from "../Components/NavBar";
import BattleInfo from "../Tables/Battleboard/BattleInfo";
import AllianceTable from "../Tables/Battleboard/AllianceTable";
import GuildTable from "../Tables/Battleboard/GuildTable";
import PlayerTable from "../Tables/Battleboard/PlayersTable";
import InformationIcon from "../Icons/information_icon.svg";

import {
  combineBattleboards,
  returnConvertedBattleboard,
} from "../Functions/AlbionApiParser";
import Footer from "../Components/Footer";
import MostChart from "../Components/MostChart";

export default function ViewerPage() {
  const [battleId, setBattleId] = useState("");
  const [battle, setBattle] = useState();

  async function fetchData(id) {
    const response = fetch(
      `https://gameinfo.albiononline.com/api/gameinfo/battles/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    return (await response).json();
  }
  function getMostData(data, atr) {
    var guilds = Object.values(data.Guilds).filter(
      (guild) => guild.Alliance === ""
    );
    var alliances = Object.values(data.Alliances);
    var all = [...guilds, ...alliances].sort((a, b) => {
      return b[atr] - a[atr];
    });
    var top = all.splice(0, 3);
    return { max: top[0][atr], data: top };
  }

  const handleFetch = async (event) => {
    event.preventDefault();
    var ids = battleId.split(",");
    var battles = [];
    await Promise.all(
      ids.map(async (id) => {
        battles.push(returnConvertedBattleboard(await fetchData(id)));
      })
    );
    setBattle(combineBattleboards(battles));
  };

  function ShowBattleboard() {
    if (battle) {
      return (
        <>
          <div className="battlewrapper">
            <div className="card">
              <div className="title">Battle info:</div>
              <BattleInfo battleboard={battle} />
            </div>
            <div className="most">
              <div className="card">
                <MostChart
                  data={getMostData(battle, "Players")}
                  atr={"Players"}
                />
              </div>
              <div className="card">
                <MostChart data={getMostData(battle, "Kills")} atr={"Kills"} />
              </div>
              <div className="card">
                <MostChart
                  data={getMostData(battle, "KillFame")}
                  atr={"KillFame"}
                />
              </div>
              <div className="card">
                <MostChart
                  data={getMostData(battle, "Deaths")}
                  atr={"Deaths"}
                />
              </div>
            </div>
            <div className="algutabs">
              <div className="card cardbattletable">
                <div className="title">Alliances:</div>
                <AllianceTable battleboard={Object.values(battle.Alliances)} />
              </div>
              <div className="card cardbattletable">
                <div className="title">Guilds:</div>
                <GuildTable battleboard={Object.values(battle.Guilds)} />
              </div>
            </div>
            <div
              className="card cardbattletable"
              style={{ alignSelf: "center" }}
            >
              <div className="title">Players:</div>
              <PlayerTable battleboard={Object.values(battle.Players)} />
            </div>
          </div>
        </>
      );
    }
  }
  return (
    <>
      <NavBar />
      <div className="input-tooltip">
        <form onSubmit={handleFetch}>
          <input
            type="text"
            id="id-input"
            value={battleId}
            placeholder={"Enter battle id"}
            onChange={(e) => setBattleId(e.target.value)}
          />
        </form>
        <div className="tooltip">
          <img src={InformationIcon} alt="Information Icon" />
          <span className="tooltiptext">
            You can create combined killboard by entering ids separated with
            comma.
          </span>
        </div>
      </div>
      <ShowBattleboard />
      <Footer />
    </>
  );
}
