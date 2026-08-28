import Link from "next/link";
import { marca } from "@/lib/marca";

export default function PublicoLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-dvh flex-col">
      <header className="border-b border-linha bg-papel">
        <div className="mx-auto flex max-w-3xl items-baseline justify-between px-5 py-4">
          <p className="font-serif text-lg">{marca.nome}</p>
          <p className="text-xs text-tinta-fraca">{marca.consultor}</p>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-linha px-5 py-6 text-center text-xs text-tinta-fraca">
        {marca.nome} · {marca.email} · {marca.telefone}
        <br />
        <Link href="/" className="mt-2 inline-block hover:underline">
          (voltar à consola — só na demo)
        </Link>
      </footer>
    </div>
  );
}
