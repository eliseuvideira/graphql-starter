import { exception, notFound } from "@ev-fns/errors";
import { json } from "body-parser";
import cors from "cors";
import express from "express";
import fs from "fs";
import morgan from "morgan";
import path from "path";
import { CORS_ORIGINS } from "../utils/constants";
import { checkDirectoryExists } from "./checkDirectoryExists";

export interface ApplyMiddlewaresProps {
  app: express.Express;
}

export const applyMiddlewares = async ({ app }: ApplyMiddlewaresProps) => {
  // Enabling CORS
  app.use(
    cors({
      origin:
        CORS_ORIGINS.length === 1 && CORS_ORIGINS[0] === "*"
          ? "*"
          : (origin, callback) => {
              if (origin && CORS_ORIGINS.includes(origin)) {
                callback(null, true);

                return;
              }

              callback(null, false);
            },
    }),
  );

  // Parsing `application/json` Body
  app.use(json());

  // Logging Requests
  app.use(morgan("combined"));

  if (process.env.NODE_ENV !== "production") {
    // Redirect to `/graphql`
    app.get("/", (req, res) => res.redirect("/graphql"));
  } else {
    // Returning 200 Health Check
    app.get("/", (req, res) => res.status(200).end());
  }

  // Dynamically Importing Routes
  const ROUTES_DIRECTORY = path.join(__dirname, "..", "routes");

  const routesDirectoryExists = await checkDirectoryExists(ROUTES_DIRECTORY);

  if (routesDirectoryExists) {
    const routes = await fs.promises.readdir(ROUTES_DIRECTORY);

    for (const route of routes) {
      const filepath = path.join(ROUTES_DIRECTORY, route);

      const module = await import(filepath);

      if (!module.default) {
        throw new Error(
          `Failed to import \`route\` "${filepath}", \`default\` exports is undefined.`,
        );
      }

      app.use(module.default);
    }
  }

  // Not Found Handler
  app.use(notFound);

  // Exception Handler
  app.use(exception);
};
