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
          '50': 'var(--accent-50)',
          '100': 'var(--accent-100)',
          '200': 'var(--accent-200)',
          '300': 'var(--accent-300)',
          '400': 'var(--accent-400)',
          '500': 'var(--accent-500)',
          '600': 'var(--accent-600)',
          '700': 'var(--accent-700)',
          '800': 'var(--accent-800)',
          '900': 'var(--accent-900)',
          '950': 'var(--accent-950)',
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
          '50': '#f8f6fc',
          '100': '#f1eff8',
          '200': '#e6e1f3',
          '300': '#d3c8ea',
          '400': '#b099d6',
          '500': '#a485cd',
          '600': '#936abd',
          '700': '#8157aa',
          '800': '#6d498e',
          '900': '#5a3d75',
          '950': '#3a274e',
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
    },
  },
  plugins: [],
};
