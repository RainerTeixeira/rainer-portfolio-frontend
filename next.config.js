// next.config.js
module.exports = {
  async rewrites() {
    return [
      {
        source: '/Blog',
        destination: '/components/Blog', // Rota interna para a pasta components/Blog
      },
    ];
  },
};
