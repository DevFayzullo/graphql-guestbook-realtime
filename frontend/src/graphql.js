import { gql } from "@apollo/client";

export const QUERY_MESSAGES = gql`
  query Messages($limit: Int, $offset: Int) {
    messages(limit: $limit, offset: $offset) {
      id
      name
      text
      createdAt
    }
  }
`;

export const MUTATION_ADD = gql`
  mutation AddMessage($name: String!, $text: String!) {
    addMessage(name: $name, text: $text) {
      id
      name
      text
      createdAt
    }
  }
`;

export const SUB_MESSAGE_ADDED = gql`
  subscription MessageAdded {
    messageAdded {
      id
      name
      text
      createdAt
    }
  }
`;
