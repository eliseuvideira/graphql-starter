import { gql } from "apollo-server-core";

export const typeDefs = gql`
  type Query {
    # api
    api: Api!
  }
`;
