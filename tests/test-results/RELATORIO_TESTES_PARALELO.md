# Relatório de Execução de Testes Paralelos

**Data:** 13/11/2025, 12:03:34  
**Execução:** Paralela com até 15 grupos simultâneos

---

## 📊 Resumo Executivo

### Resultados por Grupo

- **Total de Grupos:** 15
- **Grupos com Sucesso:** 3 (20.0%)
- **Grupos com Falhas:** 12 (80.0%)

### Testes Falhados

- **Total de Testes Falhados Identificados:** 42

#### Lista de Testes Falhados:

1. `tests/app/dashboard/login/forgot-password/page.test.ts`
2. `tests/app/contato/page.test.ts`
3. `tests/app/dashboard/login/callback/page.test.ts`
4. `tests/app/blog/page.test.ts`
5. `tests/app/dashboard/login/register/page.test.ts`
6. `tests/app/cookies/page.test.ts`
7. `tests/app/dashboard/login/page.test.ts`
8. `tests/app/termos/page.test.ts`
9. `tests/app/privacidade/page.test.ts`
10. `tests/app/dashboard/login/reset-password/page.test.ts`
11. `tests/app/dashboard/login/verify-email-admin/page.test.ts`
12. `tests/app/sobre/page.test.ts`
13. `tests/app/dashboard/page.test.ts`
14. `tests/components/blog/hooks/use-posts.test.ts`
15. `tests/components/blog/comments/comments-list.test.ts`
16. `tests/components/blog/hooks/use-like.test.ts`
17. `tests/components/blog/hooks/use-categories.test.ts`
18. `tests/components/blog/hooks/use-comments.test.ts`
19. `tests/components/blog/search/search-results.test.ts`
20. `tests/components/blog/related-posts.test.ts`
21. `tests/components/blog/search/search-input.test.ts`
22. `tests/components/blog/hooks/use-reading-time.test.ts`
23. `tests/components/blog/hooks/use-search.test.ts`
24. `tests/components/blog/post-card.test.ts`
25. `tests/components/cookies/cookie-settings.test.ts`
26. `tests/components/dashboard/hooks/use-posts.test.ts`
27. `tests/components/dashboard/hooks/use-subcategories.test.ts`
28. `tests/components/dashboard/hooks/use-upload.test.ts`
29. `tests/components/dashboard/hooks/use-analytics-data.test.ts`
30. `tests/components/dashboard/hooks/use-autosave.test.ts`
31. `tests/components/dashboard/settings-form.test.ts`
32. `tests/components/dashboard/posts-table.test.ts`
33. `tests/components/dashboard/profile-header.test.ts`
34. `tests/components/home/carousel.test.ts`
35. `tests/components/providers/auth-context-provider.test.ts`
36. `tests/components/ui/alert.test.ts`
37. `tests/components/ui/card.test.ts`
38. `tests/components/sobre/team-card.test.ts`
39. `tests/components/ui/floating-grid.test.ts`
40. `tests/components/ui/cookie-banner.test.ts`
41. `tests/components/ui/separator.test.ts`
42. `tests/integration/api/posts.service.test.ts`


---

## 🔍 Análise de Erros

### Erros Mais Repetidos (Top 20)

1. **26 ocorrência(s)**: `(node_modules/@testing-library/dom/dist/config.js:37:19)`

2. **14 ocorrência(s)**: `URI malformed`

3. **12 ocorrência(s)**: `(node_modules/@testing-library/dom/dist/query-helpers.js:20:35)`

4. **12 ocorrência(s)**: `(node_modules/@testing-library/dom/dist/query-helpers.js:23:10)`

5. **7 ocorrência(s)**: `Error: AggregateError`

6. **7 ocorrência(s)**: `(C:\Desenvolvimento\rainer-portfolio-frontend\node_modules\jsdom\lib\jsdom\living\xhr\xhr-utils.js:62:19)`

7. **7 ocorrência(s)**: `(node_modules/jsdom/lib/jsdom/living/xhr/xhr-utils.js:65:53)`

8. **6 ocorrência(s)**: `Erro ao fazer login com OAuth: ApiError: Erro de rede. Verifique sua conexão.`

9. **6 ocorrência(s)**: `'Network request failed' },`

10. **6 ocorrência(s)**: `(hooks/useAuth.ts:482:17)`

11. **5 ocorrência(s)**: `(node_modules/jest-resolve/build/index.js:1117:17)`

12. **4 ocorrência(s)**: `Cannot read properties of undefined (reading 'map')`

13. **4 ocorrência(s)**: `An update to Carousel inside a test was not wrapped in act(...).`

14. **4 ocorrência(s)**: `An update to TestComponent inside a test was not wrapped in act(...).`

15. **4 ocorrência(s)**: `Received `true` for a non-boolean attribute `fill`.`

16. **3 ocorrência(s)**: `Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:`

17. **3 ocorrência(s)**: `Cannot read properties of null (reading 'useState')`

18. **3 ocorrência(s)**: `Unable to find an element with the text: /Social/i. This could be because the text is broken up by multiple elements. In this case, you can provide a ...`

19. **3 ocorrência(s)**: `Found multiple elements with the text: /Contato/i`

20. **3 ocorrência(s)**: `An update to BackToTopButton inside a test was not wrapped in act(...).`

### Erros Únicos/Críticos (Top 30)

1. **26 ocorrência(s)**: `(node_modules/@testing-library/dom/dist/config.js:37:19)`

2. **14 ocorrência(s)**: `URI malformed`

3. **12 ocorrência(s)**: `(node_modules/@testing-library/dom/dist/query-helpers.js:20:35)`

4. **12 ocorrência(s)**: `(node_modules/@testing-library/dom/dist/query-helpers.js:23:10)`

5. **7 ocorrência(s)**: `Error: AggregateError`

6. **7 ocorrência(s)**: `(C:\Desenvolvimento\rainer-portfolio-frontend\node_modules\jsdom\lib\jsdom\living\xhr\xhr-utils.js:62:19)`

7. **7 ocorrência(s)**: `(node_modules/jsdom/lib/jsdom/living/xhr/xhr-utils.js:65:53)`

8. **6 ocorrência(s)**: `Erro ao fazer login com OAuth: ApiError: Erro de rede. Verifique sua conexão.`

9. **6 ocorrência(s)**: `'Network request failed' },`

10. **6 ocorrência(s)**: `(hooks/useAuth.ts:482:17)`

11. **5 ocorrência(s)**: `(node_modules/jest-resolve/build/index.js:1117:17)`

12. **4 ocorrência(s)**: `Cannot read properties of undefined (reading 'map')`

13. **4 ocorrência(s)**: `Received `true` for a non-boolean attribute `fill`.`

14. **4 ocorrência(s)**: `An update to Carousel inside a test was not wrapped in act(...).`

15. **4 ocorrência(s)**: `An update to TestComponent inside a test was not wrapped in act(...).`

16. **3 ocorrência(s)**: `Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:`

17. **3 ocorrência(s)**: `Cannot read properties of null (reading 'useState')`

18. **3 ocorrência(s)**: `Found multiple elements with the text: /Contato/i`

19. **3 ocorrência(s)**: `Unable to find an element with the text: /Social/i. This could be because the text is broken up by multiple elements. In this case, you can provide a ...`

20. **3 ocorrência(s)**: `An update to BackToTopButton inside a test was not wrapped in act(...).`

21. **2 ocorrência(s)**: `Unable to find an element with the text: /Código/i. This could be because the text is broken up by multiple elements. In this case, you can provide a ...`

22. **2 ocorrência(s)**: `Found multiple elements with the text of: /Senha/i`

23. **2 ocorrência(s)**: `An update to ForwardRef(LoadableComponent) inside a test was not wrapped in act(...).`

24. **2 ocorrência(s)**: `Erro ao carregar comentários: TypeError: _services.commentsService.getCommentsByPost is not a function`

25. **2 ocorrência(s)**: `(components/blog/comments/comment-section.tsx:119:15)`

26. **2 ocorrência(s)**: `Cannot read properties of undefined (reading 'toLocaleString')`

27. **2 ocorrência(s)**: `Received `true` for a non-boolean attribute `priority`.`

28. **2 ocorrência(s)**: `An update to RecentPostsList inside a test was not wrapped in act(...).`

29. **1 ocorrência(s)**: `Found multiple elements with the text: /Cookies de Publicidade/i`

30. **1 ocorrência(s)**: `Found multiple elements with the text: /Política de Privacidade/i`

### Erros Críticos Identificados

1. TypeError
2. TypeError
3. TypeError
4. TypeError
5. TypeError
6. TypeError
7. TypeError
8. ReferenceError
9. is not a function
10. is not a function
11. is not a function
12. TypeError
13. TypeError
14. TypeError
15. TypeError
16. TypeError
17. is not a function
18. is not a function

---

## 📋 Detalhes por Grupo


### Grupo 1

- **Status:** ❌ Falhou
- **Duração:** 150.96s
- **Testes:** 13 arquivo(s)
- **Log Completo:** `tests\logs\group-1.log`
- **Log de Erros:** `tests\logs\group-1-errors.log`
- **Erro:** Command failed: npm test -- C:/Desenvolvimento/rainer-portfolio-frontend/tests/app/api/dashboard/analytics/route.test.ts C:/Desenvolvimento/rainer-portfolio-frontend/tests/app/api/dashboard/stats/rout...

**Arquivos de Teste:**
- `app\api\dashboard\analytics\route.test.ts`
- `app\api\dashboard\stats\route.test.ts`
- `app\blog\[slug]\page.test.tsx`
- `app\blog\page.test.tsx`
- `app\contato\page.test.tsx`
- `app\cookies\page.test.tsx`
- `app\cookies\settings\page.test.tsx`
- `app\dashboard\login\callback\page.test.tsx`
- `app\dashboard\login\confirm-email\page.test.tsx`
- `app\dashboard\login\forgot-password\page.test.tsx`
- `app\dashboard\login\page.test.tsx`
- `app\dashboard\login\register\page.test.tsx`
- `app\dashboard\login\reset-password\[token]\page.test.tsx`


### Grupo 2

- **Status:** ❌ Falhou
- **Duração:** 146.56s
- **Testes:** 13 arquivo(s)
- **Log Completo:** `tests\logs\group-2.log`
- **Log de Erros:** `tests\logs\group-2-errors.log`
- **Erro:** Command failed: npm test -- C:/Desenvolvimento/rainer-portfolio-frontend/tests/app/dashboard/login/reset-password/page.test.tsx C:/Desenvolvimento/rainer-portfolio-frontend/tests/app/dashboard/login/v...

**Arquivos de Teste:**
- `app\dashboard\login\reset-password\page.test.tsx`
- `app\dashboard\login\verify-email-admin\page.test.tsx`
- `app\dashboard\page.test.tsx`
- `app\dashboard\settings\page.test.tsx`
- `app\layout.test.tsx`
- `app\not-found.test.tsx`
- `app\page.test.tsx`
- `app\privacidade\page.test.tsx`
- `app\sobre\page.test.tsx`
- `app\termos\page.test.tsx`
- `components\accessibility\high-contrast-toggle.test.tsx`
- `components\accessibility\hooks\use-focus-trap.test.ts`
- `components\accessibility\hooks\use-high-contrast.test.ts`


### Grupo 3

- **Status:** ❌ Falhou
- **Duração:** 141.03s
- **Testes:** 13 arquivo(s)
- **Log Completo:** `tests\logs\group-3.log`
- **Log de Erros:** `tests\logs\group-3-errors.log`
- **Erro:** Command failed: npm test -- C:/Desenvolvimento/rainer-portfolio-frontend/tests/components/accessibility/hooks/use-keyboard-shortcuts.test.ts C:/Desenvolvimento/rainer-portfolio-frontend/tests/componen...

**Arquivos de Teste:**
- `components\accessibility\hooks\use-keyboard-shortcuts.test.ts`
- `components\accessibility\skip-to-content.test.tsx`
- `components\blog\author-card.test.tsx`
- `components\blog\comments\comment-form.test.tsx`
- `components\blog\comments\comment-item.test.tsx`
- `components\blog\comments\comments-list.test.tsx`
- `components\blog\comments\comments-section.test.tsx`
- `components\blog\hooks\use-bookmark.test.ts`
- `components\blog\hooks\use-categories.test.ts`
- `components\blog\hooks\use-comments.test.ts`
- `components\blog\hooks\use-like.test.ts`
- `components\blog\hooks\use-newsletter.test.ts`
- `components\blog\hooks\use-posts.test.ts`


### Grupo 4

- **Status:** ❌ Falhou
- **Duração:** 139.60s
- **Testes:** 13 arquivo(s)
- **Log Completo:** `tests\logs\group-4.log`
- **Log de Erros:** `tests\logs\group-4-errors.log`
- **Erro:** Command failed: npm test -- C:/Desenvolvimento/rainer-portfolio-frontend/tests/components/blog/hooks/use-reading-time.test.ts C:/Desenvolvimento/rainer-portfolio-frontend/tests/components/blog/hooks/u...

**Arquivos de Teste:**
- `components\blog\hooks\use-reading-time.test.ts`
- `components\blog\hooks\use-search.test.ts`
- `components\blog\hooks\use-table-of-contents.test.ts`
- `components\blog\newsletter-box.test.tsx`
- `components\blog\post-card.test.tsx`
- `components\blog\posts-carousel.test.tsx`
- `components\blog\reading-progress.test.tsx`
- `components\blog\related-posts.test.tsx`
- `components\blog\search\search-bar.test.tsx`
- `components\blog\search\search-input.test.tsx`
- `components\blog\search\search-results.test.tsx`
- `components\blog\social\bookmark-button.test.tsx`
- `components\blog\social\like-button.test.tsx`


### Grupo 5

- **Status:** ❌ Falhou
- **Duração:** 145.67s
- **Testes:** 13 arquivo(s)
- **Log Completo:** `tests\logs\group-5.log`
- **Log de Erros:** `tests\logs\group-5-errors.log`
- **Erro:** Command failed: npm test -- C:/Desenvolvimento/rainer-portfolio-frontend/tests/components/blog/social/reading-time.test.tsx C:/Desenvolvimento/rainer-portfolio-frontend/tests/components/blog/social/sh...

**Arquivos de Teste:**
- `components\blog\social\reading-time.test.tsx`
- `components\blog\social\share-button.test.tsx`
- `components\blog\table-of-contents.test.tsx`
- `components\contato\contact-form.test.tsx`
- `components\contato\hooks\use-contact-form.test.ts`
- `components\cookies\cookie-initializer.test.tsx`
- `components\cookies\cookie-settings.test.tsx`
- `components\dashboard\analytics-overview.test.tsx`
- `components\dashboard\change-email-dialog.test.tsx`
- `components\dashboard\change-username-dialog.test.tsx`
- `components\dashboard\charts\engagement-chart.test.tsx`
- `components\dashboard\charts\views-chart.test.tsx`
- `components\dashboard\help-center.test.tsx`


### Grupo 6

- **Status:** ❌ Falhou
- **Duração:** 136.36s
- **Testes:** 13 arquivo(s)
- **Log Completo:** `tests\logs\group-6.log`
- **Log de Erros:** `tests\logs\group-6-errors.log`
- **Erro:** Command failed: npm test -- C:/Desenvolvimento/rainer-portfolio-frontend/tests/components/dashboard/hooks/use-analytics-data.test.ts C:/Desenvolvimento/rainer-portfolio-frontend/tests/components/dashb...

**Arquivos de Teste:**
- `components\dashboard\hooks\use-analytics-data.test.ts`
- `components\dashboard\hooks\use-autosave.test.ts`
- `components\dashboard\hooks\use-dashboard-stats.test.ts`
- `components\dashboard\hooks\use-password-strength.test.ts`
- `components\dashboard\hooks\use-posts.test.ts`
- `components\dashboard\hooks\use-subcategories.test.ts`
- `components\dashboard\hooks\use-upload.test.ts`
- `components\dashboard\image-editor-panel.test.tsx`
- `components\dashboard\lib\markdown-converter.test.ts`
- `components\dashboard\lib\tiptap-utils.test.ts`
- `components\dashboard\login\forms\forgot-password-form.test.tsx`
- `components\dashboard\login\forms\register-form.test.tsx`
- `components\dashboard\login\forms\reset-password-form.test.tsx`


### Grupo 7

- **Status:** ❌ Falhou
- **Duração:** 136.54s
- **Testes:** 13 arquivo(s)
- **Log Completo:** `tests\logs\group-7.log`
- **Log de Erros:** `tests\logs\group-7-errors.log`
- **Erro:** Command failed: npm test -- C:/Desenvolvimento/rainer-portfolio-frontend/tests/components/dashboard/login/name-availability.test.tsx C:/Desenvolvimento/rainer-portfolio-frontend/tests/components/dashb...

**Arquivos de Teste:**
- `components\dashboard\login\name-availability.test.tsx`
- `components\dashboard\login\nickname-availability.test.tsx`
- `components\dashboard\login\password-input.test.tsx`
- `components\dashboard\login\status-badge.test.tsx`
- `components\dashboard\login\terms-dialog.test.tsx`
- `components\dashboard\posts-table.test.tsx`
- `components\dashboard\profile-form.test.tsx`
- `components\dashboard\profile-header.test.tsx`
- `components\dashboard\quick-actions.test.tsx`
- `components\dashboard\quick-stats.test.tsx`
- `components\dashboard\recent-posts.test.tsx`
- `components\dashboard\settings-form.test.tsx`
- `components\dashboard\stats-cards.test.tsx`


### Grupo 8

- **Status:** ❌ Falhou
- **Duração:** 137.10s
- **Testes:** 13 arquivo(s)
- **Log Completo:** `tests\logs\group-8.log`
- **Log de Erros:** `tests\logs\group-8-errors.log`
- **Erro:** Command failed: npm test -- C:/Desenvolvimento/rainer-portfolio-frontend/tests/components/dashboard/utils/format-stats.test.ts C:/Desenvolvimento/rainer-portfolio-frontend/tests/components/home/about-...

**Arquivos de Teste:**
- `components\dashboard\utils\format-stats.test.ts`
- `components\home\about-section.test.tsx`
- `components\home\carousel.test.tsx`
- `components\home\contact-section.test.tsx`
- `components\home\cta-section.test.tsx`
- `components\home\hero-section.test.tsx`
- `components\home\highlights.test.tsx`
- `components\home\hooks\use-carousel-keyboard.test.ts`
- `components\home\newsletter-section.test.tsx`
- `components\home\portfolio-showcase.test.tsx`
- `components\home\stats-showcase.test.tsx`
- `components\home\tech-stack.test.tsx`
- `components\home\testimonials.test.tsx`


### Grupo 9

- **Status:** ❌ Falhou
- **Duração:** 125.58s
- **Testes:** 13 arquivo(s)
- **Log Completo:** `tests\logs\group-9.log`
- **Log de Erros:** `tests\logs\group-9-errors.log`
- **Erro:** Command failed: npm test -- C:/Desenvolvimento/rainer-portfolio-frontend/tests/components/layout/footer.test.tsx C:/Desenvolvimento/rainer-portfolio-frontend/tests/components/layout/navbar.test.tsx C:...

**Arquivos de Teste:**
- `components\layout\footer.test.tsx`
- `components\layout\navbar.test.tsx`
- `components\providers\auth-context-provider.test.tsx`
- `components\providers\query-provider.test.tsx`
- `components\sobre\team-card.test.tsx`
- `components\theme\theme-toggle.test.tsx`
- `components\ui\alert-dialog.test.tsx`
- `components\ui\alert.test.tsx`
- `components\ui\avatar.test.tsx`
- `components\ui\back-to-top.test.tsx`
- `components\ui\badge.test.tsx`
- `components\ui\button.test.tsx`
- `components\ui\card.test.tsx`


### Grupo 10

- **Status:** ❌ Falhou
- **Duração:** 138.79s
- **Testes:** 13 arquivo(s)
- **Log Completo:** `tests\logs\group-10.log`
- **Log de Erros:** `tests\logs\group-10-errors.log`
- **Erro:** Command failed: npm test -- C:/Desenvolvimento/rainer-portfolio-frontend/tests/components/ui/celestial-background.test.tsx C:/Desenvolvimento/rainer-portfolio-frontend/tests/components/ui/checkbox.tes...

**Arquivos de Teste:**
- `components\ui\celestial-background.test.tsx`
- `components\ui\checkbox.test.tsx`
- `components\ui\command.test.tsx`
- `components\ui\cookie-banner.test.tsx`
- `components\ui\dialog.test.tsx`
- `components\ui\dropdown-menu.test.tsx`
- `components\ui\floating-grid.test.tsx`
- `components\ui\form.test.tsx`
- `components\ui\input.test.tsx`
- `components\ui\install-prompt.test.tsx`
- `components\ui\label.test.tsx`
- `components\ui\loading-states.test.tsx`
- `components\ui\page-header.test.tsx`


### Grupo 11

- **Status:** ❌ Falhou
- **Duração:** 138.20s
- **Testes:** 13 arquivo(s)
- **Log Completo:** `tests\logs\group-11.log`
- **Log de Erros:** `tests\logs\group-11-errors.log`
- **Erro:** Command failed: npm test -- C:/Desenvolvimento/rainer-portfolio-frontend/tests/components/ui/particles-effect.test.tsx C:/Desenvolvimento/rainer-portfolio-frontend/tests/components/ui/popover.test.tsx...

**Arquivos de Teste:**
- `components\ui\particles-effect.test.tsx`
- `components\ui\popover.test.tsx`
- `components\ui\progress.test.tsx`
- `components\ui\scroll-area.test.tsx`
- `components\ui\select.test.tsx`
- `components\ui\separator.test.tsx`
- `components\ui\sheet.test.tsx`
- `components\ui\skeleton.test.tsx`
- `components\ui\switch.test.tsx`
- `components\ui\tabs.test.tsx`
- `components\ui\textarea.test.tsx`
- `components\ui\tooltip.test.tsx`
- `components\ui\update-notification.test.tsx`


### Grupo 12

- **Status:** ❌ Falhou
- **Duração:** 130.53s
- **Testes:** 13 arquivo(s)
- **Log Completo:** `tests\logs\group-12.log`
- **Log de Erros:** `tests\logs\group-12-errors.log`
- **Erro:** Command failed: npm test -- C:/Desenvolvimento/rainer-portfolio-frontend/tests/components/ui/visually-hidden.test.tsx C:/Desenvolvimento/rainer-portfolio-frontend/tests/hooks/use-analytics.test.ts C:/...

**Arquivos de Teste:**
- `components\ui\visually-hidden.test.tsx`
- `hooks\use-analytics.test.ts`
- `hooks\use-mobile.test.ts`
- `hooks\use-pwa.test.ts`
- `hooks\use-smooth-scroll.test.ts`
- `hooks\useAuth.test.ts`
- `integration\api\auth.service.test.ts`
- `integration\api\bookmarks.service.test.ts`
- `integration\api\categories.service.test.ts`
- `integration\api\comments.service.test.ts`
- `integration\api\likes.service.test.ts`
- `integration\api\posts.service.test.ts`
- `integration\api\user.service.test.ts`


### Grupo 13

- **Status:** ✅ Sucesso
- **Duração:** 129.94s
- **Testes:** 13 arquivo(s)
- **Log Completo:** `tests\logs\group-13.log`
- **Log de Erros:** `tests\logs\group-13-errors.log`


**Arquivos de Teste:**
- `integration\api\users.service.test.ts`
- `integration\cookies.integration.test.ts`
- `lib\api-helpers.test.ts`
- `lib\api\client.test.ts`
- `lib\api\debug-utils.test.ts`
- `lib\api\helpers\post-helpers.test.ts`
- `lib\api\services\analytics.service.test.ts`
- `lib\api\services\auth.service.test.ts`
- `lib\api\services\bookmarks.service.test.ts`
- `lib\api\services\categories.service.test.ts`
- `lib\api\services\cloudinary.service.test.ts`
- `lib\api\services\comments.service.test.ts`
- `lib\api\services\dashboard.service.test.ts`


### Grupo 14

- **Status:** ✅ Sucesso
- **Duração:** 128.47s
- **Testes:** 13 arquivo(s)
- **Log Completo:** `tests\logs\group-14.log`
- **Log de Erros:** `tests\logs\group-14-errors.log`


**Arquivos de Teste:**
- `lib\api\services\likes.service.test.ts`
- `lib\api\services\posts.service.test.ts`
- `lib\api\services\users.service.test.ts`
- `lib\content\reading-time.test.ts`
- `lib\content\tiptap-utils.test.ts`
- `lib\cookies\analytics.test.ts`
- `lib\cookies\cookie-manager.test.ts`
- `lib\env.test.ts`
- `lib\monitoring\analytics.test.ts`
- `lib\monitoring\logger.test.ts`
- `lib\monitoring\performance.test.ts`
- `lib\seo\metadata.test.ts`
- `lib\seo\sitemap.test.ts`


### Grupo 15

- **Status:** ✅ Sucesso
- **Duração:** 94.48s
- **Testes:** 9 arquivo(s)
- **Log Completo:** `tests\logs\group-15.log`
- **Log de Erros:** `tests\logs\group-15-errors.log`


**Arquivos de Teste:**
- `lib\seo\structured-data.test.ts`
- `lib\utils.test.ts`
- `lib\utils\rainer-design-tokens.test.ts`
- `lib\utils\image-optimizer.test.ts`
- `lib\utils\post-compressor.test.ts`
- `lib\utils\scroll.test.ts`
- `lib\utils\search.test.ts`
- `lib\utils\string.test.ts`
- `lib\utils\validation.test.ts`


---

## 📁 Arquivos de Log

Todos os logs foram salvos em `tests/logs/`:

- **Grupo 1:** `tests\logs\group-1.log` (erros: `tests\logs\group-1-errors.log`)
- **Grupo 2:** `tests\logs\group-2.log` (erros: `tests\logs\group-2-errors.log`)
- **Grupo 3:** `tests\logs\group-3.log` (erros: `tests\logs\group-3-errors.log`)
- **Grupo 4:** `tests\logs\group-4.log` (erros: `tests\logs\group-4-errors.log`)
- **Grupo 5:** `tests\logs\group-5.log` (erros: `tests\logs\group-5-errors.log`)
- **Grupo 6:** `tests\logs\group-6.log` (erros: `tests\logs\group-6-errors.log`)
- **Grupo 7:** `tests\logs\group-7.log` (erros: `tests\logs\group-7-errors.log`)
- **Grupo 8:** `tests\logs\group-8.log` (erros: `tests\logs\group-8-errors.log`)
- **Grupo 9:** `tests\logs\group-9.log` (erros: `tests\logs\group-9-errors.log`)
- **Grupo 10:** `tests\logs\group-10.log` (erros: `tests\logs\group-10-errors.log`)
- **Grupo 11:** `tests\logs\group-11.log` (erros: `tests\logs\group-11-errors.log`)
- **Grupo 12:** `tests\logs\group-12.log` (erros: `tests\logs\group-12-errors.log`)
- **Grupo 13:** `tests\logs\group-13.log` (erros: `tests\logs\group-13-errors.log`)
- **Grupo 14:** `tests\logs\group-14.log` (erros: `tests\logs\group-14-errors.log`)
- **Grupo 15:** `tests\logs\group-15.log` (erros: `tests\logs\group-15-errors.log`)

---

## 🎯 Recomendações


### Prioridade Alta 🔴

1. **Corrigir grupos com falhas:** 12 grupo(s) falharam durante a execução
2. **Revisar erros repetidos:** 20 tipo(s) de erro se repetem, indicando problemas sistemáticos
3. **Investigar erros críticos:** 18 erro(s) crítico(s) identificado(s)

### Prioridade Média 🟡

1. **Analisar logs individuais:** Revisar logs em `tests/logs/` para detalhes específicos
2. **Executar testes falhados isoladamente:** Executar os 42 teste(s) falhado(s) para diagnóstico detalhado


---

**Relatório gerado automaticamente**  
**Localização:** `tests\test-results\RELATORIO_TESTES_PARALELO.md`
