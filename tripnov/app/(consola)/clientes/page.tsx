import Link from "next/link";
import * as db from "@/lib/store";
import { euros, iniciais } from "@/lib/format";

export const dynamic = "force-dynamic";

export default function Clientes() {
  const lista = db.clientes();

  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="font-serif text-3xl">Clientes</h1>
      <p className="mt-1 text-sm text-tinta-fraca">
        Quem são, o que gostam, e o que já fizeram consigo.
      </p>

      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {lista.map((c) => {
          const viagens = db.viagensDe(c.id);
          const gasto = viagens.reduce((s, v) => s + v.valor, 0);
          return (
            <li key={c.id}>
              <Link href={`/clientes/${c.id}`} className="cartao block p-4 hover:border-mar">
                <div className="flex items-center gap-3">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-mar-claro text-sm font-semibold text-mar">
                    {iniciais(c.nome)}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate font-medium">{c.nome}</p>
                    <p className="truncate text-xs text-tinta-fraca">{c.email}</p>
                  </div>
                </div>
                <p className="mt-3 line-clamp-2 text-sm text-tinta-fraca">
                  {c.preferencias.estilo}
                </p>
                <p className="mt-2 text-xs text-tinta-fraca">
                  {viagens.length} {viagens.length === 1 ? "viagem" : "viagens"}
                  {gasto ? ` · ${euros(gasto)}` : ""}
                </p>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
