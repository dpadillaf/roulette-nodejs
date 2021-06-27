const express = require( 'express' );

const app = express();

app.use( require( '../components/roulette/routes' ) );

module.exports = app;