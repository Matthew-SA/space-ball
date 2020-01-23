import React from "react";
import { Switch, Route } from "react-router-dom";
// import { ProtectedRoute } from "../util/route_util";
import MainPage from "./main/main_page";
import GameComponent from "./game/game";



const App = () => (
  <div>
    <Switch>
      <Route exact path="/" component={MainPage} />
      <Route exact path="/game" component={GameComponent} />
    </Switch>
  </div>
);

export default App;
