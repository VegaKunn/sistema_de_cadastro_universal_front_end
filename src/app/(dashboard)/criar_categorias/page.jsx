"use client";

import { api } from "@/utils/api";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function CriarCategoriaPage() {
  const router = useRouter();

  const [nome, setNome] = useState("");
  const [slug, setSlug] = useState("");

  const [campos, setCampos] = useState([]);
  const [camposSelecionados, setCamposSelecionados] = useState([]);

  const [loading, setLoading] = useState(false);
  const [loadingCampos, setLoadingCampos] = useState(true);

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Buscar campos disponíveis
  useEffect(() => {
    async function fetchCampos() {
      try {
        console.log(api.campos.criar);

        const res = await fetch(api.campos.criar);
        const data = await res.json();
        console.log(data);
        setCampos(data);
      } catch (err) {
        console.error("Erro ao buscar campos", err);
      } finally {
        setLoadingCampos(false);
      }
    }

    fetchCampos();
  }, []);

  function toggleCampo(id, checked) {
    setCamposSelecionados((prev) =>
      checked ? [...prev, id] : prev.filter((campoId) => campoId !== id),
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await fetch(api.categorias.criar, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome,
          slug,
          campos: camposSelecionados,
        }),
      });

      if (!res.ok) {
        throw new Error("Falha ao criar categoria");
      }

      const data = await res.json();

      setSuccess(`Categoria "${data.nome}" criada com sucesso!`);

      // Reset
      setNome("");
      setSlug("");
      setCamposSelecionados([]);

      // Opcional: redirecionar
      setTimeout(() => {
        router.push("/");
      }, 1000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return <></>;

  return (
    <div className="mx-auto max-w-2xl p-6">
      <h1 className="mb-6 text-2xl font-semibold text-gray-800">
        Criar Categoria
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Nome */}
        <div>
          <label className="mb-1 block font-medium text-gray-700">Nome</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full rounded-md border px-3 py-2 focus:border-black focus:ring focus:ring-black/10"
            required
          />
        </div>

        {/* Slug */}
        <div>
          <label className="mb-1 block font-medium text-gray-700">Slug</label>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="w-full rounded-md border px-3 py-2 focus:border-black focus:ring focus:ring-black/10"
            required
          />
        </div>

        {/* Campos */}
        <div>
          <label className="mb-2 block font-medium text-gray-700">
            Campos da Categoria
          </label>

          {loadingCampos ? (
            <p>Carregando campos...</p>
          ) : (
            <div className="space-y-2 rounded-md border p-4">
              {campos.map((campo) => (
                <label
                  key={campo.id}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={camposSelecionados.includes(campo.id)}
                    onChange={(e) => toggleCampo(campo.id, e.target.checked)}
                  />
                  <span>
                    {campo.label}{" "}
                    <span className="text-xs text-gray-500">
                      ({campo.tipo})
                    </span>
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Botão */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full rounded-md bg-black px-4 py-2 text-white transition hover:bg-gray-800 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Criando..." : "Criar Categoria"}
        </button>

        {/* Feedback */}
        {success && <p className="text-green-600 font-medium">{success}</p>}

        {error && <p className="text-red-600 font-medium">{error}</p>}
      </form>
    </div>
  );
}
