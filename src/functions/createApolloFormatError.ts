import { GraphQLError } from "graphql";

export const createApolloFormatError =
  () =>
  (err: GraphQLError): GraphQLError => {
    if (
      err.originalError &&
      err.extensions &&
      err.extensions.code === "INTERNAL_SERVER_ERROR"
    ) {
      console.error(err);
      console.error(err.originalError);
      if (process.env.NODE_ENV === "production") {
        err.message = "Internal server error";
      }
    }
    return err;
  };
