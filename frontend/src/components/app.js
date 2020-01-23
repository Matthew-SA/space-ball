import React from "react";
import { AuthRoute } from "../util/route_util";
import { Switch } from "react-router-dom";

import MainPage from "./main/main_page";
import Game from "./game/game";


const App = () => (
  <div>
    <Switch>
      <AuthRoute exact path="/" component={MainPage} />
      <AuthRoute exact path="/game" component={Game} />
    </Switch>
  </div>
);

export default App;
