import { notFound } from "next/navigation";
import * as db from "@/lib/store";
import { data, intervalo, noites } from "@/lib/format";
import { marca } from "@/lib/marca";

export const dynamic = "force-dynamic";

/** O portal do cliente: onde está a viagem, o que falta, e os documentos. */
export default async function Portal({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const v = db.viagemPorToken(token);
  if (!v) notFound();

  const cliente = db.cliente(v.clienteId)!;
  const feitos = v.marcos.filter((m) => m.estado === "feito").length;
  const proximo = v.marcos.find((m) => m.estado === "por_fazer");
  const faltam = Math.ceil(
    (new Date(v.dataInicio).getTime() - Date.now()) / 86_400_000,
  );

  return (
    <div className="mx-auto max-w-2xl px-5 py-12">
      <p className="text-sm text-tinta-fraca">
        Olá, {cliente.nome.split(" ")[0]}
      </p>
      <h1 className="mt-1 font-serif text-4xl leading-tight">{v.titulo}</h1>
      <p className="mt-2 text-tinta-fraca">
        {intervalo(v.dataInicio, v.dataFim)} ·{" "}
        {noites(v.dataInicio, v.dataFim)} noites
      </p>

      {faltam > 0 && (
        <p className="mt-6 rounded-xl bg-mar px-5 py-4 font-serif text-2xl text-white">
          Faltam {faltam} dias.
        </p>
      )}

      <section className="mt-10">
        <div className="flex items-baseline justify-between">
          <h2 className="font-serif text-2xl">A caminho</h2>
          <span className="text-sm text-tinta-fraca">
            {feitos} de {v.marcos.length}
          </span>
        </div>

        <div className="mt-3 h-2 overflow-hidden rounded-full bg-linha">
          <div
            className="h-full rounded-full bg-mar transition-all"
            style={{ width: `${(feitos / v.marcos.length) * 100}%` }}
          />
        </div>

        <ol className="mt-6 space-y-4">
          {v.marcos.map((m) => {
            const eProximo = proximo?.id === m.id;
            return (
              <li key={m.id} className="flex gap-4">
                <span
                  className={`mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full text-xs ${
                    m.estado === "feito"
                      ? "bg-mar text-white"
                      : eProximo
                        ? "border-2 border-mar text-mar"
                        : "border border-linha text-transparent"
                  }`}
                >
                  ✓
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p
                      className={`font-medium ${
                        m.estado === "feito" ? "text-tinta-fraca" : ""
                      }`}
                    >
                      {m.titulo}
                      {eProximo && (
                        <span className="ml-2 rounded-full bg-mar-claro px-2 py-0.5 text-xs font-semibold text-mar">
                          a seguir
                        </span>
                      )}
                    </p>
                    {m.data && (
                      <span className="text-xs text-tinta-fraca">
                        {data(m.data)}
                      </span>
                    )}
                  </div>
                  {m.descricao && (
                    <p className="mt-0.5 text-sm text-tinta-fraca">{m.descricao}</p>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </section>

      <section className="mt-12">
        <h2 className="font-serif text-2xl">Documentos</h2>
        <ul className="mt-4 space-y-2">
          {v.documentos.map((d) => (
            <li
              key={d.id}
              className="cartao flex items-center justify-between p-3"
            >
              <span className="text-sm">{d.nome}</span>
              <span className="rounded border border-linha px-2 py-0.5 text-xs text-tinta-fraca">
                {d.tipo}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-2 text-xs text-tinta-fraca">
          Na demo os documentos não descarregam — é aqui que ficariam os
          bilhetes e vouchers reais.
        </p>
      </section>

      <section className="mt-12 text-center">
        <p className="text-tinta-fraca">
          Qualquer dúvida, a qualquer hora, antes ou durante a viagem.
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          <a
            href={`https://wa.me/${marca.telefone.replace(/\D/g, "")}`}
            className="botao"
          >
            Falar com {marca.consultor.split(" ")[0]}
          </a>
          <a href={`mailto:${marca.email}`} className="botao botao-fantasma">
            Email
          </a>
        </div>
      </section>
    </div>
  );
}
