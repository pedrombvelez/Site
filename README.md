# Para a mamã do Pedrinho

Um livro interativo, em aguarela, para ela ir descobrindo os pequenos segredos
deste primeiro Dia da Mãe.

## Como mexer

Tudo o que escreves (títulos, frases, posições dos pontinhos clicáveis,
caminhos das fotos e dos vídeos) está num único ficheiro:

- `lib/content.ts`

Não precisas de tocar em nenhum componente para personalizar o livro.

### 1. Trocar fotos e vídeos

1. Mete os ficheiros em `public/media/` (ex.: `public/media/sorriso.jpg`,
   `public/media/gargalhada.mp4`).
2. Em `lib/content.ts`, dentro de cada `hotspot`, substitui o `src` que está em
   `https://picsum.photos/...` por `"/media/sorriso.jpg"`, `"/media/gargalhada.mp4"`, etc.

Vídeos: usa MP4 (H.264) — funciona em todo o lado, incluindo iPhone.

### 2. Trocar mensagens

Cada hotspot tem um campo `reveal`. As mensagens são `type: "message"` —
edita o `text` (e o `signature` opcional).

### 3. Mover os pontinhos clicáveis

Cada hotspot tem `x` e `y` em **percentagem** (0 a 100) da página. Vai mexendo
até ficarem em sítios bonitos da ilustração de fundo.

### 4. Mudar fundos por ilustrações próprias

Se quiseres usar ilustrações em aguarela próprias, mete-as em
`public/illustrations/` e em `lib/content.ts` troca o campo `background` de cada
capítulo por `"/illustrations/o-teu-ficheiro.png"`.

## Correr localmente

```bash
npm install
npm run dev
```

Abre http://localhost:3000.

## Deploy na Vercel

1. Faz push deste repositório para o GitHub.
2. Em https://vercel.com/new importa o repo.
3. Vercel detecta Next.js automaticamente — clica em **Deploy**.
4. Em segundos tens o link para enviar à mamã. ♡

## Stack

Next.js 16 (App Router) · Tailwind CSS v4 · Framer Motion · Radix Dialog ·
canvas-confetti · Lucide icons · tipografia Cormorant Garamond + Caveat.
