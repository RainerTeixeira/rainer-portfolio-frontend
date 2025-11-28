/**
 * Tipos de Usuários - Sistema de Autenticação com AWS Cognito + MongoDB
 * 
 * Arquitetura:
 * - Cognito: Gerencia email, sub, email_verified, nickname
 * - MongoDB: Armazena perfil complementar (bio, avatar, estatísticas, etc.)
 * - Sincronização: cognitoSub é a chave única entre Cognito ⇄ MongoDB
 * 
 * @fileoverview Definições de tipos para usuários e autenticação
 * @module types/users
 * @version 2.0.0
 * @author Rainer Teixeira
 * @since 1.0.0
 */

// =============================================================================
// ENUMS
// =============================================================================

/**
 * Papel/permissão do usuário no sistema
 * @readonly
 * @enum {string}
 */
export enum UserRole {
  /** Administrador total do sistema */
  ADMIN = 'ADMIN',
  /** Editor de conteúdo (aprova posts) */
  EDITOR = 'EDITOR',
  /** Autor de posts (cria conteúdo) */
  AUTHOR = 'AUTHOR',
  /** Assinante (apenas lê e comenta) */
  SUBSCRIBER = 'SUBSCRIBER',
}

// =============================================================================
// INTERFACES PRINCIPAIS
// =============================================================================

/**
 * Dados do usuário no Cognito (apenas autenticação)
 * @interface CognitoUser
 */
export interface CognitoUser {
  /** ID único do usuário no Cognito (sub claim do JWT) */
  readonly sub: string;
  /** Email do usuário (obrigatório no Cognito) */
  readonly email: string;
  /** Status de verificação do email */
  readonly email_verified: boolean;
  /** Nickname do usuário no Cognito */
  readonly nickname?: string;
}

/**
 * Dados completos do usuário no MongoDB (perfil complementar)
 * @interface User
 */
export interface User {
  /** ID interno do MongoDB (ObjectId) */
  readonly id: string;
  /** ID único do usuário no Amazon Cognito (sub claim do JWT) */
  readonly cognitoSub: string;
  /** Nome completo ou nome de exibição */
  readonly fullName: string;
  /** Nickname único do usuário */
  readonly nickname: string;
  /** URL do avatar (CDN, S3, ou upload local) */
  readonly avatar?: string;
  /** Biografia curta do usuário */
  readonly bio?: string;
  /** Website pessoal, portfólio ou blog */
  readonly website?: string;
  /** Links de redes sociais em JSON */
  readonly socialLinks?: Record<string, string>;
  /** Papel do usuário (define permissões na aplicação) */
  readonly role: UserRole;
  /** Usuário ativo no sistema */
  readonly isActive: boolean;
  /** Usuário banido (moderação interna) */
  readonly isBanned: boolean;
  /** Motivo do banimento interno (se aplicável) */
  readonly banReason?: string;
  /** Contador de posts criados */
  readonly postsCount: number;
  /** Contador de comentários feitos */
  readonly commentsCount: number;
  /** Data de criação do perfil na aplicação */
  readonly createdAt: string;
  /** Última atualização do perfil */
  readonly updatedAt: string;
}

/**
 * Alias para User (dados do MongoDB)
 * @type {User}
 */
export type MongoUser = User;

/**
 * Perfil completo do usuário (Cognito + MongoDB mesclados)
 * @interface UserProfile
 * @description Usado no frontend para exibir dados completos do usuário
 */
export interface UserProfile extends Omit<User, 'cognitoSub'> {
  /** ID único do usuário no Cognito */
  readonly cognitoSub: string;
  /** Email do usuário (vem do Cognito) */
  readonly email: string;
  /** Status de verificação do email (vem do Cognito) */
  readonly emailVerified: boolean;
}

// =============================================================================
// DATA TRANSFER OBJECTS (DTOs)
// =============================================================================

/**
 * DTO para criação de usuário no registro
 * @interface CreateUserData
 */
export interface CreateUserData {
  /** Email do usuário (vai para o Cognito) */
  readonly email: string;
  /** Nickname do usuário (vai para o Cognito) */
  readonly nickname: string;
  /** Nome completo */
  readonly fullName: string;
  /** Senha do usuário */
  readonly password: string;
  /** Biografia opcional */
  readonly bio?: string;
  /** URL do avatar opcional */
  readonly avatar?: string;
  /** Website pessoal opcional */
  readonly website?: string;
  /** Links de redes sociais opcionais */
  readonly socialLinks?: Record<string, string>;
  /** Role do usuário (padrão: AUTHOR) */
  readonly role?: UserRole;
}

/**
 * DTO para atualização de perfil do usuário (operação administrativa)
 * @interface UpdateUserData
 * @description Permite atualização de todos os campos, incluindo dados administrativos
 */
export interface UpdateUserData {
  /** Novo nome completo */
  readonly fullName?: string;
  /** Novo nickname */
  readonly nickname?: string;
  /** Nova biografia */
  readonly bio?: string;
  /** Novo avatar */
  readonly avatar?: string;
  /** Novo website */
  readonly website?: string;
  /** Novos links sociais */
  readonly socialLinks?: Record<string, string>;
  /** Nova role (apenas admin) */
  readonly role?: UserRole;
  /** Status de atividade */
  readonly isActive?: boolean;
  /** Status de banimento */
  readonly isBanned?: boolean;
  /** Motivo do banimento */
  readonly banReason?: string;
}

/**
 * DTO para atualização de perfil pelo próprio usuário
 * @interface UpdateProfileData
 * @description Versão simplificada sem campos administrativos
 */
export interface UpdateProfileData {
  /** Novo nome completo */
  readonly fullName?: string;
  /** Nova biografia */
  readonly bio?: string;
  /** Novo avatar */
  readonly avatar?: string;
  /** Novo website */
  readonly website?: string;
  /** Novos links sociais */
  readonly socialLinks?: Record<string, string>;
}

/**
 * DTO para alteração de nickname no MongoDB
 * @interface UpdateNicknameData
 */
export interface UpdateNicknameData {
  /** ID do usuário no MongoDB */
  readonly _id: string;
  /** Novo nickname */
  readonly newNickname: string;
}

/**
 * DTO para alteração de email (via Cognito)
 * @interface ChangeEmailData
 */
export interface ChangeEmailData {
  /** ID do usuário no Cognito */
  readonly cognitoSub: string;
  /** Novo email */
  readonly newEmail: string;
}

/**
 * DTO para verificação de alteração de email
 * @interface VerifyEmailChangeData
 */
export interface VerifyEmailChangeData {
  /** ID do usuário no Cognito */
  readonly cognitoSub: string;
  /** Código de verificação */
  readonly code: string;
}

// =============================================================================
// FILTROS E RESPOSTAS
// =============================================================================

/**
 * Filtros para listagem de usuários
 * @interface UserFilters
 */
export interface UserFilters {
  /** Página atual */
  readonly page?: number;
  /** Limite de itens por página */
  readonly limit?: number;
  /** Filtro por role */
  readonly role?: UserRole;
  /** Termo de busca (nome, email, nickname) */
  readonly search?: string;
  /** Filtro por status de atividade */
  readonly isActive?: boolean;
  /** Filtro por status de banimento */
  readonly isBanned?: boolean;
}

/**
 * Resposta paginada para listagem de usuários
 * @interface UsersResponse
 * @deprecated Use PaginatedResponse<User> instead
 */
export interface UsersResponse {
  /** Lista de usuários */
  readonly users: User[];
  /** Total de usuários */
  readonly total: number;
  /** Página atual */
  readonly page: number;
  /** Total de páginas */
  readonly totalPages: number;
  /** Limite por página */
  readonly limit: number;
}

// =============================================================================
// RESPOSTAS DE AUTENTICAÇÃO
// =============================================================================

/**
 * DTO para resposta de login
 * @interface LoginResponseData
 */
export interface LoginResponseData {
  /** Tokens de autenticação */
  readonly tokens: {
    readonly accessToken: string;
    readonly refreshToken: string;
    readonly idToken: string;
    readonly expiresIn: number;
    readonly tokenType: string;
  };
  /** Dados do usuário autenticado */
  readonly user: {
    readonly id: string;
    readonly cognitoSub: string;
    readonly email: string;
    readonly nickname: string;
    readonly fullName: string;
    readonly role: UserRole;
    readonly isActive: boolean;
    readonly isBanned: boolean;
    readonly emailVerified: boolean;
    readonly postsCount: number;
    readonly commentsCount: number;
    readonly createdAt: string;
    readonly updatedAt: string;
    readonly avatar?: string;
    readonly bio?: string;
    readonly website?: string;
    readonly socialLinks?: Record<string, string>;
  };
}

// =============================================================================
// TIPOS DE EVENTOS E NOTIFICAÇÕES
// =============================================================================

/**
 * Evento de mudança no perfil do usuário
 * @interface UserProfileChangeEvent
 */
export interface UserProfileChangeEvent {
  /** Tipo do evento */
  readonly type: 'PROFILE_UPDATED' | 'AVATAR_CHANGED' | 'ROLE_CHANGED';
  /** ID do usuário */
  readonly userId: string;
  /** Dados antigos (opcional) */
  readonly oldData?: Partial<User>;
  /** Dados novos */
  readonly newData: Partial<User>;
  /** Timestamp do evento */
  readonly timestamp: string;
}

/**
 * Configurações de notificação do usuário
 * @interface UserNotificationSettings
 */
export interface UserNotificationSettings {
  /** Receber notificações por email */
  readonly emailNotifications: boolean;
  /** Receber notificações de novos posts */
  readonly newPosts: boolean;
  /** Receber notificações de comentários */
  readonly comments: boolean;
  /** Receber notificações de mensagens */
  readonly messages: boolean;
  /** Receber newsletters */
  readonly newsletter: boolean;
}

// =============================================================================
// TIPOS DE ESTATÍSTICAS
// =============================================================================

/**
 * Estatísticas do usuário
 * @interface UserStats
 */
export interface UserStats {
  /** Total de posts criados */
  readonly totalPosts: number;
  /** Total de comentários feitos */
  readonly totalComments: number;
  /** Total de likes recebidos */
  readonly totalLikes: number;
  /** Total de visualizações */
  readonly totalViews: number;
  /** Data da última atividade */
  readonly lastActivity: string;
  /** Taxa de engajamento */
  readonly engagementRate: number;
}

// =============================================================================
// TIPOS DE VALIDAÇÃO
// =============================================================================

/**
 * Resultado da validação de dados do usuário
 * @interface UserValidationResult
 */
export interface UserValidationResult {
  /** Se os dados são válidos */
  readonly isValid: boolean;
  /** Lista de erros de validação */
  readonly errors: string[];
  /** Campos que falharam na validação */
  readonly failedFields: string[];
}

/**
 * Disponibilidade de nickname/email
 * @interface AvailabilityCheck
 */
export interface AvailabilityCheck {
  /** Se o valor está disponível */
  readonly available: boolean;
  /** Sugestões alternativas (se não disponível) */
  readonly suggestions?: string[];
  /** Motivo da indisponibilidade */
  readonly reason?: string;
}