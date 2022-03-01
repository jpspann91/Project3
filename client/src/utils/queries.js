import { gql } from '@apollo/client';

export const QUERY_USERS = gql`
  query users{
    users{
      _id
      username
      email
      friends{
        _id
        username
      }
      online
      icon
      fullName
      activeMatches {
        _id
        game
      }
      pastMatches{
        _id
        game
      }
    }
  }
`;

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      friends{
        _id
        username
      }
      online
      icon
      fullName
      activeMatches {
        _id
        game
      }
      pastMatches{
        _id
        game
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      friends{
        _id
        username
      }
      online
      icon
      fullName
      activeMatches {
        _id
        game
      }
      pastMatches{
        _id
        game
      }
    }
  }
`;

export const QUERY_GAMES = gql`
  query getGames {
    games{
      _id
      gameType
      ruleSet
      icon
      path
    }
  }
`;

export const QUERY_SINGLE_GAME = gql`
  query getSingleGame($gameId: ID!) {
    game(gameId: $gameId) {
      _id
      gameType
      ruleSet
    }
  }
`;

export const QUERY_MATCHES = gql`
  query getMatches($username: String!){
    matches(username: $username){
      _id
      game
      status
      winner
      score
      gameBoard
      activePlayer{
        _id
        username
      }
      players{
       _id
       username
      }
    }
  }
`
export const QUERY_SINGLE_MATCH = gql`
  query getSingleMatch($matchId: ID!) {
    match(matchId: $matchId) {
      _id
      status
      score
      gameBoard

    }
  }`


  // export const QUERY_SINGLE_MATCH = gql`
  // query getSingleMatch($matchId: ID!) {
  //   match(matchId: $matchId) {
  //     _id
  //     status
  //     score
  //     gameBoard
  //     winner
  //     activePlayer{
  //       _id
  //       username
  //     }
  //     players{
  //      _id
  //      username
  //     }

  //   }
  // }`
