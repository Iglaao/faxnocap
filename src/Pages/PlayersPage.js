import React, { useEffect, useState } from "react";
import NavBar from "../Components/NavBar";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useLocation, useNavigate } from "react-router-dom";

export default function PlayersPage() {
  const [players, setPlayers] = useState();
  const location = useLocation();
  //const season = location.state?.season;
  const season = "s20";
  const navigate = useNavigate();

  async function fetchPlayerList() {
    var docSnap = await getDoc(doc(db, season + "dict", "members"));
    if (docSnap.exists()) {
      const data = docSnap.data();
      setPlayers(
        Object.values(data)
          .flat()
          .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
      );
    } else {
      setPlayers(null);
    }
  }

  const navigateToPlayer = (player) => {
    navigate(`/playerStats/${player}`, {});
  };

  useEffect(() => {
    fetchPlayerList();
  }, []);
  if (players) {
    return (
      <>
        <NavBar />
        <input type="text" placeholder="Search for player..."></input>
        <table>
          <thead>
            <tr>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player) => (
              <tr key={player}>
                <td>
                  <a
                    href=""
                    onClick={() => {
                      navigateToPlayer(player);
                    }}
                  >
                    {player}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
