const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
  _id: ID
  username: String
  email: String
  password: String
  friends: [User]
}

type GameState {
  status: String
  winner: User 
  score: Int
}

type Game {
  _id: ID
  gameType: String
  gameState: GameState
  players: [User]
}

type Auth {
  token: ID!
  user: User
}

type Query {
  users: [User]
  user(username: String!): User
  games(username: String): [Game] 
  game(gameId: ID!): Game
  me: User
}

type Mutation {
  addUser(username: String!, email: String!, password: String!): Auth
  login(email: String!, password: String!): Auth
  addFriend(userId: ID!): User
  removeFriend(userId: ID!): User
  addUserToGame(gameId: ID!, userId: ID!): Game
}
`;

module.exports = typeDefs;
