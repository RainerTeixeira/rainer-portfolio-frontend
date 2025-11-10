/**
 * Script para criar primeiro usuário via backend
 * Uso: node scripts/criar-usuario.js
 */

const API_URL = 'http://localhost:4000';

async function criarUsuario() {
  console.log('🚀 Criando usuário no backend...\n');

  const userData = {
    fullName: 'Admin User',
    username: 'admin',
    email: 'admin@example.com',
    password: 'Admin123!',
  };

  try {
    console.log('📝 Registrando usuário...');
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Erro ao registrar');
    }

    console.log('✅ Usuário criado com sucesso!\n');
    console.log('📋 Credenciais:');
    console.log(`   Email: ${userData.email}`);
    console.log(`   Senha: ${userData.password}\n`);
    console.log('📧 Verifique seu email para confirmar!\n');
  } catch (error) {
    console.error('❌ Erro:', error.message);
  }
}

(async () => {
  try {
    await fetch(`${API_URL}/health`);
    await criarUsuario();
  } catch {
    console.error('❌ Backend não está rodando em http://localhost:4000');
  }
})();
