const express = require( 'express' );

const app = express();

app.use( require( '../components/roulette/routes' ) );
app.use( require( '../components/bet/routes' ) );

module.exports = app;