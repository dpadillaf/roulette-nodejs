const betUtil = {};
const Bet = require( './model' );

betUtil.getBetsAndUpdateWonsByRoulette = async ( roulette ) => {
    Bet.find()( { roulette: roulette._id }, ( err, bets ) => {
        if ( err ){
            return {
                ok: false,
                err
            };
        }
        let betsUpdated = bets.map( (bet) => {
            if ( bet.betType === 'NUMBER' && bet.numberToBet === roulette.winningNumber ){
                return updateAmountWonByBet(bet, roulette.winningNumber);
            }
        } );

        return {
            ok: true,
            state: roulette.state
        };
    } );
};

async function updateAmountWonByBet (bet, numberWon){
    return bets.map( (bet) => {
        let amountWon = bet.betType === 'NUMBER' ? bet.amountToBet * global.BET_WON_TYPENUMBER : bet.amountToBet * BET_WON_TYPECOLOR;
        return bet.findByIdAndUpdate()
    } );
}

module.exports = betUtil;