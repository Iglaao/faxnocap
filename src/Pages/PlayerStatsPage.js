import React, { useEffect, useState } from "react";
import NavBar from "../Components/NavBar";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import DataChart from "../Components/DataChart";
import { getAggregatedData, getDataMap } from "../ChartFunctions";
import PieChart from "../Components/PieChart";
import PlayerCard from "../Components/PlayerCard";

export default function PlayerStatsPage({ match }) {
  const playerName = useParams().playerName;
  const [playerData, setPlayerData] = useState();
  const [lastData, setLastData] = useState();

  const season = "s20";
  const gatheringPaths = [
    "LifetimeStatistics.FishingFame",
    "LifetimeStatistics.Gathering.All.Total",
    "LifetimeStatistics.Gathering.Fiber.Total",
    "LifetimeStatistics.Gathering.Hide.Total",
    "LifetimeStatistics.Gathering.Ore.Total",
    "LifetimeStatistics.Gathering.Rock.Total",
    "LifetimeStatistics.Gathering.Wood.Total",
  ];
  const pvePaths = [
    "LifetimeStatistics.PvE.Avalon",
    "LifetimeStatistics.PvE.CorruptedDungeon",
    "LifetimeStatistics.PvE.Hellgate",
    "LifetimeStatistics.PvE.Mists",
    "LifetimeStatistics.PvE.Outlands",
    "LifetimeStatistics.PvE.Royal",
    "LifetimeStatistics.PvE.Total",
  ];
  const attendancePath = ["Attendance"];
  const famePaths = ["KillFame", "DeathFame"];

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

  if (playerData && lastData) {
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
            <DataChart values={getDataMap(playerData, attendancePath)} />
          </div>
          <div className="card">
            <div className="title">Attendance</div>
            <DataChart values={getAggregatedData(playerData, attendancePath)} />
          </div>
          <div className="card">
            <div className="title">PvP Fame</div>
            <DataChart values={getDataMap(playerData, famePaths, true)} />
          </div>
          <div className="card">
            <div className="title">Gathering Fame</div>
            <DataChart values={getDataMap(playerData, gatheringPaths, true)} />
          </div>
          <div className="card">
            <div className="title">PvE Fame</div>
            <DataChart values={getDataMap(playerData, pvePaths, true)} />
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
      </>
    );
  }
}
