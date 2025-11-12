import http from "http";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import { PubSub } from "graphql-subscriptions";

// --- PubSub va xotiradagi ma'lumotlar
const pubsub = new PubSub();
const MESSAGE_ADDED = "MESSAGE_ADDED";

// oddiy in-memory array (demo uchun)
const messages = [
  {
    id: "1",
    name: "Admin",
    text: "Welcome to GraphQL Guestbook 👋",
    createdAt: new Date().toISOString(),
  },
];

// --- GraphQL schema (SDL)
const typeDefs = `#graphql
  type Message {
    id: ID!
    name: String!
    text: String!
    createdAt: String!
  }

  type Query {
    messages(limit: Int = 30, offset: Int = 0): [Message!]!
  }

  type Mutation {
    addMessage(name: String!, text: String!): Message!
  }

  type Subscription {
    messageAdded: Message!
  }
`;

// --- Resolvers
const resolvers = {
  Query: {
    messages: (_, { limit = 30, offset = 0 }) => {
      // eng oxirgi xabarlar yuqorida bo'lsin
      return messages
        .slice() // copy
        .reverse()
        .slice(offset, offset + limit);
    },
  },
  Mutation: {
    addMessage: async (_, { name, text }) => {
      const msg = {
        id: Date.now().toString(),
        name,
        text,
        createdAt: new Date().toISOString(),
      };
      messages.push(msg);
      // subscription uchun publish
      await pubsub.publish(MESSAGE_ADDED, { messageAdded: msg });
      return msg;
    },
  },
  Subscription: {
    messageAdded: {
      subscribe: () => pubsub.asyncIterator(MESSAGE_ADDED),
    },
  },
};

// --- Schema yaratamiz
const schema = makeExecutableSchema({ typeDefs, resolvers });

// --- Express + HTTP server
const app = express();
app.use(cors());
app.use(bodyParser.json());

const httpServer = http.createServer(app);

// --- WebSocket server (graphql-ws) /graphql path da
const wsServer = new WebSocketServer({
  server: httpServer,
  path: "/graphql",
});

useServer({ schema }, wsServer);

// --- Apollo Server (HTTP) /graphql path da
const server = new ApolloServer({ schema });
await server.start();

app.use(
  "/graphql",
  expressMiddleware(server, {
    context: async () => ({}),
  })
);

// --- Port
const PORT = process.env.PORT || 4000;

httpServer.listen(PORT, () => {
  console.log(`🚀 HTTP ready at http://localhost:${PORT}/graphql`);
  console.log(`🔌 WS ready at ws://localhost:${PORT}/graphql`);
});
