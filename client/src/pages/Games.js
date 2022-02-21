import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useRouteMatch,
} from "react-router-dom";
import TicTacToe from "./games/TicTacToe.js";

const Games = (props) => {
  const match = useRouteMatch();
  console.log(match);
  console.log(`${match.path}/1`);

  return (
    <Router>
      <div>
        <Switch>
          <Route exact path={`${match.path}/`}>
            <div>
              <h2>Games Homepage</h2>
            </div>
          </Route>
          <Route path={`${match.path}/tictactoe/:gameId`}>
            <h2>Test Tictactoe</h2>
            <TicTacToe />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default Games;
