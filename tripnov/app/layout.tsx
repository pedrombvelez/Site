import type { Metadata } from "next";
import "./globals.css";
import { marca } from "@/lib/marca";

export const metadata: Metadata = {
  title: `${marca.nome} — plataforma`,
  description:
    "Pedidos, propostas, clientes e viagens de um consultor de viagens, num sítio só.",
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-PT">
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}
