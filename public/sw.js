/**
 * Service Worker - PWA
 *
 * Gerencia cache e funcionalidades offline do aplicativo.
 * Implementa estratégias de cache para diferentes tipos de recursos.
 *
 * @fileoverview Service Worker para PWA
 * @author Rainer Teixeira
 * @version 1.0.0
 * @since 1.0.0
 */

const CACHE_NAME = 'rainer-portfolio-v1';
const RUNTIME_CACHE = 'rainer-runtime-v1';

// Recursos essenciais para cache inicial
const PRECACHE_URLS = [
  '/',
  '/blog',
  '/sobre',
  '/contato',
  '/manifest.json',
  '/logo.png',
];

// Recursos que NÃO devem ser cacheados
const NO_CACHE_PATTERNS = [
  /\/api\//, 
  /\/_next\/data\//, 
  /\.hot-update\./,
  /\/_vercel\/insights\//,
  /\/_vercel\/speed-insights\//,
  /\/feedback\.html/,
  /\/_vercel\/feedback\//,
  /vercel\/insights\/script\.js/,
  /vercel\/speed-insights\/script\.js/
];

/**
 * Event: Install
 *
 * Executado quando o service worker é instalado pela primeira vez.
 * Faz pre-cache dos recursos essenciais.
 */
self.addEventListener('install', event => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(cache => {
        console.log('[SW] Pre-caching recursos essenciais');
        return cache.addAll(PRECACHE_URLS);
      })
      .then(() => {
        // Força ativação imediata
        return self.skipWaiting();
      })
  );
});

/**
 * Event: Activate
 *
 * Executado quando o service worker se torna ativo.
 * Remove caches antigos e assume controle imediato.
 */
self.addEventListener('activate', event => {
  event.waitUntil(
    caches
      .keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            // Remove caches antigos
            if (cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE) {
              console.log('[SW] Removendo cache antigo:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        // Assume controle de todas as páginas imediatamente
        return self.clients.claim();
      })
  );
});

/**
 * Event: Fetch
 *
 * Intercepta todas as requisições de rede.
 * Implementa estratégia de cache apropriada para cada tipo de recurso.
 */
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Ignora requisições que não devem ser cacheadas
  if (NO_CACHE_PATTERNS.some(pattern => pattern.test(url.pathname))) {
    return;
  }

  // Ignora requisições cross-origin, exceto para scripts do Vercel
  const isVercelScript = url.pathname.includes('_vercel/insights/script.js') || 
                        url.pathname.includes('_vercel/speed-insights/script.js');

  if (url.origin !== self.location.origin && !isVercelScript) {
    return;
  }

  // Ignora requisições que não são GET
  if (request.method !== 'GET') {
    return event.respondWith(fetch(request));
  }

  // Estratégia: Network First com Cache Fallback (apenas para GET)
  event.respondWith(
    fetch(request)
      .then(response => {
        // Clone a resposta antes de cachear
        const responseClone = response.clone();

        // Cacheia apenas respostas bem-sucedidas de requisições GET
        if (response.status === 200) {
          caches.open(RUNTIME_CACHE).then(cache => {
            cache.put(request, responseClone).catch(error => {
              console.error('[SW] Erro ao armazenar no cache:', error);
            });
          });
        }

        return response;
      })
      .catch(() => {
        // Se a rede falhar, tenta buscar do cache
        return caches.match(request).then(cachedResponse => {
          if (cachedResponse) {
            console.log('[SW] Servindo do cache:', url.pathname);
            return cachedResponse;
          }

          // Se não tem no cache e é uma página, retorna offline page
          if (request.mode === 'navigate') {
            return caches.match('/');
          }

          // Retorna resposta de erro genérica
          return new Response('Offline - Recurso não disponível', {
            status: 503,
            statusText: 'Service Unavailable',
            headers: new Headers({
              'Content-Type': 'text/plain',
            }),
          });
        });
      })
  );
});

/**
 * Event: Message
 *
 * Recebe mensagens do cliente (página web).
 * Permite controle do service worker pela aplicação.
 */
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }

  if (event.data && event.data.type === 'CLEAR_CACHE') {
    event.waitUntil(
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => caches.delete(cacheName))
        );
      })
    );
  }
});
