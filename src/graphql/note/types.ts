export const NoteTypes = `
  type Note {
      id: ID!
      title: String
      body: String
      createdAt: String
  }

  type Query {
    notes: [Note]
    note(id: ID!): Note
  }

  type Mutation {
    addNote(title: String, body: String, createdAt: String): Note
    deleteNote(id: ID!): Note
    updateNote(id: ID!, title: String, body: String): Note
  }
`;
