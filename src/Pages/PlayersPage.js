import React, { useEffect, useState } from "react";
import NavBar from "../Components/NavBar";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useLocation, useNavigate } from "react-router-dom";
import SearchBar from "../Components/SearchBar";

export default function PlayersPage() {
  const [players, setPlayers] = useState();
  const [filteredPlayers, setFilteredPlayers] = useState();
  const [keyword, setKeyword] = useState("");
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
      setFilteredPlayers(
        Object.values(data)
          .flat()
          .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
      );
    } else {
      setPlayers(null);
      setFilteredPlayers(null);
    }
  }

  const navigateToPlayer = (player) => {
    navigate(`/playerStats/${player}`, {});
  };

  const updateKeyword = (keyword) => {
    const filtered = players.filter((player) => {
      return `${player.toLowerCase()}`.includes(keyword.toLowerCase());
    });
    setKeyword(keyword);
    setFilteredPlayers(filtered);
  };
  useEffect(() => {
    fetchPlayerList();
  }, []);
  if (players) {
    return (
      <>
        <NavBar />
        <SearchBar keyword={keyword} onChange={updateKeyword} />
        <div
          style={{
            overflowY: "scroll",
            height: "100vh",
          }}
        >
          <div className="table-style">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>
                {filteredPlayers.map((player) => (
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
          </div>
        </div>
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
