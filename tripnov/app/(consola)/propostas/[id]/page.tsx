import Link from "next/link";
import { notFound } from "next/navigation";
import * as db from "@/lib/store";
import { euros, data, diaDaViagem, dataCurta } from "@/lib/format";
import { Estado } from "@/components/Etiquetas";
import {
  guardarProposta,
  enviarProposta,
  aceitarProposta,
  recusarProposta,
} from "@/lib/actions";

export const dynamic = "force-dynamic";

export default async function Editor({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const p = db.proposta(id);
  if (!p) notFound();

  const cliente = db.cliente(p.clienteId)!;
  const pedido = db.pedido(p.pedidoId);
  const viagem = db.viagemDaProposta(p.id);
  const inicio = pedido?.dataInicio ?? p.criadoEm;

  return (
    <div className="mx-auto max-w-3xl">
      <Link href="/propostas" className="text-sm text-tinta-fraca hover:underline">
        ← Propostas
      </Link>

      <header className="mt-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="font-serif text-3xl">{p.titulo}</h1>
          <p className="mt-1 text-sm text-tinta-fraca">
            <Link href={`/clientes/${cliente.id}`} className="hover:underline">
              {cliente.nome}
            </Link>{" "}
            · {p.destino} · {p.dias.length} dias
          </p>
        </div>
        <Estado estado={p.estado} />
      </header>

      {p.geradaLocalmente && (
        <p className="mt-4 rounded-lg bg-ambar-claro px-3 py-2 text-sm text-ambar">
          Este itinerário saiu do motor local, não do modelo — falta a chave{" "}
          <code>ANTHROPIC_API_KEY</code>. A estrutura está certa; o conteúdo é
          para preencher.
        </p>
      )}

      {/* Link privado para o cliente. É o que ele vê. */}
      <div className="cartao mt-6 flex flex-wrap items-center justify-between gap-3 p-4">
        <div className="min-w-0">
          <p className="text-xs font-semibold tracking-wide text-tinta-fraca uppercase">
            Link privado do cliente
          </p>
          <code className="text-sm break-all">/p/{p.token}</code>
        </div>
        <Link href={`/p/${p.token}`} className="botao botao-fantasma shrink-0">
          Abrir como o cliente ↗
        </Link>
      </div>

      <form action={guardarProposta} className="mt-6 space-y-5">
        <input type="hidden" name="propostaId" value={p.id} />

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="sm:col-span-2">
            <label className="etiqueta" htmlFor="titulo">
              Título
            </label>
            <input id="titulo" name="titulo" defaultValue={p.titulo} className="campo" />
          </div>
          <div>
            <label className="etiqueta" htmlFor="precoTotal">
              Preço total (€)
            </label>
            <input
              id="precoTotal"
              name="precoTotal"
              type="number"
              defaultValue={p.precoTotal}
              className="campo"
            />
          </div>
        </div>

        <div>
          <label className="etiqueta" htmlFor="resumo">
            Resumo
          </label>
          <textarea
            id="resumo"
            name="resumo"
            rows={4}
            defaultValue={p.resumo}
            className="campo"
          />
        </div>

        <div>
          <p className="etiqueta">Dia a dia</p>
          <ol className="space-y-3">
            {p.dias.map((d) => (
              <li key={d.dia} className="cartao p-4">
                <div className="flex items-baseline gap-3">
                  <span className="font-serif text-lg text-tinta-fraca">
                    {d.dia}
                  </span>
                  <span className="text-xs text-tinta-fraca">
                    {dataCurta(diaDaViagem(inicio, d.dia))}
                  </span>
                </div>
                <input
                  name={`dia_${d.dia}_titulo`}
                  defaultValue={d.titulo}
                  className="campo mt-2 font-medium"
                />
                <textarea
                  name={`dia_${d.dia}_descricao`}
                  rows={2}
                  defaultValue={d.descricao}
                  className="campo mt-2"
                />
                <input
                  name={`dia_${d.dia}_alojamento`}
                  defaultValue={d.alojamento}
                  className="campo mt-2 text-sm"
                />
                {d.atividades.length > 0 && (
                  <p className="mt-2 text-xs text-tinta-fraca">
                    {d.atividades.join(" · ")}
                  </p>
                )}
              </li>
            ))}
          </ol>
        </div>

        <button className="botao">Guardar alterações</button>
      </form>

      {/* Estado da proposta. Um passo de cada vez. */}
      <div className="cartao mt-8 flex flex-wrap items-center gap-3 p-4">
        {p.estado === "rascunho" && (
          <form action={enviarProposta}>
            <input type="hidden" name="propostaId" value={p.id} />
            <button className="botao">Marcar como enviada</button>
          </form>
        )}

        {p.estado === "enviada" && (
          <>
            <form action={aceitarProposta}>
              <input type="hidden" name="propostaId" value={p.id} />
              <button className="botao">Cliente aceitou</button>
            </form>
            <form action={recusarProposta}>
              <input type="hidden" name="propostaId" value={p.id} />
              <button className="botao botao-fantasma">Cliente recusou</button>
            </form>
            <span className="text-xs text-tinta-fraca">
              Enviada a {p.enviadaEm ? data(p.enviadaEm) : "—"}
            </span>
          </>
        )}

        {p.estado === "aceite" && viagem && (
          <>
            <span className="text-sm">
              Viagem aberta, com portal do cliente criado.
            </span>
            <Link href={`/portal/${viagem.token}`} className="botao botao-fantasma">
              Abrir o portal ↗
            </Link>
          </>
        )}

        {p.estado === "recusada" && (
          <span className="text-sm text-tinta-fraca">
            Proposta recusada. Fica no histórico do cliente.
          </span>
        )}
      </div>
    </div>
  );
}
