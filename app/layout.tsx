import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Caveat } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Para a mamã do Pedrinho",
  description:
    "Um livro pequenino, feito com muito amor, para a mamã mais especial do mundo. Feliz Dia da Mãe.",
  // Site privado — pedimos a motores de busca para não indexarem nem seguirem
  // links. Combinado com /robots.txt e o gate de palavra-passe.
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
  // Sem OpenGraph: evita pré-visualizações com a foto/título quando o link
  // for partilhado (WhatsApp, iMessage, etc.).
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#fdf6ee",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-PT"
      className={`${cormorant.variable} ${caveat.variable} h-full antialiased`}
    >
      <body className="min-h-screen-dvh flex flex-col">{children}</body>
    </html>
  );
}
