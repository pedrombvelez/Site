import Link from "next/link";
import { notFound } from "next/navigation";
import * as db from "@/lib/store";
import { euros, data, intervalo, iniciais } from "@/lib/format";
import { Estado, Pastilha } from "@/components/Etiquetas";

export const dynamic = "force-dynamic";

const RITMOS = { tranquilo: "Tranquilo", equilibrado: "Equilibrado", intenso: "Intenso" };
const ALOJAMENTOS = {
  boutique: "Boutique",
  luxo: "Luxo",
  familiar: "Familiar",
  economico: "Económico",
};

export default async function Cliente({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const c = db.cliente(id);
  if (!c) notFound();

  const pedidos = db.pedidosDe(c.id);
  const propostas = db.propostasDe(c.id);
  const viagens = db.viagensDe(c.id);
  const gasto = viagens.reduce((s, v) => s + v.valor, 0);

  return (
    <div className="mx-auto max-w-4xl">
      <Link href="/clientes" className="text-sm text-tinta-fraca hover:underline">
        ← Clientes
      </Link>

      <header className="mt-4 flex items-center gap-4">
        <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-mar-claro font-serif text-xl text-mar">
          {iniciais(c.nome)}
        </span>
        <div>
          <h1 className="font-serif text-3xl">{c.nome}</h1>
          <p className="text-sm text-tinta-fraca">
            {c.email} · {c.telefone}
          </p>
        </div>
      </header>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="cartao p-4 md:col-span-2">
          <h2 className="text-xs font-semibold tracking-wide text-tinta-fraca uppercase">
            Como gosta de viajar
          </h2>
          <p className="mt-2">{c.preferencias.estilo}</p>

          <div className="mt-3 flex flex-wrap gap-1.5">
            <Pastilha>Ritmo {RITMOS[c.preferencias.ritmo].toLowerCase()}</Pastilha>
            <Pastilha>{ALOJAMENTOS[c.preferencias.alojamento]}</Pastilha>
            {c.preferencias.interesses.map((i) => (
              <Pastilha key={i}>{i}</Pastilha>
            ))}
          </div>

          {c.preferencias.restricoes && (
            <p className="mt-4 rounded-lg bg-ambar-claro px-3 py-2 text-sm text-ambar">
              <strong>A não esquecer:</strong> {c.preferencias.restricoes}
            </p>
          )}

          {c.notas && (
            <p className="mt-3 text-sm text-tinta-fraca">
              <strong className="text-tinta">Notas:</strong> {c.notas}
            </p>
          )}
        </div>

        <div className="cartao p-4">
          <h2 className="text-xs font-semibold tracking-wide text-tinta-fraca uppercase">
            Valor
          </h2>
          <p className="mt-2 font-serif text-3xl">{euros(gasto)}</p>
          <p className="text-xs text-tinta-fraca">
            em {viagens.length} {viagens.length === 1 ? "viagem" : "viagens"}
          </p>
          <p className="mt-4 text-xs text-tinta-fraca">
            Cliente desde {data(c.criadoEm)}
          </p>
          <p className="mt-1 text-xs text-tinta-fraca">
            Orçamento habitual {euros(c.preferencias.orcamentoTipico)}
          </p>
        </div>
      </div>

      <section className="mt-8">
        <h2 className="font-serif text-xl">Histórico</h2>
        <ol className="mt-3 space-y-2">
          {pedidos.map((p) => {
            const prop = propostas.find((x) => x.pedidoId === p.id);
            return (
              <li key={p.id} className="cartao p-4">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="font-medium">{p.destino}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-tinta-fraca">{data(p.criadoEm)}</span>
                    <Estado estado={p.estado} />
                  </div>
                </div>
                <p className="mt-1 text-xs text-tinta-fraca">
                  {intervalo(p.dataInicio, p.dataFim)} · orçamento {euros(p.orcamento)}
                </p>
                {prop && (
                  <Link
                    href={`/propostas/${prop.id}`}
                    className="mt-2 inline-block text-sm text-mar hover:underline"
                  >
                    {prop.titulo} — {euros(prop.precoTotal)} →
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </section>
    </div>
  );
}
