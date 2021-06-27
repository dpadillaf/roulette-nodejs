const rouletteCtrl = {};
const Roulette = require( './model' );
const { 
    generateWinningNumber
 } = require( './utils/util' );

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
        winningNumber: generateWinningNumber,
        closed_at: Date.now()
     }, ( err, roulette ) => {
        if ( err ){
            return {
                ok: false,
                err
            };
        } else if ( !roulette ){
            return {
                ok: false,
                err: {
                    message: 'No existe ruleta'
                }
            };
        }

        return {
            ok: true,
            roulette
        };
    } );
};

module.exports = rouletteCtrl;