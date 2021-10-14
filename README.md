# Title

AudioUploader

# Description

Client has ability to fetch users details from this REST api endpoint. Each user can upload an audio file, play and change it.

### API Installation and setup instruction

1. Download and Install Node.js https://nodejs.org/en/
2. Install MongoDb [Guide](https://docs.mongodb.com/manual/administration/install-community/)
3. Remove `.example` extension from .env.example file`
   ```sh
   .env.example -> .env
   ```
4. Install required node modules
   ```sh
   $ npm i
   ```

### Migrations

We use migrate-mongo a database migration tool for MongoDB in Node https://www.npmjs.com/package/migrate-mongo

```sh
$ migrate-mongo-config.js
```

### API Initialization

Run the command

```sh
   $ npm start
```
