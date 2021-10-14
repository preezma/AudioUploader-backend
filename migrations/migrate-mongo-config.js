const mongo = require('../config');
const config = {
  mongodb: {

    url: mongo.uri,

    databaseName: mongo.dbName,

    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  },

  migrationsDir: "migrations",

  changelogCollectionName: "changelog",

  migrationFileExtension: ".js"
};

module.exports = config;
