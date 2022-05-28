import { AuthenticationError } from "apollo-server-core";
import { resolver } from "../../../functions/resolver";

const TOKEN_PREFIX = "Bearer ";

export const auth = () =>
  resolver<any, any, any>(async (_, args, { req, res }) => {
    const authorization = req.headers.authorization;

    if (
      !authorization ||
      !authorization.toLowerCase().startsWith(TOKEN_PREFIX.toLowerCase())
    ) {
      res.set("WWW-Authenticate", "Bearer");

      throw new AuthenticationError("Não autorizado.");
    }

    const token = authorization.slice(TOKEN_PREFIX.length);

    if (token !== process.env.API_TOKEN) {
      throw new AuthenticationError("Não autorizado.");
    }
  });
