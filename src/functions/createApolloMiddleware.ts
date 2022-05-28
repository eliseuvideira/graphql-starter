import { ApolloServer } from "apollo-server-express";
import { Router } from "express";

export const createApolloMiddleware = (server: ApolloServer) => () => {
  const router = Router();

  router.use("/graphql", server.getMiddleware({ cors: false, path: "/" }));

  return router;
};
