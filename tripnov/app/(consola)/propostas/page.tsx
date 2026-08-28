import Link from "next/link";
import * as db from "@/lib/store";
import { euros, data } from "@/lib/format";
import { Estado } from "@/components/Etiquetas";

export const dynamic = "force-dynamic";

export default function Propostas() {
  const lista = db.propostas();

  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="font-serif text-3xl">Propostas</h1>
      <p className="mt-1 text-sm text-tinta-fraca">
        Rascunhos, enviadas e decididas.
      </p>

      <ul className="mt-6 space-y-2">
        {lista.map((p) => (
          <li key={p.id}>
            <Link href={`/propostas/${p.id}`} className="cartao block p-4 hover:border-mar">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="font-medium">{p.titulo}</p>
                <div className="flex items-center gap-2">
                  <span className="text-sm">{euros(p.precoTotal)}</span>
                  <Estado estado={p.estado} />
                </div>
              </div>
              <p className="mt-1 text-xs text-tinta-fraca">
                {db.cliente(p.clienteId)?.nome} · {p.dias.length} dias ·{" "}
                {p.viajantes} {p.viajantes === 1 ? "viajante" : "viajantes"} ·{" "}
                criada a {data(p.criadoEm)}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
