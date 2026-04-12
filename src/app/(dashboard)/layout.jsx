"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardLayout({ children }) {
  const pathname = usePathname();

  const menu = [
    { name: "Dashboard", path: "/cadastros" },
    { name: "Vendas", path: "/vendas" },
    { name: "Apresentação", path: "/apresentacao" },
    { name: "Participantes", path: "/participantes" },
  ];

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      {/* SIDEBAR */}
      <aside
        style={{
          width: 220,
          background: "#111",
          color: "#fff",
          padding: 20,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h2 style={{ marginBottom: 30 }}>Sistema</h2>

        {menu.map((item) => (
          <Link key={item.path} href={item.path}>
            <div
              style={{
                padding: 10,
                marginBottom: 10,
                background: pathname === item.path ? "#333" : "transparent",
                cursor: "pointer",
                borderRadius: 6,
              }}
            >
              {item.name}
            </div>
          </Link>
        ))}
      </aside>

      {/* CONTEÚDO */}
      <main
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          height: "100vh",
        }}
      >
        {/* TOPBAR */}
        <div
          style={{
            height: 60,
            minHeight: 60,
            background: "#fff",
            borderBottom: "1px solid #ddd",
            display: "flex",
            alignItems: "center",
            paddingLeft: 20,
            fontWeight: "bold",
          }}
        >
          Sistema de Cadastro Universal
        </div>

        {/* ÁREA COM SCROLL */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: 20,
            background: "#f5f5f5",
          }}
        >
          {children}
        </div>
      </main>
    </div>
  );
}
