"use client";

import { useEffect, useState } from "react";
import { api } from "@/utils/api";

export default function VendaPage() {
  const [categorias, setCategorias] = useState([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("");
  const [produtos, setProdutos] = useState([]);
  const [carrinho, setCarrinho] = useState([]);

  /* ================= BUSCAR CATEGORIAS ================= */
  useEffect(() => {
    async function buscarCategorias() {
      try {
        const res = await (await fetch(api.categorias.listar)).json();
        setCategorias(res);
      } catch (err) {
        console.error(err);
      }
    }

    buscarCategorias();
  }, []);

  /* ================= FINALIZAR VENDA ================= */
  function finalizarVenda() {
    alert("Venda finalizada! Total: R$ " + total().toFixed(2));
    setCarrinho([]);
  }

  /* ================= BUSCAR PRODUTOS ================= */
  async function buscarProdutosPorCategoria(id) {
    try {
      const res = await (
        await fetch(api.registros.listarPorCategoria(id))
      ).json();

      const formatados = res.map((p) => ({
        id: p.id,
        nome: p.nome || p.dadosJson?.nome || "Sem nome",
        preco: Number(p.preco) || 0,
        quantidade: Number(p.quantidade) || 0,
      }));

      setProdutos(formatados);
    } catch (err) {
      console.error(err);
    }
  }

  /* ================= SELECT CHANGE ================= */
  function handleCategoriaChange(e) {
    const id = e.target.value;
    setCategoriaSelecionada(id);

    if (id) {
      buscarProdutosPorCategoria(id);
    } else {
      setProdutos([]);
    }
  }

  /* ================= CARRINHO ================= */

  function adicionarProduto(produto) {
    const existente = carrinho.find((p) => p.id === produto.id);

    if (existente) {
      if (existente.quantidade >= produto.quantidade) {
        alert("Estoque insuficiente");
        return;
      }

      setCarrinho((prev) =>
        prev.map((p) =>
          p.id === produto.id ? { ...p, quantidade: p.quantidade + 1 } : p,
        ),
      );
    } else {
      if (produto.quantidade <= 0) {
        alert("Produto sem estoque");
        return;
      }

      setCarrinho((prev) => [...prev, { ...produto, quantidade: 1 }]);
    }
  }

  function alterarQuantidade(id, delta) {
    setCarrinho((prev) =>
      prev
        .map((p) => {
          const produtoOriginal = produtos.find((prod) => prod.id === id);

          if (!produtoOriginal) return p;

          const novaQuantidade = p.quantidade + delta;

          if (novaQuantidade > produtoOriginal.quantidade) {
            alert("Estoque máximo atingido");
            return p;
          }

          return { ...p, quantidade: novaQuantidade };
        })
        .filter((p) => p.quantidade > 0),
    );
  }

  function total() {
    return carrinho.reduce((acc, p) => acc + p.preco * p.quantidade, 0);
  }

  /* ================= UI ================= */

  return (
    <div className="p-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
      {/* PRODUTOS */}
      <div className="bg-white rounded-xl p-4 shadow">
        <h2 className="text-lg font-semibold mb-4">🛒 Produtos</h2>

        {/* SELECT */}
        <select
          value={categoriaSelecionada}
          onChange={handleCategoriaChange}
          className="w-full mb-4 p-2 border rounded"
        >
          <option value="">Selecione uma categoria</option>

          {categorias.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nome}
            </option>
          ))}
        </select>

        {/* LISTA */}
        <div className="space-y-2 max-h-[400px] overflow-auto">
          {produtos.length === 0 && (
            <p className="text-gray-400">Selecione uma categoria</p>
          )}

          {produtos.map((p) => (
            <div
              key={p.id}
              className="flex justify-between items-center border p-2 rounded hover:bg-gray-50"
            >
              <div>
                <p className="font-medium">{p.nome}</p>

                <p className="text-sm text-gray-500">R$ {p.preco.toFixed(2)}</p>

                <p className="text-xs text-gray-400">Estoque: {p.quantidade}</p>
              </div>

              <button
                onClick={() => adicionarProduto(p)}
                className="bg-black text-white px-3 py-1 rounded hover:bg-gray-800"
              >
                +
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* CARRINHO */}
      <div className="bg-white rounded-xl p-4 shadow flex flex-col">
        <h2 className="text-lg font-semibold mb-4">🧾 Carrinho</h2>

        <div className="flex-1 space-y-2 overflow-auto">
          {carrinho.length === 0 && (
            <p className="text-gray-400">Nenhum item</p>
          )}

          {carrinho.map((p) => (
            <div
              key={p.id}
              className="flex justify-between items-center border p-2 rounded"
            >
              <div>
                <p className="font-medium">{p.nome}</p>
                <p className="text-sm text-gray-500">R$ {p.preco.toFixed(2)}</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => alterarQuantidade(p.id, -1)}
                  className="px-2 bg-gray-200 rounded"
                >
                  -
                </button>

                <span>{p.quantidade}</span>

                <button
                  onClick={() => alterarQuantidade(p.id, 1)}
                  className="px-2 bg-gray-200 rounded"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* TOTAL */}
        <div className="mt-4 border-t pt-4">
          <p className="text-lg font-semibold">
            Total: R$ {total().toFixed(2)}
          </p>

          <button
            onClick={finalizarVenda}
            disabled={carrinho.length === 0}
            className="mt-3 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Finalizar Venda
          </button>
        </div>
      </div>
    </div>
  );
}
