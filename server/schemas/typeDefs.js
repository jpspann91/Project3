const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
  _id: ID
  username: String
  email: String
  password: String
  friends: [User]
}

type Game {
  _id
  gameType: String
  gameState: {isActive: Boolean,winner: User, score: Number}
  players: [User]
}

type Auth {
  token: ID!
  user: User
}

input UserInput {
  username: String
  email: String
  friends: [User]
}

type Query {
  users: [User]
  user(username: String!): User
  games(username: String): [Game] 
  game(gameId: ID!)
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
