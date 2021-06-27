const rouletteUtil = {};
const Roulette = require( './model' );

rouletteUtil.getRouletteStateById = async ( idRoulette ) => {
    Roulette.findById( idRoulette, ( err, roulette ) => {
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
            state: roulette.state
        };
    } );
};

rouletteUtil.generateWinningNumber = () => {
    return Math.floor(Math.random() * 37);
};

module.exports = rouletteUtil;