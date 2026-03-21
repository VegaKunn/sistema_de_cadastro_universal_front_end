"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/utils/api";

export default function CadastrosPage() {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategorias() {
      try {
        const res = await fetch(api.categorias.listar);
        console.log(res);
        const data = await res.json();
        setCategorias(data);
      } catch (err) {
        console.error("Erro ao buscar categorias", err);
      } finally {
        setLoading(false);
      }
    }

    fetchCategorias();
  }, []);

  if (loading) return <p style={{ padding: 20 }}>Carregando...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1>Tipos de Cadastro</h1>

      <div
        style={{ display: "flex", gap: 20, marginTop: 20, flexWrap: "wrap" }}
      >
        {categorias.map((cat) => (
          <Link
            key={cat.slug}
            href={`/cadastros/${cat.slug}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div
              style={{
                background: "#fff",
                padding: 20,
                borderRadius: 8,
                width: 250,
                cursor: "pointer",
                boxShadow: "0 0 5px rgba(0,0,0,0.1)",
                border: "1px solid #eee",
              }}
            >
              <h3 style={{ margin: "0 0 10px 0" }}>{cat.nome}</h3>
              <p style={{ margin: 0, color: "#666" }}>Acessar</p>
            </div>
          </Link>
        ))}
      </div>

      <button
        onClick={() => (window.location.href = "criar_categorias")}
        style={{
          marginTop: 30,
          padding: "10px 20px",
          background: "#111",
          color: "#fff",
          border: "none",
          borderRadius: 6,
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        + Novo Tipo de Cadastro
      </button>
    </div>
  );
}
