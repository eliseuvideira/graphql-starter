import { dotenv } from "@ev-fns/dotenv";

dotenv();

import server from "@ev-fns/server";
import { Router } from "express";
import { applyMiddlewares } from "./functions/applyMiddlewares";
import { app } from "./utils/app";

server({
  app,
  port: +process.env.PORT,
  before: async () => {
    await applyMiddlewares({ app, apollo: Router() });
  },
  after: async () => {
    console.info(`🚀 http://localhost:${+process.env.PORT}`);
  },
});
