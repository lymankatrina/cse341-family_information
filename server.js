const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongodb = require('./db/connect');
/* Auth middleware goes here */
//const authMiddleware = require('./middleware/authMiddleware');
const routes = require('./routes');

const app = express();
const port = process.env.PORT || 3000;

const individualRoutes = require('./routes/individualRoutes');


const corsOptions = {
    origin: 'https://cse341-family_information.onrender.com',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  };
  
  app.use(cors(corsOptions));




app.use(cors());
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Z-Key');
  next();
});


app.use('/', require('./routes'));
app.use('/individuals', individualRoutes);

  
  
  mongodb.initDb()
  .then(() => {
    app.locals.db = mongodb.getDb();

    app.listen(port, () => {
      console.log(`Connected to DB and listening on ${port}`);
    });
  })
  .catch((err) => {
    console.error('Error starting the app:', err);
  });