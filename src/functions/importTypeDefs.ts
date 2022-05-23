import fs from "fs";
import { DocumentNode } from "graphql";
import path from "path";

export const importTypeDefs = async () => {
  const typeDefs: DocumentNode[] = [];

  const TYPEDEFS_DIRECTORY = path.join(
    __dirname,
    "..",
    "api",
    "graphql",
    "typeDefs",
  );

  const directories = await fs.promises.readdir(TYPEDEFS_DIRECTORY);

  for (const directory of directories) {
    const currentDirectory = path.join(TYPEDEFS_DIRECTORY, directory);

    const files = await fs.promises.readdir(currentDirectory);

    for (const file of files) {
      const currentFile = path.join(currentDirectory, file);

      const module: Record<string, any> = await import(currentFile);

      for (const key of Object.keys(module)) {
        if (key !== "typeDefs") {
          throw new Error(
            `Failed to import typeDefs for "${currentFile}", expected exported "typeDefs", received "${key}".`,
          );
        }

        typeDefs.push(module[key] as DocumentNode);
      }
    }
  }

  return typeDefs;
};
