import logo from "./logo.svg";
import "./App.css";
import BattleInfo from "./Battleboard/BattleInfo";
import GuildTable from "./Battleboard/GuildTable";
import PlayersTable from "./Battleboard/PlayersTable";
import AllianceTable from "./Battleboard/AllianceTable";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";
import { useEffect, useState } from "react";

function App() {
  const [battleboard, setBattleboard] = useState();
  const [alliances, setAlliances] = useState();
  const [guilds, setGuilds] = useState();
  const [players, setPlayers] = useState();

  useEffect(() => {
    const test = async () => {
      const docRef = doc(db, "s20", "21.06.2023");
      const docSnap = await getDoc(docRef);
      const data = docSnap.data();
      var arr = Object.values(data)[0];

      setBattleboard(arr);
      setAlliances(Object.values(arr.Alliances));
      setPlayers(Object.values(arr.Players));
      setGuilds(Object.values(arr.Guilds));
    };
    test();
  }, []);
  if (battleboard) {
    return (
      <>
        <BattleInfo info={battleboard} />
        <GuildTable info={guilds} />
        <PlayersTable info={players} />
        <AllianceTable info={alliances} />
      </>
    );
  } else return null;
}

export default App;
