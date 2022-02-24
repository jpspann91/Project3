import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_FRIEND = gql`
  mutation addFriend($userId: ID!) {
    addFriend(userId: $userId){
     _id
      username
      email
      friends {
        _id
        username
        email
      }
    }
  }
`;
export const REMOVE_FRIEND = gql`
  mutation removeFriend($userId: ID!) {
    removeFriend(userId: $userId) {
      _id
      username
      email
      friends {
        _id
        username
        email
      }
    }
  }
`;

export const ADD_USER_TO_GAME = gql`
  mutation addUserToGame($gameId: ID!, $userId: ID!) {
    addUserToGame(gameId: $gameId, userId: $userId) {
      _id
      gameType
      gameState{
        isActive
      }
      players{
        _id
        username
      }
    }
  }
`;


