const betUtil = {};
const Bet = require( '../model' );

betUtil.getBetsAndUpdateWonsByRoulette = ( roulette ) => {
    return new Promise( (resolve, reject) => { Bet.find( { roulette: roulette._id }, ( err, bets ) => {
            if ( err ){
                resolve( {
                    ok: false,
                    err
                } );
            }
            let betsUpdated = bets.map( (bet) => {
                if ( ( bet.betType === 'NUMBER' && bet.numberToBet === roulette.winningNumber ) 
                || ( ( bet.betType === 'COLOR' ) && ( ( roulette.winningNumber % 2 === 0 && bet.numberToBet % 2 === 0 ) 
                || ( roulette.winningNumber % 2 === 1 && bet.numberToBet % 2 === 1 ) ) ) ){
                    let amountWon = bet.betType === 'NUMBER' ? bet.amountToBet * global.BET_WON_TYPENUMBER : bet.amountToBet * global.BET_WON_TYPECOLOR;
                    bet.amountWon = amountWon;
                    bet.save();
                    return bet;
                } else {
                    return bet;
                }
            } );
    
            resolve(  {
                ok: true,
                bets: betsUpdated
            } );
        } );
    });
};

module.exports = betUtil;