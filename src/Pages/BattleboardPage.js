import React, { useEffect, useState } from "react";
import BattleInfo from "../Battleboard/BattleInfo";
import AllianceTable from "../Battleboard/AllianceTable";
import GuildTable from "../Battleboard/GuildTable";
import PlayerTable from "../Battleboard/PlayersTable";
import { db } from "../firebase";
import { doc, getDoc, Timestamp } from "firebase/firestore";
import NavBar from "../Components/NavBar";
import { useLocation } from "react-router-dom";
import Footer from "../Components/Footer";
import MostChart from "../Components/MostChart";

export default function BattleboardPage() {
  const [bb, setBB] = useState();
  const location = useLocation();
  const battleId = location.state?.id;
  const battleTime = location.state?.date;
  const season = location.state?.season;

  async function fetchBattleboard() {
    var docSnap = await getDoc(doc(db, season, battleTime));
    if (docSnap.exists()) {
      const collectionData = docSnap.data();
      const docData = Object.entries(collectionData).find(
        (x) => x[0] === battleId
      )[1];
      if (typeof docData === "string" || docData instanceof String) {
        var temp = JSON.parse(docData);
        temp.StartTime = Timestamp.fromDate(new Date(temp.StartTime));
        setBB(temp);
      } else {
        setBB(docData);
      }
    } else {
      setBB(null);
    }
  }

  //atr = Players/Kills/Deaths
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

  useEffect(() => {
    fetchBattleboard();
  }, []);

  if (bb) {
    return (
      <>
        <NavBar />
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-evenly",
          }}
        >
          <div className="card">
            <MostChart data={getMostData(bb, "Players")} atr={"Players"} />
          </div>
          <div className="card">
            <MostChart data={getMostData(bb, "Kills")} atr={"Kills"} />
          </div>
          <div className="card">
            <MostChart data={getMostData(bb, "KillFame")} atr={"KillFame"} />
          </div>
          <div className="card">
            <BattleInfo battleboard={bb} />
          </div>
          <div className="card">
            <AllianceTable battleboard={Object.values(bb.Alliances)} />
          </div>
          <div className="card">
            <GuildTable battleboard={Object.values(bb.Guilds)} />
          </div>
          <div className="card">
            <PlayerTable battleboard={Object.values(bb.Players)} />
          </div>
        </div>
        <Footer />
      </>
    );
  } else {
    return (
      <>
        <NavBar />
        <div>Empty</div>
      </>
    );
  }
}
