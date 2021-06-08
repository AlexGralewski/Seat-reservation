import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";

import StartingScreen from "./components/StartingScreen";
import RoomViewScreen from "./components/RoomViewScreen";
import SummaryScreen from "./components/SummaryScreen";
import "antd/dist/antd.css";

function App() {
  return (
    <Router>
      <Route exact path="/" render={() => <StartingScreen />} />
      <Route exact path="/choose-seats" render={() => <RoomViewScreen />} />
      <Route exact path="/summary" render={() => <SummaryScreen />} />
    </Router>
  );
}

export default App;
