import type { Config } from 'tailwindcss';

export default <Partial<Config>>{
  content: [],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Rubik',
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
          'Apple Color Emoji',
          'Segoe UI Emoji',
          'Segoe UI Symbol',
          'Noto Color Emoji',
        ],
        mono: [
          'Noto Sans Mono',
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          'Liberation Mono',
          'Courier New',
          'monospace',
        ],
      },
      colors: {
        // CSS variables for the accent and theme
        accent: {
          '400': 'var(--accent-400)',
          '500': 'var(--accent-500)',
          '600': 'var(--accent-600)',
        },

        error: {
          '400': 'var(--error-400)',
          '500': 'var(--error-500)',
          '600': 'var(--error-600)',
        },

        warning: {
          '400': 'var(--warning-400)',
          '500': 'var(--warning-500)',
          '600': 'var(--warning-600)',
        },

        theme: {
          '50': 'var(--theme-50)',
          '100': 'var(--theme-100)',
          '200': 'var(--theme-200)',
          '300': 'var(--theme-300)',
          '400': 'var(--theme-400)',
          '500': 'var(--theme-500)',
          '600': 'var(--theme-600)',
          '700': 'var(--theme-700)',
          '800': 'var(--theme-800)',
          '900': 'var(--theme-900)',
          '950': 'var(--theme-950)',
        },

        // Accents
        aether: {
          '400': '#C7B6E2',
          '500': '#B099D6',
          '600': '#9171C6',
        },

        ember: {
          '400': '#EDD2D2',
          '500': '#E2B5B5',
          '600': '#D69898',
        },

        beacon: {
          '400': '#E9E7AF',
          '500': '#E0DE8F',
          '600': '#D4D163',
        },

        // Common
        onyx: {
          '50': '#f6f6f9',
          '100': '#ececf2',
          '200': '#d6d6e1',
          '300': '#b2b3c7',
          '400': '#888ba8',
          '500': '#696d8e',
          '600': '#545675',
          '700': '#444560',
          '800': '#3b3c51',
          '900': '#353545',
          '950': '#16161d',
        },
      },
      transitionTimingFunction: {
        standard: 'cubic-bezier(0.2, 0.1, 0, 1.0)',
        'standard-accelerate': 'cubic-bezier(0.3, 0, 1, 1)',
        'standard-decelerate': 'cubic-bezier(0, 0, 0, 1)',
        'emphasized-accelerate': 'cubic-bezier(0.3, 0.0, 0.8, 0.15)',
        'emphasized-decelerate': 'cubic-bezier(0.05, 0.7, 0.1, 1.0)',
      },
      transitionDuration: {
        DEFAULT: '200ms',
      },
    },
  },
  plugins: [],
};
