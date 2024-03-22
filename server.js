const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { initDb } = require('./db/connect');
/* Auth middleware goes here */
//const authMiddleware = require('./middleware/authMiddleware');
const routes = require('./routes');

const app = express();
const port = process.env.PORT || 3000;


app
  .use(cors())
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  /* use auth middleware here */
  .use('/', routes);

initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Connected to DB and listening on ${port}`);
    });
  })
  .catch((err) => {
    console.error('Error starting the app:', err);
  });