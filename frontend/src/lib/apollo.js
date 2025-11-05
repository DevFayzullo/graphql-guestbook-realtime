import { ApolloClient, InMemoryCache, HttpLink, split } from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";

const HTTP_URL = import.meta.env.VITE_GRAPHQL_HTTP;
const WS_URL = import.meta.env.VITE_GRAPHQL_WS;

if (!HTTP_URL || !WS_URL) {
  throw new Error("Missing VITE_GRAPHQL_HTTP or VITE_GRAPHQL_WS");
}

const httpLink = new HttpLink({ uri: HTTP_URL });
const wsLink =
  typeof window !== "undefined"
    ? new GraphQLWsLink(createClient({ url: WS_URL }))
    : null;

const link = wsLink
  ? split(
      ({ query }) => {
        const def = getMainDefinition(query);
        return (
          def.kind === "OperationDefinition" && def.operation === "subscription"
        );
      },
      wsLink,
      httpLink
    )
  : httpLink;

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache({
    typePolicies: {
      Message: { keyFields: ["id"] },
      Query: {
        fields: {
          messages: {
            merge(existing = [], incoming = []) {
              const map = new Map();
              [...incoming, ...existing].forEach((x) => map.set(x.id, x));
              return Array.from(map.values());
            },
          },
        },
      },
    },
  }),
});
