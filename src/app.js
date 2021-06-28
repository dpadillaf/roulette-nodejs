const express = require( 'express' );

const app = express();

require( './config/default' );
require( './config/global' );
require( './database/database' );
app.use( express.json() );
app.use( express.urlencoded( { extended: false } ) );
app.use( require( './routes/routes' ) );

app.listen( process.env.PORT, () => {
    console.log( `Listen on port ${ process.env.PORT }` );
} );