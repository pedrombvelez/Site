import Anthropic from "@anthropic-ai/sdk";
import { z } from "zod";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod";
import type { Cliente, DiaItinerario, Pedido } from "./types";
import { noites } from "./format";
import { marca } from "./marca";

/**
 * Geração de propostas.
 *
 * Com ANTHROPIC_API_KEY definida, o itinerário é escrito pelo modelo a partir
 * do perfil do cliente e do pedido. Sem chave, cai num motor determinístico
 * local — a demo continua a funcionar offline, apenas com menos alma.
 */

const Itinerario = z.object({
  titulo: z
    .string()
    .describe("Título curto e concreto da viagem, sem palavras de brochura"),
  resumo: z
    .string()
    .describe(
      "Dois a três períodos a explicar as escolhas do itinerário e como respondem ao que o cliente pediu",
    ),
  dias: z.array(
    z.object({
      dia: z.number(),
      titulo: z.string(),
      descricao: z.string(),
      alojamento: z.string(),
      atividades: z.array(z.string()),
      refeicoes: z.string(),
    }),
  ),
  incluido: z.array(z.string()),
  naoIncluido: z.array(z.string()),
  precoTotal: z
    .number()
    .describe("Preço total para todos os viajantes, em euros"),
});

export type ItinerarioGerado = z.infer<typeof Itinerario> & {
  geradaLocalmente: boolean;
};

const IDIOMAS: Record<string, string> = {
  pt: "português europeu",
  en: "inglês",
  es: "espanhol",
  fr: "francês",
};

function briefing(cliente: Cliente, pedido: Pedido): string {
  const dias = noites(pedido.dataInicio, pedido.dataFim) + 1;

  return [
    `Cliente: ${cliente.nome}, de ${cliente.pais}.`,
    `Estilo de viagem: ${cliente.preferencias.estilo}.`,
    `Ritmo preferido: ${cliente.preferencias.ritmo}.`,
    `Tipo de alojamento: ${cliente.preferencias.alojamento}.`,
    `Interesses: ${cliente.preferencias.interesses.join(", ")}.`,
    `Restrições e avisos: ${cliente.preferencias.restricoes || "nenhuma"}.`,
    `Notas do consultor: ${cliente.notas || "nenhuma"}.`,
    "",
    `Destino: ${pedido.destino}.`,
    `Datas: ${pedido.dataInicio} a ${pedido.dataFim} (${dias} dias).`,
    `Viajantes: ${pedido.adultos} adultos e ${pedido.criancas} crianças.`,
    `Orçamento indicado: ${pedido.orcamento} € no total.`,
    `Pedido, nas palavras do cliente: "${pedido.mensagem}"`,
  ].join("\n");
}

const SISTEMA = `És o assistente de propostas de ${marca.nome}, a agência de ${marca.consultor}.

Escreves itinerários que um consultor de viagens experiente assinaria sem
reescrever. Isso significa:

- Cada dia tem um propósito. Nada de "dia livre para explorar a cidade".
- As restrições do cliente são absolutas. Uma alergia, uma criança que enjoa,
  um orçamento apertado — tudo isso muda o itinerário, não é uma nota de rodapé.
- O ritmo pedido manda. Num ritmo tranquilo há dias sem nada marcado, e dizes
  isso abertamente em vez de encher.
- Nomes concretos: bairros, praias, trilhos, tipos de alojamento. Se não tens
  a certeza de um nome próprio, descreve em vez de inventar.
- Sem linguagem de brochura. Nada de "experiência inesquecível", "joia
  escondida", "paraíso na terra".
- O preço total deve ficar próximo do orçamento indicado, sem o ultrapassar em
  mais de 10%. Se o orçamento não chegar para o que o cliente pediu, faz o
  itinerário que o orçamento paga e explica-o no resumo.`;

export async function gerarItinerario(
  cliente: Cliente,
  pedido: Pedido,
): Promise<ItinerarioGerado> {
  if (!process.env.ANTHROPIC_API_KEY) {
    return { ...localmente(cliente, pedido), geradaLocalmente: true };
  }

  const client = new Anthropic();
  const dias = noites(pedido.dataInicio, pedido.dataFim) + 1;

  try {
    const resposta = await client.messages.parse({
      model: "claude-opus-5",
      max_tokens: 16000,
      thinking: { type: "adaptive" },
      system: SISTEMA,
      messages: [
        {
          role: "user",
          content: `${briefing(cliente, pedido)}

Escreve o itinerário completo, com exatamente ${dias} dias (o primeiro é o de
chegada e o último o de regresso). Escreve em ${IDIOMAS[cliente.idioma] ?? "português europeu"}.`,
        },
      ],
      output_config: { format: zodOutputFormat(Itinerario) },
    });

    if (!resposta.parsed_output) {
      return { ...localmente(cliente, pedido), geradaLocalmente: true };
    }
    return { ...resposta.parsed_output, geradaLocalmente: false };
  } catch {
    // Sem rede, sem quota, chave inválida — a proposta sai à mesma.
    return { ...localmente(cliente, pedido), geradaLocalmente: true };
  }
}

// —— Motor local ——————————————————————————————————————————————

/**
 * Esqueleto determinístico. Não substitui o modelo: dá ao consultor uma
 * estrutura correcta em datas, ritmo e preço, para ele preencher à mão.
 */
function localmente(
  cliente: Cliente,
  pedido: Pedido,
): z.infer<typeof Itinerario> {
  const total = noites(pedido.dataInicio, pedido.dataFim) + 1;
  const viajantes = pedido.adultos + pedido.criancas;
  const { ritmo, alojamento, interesses } = cliente.preferencias;

  // Num ritmo tranquilo, um em cada três dias fica sem nada marcado.
  const passoDeFolga = ritmo === "tranquilo" ? 3 : ritmo === "equilibrado" ? 4 : 0;

  const estadia: Record<string, string> = {
    luxo: `Hotel de cinco estrelas, ${pedido.destino}`,
    boutique: `Hotel boutique, ${pedido.destino}`,
    familiar: `Aparthotel familiar com piscina, ${pedido.destino}`,
    economico: `Guesthouse bem localizada, ${pedido.destino}`,
  };
  const casa = estadia[alojamento] ?? `Alojamento em ${pedido.destino}`;

  const dias: DiaItinerario[] = [];
  for (let d = 1; d <= total; d++) {
    if (d === 1) {
      dias.push({
        dia: 1,
        titulo: `Chegada a ${pedido.destino}`,
        descricao:
          "Voo, transfer e check-in. Sem nada marcado para o resto do dia.",
        alojamento: casa,
        atividades: ["Transfer do aeroporto"],
        refeicoes: "—",
      });
      continue;
    }
    if (d === total) {
      dias.push({
        dia: d,
        titulo: "Regresso",
        descricao: "Manhã livre, check-out e transfer para o aeroporto.",
        alojamento: "—",
        atividades: ["Transfer para o aeroporto"],
        refeicoes: "Pequeno-almoço",
      });
      continue;
    }
    if (passoDeFolga && d % passoDeFolga === 0) {
      dias.push({
        dia: d,
        titulo: "Dia sem nada marcado",
        descricao:
          "Deixado de propósito por marcar — o ritmo pedido não comporta mais um dia cheio.",
        alojamento: casa,
        atividades: [],
        refeicoes: "Pequeno-almoço",
      });
      continue;
    }
    const foco = interesses[(d - 2) % Math.max(1, interesses.length)] ?? "Descoberta";
    dias.push({
      dia: d,
      titulo: `${foco}`,
      descricao: `Dia dedicado a ${foco.toLowerCase()} — a preencher pelo consultor com os locais concretos.`,
      alojamento: casa,
      atividades: [foco],
      refeicoes: "Pequeno-almoço",
    });
  }

  return {
    titulo: `${pedido.destino}, ${total} dias`,
    resumo:
      `Esqueleto de ${total} dias para ${viajantes} ${viajantes === 1 ? "viajante" : "viajantes"}, ` +
      `montado a partir do perfil de ${cliente.nome.split(" ")[0]} e do orçamento indicado. ` +
      `Gerado sem o modelo (falta a chave ANTHROPIC_API_KEY), por isso os dias trazem estrutura mas não conteúdo.`,
    dias,
    incluido: [
      "Voos ida e volta",
      `${total - 1} noites de alojamento`,
      "Transfers de e para o aeroporto",
      "Assistência 24h durante a viagem",
    ],
    naoIncluido: ["Seguro de viagem", "Refeições não indicadas", "Extras pessoais"],
    // Deixa 5% de margem abaixo do orçamento indicado.
    precoTotal: Math.round((pedido.orcamento * 0.95) / 10) * 10,
  };
}
