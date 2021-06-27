const router = require( 'express' ).Router();
const {
    create
} = require( './controller' );

router.post( '/bet', create );

module.exports = router;