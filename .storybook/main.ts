import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';
import path from 'path';

const config: StorybookConfig = {
  stories: ['../components/**/*.stories.@(js|jsx|mjs|ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-controls',
    '@storybook/addon-backgrounds',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  viteFinal: async (config) => {
    return mergeConfig(config, {
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '../'),
          '@/components': path.resolve(__dirname, '../components'),
          '@/lib': path.resolve(__dirname, '../lib'),
          '@/hooks': path.resolve(__dirname, '../hooks'),
          '@/constants': path.resolve(__dirname, '../constants'),
          '@/app': path.resolve(__dirname, '../app'),
          '@/public': path.resolve(__dirname, '../public'),
        },
      },
      optimizeDeps: {
        include: ['@rainer/design-tokens'],
      },
    });
  },
};

export default config;

