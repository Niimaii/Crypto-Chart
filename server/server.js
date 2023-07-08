// This connects to the index.js file in src and automatically runs the file. If it didn't, then the serer wouldn't start
const { config } = require('dotenv');
config();
const src = require('./src/index');
