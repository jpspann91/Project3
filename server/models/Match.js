const { Schema, model } = require('mongoose');

const matchSchema = new Schema({
    game: {
        type: Schema.Types.ObjectId,
        ref: 'Game'
    },
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
    },
    gameBoard: {
        type: String
    },
    activePlayer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    players: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
    ],
})

const Match = model('Match', matchSchema);

module.exports = Match;