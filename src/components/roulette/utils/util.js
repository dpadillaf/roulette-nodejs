const rouletteUtil = {};
const Roulette = require( '../model' );

rouletteUtil.getRouletteStateById = ( idRoulette ) => {
    return new Promise( (resolve, reject) => { Roulette.findById( idRoulette, ( err, roulette ) => {
            if ( err ){
                resolve ( {
                    ok: false,
                    err
                } );
            } else if ( !roulette ){
                resolve ( {
                    ok: false,
                    err: {
                        message: 'No existe ruleta'
                    }
                } );
            }

            resolve ( {
                ok: true,
                state: roulette.state
            } );
        } );
    });
};

rouletteUtil.generateWinningNumber = () => {
    return Math.floor(Math.random() * 37);
};

module.exports = rouletteUtil;