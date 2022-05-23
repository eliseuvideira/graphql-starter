export const createLoaders = () => ({
  hello: "",
});

export type CreateLoaders = typeof createLoaders;

export type Loaders = ReturnType<CreateLoaders>;
