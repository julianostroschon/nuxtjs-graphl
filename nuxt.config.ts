// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: ["nuxt-graphql-server", "nuxt-graphql-client"],
  graphqlServer: {
    schema: "generated/schema.graphql",
    url: "/api/graphql",
  },
  runtimeConfig: {
    public: {
      "graphql-client": {
        clients: {
          default: {
            host: "http://localhost:3000/api/graphql",
            schema: "./generated/schema.graphql",
          },
        },
      },
    },
  },
  "graphql-client": {
    codegen: {
      avoidOptionals: true,
    },
  },
});
