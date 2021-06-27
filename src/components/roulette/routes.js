const router = require( 'express' ).Router();
const {
    create,
    openRoulette,
    closeRoulette,
    getAll
} = require( './controller' );

router.get( '/roulette', getAll );
router.post( '/roulette', create );
router.put( '/roulette/open/:id', openRoulette );
router.put( '/roulette/close/:id', closeRoulette );

module.exports = router;