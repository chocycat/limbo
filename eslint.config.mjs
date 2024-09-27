import withNuxt from './.nuxt/eslint.config.mjs';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import vueParser from 'vue-eslint-parser';

export default withNuxt(
  {
    languageOptions: {
      parser: vueParser,
    },
    files: ['**/*.ts', '**/*.js', '**/*.vue'],
    rules: {
      'vue/multi-word-component-names': ['off'],
      'vue/no-v-html': ['off'],
    },
  },
  eslintPluginPrettierRecommended
);
