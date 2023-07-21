import React, { useEffect, useState } from "react";
import BattleInfo from "../Battleboard/BattleInfo";
import AllianceTable from "../Battleboard/AllianceTable";
import GuildTable from "../Battleboard/GuildTable";
import PlayerTable from "../Battleboard/PlayersTable";
import { db } from "../firebase";
import { collection, doc, getDoc, Timestamp } from "firebase/firestore";
import NavBar from "../Components/NavBar";
import { useLocation, useNavigate } from "react-router-dom";

export default function BattleboardPage() {
  const [bb, setBB] = useState();
  const location = useLocation();
  const battleId = location.state?.id;
  const battleTime = location.state?.date;
  const season = location.state?.season;
  const navigate = useNavigate();

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
