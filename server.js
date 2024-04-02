const express = require('express');
const cors = require('cors');
const { initDb } = require('./db/connect');
const authMiddleware = require('./middleware/authMiddleware').authMiddleware;

const routes = require('./routes');

//graphQL
const { graphqlHTTP } = require('express-graphql'); 
const { ObjectId } = require('mongodb'); //Import ObjectId
const schema = require('./schema');


const app = express();
const port = process.env.PORT || 3000;

app
  .use(cors())
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(authMiddleware)
  .use('/', routes);


  app.use('/graphql', graphqlHTTP({
    //directing express-graphql to use this schema to map out the graph 
    schema,
    //directing express-graphql to use graphiql when goto '/graphql' address in the browser
    //which provides an interface to make GraphQl queries
    graphiql:true
}));
//End of GraphQL


initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Connected to DB and Web Server is running on port ${port}`);
    });
  }
});

module.exports = app;