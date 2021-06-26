const URI = process.env.URLDB;
const mongoose = require( 'mongoose' );

mongoose.connect( URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
} ).then ( db => console.log( 'DB is connected' ) )
.catch( err => console.log( 'error: ', err ) );