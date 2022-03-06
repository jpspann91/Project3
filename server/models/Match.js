const { Schema, model } = require("mongoose");

const matchSchema = new Schema({
  game: {
    type: Schema.Types.ObjectId,
    ref: "Game",
  },
  status: {
    type: String,
    required: true,
    default: "In Progress",
  },
  winner: {
    type: String,
  },
  score: {
    type: String,
    required: false,
    default: "0",
  },
  gameBoard: {
    type: String,
    default: "",
  },
  activePlayer: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  players: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const Match = model("Match", matchSchema);

module.exports = Match;
