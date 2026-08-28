import { notFound } from "next/navigation";
import * as db from "@/lib/store";
import { euros, data, diaDaViagem, intervalo } from "@/lib/format";
import { marca } from "@/lib/marca";

export const dynamic = "force-dynamic";

/**
 * A página que o cliente recebe. Sem navegação, sem consola, sem preços de
 * fornecedor — só a viagem e um preço.
 */
export default async function PropostaPublica({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const p = db.propostaPorToken(token);
  if (!p) notFound();

  const cliente = db.cliente(p.clienteId)!;
  const pedido = db.pedido(p.pedidoId);
  const inicio = pedido?.dataInicio ?? p.criadoEm;
  const porPessoa = Math.round(p.precoTotal / Math.max(1, p.viajantes));

  return (
    <article className="mx-auto max-w-2xl px-5 py-12">
      <p className="text-sm text-tinta-fraca">
        Para {cliente.nome.split(" ")[0]}, de {marca.consultor}
      </p>
      <h1 className="mt-2 font-serif text-4xl leading-tight">{p.titulo}</h1>
      {pedido && (
        <p className="mt-2 text-tinta-fraca">
          {p.destino} · {intervalo(pedido.dataInicio, pedido.dataFim)} ·{" "}
          {p.viajantes} {p.viajantes === 1 ? "pessoa" : "pessoas"}
        </p>
      )}

      <p className="mt-8 border-l-2 border-mar pl-4 text-lg leading-relaxed">
        {p.resumo}
      </p>

      <section className="mt-12">
        <h2 className="font-serif text-2xl">Dia a dia</h2>
        <ol className="mt-6 space-y-8">
          {p.dias.map((d) => (
            <li key={d.dia} className="border-l border-linha pl-5">
              <div className="flex items-baseline gap-3">
                <span className="font-serif text-2xl text-mar">{d.dia}</span>
                <span className="text-xs tracking-wide text-tinta-fraca uppercase">
                  {data(diaDaViagem(inicio, d.dia))}
                </span>
              </div>
              <h3 className="mt-1 font-serif text-xl">{d.titulo}</h3>
              <p className="mt-2 leading-relaxed text-tinta-fraca">{d.descricao}</p>

              <dl className="mt-3 space-y-1 text-sm">
                {d.alojamento && d.alojamento !== "—" && (
                  <div className="flex gap-2">
                    <dt className="w-24 shrink-0 text-tinta-fraca">Dormir</dt>
                    <dd>{d.alojamento}</dd>
                  </div>
                )}
                {d.atividades.length > 0 && (
                  <div className="flex gap-2">
                    <dt className="w-24 shrink-0 text-tinta-fraca">Fazer</dt>
                    <dd>{d.atividades.join(" · ")}</dd>
                  </div>
                )}
                {d.refeicoes && d.refeicoes !== "—" && (
                  <div className="flex gap-2">
                    <dt className="w-24 shrink-0 text-tinta-fraca">Refeições</dt>
                    <dd>{d.refeicoes}</dd>
                  </div>
                )}
              </dl>
            </li>
          ))}
        </ol>
      </section>

      <section className="cartao mt-12 p-6">
        <p className="text-xs font-semibold tracking-wide text-tinta-fraca uppercase">
          Preço total
        </p>
        <p className="font-serif text-4xl">{euros(p.precoTotal)}</p>
        <p className="text-sm text-tinta-fraca">
          {euros(porPessoa)} por pessoa
        </p>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <div>
            <h3 className="text-sm font-semibold">Incluído</h3>
            <ul className="mt-2 space-y-1 text-sm text-tinta-fraca">
              {p.incluido.map((i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-mar">✓</span>
                  {i}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold">Não incluído</h3>
            <ul className="mt-2 space-y-1 text-sm text-tinta-fraca">
              {p.naoIncluido.map((i) => (
                <li key={i} className="flex gap-2">
                  <span>–</span>
                  {i}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mt-10 text-center">
        <p className="text-tinta-fraca">
          Alguma coisa a mudar? Diga — este itinerário é um ponto de partida,
          não uma proposta final.
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          <a href={`mailto:${marca.email}`} className="botao">
            Responder por email
          </a>
          <a
            href={`https://wa.me/${marca.telefone.replace(/\D/g, "")}`}
            className="botao botao-fantasma"
          >
            Falar por WhatsApp
          </a>
        </div>
      </section>
    </article>
  );
}
