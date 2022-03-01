import { gql } from "@apollo/client";

//USER MUTATIONS ************************
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
    addFriend(userId: $userId) {
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

export const UPDATE_USERNAME = gql`
  mutation updateUsername($username: String!) {
    updateUsername(username: $username) {
      _id
      username
    }
  }
`;

export const UPDATE_EMAIL = gql`
  mutation updateEmail($email: String!) {
    updateEmail(email: $email) {
      _id
      username
      email
    }
  }
`;

export const UPDATE_PASSWORD = gql`
  mutation updatePassword($password: String!) {
    updatePassword(password: $password) {
      _id
      username
      password
    }
  }
`;

export const UPDATE_ONLINE = gql`
  mutation updateOnline($online: Boolean!) {
    updateOnline(online: $online) {
      _id
      username
      online
    }
  }
`;

export const UPDATE_ICON = gql`
  mutation updateIcon($icon: String!) {
    updateIcon(icon: $icon) {
      _id
      username
      icon
    }
  }
`;

export const UPDATE_FULL_NAME = gql`
  mutation updateFullName($fullName: String!) {
    updateFullName(fullName: $fullName) {
      _id
      username
      icon
    }
  }
`;

export const UPDATE_ACTIVE_MATCHES = gql`
  mutation updateActiveMatches($activeMatches: ID!) {
    updateActiveMatches(activeMatches: $activeMatches) {
      _id
      username
      match {
        activePlayer
      }
    }
  }
`;

//GAME MUTATIONS ****************************************

export const ADD_GAME = gql`
  mutation addGame($gameType: String!, $ruleSet: String!) {
    addGame(gameType: $gameType, ruleSet: $ruleSet) {
     _id
     gameType
     ruleSet
  }
}`;

export const UPDATE_GAME_TYPE = gql`
  mutation updateGameType($gameId: ID!, $gameType: String!) {
    updateGameType(gameId: $gameId, gameType: $gameType) {
      _id
      gameType
      ruleSet
    }
  }
`;
export const UPDATE_GAME_RULE_SET = gql`
  mutation updateGameRuleSet($gameId: ID!, $ruleSet: String!) {
    updateGameRuleSet(gameId: $gameId, ruleSet: $ruleSet) {
      _id
      gameType
      ruleSet
    }
  }
`;

// //MATCH MUTATIONS ***************************************
export const ADD_MATCH = gql`
  mutation addMatch {
    addMatch {
      game {
        _id
        gameType
        ruleSet
      }
      status
      winner
      score
      gameBoard
      activePlayer {
        _id
        username
      }
      players {
        _id
        username
      }
    }
  }
`;
export const UPDATE_MATCH_GAME = gql`
  mutation updateMatchGame($matchId: ID!, $gameId: ID!) {
    updateMatchGame(matchId: $matchId, gameId: $gameId) {
      game {
        _id
        gameType
        ruleSet
      }
      status
      winner
      score
      gameBoard
      activePlayer {
        _id
        username
      }
      players {
        _id
        username
      }
    }
  }
`;
export const UPDATE_MATCH_STATUS = gql`
  mutation updateMatchStatus($matchId: ID!, $status: String!) {
    updateMatchStatus(matchId: $matchId, status: $status) {
      game {
        _id
        gameType
        ruleSet
      }
      status
      winner
      score
      gameBoard
      activePlayer {
        _id
        username
      }
      players {
        _id
        username
      }
    }
  }
`;
export const UPDATE_MATCH_WINNER = gql`
  mutation updateMatchWinner($matchId: ID!, $username: String!) {
    updateMatchWinner(matchId: $matchId, username: $username) {
      game {
        _id
        gameType
        ruleSet
      }
      status
      winner
      score
      gameBoard
      activePlayer {
        _id
        username
      }
      players {
        _id
        username
      }
    }
  }
`;
export const UPDATE_MATCH_SCORE = gql`
  mutation updateMatchScore($matchId: ID!, $score: Number!) {
    updateMatchScore(matchId: $matchId, score: $score) {
      game{
        _id
        gameType
        ruleSet
      }
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
`;

export const UPDATE_MATCH_GAME_BOARD = gql`
  mutation updateMatchGameBoard($matchId: ID!, $gameBoard: String!) {
    updateMatchGameBoard(matchId: $matchId, gameBoard: $gameBoard) {
      gameBoard
    }
  }
`;

export const UPDATE_MATCH_ACTIVE_PLAYER = gql`
  mutation updateMatchActivePlayer($matchId: ID!, $username: String!) {
    updateMatchActivePlayer(matchId: $matchId, username: $username) {
      game {
        _id
        gameType
        ruleSet
      }
      status
      winner
      score
      gameBoard
      activePlayer {
        _id
        username
      }
      players {
        _id
        username
      }
    }
  }
`;
export const ADD_MATCH_PLAYER = gql`
  mutation addMatchPlayer($matchId: ID!, $userId: ID!) {
    addMatchPlayer(matchId: $matchId, userId: $userId) {
      game {
        _id
        gameType
        ruleSet
      }
      status
      winner
      score
      gameBoard
      activePlayer {
        _id
        username
      }
      players {
        _id
        username
      }
    }
  }
`;

export const REMOVE_MATCH_PLAYER = gql`
  mutation removeMatchPlayer($matchId: ID!, $userId: ID!) {
    removeMatchPlayer(matchId: $matchId, userId: $userId) {
      game {
        _id
        gameType
        ruleSet
      }
      status
      winner
      score
      gameBoard
      activePlayer {
        _id
        username
      }
      players {
        _id
        username
      }
    }
  }
`;
