"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { api } from "@/utils/api";

export default function NovoCadastroPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.tipo;

  const [categoria, setCategoria] = useState(null);
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(true);
  const [issubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function carregar() {
      try {
        setLoading(true);

        // Buscar categoria
        const resCat = await fetch(api.categorias.listar);
        const cats = await resCat.json();
        const cat = cats.find((c) => c.slug === slug);
        if (!cat) return;
        setCategoria(cat);
        console.log(cat.campos);
        // Inicializar form com todos os campos
        const formInicial = {};
        (cat.campos || []).forEach((campo) => {
          formInicial[campo.nome] = campo.tipo === "imagem" ? null : ""; // imagem começa null
        });
        setForm(formInicial);
      } catch (err) {
        console.error("Erro ao carregar categoria:", err);
      } finally {
        setLoading(false);
      }
    }

    carregar();
  }, [slug]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      setForm((prev) => ({ ...prev, [name]: files[0] || null }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("categoriaId", categoria.id);

      // Adiciona todos os campos no FormData
      Object.entries(form).forEach(([key, value]) => {
        if (value instanceof File) {
          formData.append(key, value);
        } else {
          formData.append(key, value);
        }
      });

      const response = await fetch(api.registros.criar, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Cadastro realizado com sucesso!");
        router.push(`/cadastros/${slug}`);
      } else {
        const errText = await response.text();
        console.error("Erro ao salvar:", errText);
        alert("Erro ao salvar. Verifique os dados.");
      }
    } catch (err) {
      console.error(err);
      alert("Erro de conexão com o servidor.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
          maxWidth: "500px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
          border: "1px solid #eee",
        }}
      >
        {(categoria.campos || []).map((campo) => {
          let inputElement = null;

          // Renderização condicional baseada no tipo do campo
          switch (campo.tipo) {
            case "texto":
              inputElement = (
                <input
                  type="text"
                  name={campo.nome}
                  value={form[campo.nome] || ""}
                  onChange={handleChange}
                  style={inputStyle}
                  required={campo.pivot?.obrigatorio}
                />
              );
              break;

            case "numero":
              inputElement = (
                <input
                  type="number"
                  name={campo.nome}
                  value={form[campo.nome] || ""}
                  onChange={handleChange}
                  style={inputStyle}
                  required={campo.pivot?.obrigatorio}
                />
              );
              break;

            case "decimal":
              inputElement = (
                <input
                  type="number"
                  step="0.01"
                  name={campo.nome}
                  value={form[campo.nome] || ""}
                  onChange={handleChange}
                  style={inputStyle}
                  required={campo.pivot?.obrigatorio}
                />
              );
              break;

            case "data":
              inputElement = (
                <input
                  type="date"
                  name={campo.nome}
                  value={form[campo.nome] || ""}
                  onChange={handleChange}
                  style={inputStyle}
                  required={campo.pivot?.obrigatorio}
                />
              );
              break;

            case "checkbox":
              inputElement = (
                <input
                  type="checkbox"
                  name={campo.nome}
                  checked={!!form[campo.nome]} // Checkbox usa checked
                  onChange={(e) => {
                    // Pequeno ajuste para o handleChange lidar com booleanos
                    handleChange({
                      target: {
                        name: campo.nome,
                        value: e.target.checked,
                      },
                    });
                  }}
                />
              );
              break;

            case "select":
              inputElement = (
                <select
                  name={campo.nome}
                  value={form[campo.nome] || ""}
                  onChange={handleChange}
                  style={inputStyle}
                  required={campo.pivot?.obrigatorio}
                >
                  <option value="">Selecione...</option>
                  {(campo.opcoes || []).map((opcao) => (
                    <option key={opcao} value={opcao}>
                      {opcao}
                    </option>
                  ))}
                </select>
              );
              break;

            case "imagem":
              inputElement = (
                <input
                  type="file"
                  name={campo.nome}
                  accept="image/*"
                  onChange={(e) => {
                    // Para arquivos, passamos o arquivo inteiro
                    handleChange({
                      target: {
                        name: campo.nome,
                        value: e.target.files[0],
                      },
                    });
                  }}
                  required={campo.pivot?.obrigatorio}
                />
              );
              break;

            default:
              inputElement = (
                <input
                  type="text"
                  name={campo.nome}
                  value={form[campo.nome] || ""}
                  onChange={handleChange}
                  style={inputStyle}
                />
              );
          }

          return (
            <div
              key={campo.id}
              style={{
                marginBottom: 20,
                display: campo.tipo === "checkbox" ? "flex" : "block",
                alignItems: "center",
              }}
            >
              <label
                style={{
                  ...labelStyle,
                  marginRight: campo.tipo === "checkbox" ? 10 : 0,
                }}
              >
                {campo.label}
                {campo.pivot?.obrigatorio && (
                  <span style={{ color: "red" }}> *</span>
                )}
              </label>
              {inputElement}
            </div>
          );
        })}

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

// Estilos
const labelStyle = {
  display: "block",
  marginBottom: 8,
  fontWeight: "600",
  fontSize: "14px",
  color: "#333",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  fontSize: "16px",
  boxSizing: "border-box",
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
