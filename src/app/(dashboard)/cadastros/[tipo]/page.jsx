"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { api } from "@/utils/api";

export default function ListagemCadastrosPage() {
  const params = useParams();
  const slug = params.tipo;

  const [categoria, setCategoria] = useState(null);
  const [campos, setCampos] = useState([]);
  const [registros, setRegistros] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarDados() {
      try {
        const resCat = await fetch(api.categorias.listar);
        //   console.log(resCat);

        const categorias = await resCat.json();
        //     console.log(categorias);

        const cat = categorias.find((c) => c.slug === slug);
        //      console.log(cat);

        if (!cat) {
          setLoading(false);
          return;
        }
        setCategoria(cat);
        console.log(cat);

        const resCampos = await fetch(api.campos.criar);

        console.log(resCampos);

        setCampos(await resCampos.json());

        console.log(resCampos);

        const resReg = await fetch(api.registros.listarPorCategoria(cat.id));
        console.log(resReg);
        const registrosData = await resReg.json();
        console.log(registrosData);
        // return;
        // const convertidos = registrosData.map((r) => ({
        //   ...r,
        //   dados: JSON.parse(r.dadosJson),
        // }));

        setRegistros(registrosData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    carregarDados();
  }, [slug]);

  function renderValor(valor) {
    if (!valor) return "-";
    if (typeof valor === "object") return JSON.stringify(valor);
    return valor;
  }

  // 🔄 Loading
  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center text-gray-500">
        <div className="animate-pulse">Carregando dados...</div>
      </div>
    );
  }

  // ❌ Not found
  if (!categoria) {
    return (
      <div className="flex h-64 items-center justify-center text-red-500 font-medium">
        Categoria não encontrada
      </div>
    );
  }

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

      {/* EMPTY STATE */}
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
                  {/* Cabeçalho automático */}
                  {registros && registros.length > 0 ? (
                    Object.keys({
                      ...registros[0],
                      ...(registros[0].dadosJson || {}),
                    })
                      .filter((chave) => chave !== "dadosJson") // opcional: esconder dadosJson cru
                      .map((chave) => (
                        <th
                          key={chave}
                          className="px-4 py-3 text-left font-medium"
                        >
                          {chave}
                        </th>
                      ))
                  ) : (
                    <th className="px-4 py-3 text-left font-medium">
                      Nenhum dado
                    </th>
                  )}
                </tr>
              </thead>

              <tbody>
                {Array.isArray(registros) && registros.length > 0 ? (
                  registros.map((r, i) => {
                    if (!r || typeof r !== "object") return null;

                    const dadosCompletos = {
                      ...r,
                      ...(r.dadosJson && typeof r.dadosJson === "object"
                        ? r.dadosJson
                        : {}),
                    };

                    return (
                      <tr
                        key={r.id ?? i}
                        className={`border-t transition hover:bg-gray-50 ${
                          i % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                        }`}
                      >
                        {Object.entries(dadosCompletos)
                          .filter(([chave]) => chave !== "dadosJson") // opcional
                          .map(([chave, valor], ci) => {
                            let valorFinal;
                            try {
                              valorFinal =
                                typeof renderValor === "function"
                                  ? renderValor(valor ?? "-")
                                  : (valor ?? "-");
                            } catch (e) {
                              console.error("Erro renderValor:", e);
                              valorFinal = "-";
                            }

                            return (
                              <td
                                key={`${chave}-${ci}`}
                                className="px-4 py-3 text-gray-700"
                              >
                                {String(valorFinal)}
                              </td>
                            );
                          })}
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      className="px-4 py-3 text-gray-400 italic"
                      colSpan={100}
                    >
                      Nenhum registro encontrado
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
