import React, { useState } from "react";
import NavBar from "../Components/NavBar";
import BattleInfo from "../Battleboard/BattleInfo";
import AllianceTable from "../Battleboard/AllianceTable";
import GuildTable from "../Battleboard/GuildTable";
import PlayersTable from "../Battleboard/PlayersTable";

export default function ViewerPage() {
  const [battleId, setBattleId] = useState("");
  const [battle, setBattle] = useState();

  const handleFetch = async (event) => {
    event.preventDefault();
    //TODO REMOVE HEROKU BYPASS
    fetch(
      `https://cors-anywhere.herokuapp.com/https://gameinfo.albiononline.com/api/gameinfo/battles/${battleId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        let bb = {
          Title: "",
          Id: data.id,
          StartTime: data.startTime,
          TotalPlayers: Object.keys(data.players).length,
          TotalKills: data.totalKills,
          Players: Object.entries(data.players).map((player) => {
            var playerData = {
              Name: player[1].name,
              GuildName: player[1].guildName,
              AllianceName: player[1].allianceName,
              Kills: player[1].kills,
              Deaths: player[1].deaths,
              KillFame: player[1].killFame,
            };
            return playerData;
          }),
          Guilds: Object.entries(data.guilds).map((guild) => {
            var guildData = {
              Name: guild[1].name,
              Alliance: guild[1].alliance,
              Players: Object.entries(data.players).filter(
                (player) => player[1].guildName === guild[1].name
              ).length,
              Kills: guild[1].kills,
              Deaths: guild[1].deaths,
              KillFame: guild[1].killFame,
            };
            return guildData;
          }),
          Alliances: Object.entries(data.alliances).map((alliance) => {
            var allianceData = {
              Name: alliance[1].name,
              Players: Object.entries(data.players).filter(
                (player) => player[1].allianceName === alliance[1].name
              ).length,
              Kills: alliance[1].kills,
              Deaths: alliance[1].deaths,
              KillFame: alliance[1].killFame,
            };
            return allianceData;
          }),
        };
        setBattle(bb);
      });
  };
  function ShowBattleboard() {
    if (battle) {
      return (
        <>
          <BattleInfo battleboard={battle} />
          <AllianceTable battleboard={Object.values(battle.Alliances)} />
          <GuildTable battleboard={Object.values(battle.Guilds)} />
          <PlayersTable battleboard={Object.values(battle.Players)} />
        </>
      );
    }
  }
  return (
    <>
      <NavBar />
      <div>ViewerPage</div>
      <form onSubmit={handleFetch}>
        <input
          type="text"
          id="id-input"
          value={battleId}
          placeholder={"Enter battle id"}
          onChange={(e) => setBattleId(e.target.value)}
        />
      </form>
      <ShowBattleboard />
    </>
  );
}
