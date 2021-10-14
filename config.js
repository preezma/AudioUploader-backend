require('dotenv').config();

const mongo = {
    uri: process.env.MONGO_URI || 'mongodb://localhost:27017/dbStream',
    dbName: process.env.MONGO_DB || 'dbStream',
};

module.exports = mongo;