import { PluginDefinition } from "apollo-server-core";

export const logging = +process.env.GRAPHQL_DEBUG
  ? (): PluginDefinition | null => ({
      requestDidStart: async ({ context }) => {
        return {
          willSendResponse: async (ctx) => {
            console.info((ctx.request.query || "").trim());
            console.info(ctx.request.variables);
            console.info({
              data: ctx.response.data,
              errors: ctx.response.errors,
            });
            if (context?.req?.session) {
              console.info(context.req.session);
            }
            if (context?.req?.usuario) {
              console.info(context.req.usuario);
            }
          },
        };
      },
    })
  : null;
