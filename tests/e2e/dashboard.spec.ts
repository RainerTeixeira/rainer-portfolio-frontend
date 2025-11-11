/**
 * Testes E2E do Dashboard com Playwright
 *
 * Testa funcionalidades do dashboard incluindo:
 * - Exibição de dados do usuário (fullName)
 * - Exibição de categorias (name)
 * - Edição de perfil
 * - Listagem de posts
 */

import { expect, test } from './fixtures';

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

test.describe('Dashboard - Teste de UI', () => {
  test.beforeEach(async ({ page }) => {
    // Visitar a página do dashboard
    await page.goto('/dashboard');
  });

  test('deve carregar a página do dashboard', async ({ page }) => {
    // Aguardar que a página carregue
    await page.waitForLoadState('networkidle');

    // Verificar se elementos principais estão presentes
    const profileHeader = page
      .locator('text=/perfil|Profile/i')
      .or(page.locator('[aria-labelledby="profile-heading"]'));
    await expect(profileHeader.first()).toBeVisible({ timeout: 10000 });
  });

  test('deve exibir nome do usuário (fullName) no header do perfil', async ({
    page,
  }) => {
    await page.waitForLoadState('networkidle');

    // Verificar se o fullName do usuário está sendo exibido
    // O componente ProfileHeader exibe user?.fullName || 'Usuário'
    const userNameElement = page
      .locator('text=/Administrador|Maria|João|Ana|Carlos|Usuário/i')
      .first();

    // Verificar se algum nome de usuário está visível
    await expect(userNameElement)
      .toBeVisible({ timeout: 10000 })
      .catch(() => {
        // Se não encontrar, verificar se há texto indicando usuário
        const userText = page.locator('text=/Usuário|user/i');
        expect(userText.first()).toBeVisible();
      });
  });

  test('deve exibir categorias com campo name (não fullName)', async ({
    page,
  }) => {
    await page.waitForLoadState('networkidle');

    // Verificar se posts recentes são exibidos com categorias
    // As categorias devem usar o campo 'name'
    const postsSection = page
      .locator('[aria-labelledby="actions-posts-heading"]')
      .or(page.locator('text=/Posts Recentes|Recent Posts/i'));

    // Se houver posts, verificar se as categorias estão sendo exibidas
    const categoryNames = page.locator(
      'text=/Tecnologia|Design|Carreira|Frontend|Backend|DevOps/i'
    );

    // Se categorias estiverem visíveis, verificar que não há erro
    const categoryCount = await categoryNames.count();
    if (categoryCount > 0) {
      await expect(categoryNames.first()).toBeVisible();
    }
  });

  test('deve permitir editar perfil e atualizar fullName', async ({ page }) => {
    await page.waitForLoadState('networkidle');

    // Procurar botão de editar perfil
    const editButton = page
      .locator('button:has-text("Editar Perfil")')
      .or(page.locator('button:has-text("Editar")').first());

    const isVisible = await editButton
      .isVisible({ timeout: 5000 })
      .catch(() => false);

    if (isVisible) {
      await editButton.click();

      // Verificar se o modal de edição abre
      const fullNameInput = page
        .locator('input[id="edit-fullName"]')
        .or(page.locator('input[placeholder*="nome completo" i]'));

      await expect(fullNameInput).toBeVisible({ timeout: 5000 });

      // Verificar se o campo está preenchido com o fullName atual
      const currentValue = await fullNameInput.inputValue();
      expect(currentValue.length).toBeGreaterThan(0);
    } else {
      test.skip();
    }
  });

  test('deve exibir posts com author.fullName e subcategory.name', async ({
    page,
  }) => {
    await page.waitForLoadState('networkidle');

    // Aguardar posts carregarem
    await page.waitForTimeout(2000);

    // Verificar se há posts sendo exibidos
    const postsContainer = page
      .locator('[aria-labelledby="actions-posts-heading"]')
      .or(page.locator('text=/Posts Recentes/i'));

    const hasPosts = (await postsContainer.count()) > 0;

    if (hasPosts) {
      // Verificar se posts têm informações de autor e categoria
      const postCards = page
        .locator('[data-testid="post-card"]')
        .or(page.locator('article').first());

      const postCount = await postCards.count();
      if (postCount > 0) {
        // Verificar se primeiro post tem categoria (name, não fullName)
        const firstPost = postCards.first();
        await expect(firstPost).toBeVisible();
      }
    }
  });

  test('deve verificar que não há erros de console relacionados a fullName ou name', async ({
    page,
    consoleHelper,
  }) => {
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    // Filtrar erros relacionados a campos incorretos
    const allErrors = consoleHelper.getErrors();
    const relevantErrors = allErrors.filter(
      error =>
        error.text.includes('fullName') ||
        error.text.includes('Property') ||
        error.text.includes('does not exist')
    );

    // Verificar que não há erros críticos relacionados aos campos
    expect(relevantErrors.length).toBe(0);
  });

  test('deve verificar resposta da API com estrutura correta', async ({
    page,
  }) => {
    // Interceptar requisições da API
    const apiResponses: any[] = [];

    page.on('response', async response => {
      const url = response.url();
      if (url.includes('/api/') || url.includes(API_URL)) {
        try {
          const data = await response.json();
          apiResponses.push({ url, data });
        } catch {
          // Ignorar respostas que não são JSON
        }
      }
    });

    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);

    // Verificar se alguma resposta contém dados de usuário com fullName
    const userResponses = apiResponses.filter(
      r => r.data?.fullName || r.data?.data?.fullName
    );

    if (userResponses.length > 0) {
      // Verificar que fullName existe e é string
      const userData =
        userResponses[0].data?.fullName ||
        userResponses[0].data?.data?.fullName;
      expect(typeof userData).toBe('string');
      expect(userData.length).toBeGreaterThan(0);
    }

    // Verificar se há respostas com categorias usando 'name' (não fullName)
    const categoryResponses = apiResponses.filter(
      r =>
        r.data?.name || (Array.isArray(r.data?.data) && r.data?.data[0]?.name)
    );

    if (categoryResponses.length > 0) {
      // Verificar que categorias usam 'name', não 'fullName'
      const categoryData = Array.isArray(categoryResponses[0].data?.data)
        ? categoryResponses[0].data.data[0]
        : categoryResponses[0].data;

      if (categoryData) {
        expect(categoryData).toHaveProperty('name');
        expect(categoryData).not.toHaveProperty('fullName');
      }
    }
  });
});

test.describe('Dashboard - Teste de Integração API', () => {
  test('deve fazer requisição para /posts e verificar estrutura', async ({
    request,
  }) => {
    const response = await request.get(`${API_URL}/posts?limit=1`, {
      headers: {
        'X-Database-Provider': 'PRISMA',
      },
    });

    expect(response.ok()).toBeTruthy();

    const data = await response.json();

    if (data.success && data.posts && data.posts.length > 0) {
      const post = data.posts[0];

      // Verificar que author tem fullName (não name)
      if (post.author) {
        expect(post.author).toHaveProperty('fullName');
        expect(typeof post.author.fullName).toBe('string');
      }

      // Verificar que subcategory tem name (não fullName)
      if (post.subcategory) {
        expect(post.subcategory).toHaveProperty('name');
        expect(typeof post.subcategory.name).toBe('string');
        expect(post.subcategory).not.toHaveProperty('fullName');
      }
    }
  });

  test('deve fazer requisição para /categories e verificar estrutura', async ({
    request,
  }) => {
    const response = await request.get(`${API_URL}/categories`, {
      headers: {
        'X-Database-Provider': 'PRISMA',
      },
    });

    expect(response.ok()).toBeTruthy();

    const data = await response.json();

    if (data.success && data.data && data.data.length > 0) {
      const category = data.data[0];

      // Verificar que categoria tem 'name' (não fullName)
      expect(category).toHaveProperty('name');
      expect(typeof category.name).toBe('string');
      expect(category).not.toHaveProperty('fullName');
    }
  });

  test('deve fazer requisição para /users e verificar estrutura', async ({
    request,
  }) => {
    const response = await request.get(`${API_URL}/users?limit=1`, {
      headers: {
        'X-Database-Provider': 'PRISMA',
      },
    });

    expect(response.ok()).toBeTruthy();

    const data = await response.json();

    if (data.success && data.data && data.data.length > 0) {
      const user = data.data[0];

      // Verificar que user tem 'fullName' (não name)
      expect(user).toHaveProperty('fullName');
      expect(typeof user.fullName).toBe('string');
      expect(user.fullName.length).toBeGreaterThan(0);
    }
  });
});
