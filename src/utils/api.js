const BASE_URL = "http://localhost:3333/api/v1";

export const api = {
  /* =========================
   * 📂 CATEGORIAS
   * ========================= */
  categorias: {
    listar: `${BASE_URL}/categorias`,
    criar: `${BASE_URL}/categorias`,
    buscar: (id) => `${BASE_URL}/categorias/${id}`,
    atualizar: (id) => `${BASE_URL}/categorias/${id}`,
    deletar: (id) => `${BASE_URL}/categorias/${id}`,

    // 🔹 CAMPOS DA CATEGORIA (pivot)
    campos: (categoriaId) => `${BASE_URL}/categorias/${categoriaId}/campos`,
  },

  /* =========================
   * 🔸 CAMPOS (GLOBAL)
   * ========================= */
  campos: {
    criar: `${BASE_URL}/campos`,
    deletar: (id) => `${BASE_URL}/campos/${id}`,

    // 👉 só use se criar endpoint no backend
    // listar: `${BASE_URL}/campos`,
  },

  /* =========================
   * 📦 REGISTROS
   * ========================= */
  registros: {
    listarPorCategoria: (categoriaId) => `${BASE_URL}/registros/${categoriaId}`,
    criar: `${BASE_URL}/registros`,
    deletar: (id) => `${BASE_URL}/registros/${id}`,
  },
};
