const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

let validRouletteStates = {
    values: [ 'NEW', 'OPEN', 'CLOSE' ],
    message: '{VALUE} no es un estado de ruleta válido'
}

let rouletteSchema = new Schema( {
    winningNumber: Number,
    state: {
        type: String,
        default: 'NEW',
        enum: validRouletteStates
    },
    created_at: { 
        type: Date, 
        default: Date.now() 
    },
    closed_at: Date
} );

module.exports = mongoose.model( 'Roulette', rouletteSchema );