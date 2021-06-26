process.env.PORT = process.env.PORT || 3000;
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
process.env.NODE_ENV === 'dev' ? process.env.URLDB = 'mongodb://localhost:27017/roulette' : process.env.URLDB = process.env.MONGO_URI;