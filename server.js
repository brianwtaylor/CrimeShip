const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
require('dotenv').config();

const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
const { findOrCreateUser } = require('./controllers/userController')


// newUrlParser removes deprecation warning from mongoose
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => console.log('Mongoose Connected'))
  .catch(err => console.log(err))

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    let authToken = null
    let currentUser = null
    try {
      authToken = req.headers.authorization
      if (authToken) {
        // find or create user
        currentUser = await findOrCreateUser(authToken)
      }
    } catch (err) {
      console.log(`Unable to authenticate user with token ${authToken}`)
    }
    return { currentUser }
  }
});

server.listen().then(({ url }) => {
  console.log(`Server listening on ${url}`);
})