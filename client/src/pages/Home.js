import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useRouteMatch,
  useHistory,
} from "react-router-dom";
// import { Link } from 'react-router-dom';
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import Friends from "../components/friends-tab";
import { Card, Button } from "antd";
import Settings from "../components/settings-tab";

import TicTacToe from "./games/TicTacToe.js";
import Settings from "../components/settings-tab";

const testGamesList = [
  {
    name: "Tic Tac Toe",
    icon: "tictactoe.png",
    path: "tictactoe/test1",
  },
  {
    name: "Tic Tac Toe",
    icon: "tictactoe.png",
    path: "tictactoe/test2",
  },
];

let profileData = {
  id: 'EG76J42',
  icon: 'JD',
  fullName: 'John Doe',
  userName: 'JonnyManiac',
  online: false,
};

// import { useEffect, useState } from 'react';

const Home = () => {
  const history = useHistory();
  const match = useRouteMatch();
  // const { loading, data } = useQuery(QUERY_ME, {
  //   fetchPolicy: "no-cache"
  // });
  // const [matchups ,setMathupsData]= useState([])
  // const matchupList = data?.matchups || [];

  // useEffect(()=>{
  //   if(!loading){
  //     setMathupsData(data)
  //   }
  // }, [loading])

  const fetchActiveGames = async () => {

  }

  const fetchGamesList = async () => {

  }

  const getGameCards = () => {
    const cards = testGamesList.map((game, index) => {
      return (
        <div className="mb-5 w-full">

          <Card key={index}>
            <h3>{game.name}</h3>
            <img src={`/gameIcons/${game.icon}`} alt={game.name} style={{ width: 150, height: 150 }} />
            <Button onClick={() => history.push(`/games/${game.path}`)}>Click Me</Button>
          </Card>
        </div>

      );
    });

    return <div>{cards}</div>;
  };

  return (
    <div className="h-full w-full flex">

      <Settings data={profileData} />
      <Router>
        <div className="w-screen grid content-start justify-center mt-5">
          <Switch>
            <Route exact path={`${match.path}`}>

              {getGameCards()}
            </Route>
            <Route path={`${match.path}games/tictactoe/:gameId`}>
              <TicTacToe />
            </Route>
          </Switch>
        </div>
      </Router>
      <Friends />
    </div>
  );
};

export default Home;
