const BASE_URL = "http://localhost:3333/api/v1";

export const api = {
  categorias: {
    listar: `${BASE_URL}/categorias`,
    criar: `${BASE_URL}/categorias`,
    buscar: (id) => `${BASE_URL}/categorias/${id}`,
    deletar: (id) => `${BASE_URL}/categorias/${id}`,
  },

  campos: {
    listarPorCategoria: (categoriaId) =>
      `${BASE_URL}/categorias/${categoriaId}/campos`,
    criar: `${BASE_URL}/campos`,
    deletar: (id) => `${BASE_URL}/campos/${id}`,
  },

  registros: {
    listarPorCategoria: (categoriaId) => `${BASE_URL}/registros/${categoriaId}`,
    criar: `${BASE_URL}/registros`,
    deletar: (id) => `${BASE_URL}/registros/${id}`,
  },
};
