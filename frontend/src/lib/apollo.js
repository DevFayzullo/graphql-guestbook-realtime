import { ApolloClient, InMemoryCache, HttpLink, split } from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";

const HTTP_URL = import.meta.env.VITE_GRAPHQL_HTTP;
const WS_URL = import.meta.env.VITE_GRAPHQL_WS;

if (!HTTP_URL || !WS_URL) {
  throw new Error(
    "VITE_GRAPHQL_HTTP yoki VITE_GRAPHQL_WS topilmadi. .env faylni tekshiring."
  );
}

const httpLink = new HttpLink({ uri: HTTP_URL });

let link = httpLink;

if (typeof window !== "undefined") {
  const wsLink = new GraphQLWsLink(
    createClient({
      url: WS_URL,
    })
  );

  link = split(
    ({ query }) => {
      const def = getMainDefinition(query);
      return (
        def.kind === "OperationDefinition" && def.operation === "subscription"
      );
    },
    wsLink,
    httpLink
  );
}

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache({
    typePolicies: {
      Message: {
        keyFields: ["id"],
      },
      Query: {
        fields: {
          messages: {
            merge(existing = [], incoming = []) {
              const map = new Map();
              [...incoming, ...existing].forEach((m) => {
                if (m && m.id) map.set(m.id, m);
              });
              return Array.from(map.values());
            },
          },
        },
      },
    },
  }),
});
