# Title

Audio Uploader App Back End

# Description

Client has ability to fetch users details from this REST api endpoint. Each user can upload an audio file, play and change it.

### API Installation and Setup instructions

1. Download and Install Node.js https://nodejs.org/en/
2. Install MongoDb [Guide](https://docs.mongodb.com/manual/administration/install-community/)
3. Download or clone the repository
4. Remove `.example` extension from .env.example file`
   ```sh
   .env.example -> .env
   ```
5. Install required node modules
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
   $ npm run prod
```

or (if nodemon package is available)

```sh
   $ npm run dev
```
