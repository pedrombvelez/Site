"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { marca } from "@/lib/marca";

const LINKS = [
  { href: "/", nome: "Painel" },
  { href: "/pedidos", nome: "Pedidos" },
  { href: "/propostas", nome: "Propostas" },
  { href: "/clientes", nome: "Clientes" },
  { href: "/viagens", nome: "Viagens" },
];

export function Nav() {
  const caminho = usePathname();

  return (
    <nav className="flex shrink-0 flex-col gap-1 border-b border-linha bg-papel px-4 py-4 md:h-dvh md:w-60 md:border-r md:border-b-0 md:sticky md:top-0">
      <div className="mb-4 px-2">
        <p className="font-serif text-lg leading-tight">{marca.nome}</p>
        <p className="text-xs text-tinta-fraca">{marca.consultor}</p>
      </div>

      <div className="flex gap-1 overflow-x-auto md:flex-col md:overflow-visible">
        {LINKS.map((l) => {
          const ativo = l.href === "/" ? caminho === "/" : caminho.startsWith(l.href);
          return (
            <Link
              key={l.href}
              href={l.href}
              className={`shrink-0 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                ativo ? "bg-mar text-white" : "text-tinta-fraca hover:bg-areia"
              }`}
            >
              {l.nome}
            </Link>
          );
        })}
      </div>

      <div className="mt-auto hidden gap-1 border-t border-linha pt-3 md:flex md:flex-col">
        <Link
          href="/pedido"
          className="rounded-lg px-3 py-2 text-sm text-tinta-fraca hover:bg-areia"
        >
          Formulário público ↗
        </Link>
      </div>
    </nav>
  );
}
