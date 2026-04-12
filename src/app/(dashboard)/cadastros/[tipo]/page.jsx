"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { api } from "@/utils/api";

/* ================= HELPERS ================= */

function formatarLabel(chave) {
  const labels = {
    sku: "SKU",
    nome: "Nome",
    preco: "Preço",
    quantidade: "Estoque",
    ativo: "Status",
    marca: "Marca",
    modelo: "Modelo",
    peso: "Peso",
    validade: "Validade",
    codigo_barra: "Código de Barras",
    created_at: "Criado em",
    updated_at: "Atualizado em",
  };

  return (
    labels[chave] ||
    chave.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
  );
}

function formatarValor(chave, valor) {
  if (valor === null || valor === undefined) return "-";

  // STATUS (badge)
  if (chave === "ativo") {
    return valor ? (
      <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded">
        Ativo
      </span>
    ) : (
      <span className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded">
        Inativo
      </span>
    );
  }

  // PREÇO
  if (chave.toLowerCase().includes("preco")) {
    return `R$ ${Number(valor).toFixed(2)}`;
  }

  // DATA
  if (
    chave.toLowerCase().includes("data") ||
    chave.toLowerCase().includes("validade")
  ) {
    try {
      return new Date(valor).toLocaleDateString("pt-BR");
    } catch {
      return valor;
    }
  }

  // ARRAY
  if (Array.isArray(valor)) {
    return valor.join(", ");
  }

  // OBJETO
  if (typeof valor === "object") {
    return JSON.stringify(valor);
  }

  return valor;
}

/* ================= COMPONENT ================= */

export default function ListagemCadastrosPage() {
  const params = useParams();
  const slug = params.tipo;

  const [categoria, setCategoria] = useState(null);
  const [registros, setRegistros] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarDados() {
      try {
        const resCat = await fetch(api.categorias.listar);
        const categorias = await resCat.json();

        const cat = categorias.find((c) => c.slug === slug);

        if (!cat) {
          setLoading(false);
          return;
        }

        setCategoria(cat);

        const resReg = await fetch(api.registros.listarPorCategoria(cat.id));
        const registrosData = await resReg.json();

        setRegistros(registrosData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    carregarDados();
  }, [slug]);

  /* ================= LOADING ================= */

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center text-gray-500">
        <div className="animate-pulse">Carregando dados...</div>
      </div>
    );
  }

  /* ================= NOT FOUND ================= */

  if (!categoria) {
    return (
      <div className="flex h-64 items-center justify-center text-red-500 font-medium">
        Categoria não encontrada
      </div>
    );
  }

  /* ================= GERAR COLUNAS DINÂMICAS ================= */

  const colunasIgnorar = ["dadosJson"];

  const colunas = Array.from(
    new Set(
      registros.flatMap((r) => [
        ...Object.keys(r || {}),
        ...Object.keys(r?.dadosJson || {}),
      ]),
    ),
  ).filter((chave) => !colunasIgnorar.includes(chave));

  /* ================= UI ================= */

  return (
    <div className="mx-auto max-w-6xl p-6">
      {/* HEADER */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-800">
          {categoria.nome}
        </h1>

        <Link href={`/cadastros/${slug}/novo`}>
          <button className="rounded-xl bg-black px-4 py-2 text-white shadow-sm transition hover:bg-gray-800 active:scale-95">
            + Novo Cadastro
          </button>
        </Link>
      </div>

      {/* EMPTY */}
      {registros.length === 0 ? (
        <div className="rounded-xl border border-gray-200 bg-gray-50 py-16 text-center">
          <p className="mb-4 text-gray-500">Nenhum registro encontrado</p>

          <Link href={`/cadastros/${slug}/novo`}>
            <button className="rounded-xl bg-black px-4 py-2 text-white hover:bg-gray-800">
              Criar primeiro cadastro
            </button>
          </Link>
        </div>
      ) : (
        /* TABELA */
        <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-100 text-gray-600">
                <tr>
                  {colunas.map((chave) => (
                    <th key={chave} className="px-4 py-3 text-left font-medium">
                      {formatarLabel(chave)}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {registros.map((r, i) => {
                  const dadosCompletos = {
                    ...r,
                    ...(r.dadosJson || {}),
                  };

                  return (
                    <tr
                      key={r.id ?? i}
                      className={`border-t hover:bg-gray-50 ${
                        i % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                      }`}
                    >
                      {colunas.map((chave) => {
                        const valor = dadosCompletos[chave] ?? "-";

                        return (
                          <td key={chave} className="px-4 py-3 text-gray-700">
                            {formatarValor(chave, valor)}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
