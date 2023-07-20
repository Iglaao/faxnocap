import React, { useEffect, useState } from "react";
import NavBar from "../Components/NavBar";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import SeasonSelect from "../Components/SeasonSelect";
import { useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";
import TableSelect from "../Components/TableSelect";
import TableNavig from "../Components/TableNavig";

export default function MainPage() {
  const [season, setSeason] = useState("s20");
  const [lastBattles, setLastBattles] = useState();
  const [offset, setOffset] = useState(0);
  const [slice, setSlice] = useState(10);
  const navigate = useNavigate();

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

  const handleSelect = (s) => {
    setLastBattles(null);
    setSeason(s);
    fetchLastBattles();
  };

  const handleSlice = (s) => {
    setOffset(0);
    setSlice(s);
  };
  const handleOffset = (s) => {
    setOffset(s);
  };

  const navigateToBB = (battleData) => {
    navigate("/battleboard", {
      state: {
        id: battleData[0],
        date: battleData[1].StartTime.toDate()
          .toLocaleString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })
          .replaceAll("/", "."),
        season: season,
      },
    });
  };

  useEffect(() => {
    fetchLastBattles();
  }, [slice, season]);

  if (lastBattles) {
    return (
      <>
        <NavBar />
        {/* <SeasonSelect onSelectChange={handleSelect} selectedSeason={season} /> */}
        <div className="table-style">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {lastBattles
                .slice(offset * slice, (offset + 1) * slice)
                .map((battle, index) => (
                  <tr key={index}>
                    <td style={{ textAlign: "left" }}>
                      <a
                        href=""
                        onClick={() => {
                          navigateToBB(battle);
                        }}
                      >
                        {battle[1].Title}
                      </a>
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {battle[1].StartTime.toDate()
                        .toLocaleString("en-GB", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })
                        .replaceAll("/", ".")}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="table-navig">
          <TableSelect onSelectChange={handleSlice} selectedAmount={slice} />
          <TableNavig
            onTableChange={handleOffset}
            offsetValue={offset}
            sliceValue={slice}
            battles={lastBattles.length}
          />
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
