import "./App.css";
import "./Styles/NavBar.css";
import "./Styles/Table.css";
import "./Styles/Footer.css";
import "./Styles/Card.css";
import "./Styles/Tooltip.css";
import "./Styles/Input.css";
import "./Styles/Bars.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./Pages/MainPage";
import BattleboardPage from "./Pages/BattleboardPage";
import PlayersPage from "./Pages/PlayersPage";
import PlayerStatsPage from "./Pages/PlayerStatsPage";
import ViewerPage from "./Pages/ViewerPage";
import AttendancePage from "./Pages/AttendancePage";

function App() {
  return (
    <div className="App">
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
          <Route exact path="/attendance" element={<AttendancePage />} />
          <Route exact path="/battleviewer" element={<ViewerPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
