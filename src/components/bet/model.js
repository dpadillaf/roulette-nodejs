const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

let validBetTypes = {
    values: [ 'NUMBER', 'COLOR' ],
    message: '{VALUE} no es un tipo de apuesta válido'
}

let betSchema = new Schema( {
    numberToBet: {
        type: Number,
        required: [ true, 'El número a apostar es requerido' ]
    },
    betType: {
        type: String,
        required: [ true, 'El tipo de apuesta es requerido' ],
        enum: validBetTypes
    },
    amountToBet: {
        type: Number,
        required: [ true, 'El monto a apostar es requerido' ]
    },
    idUser: {
        type: String,
        required: [ true, 'El id del usuario es requerido' ]
    },
    roulette: {
        type: Schema.Types.ObjectId,
        ref: 'Roulette',
        required: [ true, 'El id de la ruleta es requerido' ]
    },
    amountWon: {
        type: Number,
        default: 0
    },
    created_at: { 
        type: Date, 
        default: Date.now() 
    }
} );

module.exports = mongoose.model( 'Bet', betSchema );