import React from "react";
import { Switch, Route } from "react-router-dom";
import { AuthRoute } from "../util/route_util";
import MainPage from "./main/main_page";
import GameViewContainer from "./game/gameview_container";
import PageNotFound from './page_not_found';
import Play from './lobby/play';
import Navbar from "./navbar";
import Leaderboard from "./leaderboard/leaderboard";
import OptionsContainer from "./options/options_container";


const App = () => (
  <Switch>
    <Route exact path="/game" component={GameViewContainer}/>
    <div>
      <Route path="/" component={Navbar}/>
      <Switch>
        <AuthRoute exact path="/" component={MainPage} />
        <Route exact path="/play" component={Play} />
        <Route exact path="/leaderboard" component={Leaderboard} />
        <Route exact path="/options" component={OptionsContainer} />
        <Route component={PageNotFound}/> 
      </Switch>
    </div>

  </Switch>
);

export default App;
