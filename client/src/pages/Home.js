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
import GamesList from "../components/games-list";
import MatchList from "../components/match-list";
import PendingContext from "../PendingContext";

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

  return (
    <PendingContext.Provider value={contextValue} >
    <div className="h-full w-full flex">
      <Settings />
      
      <Router>
        <div className="w-screen grid content-start justify-center overflow-y-scroll pb-16">
          <Switch>
            <Route exact path={`${match.path}`}>
              {!pendingMatch.user._id &&
                <MatchList />
              }
              <GamesList />
            </Route>
            <Route path={`${match.path}games/tictactoe/:matchId?`}>
              <TicTacToe />
            </Route>
            <Route path={`${match.path}games/testgame1/:matchId`}>
              <TestGame1 />
            </Route>
            <Route>
              <p>Route not found</p>
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
