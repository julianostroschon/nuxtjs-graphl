import pluginVitest from '@vitest/eslint-plugin'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'
import vueTsEslintConfig from '@vue/eslint-config-typescript'
import pluginVue from 'eslint-plugin-vue'

export default [
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
  },

  {
    name: 'app/files-to-ignore',
    ignores: [
      '**/dist/**',
      '**/dist-ssr/**',
      '**/coverage/**',
      '**/coverage-ssr/**',
      '**/node_modules/**',
      '**/generated/**',
      '**/.output/**',
      '**/.nuxt/**',
    ],
  },

  ...pluginVue.configs['flat/essential'],
  ...vueTsEslintConfig(),
  {
    files: ['**/*.vue'],
    rules: {
      'vue/multi-word-component-names': 'off',
    },
  },
  {
    ...pluginVitest.configs.recommended,
    files: ['src/**/__tests__/*'],
  },
  skipFormatting,
]
