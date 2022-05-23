import fs from "fs";

export const checkDirectoryExists = async (path: string) => {
  try {
    const stat = await fs.promises.stat(path);

    return stat.isDirectory();
  } catch (err: any) {
    if (err.code === "ENOENT") {
      return false;
    }

    throw err;
  }
};
