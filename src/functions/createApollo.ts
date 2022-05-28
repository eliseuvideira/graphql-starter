import { makeExecutableSchema } from "@graphql-tools/schema";
import { IResolvers } from "@graphql-tools/utils";
import {
  ApolloServer,
  ApolloServerExpressConfig,
  ExpressContext,
} from "apollo-server-express";
import { DocumentNode } from "graphql";
import { createApolloFormatError } from "./createApolloFormatError";
import { createApolloMiddleware } from "./createApolloMiddleware";

export declare type CreateApolloBaseProps = Omit<
  ApolloServerExpressConfig,
  "typeDefs" | "resolvers" | "context"
>;

export declare type CreateApolloContextFunction<
  Context extends ExpressContext = ExpressContext,
> = (context: Context) => Context;

export interface CreateApolloProps<
  Context extends ExpressContext = ExpressContext,
> extends CreateApolloBaseProps {
  typeDefs: DocumentNode[];
  resolvers: IResolvers[];
  context: CreateApolloContextFunction<Context>;
}

export const createApollo = <Context extends ExpressContext = ExpressContext>({
  typeDefs,
  resolvers,
  context,
  ...props
}: CreateApolloProps<Context>) => {
  const schema = makeExecutableSchema({ typeDefs, resolvers });

  const formatError = createApolloFormatError();

  const server = new ApolloServer({
    schema,
    context,
    formatError,
    ...props,
  });

  const middleware = createApolloMiddleware(server);

  return {
    server,
    start: () => server.start(),
    middleware,
  };
};
