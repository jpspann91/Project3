import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink
} from '@apollo/client';

import { setContext } from '@apollo/client/link/context';

import Home from './pages/Home.js';
import LoginForm from './components/LoginForm.js';
import SignupForm from './components/SignupForm.js'
import Profile from './pages/Profile.js'
import NavBar from "./components/nav/Navbar";
import Logo from './components/logo';




import 'antd/dist/antd.css';
import Auth from './utils/auth.js';

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
  const style = { height: window.innerHeight, transform: 'translateX(-100vw)' }
  function handlePageState(x) {
    switch (x) {
      case 'settings':

        setPage(prevState => {
          console.log(prevState);
          if (prevState == 'mt-14 animate-slideRight' || prevState == 'mt-14 animate-slidefarR') {
            setPage('mt-14 animate-slidefarL')
          }
          else { setPage('mt-14 animate-slideLeft') }
        })
        break;

      case 'friends':
        setPage(prevState => {
          console.log(prevState);
          if (prevState == 'mt-14 animate-slideLeft' || prevState == 'mt-14 animate-slidefarL') {
            setPage('mt-14 animate-slidefarR')
          }
          else { setPage('mt-14 animate-slideRight') }
        })
        break;

      case 'games':
        setPage(prevState => {
          console.log(prevState);
          if (prevState == 'mt-14 animate-slideLeft' || prevState == 'mt-14 animate-slidefarL') {
            setPage('mt-14 animate-leftClose')
          }
          else { setPage('mt-14 animate-rightClose') }
        })
        break;
      case 'default':
        setPage('mt-14 animate-default')
        break;

      default:
        break;
    }
  }
  const [formslide,setformslide] = useState('flex animate-loginSlideUp')
  const handleformslide = (x) => {
    if(x === 'login'){setformslide('flex animate-shiftleft')}
    else {setformslide('flex animate-shiftright')}
  }

  useEffect(() => {
    handlePageState('default')
  }, []);
  let user = Auth.getProfile()?.data;

  return (
    <ApolloProvider client={client}>
      <Router forceRefresh={true}>
        <div style={{ height: window.innerHeight }} className="relative grid content-start text-neutral-700 overflow-hidden ">
          <div className='fixed scroll-shadow h-80 w-full bg-gradient-to-t from-black  to-transparent z-50 bottom-0 opacity-40 pointer-events-none'></div>
          {user?._id && (<NavBar handlePageState={handlePageState} />)}
          <div style={style} className={page}>

            <Switch>
              <Route path="/signup">
                <SignupForm />
              </Route>
              <Route path="/login">
                <LoginForm />
              </Route>
              <Route path="/logo">
                <Logo />
              </Route>
              {!user?._id && (
                <Route path="/">
                  <div className='flex justify-start'>
                    <Logo />
                  </div>
                  <div className={formslide}>
                      <LoginForm handleformslide={handleformslide} />
                      <SignupForm handleformslide={handleformslide} />
                  </div>

                </Route>
              )}
              {user?._id && (

                <Route path="/">
                  <Home />
                </Route>
              )}
              {/* <Route exact path="/profile">
                <Profile />
              </Route> */}
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
