const rouletteCtrl = {};
const Roulette = require( './model' );
const Bet = require( '../bet/model' );
const { generateWinningNumber } = require( './utils/util' );
const { getBetsAndUpdateWonsByRoulette } = require( '../bet/utils/util' );

rouletteCtrl.create = async ( req, res ) => {
    let roulette = new Roulette();
    roulette.save( ( err, rouletteDB ) => {
        if ( err ){
            return res.status( 400 ).json( {
                ok: false,
                err
            } );
        }

        return res.json( {
            ok: true,
            roulette: rouletteDB
        } );
    } );
};

rouletteCtrl.getAll = async ( req, res ) => {
    Roulette.find( {} ).exec( ( err, roulette ) => {
        if ( err ){
            return res.status( 400 ).json( {
                ok: false,
                err
            } );
        }

        return res.json( {
            ok: true,
            roulette
        } );
    } );
};

rouletteCtrl.openRoulette = async ( req, res ) => {
    let { id } = req.params;
    Roulette.findByIdAndUpdate( id, { state: 'OPEN' }, ( err, rouletteDB ) => {
        if ( err ){
            return res.status( 400 ).json( {
                ok: false,
                err
            } );
        } else if ( !rouletteDB ){
            return res.status( 400 ).json( {
                ok: false,
                err: {
                    message: 'No existe ruleta'
                }
            } );
        }

        return res.json( {
            ok: true
        } );
    } );
};

rouletteCtrl.closeRoulette = async ( req, res ) => {
    let { id } = req.params;
    Roulette.findByIdAndUpdate( id, { 
        state: 'CLOSE', 
        winningNumber: generateWinningNumber(),
        closed_at: Date.now()
     }, { new: true }, ( err, roulette ) => {
        if ( err ){
            return res.status( 400 ).json( {
                ok: false,
                err
            } );
        } else if ( !roulette ){
            return res.status( 400 ).json( {
                ok: false,
                err: {
                    message: 'No existe ruleta'
                }
            } );
        }
         
        getBetsAndUpdateWonsByRoulette(roulette).then(resp => { return res.json( resp ) })
    } );
};

module.exports = rouletteCtrl;