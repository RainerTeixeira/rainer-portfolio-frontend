/**
 * Utilitários avançados para debugging e tratamento de erros
 * @module DebugUtils
 * @description Fornece ferramentas para análise detalhada de erros,
 * validação de dados e integração com a API
 */

import { COLOR_RED } from '@rainer/design-tokens';
import {
  validateEmail,
  validatePassword,
  validateUsername,
} from '../utils/validation';
import { ApiError } from './client';
import { API_CONFIG } from './config';

type ValidationFunction = (value: string) => {
  isValid: boolean;
  errors: string[];
};

interface ValidationRules {
  [key: string]: {
    validate: ValidationFunction;
    errorMessages: {
      [key: string]: string;
    };
  };
}

/**
 * Mapeamento de validações disponíveis
 */
const VALIDATION_RULES: ValidationRules = {
  email: {
    validate: validateEmail,
    errorMessages: {
      required: 'Email é obrigatório',
      invalid: 'Email inválido',
      minLength: 'Email muito curto',
      maxLength: 'Email muito longo',
    },
  },
  password: {
    validate: validatePassword,
    errorMessages: {
      required: 'Senha é obrigatória',
      tooShort: 'A senha deve ter pelo menos 8 caracteres',
      noUppercase: 'A senha deve conter pelo menos uma letra maiúscula',
      noLowercase: 'A senha deve conter pelo menos uma letra minúscula',
      noNumber: 'A senha deve conter pelo menos um número',
      noSpecialChar: 'A senha deve conter pelo menos um caractere especial',
    },
  },
  username: {
    validate: validateUsername,
    errorMessages: {
      required: 'Nome de usuário é obrigatório',
      invalid: 'Nome de usuário contém caracteres inválidos',
      minLength: 'Nome de usuário muito curto',
      maxLength: 'Nome de usuário muito longo',
      taken: 'Este nome de usuário já está em uso',
    },
  },
};

/**
 * Analisa um erro da API e retorna informações detalhadas para debugging
 * @param {unknown} error - Erro a ser analisado
 * @returns {Object} Informações de debugging
 */
export interface ApiErrorAnalysis {
  isApiError: boolean;
  status: number;
  message: string;
  url?: string;
  method?: string;
  endpoint?: string;
  timestamp: string;
  suggestions: string[];
  validationErrors?: Record<string, string[]>;
  isNetworkError: boolean;
  isValidationError: boolean;
  isTimeoutError: boolean;
  isServerError: boolean;
  isClientError: boolean;
}

export function analyzeApiError(error: unknown): ApiErrorAnalysis {
  const result: ApiErrorAnalysis = {
    isApiError: false,
    status: 0,
    message: 'Erro desconhecido',
    url: undefined,
    method: undefined,
    endpoint: undefined,
    timestamp: new Date().toISOString(),
    suggestions: [],
    isNetworkError: false,
    isValidationError: false,
    isTimeoutError: false,
    isServerError: false,
    isClientError: false,
    validationErrors: {},
  };

  // Tratamento de erros de rede
  if (typeof error === 'object' && error !== null) {
    const err = error as Record<string, unknown>;

    // Erro de timeout
    if (err.fullName === 'TimeoutError' || err.code === 'ECONNABORTED') {
      result.isTimeoutError = true;
      result.message = 'A requisição excedeu o tempo limite';
      result.suggestions = [
        'Verifique sua conexão com a internet',
        `O tempo limite da requisição é de ${API_CONFIG.TIMEOUT}ms`,
        'Tente novamente em alguns instantes',
      ];
      return result;
    }

    // Erro de rede
    if (err.isAxiosError && !err.response) {
      result.isNetworkError = true;
      result.message = 'Erro de conexão';
      result.suggestions = [
        'Verifique sua conexão com a internet',
        'Tente novamente em alguns instantes',
        'Se o problema persistir, entre em contato com o suporte',
      ];
      return result;
    }
  }

  // Tratamento de erros da API
  // Verifica se é ApiError de forma segura (compatível com testes)
  if (
    error &&
    typeof error === 'object' &&
    'fullName' in error &&
    error.fullName === 'ApiError' &&
    'status' in error
  ) {
    const apiError = error as ApiError;
    result.isApiError = true;
    result.status = apiError.status;
    result.message = apiError.message;
    result.url = apiError.url;
    result.method = apiError.method;
    result.endpoint = apiError.endpoint;

    // Tratamento de erros de validação (HTTP 400)
    if (apiError.status === 400) {
      result.isValidationError = true;
      result.message = 'Erro de validação';

      // Extrai erros de validação da resposta da API, se disponível
      if (apiError.data && typeof apiError.data === 'object') {
        const data = apiError.data as Record<string, unknown>;
        if (
          data.errors &&
          typeof data.errors === 'object' &&
          data.errors !== null
        ) {
          result.validationErrors = data.errors as Record<string, string[]>;
          result.suggestions = ['Verifique os campos do formulário'];
        }
      }

      return result;
    }

    // Tratamento de erros do servidor (5xx)
    if (
      apiError.isServerError &&
      typeof apiError.isServerError === 'function' &&
      apiError.isServerError()
    ) {
      result.isServerError = true;
      result.suggestions = [
        'O servidor está enfrentando problemas temporários',
        `Tente novamente em ${API_CONFIG.RETRY_DELAY / 1000} segundos`,
        `Número máximo de tentativas: ${API_CONFIG.MAX_RETRIES}`,
        'Verifique o status do serviço',
        'Contate o suporte técnico se o problema persistir',
      ];
    } else if (
      apiError.isClientError &&
      typeof apiError.isClientError === 'function' &&
      apiError.isClientError()
    ) {
      result.suggestions = [
        'Verifique os dados enviados na requisição',
        'Confirme se você tem permissão para esta ação',
        'Valide os parâmetros e headers da requisição',
      ];
    } else {
      result.suggestions = [
        'Verifique sua conexão de internet',
        'Confirme se o servidor está acessível',
        'Tente novamente mais tarde',
      ];
    }
  } else if (error instanceof Error) {
    result.message = error.message;
    result.suggestions = [
      'Erro inesperado no cliente',
      'Verifique o console para mais detalhes',
      'Recarregue a página e tente novamente',
    ];
  }

  return result;
}

/**
 * Valida dados de entrada com base nas regras definidas
 * @param {string} field - Nome do campo a ser validado
 * @param {string} value - Valor a ser validado
 * @returns {ValidationResult} Resultado da validação
 */
export function validateField(
  field: string,
  value: string
): { isValid: boolean; errors: string[] } {
  const rule = VALIDATION_RULES[field];
  if (!rule) {
    console.warn(
      `[validateField] Nenhuma regra de validação encontrada para o campo: ${field}`
    );
    return { isValid: true, errors: [] };
  }

  const result = rule.validate(value);

  // Mapeia códigos de erro para mensagens amigáveis
  const friendlyErrors = result.errors.map(
    errorCode => rule.errorMessages[errorCode] || errorCode
  );

  return {
    isValid: result.isValid,
    errors: friendlyErrors,
  };
}

/**
 * Valida múltiplos campos de uma vez
 * @param {Record<string, string>} fields - Objeto com os campos e valores a serem validados
 * @returns {Record<string, { isValid: boolean; errors: string[] }>} Resultados da validação
 */
export function validateFields(
  fields: Record<string, string>
): Record<string, { isValid: boolean; errors: string[] }> {
  const results: Record<string, { isValid: boolean; errors: string[] }> = {};

  for (const [field, value] of Object.entries(fields)) {
    results[field] = validateField(field, value);
  }

  return results;
}

/**
 * Loga erros da API de forma consistente
 * @param {unknown} error - Erro a ser logado
 * @param {string} context - Contexto onde o erro ocorreu
 * @param {Record<string, any>} [metadata] - Metadados adicionais para logging
 */
export function logApiError(
  error: unknown,
  context: string,
  metadata?: Record<string, unknown>
): void {
  const errorAnalysis = analyzeApiError(error);

  // Formata a mensagem de erro
  const errorMessage = [
    `[${new Date().toISOString()}]`,
    `[${context}]`,
    errorAnalysis.message,
    errorAnalysis.status ? `Status: ${errorAnalysis.status}` : '',
    errorAnalysis.endpoint
      ? `Endpoint: ${errorAnalysis.method} ${errorAnalysis.endpoint}`
      : '',
  ]
    .filter(Boolean)
    .join(' | ');

  // Log detalhado em desenvolvimento
  if (process.env.NODE_ENV === 'development') {
    console.groupCollapsed(
      `%c[${context}] ${errorAnalysis.message}`,
      `color: ${COLOR_RED[500]}`
    );
    console.error('Detalhes do erro:', error);
    console.error('Análise do erro:', errorAnalysis);
    if (metadata) {
      console.error('Metadados:', metadata);
    }
    console.groupEnd();
  } else {
    // Log simplificado em produção
    console.error(errorMessage);

    // Log adicional para erros de servidor
    if (errorAnalysis.isServerError) {
      console.error('Detalhes do erro do servidor:', {
        status: errorAnalysis.status,
        endpoint: errorAnalysis.endpoint,
        timestamp: errorAnalysis.timestamp,
      });
    }
  }
  if (errorAnalysis.method) {
    console.error('Method:', errorAnalysis.method);
  }
  if (errorAnalysis.endpoint) {
    console.error('Endpoint:', errorAnalysis.endpoint);
  }

  if (errorAnalysis.suggestions && errorAnalysis.suggestions.length > 0) {
    console.error('Suggestions:', errorAnalysis.suggestions);
  }

  if (error instanceof Error && error.stack) {
    console.error('Stack:', error.stack);
  }
}
