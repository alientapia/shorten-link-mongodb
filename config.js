require('dotenv').config();
module.exports = {
  port: process.env.PORT,
  mongo_uri: process.env.URI || 'mongodb://localhost/linkdb',
  baseUrl: process.env.BASE_URL || `http://localhost:4000`,
};
