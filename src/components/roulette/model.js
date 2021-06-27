const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

let rouletteSchema = new Schema( {
    winningNumber: Number,
    state: {
        type: Boolean,
        default: false
    },
    created_at: { 
        type: Date, 
        default: Date.now() 
    },
    closed_at: Date
} );

module.exports = mongoose.model( 'Roulette', rouletteSchema );