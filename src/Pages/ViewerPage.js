import React, { useState } from "react";
import NavBar from "../Components/NavBar";
import BattleInfo from "../Battleboard/BattleInfo";
import AllianceTable from "../Battleboard/AllianceTable";
import GuildTable from "../Battleboard/GuildTable";
import PlayersTable from "../Battleboard/PlayersTable";
import {
  combineBattleboards,
  returnConvertedBattleboard,
} from "../AlbionApiParser";

export default function ViewerPage() {
  const [battleId, setBattleId] = useState("");
  const [battle, setBattle] = useState();

  async function fetchData(id) {
    const response = fetch(
      `https://cors-anywhere.herokuapp.com/https://gameinfo.albiononline.com/api/gameinfo/battles/${id}`,
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
      <div className="tooltip">
        INFO
        <span className="tooltiptext">
          You can create combined killboard by entering ids separated with
          comma.
        </span>
      </div>
      <ShowBattleboard />
    </>
  );
}
