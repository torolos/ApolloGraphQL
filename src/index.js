const { ApolloServer } = require('apollo-server');
const { typeDefs } = require('./data/schema');
const { resolvers } = require('./data/resolvers');

const server = new ApolloServer({
    typeDefs,
    resolvers
});

server.listen(8080).then(({ url }) => {
    console.log(`Server running on ${url}`); 
});
