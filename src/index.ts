import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import { typeDefs, resolvers } from './schemas';

const { PORT } = process.env;

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startServer = async (): Promise<void> => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: Number(PORT) || 8000 },
  });

  console.log(`🚀  Server ready at: ${url}`);
};

try {
  startServer();
} catch (error) {
  console.log(`Error ${error}`);
}