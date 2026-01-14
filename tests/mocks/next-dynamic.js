const React = require('react');

function dynamic(loader, _opts) {
  const Component = React.forwardRef((props, ref) => {
    const Loaded = loader()?.default || (() => null);
    return React.createElement(Loaded, { ...props, ref });
  });
  Component.displayName = 'DynamicMock';
  return Component;
}

module.exports = dynamic;
module.exports.default = dynamic;
