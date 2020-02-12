import React from "react";
import { Switch, Route } from "react-router-dom";
import { AuthRoute } from "../util/route_util";
import MainPage from "./main/main_page";
import GameViewContainer from "./game/gameview_container";
import PageNotFound from './page_not_found';


const App = () => (
  <div>
    <Switch>
      <AuthRoute exact path="/" component={MainPage} />
      <Route exact path="/game" component={GameViewContainer} />
      <Route component={PageNotFound}/> 
    </Switch>
  </div>
);

export default App;
