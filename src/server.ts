import { dotenv } from "@ev-fns/dotenv";

dotenv();

import server from "@ev-fns/server";
import { applyMiddlewares } from "./functions/applyMiddlewares";
import { createApollo } from "./functions/createApollo";
import { Context, createContext } from "./functions/createContext";
import { importPlugins } from "./functions/importPlugins";
import { importResolvers } from "./functions/importResolvers";
import { importTypeDefs } from "./functions/importTypeDefs";
import { app } from "./utils/app";

server({
  app,
  port: +process.env.PORT,
  before: async () => {
    const typeDefs = await importTypeDefs();

    const resolvers = await importResolvers();

    const context = createContext();

    const plugins = await importPlugins();

    const apollo = createApollo<Context>({
      typeDefs,
      resolvers,
      context,
      plugins,
    });

    await apollo.start();

    await applyMiddlewares({ app, apollo: apollo.middleware() });
  },
  after: async () => {
    console.info(`🚀 http://localhost:${+process.env.PORT}`);
  },
});
