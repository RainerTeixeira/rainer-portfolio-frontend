/**
 * Validation Schemas
 *
 * Schemas de validação centralizados para formulários.
 * Define regras e mensagens de validação consistentes.
 *
 * Características:
 * - Validações reutilizáveis
 * - Mensagens de erro padronizadas
 * - Type-safe
 * - Regras centralizadas
 *
 * @fileoverview Validation schemas da aplicação
 * @author Rainer Teixeira
 * @version 1.0.0
 */

// ============================================================================
// Constants
// ============================================================================

import {
  ERROR_MESSAGES,
  FORM_CONFIG,
  REGEX_PATTERNS,
} from '@rainer/design-tokens';

// ============================================================================
// Types
// ============================================================================

/**
 * Resultado de validação
 */
interface ValidationResult {
  readonly isValid: boolean;
  readonly errors: string[];
}

/**
 * Schema de validação de campo (reservado para uso futuro)
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface FieldSchema {
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
 */
export function validateUsername(username: string): ValidationResult {
  const errors: string[] = [];

  if (!username || username.trim() === '') {
    errors.push(ERROR_MESSAGES.REQUIRED_FIELD);
    return { isValid: false, errors };
  }

  if (username.length < FORM_CONFIG.USERNAME_MIN_LENGTH) {
    errors.push(
      `Username deve ter no mínimo ${FORM_CONFIG.USERNAME_MIN_LENGTH} caracteres`
    );
  }

  if (username.length > FORM_CONFIG.USERNAME_MAX_LENGTH) {
    errors.push(
      `Username deve ter no máximo ${FORM_CONFIG.USERNAME_MAX_LENGTH} caracteres`
    );
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Valida telefone brasileiro
 *
 * @param phone - Telefone a validar
 * @returns Resultado da validação
 */
export function validatePhone(phone: string): ValidationResult {
  const errors: string[] = [];

  if (!phone || phone.trim() === '') {
    errors.push(ERROR_MESSAGES.REQUIRED_FIELD);
    return { isValid: false, errors };
  }

  if (!REGEX_PATTERNS.PHONE_BR.test(phone)) {
    errors.push('Telefone inválido. Use formato: (XX) XXXXX-XXXX');
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
 */
export function validateMessage(message: string): ValidationResult {
  const errors: string[] = [];

  if (!message || message.trim() === '') {
    errors.push(ERROR_MESSAGES.REQUIRED_FIELD);
    return { isValid: false, errors };
  }

  if (message.length < FORM_CONFIG.MESSAGE_MIN_LENGTH) {
    errors.push(
      `Mensagem deve ter no mínimo ${FORM_CONFIG.MESSAGE_MIN_LENGTH} caracteres`
    );
  }

  if (message.length > FORM_CONFIG.MESSAGE_MAX_LENGTH) {
    errors.push(
      `Mensagem deve ter no máximo ${FORM_CONFIG.MESSAGE_MAX_LENGTH} caracteres`
    );
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
 */
export function validateUrl(url: string): ValidationResult {
  const errors: string[] = [];

  if (!url || url.trim() === '') {
    errors.push(ERROR_MESSAGES.REQUIRED_FIELD);
    return { isValid: false, errors };
  }

  if (!REGEX_PATTERNS.URL.test(url)) {
    errors.push('URL inválida. Deve começar com http:// ou https://');
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
 */
export function validateSlug(slug: string): ValidationResult {
  const errors: string[] = [];

  if (!slug || slug.trim() === '') {
    errors.push(ERROR_MESSAGES.REQUIRED_FIELD);
    return { isValid: false, errors };
  }

  if (!REGEX_PATTERNS.SLUG.test(slug)) {
    errors.push(
      'Slug inválido. Use apenas letras minúsculas, números e hífens'
    );
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

// ============================================================================
// Form Schemas
// ============================================================================

/**
 * Schema de validação para formulário de login
 */
export const loginFormSchema = {
  username: (value: string) => validateUsername(value),
  password: (value: string) => validatePassword(value),
};

/**
 * Schema de validação para formulário de contato
 */
export const contactFormSchema = {
  fullName: (value: string) => validateUsername(value),
  email: (value: string) => validateEmail(value),
  phone: (value: string) => validatePhone(value),
  message: (value: string) => validateMessage(value),
};

/**
 * Schema de validação para formulário de post
 */
export const postFormSchema = {
  title: (value: string) => {
    const errors: string[] = [];
    if (!value || value.trim() === '') {
      errors.push(ERROR_MESSAGES.REQUIRED_FIELD);
    }
    if (value.length > 100) {
      errors.push('Título deve ter no máximo 100 caracteres');
    }
    return { isValid: errors.length === 0, errors };
  },
  description: (value: string) => {
    const errors: string[] = [];
    if (!value || value.trim() === '') {
      errors.push(ERROR_MESSAGES.REQUIRED_FIELD);
    }
    if (value.length > 300) {
      errors.push('Descrição deve ter no máximo 300 caracteres');
    }
    return { isValid: errors.length === 0, errors };
  },
  slug: (value: string) => validateSlug(value),
  category: (value: string) => {
    const errors: string[] = [];
    if (value && value.length > 50) {
      errors.push('Categoria deve ter no máximo 50 caracteres');
    }
    return { isValid: errors.length === 0, errors };
  },
};

/**
 * Schema de validação para newsletter
 */
export const newsletterFormSchema = {
  email: (value: string) => validateEmail(value),
};

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Valida objeto completo com schema
 *
 * @param data - Dados a validar
 * @param schema - Schema de validação
 * @returns Resultado consolidado
 *
 * @example
 * ```tsx
 * const result = validateWithSchema(
 *   { email: 'test@example.com', password: '12345678' },
 *   loginFormSchema
 * )
 *
 * if (!result.isValid) {
 *   console.error(result.errors)
 * }
 * ```
 */
export function validateWithSchema<T extends Record<string, unknown>>(
  data: T,
  schema: Record<keyof T, (value: string) => ValidationResult>
): ValidationResult {
  const allErrors: string[] = [];

  for (const key in schema) {
    const validator = schema[key];
    const value = String(data[key] ?? '');
    const result = validator(value);

    if (!result.isValid) {
      allErrors.push(...result.errors.map(err => `${String(key)}: ${err}`));
    }
  }

  return {
    isValid: allErrors.length === 0,
    errors: allErrors,
  };
}
