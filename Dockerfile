# Build multi-estágio para otimização de produção
FROM node:20-alpine AS base

# Instala dependências apenas quando necessário
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Instala dependências usando o gerenciador de pacotes preferido
COPY package.json pnpm-lock.yaml* ./
RUN corepack enable pnpm && pnpm install --frozen-lockfile

# Reconstrói o código fonte apenas quando necessário
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Variáveis de ambiente para build
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Build da aplicação
RUN pnpm run build

# Imagem de produção, copia todos os arquivos e executa next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copia a aplicação buildada
COPY --from=builder /app/public ./public

# Configura permissões corretas para cache de pré-renderização
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Aproveita automaticamente traces de output para reduzir tamanho da imagem
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Health check para verificar se a aplicação está rodando
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000 || exit 1

# server.js é criado pelo next build a partir do output standalone
CMD ["node", "server.js"]