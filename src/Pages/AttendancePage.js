import React from "react";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
import { useState } from "react";
import { useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import AttendanceTable from "../Tables/AttendanceTable";
import TopAtt from "../Components/TopAtt";

export default function AttendancePage() {
  const [attendance, setAttendance] = useState();
  const [topStats, setTopStats] = useState();
  const season = "s20";

  async function fetchGuildAttendance() {
    var docSnap = await getDoc(doc(db, season + "dict", "attendance"));
    if (docSnap.exists()) {
      const data = docSnap.data();
      var parsedData = JSON.parse(data.attendanceData);
      var aggData = aggregatePlayerStats(parsedData.Date);
      setAttendance(aggData);
      setTopStats(findTopPlayersForEachCategory(Object.values(aggData)));
    }
  }
  function findTopPlayers(data, category) {
    return data
      .sort((a, b) => b[category] - a[category])
      .slice(0, 3)
      .map((player) => ({
        Name: player.Name,
        [category]: player[category],
      }));
  }
  function findTopPlayersForEachCategory(data) {
    const categories = ["Attendance", "Kills", "Deaths"];
    const topPlayers = {};

    categories.forEach((category) => {
      topPlayers[category] = findTopPlayers(data, category);
    });

    return topPlayers;
  }
  function aggregatePlayerStats(data) {
    const aggregatedStats = {};
    for (const date in data) {
      const playersAttendance = data[date].PlayersAttendance;

      for (const player in playersAttendance) {
        if (!aggregatedStats[player]) {
          aggregatedStats[player] = {
            Name: player,
            Attendance: 0,
            Kills: 0,
            Deaths: 0,
            Count: 0,
          };
        }

        aggregatedStats[player].Attendance +=
          playersAttendance[player].Attendance;
        aggregatedStats[player].Kills += playersAttendance[player].Kills;
        aggregatedStats[player].Deaths += playersAttendance[player].Deaths;
        aggregatedStats[player].Count++;
      }
    }
    return aggregatedStats;
  }

  useEffect(() => {
    fetchGuildAttendance();
  }, []);

  if (attendance) {
    return (
      <>
        <NavBar />
        <div className="attendance">
          <div className="topcards">
            <div className="card" style={{ width: "350px" }}>
              <TopAtt data={topStats.Attendance} atr={"Attendance"} />
            </div>
            <div className="card" style={{ width: "350px" }}>
              <TopAtt data={topStats.Kills} atr={"Kills"} />
            </div>
            <div className="card" style={{ width: "350px" }}>
              <TopAtt data={topStats.Deaths} atr={"Deaths"} />
            </div>
          </div>
          <div className="card">
            <AttendanceTable data={Object.values(attendance)} />
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
