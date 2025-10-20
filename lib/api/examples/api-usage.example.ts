// ============================================================================
// Exemplo de Uso da API - Demonstração de Integração
// ============================================================================

/**
 * Este arquivo demonstra como usar a API do backend
 * sem interferir no código existente.
 * 
 * @fileoverview Exemplos práticos de consumo da API
 * @author Rainer Teixeira
 * @version 1.0.0
 */

// ============================================================================
// Imports da API
// ============================================================================

import {
  api,
  ApiResponse,
  authService,
  bookmarksService,
  categoriesService,
  commentsService,
  healthService,
  likesService,
  notificationsService,
  NotificationType,
  Post,
  postsService,
  PostStatus,
  services
} from '../index';

// ============================================================================
// Exemplo 1: Uso Básico do Cliente HTTP
// ============================================================================

export async function exemploClienteBasico() {
  try {
    // GET simples
    const health = await api.get<ApiResponse<any>>('/health');
    console.log('Status da API:', health.data);

    // POST com dados
    const novoPost = await api.post<ApiResponse<Post>>('/posts', {
      title: 'Meu Primeiro Post',
      slug: 'meu-primeiro-post',
      content: { type: 'doc', content: [] },
      subcategoryId: '507f1f77bcf86cd799439011',
      authorId: '507f1f77bcf86cd799439022'
    });
    console.log('Post criado:', novoPost.data);

  } catch (error) {
    console.error('Erro na requisição:', error);
  }
}

// ============================================================================
// Exemplo 2: Autenticação Completa
// ============================================================================

export async function exemploAutenticacao() {
  try {
    // 1. Registrar usuário
    const registro = await authService.register({
      email: 'usuario@exemplo.com',
      password: 'SenhaForte123!',
      username: 'usuario123',
      name: 'Usuário Exemplo'
    });
    console.log('Usuário registrado:', registro);

    // 2. Confirmar email (se necessário)
    if (registro.requiresEmailConfirmation) {
      await authService.confirmEmail({
        email: 'usuario@exemplo.com',
        code: '123456' // Código recebido por email
      });
    }

    // 3. Fazer login
    const login = await authService.login({
      email: 'usuario@exemplo.com',
      password: 'SenhaForte123!'
    });
    console.log('Login realizado:', login);

    // 4. Salvar tokens
    authService.setTokens(login.tokens);
    console.log('Tokens salvos no localStorage');

    // 5. Verificar se está autenticado
    const isAuth = authService.isAuthenticated();
    console.log('Usuário autenticado:', isAuth);

    // 6. Obter perfil do usuário
    const perfil = authService.getUserFromToken();
    console.log('Perfil do usuário:', perfil);

  } catch (error) {
    console.error('Erro na autenticação:', error);
  }
}

// ============================================================================
// Exemplo 3: Gerenciamento de Posts
// ============================================================================

export async function exemploGerenciamentoPosts() {
  try {
    // 1. Listar posts com filtros
    const posts = await postsService.listPosts({
      page: 1,
      limit: 10,
      status: PostStatus.PUBLISHED,
      featured: true
    });
    console.log('Posts encontrados:', posts.data.length);

    // 2. Buscar post por slug
    const post = await postsService.getPostBySlug('meu-primeiro-post');
    if (post.success) {
      console.log('Post encontrado:', post.data.title);
    } else {
      console.error('Erro ao buscar post:', post.message);
    }

    // 3. Criar novo post
    const novoPost = await postsService.createPost({
      title: 'Tutorial de TypeScript',
      slug: 'tutorial-typescript',
      content: {
        type: 'doc',
        content: [
          {
            type: 'heading',
            attrs: { level: 1 },
            content: [{ type: 'text', text: 'Introdução ao TypeScript' }]
          },
          {
            type: 'paragraph',
            content: [{ type: 'text', text: 'TypeScript é uma linguagem...' }]
          }
        ]
      },
      subcategoryId: '507f1f77bcf86cd799439011',
      authorId: '507f1f77bcf86cd799439022',
      status: PostStatus.DRAFT
    });
    if (novoPost.success) {
      console.log('Post criado:', novoPost.data.id);
    } else {
      console.error('Erro ao criar post:', novoPost.message);
    }

    // 4. Publicar post
    if (novoPost.success) {
      const postPublicado = await postsService.publishPost(novoPost.data.id);
      if (postPublicado.success) {
        console.log('Post publicado:', postPublicado.data.status);
      } else {
        console.error('Erro ao publicar post:', postPublicado.message);
      }
    }

    // 5. Listar posts por autor
    const postsAutor = await postsService.getPostsByAuthor('507f1f77bcf86cd799439022');
    if (postsAutor.success) {
      console.log('Posts do autor:', postsAutor.data.length);
    } else {
      console.error('Erro ao buscar posts do autor:', postsAutor.message);
    }

  } catch (error) {
    console.error('Erro no gerenciamento de posts:', error);
  }
}

// ============================================================================
// Exemplo 4: Sistema de Categorias Hierárquicas
// ============================================================================

export async function exemploCategorias() {
  try {
    // 1. Listar categorias principais
    const categoriasPrincipais = await categoriesService.getMainCategories();
    console.log('Categorias principais:', categoriasPrincipais);

    // 2. Criar categoria principal
    const categoriaTecnologia = await categoriesService.createCategory({
      name: 'Tecnologia',
      slug: 'tecnologia',
      description: 'Artigos sobre tecnologia e programação',
      color: '#3498DB',
      icon: 'code'
    });
    console.log('Categoria criada:', categoriaTecnologia.id);

    // 3. Criar subcategoria
    const subcategoriaFrontend = await categoriesService.createCategory({
      name: 'Frontend',
      slug: 'frontend',
      description: 'Desenvolvimento frontend',
      color: '#E74C3C',
      icon: 'react',
      parentId: categoriaTecnologia.id
    });
    console.log('Subcategoria criada:', subcategoriaFrontend.id);

    // 4. Listar subcategorias
    const subcategorias = await categoriesService.getSubcategories(categoriaTecnologia.id);
    console.log('Subcategorias:', subcategorias);

    // 5. Obter hierarquia completa
    const hierarquia = await categoriesService.getCategoryHierarchy();
    console.log('Hierarquia completa:', hierarquia);

  } catch (error) {
    console.error('Erro no gerenciamento de categorias:', error);
  }
}

// ============================================================================
// Exemplo 5: Sistema de Comentários
// ============================================================================

export async function exemploComentarios() {
  try {
    // 1. Criar comentário
    const comentario = await commentsService.createComment({
      content: 'Excelente post! Muito informativo.',
      authorId: '507f1f77bcf86cd799439022',
      postId: '507f1f77bcf86cd799439033'
    });
    console.log('Comentário criado:', comentario.id);

    // 2. Listar comentários de um post
    const comentariosPost = await commentsService.getCommentsByPost('507f1f77bcf86cd799439033');
    console.log('Comentários do post:', comentariosPost.length);

    // 3. Aprovar comentário (moderação)
    const comentarioAprovado = await commentsService.approveComment(comentario.id);
    console.log('Comentário aprovado:', comentarioAprovado.isApproved);

    // 4. Listar comentários aprovados
    const comentariosAprovados = await commentsService.getApprovedCommentsByPost('507f1f77bcf86cd799439033');
    console.log('Comentários aprovados:', comentariosAprovados.length);

  } catch (error) {
    console.error('Erro no gerenciamento de comentários:', error);
  }
}

// ============================================================================
// Exemplo 6: Sistema de Likes e Bookmarks
// ============================================================================

export async function exemploInteracoes() {
  try {
    const userId = '507f1f77bcf86cd799439022';
    const postId = '507f1f77bcf86cd799439033';

    // 1. Curtir post
    const like = await likesService.likePost({ userId, postId });
    if (like.success) {
      console.log('Post curtido:', like.data.id);
    } else {
      console.error('Erro ao curtir post:', like.message);
    }

    // 2. Verificar se curtiu
    const hasLiked = await likesService.hasUserLikedPost(userId, postId);
    console.log('Usuário curtiu o post:', hasLiked);

    // 3. Contar likes
    const likeCount = await likesService.getLikeCount(postId);
    console.log('Número de likes:', likeCount);

    // 4. Salvar post (bookmark)
    const bookmark = await bookmarksService.savePost({
      userId,
      postId,
      collection: 'Para ler depois',
      notes: 'Post interessante sobre TypeScript'
    });
    if (bookmark.success) {
      console.log('Post salvo:', bookmark.data.id);
    } else {
      console.error('Erro ao salvar post:', bookmark.message);
    }

    // 5. Listar bookmarks do usuário
    const bookmarks = await bookmarksService.getBookmarksByUser(userId);
    if (bookmarks.success) {
      console.log('Posts salvos:', bookmarks.data.length);
    } else {
      console.error('Erro ao buscar bookmarks:', bookmarks.message);
    }

    // 6. Toggle like/unlike
    const toggleResult = await likesService.toggleLike(userId, postId);
    console.log('Toggle like:', toggleResult);

  } catch (error) {
    console.error('Erro nas interações:', error);
  }
}

// ============================================================================
// Exemplo 7: Sistema de Notificações
// ============================================================================

export async function exemploNotificacoes() {
  try {
    const userId = '507f1f77bcf86cd799439022';

    // 1. Listar notificações do usuário
    const notificacoes = await notificationsService.getNotificationsByUser(userId);
    console.log('Notificações:', notificacoes.length);

    // 2. Contar notificações não lidas
    const naoLidas = await notificationsService.getUnreadCount(userId);
    console.log('Notificações não lidas:', naoLidas);

    // 3. Criar notificação personalizada
    const notificacao = await notificationsService.createNotification({
      type: NotificationType.SYSTEM,
      title: 'Bem-vindo!',
      message: 'Seja bem-vindo ao nosso blog!',
      userId
    });
    console.log('Notificação criada:', notificacao.id);

    // 4. Marcar como lida
    const notificacaoLida = await notificationsService.markAsRead(notificacao.id);
    console.log('Notificação marcada como lida:', notificacaoLida.isRead);

    // 5. Notificar novo comentário
    await notificationsService.notifyNewComment(
      '507f1f77bcf86cd799439022',
      'João Silva',
      'Tutorial de TypeScript',
      '507f1f77bcf86cd799439033'
    );
    console.log('Notificação de comentário enviada');

  } catch (error) {
    console.error('Erro no sistema de notificações:', error);
  }
}

// ============================================================================
// Exemplo 8: Monitoramento e Health Check
// ============================================================================

export async function exemploMonitoramento() {
  try {
    // 1. Verificar status básico
    const health = await healthService.getHealthStatus();
    console.log('Status da API:', health.status);
    console.log('Uptime:', health.uptime);
    console.log('Memória:', health.memory);

    // 2. Verificar status detalhado
    const detailedHealth = await healthService.getDetailedHealthStatus();
    console.log('Banco de dados:', detailedHealth.database);
    console.log('Ambiente:', detailedHealth.environment);

    // 3. Verificar se está online
    const isOnline = await healthService.isApiOnline();
    console.log('API online:', isOnline);

    // 4. Verificar banco de dados
    const isDbConnected = await healthService.isDatabaseConnected();
    console.log('Banco conectado:', isDbConnected);

    // 5. Verificar saúde geral
    const isHealthy = await healthService.isHealthy();
    console.log('Sistema saudável:', isHealthy);

  } catch (error) {
    console.error('Erro no monitoramento:', error);
  }
}

// ============================================================================
// Exemplo 9: Uso com Services Object
// ============================================================================

export async function exemploServicesObject() {
  try {
    // Usar o objeto services para acesso direto
    const posts = await services.posts.listPosts({ page: 1, limit: 5 });
    console.log('Posts via services:', posts.data.length);

    const users = await services.users.listUsers({ page: 1, limit: 10 });
    console.log('Usuários via services:', users.data.length);

    const categories = await services.categories.getMainCategories();
    console.log('Categorias via services:', categories.length);

    const health = await services.health.getHealthStatus();
    console.log('Health via services:', health.status);

  } catch (error) {
    console.error('Erro usando services object:', error);
  }
}

// ============================================================================
// Exemplo 10: Tratamento de Erros
// ============================================================================

export async function exemploTratamentoErros() {
  try {
    // Tentar buscar um post que não existe
    await postsService.getPostById('id-inexistente');
  } catch (error: any) {
    if (error.status === 404) {
      console.log('Post não encontrado');
    } else if (error.status === 401) {
      console.log('Não autorizado - faça login');
    } else if (error.status >= 500) {
      console.log('Erro interno do servidor');
    } else {
      console.log('Erro desconhecido:', error.message);
    }
  }
}

// ============================================================================
// Exemplo 11: Integração Completa - Fluxo de Blog
// ============================================================================

export async function exemploFluxoCompleto() {
  try {
    console.log('🚀 Iniciando fluxo completo do blog...');

    // 1. Verificar saúde da API
    const isHealthy = await healthService.isHealthy();
    if (!isHealthy) {
      throw new Error('API não está saudável');
    }
    console.log('✅ API saudável');

    // 2. Fazer login
    const login = await authService.login({
      email: 'admin@exemplo.com',
      password: 'SenhaForte123!'
    });
    authService.setTokens(login.tokens);
    console.log('✅ Login realizado');

    // 3. Listar categorias
    const categorias = await categoriesService.getMainCategories();
    console.log('✅ Categorias carregadas:', categorias.length);

    // 4. Criar post
    const post = await postsService.createPost({
      title: 'Integração Frontend + Backend',
      slug: 'integracao-frontend-backend',
      content: { type: 'doc', content: [] },
      subcategoryId: categorias[0]?.id || '507f1f77bcf86cd799439011',
      authorId: login.user.id
    });
    if (post.success) {
      console.log('✅ Post criado:', post.data.id);
    } else {
      console.error('❌ Erro ao criar post:', post.message);
    }

    // 5. Publicar post
    if (post.success) {
      await postsService.publishPost(post.data.id);
      console.log('✅ Post publicado');
    }

    // 6. Curtir o post
    if (post.success) {
      await likesService.likePost({ userId: login.user.id, postId: post.data.id });
      console.log('✅ Post curtido');
    }

    // 7. Salvar post
    if (post.success) {
      await bookmarksService.savePost({
        userId: login.user.id,
        postId: post.data.id,
        collection: 'Favoritos'
      });
      console.log('✅ Post salvo');
    }

    // 8. Comentar no post
    if (post.success) {
      await commentsService.createComment({
        content: 'Excelente post sobre integração!',
        authorId: login.user.id,
        postId: post.data.id
      });
      console.log('✅ Comentário adicionado');
    }

    console.log('🎉 Fluxo completo executado com sucesso!');

  } catch (error) {
    console.error('❌ Erro no fluxo completo:', error);
  }
}

// ============================================================================
// Exportar todos os exemplos
// ============================================================================

export const exemplos = {
  clienteBasico: exemploClienteBasico,
  autenticacao: exemploAutenticacao,
  gerenciamentoPosts: exemploGerenciamentoPosts,
  categorias: exemploCategorias,
  comentarios: exemploComentarios,
  interacoes: exemploInteracoes,
  notificacoes: exemploNotificacoes,
  monitoramento: exemploMonitoramento,
  servicesObject: exemploServicesObject,
  tratamentoErros: exemploTratamentoErros,
  fluxoCompleto: exemploFluxoCompleto
} as const;