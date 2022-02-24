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
    }
  }
`;

export const QUERY_GAMES = gql`
  query getGames {
    games{
      _id
      gameType
      gameState{
        status
        score
        winner
      }
      players {
        _id
        username
      }
    }
  }
`;

export const QUERY_SINGLE_GAME = gql`
  query getSingleGame($gameId: ID!) {
    game(gameId: $gameId) {
      _id
      gameType
      gameState{
        status
        score
        winner
      }
      players {
        _id
        username
      }
    }
  }
`;

