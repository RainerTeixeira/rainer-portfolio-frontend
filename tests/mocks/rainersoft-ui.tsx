import React from 'react';

// Funções utilitárias
export const cn = (...classes: Array<string | undefined | null | false>) =>
  classes.filter(Boolean).join(' ');

// Hooks
export const useIsMobile = () => false;

// Componentes usados nos testes
export const BackToTop = () => <div data-testid="back-to-top">Back to Top</div>;
export const Button = React.forwardRef(
  (
    {
      children,
      asChild,
      size: _size,
      variant: _variant,
      ...props
    }: any,
    ref: any
  ) => {
    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children as any, {
        ...props,
        ref,
        'data-testid': props['data-testid'] ?? 'button',
      });
    }

    return (
      <button ref={ref} {...props} data-testid={props['data-testid'] ?? 'button'}>
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';

export const Alert = ({ children, ...props }: any) => (
  <div data-testid="alert" {...props}>
    {children}
  </div>
);

export const AlertDescription = ({ children, ...props }: any) => (
  <div data-testid="alert-description" {...props}>
    {children}
  </div>
);

export const InlineLoader = ({ message }: { message: string }) => (
  <div data-testid="inline-loader">
    <div data-testid="loader-icon">Loading...</div>
    <span>{message}</span>
  </div>
);

// Exporte qualquer coisa extra que os testes possam importar genericamente
export default {
  cn,
  useIsMobile,
  BackToTop,
  Button,
  Alert,
  AlertDescription,
  InlineLoader,
};
