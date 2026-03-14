export default function DashboardPage() {
  return (
    <div>
      <h1>Dashboard</h1>

      <p>Bem-vindo ao Sistema de Cadastro Universal.</p>

      <div style={{ display: "flex", gap: 20, marginTop: 20 }}>
        <div
          style={{
            background: "#fff",
            padding: 20,
            borderRadius: 8,
            width: 200,
            boxShadow: "0 0 5px rgba(0,0,0,0.1)",
          }}
        >
          <h3>Total Cadastros</h3>
          <strong>3</strong>
        </div>

        <div
          style={{
            background: "#fff",
            padding: 20,
            borderRadius: 8,
            width: 200,
            boxShadow: "0 0 5px rgba(0,0,0,0.1)",
          }}
        >
          <h3>Total Registros</h3>
          <strong>25</strong>
        </div>
      </div>
    </div>
  );
}
