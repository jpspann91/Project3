import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useRouteMatch,
} from "react-router-dom";
import Friends from "../components/friends-tab";

import TicTacToe from "./games/TicTacToe.js";
import Settings from "../components/settings-tab";
import TestGame1 from "./games/TestGame1";
import CreateMatch from "./CreateMatch";
import GamesList from "../components/games-list";
import MatchList from "../components/match-list";
import auth from "../utils/auth";
import { Divider } from "antd";

let profileData = {
  id: "EG76J42",
  icon: "JD",
  fullName: "John Doe",
  userName: "JonnyManiac",
  online: false,
};

// import { useEffect, useState } from 'react';

const Home = () => {
  const match = useRouteMatch();

  // console.log(auth.loggedIn())

  return (
    <div className="h-full w-full flex">
      <Settings data={profileData} />
      <Router>
        <div className="w-screen grid content-start justify-center mt-5 overflow-y-scroll">
          <Switch>
            <Route exact path={`${match.path}`}>
              <MatchList />
              <hr className="my-5" />
              <GamesList />
            </Route>
            <Route path={`${match.path}games/tictactoe/:matchId?`}>
              <TicTacToe />
            </Route>
            <Route path={`${match.path}games/testgame1/:matchId`}>
              <TestGame1 />
            </Route>
            <Route path={`${match.path}games/:gameId/:gameName?`}>
              <CreateMatch />
            </Route>
          </Switch>
        </div>
      </Router>
      <Friends />
    </div>
  );
};

export default Home;
