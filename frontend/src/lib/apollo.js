import { ApolloClient, InMemoryCache, HttpLink, split } from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";

const HTTP_URL =
  import.meta.env.VITE_GRAPHQL_HTTP || "http://localhost:4000/graphql";
const WS_URL = import.meta.env.VITE_GRAPHQL_WS || "ws://localhost:4000/graphql";

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
  cache: new InMemoryCache(),
});
