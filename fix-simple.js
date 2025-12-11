// Script simples para adicionar props faltantes
const fs = require('fs');

// Ler o arquivo
let content = fs.readFileSync('app/blog/[slug]/page.tsx', 'utf8');

// Correções específicas
content = content.replace(
  /<Button\s+onClick={\(\) => router\.push\('\/blog'\)}\s+className="gap-2 dark:bg-cyan-600 dark:hover:bg-cyan-700"/g,
  '<Button variant="default" size="md" onClick={() => router.push(\'/blog\')} className="gap-2 dark:bg-cyan-600 dark:hover:bg-cyan-700"'
);

content = content.replace(
  /<Button\s+variant="outline"\s+size="icon"\s+onClick={\(\) => router\.push\('\/blog'\)}/g,
  '<Button variant="outline" size="icon" onClick={() => router.push(\'/blog\')}'
);

content = content.replace(
  /<Button\s+variant="ghost"\s+size="sm"\s+onClick={\(\) => router\.push\('\/blog'\)}/g,
  '<Button variant="ghost" size="sm" onClick={() => router.push(\'/blog\')}'
);

content = content.replace(
  /<Button\s+variant="outline"\s+size="lg"\s+onClick={\(\) => router\.push\('\/blog'\)}/g,
  '<Button variant="outline" size="lg" onClick={() => router.push(\'/blog\')}'
);

content = content.replace(
  /<Badge\s+className="bg-green-500\/10 text-green-600 dark:text-green-400 border-green-500\/30"/g,
  '<Badge variant="secondary" className="bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/30"'
);

content = content.replace(
  /<Badge\s+className="bg-gray-500\/10 text-gray-600 dark:text-gray-400 border-gray-500\/30"/g,
  '<Badge variant="secondary" className="bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/30"'
);

content = content.replace(
  /<Input\s+id="title"\s+placeholder="Digite o título do post"/g,
  '<Input type="text" id="title" className="w-full" placeholder="Digite o título do post"'
);

content = content.replace(
  /<Input\s+placeholder="Buscar por título ou descrição\.\.\."/g,
  '<Input type="text" placeholder="Buscar por título ou descrição..."'
);

// Salvar o arquivo
fs.writeFileSync('app/blog/[slug]/page.tsx', content);

console.log('Arquivo corrigido com sucesso!');
