import { gql } from "apollo-server-core";

export interface ApiFields {
  name: string;
  environment: string;
  version: string;
}

export const typeDefs = gql`
  type Api {
    # fields
    name: String!
    environment: String!
    version: String!
  }
`;
