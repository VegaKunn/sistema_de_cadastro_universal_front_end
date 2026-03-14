"use client";

import Link from "next/link";

export default function CadastrosPage() {
  const tipos = [
    { nome: "Alimentos", slug: "alimentos" },
    { nome: "Produtos Manufaturados", slug: "produtos" },
    { nome: "Funcionários", slug: "funcionarios" },
  ];

  return (
    <div>
      <h1>Tipos de Cadastro</h1>

      <div style={{ display: "flex", gap: 20, marginTop: 20 }}>
        {tipos.map((tipo) => (
          <Link key={tipo.slug} href={`/cadastros/${tipo.slug}`}>
            <div
              style={{
                background: "#fff",
                padding: 20,
                borderRadius: 8,
                width: 200,
                cursor: "pointer",
                boxShadow: "0 0 5px rgba(0,0,0,0.1)",
              }}
            >
              <h3>{tipo.nome}</h3>
              <p>Acessar</p>
            </div>
          </Link>
        ))}
      </div>

      <button
        style={{
          marginTop: 30,
          padding: "10px 20px",
          background: "#111",
          color: "#fff",
          border: "none",
          borderRadius: 6,
          cursor: "pointer",
        }}
      >
        + Novo Tipo de Cadastro
      </button>
    </div>
  );
}
