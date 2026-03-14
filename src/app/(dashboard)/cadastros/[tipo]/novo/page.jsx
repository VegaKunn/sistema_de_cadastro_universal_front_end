"use client";

import { useParams } from "next/navigation";
import { useState } from "react";

export default function NovoRegistroPage() {
  const { tipo } = useParams();

  const camposPorTipo = {
    alimentos: [
      { nome: "nome", label: "Nome do alimento", tipo: "text" },
      { nome: "preco", label: "Preço", tipo: "number" },
      { nome: "validade", label: "Data de validade", tipo: "date" },
      { nome: "quantidade", label: "Quantidade", tipo: "number" },
    ],
    produtos: [
      { nome: "nome", label: "Nome do produto", tipo: "text" },
      { nome: "codigo", label: "Código", tipo: "text" },
      { nome: "preco", label: "Preço", tipo: "number" },
    ],
    funcionarios: [
      { nome: "nome", label: "Nome", tipo: "text" },
      { nome: "cargo", label: "Cargo", tipo: "text" },
      { nome: "salario", label: "Salário", tipo: "number" },
    ],
  };

  const campos = camposPorTipo[tipo] || [];

  const [form, setForm] = useState({});

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const chave = "cadastros_" + tipo;
    const dadosSalvos = JSON.parse(localStorage.getItem(chave)) || [];

    const novoRegistro = {
      id: Date.now(),
      ...form,
    };

    dadosSalvos.push(novoRegistro);

    localStorage.setItem(chave, JSON.stringify(dadosSalvos));

    alert("Salvo com sucesso!");

    window.location.href = "/cadastros/" + tipo;
  }

  return (
    <div>
      <h1>Novo {tipo}</h1>

      <form
        onSubmit={handleSubmit}
        style={{
          background: "#fff",
          padding: 20,
          borderRadius: 8,
          width: 400,
          boxShadow: "0 0 5px rgba(0,0,0,0.1)",
        }}
      >
        {campos.map((campo) => (
          <div key={campo.nome} style={{ marginBottom: 15 }}>
            <label>{campo.label}</label>

            {campo.tipo === "textarea" ? (
              <textarea
                name={campo.nome}
                onChange={handleChange}
                style={{ width: "100%", padding: 8 }}
              />
            ) : (
              <input
                type={campo.tipo}
                name={campo.nome}
                onChange={handleChange}
                style={{ width: "100%", padding: 8 }}
              />
            )}
          </div>
        ))}

        <button
          style={{
            marginTop: 10,
            padding: "10px 20px",
            background: "#111",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
          }}
        >
          Salvar
        </button>
      </form>
    </div>
  );
}
