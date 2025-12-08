/**
 * Avatar Utilities - Simplificado
 *
 * O avatar é retornado pelo backend como URL completa do Cloudinary.
 * Este arquivo contém apenas helpers simples.
 *
 * @fileoverview Helpers de avatar
 * @version 2.0.0
 */

// Cache do cloud_name extraído de URLs do backend
let cachedCloudName: string | null = null;

/**
 * Extrai o cloud_name de uma URL do Cloudinary
 */
export function extractCloudName(url: string | null | undefined): string | null {
  if (!url) return null;
  
  try {
    const match = url.match(/res\.cloudinary\.com\/([^\/]+)/);
    return match?.[1] ?? null;
  } catch {
    return null;
  }
}

/**
 * Salva o cloud_name a partir de uma URL do backend (para cache)
 */
export function setCloudNameFromUrl(url: string): void {
  if (!cachedCloudName && url) {
    const extracted = extractCloudName(url);
    if (extracted) {
      cachedCloudName = extracted;
    }
  }
}

/**
 * Constrói URL do avatar a partir do cognitoSub
 * Só funciona se o cloud_name já foi detectado de uma URL anterior
 */
export function getAvatarUrl(
  cognitoSub: string | null | undefined,
  version?: number | string
): string | null {
  if (!cognitoSub) return null;
  if (!cachedCloudName) return null;

  const baseUrl = `https://res.cloudinary.com/${cachedCloudName}/image/upload/avatars/${cognitoSub}.webp`;

  if (version) {
    return `${baseUrl}?v=${encodeURIComponent(String(version))}`;
  }

  return baseUrl;
}

/**
 * Gera iniciais do nome para fallback de avatar
 *
 * @param name - Nome completo do usuário
 * @param maxChars - Número máximo de caracteres (padrão: 2)
 * @returns Iniciais em maiúsculo
 *
 * @example
 * ```typescript
 * getInitials('Rainer Teixeira'); // => 'RT'
 * getInitials('Admin'); // => 'AD'
 * getInitials(''); // => '??'
 * ```
 */
export function getInitials(name: string | null | undefined, maxChars = 2): string {
  if (!name || !name.trim()) {
    return '??';
  }

  return name
    .trim()
    .split(/\s+/)
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, maxChars);
}

/**
 * Verifica se um avatar existe no Cloudinary
 *
 * Faz uma requisição HEAD para verificar se o avatar existe.
 * Útil para decidir se deve mostrar o avatar ou as iniciais.
 *
 * @param cognitoSub - ID único do usuário no Cognito
 * @returns Promise<boolean> - true se o avatar existe
 */
export async function checkAvatarExists(
  cognitoSub: string | null | undefined
): Promise<boolean> {
  const url = getAvatarUrl(cognitoSub);

  if (!url) {
    return false;
  }

  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
}

/**
 * Hook-ready state para avatar com versioning
 */
export interface AvatarState {
  url: string | null;
  version: number;
  refresh: () => void;
}

/**
 * Cria um estado inicial para avatar
 *
 * @param cognitoSub - ID único do usuário
 * @returns Estado inicial do avatar
 */
export function createAvatarState(cognitoSub: string | null | undefined): AvatarState {
  const version = Date.now();

  return {
    url: getAvatarUrl(cognitoSub, version),
    version,
    refresh: () => {
      // Este método será substituído pelo hook
    },
  };
}
