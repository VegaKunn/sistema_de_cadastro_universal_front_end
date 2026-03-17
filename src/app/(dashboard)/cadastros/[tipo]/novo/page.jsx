"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { api } from "@/utils/api";

export default function NovoCadastroPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.tipo;

  // Estados
  const [categoria, setCategoria] = useState(null);
  const [campos, setCampos] = useState([]);
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(true);
  const [issubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function carregar() {
      try {
        const resCat = await fetch(api.categorias.listar);
        const cats = await resCat.json();
        const cat = cats.find((c) => c.slug === slug);

        if (!cat) return;

        setCategoria(cat);

        const resCampos = await fetch(api.campos.listarPorCategoria(cat.id));
        const camposData = await resCampos.json();
        setCampos(camposData);
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
      } finally {
        setLoading(false);
      }
    }

    carregar();
  }, [slug]);

  // Handler simplificado e genérico
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(api.registros.criar, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          categoriaId: categoria.id,
          dados: form,
        }),
      });

      if (response.ok) {
        alert("Cadastro realizado com sucesso!");
        router.push(`/cadastros/${slug}`);
      } else {
        alert("Erro ao salvar. Verifique os dados.");
      }
    } catch (err) {
      console.error(err);
      alert("Erro de conexão com o servidor.");
    } finally {
      setIsSubmitting(false);
    }
  }

  // Estados de interface
  if (loading)
    return <div style={{ padding: 20 }}>Carregando formulário...</div>;
  if (!categoria)
    return (
      <div style={{ padding: 20 }}>Categoria "{slug}" não encontrada.</div>
    );

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1 style={{ marginBottom: 20, textTransform: "capitalize" }}>
        Novo {categoria.nome}
      </h1>

      <form
        onSubmit={handleSubmit}
        style={{
          background: "#fff",
          padding: "30px",
          borderRadius: "12px",
          maxWidth: "450px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
          border: "1px solid #eee",
        }}
      >
        {campos.map((campo) => (
          <div key={campo.id} style={{ marginBottom: 20 }}>
            <label
              style={{
                display: "block",
                marginBottom: 8,
                fontWeight: "600",
                fontSize: "14px",
                color: "#333",
              }}
            >
              {campo.label}
            </label>

            {campo.tipo === "textarea" ? (
              <textarea
                name={campo.nome}
                required
                onChange={handleChange}
                style={inputStyle}
                rows={4}
              />
            ) : (
              <input
                type={campo.tipo || "text"}
                name={campo.nome}
                required
                onChange={handleChange}
                style={inputStyle}
              />
            )}
          </div>
        ))}

        <button
          type="submit"
          disabled={issubmitting}
          style={{
            ...buttonStyle,
            opacity: issubmitting ? 0.7 : 1,
            cursor: issubmitting ? "not-allowed" : "pointer",
          }}
        >
          {issubmitting ? "Salvando..." : "Salvar Registro"}
        </button>
      </form>
    </div>
  );
}

// Objetos de estilo para manter o JSX limpo
const inputStyle = {
  width: "100%",
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  fontSize: "16px",
  boxSizing: "border-box", // Evita que o padding "estoure" a largura
};

const buttonStyle = {
  marginTop: "10px",
  width: "100%",
  padding: "12px",
  background: "#111",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  fontSize: "16px",
  fontWeight: "bold",
  transition: "background 0.2s",
};
