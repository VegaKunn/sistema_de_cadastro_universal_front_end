"use client";

export default function Apresentacao() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-4xl rounded-2xl bg-white p-8 shadow">
        {/* TÍTULO */}
        <h1 className="mb-6 text-3xl font-bold text-gray-800">
          📘 Sistema de Cadastro Dinâmico de Produtos
        </h1>

        {/* INTRODUÇÃO */}
        <Section title="🧠 1. Introdução">
          <p>
            Este projeto tem como objetivo desenvolver um sistema de cadastro de
            produtos genérico e flexível, capaz de atender diferentes segmentos:
          </p>

          <ul className="mt-3 list-disc pl-6">
            <li>Supermercados</li>
            <li>Lojas de roupas</li>
            <li>Autopeças</li>
            <li>Materiais diversos</li>
          </ul>

          <p className="mt-3">
            Diferente de sistemas tradicionais, este permite criar campos
            personalizados dinamicamente, evitando alterações constantes no
            banco.
          </p>
        </Section>

        {/* OBJETIVO */}
        <Section title="🎯 2. Objetivo do Sistema">
          <ul className="list-disc pl-6">
            <li>Ser reutilizável para diferentes negócios</li>
            <li>Evitar migrations frequentes</li>
            <li>Permitir flexibilidade no cadastro</li>
            <li>Manter organização dos dados</li>
          </ul>
        </Section>

        {/* MODELAGEM */}
        <Section title="🏗️ 3. Modelagem do Banco">
          <p>O sistema utiliza uma abordagem híbrida combinando:</p>
          <ul className="mt-3 list-disc pl-6">
            <li>Banco relacional tradicional</li>
            <li>Dados dinâmicos em JSON</li>
          </ul>
        </Section>

        {/* TABELAS */}
        <Section title="🧩 4. Estrutura das Tabelas">
          <Table title="📂 Categorias">
            {["id", "nome", "slug", "timestamps"]}
          </Table>

          <Table title="🧾 Campos">
            {["id", "nome", "label", "tipo", "opcoes (JSON)", "config (JSON)"]}
          </Table>

          <Table title="🔗 Categoria_Campos">
            {[
              "categoria_id",
              "campo_id",
              "obrigatorio",
              "ordem",
              "label_override",
              "config_override",
            ]}
          </Table>

          <Table title="📦 Registros">
            {[
              "id",
              "categoria_id",
              "dados_json",
              "sku",
              "nome",
              "preco",
              "quantidade",
              "ativo",
              "tags",
              "marca",
              "modelo",
              "peso",
              "unidade",
              "validade",
              "codigo_barra",
              "imagem",
              "timestamps",
            ]}
          </Table>
        </Section>

        {/* JSON */}
        <Section title="🧠 5. Dados Dinâmicos (JSON)">
          <p>Exemplos:</p>

          <CodeBlock>
            {`Camiseta:
{
  "cor": "preto",
  "tamanho": "M"
}

Arroz:
{
  "tipo": "integral",
  "origem": "Brasil"
}`}
          </CodeBlock>
        </Section>

        {/* FUNCIONAMENTO */}
        <Section title="⚙️ 6. Funcionamento">
          <ol className="list-decimal pl-6">
            <li>Criar categoria</li>
            <li>Definir campos</li>
            <li>Associar campos à categoria</li>
            <li>Cadastrar produto</li>
            <li>Salvar dados dinâmicos em JSON</li>
          </ol>
        </Section>

        {/* JUSTIFICATIVA */}
        <Section title="💡 7. Justificativa Técnica">
          <ul className="list-disc pl-6">
            <li>✔ Alta flexibilidade</li>
            <li>✔ Redução de migrations</li>
            <li>✔ Reutilização do sistema</li>
            <li>✔ Escalabilidade</li>
          </ul>
        </Section>

        {/* VANTAGENS */}
        <Section title="⚖️ 8. Vantagens e Desvantagens">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <h3 className="font-semibold text-green-600">✅ Vantagens</h3>
              <ul className="list-disc pl-6">
                <li>Flexível</li>
                <li>Reutilizável</li>
                <li>Menor acoplamento</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-red-500">⚠️ Desvantagens</h3>
              <ul className="list-disc pl-6">
                <li>Consultas mais complexas</li>
                <li>Performance em JSON</li>
                <li>Maior complexidade</li>
              </ul>
            </div>
          </div>
        </Section>

        {/* FUTURO */}
        <Section title="🚀 9. Melhorias Futuras">
          <ul className="list-disc pl-6">
            <li>Variações de produtos (SKU)</li>
            <li>Controle de estoque separado</li>
            <li>Indexação de JSON</li>
            <li>Permissões de usuário</li>
            <li>Multi-empresa</li>
          </ul>
        </Section>

        {/* CONCLUSÃO */}
        <Section title="🧾 10. Conclusão">
          <p>
            O sistema demonstra uma abordagem moderna de modelagem de dados,
            combinando flexibilidade e desacoplamento.
          </p>

          <p className="mt-3">
            Apesar da maior complexidade, destaca-se pela capacidade de
            reutilização e adaptação, sendo uma alternativa eficiente aos
            modelos tradicionais.
          </p>
        </Section>
      </div>
    </div>
  );
}

/* ================= COMPONENTES ================= */

function Section({ title, children }) {
  return (
    <div className="mb-8">
      <h2 className="mb-3 text-xl font-semibold text-gray-800">{title}</h2>
      <div className="text-gray-600">{children}</div>
    </div>
  );
}

function Table({ title, children }) {
  return (
    <div className="mb-4">
      <h3 className="mb-2 font-semibold text-gray-700">{title}</h3>
      <div className="rounded-lg bg-gray-100 p-3 text-sm">
        {children.map((item, i) => (
          <div key={i}>- {item}</div>
        ))}
      </div>
    </div>
  );
}

function CodeBlock({ children }) {
  return (
    <pre className="mt-3 overflow-x-auto rounded-lg bg-black p-4 text-sm text-green-400">
      {children}
    </pre>
  );
}
