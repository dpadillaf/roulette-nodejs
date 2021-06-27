const betCtrl = {};
const Bet = require( './model' );
const {
    getRouletteStateById
} = require( '../roulette/utils/util' );

betCtrl.create = async ( req, res ) => {
    let { 
        numberToBet, 
        betType, 
        amountToBet,
        idUser,
        roulette
    } = req.body;
    let rouletteState = await getRouletteStateById(roulette);
    if (!rouletteState.ok){
        return res.status( 400 ).json( roulette );
    }else{
        if (rouletteState === 'OPEN'){
            let bet = new Bet( {
                numberToBet, 
                betType, 
                amountToBet,
                idUser,
                roulette
            } );
            bet.save( ( err, betDB ) => {
                if ( err ){
                    return res.status( 400 ).json( {
                        ok: false,
                        err
                    } );
                }
        
                return res.json( {
                    ok: true,
                    roulette: betDB
                } );
            } );
        }else{
            return res.json( {
                ok: false,
                message: 'la ruleta no está abierta'
            } );
        }
    }
};

module.exports = betCtrl;