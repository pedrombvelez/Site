# Para a mamã do Pedrinho

Um livro interativo, em aguarela, para ela ir descobrindo os pequenos segredos
deste primeiro Dia da Mãe.

## Privacidade

O site está configurado como **privado**:

- **Palavra-passe** na página de entrada (`/entrar`). Ninguém vê o livro sem a
  saber. Configura em `LIVRO_PASSWORD` (ver abaixo). Default: `pedrinho`.
- **`noindex` + `robots.txt`** — Google e outros motores não indexam o site.
- **Sem OpenGraph** — quando o link for partilhado em WhatsApp/iMessage não
  aparece pré-visualização com a foto/título.
- **Fotos e vídeos atrás do gate**: ficheiros em `/private-media/` são servidos
  pela rota `/api/asset/...` que verifica o cookie. Mesmo que alguém adivinhe
  o nome do ficheiro, sem palavra-passe recebe `403 Forbidden`.

⚠️ Não é encriptação militar — é "gift-grade". Adequado para um presente
familiar, **não** para guardar segredos sensíveis.

### Definir a palavra-passe na Vercel

1. No projeto Vercel: **Settings → Environment Variables**
2. Adiciona `LIVRO_PASSWORD` com o valor escolhido (ex.: o nome da vossa rua,
   uma palavra interna do casal, etc.)
3. Aplica a **Production** e **Preview**
4. Faz **Redeploy** para a variável ter efeito

Localmente: copia `.env.example` para `.env.local` e edita.

## Como mexer no conteúdo

Tudo (títulos, frases, posições dos pontinhos clicáveis, caminhos das fotos e
dos vídeos) está num único ficheiro:

- `lib/content.ts`

Não precisas de tocar em nenhum componente para personalizar o livro.

### 1. Trocar fotos e vídeos (com privacidade)

1. Mete os ficheiros em **`/private-media/`** (não em `/public/`!).
   Exemplos: `private-media/sorriso.jpg`, `private-media/gargalhada.mp4`.
2. Em `lib/content.ts`, dentro de cada `hotspot.reveal`, troca o `src`
   `https://picsum.photos/...` por `"/api/asset/sorriso.jpg"`,
   `"/api/asset/gargalhada.mp4"`, etc.

> Vídeos: usa **MP4 (H.264)** — funciona em todo o lado, incluindo iPhone.
> Para ficheiros grandes considera comprimi-los antes (ex: HandBrake,
> ffmpeg) para o site carregar rápido.

### 2. Trocar mensagens

Cada hotspot tem um campo `reveal`. As mensagens são `type: "message"` —
edita o `text` (e o `signature` opcional).

### 3. Mover os pontinhos clicáveis

Cada hotspot tem `x` e `y` em **percentagem** (0 a 100) da página. Vai mexendo
até ficarem em sítios bonitos da ilustração de fundo.

### 4. Mudar fundos por ilustrações próprias

Ilustrações de fundo dos capítulos podem ficar em **`/public/illustrations/`**
(não são privadas — são paisagens de aguarela, sem fotos da família). Em
`lib/content.ts` põe o campo `background` como `/illustrations/cap1.png`.

Se quiseres que as ilustrações também sejam privadas, mete-as em
`/private-media/` e usa `/api/asset/cap1.png`.

## Correr localmente

```bash
npm install
cp .env.example .env.local   # (opcional, se quiseres mudar a password)
npm run dev
```

Abre http://localhost:3000. Será redirecionado para `/entrar` na primeira
visita; a palavra é a definida em `LIVRO_PASSWORD` (ou `pedrinho` por defeito).

## Deploy na Vercel

1. Faz push deste repositório para o GitHub.
2. Em https://vercel.com/new importa o repo.
3. **Antes** de clicar em Deploy, em *Environment Variables* mete
   `LIVRO_PASSWORD` com a palavra que quiseres.
4. Clica em **Deploy**. Em segundos tens o link para enviar à mamã. ♡

## Stack

Next.js 16 (App Router) · Tailwind CSS v4 · Framer Motion · Radix Dialog ·
canvas-confetti · Lucide icons · tipografia Cormorant Garamond + Caveat.

## Estrutura

```
app/
  entrar/                  # página de palavra-passe
  api/asset/[...path]/     # rota gateada para fotos/vídeos privados
  layout.tsx · page.tsx · globals.css
components/                # Book, Chapter, Hotspot, RevealDialog, ...
lib/
  content.ts               # ⭐ todos os textos e mídia (editar aqui)
  auth.ts · utils.ts
private-media/             # 🔒 fotos/vídeos privados (servidos via /api/asset)
public/
  illustrations/           # fundos de aguarela (públicos)
  robots.txt
middleware.ts              # gate de palavra-passe
```
