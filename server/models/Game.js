const { Schema, model } = require('mongoose');

const gameSchema = new Schema({
    gameType: {
        type: String,
        required: 'You need to choose a game type',

    },
    gameState: {
        isActive: {
            type: Boolean,
            required: true,
            default: true,
        },
        winner: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        score: {
            type: String,
            required: false,
            default: 0
        }
    },
    players:
    {
        player1: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            maxLength: 1,
            required: true

        },
        player2: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            maxLength: 1,
            required: true
        },
    },

});

const Game = model('Game', gameSchema);

module.exports = Game;