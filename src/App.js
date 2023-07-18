import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./Pages/MainPage";
import BattleboardPage from "./Pages/BattleboardPage";
import PlayersPage from "./Pages/PlayersPage";
import PlayerStatsPage from "./Pages/PlayerStatsPage";
import ViewerPage from "./Pages/ViewerPage";
import Background from "./Images/fax_backgroundv2.png";

function App() {
  return (
    <div
      style={{
        backgroundImage: `url(${Background})`,
        backgroundPosition: "center",
        backgroundSize: "contain",
        backgroundRepeat: "repeat",
        minHeight: "100vh",
      }}
    >
      <Router>
        <Routes>
          <Route exact path="" element={<MainPage />} />
          <Route exact path="/battleboard" element={<BattleboardPage />} />
          <Route exact path="/players" element={<PlayersPage />} />
          <Route
            exact
            path="/playerStats/:playerName"
            element={<PlayerStatsPage />}
          />
          <Route exact path="/battleviewer" element={<ViewerPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
