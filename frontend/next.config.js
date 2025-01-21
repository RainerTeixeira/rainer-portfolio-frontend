/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'rainersoft.com.br', // Domínio principal
        port: '',
        pathname: '/hooks-image.jpg', // Caminho completo da imagem
      },
      {
        protocol: 'https',
        hostname: 'rainer-portfolio.vercel.app', // Outro domínio relacionado
        port: '',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: 'rainer-portfolio-i4pf4a37z-rainerteixeiras-projects.vercel.app', // Outro domínio associado
        port: '',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: 'example.com', // Domínio adicional
        port: '',
        pathname: '/images/**',
      },
    ],
  },
};
