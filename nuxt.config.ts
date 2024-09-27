const TARGET = process.env.TARGET || 'web';

const useElectron = TARGET === 'desktop';
const useCapacitor = TARGET === 'mobile';

const config = defineNuxtConfig({
  srcDir: 'src/',
  ssr: false,

  runtimeConfig: {
    public: {
      platform: TARGET,
    },
  },

  modules: [
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/stylelint-module',
    '@nuxt/eslint',
    '@nuxtjs/tailwindcss',
    ...(useElectron ? ['nuxt-electron'] : []),
    [
      '@nuxtjs/google-fonts',
      {
        download: true,
        display: 'block',
        families: {
          Rubik: [400, 500, 600, 700],
          'Noto Sans Mono': [400, 700],
          'Material Symbols Rounded:opsz,wght,FILL,GRAD@24,400..700,0..1,0':
            true,
        },
      },
    ],
  ],

  css: ['~/assets/styles/style.scss'],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern',
        },
      },
    },
  },

  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
});

if (useElectron) {
  (config as any).electron = {
    build: [
      {
        entry: 'electron/main.ts',
      },
    ],
  };
}

if (useCapacitor) {
  config.plugins?.push('~/plugins/capacitor-bridge.client.ts');
}

export default config;
