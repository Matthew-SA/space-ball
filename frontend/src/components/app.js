import React from "react";
import { Switch, Route } from "react-router-dom";

import MainPage from "./main/main_page";
import Game from "./game/game";


const App = () => (
  <div>
    <Switch>
      <Route exact path="/" component={MainPage} />
      <Route exact path="/game" component={Game} />
    </Switch>
  </div>
);

export default App;
