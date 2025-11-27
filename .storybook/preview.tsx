import type { Preview } from '@storybook/react';
import React from 'react';
import '../app/globals.css';
import { ThemeProvider } from '../components/providers/theme-provider';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#ffffff',
        },
        {
          name: 'dark',
          value: '#0a0a0a',
        },
      ],
    },
    docs: {
      toc: true,
    },
  },
  decorators: [
    Story => (
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <div className="min-h-screen bg-background text-foreground">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

export default preview;

