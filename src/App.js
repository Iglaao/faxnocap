import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./Pages/MainPage";
import BattleboardPage from "./Pages/BattleboardPage";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="" element={<MainPage />} />
          <Route exact path="/battleboard" element={<BattleboardPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
