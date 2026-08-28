# Plataforma para consultor de viagens

Demo funcional de uma plataforma tipo [TripNov](https://tripnov.com), para um
consultor de viagens independente. O objetivo desta versão é **mostrar**, não
ainda vender: corre com `npm run dev`, sem base de dados, sem contas, sem
configuração.

## O que já faz

| Fluxo | Onde |
|---|---|
| Formulário público de pedido, que cai direto no CRM | `/pedido` |
| Pedidos de todas as origens (formulário, WhatsApp, email, recomendação) | `/pedidos` |
| Geração do itinerário com IA a partir do perfil do cliente e do pedido | botão **Gerar proposta** |
| Editor da proposta — título, resumo, preço, dia a dia | `/propostas/[id]` |
| Página de proposta brandada, em link privado, para o cliente | `/p/[token]` |
| Portal do cliente com marcos da viagem e documentos | `/portal/[token]` |
| Ficha do cliente: preferências, restrições, histórico, valor | `/clientes/[id]` |
| Painel com pedidos por responder, conversão e receita | `/` |

O ciclo completo funciona: pedido → proposta gerada → editada → enviada →
aceite → viagem com portal do cliente.

## O que ainda não faz

- **WhatsApp.** É a fase seguinte, e a mais lenta: a Meta exige verificação de
  negócio e aprovação dos templates, o que leva 1 a 3 semanas de burocracia,
  independentemente do código.
- **Automações por milestone.** Hoje os marcos marcam-se à mão em `/viagens`;
  falta o motor que dispara mensagens sozinho.
- **Autenticação.** Não há login. É uma demo — não a ponha na internet aberta
  com dados reais.
- **Reservas a sério** (GDS, inventário, pagamentos a fornecedores). O TripNov
  também não faz isto.
- **Multi-consultor.** O modelo de dados já tem `consultorId` em todas as
  entidades e todas as leituras filtram por ele, por isso a porta fica aberta —
  mas falta o isolamento real, o onboarding e a faturação.

## Correr

```bash
npm install
npm run dev      # http://localhost:3000
```

### Propostas com IA

Sem chave, o gerador cai num **motor determinístico local**: acerta nas datas,
no ritmo e no preço, mas os dias vêm com estrutura e sem conteúdo. A proposta
diz-lhe isso em cima, para não haver enganos.

Com chave, o itinerário é escrito pelo modelo a partir do perfil do cliente,
das restrições e do orçamento:

```bash
cp .env.example .env.local
# ANTHROPIC_API_KEY=sk-ant-...
```

> Nota: o caminho do modelo compila e está tipado, mas **ainda não foi corrido
> contra a API real** — não havia chave no ambiente onde isto foi construído. É
> a primeira coisa a testar.

### Trocar a marca

Tudo o que identifica o consultor está em `.env.local`, não no código:

```bash
NEXT_PUBLIC_MARCA_NOME="Atelier de Viagens"
NEXT_PUBLIC_MARCA_CONSULTOR="Miguel Andrade"
NEXT_PUBLIC_MARCA_EMAIL="miguel@atelierdeviagens.pt"
NEXT_PUBLIC_MARCA_TELEFONE="+351 912 345 678"
```

## Estrutura

```
app/
  (consola)/          # o que o consultor vê — painel, pedidos, propostas, clientes, viagens
  (publico)/          # o que o cliente vê — formulário, proposta, portal
lib/
  types.ts            # modelo de dados
  store.ts            # persistência (JSON em disco) e métricas
  ai.ts               # gerador de itinerários (modelo + motor local)
  actions.ts          # server actions: receber pedido, gerar, guardar, enviar, aceitar
  seed.ts             # dados de demonstração
  marca.ts            # marca do consultor
```

## Dados

Os dados de demonstração são semeados na primeira leitura e guardados em
`data/db.json` (ignorado pelo git). Para voltar ao início, apague o ficheiro e
reinicie o servidor.

Toda a leitura e escrita passa por `lib/store.ts`. Trocar o JSON por
Postgres/Prisma é reescrever esse ficheiro — as páginas não mudam.

## Stack

Next.js 16 (App Router, server actions) · React 19 · Tailwind CSS v4 ·
Anthropic SDK · zod.
