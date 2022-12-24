// import mongoose package
const mongoose = require('mongoose');
const DB_URI =
  'mongodb://rpamongo:Q4ifWqjd6vr8is5PlFYkMNP68jO7rjc21Pxdh2qVSDumlEMyWjBoOZ1wgNki7UzgUvYSfEIAVBXGACDbS1iCsA==@rpamongo.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@rpamongo@';
// establishing a database connection
mongoose.connect(DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;

module.exports = connection;
