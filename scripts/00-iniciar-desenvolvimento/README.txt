╔═══════════════════════════════════════════════════════════════════════════╗
║              🚀 INICIAR DESENVOLVIMENTO - NEXT.JS                          ║
╚═══════════════════════════════════════════════════════════════════════════╝

📋 DESCRIÇÃO
═══════════════════════════════════════════════════════════════════════════

Scripts para iniciar o ambiente de desenvolvimento Next.js.
Inclui verificação de dependências, instalação automática e limpeza de cache.

✅ Verificação automática de Node.js e npm
✅ Instalação automática de dependências (se necessário)
✅ Limpeza opcional de cache
✅ Inicia servidor com Turbopack
✅ Interface visual colorida

🚀 COMO USAR
═══════════════════════════════════════════════════════════════════════════

Windows - Duplo clique:
   ✨ iniciar-dev.bat  (Interface visual colorida!)

PowerShell:
   .\iniciar-dev.ps1
   .\iniciar-dev.ps1 --clean  (com limpeza de cache)

Linux/Mac:
   chmod +x iniciar-dev.sh
   ./iniciar-dev.sh
   ./iniciar-dev.sh --clean  (com limpeza de cache)

📊 O QUE O SCRIPT FAZ
═══════════════════════════════════════════════════════════════════════════

INICIAR-DEV:
  1. ✅ Verifica Node.js e npm
  2. ✅ Instala dependências (se necessário)
  3. ✅ Limpa cache (se --clean for passado)
  4. ✅ Inicia servidor Next.js com Turbopack
  
  URLs disponíveis:
    • Aplicação: http://localhost:3000
    • Hot Reload: Automático com Turbopack

⚙️ PRÉ-REQUISITOS
═══════════════════════════════════════════════════════════════════════════

✅ Node.js v18+ instalado
✅ npm instalado
✅ Dependências instaladas (npm install)

Porta necessária livre:
  • 3000 - Next.js Dev Server

💡 OPÇÕES DISPONÍVEIS
═══════════════════════════════════════════════════════════════════════════

--clean    Limpa cache antes de iniciar (.next e node_modules/.cache)

🔧 CARACTERÍSTICAS ESPECIAIS
═══════════════════════════════════════════════════════════════════════════

✨ Interface Visual Colorida:
   • Cores para cada etapa
   • Emojis para facilitar leitura
   • Feedback em tempo real

✨ Tratamento de Erros:
   • Valida cada etapa
   • Mensagens claras de erro
   • Dicas de solução
   • Exit codes apropriados

🆘 TROUBLESHOOTING
═══════════════════════════════════════════════════════════════════════════

❌ Erro: "Node.js não encontrado"
   → Instale Node.js v18+ em: https://nodejs.org
   → Reinicie o terminal
   → Execute o script novamente

❌ Erro: "Porta 3000 já está em uso"
   → Verifique: netstat -ano | findstr :3000 (Windows)
   → Verifique: lsof -i :3000 (Linux/Mac)
   → Finalize processo conflitante
   → Ou mude PORT no .env.local

❌ Erro ao instalar dependências
   → Verifique conexão com internet
   → Limpe cache: npm cache clean --force
   → Execute: npm install manualmente

💡 DICAS ÚTEIS
═══════════════════════════════════════════════════════════════════════════

✨ Primeira vez usando:
   Execute sem --clean (instala dependências se necessário)

✨ Após mudanças significativas:
   Use --clean para limpar cache e garantir rebuild completo

✨ Para parar o servidor:
   Ctrl+C no terminal

📚 SCRIPTS RELACIONADOS
═══════════════════════════════════════════════════════════════════════════

🔄 Limpar ambiente: scripts/04-limpar-ambiente/
🔍 Verificar setup: scripts/01-verificar-ambiente/
🧪 Testar: scripts/03-testes/
📊 Analisar: scripts/06-analise-debug/

════════════════════════════════════════════════════════════════════════════

Criado com ❤️ para facilitar o desenvolvimento! 🚀

