export const tokens = {
  primitives: {
    gradients: {
      text: {
        primary: 'linear-gradient(135deg, #00e6ff 0%, #7d00ff 100%)',
      },
    },
    shadows: {
      lg: '0 10px 30px rgba(0,0,0,0.15)',
    },
    spacing: {
      '20': '5rem',
      '32': '8rem',
    },
  },
};

export const ESTILOS_HERO = {
  gradiente: tokens.primitives.gradients.text.primary,
  sombra: tokens.primitives.shadows.lg,
  animacao: {
    duracao: 6000,
    delay: 200,
  },
};

export default { tokens, ESTILOS_HERO };
