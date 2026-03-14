"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function TipoCadastroPage() {
  const { tipo } = useParams();
  const [registros, setRegistros] = useState([]);

  useEffect(() => {
    const chave = "cadastros_" + tipo;
    const dados = JSON.parse(localStorage.getItem(chave)) || [];
    setRegistros(dados);
  }, [tipo]);

  function excluir(id) {
    const chave = "cadastros_" + tipo;
    const dados = JSON.parse(localStorage.getItem(chave)) || [];

    const novos = dados.filter((r) => r.id !== id);

    localStorage.setItem(chave, JSON.stringify(novos));
    setRegistros(novos);
  }

  return (
    <div>
      <h1>Cadastro de {tipo}</h1>

      <Link href={`/cadastros/${tipo}/novo`}>
        <button
          style={{
            padding: "10px 20px",
            background: "#111",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
            marginBottom: 20,
          }}
        >
          + Novo Registro
        </button>
      </Link>

      <table
        style={{
          width: "100%",
          background: "#fff",
          borderRadius: 8,
          overflow: "hidden",
          boxShadow: "0 0 5px rgba(0,0,0,0.1)",
        }}
      >
        <thead style={{ background: "#eee" }}>
          <tr>
            <th style={{ padding: 10 }}>ID</th>
            <th style={{ padding: 10 }}>Dados</th>
            <th style={{ padding: 10 }}>Ações</th>
          </tr>
        </thead>

        <tbody>
          {registros.map((reg) => (
            <tr key={reg.id}>
              <td style={{ padding: 10 }}>{reg.id}</td>

              <td style={{ padding: 10 }}>
                {Object.entries(reg).map(([k, v]) =>
                  k !== "id" ? (
                    <div key={k}>
                      <strong>{k}:</strong> {v}
                    </div>
                  ) : null,
                )}
              </td>

              <td style={{ padding: 10 }}>
                <button onClick={() => excluir(reg.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
