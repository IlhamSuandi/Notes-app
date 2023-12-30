import { gql } from "@apollo/client";

export const GET_NOTES = gql`
  query Notes {
    notes {
      id
      title
      body
      createdAt
    }
  }
`;

export const GET_NOTE = gql`
  query Note($id: ID!) {
    note(id: $id) {
      id
      title
      body
      createdAt
    }
  }
`;
