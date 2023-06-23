import React, { useEffect, useState } from "react";
import NavBar from "../Components/NavBar";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import SeasonSelect from "../Components/SeasonSelect";

export default function MainPage() {
  const [season, setSeason] = useState("s20");
  const [lastBattles, setLastBattles] = useState();
  const [offset, setOffset] = useState(0);

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

  function incrementOffset() {
    if (Math.floor(lastBattles.length / 10) === offset) return;
    setOffset(offset + 1);
  }

  function decrementOffset() {
    if (offset === 0) return;
    setOffset(offset - 1);
  }

  function setOffsetToStart() {
    setOffset(0);
  }
  function setOffsetToEnd() {
    setOffset(Math.floor(lastBattles.length / 10));
  }
  useEffect(() => {
    fetchLastBattles();
    console.log("x");
  }, [season]);

  if (lastBattles) {
    return (
      <>
        <NavBar />
        <SeasonSelect onSelectChange={handleSelect} selectedSeason={season} />
        {season && <p>Data from Child: {season}</p>}
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {lastBattles
              .map((battle, index) => (
                <tr key={index}>
                  <td>{battle[1].Title}</td>
                  <td>
                    {battle[1].StartTime.toDate()
                      .toLocaleString("en-GB", {
                        timeZone: "UTC",
                      })
                      .replaceAll("/", ".")}
                  </td>
                </tr>
              ))
              .slice(offset * 10, offset * 10 + 10)}
          </tbody>
        </table>
        <button onClick={setOffsetToStart}>start</button>
        <button onClick={decrementOffset}>back</button>
        <button onClick={incrementOffset}>next</button>
        <button onClick={setOffsetToEnd}>end</button>
      </>
    );
  } else {
    return (
      <>
        <NavBar />
        <SeasonSelect onSelectChange={handleSelect} selectedSeason={season} />
        {season && <p>Data from Child: {season}</p>}
        <div>Empty</div>
      </>
    );
  }
}
