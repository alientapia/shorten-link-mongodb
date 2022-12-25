const config = require('./config');
const mongoose = require('mongoose');

mongoose
  .connect(config.mongo_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((db) => console.log(`Database is connected to ${db.connection.name}`))
  .catch((err) => console.log(err));
