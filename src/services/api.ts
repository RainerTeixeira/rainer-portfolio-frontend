export const fetchPosts = async () => {
    try {
        const response = await fetch("http://localhost:3000/posts");
        if (!response.ok) {
            throw new Error("Erro ao buscar os posts");
        }
        return response.json();  // Certifique-se de que o formato da resposta é um array
    } catch (err) {
        console.error("Erro ao carregar posts:", err);
        throw err;  // Lançar o erro para que o componente lide com isso
    }
};
