import React, { useMemo, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useRouteMatch,
} from "react-router-dom";

import Friends from "../friends-tab";

import TicTacToe from "../games/TicTacToe.js";
import Settings from "../settings-tab";
import GamesList from "../games-list";
import MatchList from "../match-list";
import PendingContext from "../../PendingContext";
import FourScore from "../games/FourScore";

import { useQuery } from "@apollo/client";
import { QUERY_USER} from "../../utils/queries";
import Auth from "../../utils/auth";

const Home = ({handlePageState}) => {
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

  let activeUser = Auth.getProfile().data
  const { loading, error, data } = useQuery(QUERY_USER, {
    variables: {
      username: activeUser.username,
    },
    pollInterval: 300,
  });

  if (loading) return <></>;
  if (error) {
    console.log(JSON.stringify(error, null, 2));
    return error;
  }

  if (!data.user) {
    Auth.logout();
  }

  return (
    <PendingContext.Provider value={contextValue} >
    <div className="h-full w-full flex">
      <Settings data={data} />
      
      <Router>
        <div className="w-screen grid content-start justify-center overflow-y-scroll pb-16">
          <Switch>
            <Route exact path={`${match.path}`}>
              {!pendingMatch.user._id &&
                <MatchList />
              }
              <GamesList handlePageState={handlePageState} />
            </Route>
            <Route path={`${match.path}games/tictactoe/:matchId?`}>
              <TicTacToe />
            </Route>
            <Route path={`${match.path}games/fourscore/:matchId?`}>
              <FourScore />
            </Route>
            <Route>
              <p>Route not found</p>
            </Route>
          </Switch>
        </div>
      </Router>
      <Friends data={data} handlePageState={handlePageState} />
    </div>
    </PendingContext.Provider>
  );
};

export default Home;
