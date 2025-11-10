# Migração para @rainer/design-tokens

## Status Atual

✅ **Biblioteca criada**: `@rainer/design-tokens` está criada e buildada em `../@rainer-design-tokens`  
✅ **Todos os tokens migrados**: Todos os design tokens foram copiados para a biblioteca  
⚠️ **Uso temporário local**: Devido a limitações do Turbopack com pacotes locais, estamos usando `@/constants/design-tokens` temporariamente

## Estrutura

- **Biblioteca**: `c:\Desenvolvimento\@rainer-design-tokens\`
- **Arquivo local (temporário)**: `constants/design-tokens.ts` (sincronizado com a biblioteca)

## Quando Publicar no NPM

Após publicar a biblioteca no npm:

1. Instalar a biblioteca:
   ```bash
   npm install @rainer/design-tokens
   ```

2. Atualizar todos os imports:
   ```bash
   # Substituir em todos os arquivos
   '@/constants/design-tokens' → '@rainer/design-tokens'
   ```

3. Remover o arquivo local:
   ```bash
   rm constants/design-tokens.ts
   ```

4. Atualizar `constants/index.ts`:
   ```typescript
   export * from '@rainer/design-tokens';
   ```

## Sincronização

Para sincronizar o arquivo local com a biblioteca:

```bash
# Da biblioteca para o frontend
cd @rainer-design-tokens
npm run build
Copy-Item src\index.ts ..\rainer-portfolio-frontend\constants\design-tokens.ts
```

## Testes

A biblioteca está funcional e pode ser testada localmente. Para usar diretamente (quando Turbopack suportar):

```typescript
import { GRADIENTS, SHADOWS, BACKGROUND } from '@rainer/design-tokens';
```

## Próximos Passos

1. Publicar biblioteca no npm (quando estiver pronto)
2. Migrar imports para '@rainer/design-tokens'
3. Remover arquivo local
4. Documentar processo de atualização da biblioteca

