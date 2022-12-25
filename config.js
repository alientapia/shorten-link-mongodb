require('dotenv').config();
module.exports = {
  port: process.env.PORT,
  mongo_uri: process.env.URI,
  baseUrl: process.env.BASE_URL,
};
