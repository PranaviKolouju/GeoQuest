import React from "react";
import './App.css';
import GameModeSelectionScreen from './screens/gameModeSelection';
import ContinentSelectionScreen from './screens/continentSelection';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

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
        </Switch>
      </div>
    </Router>
  );
}

export default App;