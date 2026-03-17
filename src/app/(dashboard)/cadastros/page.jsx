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

        const data = await res.json();

        setCategorias(data);
      } catch (err) {
        console.log("Erro ao buscar categorias", err);
      } finally {
        setLoading(false);
      }
    }

    fetchCategorias();
  }, []);

  if (loading) return <p>Carregando categorias...</p>;

  return (
    <div>
      <h1>Tipos de Cadastro</h1>

      <div style={{ display: "flex", gap: 20, marginTop: 20 }}>
        {categorias.map((cat) => (
          <Link key={cat.id} href={`/cadastros/${cat.slug}`}>
            <div
              style={{
                background: "#fff",
                padding: 20,
                borderRadius: 8,
                width: 220,
                cursor: "pointer",
                boxShadow: "0 0 5px rgba(0,0,0,0.1)",
              }}
            >
              <h3>{cat.nome}</h3>
              <p>Ver registros</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
