import React, { useEffect, useState } from "react";
import NavBar from "../Components/NavBar";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import DataChart from "../Components/DataChart";
import { getAggregatedData, getDataMap } from "../Functions/ChartFunctions";
import PieChart from "../Components/PieChart";
import PlayerCard from "../Components/PlayerCard";
import Footer from "../Components/Footer";

export default function PlayerStatsPage({ match }) {
  const playerName = useParams().playerName;
  const [playerData, setPlayerData] = useState();
  const [lastData, setLastData] = useState();
  const season = "s20";

  async function fetchPlayerStats() {
    var docSnap = await getDoc(doc(db, season + "members", playerName));
    if (docSnap.exists()) {
      var data = docSnap.data();
      setPlayerData(data);
      getLastData(data);
    }
  }

  function getLastData(data) {
    var arr = [];
    Object.keys(data).forEach((dkey) => {
      const [day, month, year] = dkey.split(".");
      var date = new Date(`${month}/${day}/${year}`);
      arr.push({
        key: dkey,
        date: new Date(date),
      });
    });
    arr.sort((a, b) => b.date - a.date);
    setLastData(data[arr[0].key]);
  }

  useEffect(() => {
    fetchPlayerStats();
  }, []);

  if (playerData && lastData.LifetimeStatistics) {
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
          <PlayerCard values={lastData} />
          <div className="card">
            <div className="title">Attendance per day</div>
            <DataChart values={getDataMap(playerData, "attendance")} />
          </div>
          <div className="card">
            <div className="title">Attendance</div>
            <DataChart values={getAggregatedData(playerData, "attendance")} />
          </div>
          <div className="card">
            <div className="title">PvP Fame</div>
            <DataChart values={getDataMap(playerData, "pvp", true)} />
          </div>
          <div className="card">
            <div className="title">Gathering Fame</div>
            <DataChart values={getDataMap(playerData, "gathering", true)} />
          </div>
          <div className="card">
            <div className="title">PvE Fame</div>
            <DataChart values={getDataMap(playerData, "pve", true)} />
          </div>
          <div className="card">
            <div className="title">PvE</div>
            <PieChart values={lastData.LifetimeStatistics.PvE} type={"pve"} />
          </div>
          <div className="card">
            <div className="title">Gathering</div>
            <PieChart values={lastData.LifetimeStatistics} type={"gathering"} />
          </div>
        </div>
        <Footer />
      </>
    );
  } else {
    return (
      <>
        <NavBar />
        <div style={{ color: "white" }}>Empty</div>
        <Footer />
      </>
    );
  }
}
