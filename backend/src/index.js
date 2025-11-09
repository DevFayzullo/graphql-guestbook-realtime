wwimport http from "http";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import { PubSub } from "graphql-subscriptions";

const pubsub = new PubSub();
const MESSAGE_ADDED = "MESSAGE_ADDED";

const typeDefs = `#graphql
  scalar Date

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

let messages = [
  {
    id: "1",
    name: "Admin",
    text: "Welcome to GraphQL Guestbook 👋",
    createdAt: new Date().toISOString(),
  },
];

const resolvers = {
  Query: {
    messages: (_, { limit, offset }) =>
      messages
        .slice()
        .reverse()
        .slice(offset, offset + limit),
  },
  Mutation: {
    addMessage: async (_, { name, text }) => {
      const msg = {
        id: String(Date.now()),
        name,
        text,
        createdAt: new Date().toISOString(),
      };
      messages.push(msg);
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

const schema = makeExecutableSchema({ typeDefs, resolvers });

const app = express();
app.use(cors());
app.use(bodyParser.json());

const httpServer = http.createServer(app);

// WS server
const wsServer = new WebSocketServer({
  server: httpServer,
  path: "/graphql",
});
useServer({ schema }, wsServer);

// Apollo HTTP
const server = new ApolloServer({ schema });
await server.start();
app.use("/graphql", expressMiddleware(server));

const PORT = process.env.PORT || 4000;
httpServer.listen(PORT, () => {
  console.log(`HTTP  : http://localhost:${PORT}/graphql`);
  console.log(`WS    : ws://localhost:${PORT}/graphql`);
});
