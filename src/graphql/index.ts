import { NoteQuery } from "./note/query";
import { NoteMutation } from "./note/mutation";
import { NoteTypes } from "./note/types";

export const typeDefs = `#graphql
    type Query
    ${NoteTypes}
`;

export const resolvers = {
  Query: {
    ...NoteQuery,
  },

  Mutation: {
    ...NoteMutation,
  },
};
