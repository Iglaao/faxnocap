import React, { useEffect, useState } from "react";
import NavBar from "../Components/NavBar";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import DataChart from "../Components/DataChart";
import { getAggregatedData, getDataMap } from "../ChartFunctions";

export default function PlayerStatsPage({ match }) {
  const playerName = useParams().playerName;
  const [playerData, setPlayerData] = useState();
  const [skip, setSkip] = useState();
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
  const attendancePath = ["Attendance"];
  const famePaths = ["KillFame", "DeathFame"];
  async function fetchPlayerStats() {
    var docSnap = await getDoc(doc(db, season + "members", playerName));
    if (docSnap.exists()) {
      var data = docSnap.data();
      console.log(data);
      setPlayerData(data);
    }
  }

  useEffect(() => {
    fetchPlayerStats();
  }, []);

  if (playerData) {
    return (
      <>
        <NavBar />
        <div>{playerName}</div>
        <DataChart
          values={getDataMap(playerData, attendancePath)}
          name={playerName + " attendance"}
        />
        <DataChart values={getAggregatedData(playerData, attendancePath)} />
        <DataChart values={getDataMap(playerData, gatheringPaths)} />
        <DataChart values={getDataMap(playerData, famePaths)} />
      </>
    );
  }
}
