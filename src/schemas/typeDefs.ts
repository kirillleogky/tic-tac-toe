const typeDefs = `
  type User {
    id: String,
    name: String,
    created_at: String
  }
  
  type Query {
    getUsers: [User]
  }

  type Mutation {
    makeMove (user_id: Int, position: Int, board_id: String!): Result
  }

  type Result {
    success: Boolean,
    message: String
  }
`;

export = typeDefs;
