const React = require('react');

const Link = React.forwardRef(({ href, children, ...props }, ref) => 
  React.createElement('a', { ...props, href, ref, 'data-testid': 'link' }, children)
);

Link.displayName = 'Link';

module.exports = {
  __esModule: true,
  default: Link,
};
