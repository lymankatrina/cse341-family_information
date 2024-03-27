const express = require('express');
const cors = require('cors');
const { initDb } = require('./db/connect');
const authMiddleware = require('./middleware/authMiddleware');

const routes = require('./routes');

const app = express();
const port = process.env.PORT || 3000;

app
  .use(cors())
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(authMiddleware.authMiddleware)
  .use('/', routes);

initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Connected to DB and Web Server is running on port ${port}`);
    });
  }
});
