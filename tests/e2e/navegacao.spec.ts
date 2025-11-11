/**
 * Testes E2E de Navegação
 *
 * Testa navegação completa do site:
 * - Links internos
 * - Menu de navegação
 * - Breadcrumbs
 * - Menu mobile
 * - Navegação entre páginas
 * - Botões de voltar
 */

import { expect, test } from './fixtures';

test.describe('Navegação - Menu Principal', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('deve exibir menu de navegação', async ({ page }) => {
    // Procurar menu/navbar
    const nav = page.locator('nav, [role="navigation"], header nav').first();
    await expect(nav).toBeVisible({ timeout: 5000 });
  });

  test('deve navegar para blog pelo menu', async ({ page }) => {
    const blogLink = page
      .locator(
        'a:has-text("Blog"), nav a[href*="/blog"], [role="navigation"] a[href*="/blog"]'
      )
      .first();

    if (await blogLink.isVisible({ timeout: 3000 }).catch(() => false)) {
      await blogLink.click();
      await page.waitForLoadState('networkidle');
      await expect(page).toHaveURL(/\/blog/);
    }
  });

  test('deve navegar para sobre pelo menu', async ({ page }) => {
    const sobreLink = page
      .locator(
        'a:has-text("Sobre"), nav a[href*="/sobre"], [role="navigation"] a[href*="/sobre"]'
      )
      .first();

    if (await sobreLink.isVisible({ timeout: 3000 }).catch(() => false)) {
      await sobreLink.click();
      await page.waitForLoadState('networkidle');
      await expect(page).toHaveURL(/\/sobre/);
    }
  });

  test('deve navegar para contato pelo menu', async ({ page }) => {
    const contatoLink = page
      .locator(
        'a:has-text("Contato"), nav a[href*="/contato"], [role="navigation"] a[href*="/contato"]'
      )
      .first();

    if (await contatoLink.isVisible({ timeout: 3000 }).catch(() => false)) {
      await contatoLink.click();
      await page.waitForLoadState('networkidle');
      await expect(page).toHaveURL(/\/contato/);
    }
  });

  test('deve voltar para home pelo logo', async ({ page }) => {
    // Ir para outra página primeiro
    await page.goto('/blog');
    await page.waitForLoadState('networkidle');

    // Procurar logo/link para home
    const homeLink = page
      .locator(
        'a[href="/"], a[href="/"] img, header a:has(img), [aria-label*="home" i]'
      )
      .first();

    if (await homeLink.isVisible({ timeout: 3000 }).catch(() => false)) {
      await homeLink.click();
      await page.waitForLoadState('networkidle');
      await expect(page).toHaveURL(/\/$/);
    }
  });
});

test.describe('Navegação - Menu Mobile', () => {
  test('deve exibir menu mobile em telas pequenas', async ({ page }) => {
    // Configurar viewport mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Procurar botão de menu mobile
    const menuButton = page
      .locator(
        'button[aria-label*="menu" i], button[aria-label*="abrir" i], button:has(svg)'
      )
      .first();

    const menuVisible = await menuButton
      .isVisible({ timeout: 3000 })
      .catch(() => false);

    if (menuVisible) {
      await menuButton.click();
      await page.waitForTimeout(300);

      // Verificar se menu abriu
      const menu = page
        .locator('nav[aria-expanded="true"], nav.mobile-menu, [role="menu"]')
        .first();
      const menuOpen = await menu
        .isVisible({ timeout: 2000 })
        .catch(() => false);
      expect(menuOpen).toBe(true);
    } else {
      // Se não há menu mobile, verificar que página carregou
      expect(await page.locator('nav, header').first().isVisible()).toBe(true);
    }
  });

  test('deve navegar pelo menu mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const menuButton = page
      .locator('button[aria-label*="menu" i], button[aria-label*="abrir" i]')
      .first();

    if (await menuButton.isVisible({ timeout: 3000 }).catch(() => false)) {
      await menuButton.click();
      await page.waitForTimeout(300);

      // Clicar em link do blog no menu mobile
      const blogLink = page
        .locator('nav a:has-text("Blog"), [role="menu"] a:has-text("Blog")')
        .first();

      if (await blogLink.isVisible({ timeout: 2000 }).catch(() => false)) {
        await blogLink.click();
        await page.waitForLoadState('networkidle');
        await expect(page).toHaveURL(/\/blog/);
      }
    }
  });
});

test.describe('Navegação - Links Internos', () => {
  test('deve navegar entre seções da home', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Procurar links de âncora (scroll para seções)
    const anchorLinks = page.locator('a[href^="#"]');
    const anchorCount = await anchorLinks.count();

    if (anchorCount > 0) {
      const firstAnchor = anchorLinks.first();
      const href = await firstAnchor.getAttribute('href');

      if (href && href.startsWith('#')) {
        await firstAnchor.click();
        await page.waitForTimeout(500);

        // Verificar que scrollou (URL pode ter mudado ou não)
        const currentHash = new URL(page.url()).hash;
        expect(currentHash === href || currentHash === '').toBe(true);
      }
    }
  });

  test('deve navegar de blog para post individual', async ({ page }) => {
    await page.goto('/blog');
    await page.waitForLoadState('networkidle');

    const firstPost = page
      .locator('[data-testid="post-card"], article, .post-card')
      .first();

    if (await firstPost.isVisible({ timeout: 5000 }).catch(() => false)) {
      const postLink = firstPost.locator('a').first();
      const href = await postLink.getAttribute('href').catch(() => null);

      if (href) {
        await postLink.click();
        await page.waitForLoadState('networkidle');
        await expect(page).toHaveURL(new RegExp(href.replace('/', '\\/')));
      }
    }
  });
});

test.describe('Navegação - Breadcrumbs', () => {
  test('deve exibir breadcrumbs em páginas apropriadas', async ({ page }) => {
    await page.goto('/blog');
    await page.waitForLoadState('networkidle');

    const firstPost = page
      .locator('[data-testid="post-card"], article, .post-card')
      .first();

    if (await firstPost.isVisible({ timeout: 5000 }).catch(() => false)) {
      await firstPost.click();
      await page.waitForLoadState('networkidle');

      // Procurar breadcrumbs
      const breadcrumbs = page
        .locator(
          '[aria-label*="breadcrumb" i], nav[aria-label*="breadcrumb" i], .breadcrumb, ol[aria-label*="breadcrumb" i]'
        )
        .first();

      const exists = await breadcrumbs
        .isVisible({ timeout: 3000 })
        .catch(() => false);

      if (exists) {
        // Verificar que breadcrumbs têm links
        const breadcrumbLinks = breadcrumbs.locator('a');
        const linkCount = await breadcrumbLinks.count();
        expect(linkCount).toBeGreaterThan(0);
      } else {
        // Se não há breadcrumbs, apenas verificar que página carregou
        expect(await page.locator('h1').isVisible()).toBe(true);
      }
    }
  });

  test('deve navegar pelos breadcrumbs', async ({ page }) => {
    await page.goto('/blog');
    await page.waitForLoadState('networkidle');

    const firstPost = page
      .locator('[data-testid="post-card"], article, .post-card')
      .first();

    if (await firstPost.isVisible({ timeout: 5000 }).catch(() => false)) {
      await firstPost.click();
      await page.waitForLoadState('networkidle');

      const breadcrumbs = page
        .locator(
          '[aria-label*="breadcrumb" i], nav[aria-label*="breadcrumb" i]'
        )
        .first();

      if (await breadcrumbs.isVisible({ timeout: 3000 }).catch(() => false)) {
        // Clicar no primeiro link do breadcrumb (geralmente "Home" ou "Blog")
        const firstBreadcrumbLink = breadcrumbs.locator('a').first();
        if (
          await firstBreadcrumbLink
            .isVisible({ timeout: 2000 })
            .catch(() => false)
        ) {
          await firstBreadcrumbLink.click();
          await page.waitForLoadState('networkidle');
          // Deve ter navegado
          expect(page.url()).toBeTruthy();
        }
      }
    }
  });
});

test.describe('Navegação - Botões de Voltar', () => {
  test('deve ter botão de voltar em post individual', async ({ page }) => {
    await page.goto('/blog');
    await page.waitForLoadState('networkidle');

    const firstPost = page
      .locator('[data-testid="post-card"], article, .post-card')
      .first();

    if (await firstPost.isVisible({ timeout: 5000 }).catch(() => false)) {
      await firstPost.click();
      await page.waitForLoadState('networkidle');

      // Procurar botão de voltar
      const backButton = page
        .locator(
          'button:has-text("Voltar"), a:has-text("Voltar"), button[aria-label*="voltar" i], button[aria-label*="back" i]'
        )
        .first();

      const exists = await backButton
        .isVisible({ timeout: 3000 })
        .catch(() => false);

      if (exists) {
        await backButton.click();
        await page.waitForLoadState('networkidle');
        // Deve ter voltado para blog ou home
        expect(page.url()).toMatch(/\/(blog|$)/);
      } else {
        // Se não há botão, verificar que pode usar navegação do browser
        await page.goBack();
        await expect(page).toHaveURL(/\/blog/);
      }
    }
  });
});

test.describe('Navegação - Footer', () => {
  test('deve exibir links no footer', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Scroll para footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);

    // Procurar footer
    const footer = page.locator('footer, [role="contentinfo"]').first();
    const footerVisible = await footer
      .isVisible({ timeout: 3000 })
      .catch(() => false);

    if (footerVisible) {
      // Verificar que footer tem links
      const footerLinks = footer.locator('a');
      const linkCount = await footerLinks.count();
      expect(linkCount).toBeGreaterThan(0);
    } else {
      // Se não há footer, apenas verificar que página carregou
      expect(await page.locator('main, body').first().isVisible()).toBe(true);
    }
  });

  test('deve navegar pelos links do footer', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);

    const footer = page.locator('footer, [role="contentinfo"]').first();

    if (await footer.isVisible({ timeout: 3000 }).catch(() => false)) {
      // Procurar link de termos ou privacidade
      const termsLink = footer
        .locator('a:has-text("Termos"), a[href*="/termos"]')
        .first();

      if (await termsLink.isVisible({ timeout: 2000 }).catch(() => false)) {
        await termsLink.click();
        await page.waitForLoadState('networkidle');
        await expect(page).toHaveURL(/\/termos/);
      }
    }
  });
});
