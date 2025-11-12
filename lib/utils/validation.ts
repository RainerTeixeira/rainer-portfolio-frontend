/**
 * Validation Utils
 *
 * Schemas de validação centralizados para formulários.
 * Define regras e mensagens de validação consistentes.
 *
 * @fileoverview Validation schemas da aplicação
 * @author Rainer Teixeira
 * @version 1.0.0
 */

import {
  ERROR_MESSAGES as DESIGN_TOKENS_ERROR_MESSAGES,
  REGEX_PATTERNS as DESIGN_TOKENS_REGEX_PATTERNS,
  FORM_CONFIG,
} from '@rainer/design-tokens';

// ============================================================================
// Fallback para propriedades faltantes na biblioteca de design tokens
// ============================================================================

const REGEX_PATTERNS = {
  ...DESIGN_TOKENS_REGEX_PATTERNS,
  USERNAME: /^[a-zA-Z0-9_]{3,20}$/,
  PHONE: DESIGN_TOKENS_REGEX_PATTERNS.PHONE_BR,
} as typeof DESIGN_TOKENS_REGEX_PATTERNS & {
  readonly USERNAME: RegExp;
  readonly PHONE: RegExp;
};

const ERROR_MESSAGES = {
  ...DESIGN_TOKENS_ERROR_MESSAGES,
  INVALID_USERNAME: 'Nome de usuário inválido',
  INVALID_PHONE: 'Telefone inválido',
  MESSAGE_TOO_SHORT: 'Mensagem muito curta',
  MESSAGE_TOO_LONG: 'Mensagem muito longa',
  INVALID_URL: 'URL inválida',
  INVALID_SLUG: 'Slug inválido',
} as typeof DESIGN_TOKENS_ERROR_MESSAGES & {
  readonly INVALID_USERNAME: string;
  readonly INVALID_PHONE: string;
  readonly MESSAGE_TOO_SHORT: string;
  readonly MESSAGE_TOO_LONG: string;
  readonly INVALID_URL: string;
  readonly INVALID_SLUG: string;
};

// ============================================================================
// Types
// ============================================================================

/**
 * Resultado de validação
 */
export interface ValidationResult {
  readonly isValid: boolean;
  readonly errors: string[];
}

/**
 * Schema de validação de campo (reservado para uso futuro)
 */
export interface FieldSchema {
  readonly required?: boolean;
  readonly minLength?: number;
  readonly maxLength?: number;
  readonly pattern?: RegExp;
  readonly custom?: (value: string) => boolean;
  readonly errorMessage?: string;
}

// ============================================================================
// Validation Functions
// ============================================================================

/**
 * Valida email
 *
 * @param email - Email a validar
 * @returns Resultado da validação
 *
 * @example
 * ```ts
 * const result = validateEmail('user@example.com')
 * if (!result.isValid) {
 *   console.error(result.errors)
 * }
 * ```
 */
export function validateEmail(email: string): ValidationResult {
  const errors: string[] = [];

  if (!email || email.trim() === '') {
    errors.push(ERROR_MESSAGES.REQUIRED_FIELD);
    return { isValid: false, errors };
  }

  if (!REGEX_PATTERNS.EMAIL.test(email)) {
    errors.push(ERROR_MESSAGES.INVALID_EMAIL);
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Valida senha
 *
 * @param password - Senha a validar
 * @returns Resultado da validação
 *
 * @example
 * ```ts
 * const result = validatePassword('senha123')
 * if (!result.isValid) {
 *   console.error(result.errors)
 * }
 * ```
 */
export function validatePassword(password: string): ValidationResult {
  const errors: string[] = [];

  if (!password || password.trim() === '') {
    errors.push(ERROR_MESSAGES.REQUIRED_FIELD);
    return { isValid: false, errors };
  }

  if (password.length < FORM_CONFIG.PASSWORD_MIN_LENGTH) {
    errors.push(ERROR_MESSAGES.INVALID_PASSWORD);
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Valida username
 *
 * @param username - Username a validar
 * @returns Resultado da validação
 *
 * @example
 * ```ts
 * const result = validateUsername('john_doe')
 * if (!result.isValid) {
 *   console.error(result.errors)
 * }
 * ```
 */
export function validateUsername(username: string): ValidationResult {
  const errors: string[] = [];

  if (!username || username.trim() === '') {
    errors.push(ERROR_MESSAGES.REQUIRED_FIELD);
    return { isValid: false, errors };
  }

  if (!REGEX_PATTERNS.USERNAME.test(username)) {
    errors.push(ERROR_MESSAGES.INVALID_USERNAME);
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Valida telefone
 *
 * @param phone - Telefone a validar
 * @returns Resultado da validação
 *
 * @example
 * ```ts
 * const result = validatePhone('(11) 98765-4321')
 * if (!result.isValid) {
 *   console.error(result.errors)
 * }
 * ```
 */
export function validatePhone(phone: string): ValidationResult {
  const errors: string[] = [];

  if (!phone || phone.trim() === '') {
    errors.push(ERROR_MESSAGES.REQUIRED_FIELD);
    return { isValid: false, errors };
  }

  if (!REGEX_PATTERNS.PHONE.test(phone)) {
    errors.push(ERROR_MESSAGES.INVALID_PHONE);
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Valida mensagem
 *
 * @param message - Mensagem a validar
 * @returns Resultado da validação
 *
 * @example
 * ```ts
 * const result = validateMessage('Olá, esta é uma mensagem.')
 * if (!result.isValid) {
 *   console.error(result.errors)
 * }
 * ```
 */
export function validateMessage(message: string): ValidationResult {
  const errors: string[] = [];

  if (!message || message.trim() === '') {
    errors.push(ERROR_MESSAGES.REQUIRED_FIELD);
    return { isValid: false, errors };
  }

  if (message.length < FORM_CONFIG.MESSAGE_MIN_LENGTH) {
    errors.push(ERROR_MESSAGES.MESSAGE_TOO_SHORT);
  }

  if (message.length > FORM_CONFIG.MESSAGE_MAX_LENGTH) {
    errors.push(ERROR_MESSAGES.MESSAGE_TOO_LONG);
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Valida URL
 *
 * @param url - URL a validar
 * @returns Resultado da validação
 *
 * @example
 * ```ts
 * const result = validateUrl('https://example.com')
 * if (!result.isValid) {
 *   console.error(result.errors)
 * }
 * ```
 */
export function validateUrl(url: string): ValidationResult {
  const errors: string[] = [];

  if (!url || url.trim() === '') {
    errors.push(ERROR_MESSAGES.REQUIRED_FIELD);
    return { isValid: false, errors };
  }

  if (!REGEX_PATTERNS.URL.test(url)) {
    errors.push(ERROR_MESSAGES.INVALID_URL);
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Valida slug
 *
 * @param slug - Slug a validar
 * @returns Resultado da validação
 *
 * @example
 * ```ts
 * const result = validateSlug('my-post-title')
 * if (!result.isValid) {
 *   console.error(result.errors)
 * }
 * ```
 */
export function validateSlug(slug: string): ValidationResult {
  const errors: string[] = [];

  if (!slug || slug.trim() === '') {
    errors.push(ERROR_MESSAGES.REQUIRED_FIELD);
    return { isValid: false, errors };
  }

  if (!REGEX_PATTERNS.SLUG.test(slug)) {
    errors.push(ERROR_MESSAGES.INVALID_SLUG);
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Valida dados com schema customizado
 *
 * @param data - Dados a validar
 * @param schema - Schema de validação
 * @returns Resultado da validação
 *
 * @example
 * ```ts
 * const schema = {
 *   email: validateEmail,
 *   password: validatePassword
 * }
 * const result = validateWithSchema({ email: 'user@example.com', password: '123' }, schema)
 * if (!result.isValid) {
 *   console.error(result.errors)
 * }
 * ```
 */
export function validateWithSchema<T extends Record<string, unknown>>(
  data: T,
  schema: Record<keyof T, (value: string) => ValidationResult>
): ValidationResult {
  const errors: string[] = [];

  for (const [key, validator] of Object.entries(schema)) {
    const value = data[key];
    if (typeof value === 'string') {
      const result = validator(value);
      if (!result.isValid) {
        errors.push(...result.errors);
      }
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}
