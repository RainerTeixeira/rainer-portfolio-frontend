/**
 * Teste de depuração para identificar o componente undefined no CTASection
 */

const React = require('react');

// Mockar todos os imports do CTASection para testar individualmente
const mockImports = {
  '@rainersoft/ui': {
    Button: React.forwardRef(({ children, ...props }, ref) => 
      React.createElement('button', { ...props, ref, 'data-testid': 'button' }, children)
    )
  },
  '@rainersoft/design-tokens': {
    tokens: {
      primitives: {
        color: { cyan: { '400': '#22d3ee', '500': '#06b6d4' }, pink: { '400': '#f472b6', '500': '#ec4899' } },
        spacing: { '20': '5rem', '32': '8rem', '12': '3rem', '8': '2rem', '6': '1.5rem' },
        typography: { fontSize: { '6xl': '3.75rem' }, lineHeight: { relaxed: '1.625' } }
      }
    }
  },
  'framer-motion': {
    motion: {
      section: React.forwardRef(({ children, ...props }, ref) => 
        React.createElement('section', { ...props, ref, 'data-motion': 'section' }, children)
      ),
      div: React.forwardRef(({ children, ...props }, ref) => 
        React.createElement('div', { ...props, ref, 'data-motion': 'div' }, children)
      ),
      button: React.forwardRef(({ children, ...props }, ref) => 
        React.createElement('button', { ...props, ref, 'data-motion': 'button' }, children)
      ),
      span: React.forwardRef(({ children, ...props }, ref) => 
        React.createElement('span', { ...props, ref, 'data-motion': 'span' }, children)
      ),
      h2: React.forwardRef(({ children, ...props }, ref) => 
        React.createElement('h2', { ...props, ref, 'data-motion': 'h2' }, children)
      ),
      p: React.forwardRef(({ children, ...props }, ref) => 
        React.createElement('p', { ...props, ref, 'data-motion': 'p' }, children)
      )
    },
    AnimatePresence: ({ children }) => children
  },
  'lucide-react': {
    ArrowRight: () => React.createElement('svg', { 'data-icon': 'ArrowRight' }),
    Download: () => React.createElement('svg', { 'data-icon': 'Download' }),
    MessageSquare: () => React.createElement('svg', { 'data-icon': 'MessageSquare' }),
    Rocket: () => React.createElement('svg', { 'data-icon': 'Rocket' }),
    Sparkles: () => React.createElement('svg', { 'data-icon': 'Sparkles' }),
    Zap: () => React.createElement('svg', { 'data-icon': 'Zap' })
  },
  'next-themes': {
    useTheme: () => ({ resolvedTheme: 'light', theme: 'light' })
  },
  'next/link': {
    default: React.forwardRef(({ children, ...props }, ref) => 
      React.createElement('a', { ...props, ref, 'data-testid': 'link' }, children)
    )
  }
};

console.log('Todos os mocks criados:', Object.keys(mockImports));

// Testar cada mock individualmente
Object.entries(mockImports).forEach(([module, mocks]) => {
  Object.entries(mocks).forEach(([exportName, mock]) => {
    if (typeof mock === 'function' && mock !== null) {
      console.log(`✅ ${module}.${exportName} é uma função válida`);
    } else {
      console.log(`❌ ${module}.${exportName} é inválido:`, typeof mock);
    }
  });
});

module.exports = mockImports;
