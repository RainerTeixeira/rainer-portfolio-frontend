import React from 'react';

export const CookieBanner = () => null;
export const InstallPrompt = () => null;
export const StarsBackground = ({ children }: { children?: React.ReactNode }) => (
  <div data-testid="stars-background">{children}</div>
);
export const BackToTop = () => <div data-testid="back-to-top">Back to Top</div>;

// Mock genérico para Button
export type CommonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: React.ReactNode;
};
export const Button = ({ children, ...rest }: CommonProps) => (
  <button {...rest} data-testid="mock-button">
    {children ?? 'Button'}
  </button>
);

// Export default para compatibilidade
export default {
  CookieBanner,
  InstallPrompt,
  StarsBackground,
  BackToTop,
  Button,
};
