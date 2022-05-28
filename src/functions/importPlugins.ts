import { PluginDefinition } from "apollo-server-core";
import fs from "fs";
import path from "path";

export const importPlugins = async () => {
  const plugins: PluginDefinition[] = [];

  const PLUGINS_DIRECTORY = path.join(
    __dirname,
    "..",
    "api",
    "graphql",
    "plugins",
  );

  const files = await fs.promises.readdir(PLUGINS_DIRECTORY);

  for (const file of files) {
    const filepath = path.join(PLUGINS_DIRECTORY, file);

    const module: Record<string, (() => PluginDefinition) | null> =
      await import(filepath);

    const base = path.parse(file).name;

    for (const key of Object.keys(module)) {
      if (key !== base) {
        throw new Error(
          `Failed to import plugin for "${filepath}", expected exported "${base}", received "${key}".`,
        );
      }

      const plugin = module[key];

      if (plugin) {
        plugins.push(plugin());
      }
    }
  }

  return plugins.length ? plugins : undefined;
};
