require('dotenv').config();
const app = require('./src/app');
require('./database');

app.listen(app.get('port'), () =>
  console.log(
    `\x1b[32mServer app listening on port: \x1b[33m${app.get('port')}!`
  )
);
