import Link from "next/link";
import * as db from "@/lib/store";
import { euros, data, intervalo } from "@/lib/format";
import { Numero } from "@/components/Numero";
import { gerarProposta } from "@/lib/actions";

export const dynamic = "force-dynamic";

export default function Painel() {
  const m = db.metricas();
  const novos = db.pedidos().filter((p) => p.estado === "novo");
  const aAguardar = db.propostas().filter((p) => p.estado === "enviada");
  const emCurso = db
    .viagens()
    .filter((v) => v.marcos.some((x) => x.estado === "por_fazer"))
    .sort((a, b) => a.dataInicio.localeCompare(b.dataInicio));

  const maiorMes = Math.max(1, ...m.porMes.map((x) => x.valor));

  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="font-serif text-3xl">Painel</h1>
      <p className="mt-1 text-sm text-tinta-fraca">
        O que precisa de si hoje, e como está o ano.
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Numero
          valor={String(m.pedidosNovos)}
          rotulo="Pedidos por responder"
          nota={m.pedidosNovos ? "à espera de proposta" : "tudo respondido"}
        />
        <Numero
          valor={String(m.propostasEnviadas)}
          rotulo="Propostas no ar"
          nota="enviadas, sem resposta"
        />
        <Numero
          valor={`${m.taxaConversao}%`}
          rotulo="Taxa de conversão"
          nota="propostas aceites vs. decididas"
        />
        <Numero
          valor={euros(m.receitaGanha)}
          rotulo="Receita ganha"
          nota={`${euros(m.valorMedio)} por viagem, em média`}
        />
      </div>

      {/* Pedidos por responder — a única lista que interrompe o dia. */}
      <section className="mt-10">
        <h2 className="font-serif text-xl">Pedidos por responder</h2>
        {novos.length === 0 ? (
          <p className="mt-3 text-sm text-tinta-fraca">
            Nenhum. Bom sinal.
          </p>
        ) : (
          <ul className="mt-3 space-y-2">
            {novos.map((p) => {
              const c = db.cliente(p.clienteId)!;
              return (
                <li key={p.id} className="cartao p-4">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <div>
                      <Link
                        href={`/clientes/${c.id}`}
                        className="font-medium hover:underline"
                      >
                        {c.nome}
                      </Link>
                      <span className="text-tinta-fraca"> · {p.destino}</span>
                    </div>
                    <span className="text-xs text-tinta-fraca">
                      {intervalo(p.dataInicio, p.dataFim)} · {euros(p.orcamento)}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-tinta-fraca italic">
                    “{p.mensagem}”
                  </p>
                  <form action={gerarProposta} className="mt-3">
                    <input type="hidden" name="pedidoId" value={p.id} />
                    <button className="botao">Gerar proposta</button>
                  </form>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <section>
          <h2 className="font-serif text-xl">À espera de resposta</h2>
          {aAguardar.length === 0 ? (
            <p className="mt-3 text-sm text-tinta-fraca">Nada pendente.</p>
          ) : (
            <ul className="mt-3 space-y-2">
              {aAguardar.map((p) => (
                <li key={p.id} className="cartao flex items-center justify-between p-3">
                  <div className="min-w-0">
                    <Link
                      href={`/propostas/${p.id}`}
                      className="block truncate text-sm font-medium hover:underline"
                    >
                      {p.titulo}
                    </Link>
                    <p className="text-xs text-tinta-fraca">
                      {db.cliente(p.clienteId)?.nome} · enviada a{" "}
                      {p.enviadaEm ? data(p.enviadaEm) : "—"}
                    </p>
                  </div>
                  <span className="shrink-0 text-sm">{euros(p.precoTotal)}</span>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section>
          <h2 className="font-serif text-xl">Viagens em curso</h2>
          {emCurso.length === 0 ? (
            <p className="mt-3 text-sm text-tinta-fraca">Nenhuma viagem aberta.</p>
          ) : (
            <ul className="mt-3 space-y-2">
              {emCurso.map((v) => {
                const proximo = v.marcos.find((x) => x.estado === "por_fazer");
                return (
                  <li key={v.id} className="cartao p-3">
                    <div className="flex items-baseline justify-between gap-2">
                      <Link
                        href="/viagens"
                        className="text-sm font-medium hover:underline"
                      >
                        {v.titulo}
                      </Link>
                      <span className="text-xs text-tinta-fraca">
                        {data(v.dataInicio)}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-tinta-fraca">
                      {db.cliente(v.clienteId)?.nome}
                      {proximo ? ` · a seguir: ${proximo.titulo}` : ""}
                    </p>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      </div>

      {/* Receita por mês. Barras simples — não vale a pena uma biblioteca para isto. */}
      {m.porMes.length > 1 && (
        <section className="mt-10">
          <h2 className="font-serif text-xl">Receita ganha, por mês</h2>
          <div className="cartao mt-3 flex items-end gap-6 p-4">
            {m.porMes.map((x) => (
              <div key={x.mes} className="flex w-full max-w-24 flex-col items-center gap-2">
                <span className="text-xs text-tinta-fraca">{euros(x.valor)}</span>
                <div
                  className="w-full rounded-t bg-mar"
                  style={{ height: `${Math.round((x.valor / maiorMes) * 110) + 6}px` }}
                />
                <span className="text-xs text-tinta-fraca">{x.mes}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
