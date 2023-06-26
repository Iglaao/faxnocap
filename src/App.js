import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./Pages/MainPage";
import BattleboardPage from "./Pages/BattleboardPage";
import PlayersPage from "./Pages/PlayersPage";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="" element={<MainPage />} />
          <Route exact path="/battleboard" element={<BattleboardPage />} />
          <Route exact path="/players" element={<PlayersPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
