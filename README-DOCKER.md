# ?? Rainer Portfolio Frontend - Docker

## ?? Overview
Frontend Next.js com TypeScript, Tailwind CSS e otimizações de produção rodando em container Docker.

## ?? Quick Start

### Using Docker Compose (Recommended)
`ash
# Start frontend
docker-compose up -d

# Or use the convenience script
./start-docker.sh
`

### Manual Docker Build
`ash
# Build image
docker build -t rainer-frontend .

# Run container
docker run -d --name rainer-frontend \\
  -p 3000:3000 \\
  -e NEXT_PUBLIC_API_URL=http://localhost:4000/api/v1 \\
  rainer-frontend
`

## ?? Service

| Service | Port | Description |
|---------|------|-------------|
| Frontend | 3000 | Next.js Application |

## ?? Environment Variables

`ash
NODE_ENV=production
NEXT_PUBLIC_API_URL=http://localhost:4000/api/v1
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=Rainer Portfolio
NEXT_PUBLIC_APP_VERSION=2.3.0
`

## ?? Commands

`ash
# View logs
docker-compose logs -f

# Stop service
docker-compose down

# Rebuild and restart
docker-compose up -d --build

# Access running container
docker exec -it rainer-frontend sh
`

## ?? Health Checks

`ash
# Check application health
curl http://localhost:3000

# Check health endpoint
curl http://localhost:3000/api/health
`

## ?? Development

`ash
# Run in development mode with hot reload
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up

# Build without cache
docker build --no-cache -t rainer-frontend .

# Inspect image layers
docker history rainer-frontend
`

## ?? Build Optimization

- **Multi-stage build**: Reduz tamanho da imagem final
- **Standalone output**: Apenas arquivos necessários
- **Non-root user**: Melhora segurança
- **Health checks**: Monitoramento automático
- **Alpine Linux**: Imagem base pequena e segura

## ?? Notes

- Imagem otimizada para produção (~150MB)
- Suporte a PWA configurado
- Build automático com TypeScript
- Assets estáticos otimizados
