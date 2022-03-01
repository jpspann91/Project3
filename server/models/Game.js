const { Schema, model } = require("mongoose");

const gameSchema = new Schema({
  gameType: {
    type: String,
    required: "You need to choose a game type",
  },
  ruleSet: {
    type: String,
  },
  icon: String,
  path: String,
});

const Game = model("Game", gameSchema);

module.exports = Game;
