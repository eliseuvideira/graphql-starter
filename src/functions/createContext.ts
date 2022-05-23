import { ExpressContext } from "apollo-server-express";
import { createLoaders, Loaders } from "./createLoaders";

export interface Context extends ExpressContext {
  loaders: Loaders;
}

export type ContextFn = (context: ExpressContext) => Context;

export const createContext = (): ContextFn => (context) => {
  const loaders = createLoaders();

  return {
    ...context,
    loaders,
  };
};
