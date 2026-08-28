/**
 * Modelo de dados da plataforma.
 *
 * Nota sobre multi-tenant: hoje há um consultor só, mas todas as entidades
 * carregam `consultorId`. Quando (e se) houver mais consultores, basta filtrar
 * por esse campo em vez de reescrever o modelo.
 */

export type Idioma = "pt" | "en" | "es" | "fr";

export type EstadoPedido = "novo" | "em_proposta" | "ganho" | "perdido";
export type EstadoProposta = "rascunho" | "enviada" | "aceite" | "recusada";
export type EstadoMarco = "por_fazer" | "feito";

export type Ritmo = "tranquilo" | "equilibrado" | "intenso";
export type Alojamento = "boutique" | "luxo" | "familiar" | "economico";

export interface Preferencias {
  estilo: string;
  ritmo: Ritmo;
  alojamento: Alojamento;
  interesses: string[];
  restricoes: string;
  orcamentoTipico: number;
}

export interface Cliente {
  id: string;
  consultorId: string;
  nome: string;
  email: string;
  telefone: string;
  pais: string;
  idioma: Idioma;
  preferencias: Preferencias;
  notas: string;
  criadoEm: string;
}

export interface Pedido {
  id: string;
  consultorId: string;
  clienteId: string;
  destino: string;
  dataInicio: string;
  dataFim: string;
  adultos: number;
  criancas: number;
  orcamento: number;
  mensagem: string;
  estado: EstadoPedido;
  origem: "formulario" | "whatsapp" | "email" | "referencia";
  criadoEm: string;
}

export interface DiaItinerario {
  dia: number;
  titulo: string;
  descricao: string;
  alojamento: string;
  atividades: string[];
  refeicoes: string;
}

export interface Proposta {
  id: string;
  consultorId: string;
  clienteId: string;
  pedidoId: string;
  /** Token do link privado partilhado com o cliente (/p/<token>). */
  token: string;
  titulo: string;
  destino: string;
  resumo: string;
  dias: DiaItinerario[];
  incluido: string[];
  naoIncluido: string[];
  precoTotal: number;
  moeda: string;
  viajantes: number;
  estado: EstadoProposta;
  criadoEm: string;
  enviadaEm: string | null;
  /** true quando o itinerário veio do motor local em vez do modelo. */
  geradaLocalmente: boolean;
}

export interface Marco {
  id: string;
  titulo: string;
  descricao: string;
  data: string | null;
  estado: EstadoMarco;
}

export interface Documento {
  id: string;
  nome: string;
  tipo: string;
}

export interface Viagem {
  id: string;
  consultorId: string;
  clienteId: string;
  propostaId: string;
  /** Token do portal do cliente (/portal/<token>). */
  token: string;
  titulo: string;
  destino: string;
  dataInicio: string;
  dataFim: string;
  valor: number;
  marcos: Marco[];
  documentos: Documento[];
}

export interface Base {
  clientes: Cliente[];
  pedidos: Pedido[];
  propostas: Proposta[];
  viagens: Viagem[];
}
