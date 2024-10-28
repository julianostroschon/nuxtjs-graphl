// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    'nuxt-graphql-server',
    'nuxt-graphql-client',
    '@nuxtjs/eslint-module',
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
  ],
  shadcn: {
    prefix: '',
    componentDir: './components/ui',
  },
  graphqlServer: {
    schema: 'generated/schema.graphql',
    url: '/api/graphql',
  },
  runtimeConfig: {
    public: {
      apiBase: '/api/grapqhl',
      'graphql-client': {
        clients: {
          default: {
            host:
              process.env.NUXT_PUBLIC_GRAPHQL_HOST ||
              'http://localhost:3000/api/graphql',
            schema: './generated/schema.graphql',
          },
        },
      },
    },
  },
  'graphql-client': {
    codegen: {
      avoidOptionals: true,
    },
  },
})
