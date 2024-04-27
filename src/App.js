import React from "react";
import './App.css';
import GameModeSelectionScreen from './screens/gameModeSelection';
import ContinentSelectionScreen from './screens/continentSelection';
import GameScreen from './screens/Game';
import ScoreBoardScreen from "./screens/scoreBoard";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <GameModeSelectionScreen/>
          </Route>
          <Route exact path = "/continent">
            <ContinentSelectionScreen/>
          </Route>
          <Route exact path = "/game">
              <GameScreen/>
          </Route>
          <Route exact path = "/scoreBoard">
              <ScoreBoardScreen/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;