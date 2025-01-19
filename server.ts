// server.tsx
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { typeDefs, resolvers } from './graphql/schema'; // Supondo que você tenha seus schema e resolvers aqui

const app = express();
const server = new ApolloServer({
    typeDefs,
    resolvers,
});

server.applyMiddleware({ app });

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}${server.graphqlPath}`);
});
