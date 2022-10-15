// import mongoose package
const mongoose = require('mongoose');

// declare a Database string URI
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;
//mongodb://balta:e296cd9f@localhost:27017/admin

//const DB_URI = `mongodb://${dbUser}:${dbPassword}@localhost:27017/${dbName}`;
const DB_URI = `mongodb://localhost:27017/urlshortener`;
// establishing a database connection
mongoose.connect(DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;

// export the connection object
module.exports = connection;
