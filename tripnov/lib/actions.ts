"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import * as db from "./store";
import { gerarItinerario } from "./ai";
import { id, token } from "./format";
import { CONSULTOR_ID } from "./marca";
import type { Marco, Pedido, Proposta } from "./types";

/** Formulário público de pedido. Cria o cliente se ainda não existir. */
export async function receberPedido(form: FormData): Promise<void> {
  const nome = String(form.get("nome") ?? "").trim();
  const email = String(form.get("email") ?? "").trim().toLowerCase();
  if (!nome || !email) return;

  let clienteId = db
    .clientes()
    .find((c) => c.email.toLowerCase() === email)?.id;

  db.alterar((b) => {
    if (!clienteId) {
      clienteId = id("cli");
      b.clientes.push({
        id: clienteId,
        consultorId: CONSULTOR_ID,
        nome,
        email,
        telefone: String(form.get("telefone") ?? ""),
        pais: "Portugal",
        idioma: "pt",
        preferencias: {
          estilo: String(form.get("estilo") ?? ""),
          ritmo: "equilibrado",
          alojamento: "boutique",
          interesses: String(form.get("interesses") ?? "")
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean),
          restricoes: String(form.get("restricoes") ?? ""),
          orcamentoTipico: Number(form.get("orcamento") ?? 0),
        },
        notas: "",
        criadoEm: new Date().toISOString().slice(0, 10),
      });
    }

    const pedido: Pedido = {
      id: id("ped"),
      consultorId: CONSULTOR_ID,
      clienteId: clienteId!,
      destino: String(form.get("destino") ?? ""),
      dataInicio: String(form.get("dataInicio") ?? ""),
      dataFim: String(form.get("dataFim") ?? ""),
      adultos: Number(form.get("adultos") ?? 2),
      criancas: Number(form.get("criancas") ?? 0),
      orcamento: Number(form.get("orcamento") ?? 0),
      mensagem: String(form.get("mensagem") ?? ""),
      estado: "novo",
      origem: "formulario",
      criadoEm: new Date().toISOString().slice(0, 10),
    };
    b.pedidos.push(pedido);
  });

  revalidatePath("/");
  revalidatePath("/pedidos");
  redirect("/pedido/obrigado");
}

/** Gera a proposta para um pedido e leva o consultor para o editor. */
export async function gerarProposta(form: FormData): Promise<void> {
  const pedidoId = String(form.get("pedidoId"));
  const pedido = db.pedido(pedidoId);
  const cliente = pedido ? db.cliente(pedido.clienteId) : undefined;
  if (!pedido || !cliente) return;

  const it = await gerarItinerario(cliente, pedido);
  const novaId = id("prop");

  db.alterar((b) => {
    const nova: Proposta = {
      id: novaId,
      consultorId: CONSULTOR_ID,
      clienteId: cliente.id,
      pedidoId: pedido.id,
      token: token(),
      titulo: it.titulo,
      destino: pedido.destino,
      resumo: it.resumo,
      dias: it.dias,
      incluido: it.incluido,
      naoIncluido: it.naoIncluido,
      precoTotal: it.precoTotal,
      moeda: "EUR",
      viajantes: pedido.adultos + pedido.criancas,
      estado: "rascunho",
      criadoEm: new Date().toISOString().slice(0, 10),
      enviadaEm: null,
      geradaLocalmente: it.geradaLocalmente,
    };
    b.propostas.push(nova);
    const p = b.pedidos.find((x) => x.id === pedido.id);
    if (p && p.estado === "novo") p.estado = "em_proposta";
  });

  revalidatePath("/");
  revalidatePath("/propostas");
  redirect(`/propostas/${novaId}`);
}

export async function guardarProposta(form: FormData): Promise<void> {
  const propostaId = String(form.get("propostaId"));
  const p = db.proposta(propostaId);
  if (!p) return;

  db.alterar((b) => {
    const alvo = b.propostas.find((x) => x.id === propostaId);
    if (!alvo) return;
    alvo.titulo = String(form.get("titulo") ?? alvo.titulo);
    alvo.resumo = String(form.get("resumo") ?? alvo.resumo);
    alvo.precoTotal = Number(form.get("precoTotal") ?? alvo.precoTotal);
    alvo.dias = alvo.dias.map((d) => ({
      ...d,
      titulo: String(form.get(`dia_${d.dia}_titulo`) ?? d.titulo),
      descricao: String(form.get(`dia_${d.dia}_descricao`) ?? d.descricao),
      alojamento: String(form.get(`dia_${d.dia}_alojamento`) ?? d.alojamento),
    }));
  });

  revalidatePath(`/propostas/${propostaId}`);
}

export async function enviarProposta(form: FormData): Promise<void> {
  const propostaId = String(form.get("propostaId"));
  db.alterar((b) => {
    const alvo = b.propostas.find((x) => x.id === propostaId);
    if (!alvo || alvo.estado !== "rascunho") return;
    alvo.estado = "enviada";
    alvo.enviadaEm = new Date().toISOString().slice(0, 10);
  });
  revalidatePath("/");
  revalidatePath("/propostas");
  revalidatePath(`/propostas/${propostaId}`);
}

/**
 * Cliente aceitou. Cria a viagem e o portal, com os marcos habituais já
 * datados a partir das datas do pedido.
 */
export async function aceitarProposta(form: FormData): Promise<void> {
  const propostaId = String(form.get("propostaId"));
  const p = db.proposta(propostaId);
  const ped = p ? db.pedido(p.pedidoId) : undefined;
  if (!p || !ped || db.viagemDaProposta(propostaId)) return;

  const hoje = new Date().toISOString().slice(0, 10);
  const menos = (dias: number) => {
    const d = new Date(ped.dataInicio);
    d.setDate(d.getDate() - dias);
    return d.toISOString().slice(0, 10);
  };
  const mais = (dias: number) => {
    const d = new Date(ped.dataFim);
    d.setDate(d.getDate() + dias);
    return d.toISOString().slice(0, 10);
  };

  const marcos: Marco[] = [
    { id: "m1", titulo: "Proposta aceite", descricao: "Tudo confirmado. Bem-vindo a bordo.", data: hoje, estado: "feito" },
    { id: "m2", titulo: "Sinal pago", descricao: "30% do valor total.", data: null, estado: "por_fazer" },
    { id: "m3", titulo: "Voos emitidos", descricao: "Bilhetes no separador de documentos.", data: null, estado: "por_fazer" },
    { id: "m4", titulo: "Alojamento confirmado", descricao: "", data: null, estado: "por_fazer" },
    { id: "m5", titulo: "Pagamento final", descricao: "Até 30 dias antes da partida.", data: menos(30), estado: "por_fazer" },
    { id: "m6", titulo: "Check-in 48h antes", descricao: "Tratamos nós e enviamos os cartões de embarque.", data: menos(2), estado: "por_fazer" },
    { id: "m7", titulo: "Partida", descricao: "Boa viagem.", data: ped.dataInicio, estado: "por_fazer" },
    { id: "m8", titulo: "Regresso", descricao: "", data: ped.dataFim, estado: "por_fazer" },
    { id: "m9", titulo: "Como correu?", descricao: "Um minuto a contar-nos, para afinarmos a próxima.", data: mais(3), estado: "por_fazer" },
  ];

  db.alterar((b) => {
    const alvo = b.propostas.find((x) => x.id === propostaId);
    if (alvo) alvo.estado = "aceite";
    const pd = b.pedidos.find((x) => x.id === ped.id);
    if (pd) pd.estado = "ganho";
    b.viagens.push({
      id: id("via"),
      consultorId: CONSULTOR_ID,
      clienteId: p.clienteId,
      propostaId: p.id,
      token: token(),
      titulo: p.titulo,
      destino: p.destino,
      dataInicio: ped.dataInicio,
      dataFim: ped.dataFim,
      valor: p.precoTotal,
      marcos,
      documentos: [{ id: "d1", nome: "Itinerário completo", tipo: "PDF" }],
    });
  });

  revalidatePath("/");
  revalidatePath("/propostas");
  revalidatePath(`/propostas/${propostaId}`);
}

export async function recusarProposta(form: FormData): Promise<void> {
  const propostaId = String(form.get("propostaId"));
  db.alterar((b) => {
    const alvo = b.propostas.find((x) => x.id === propostaId);
    if (!alvo) return;
    alvo.estado = "recusada";
    const pd = b.pedidos.find((x) => x.id === alvo.pedidoId);
    if (pd) pd.estado = "perdido";
  });
  revalidatePath("/");
  revalidatePath("/propostas");
  revalidatePath(`/propostas/${propostaId}`);
}

/** Marca um passo da viagem como feito (ou por fazer). É o motor de automações em miniatura. */
export async function alternarMarco(form: FormData): Promise<void> {
  const viagemId = String(form.get("viagemId"));
  const marcoId = String(form.get("marcoId"));
  db.alterar((b) => {
    const v = b.viagens.find((x) => x.id === viagemId);
    const m = v?.marcos.find((x) => x.id === marcoId);
    if (!m) return;
    if (m.estado === "feito") {
      m.estado = "por_fazer";
    } else {
      m.estado = "feito";
      m.data ??= new Date().toISOString().slice(0, 10);
    }
  });
  revalidatePath("/viagens");
}

export async function reiniciarDemo(): Promise<void> {
  db.reiniciar();
  revalidatePath("/", "layout");
  redirect("/");
}
