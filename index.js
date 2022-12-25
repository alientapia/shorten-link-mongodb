const dotenv = require('dotenv');
const path = require('path');
dotenv.config({
  path: path.resolve(__dirname, process.env.NODE_ENV + '.env'),
});
require('./database');
const app = require('./src/app');

app.listen(app.get('port'), () => {
  console.log(`Server app is lestening on por: ${process.env.BASE_URL} `);
});
