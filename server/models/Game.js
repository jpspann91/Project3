const { Schema, model } = require('mongoose');

const gameSchema = new Schema({
    gameType: {
        type: String,
        required: 'You need to choose a game type',

    },
    gameState: {
        status: {
            type: String,
            required: true,
        },
        winner: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        score: {
            type: Number,
            required: false,
            default: 0
        }
    },
    players:  [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ], 
        maxLength: 2,

});

const Game = model('Game', gameSchema);

module.exports = Game;