/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    domains: [
      "rainersoft.com.br", // Seu domínio principal
      "rainer-portfolio.vercel.app", // Outro domínio relacionado
      "rainer-portfolio-i4pf4a37z-rainerteixeiras-projects.vercel.app", // Outro domínio associado
      'example.com', // O domínio de onde vem a imagem (adicione o domínio que está sendo utilizado)

    ],
  },
  async rewrites() {
    return [
      {
        source: '/Blog',
        destination: '/components/Blog', // Rota interna para a pasta components/Blog
      },
    ];
  },
};
