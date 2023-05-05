import http from 'http';
import cors from 'cors';
import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { schema } from './graphql';

const app = express();
const httpServer = http.createServer(app);
const graphqlServer = new ApolloServer({ schema });

const PORT = process.env.PORT || 5000;

app.use(cors());

const startServer = async () => {
  await graphqlServer.start();

  // binding graphql server to `/graphql` path
  app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(graphqlServer, {
      context: async ({ req }) => ({ req }),
    })
  );

  httpServer.listen(PORT);
};

startServer()
  .then(() => {
    console.log(`[🚀] GRAPHQL SERVER AT http://localhost:${PORT}/graphql`);
  })
  .catch(console.log);
