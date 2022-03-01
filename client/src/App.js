import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink
} from '@apollo/client';

import { setContext } from '@apollo/client/link/context';

import Home from './pages/Home.js';
import Profile from './pages/Profile.js'
import NavBar from "./components/nav/Navbar";

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

  const [page, setPage] = useState('mt-14')
  function handlePageState(x) {
    switch (x) {
      case 'settings':
        
        setPage(prevState => {
          console.log(prevState);
          if(prevState == 'mt-14 animate-slideRight' || prevState == 'mt-14 animate-slidefarR'){
            setPage('mt-14 animate-slidefarL')
          }
          else {setPage('mt-14 animate-slideLeft')}
        })
        break;
        
      case 'friends':
        setPage(prevState => {
          console.log(prevState);
          if(prevState == 'mt-14 animate-slideLeft' || prevState == 'mt-14 animate-slidefarL'){
            setPage('mt-14 animate-slidefarR')
          }
          else {setPage('mt-14 animate-slideRight')}
        })
        break;

      case 'games':
        setPage(prevState => {
          console.log(prevState);
          if(prevState == 'mt-14 animate-slideLeft' || prevState == 'mt-14 animate-slidefarL'){
            setPage('mt-14 animate-leftClose')
          }
          else {setPage('mt-14 animate-rightClose')}
        })
        break;

      default:
        break;
    }
  }


  return (
    <ApolloProvider client={client}>
      <Router forceRefresh={true}>
        <div style={{ height: window.innerHeight }} className="relative grid content-start text-neutral-700 overflow-hidden">
          <NavBar handlePageState={handlePageState} />

          <div style={{ transform: 'translateX(-100vw)' }} className={page}>
            <Switch>
              <Route path="/">
                <Home />
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
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
