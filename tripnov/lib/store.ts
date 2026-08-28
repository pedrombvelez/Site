import fs from "node:fs";
import path from "node:path";
import type {
  Base,
  Cliente,
  Pedido,
  Proposta,
  Viagem,
} from "./types";
import { semente } from "./seed";
import { CONSULTOR_ID } from "./marca";

/**
 * Persistência da demo: um único JSON em disco.
 *
 * É deliberadamente simples — o objetivo é a demo correr com `npm run dev` sem
 * base de dados nenhuma. Para produção isto troca-se por Postgres/Prisma sem
 * mexer nas páginas, porque tudo passa por estas funções.
 */

const FICHEIRO = path.join(process.cwd(), "data", "db.json");

let cache: Base | null = null;
/** Quando o disco é só de leitura (ex.: Vercel) ficamos em memória. */
let apenasMemoria = false;

function carregar(): Base {
  if (cache) return cache;
  try {
    cache = JSON.parse(fs.readFileSync(FICHEIRO, "utf8")) as Base;
  } catch {
    cache = semente();
    guardar();
  }
  return cache;
}

function guardar(): void {
  if (!cache || apenasMemoria) return;
  try {
    fs.mkdirSync(path.dirname(FICHEIRO), { recursive: true });
    fs.writeFileSync(FICHEIRO, JSON.stringify(cache, null, 2));
  } catch {
    // Disco só de leitura: a demo continua, mas as alterações só duram
    // enquanto o processo estiver vivo.
    apenasMemoria = true;
  }
}

export function base(): Base {
  return carregar();
}

export function alterar(fn: (b: Base) => void): void {
  const b = carregar();
  fn(b);
  guardar();
}

/** Repõe os dados de demonstração. */
export function reiniciar(): void {
  cache = semente();
  apenasMemoria = false;
  guardar();
}

// —— Leituras ————————————————————————————————————————————————

export function clientes(): Cliente[] {
  return base().clientes.filter((c) => c.consultorId === CONSULTOR_ID);
}

export function cliente(id: string): Cliente | undefined {
  return clientes().find((c) => c.id === id);
}

export function pedidos(): Pedido[] {
  return base()
    .pedidos.filter((p) => p.consultorId === CONSULTOR_ID)
    .sort((a, b) => b.criadoEm.localeCompare(a.criadoEm));
}

export function pedido(id: string): Pedido | undefined {
  return pedidos().find((p) => p.id === id);
}

export function pedidosDe(clienteId: string): Pedido[] {
  return pedidos().filter((p) => p.clienteId === clienteId);
}

export function propostas(): Proposta[] {
  return base()
    .propostas.filter((p) => p.consultorId === CONSULTOR_ID)
    .sort((a, b) => b.criadoEm.localeCompare(a.criadoEm));
}

export function proposta(id: string): Proposta | undefined {
  return propostas().find((p) => p.id === id);
}

export function propostaPorToken(tok: string): Proposta | undefined {
  return base().propostas.find((p) => p.token === tok);
}

export function propostasDe(clienteId: string): Proposta[] {
  return propostas().filter((p) => p.clienteId === clienteId);
}

export function viagens(): Viagem[] {
  return base().viagens.filter((v) => v.consultorId === CONSULTOR_ID);
}

export function viagemPorToken(tok: string): Viagem | undefined {
  return base().viagens.find((v) => v.token === tok);
}

export function viagensDe(clienteId: string): Viagem[] {
  return viagens().filter((v) => v.clienteId === clienteId);
}

export function viagemDaProposta(propostaId: string): Viagem | undefined {
  return viagens().find((v) => v.propostaId === propostaId);
}

// —— Métricas do dashboard ——————————————————————————————————

export interface Metricas {
  pedidosNovos: number;
  propostasEnviadas: number;
  taxaConversao: number;
  receitaGanha: number;
  valorMedio: number;
  ltvMedio: number;
  porMes: { mes: string; valor: number }[];
}

export function metricas(): Metricas {
  const props = propostas();
  const decididas = props.filter(
    (p) => p.estado === "aceite" || p.estado === "recusada",
  );
  const aceites = props.filter((p) => p.estado === "aceite");
  const receita = aceites.reduce((s, p) => s + p.precoTotal, 0);
  const cls = clientes();

  // Receita ganha por mês, dos últimos 6 meses com atividade.
  const mapa = new Map<string, number>();
  for (const p of aceites) {
    const mes = p.criadoEm.slice(0, 7);
    mapa.set(mes, (mapa.get(mes) ?? 0) + p.precoTotal);
  }
  const porMes = [...mapa.entries()]
    .sort((a, b) => a[0].localeCompare(b[0]))
    .slice(-6)
    .map(([mes, valor]) => ({ mes, valor }));

  return {
    pedidosNovos: pedidos().filter((p) => p.estado === "novo").length,
    propostasEnviadas: props.filter((p) => p.estado === "enviada").length,
    taxaConversao: decididas.length
      ? Math.round((aceites.length / decididas.length) * 100)
      : 0,
    receitaGanha: receita,
    valorMedio: aceites.length ? Math.round(receita / aceites.length) : 0,
    ltvMedio: cls.length ? Math.round(receita / cls.length) : 0,
    porMes,
  };
}
