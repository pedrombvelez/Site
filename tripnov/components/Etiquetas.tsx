import type { EstadoPedido, EstadoProposta } from "@/lib/types";

const CORES: Record<string, string> = {
  novo: "bg-ambar-claro text-ambar",
  em_proposta: "bg-mar-claro text-mar",
  ganho: "bg-mar text-white",
  perdido: "bg-vinho-claro text-vinho",
  rascunho: "bg-areia text-tinta-fraca border border-linha",
  enviada: "bg-mar-claro text-mar",
  aceite: "bg-mar text-white",
  recusada: "bg-vinho-claro text-vinho",
};

const NOMES: Record<string, string> = {
  novo: "Novo",
  em_proposta: "Em proposta",
  ganho: "Ganho",
  perdido: "Perdido",
  rascunho: "Rascunho",
  enviada: "Enviada",
  aceite: "Aceite",
  recusada: "Recusada",
};

export function Estado({ estado }: { estado: EstadoPedido | EstadoProposta }) {
  return (
    <span
      className={`inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${CORES[estado]}`}
    >
      {NOMES[estado]}
    </span>
  );
}

export function Pastilha({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block rounded-full border border-linha bg-areia px-2 py-0.5 text-xs text-tinta-fraca">
      {children}
    </span>
  );
}
