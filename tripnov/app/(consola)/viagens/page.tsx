import Link from "next/link";
import * as db from "@/lib/store";
import { euros, data, intervalo } from "@/lib/format";
import { alternarMarco } from "@/lib/actions";

export const dynamic = "force-dynamic";

export default function Viagens() {
  const lista = db
    .viagens()
    .sort((a, b) => b.dataInicio.localeCompare(a.dataInicio));

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="font-serif text-3xl">Viagens</h1>
      <p className="mt-1 text-sm text-tinta-fraca">
        Cada passo que marca aqui aparece de imediato no portal do cliente.
      </p>

      <div className="mt-6 space-y-6">
        {lista.map((v) => {
          const cliente = db.cliente(v.clienteId)!;
          const feitos = v.marcos.filter((m) => m.estado === "feito").length;
          return (
            <section key={v.id} className="cartao p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div>
                  <h2 className="font-serif text-xl">{v.titulo}</h2>
                  <p className="text-sm text-tinta-fraca">
                    <Link href={`/clientes/${cliente.id}`} className="hover:underline">
                      {cliente.nome}
                    </Link>{" "}
                    · {intervalo(v.dataInicio, v.dataFim)} · {euros(v.valor)}
                  </p>
                </div>
                <Link href={`/portal/${v.token}`} className="botao botao-fantasma">
                  Ver o portal ↗
                </Link>
              </div>

              <p className="mt-3 text-xs text-tinta-fraca">
                {feitos} de {v.marcos.length} passos concluídos
              </p>
              <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-areia">
                <div
                  className="h-full rounded-full bg-mar"
                  style={{ width: `${(feitos / v.marcos.length) * 100}%` }}
                />
              </div>

              <ul className="mt-4 space-y-1">
                {v.marcos.map((m) => (
                  <li key={m.id}>
                    <form action={alternarMarco}>
                      <input type="hidden" name="viagemId" value={v.id} />
                      <input type="hidden" name="marcoId" value={m.id} />
                      <button className="flex w-full items-center gap-3 rounded-lg px-2 py-1.5 text-left hover:bg-areia">
                        <span
                          className={`flex size-5 shrink-0 items-center justify-center rounded-full border text-xs ${
                            m.estado === "feito"
                              ? "border-mar bg-mar text-white"
                              : "border-linha text-transparent"
                          }`}
                        >
                          ✓
                        </span>
                        <span
                          className={`flex-1 text-sm ${
                            m.estado === "feito" ? "text-tinta-fraca" : ""
                          }`}
                        >
                          {m.titulo}
                        </span>
                        <span className="text-xs text-tinta-fraca">
                          {m.data ? data(m.data) : ""}
                        </span>
                      </button>
                    </form>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
