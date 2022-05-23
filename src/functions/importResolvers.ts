import { IResolvers } from "@graphql-tools/utils";
import fs from "fs";
import path from "path";

export const importResolvers = async () => {
  const resolvers: IResolvers[] = [];

  const RESOLVERS_DIRECTORY = path.join(
    __dirname,
    "..",
    "api",
    "graphql",
    "resolvers",
  );

  const items = await fs.promises.readdir(RESOLVERS_DIRECTORY);

  for (const item of items) {
    const currentItem = path.join(RESOLVERS_DIRECTORY, item);

    const type = path.parse(currentItem).name;

    const stat = await fs.promises.stat(currentItem);

    if (stat.isDirectory()) {
      const files = await fs.promises.readdir(currentItem);

      for (const file of files) {
        const currentFile = path.join(currentItem, file);

        const field = path.parse(file).name;

        const module: Record<string, IResolvers> = await import(currentFile);

        for (const key of Object.keys(module)) {
          if (key !== field) {
            throw new Error(
              `Failed to import resolvers for "${currentItem}", expected exported "${field}", received "${key}".`,
            );
          }

          resolvers.push({ [type]: { [field]: module[key] } });
        }
      }
    } else {
      const module: Record<string, IResolvers> = await import(currentItem);

      for (const key of Object.keys(module)) {
        if (key !== type) {
          throw new Error(
            `Failed to import resolvers for "${currentItem}", expected exported "${type}", received "${key}".`,
          );
        }

        resolvers.push({ [type]: module[key] });
      }
    }
  }

  return resolvers;
};
