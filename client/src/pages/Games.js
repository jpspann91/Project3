import { BrowserRouter as Router, Route, Switch, useRouteMatch } from 'react-router-dom';
import TicTacToe from './games/TicTacToe.js'

const Games = (props) => {
  const match = useRouteMatch();


  return (
    <Router>
    <div>
      <Switch>
        <Route exact path={`${match.path}/tictactoe`}>
          <TicTacToe />
        </Route>
      </Switch>
    </div>
  </Router>
  )

}

export default Games;