// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: ["nuxt-graphql-server"],
  graphqlServer: {
    schema: "generated/schema.graphql",
    url: "/api/graphql",
  },
  nitro: {
    experimental: {
      asyncContext: true,
    },
  },
});
