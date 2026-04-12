"use client";

export default function ParticipantesPage() {
  const participantes = [
    { nome: "Adriano Araujo da Cruz", ra: "20235386" },
    { nome: "André Jesus Cardoso de Oliveira", ra: "23226686" },
    { nome: "Luciana da Cruz Nascimento", ra: "23210700" },
    { nome: "Luiz Fernando de Oliveira Rodrigues", ra: "23212174" },
    { nome: "Marcos José de Sousa Barros", ra: "1707572" },
    { nome: "Thiago Garcia Costa", ra: "23223697" },
    { nome: "Thomas Jonatas Santos de Carvalho", ra: "23209119" },
    { nome: "Wender Augusto Vega", ra: "23214669" },
  ];

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br  p-6">
      <div className="w-full max-w-4xl rounded-2xl bg-white p-10 shadow-xl">
        {/* TÍTULO */}
        <h1 className="mb-4 text-center text-3xl font-bold text-gray-800">
          🎓 Projeto Acadêmico
        </h1>

        <h2 className="mb-8 text-center text-lg text-gray-500">
          Sistema de Cadastro Dinâmico de Produtos
        </h2>

        {/* TEXTO DE AGRADECIMENTO */}
        <div className="mb-10 text-center text-gray-600 leading-relaxed">
          <p>
            Este projeto representa o esforço coletivo, dedicação e aprendizado
            de todos os integrantes do grupo.
          </p>

          <p className="mt-3">
            Cada participante contribuiu de forma essencial para o
            desenvolvimento desta solução, tornando possível a construção de um
            sistema completo, flexível e funcional.
          </p>

          <p className="mt-3">
            Agradecemos a colaboração, o comprometimento e o trabalho em equipe
            que foram fundamentais para a realização deste projeto.
          </p>
        </div>

        {/* LISTA DE PARTICIPANTES */}
        <div className="grid gap-4 sm:grid-cols-2">
          {participantes.map((p, i) => (
            <div
              key={i}
              className="rounded-xl border border-gray-200 p-4 shadow-sm transition hover:shadow-md"
            >
              <h3 className="font-semibold text-gray-800">{p.nome}</h3>
              <p className="text-sm text-gray-500">RA: {p.ra}</p>
            </div>
          ))}
        </div>

        {/* RODAPÉ */}
        <div className="mt-10 text-center text-sm text-gray-400">
          <p>✨ Parabéns a todos os envolvidos neste projeto!</p>
        </div>
      </div>
    </div>
  );
}
