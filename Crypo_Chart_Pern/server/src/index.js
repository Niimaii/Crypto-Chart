const express = require('express');
const app = express();
const { PORT } = require('./constants/index.js');

// app start
const appStart = () => {
  try {
    app.listen(PORT, () => {
      console.log(`App running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
};

appStart();
