/**
 * Teste simples de estrutura da API
 * Verifica se os endpoints retornam dados com fullName (User) e name (Category)
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

async function testApiStructure() {
  console.log('🧪 Testando estrutura da API...\n');

  try {
    // Teste 1: Verificar posts
    console.log('1️⃣  Testando endpoint /posts...');
    const postsResponse = await fetch(`${API_URL}/posts?limit=1`, {
      headers: { 'X-Database-Provider': 'PRISMA' },
    });

    if (postsResponse.ok) {
      const postsData = await postsResponse.json();
      if (postsData.success && postsData.posts && postsData.posts.length > 0) {
        const post = postsData.posts[0];
        console.log('   ✅ Posts retornados com sucesso');

        if (post.author) {
          if (post.author.fullName) {
            console.log(`   ✅ Author tem fullName: "${post.author.fullName}"`);
          } else {
            console.log('   ❌ Author não tem fullName');
          }
        }

        if (post.subcategory) {
          if (post.subcategory.name) {
            console.log(
              `   ✅ Subcategory tem name: "${post.subcategory.name}"`
            );
          } else {
            console.log('   ❌ Subcategory não tem name');
          }
          if (post.subcategory.fullName) {
            console.log('   ⚠️  Subcategory TEM fullName (deveria ser name)');
          }
        }
      } else {
        console.log('   ⚠️  Nenhum post retornado');
      }
    } else {
      console.log(
        `   ❌ Erro ${postsResponse.status}: ${postsResponse.statusText}`
      );
    }

    // Teste 2: Verificar categorias
    console.log('\n2️⃣  Testando endpoint /categories...');
    const categoriesResponse = await fetch(`${API_URL}/categories`, {
      headers: { 'X-Database-Provider': 'PRISMA' },
    });

    if (categoriesResponse.ok) {
      const categoriesData = await categoriesResponse.json();
      if (
        categoriesData.success &&
        categoriesData.data &&
        categoriesData.data.length > 0
      ) {
        const category = categoriesData.data[0];
        console.log('   ✅ Categorias retornadas com sucesso');

        if (category.name) {
          console.log(`   ✅ Category tem name: "${category.name}"`);
        } else {
          console.log('   ❌ Category não tem name');
        }

        if (category.fullName) {
          console.log('   ⚠️  Category TEM fullName (deveria ser name)');
        }
      } else {
        console.log('   ⚠️  Nenhuma categoria retornada');
      }
    } else {
      console.log(
        `   ❌ Erro ${categoriesResponse.status}: ${categoriesResponse.statusText}`
      );
    }

    // Teste 3: Verificar usuários
    console.log('\n3️⃣  Testando endpoint /users...');
    const usersResponse = await fetch(`${API_URL}/users?limit=1`, {
      headers: { 'X-Database-Provider': 'PRISMA' },
    });

    if (usersResponse.ok) {
      const usersData = await usersResponse.json();
      if (usersData.success && usersData.data && usersData.data.length > 0) {
        const user = usersData.data[0];
        console.log('   ✅ Usuários retornados com sucesso');

        if (user.fullName) {
          console.log(`   ✅ User tem fullName: "${user.fullName}"`);
        } else {
          console.log('   ❌ User não tem fullName');
        }

        if (user.name) {
          console.log('   ⚠️  User TEM name (deveria ser fullName)');
        }
      } else {
        console.log('   ⚠️  Nenhum usuário retornado');
      }
    } else {
      console.log(
        `   ❌ Erro ${usersResponse.status}: ${usersResponse.statusText}`
      );
    }

    console.log('\n✅ Testes de estrutura concluídos!\n');
  } catch (error: any) {
    console.error('❌ Erro ao testar API:', error.message);
  }
}

testApiStructure();
