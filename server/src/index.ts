import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import express from 'express';
import 'reflect-metadata';
import http from 'http';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { ApolloServerPluginDrainHttpServer, ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';

import { User } from './entities/User';
import { GreetingResolver } from './resolvers/greeting';

config();

export const dataSource = new DataSource({
  type: 'postgres',
  database: 'jwt_auth_full_stack',
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  logging: true,
  synchronize: true,
  entities: [User],
});

const main = async () => {
  // load entities, establish db connection, sync schema, etc.
  await dataSource.connect();

  const app = express();
  const httpServer = http.createServer(app);

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      validate: false,
      resolvers: [GreetingResolver],
    }),
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer: httpServer }),
      ApolloServerPluginLandingPageGraphQLPlayground,
    ],
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app });

  const PORT = process.env.PORT || 4000;

  await new Promise((resolve) => httpServer.listen(PORT, resolve as () => void));

  console.log(`Server is running, GraphQL Playground available at http://localhost:${PORT}${apolloServer.graphqlPath}`);
};

main().catch((error) => console.log('ERROR STARTING ERROR', error));
