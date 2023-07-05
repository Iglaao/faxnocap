import React, { useEffect, useState } from "react";
import NavBar from "../Components/NavBar";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import DataChart from "../Components/DataChart";

export default function PlayerStatsPage({ match }) {
  const playerName = useParams().playerName;
  const [playerData, setPlayerData] = useState();
  const season = "s20";

  async function fetchPlayerStats() {
    var docSnap = await getDoc(doc(db, season + "members", playerName));
    if (docSnap.exists()) {
      var data = docSnap.data();
      setPlayerData(data);
    }
  }

  function getAttendance() {
    var attendance = [];
    Object.keys(playerData).forEach((dateKey) => {
      const [day, month, year] = dateKey.split(".");
      attendance.push({
        key: new Date(`${month}/${day}/${year}`),
        value:
          typeof playerData[dateKey].Attendance !== "undefined"
            ? playerData[dateKey].Attendance
            : 0,
      });
    });
    attendance.sort(function (a, b) {
      return new Date(a.key) - new Date(b.key);
    });
    return attendance;
  }
  function getAggAttendance() {
    var aggAttendance = getAttendance();
    aggAttendance = aggAttendance.reduce((accumulator, currentValue) => {
      const sum =
        accumulator.length > 0
          ? accumulator[accumulator.length - 1].value + currentValue.value
          : currentValue.value;
      accumulator.push({ key: currentValue.key, value: sum });
      return accumulator;
    }, []);
    return aggAttendance;
  }

  useEffect(() => {
    fetchPlayerStats();
  }, []);

  if (playerData) {
    return (
      <>
        <NavBar />
        <div>{playerName}</div>
        <DataChart values={getAttendance()} name={"Attendance"} />
        <DataChart values={getAggAttendance()} />
      </>
    );
  }
}
