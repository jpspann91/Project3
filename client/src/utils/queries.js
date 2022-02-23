import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      friends{
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
        isActive
        score
        winner
      }
      players {
        player1 {
          username
        }
        player2 {
          username
        }
      }
    }
  }
`;

export const QUERY_SINGLE_GAME = gql`
  query getSingleGame($gameId: ID!) {
    game(gameId: $gameId {
      gameType
      gameState{
        isActive
        score
        winner
      }
      players {
        player1 {
          username
        }
        player2 {
          username
        }
      }
    }
  }
`;

