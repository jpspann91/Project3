import React, { useMemo, useState } from "react";
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
import PendingContext from "../PendingContext";
import PendingMatchNotice from "../components/PendingMatchNotice";

let profileData = {
  _id: "EG76J42",
  icon: "JD",
  fullName: "John Doe",
  username: "JonnyManiac",
  online: false,
};

const Home = () => {
  const match = useRouteMatch();
  const [pendingMatch, setPendingMatch] = useState({
    game: {
      id: '',
      gameType: '',
    },
    user: {
      id: '',
      username: '',
    }
  })
  
  const contextValue = useMemo(
    () => ({ pendingMatch, setPendingMatch }), 
    [pendingMatch]
  )
  // const [pendingGame, setPendingGame] = useState({
  //   id: '',
  //   name: '',
  // });
  // const [pendingOpponent, setPendingOpponent] = useState({
  //   id: '',
  //   username: '',
  // });

  // const handlePendingGame = (game) => {
  //   setPendingMatch(prevState => {
  //     return {
  //       ...prevState,
  //       id: game._id,
  //       name: game.gameType,
  //     }
  //   })
  // }

  return (
    <PendingContext.Provider value={contextValue} >
    <div className="h-full w-full flex">
      <Settings data={profileData} />
      <Router>
        <div className="w-screen grid content-start justify-center overflow-y-scroll pb-16">
          <Switch>
            <Route exact path={`${match.path}`}>
              <MatchList />
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
      <Friends/>
    </div>
    </PendingContext.Provider>
  );
};

export default Home;
