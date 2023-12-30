import { gql } from "@apollo/client";

export const ADD_NOTE = gql`
  mutation AddNote($title: String, $body: String, $createdAt: String) {
    addNote(title: $title, body: $body, createdAt: $createdAt) {
      id
      title
      createdAt
      body
    }
  }
`;

export const UPDATE_NOTE = gql`
  mutation UpdateNote($id: ID!, $title: String, $body: String) {
    updateNote(id: $id, title: $title, body: $body) {
      id
      title
      createdAt
      body
    }
  }
`;

export const DELETE_NOTE = gql`
  mutation DeleteNote($id: ID!) {
    deleteNote(id: $id) {
      title
    }
  }
`;
