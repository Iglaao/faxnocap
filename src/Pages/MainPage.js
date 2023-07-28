import React, { useEffect, useState } from "react";
import NavBar from "../Components/NavBar";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import SeasonSelect from "../Components/SeasonSelect";
import Footer from "../Components/Footer";
import DataChart from "../Components/DataChart";
import { getDataMap } from "../Functions/ChartFunctions";
import GuildLogo from "../Images/fax_logo.png";
import GuildInfoTable from "../Battleboard/GuildInfoTable";
import BattlesTable from "../Battleboard/BattlesTable";

export default function MainPage() {
  const [season, setSeason] = useState("s20");
  const [lastBattles, setLastBattles] = useState();
  const [guildStats, setGuildStats] = useState();

  async function fetchLastBattles() {
    var docSnap = await getDoc(doc(db, season + "dict", "dict"));
    if (docSnap.exists()) {
      const data = docSnap.data();
      setLastBattles(
        Object.entries(data).sort((a, b) => {
          if (
            typeof a[1] === "object" &&
            typeof b[1] === "object" &&
            a[1].StartTime &&
            b[1].StartTime
          ) {
            const startTimeA = a[1].StartTime.seconds;
            const startTimeB = b[1].StartTime.seconds;
            return startTimeB - startTimeA;
          }
          return 0;
        })
      );
    } else {
      setLastBattles(null);
    }
  }
  async function fetchGuildStatistics() {
    var docSnap = await getDoc(doc(db, season, "stats"));
    if (docSnap.exists()) {
      const data = docSnap.data();
      setGuildStats(data);
    } else {
      setLastBattles(null);
    }
  }

  function getLastGuildData() {
    var lastData = Object.entries(guildStats)
      .sort((a, b) => {
        if (typeof a[0] === "string" && typeof b[0] === "string") {
          const dateA = a[0].split(".").reverse().join("");
          const dateB = b[0].split(".").reverse().join("");
          return dateA.localeCompare(dateB);
        } else {
          return 0;
        }
      })
      .pop();
    return lastData[1];
  }

  const handleSelect = (s) => {
    setLastBattles(null);
    setSeason(s);
    fetchLastBattles();
  };

  useEffect(() => {
    fetchLastBattles();
    fetchGuildStatistics();
  }, []);

  if (lastBattles && guildStats) {
    return (
      <>
        <NavBar />
        {/* <SeasonSelect onSelectChange={handleSelect} selectedSeason={season} /> */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "90%",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <div style={{ paddingRight: "10px" }}>
            <div className="card">
              <img
                style={{
                  height: "200px",
                  width: "200px",
                }}
                src={GuildLogo}
                alt="Guild Logo"
              />
              <GuildInfoTable values={getLastGuildData()} />
            </div>
            <div className="card">
              <div className="title">Guild PvP Fame</div>
              <DataChart values={getDataMap(guildStats, "pvp")} />
            </div>
          </div>
          <div
            className="card"
            style={{ width: "100%", minHeight: "340px", height: "100%" }}
          >
            <div className="title">Last battles</div>
            <BattlesTable battles={lastBattles} season={season} />
          </div>
        </div>
        <Footer />
      </>
    );
  } else {
    return (
      <>
        <NavBar />
        <SeasonSelect onSelectChange={handleSelect} selectedSeason={season} />
        <div>Empty</div>
      </>
    );
  }
}
