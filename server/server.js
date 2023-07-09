// This connects to the index.js file in src and automatically runs the file. If it didn't, then the serer wouldn't start
const { config } = require('dotenv');
// This join IS SO FUCKING IMPORTANT. We setup the path for the .env file by default, this way in production it's found.
const { join } = require('path');
config({ path: join(__dirname, '.env') });
const src = require('./src/index');
