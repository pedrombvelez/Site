import Link from "next/link";
import * as db from "@/lib/store";
import { euros, data, intervalo } from "@/lib/format";
import { Estado } from "@/components/Etiquetas";
import { gerarProposta } from "@/lib/actions";

export const dynamic = "force-dynamic";

const ORIGENS: Record<string, string> = {
  formulario: "Formulário",
  whatsapp: "WhatsApp",
  email: "Email",
  referencia: "Recomendação",
};

export default function Pedidos() {
  const lista = db.pedidos();

  return (
    <div className="mx-auto max-w-5xl">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <h1 className="font-serif text-3xl">Pedidos</h1>
          <p className="mt-1 text-sm text-tinta-fraca">
            Tudo o que entrou, venha de onde vier.
          </p>
        </div>
        <Link href="/pedido" className="botao botao-fantasma">
          Ver o formulário público
        </Link>
      </div>

      <ul className="mt-6 space-y-2">
        {lista.map((p) => {
          const c = db.cliente(p.clienteId)!;
          const prop = db.propostas().find((x) => x.pedidoId === p.id);
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
                <div className="flex items-center gap-2">
                  <span className="text-xs text-tinta-fraca">
                    {ORIGENS[p.origem]} · {data(p.criadoEm)}
                  </span>
                  <Estado estado={p.estado} />
                </div>
              </div>

              <p className="mt-1 text-xs text-tinta-fraca">
                {intervalo(p.dataInicio, p.dataFim)} · {p.adultos} adultos
                {p.criancas ? `, ${p.criancas} crianças` : ""} ·{" "}
                {euros(p.orcamento)}
              </p>

              <p className="mt-2 text-sm text-tinta-fraca italic">“{p.mensagem}”</p>

              <div className="mt-3">
                {prop ? (
                  <Link href={`/propostas/${prop.id}`} className="botao botao-fantasma">
                    Ver proposta
                  </Link>
                ) : (
                  <form action={gerarProposta}>
                    <input type="hidden" name="pedidoId" value={p.id} />
                    <button className="botao">Gerar proposta</button>
                  </form>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
