# 🚀 07-DEPLOY - Deploy e Produção

## 📋 Índice da Seção

- [Visão Geral de Deploy](#-visão-geral-de-deploy)
- [Ambientes de Deploy](#-ambientes-de-deploy)
- [Build de Produção](#-build-de-produção)
- [Deploy em Vercel](#-deploy-em-vercel)
- [Deploy em AWS](#-deploy-em-aws)
- [CI/CD Pipeline](#cicd-pipeline)
- [Monitoramento e Logs](#-monitoramento-e-logs)
- [Troubleshooting](#-troubleshooting)

---

## 🎯 Visão Geral de Deploy

### Estratégia de Deploy

O projeto utiliza uma estratégia de **deploy multi-ambiente** com CI/CD automatizado:

```
🚀 DEPLOY STRATEGY
├─ 🏠 Development     (Local - localhost:3000)
├─ 🧪 Staging         (Vercel Preview)
├─ 🚀 Production      (Vercel Production)
└─ 📊 Analytics        (Google Analytics + Sentry)
```

### Características do Deploy

- **Zero Downtime**: Deploy com rolling updates
- **Performance First**: Build otimizado para produção
- **Security Headers**: Headers de segurança configurados
- **CDN Global**: Distribuição via Vercel Edge Network
- **Auto SSL**: Certificado SSL automático
- **Rollback**: Rollback automático em caso de falha

---

## 🌍 Ambientes de Deploy

### Environment Configuration

```typescript
// .env.local.example
# Aplicação
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3001

# AWS Cognito (OAuth)
NEXT_PUBLIC_COGNITO_USER_POOL_ID=your_user_pool_id
NEXT_PUBLIC_COGNITO_CLIENT_ID=your_client_id
COGNITO_CLIENT_SECRET=your_client_secret

# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_SENTRY_DSN=https://xxxxxx.ingest.sentry.io/xxxxxx

# Build Configuration
NEXT_PUBLIC_BUILD_ID=development
ANALYZE_BUNDLE=false

# .env.production
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://rainersoft.com.br
NEXT_PUBLIC_API_URL=https://api.rainersoft.com.br

# Production Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_SENTRY_DSN=https://xxxxxx.ingest.sentry.io/xxxxxx

# Build Configuration
NEXT_PUBLIC_BUILD_ID=production
ANALYZE_BUNDLE=true
```

### Environment Variables Type Safety

```typescript
// lib/config/env.ts
interface EnvVariables {
  NODE_ENV: 'development' | 'production' | 'test';
  NEXT_PUBLIC_APP_URL: string;
  NEXT_PUBLIC_API_URL: string;
  NEXT_PUBLIC_GA_ID?: string;
  NEXT_PUBLIC_SENTRY_DSN?: string;
  NEXT_PUBLIC_COGNITO_USER_POOL_ID?: string;
  NEXT_PUBLIC_COGNITO_CLIENT_ID?: string;
  COGNITO_CLIENT_SECRET?: string;
}

export const env: EnvVariables = {
  NODE_ENV: process.env.NODE_ENV as 'development' | 'production' | 'test',
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL!,
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL!,
  NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID,
  NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
  NEXT_PUBLIC_COGNITO_USER_POOL_ID: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID,
  NEXT_PUBLIC_COGNITO_CLIENT_ID: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID,
  COGNITO_CLIENT_SECRET: process.env.COGNITO_CLIENT_SECRET,
};

// Runtime validation
export function validateEnv(): boolean {
  const required = [
    'NEXT_PUBLIC_APP_URL',
    'NEXT_PUBLIC_API_URL',
  ];

  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    console.error('Missing environment variables:', missing);
    return false;
  }

  return true;
}
```

---

## 🏗️ Build de Produção

### Build Configuration

```typescript
// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Production optimizations
  output: 'standalone',
  swcMinify: true,
  
  // Experimental features
  experimental: {
    optimizePackageImports: [
      '@rainersoft/ui',
      '@rainersoft/utils',
      '@rainersoft/design-tokens',
      'framer-motion',
      'lucide-react'
    ],
    typedRoutes: true,
    scrollRestoration: true,
  },
  
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https: blob:",
              "font-src 'self' data:",
              "connect-src 'self' https://api.rainersoft.com.br https://www.google-analytics.com",
              "frame-src 'self' https://www.youtube.com",
            ].join('; '),
          },
        ],
      },
    ];
  },
  
  // Image optimization
  images: {
    domains: ['rainersoft.com.br', 'api.rainersoft.com.br'],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // Bundle analysis
  webpack: (config, { dev, isServer }) => {
    // Bundle analyzer in production
    if (!dev && !isServer) {
      config.plugins.push(
        new (require('webpack-bundle-analyzer').BundleAnalyzerPlugin)({
          analyzerMode: 'static',
          openAnalyzer: false,
        })
      );
    }
    
    return config;
  },
};

export default nextConfig;
```

### Build Scripts

```json
{
  "scripts": {
    "build": "pnpm run clean && next build --webpack",
    "build:analyze": "ANALYZE_BUNDLE=true pnpm run build",
    "build:production": "NODE_ENV=production pnpm run build",
    "build:staging": "NODE_ENV=staging pnpm run build",
    "clean": "rimraf .next out dist coverage .turbo node_modules/.cache",
    "prebuild": "node scripts/prepare-workspace.js",
    "postbuild": "node scripts/postbuild.js"
  }
}

// scripts/postbuild.js
const fs = require('fs');
const path = require('path');

// Generate sitemap
async function generateSitemap() {
  const sitemap = await generateSitemap();
  fs.writeFileSync('public/sitemap.xml', sitemap);
}

// Generate robots.txt
function generateRobots() {
  const robots = `User-agent: *
Allow: /
Sitemap: https://rainersoft.com.br/sitemap.xml
`;
  fs.writeFileSync('public/robots.txt', robots);
}

// Build optimization reports
function generateBuildReport() {
  const buildInfo = {
    buildTime: new Date().toISOString(),
    buildId: process.env.NEXT_PUBLIC_BUILD_ID,
    nodeVersion: process.version,
    nextVersion: require('next/package.json').version,
  };
  
  fs.writeFileSync('build-info.json', JSON.stringify(buildInfo, null, 2));
}

async function main() {
  console.log('🔧 Running post-build tasks...');
  
  await generateSitemap();
  generateRobots();
  generateBuildReport();
  
  console.log('✅ Post-build tasks completed');
}

main().catch(console.error);
```

---

## ☁️ Deploy em Vercel

### Vercel Configuration

```json
// vercel.json
{
  "version": 2,
  "name": "rainer-portfolio",
  "buildCommand": "pnpm run build",
  "outputDirectory": ".next",
  "installCommand": "pnpm install",
  "framework": "nextjs",
  "regions": ["iad1"],
  "functions": {
    "app/**/*.ts": {
      "maxDuration": 30
    }
  },
  "env": {
    "NEXT_PUBLIC_APP_URL": "@app-url",
    "NEXT_PUBLIC_API_URL": "@api-url",
    "NEXT_PUBLIC_GA_ID": "@ga-id"
  },
  "build": {
    "env": {
      "NEXT_PUBLIC_BUILD_ID": "$VERCEL_GIT_COMMIT_SHA"
    }
  },
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        }
      ]
    }
  ],
  "redirects": [
    {
      "source": "/github",
      "destination": "https://github.com/rainersoft",
      "permanent": true
    },
    {
      "source": "/linkedin",
      "destination": "https://linkedin.com/in/rainer-teixeira",
      "permanent": true
    }
  ]
}
```

### Deploy Commands

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod

# Deploy to preview
vercel

# Deploy specific environment
vercel --env NODE_ENV=production

# Pull environment variables
vercel env pull .env.production

# List deployments
vercel ls

# Inspect deployment
vercel inspect [deployment-url]
```

### Environment Variables in Vercel

```bash
# Set environment variables
vercel env add NEXT_PUBLIC_APP_URL production
vercel env add NEXT_PUBLIC_API_URL production
vercel env add NEXT_PUBLIC_GA_ID production
vercel env add COGNITO_CLIENT_SECRET production

# List environment variables
vercel env ls

# Pull environment variables to local
vercel env pull .env.local
```

---

## 🅰️ Deploy em AWS

### AWS Infrastructure

```yaml
# infrastructure/aws/cloudformation.yaml
AWSTemplateFormatVersion: '2010-09-09'
Description: 'Rainer Portfolio Infrastructure'

Parameters:
  DomainName:
    Type: String
    Default: 'rainersoft.com.br'
  
  Environment:
    Type: String
    Default: 'production'
    AllowedValues: ['development', 'staging', 'production']

Resources:
  # S3 Bucket for static assets
  StaticAssetsBucket:
    Type: AWS::S3::Bucket
    Properties:
      BucketName: !Sub '${DomainName}-assets-${Environment}'
      PublicAccessBlockConfiguration:
        BlockPublicAcls: true
        BlockPublicPolicy: true
        IgnorePublicAcls: true
        RestrictPublicBuckets: true
      VersioningConfiguration:
        Status: Enabled

  # CloudFront Distribution
  CloudFrontDistribution:
    Type: AWS::CloudFront::Distribution
    Properties:
      DistributionConfig:
        Origins:
          - Id: S3Origin
            DomainName: !GetAtt StaticAssetsBucket.DomainName
            S3OriginConfig:
              OriginAccessIdentity: !Sub 'origin-access-identity/cloudfront/${CloudFrontOAI}'
        
        DefaultCacheBehavior:
          TargetOriginId: S3Origin
          ViewerProtocolPolicy: 'redirect-to-https'
          CachePolicyId: '4135ea2d-6df8-44a3-9df3-4b5a84be39ad'
        
        Enabled: true
        HttpVersion: 'http2'
        PriceClass: 'PriceClass_100'
        
        DefaultRootObject: 'index.html'
        
        CustomErrorResponses:
          - ErrorCode: 404
            ResponseCode: 200
            ResponsePagePath: '/index.html'
          - ErrorCode: 403
            ResponseCode: 200
            ResponsePagePath: '/index.html'

  # CloudFront Origin Access Identity
  CloudFrontOAI:
    Type: AWS::CloudFront::OriginAccessIdentity
    Properties:
      OriginAccessIdentityConfig:
        Comment: !Sub 'OAI for ${DomainName}'

  # Route 53 DNS
  HostedZone:
    Type: AWS::Route53::HostedZone
    Properties:
      Name: !Ref DomainName

  DNSRecord:
    Type: AWS::Route53::RecordSet
    Properties:
      HostedZoneId: !Ref HostedZone
      Name: !Ref DomainName
      Type: A
      AliasTarget:
        DNSName: !GetAtt CloudFrontDistribution.DomainName
        HostedZoneId: Z2FDTNDATAQYW2

Outputs:
  CloudFrontDomainName:
    Description: 'CloudFront distribution domain name'
    Value: !GetAtt CloudFrontDistribution.DomainName
    Export:
      Name: !Sub '${AWS::StackName}-CloudFrontDomainName'
```

### Deploy Script for AWS

```bash
#!/bin/bash
# scripts/deploy-aws.sh

set -e

# Configuration
DOMAIN="rainersoft.com.br"
ENVIRONMENT="production"
BUILD_DIR=".next"
S3_BUCKET="${DOMAIN}-assets-${ENVIRONMENT}"

echo "🚀 Starting AWS deployment..."

# Build the application
echo "📦 Building application..."
pnpm run build

# Upload to S3
echo "📤 Uploading to S3..."
aws s3 sync ${BUILD_DIR}/static s3://${S3_BUCKET}/static --delete
aws s3 sync public/ s3://${S3_BUCKET} --delete

# Invalidate CloudFront cache
echo "🔄 Invalidating CloudFront cache..."
DISTRIBUTION_ID=$(aws cloudfront list-distributions --query "DistributionList.Items[?Comment=='${DOMAIN}'].Id" --output text)
aws cloudfront create-invalidation --distribution-id ${DISTRIBUTION_ID} --paths "/*"

echo "✅ Deployment completed successfully!"
echo "🌐 Your site is available at: https://${DOMAIN}"
```

---

## 🔄 CI/CD Pipeline

### GitHub Actions Workflow

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

env:
  NODE_VERSION: '18'
  PNPM_VERSION: '10.24.0'

jobs:
  test:
    name: Test and Build
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
        
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          
      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: ${{ env.PNPM_VERSION }}
          
      - name: Get pnpm store directory
        shell: bash
        run: |
          echo "STORE_PATH=$(pnpm store path --silent)" >> $GITHUB_ENV
          
      - name: Setup pnpm cache
        uses: actions/cache@v3
        with:
          path: ${{ env.STORE_PATH }}
          key: ${{ runner.os }}-pnpm-store-${{ hashFiles('**/pnpm-lock.yaml') }}
          restore-keys: |
            ${{ runner.os }}-pnpm-store-
            
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
        
      - name: Run type check
        run: pnpm run type-check
        
      - name: Run linting
        run: pnpm run lint
        
      - name: Run tests
        run: pnpm run test:coverage
        
      - name: Upload coverage to Codecov
        uses: codecov/codecov-action@v3
        with:
          file: ./coverage/lcov.info
          
      - name: Build application
        run: pnpm run build
        
      - name: Upload build artifacts
        uses: actions/upload-artifact@v3
        with:
          name: build-files
          path: |
            .next/
            public/
            
  deploy-preview:
    name: Deploy Preview
    needs: test
    runs-on: ubuntu-latest
    if: github.event_name == 'pull_request'
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
        
      - name: Download build artifacts
        uses: actions/download-artifact@v3
        with:
          name: build-files
          
      - name: Install Vercel CLI
        run: npm install --global vercel@latest
        
      - name: Pull Vercel environment
        run: vercel pull --yes --environment=preview --token=${{ secrets.VERCEL_TOKEN }}
        
      - name: Build artifacts
        run: vercel build --token=${{ secrets.VERCEL_TOKEN }}
        
      - name: Deploy to Vercel
        run: vercel deploy --prebuilt --token=${{ secrets.VERCEL_TOKEN }}
        
  deploy-production:
    name: Deploy to Production
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
        
      - name: Download build artifacts
        uses: actions/download-artifact@v3
        with:
          name: build-files
          
      - name: Install Vercel CLI
        run: npm install --global vercel@latest
        
      - name: Pull Vercel environment
        run: vercel pull --yes --environment=production --token=${{ secrets.VERCEL_TOKEN }}
        
      - name: Build artifacts
        run: vercel build --prod --token=${{ secrets.VERCEL_TOKEN }}
        
      - name: Deploy to Vercel
        run: vercel deploy --prebuilt --prod --token=${{ secrets.VERCEL_TOKEN }}
        
      - name: Post deployment checks
        run: |
          # Wait for deployment to be ready
          sleep 30
          
          # Health check
          curl -f https://rainersoft.com.br/api/health || exit 1
          
          # Performance check
          curl -f https://rainersoft.com.br/api/performance || exit 1
          
      - name: Notify deployment success
        if: success()
        run: |
          curl -X POST "${{ secrets.SLACK_WEBHOOK }}" \
            -H 'Content-type: application/json' \
            --data '{"text":"✅ Production deployment successful! 🚀"}'
```

### Environment-Specific Configurations

```yaml
# .github/workflows/deploy-staging.yml
name: Deploy to Staging

on:
  push:
    branches: [staging]

jobs:
  deploy-staging:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        
      - name: Setup Node.js and pnpm
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          
      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: '10.24.0'
          
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
        
      - name: Run tests
        run: pnpm run test
        
      - name: Build for staging
        run: NODE_ENV=staging pnpm run build
        
      - name: Deploy to staging
        run: |
          # Deploy to staging environment
          vercel deploy --prebuilt --token=${{ secrets.VERCEL_TOKEN }}
```

---

## 📊 Monitoramento e Logs

### Application Monitoring

```typescript
// lib/monitoring/sentry.ts
import * as Sentry from '@sentry/nextjs';

export function initSentry() {
  if (process.env.NODE_ENV === 'production') {
    Sentry.init({
      dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
      environment: process.env.NODE_ENV,
      tracesSampleRate: 0.1,
      beforeSend(event) {
        // Filter out sensitive data
        if (event.exception) {
          const error = event.exception.values?.[0];
          if (error?.value?.includes('password')) {
            return null;
          }
        }
        return event;
      },
    });
  }
}

// lib/monitoring/health-check.ts
export class HealthCheck {
  static async checkApplicationHealth(): Promise<HealthStatus> {
    const checks = await Promise.allSettled([
      this.checkDatabase(),
      this.checkExternalAPIs(),
      this.checkPerformance(),
      this.checkDiskSpace(),
    ]);

    const results = checks.map((check, index) => ({
      name: ['database', 'external_apis', 'performance', 'disk_space'][index],
      status: check.status === 'fulfilled' ? 'healthy' : 'unhealthy',
      message: check.status === 'fulfilled' ? 'OK' : check.reason?.message,
    }));

    const isHealthy = results.every(r => r.status === 'healthy');

    return {
      status: isHealthy ? 'healthy' : 'unhealthy',
      timestamp: new Date().toISOString(),
      checks: results,
    };
  }

  private static async checkDatabase(): Promise<void> {
    // Check database connectivity
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/health/db`);
    if (!response.ok) {
      throw new Error('Database connection failed');
    }
  }

  private static async checkExternalAPIs(): Promise<void> {
    // Check external API connectivity
    const apis = [
      'https://api.github.com/users/rainersoft',
      'https://www.googleapis.com/webfonts/v1/webfonts',
    ];

    await Promise.all(apis.map(async (api) => {
      const response = await fetch(api);
      if (!response.ok) {
        throw new Error(`API ${api} is not responding`);
      }
    }));
  }

  private static async checkPerformance(): Promise<void> {
    // Check performance metrics
    const metrics = await this.getPerformanceMetrics();
    
    if (metrics.lcp > 2500) {
      throw new Error('LCP is too slow');
    }
    
    if (metrics.fid > 100) {
      throw new Error('FID is too slow');
    }
  }

  private static async getPerformanceMetrics() {
    // Get performance metrics from monitoring service
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/analytics/performance`);
    return response.json();
  }
}

// app/api/health/route.ts
export async function GET() {
  try {
    const health = await HealthCheck.checkApplicationHealth();
    
    return Response.json(health, {
      status: health.status === 'healthy' ? 200 : 503,
    });
  } catch (error) {
    return Response.json({
      status: 'unhealthy',
      error: error.message,
      timestamp: new Date().toISOString(),
    }, { status: 503 });
  }
}
```

### Log Management

```typescript
// lib/monitoring/logger.ts
export enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
}

export interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  context?: Record<string, any>;
  userId?: string;
  sessionId?: string;
  requestId?: string;
}

export class Logger {
  private static instance: Logger;
  private logs: LogEntry[] = [];

  static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  debug(message: string, context?: Record<string, any>) {
    this.log(LogLevel.DEBUG, message, context);
  }

  info(message: string, context?: Record<string, any>) {
    this.log(LogLevel.INFO, message, context);
  }

  warn(message: string, context?: Record<string, any>) {
    this.log(LogLevel.WARN, message, context);
  }

  error(message: string, context?: Record<string, any>) {
    this.log(LogLevel.ERROR, message, context);
    
    // Send to Sentry for errors
    if (process.env.NODE_ENV === 'production') {
      Sentry.captureException(new Error(message), {
        contexts: { custom: context },
      });
    }
  }

  private log(level: LogLevel, message: string, context?: Record<string, any>) {
    const logEntry: LogEntry = {
      level,
      message,
      timestamp: new Date().toISOString(),
      context,
      userId: this.getCurrentUserId(),
      sessionId: this.getSessionId(),
      requestId: this.getRequestId(),
    };

    this.logs.push(logEntry);

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`[${level.toUpperCase()}] ${message}`, context);
    }

    // Send to logging service in production
    if (process.env.NODE_ENV === 'production') {
      this.sendToLoggingService(logEntry);
    }
  }

  private async sendToLoggingService(logEntry: LogEntry) {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/logs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(logEntry),
      });
    } catch (error) {
      console.error('Failed to send log to service:', error);
    }
  }

  private getCurrentUserId(): string | undefined {
    // Get current user ID from auth context
    return undefined; // Implementation depends on auth setup
  }

  private getSessionId(): string {
    // Get or generate session ID
    if (typeof window !== 'undefined') {
      let sessionId = sessionStorage.getItem('session_id');
      if (!sessionId) {
        sessionId = crypto.randomUUID();
        sessionStorage.setItem('session_id', sessionId);
      }
      return sessionId;
    }
    return crypto.randomUUID();
  }

  private getRequestId(): string {
    // Get or generate request ID
    return crypto.randomUUID();
  }
}

export const logger = Logger.getInstance();
```

---

## 🔧 Troubleshooting

### Common Deploy Issues

#### Build Failures

```bash
# Issue: TypeScript errors
# Solution: Run type check locally
pnpm run type-check

# Issue: Memory issues during build
# Solution: Increase Node.js memory
NODE_OPTIONS="--max-old-space-size=4096" pnpm run build

# Issue: Dependency conflicts
# Solution: Clean install
pnpm run clean:all
pnpm install
```

#### Runtime Errors

```bash
# Issue: Environment variables missing
# Solution: Check environment
vercel env ls
pnpm run env:check

# Issue: API connectivity
# Solution: Test API endpoints
curl https://api.rainersoft.com.br/health

# Issue: Authentication failures
# Solution: Verify OAuth configuration
pnpm run verify:oauth
```

#### Performance Issues

```bash
# Issue: Slow page loads
# Solution: Run Lighthouse audit
npx lighthouse https://rainersoft.com.br --output=json

# Issue: Large bundle size
# Solution: Analyze bundle
pnpm run build:analyze

# Issue: Memory leaks
# Solution: Check memory usage
npx clinic doctor -- node server.js
```

### Debug Scripts

```bash
#!/bin/bash
# scripts/debug-deploy.sh

echo "🔍 Debugging deployment..."

# Check environment variables
echo "📋 Checking environment variables..."
printenv | grep NEXT_PUBLIC

# Check build output
echo "📦 Checking build output..."
ls -la .next/

# Check bundle size
echo "📊 Analyzing bundle size..."
du -sh .next/

# Check for common issues
echo "🔎 Checking for common issues..."

# TypeScript errors
if pnpm run type-check 2>&1 | grep -q "error"; then
  echo "❌ TypeScript errors found"
  pnpm run type-check
fi

# ESLint errors
if pnpm run lint 2>&1 | grep -q "error"; then
  echo "❌ ESLint errors found"
  pnpm run lint
fi

# Test failures
if ! pnpm test; then
  echo "❌ Test failures found"
fi

echo "✅ Debug completed"
```

### Rollback Procedures

```bash
# Rollback to previous deployment
vercel rollback [deployment-url]

# Rollback to specific commit
git checkout [commit-hash]
vercel --prod

# Emergency rollback (disable site)
vercel projects rm rainer-portfolio
# Recreate with previous working version
```

---

## 🎯 Próximos Passos

1. **Testes**: Configure [08-TESTES](../08-TESTES/)
2. **Contribuição**: Explore [09-CONTRIBUICAO](../09-CONTRIBUICAO/)

---

## 📚 Referências

- [Vercel Documentation](https://vercel.com/docs)
- [AWS Deployment Guide](https://docs.aws.amazon.com/)
- [GitHub Actions](https://docs.github.com/en/actions)
- [Sentry Error Monitoring](https://docs.sentry.io/)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
