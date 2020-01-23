import React from "react";
import { Switch, Route } from "react-router-dom";
import MainPage from "./main/main_page";
import GameComponent from "./game/game";



const App = () => (
  <div>
    <Switch>
      <Route exact path="/" component={MainPage} />
      <ProtectedRoute exact path="/game" component={GameComponent} />
    </Switch>
  </div>
);

export default App;
