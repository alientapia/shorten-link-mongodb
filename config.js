const dotenv = require('dotenv');
const path = require('path');

console.log(process.env.NODE_ENV);
dotenv.config({
  path: path.resolve(__dirname, process.env.NODE_ENV + '.env'),
});
module.exports = {
  PORT: process.env.PORT,
  URI: process.env.URI,
  BASE_URL: process.env.BASE_URL,
};
