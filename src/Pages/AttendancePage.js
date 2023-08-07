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
  const [maxValues, setMaxValues] = useState();
  const season = "s20";

  async function fetchGuildAttendance() {
    var docSnap = await getDoc(doc(db, season + "dict", "attendance"));
    if (docSnap.exists()) {
      const data = docSnap.data();
      var parsedData = JSON.parse(data.attendanceData);
      var aggData = aggregatePlayerStats(parsedData.Date);
      setAttendance(aggData);
      setMaxValues(returnMaxPlayers(Object.values(aggData)));
    }
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
    console.log(aggregatedStats);
    return aggregatedStats;
  }
  function returnMaxPlayers(data) {
    return data.reduce((acc, current) => {
      for (const key in current) {
        if (key !== "Name") {
          if (!acc[key] || current[key] > acc[key].value) {
            acc[key] = { value: current[key], players: [current.Name] };
          } else if (current[key] === acc[key].value) {
            acc[key].players.push(current.Name);
          }
        }
      }
      return acc;
    }, {});
  }

  useEffect(() => {
    fetchGuildAttendance();
  }, []);

  if (attendance) {
    return (
      <>
        <NavBar />
        <div className="card">
          <TopAtt data={maxValues} />
        </div>
        <div className="card">
          <AttendanceTable data={Object.values(attendance)} />
        </div>
        <Footer />
      </>
    );
  }
}
