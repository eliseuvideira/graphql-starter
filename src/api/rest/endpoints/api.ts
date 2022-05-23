import { endpoint } from "@ev-fns/endpoint";

export const apiGet = endpoint(async (req, res) => {
  res.status(200).json({
    name: process.env.API_NAME,
    environment: process.env.NODE_ENV,
    version: process.env.npm_package_version,
  });
});
