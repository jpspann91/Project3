import { gql } from '@apollo/client';

//USER MUTATIONS
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

export const UPDATE_USERNAME = gql``
export const UPDATE_EMAIL = gql``
export const UPDATE_PASSWORD= gql``
export const UPDATE_ONLINE = gql``
export const UPDATE_ICON = gql``
export const UPDATE_FULL_NAME = gql``
export const UPDATE_ACTIVE_GAMES = gql``


//GAME MUTATIONS

export const ADD_GAME = gql`
  mutation addGame($gameId: ID!) {
    addGame(gameId: $gameId) {
     _id
     gameType
     ruleSet
  }
`;

export const UPDATE_GAME_TYPE = gql``
export const UPDATE_RULE_SET = gql``
//MATCH MUTATIONS


