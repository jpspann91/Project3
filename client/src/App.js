import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloClient, 
         ApolloProvider, 
         InMemoryCache, 
         createHttpLink 
} from '@apollo/client';

import { setContext } from '@apollo/client/link/context';

import Home from './pages/Home.js';
import Games from './pages/Games.js';
import Profile from './pages/Profile.js'

import 'antd/dist/antd.css';

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-center align-center min-100-vh bg-primary">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/games">
              <Games />
            </Route>
            <Route exact path="/profile">
              <Profile />
            </Route>
            {/* <Route exact path="/friends">
              <Friends />
            </Route> */}
            {/* <Route exact path="/login">
              <Login />
            </Route> */}
          </Switch>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
