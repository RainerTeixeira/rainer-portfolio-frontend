// Script final para corrigir erros de build
const fs = require('fs');
const path = require('path');

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  
  // Corrigir Buttons sem variant e size
  content = content.replace(
    /<Button\s+onClick={([^}]+)}\s+className="([^"]+)"/g,
    '<Button variant="default" size="lg" onClick={$1} className="$2"'
  );
  
  // Corrigir Buttons com variant mas sem size
  content = content.replace(
    /<Button\s+variant="([^"]+)"\s+onClick={([^}]+)}\s+className="([^"]+)"/g,
    '<Button variant="$1" size="lg" onClick={$2} className="$3"'
  );
  
  // Corrigir Buttons com size mas sem variant
  content = content.replace(
    /<Button\s+size="([^"]+)"\s+onClick={([^}]+)}\s+className="([^"]+)"/g,
    '<Button variant="default" size="$1" onClick={$2} className="$3"'
  );
  
  // Corrigir Badges sem variant
  content = content.replace(
    /<Badge\s+className="([^"]+)"/g,
    '<Badge variant="secondary" className="$1"'
  );
  
  // Corrigir Inputs sem type
  content = content.replace(
    /<Input\s+id="([^"]+)"\s+placeholder="([^"]+)"/g,
    '<Input type="text" id="$1" className="w-full" placeholder="$2"'
  );
  
  // Adicionar children undefined ao PageHeader
  content = content.replace(
    /<PageHeader\s+title="([^"]+)"\s+description="([^"]*)"\s*\/>/g,
    '<PageHeader title="$1" description="$2" children={undefined} />'
  );
  
  return content;
}

// Arquivos para corrigir
const files = [
  'app/blog/page.tsx',
  'app/blog/[slug]/page.tsx',
  'app/cookies/page.tsx',
  'app/cookies/settings/page.tsx',
  'app/dashboard/login/callback/page.tsx',
  'app/dashboard/login/confirm-email/page.tsx',
  'app/dashboard/login/reset-password/page.tsx',
  'app/dashboard/login/verify-email-admin/page.tsx',
  'app/dashboard/page.tsx',
  'app/dashboard/settings/page.tsx',
  'app/exemplos-tokens/page.tsx',
  'app/not-found.tsx',
  'app/sobre/page.tsx'
];

console.log('Corrigindo arquivos...');

for (const file of files) {
  if (fs.existsSync(file)) {
    const original = fs.readFileSync(file, 'utf8');
    const fixed = fixFile(file);
    
    if (original !== fixed) {
      fs.writeFileSync(file, fixed);
      console.log(`✅ Corrigido: ${file}`);
    } else {
      console.log(`⚪ Sem alterações: ${file}`);
    }
  } else {
    console.log(`❌ Não encontrado: ${file}`);
  }
}

console.log('\nConcluído!');
