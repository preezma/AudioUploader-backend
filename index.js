/**
 * NPM Module dependencies.
 */
const express = require('express');
const routes = require('./user/route');

const MongoClient = require('mongoose')
const ObjectID = require('mongodb').ObjectID;

/**
 * Create Express server && Express Router configuration.
 */
const server = express();
server.use('/user', routes);

/**
 * GET /docs
 */
server.use('/audio', express.static('uploads'));

const uri = 'mongodb+srv://admin:1234@cluster0.j3rnu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const port = process.env.PORT || 3004;
/**
 * Connect Mongo Driver to MongoDB Atlass.
 */
let db;
MongoClient.connect(uri, (err, database) => {
    if (err) {
        console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
        process.exit(1);
    }
    console.log('connected')
    db = database;
    server.listen(port, () => {
        console.info(`Server started on port ${port}`);
    });
});
