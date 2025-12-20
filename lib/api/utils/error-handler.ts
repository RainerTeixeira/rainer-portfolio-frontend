/**
 * @fileoverview Utilitário de Tratamento de Erros da API
 * 
 * Funções utilitárias para tratamento padronizado de erros
 * das requisições à API.
 * 
 * @module lib/api/utils/error-handler
 */

/**
 * Classe de erro personalizada para erros da API
 */
export class ApiError extends Error {
  /** Código de status HTTP */
  public status: number;
  
  /** Código de erro específico da API */
  public code: string;
  
  /** Detalhes adicionais do erro */
  public details?: any;
  
  /** Indica se o erro é de rede */
  public isNetworkError: boolean;
  
  /**
   * Cria uma nova instância de ApiError
   * 
   * @param message - Mensagem de erro
   * @param status - Código de status HTTP
   * @param code - Código de erro específico
   * @param details - Detalhes adicionais
   * @param isNetworkError - É erro de rede?
   */
  constructor(
    message: string,
    status: number = 0,
    code: string = 'UNKNOWN_ERROR',
    details?: any,
    isNetworkError: boolean = false
  ) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
    this.details = details;
    this.isNetworkError = isNetworkError;
  }
}

/**
 * Tipos de erro conhecidos
 */
export const ERROR_CODES = {
  // Erros de autenticação
  UNAUTHORIZED: 'UNAUTHORIZED',
  TOKEN_EXPIRED: 'TOKEN_EXPIRED',
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  
  // Erros de permissão
  FORBIDDEN: 'FORBIDDEN',
  
  // Erros de validação
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  INVALID_DATA: 'INVALID_DATA',
  
  // Erros de recurso
  NOT_FOUND: 'NOT_FOUND',
  ALREADY_EXISTS: 'ALREADY_EXISTS',
  
  // Erros de servidor
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  SERVICE_UNAVAILABLE: 'SERVICE_UNAVAILABLE',
  
  // Erros de rede
  NETWORK_ERROR: 'NETWORK_ERROR',
  TIMEOUT_ERROR: 'TIMEOUT_ERROR',
  
  // Outros
  UNKNOWN_ERROR: 'UNKNOWN_ERROR',
} as const;

/**
 * Extrai informações de erro de uma resposta HTTP
 * 
 * @param error - Objeto de erro do Axios
 * @returns ApiError - Erro formatado
 * 
 * @example
 * ```typescript
 * try {
 *   await apiCall();
 * } catch (error) {
 *   const apiError = handleApiError(error);
 *   console.error(apiError.message);
 * }
 * ```
 */
export const handleApiError = (error: any): ApiError => {
  // Erro de resposta da API
  if (error.response) {
    const { status, data } = error.response;
    const message = data?.message || error.message || 'Erro desconhecido';
    const code = data?.code || getErrorCodeByStatus(status);
    
    return new ApiError(message, status, code, data);
  }
  
  // Erro de requisição (sem resposta do servidor)
  if (error.request) {
    if (error.code === 'ECONNABORTED') {
      return new ApiError(
        'Tempo de requisição esgotado',
        0,
        ERROR_CODES.TIMEOUT_ERROR,
        error,
        true
      );
    }
    
    return new ApiError(
      'Erro de conexão com o servidor',
      0,
      ERROR_CODES.NETWORK_ERROR,
      error,
      true
    );
  }
  
  // Erro desconhecido
  return new ApiError(
    error.message || 'Erro desconhecido',
    0,
    ERROR_CODES.UNKNOWN_ERROR,
    error
  );
};

/**
 * Obtém código de erro baseado no status HTTP
 * 
 * @param status - Código de status HTTP
 * @returns string - Código de erro
 */
const getErrorCodeByStatus = (status: number): string => {
  switch (status) {
    case 400:
      return ERROR_CODES.VALIDATION_ERROR;
    case 401:
      return ERROR_CODES.UNAUTHORIZED;
    case 403:
      return ERROR_CODES.FORBIDDEN;
    case 404:
      return ERROR_CODES.NOT_FOUND;
    case 409:
      return ERROR_CODES.ALREADY_EXISTS;
    case 422:
      return ERROR_CODES.INVALID_DATA;
    case 500:
      return ERROR_CODES.INTERNAL_ERROR;
    case 503:
      return ERROR_CODES.SERVICE_UNAVAILABLE;
    default:
      return ERROR_CODES.UNKNOWN_ERROR;
  }
};

/**
 * Verifica se um erro é de autenticação
 * 
 * @param error - Erro a ser verificado
 * @returns boolean - Verdadeiro se for erro de autenticação
 */
export const isAuthError = (error: ApiError): boolean => {
  return error.status === 401 || error.code === ERROR_CODES.TOKEN_EXPIRED;
};

/**
 * Verifica se um erro é de rede
 * 
 * @param error - Erro a ser verificado
 * @returns boolean - Verdadeiro se for erro de rede
 */
export const isNetworkError = (error: ApiError): boolean => {
  return error.isNetworkError || error.status === 0;
};

/**
 * Verifica se um erro é de validação
 * 
 * @param error - Erro a ser verificado
 * @returns boolean - Verdadeiro se for erro de validação
 */
export const isValidationError = (error: ApiError): boolean => {
  return (
    error.status === 400 ||
    error.status === 422 ||
    error.code === ERROR_CODES.VALIDATION_ERROR ||
    error.code === ERROR_CODES.INVALID_DATA
  );
};

/**
 * Formata mensagem de erro para exibição ao usuário
 * 
 * @param error - Erro a ser formatado
 * @returns string - Mensagem amigável
 * 
 * @example
 * ```typescript
 * const apiError = handleApiError(error);
 * const userMessage = formatErrorMessage(apiError);
 * toast.error(userMessage);
 * ```
 */
export const formatErrorMessage = (error: ApiError): string => {
  // Se o erro já tem uma mensagem amigável, usa ela
  if (error.details?.userMessage) {
    return error.details.userMessage;
  }
  
  // Formata baseado no tipo de erro
  if (isAuthError(error)) {
    return 'Sua sessão expirou. Faça login novamente.';
  }
  
  if (isNetworkError(error)) {
    return 'Verifique sua conexão com a internet.';
  }
  
  if (isValidationError(error)) {
    return 'Verifique os dados informados e tente novamente.';
  }
  
  if (error.status === 404) {
    return 'Recurso não encontrado.';
  }
  
  if (error.status === 403) {
    return 'Você não tem permissão para realizar esta ação.';
  }
  
  if (error.status >= 500) {
    return 'Ocorreu um erro em nossos servidores. Tente novamente mais tarde.';
  }
  
  // Mensagem padrão
  return error.message || 'Ocorreu um erro inesperado.';
};
