const { ApolloServer } = require('apollo-server');

const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers')
const mongoose = require('mongoose')
require('dotenv').config()

// newUrlParser removes deprecation warning from mongoose
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => console.log('Mongoose Connected'))
  .catch(err => console.log(err))

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen().then(({ url }) => {
  console.log(`Server listening on ${url}`);
})