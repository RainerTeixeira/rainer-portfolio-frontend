const React = require('react');

// Mock simples para lucide-react, retornando um SVG vazado
const createIcon = name =>
  React.forwardRef(function Icon(props, ref) {
    return React.createElement('svg', {
      ...props,
      ref,
      role: 'img',
      'data-icon': name,
      width: props.width || 16,
      height: props.height || 16,
    });
  });

const iconsProxy = new Proxy(
  {},
  {
    get: (_target, prop) => {
      if (prop === '__esModule') return true;
      if (prop === 'default') return iconsProxy;
      // Evita que o módulo seja tratado como Promise/thenable
      if (prop === 'then') return undefined;

      return createIcon(typeof prop === 'string' ? prop : String(prop));
    },
  }
);

module.exports = iconsProxy;
