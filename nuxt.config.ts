// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },
  modules: [
    'nuxt-graphql-server',
    'nuxt-graphql-client',
    // '@nuxtjs/eslint-module',
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
    '@nuxtjs/i18n',
    '@nuxt/icon',
  ],
  css: ['~/assets/css/main.css'],
  shadcn: {
    prefix: '',
    componentDir: './components/ui',
  },
  graphqlServer: {
    schema: 'generated/schema.graphql',
    url: '/api/graphql',
  },
  imports: {
    dirs: ['composables/**'],

    imports: [
      { from: '@vee-validate/zod', name: 'toTypedSchema' },
      { from: 'vee-validate', name: 'useForm' },
      { from: 'zod', as: 'z', name: '*' },
    ],
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
  i18n: {
    locales: [
      {
        code: 'pt-BR',
        file: 'pt-BR.json', // Alterado para .yml
        name: 'Português',
      },
      {
        code: 'en',
        file: 'en.json', // Alterado para .yml
        name: 'English',
      },
    ],
    defaultLocale: 'pt-BR',
    strategy: 'prefix_except_default',
    langDir: 'locales/',
    lazy: true,
  },
  plugins: ['~/plugins/pinia.ts'],
})
