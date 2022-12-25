require('dotenv').config();
module.exports = {
  port: process.env.PORT,
  mongo_uri: process.env.URI || 'mongodb://localhost/linkdb',
  db_name: process.env.DB_NAME || 'linkdb',
};
