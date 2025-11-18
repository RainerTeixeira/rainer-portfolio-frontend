# Migração para @rainer/rainer-design-tokens

## Status Atual

✅ **Biblioteca criada**: `@rainer/rainer-design-tokens` está criada e buildada em `../@rainer-design-tokens`  
✅ **Todos os tokens migrados**: Todos os design tokens foram copiados para a biblioteca  
⚠️ **Uso temporário local**: Devido a limitações do Turbopack com pacotes locais, estamos usando `@/constants/rainer-design-tokens` temporariamente

## Estrutura

- **Biblioteca**: `c:\Desenvolvimento\@rainer-design-tokens\`
- **Arquivo local (temporário)**: `constants/rainer-design-tokens.ts` (sincronizado com a biblioteca)

## Quando Publicar no NPM

Após publicar a biblioteca no npm:

1. Instalar a biblioteca:

   ```bash
   npm install @rainer/rainer-design-tokens
   ```

2. Atualizar todos os imports:

   ```bash
   # Substituir em todos os arquivos
   '@/constants/rainer-design-tokens' → '@rainer/rainer-design-tokens'
   ```

3. Remover o arquivo local:

   ```bash
   rm constants/rainer-design-tokens.ts
   ```

4. Atualizar `constants/index.ts`:
   ```typescript
   export * from '@rainer/rainer-design-tokens';
   ```

## Sincronização

Para sincronizar o arquivo local com a biblioteca:

```bash
# Da biblioteca para o frontend
cd @rainer-design-tokens
npm run build
Copy-Item src\index.ts ..\rainer-portfolio-frontend\constants\rainer-design-tokens.ts
```

## Testes

A biblioteca está funcional e pode ser testada localmente. Para usar diretamente (quando Turbopack suportar):

```typescript
import { GRADIENTS, SHADOWS, BACKGROUND } from '@rainer/rainer-design-tokens';
```

## Próximos Passos

1. Publicar biblioteca no npm (quando estiver pronto)
2. Migrar imports para '@rainer/rainer-design-tokens'
3. Remover arquivo local
4. Documentar processo de atualização da biblioteca
