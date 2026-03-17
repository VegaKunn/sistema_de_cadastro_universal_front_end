"use client";

import { api } from "@/utils/api";
import { useState } from "react";

export default function CriarCategoriaPage() {
  const [nome, setNome] = useState("");
  const [slug, setSlug] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    // Reset
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await fetch(api.categorias.criar, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nome, slug }),
      });

      if (!res.ok) {
        throw new Error("Falha ao criar categoria");
      }

      const data = await res.json();
      setSuccess(`Categoria "${data.nome}" criada com sucesso!`);

      // Reset form
      setNome("");
      setSlug("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-lg p-6">
      <h1 className="mb-6 text-2xl font-semibold text-gray-800">
        Criar Categoria
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            className="mb-1 block font-medium text-gray-700"
            htmlFor="nome"
          >
            Nome
          </label>
          <input
            id="nome"
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-black focus:ring focus:ring-black/10"
            required
          />
        </div>

        <div>
          <label
            className="mb-1 block font-medium text-gray-700"
            htmlFor="slug"
          >
            Slug
          </label>
          <input
            id="slug"
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-black focus:ring focus:ring-black/10"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full rounded-md bg-black px-4 py-2 text-white shadow-sm transition hover:bg-gray-800 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Enviando..." : "Criar Categoria"}
        </button>

        {success && (
          <p className="mt-2 text-green-600 font-medium">{success}</p>
        )}

        {error && <p className="mt-2 text-red-600 font-medium">{error}</p>}
      </form>
    </div>
  );
}
