const React = require('react');

// Mock para framer-motion
const MOTION_PROPS = new Set([
  'initial',
  'animate',
  'exit',
  'whileHover',
  'whileTap',
  'whileDrag',
  'whileFocus',
  'whileInView',
  'viewport',
  'transition',
  'variants',
  'layout',
  'layoutId',
  'drag',
  'dragConstraints',
  'dragElastic',
  'dragMomentum',
]);

function stripMotionProps(props) {
  if (!props) return props;

  const cleaned = {};
  for (const [key, value] of Object.entries(props)) {
    if (MOTION_PROPS.has(key)) continue;
    cleaned[key] = value;
  }
  return cleaned;
}

const motion = new Proxy(
  {},
  {
    get: (_target, prop) => {
      if (prop === '__esModule') return true;
      if (prop === 'default') return motion;
      // Evita que o módulo seja tratado como Promise/thenable
      if (prop === 'then') return undefined;

      const tag = typeof prop === 'string' ? prop : String(prop);

      return React.forwardRef(({ children, ...props }, ref) =>
        React.createElement(tag, { ...stripMotionProps(props), ref }, children)
      );
    },
  }
);

const AnimatePresence = ({ children }) => children;

module.exports = {
  __esModule: true,
  motion,
  AnimatePresence,
  default: { motion, AnimatePresence },
};
