// ⭐ EDITA AQUI ⭐
// Toda a história está neste ficheiro. Texto, fotos, vídeos e mensagens.
// Quando tiveres as fotos/vídeos do Pedrinho, mete-os em /public/media/
// e troca os URLs picsum.photos por "/media/<ficheiro>".

export type Reveal =
  | { type: "photo"; src: string; caption?: string }
  | { type: "video"; src: string; poster?: string; caption?: string }
  | { type: "message"; text: string; signature?: string };

export type Hotspot = {
  id: string;
  /** posição em percentagem da largura/altura da página (0-100) */
  x: number;
  y: number;
  /** ícone visual: heart | star | sparkle | flower | moon | sun | leaf */
  icon?: "heart" | "star" | "sparkle" | "flower" | "moon" | "sun" | "leaf";
  /** texto do tooltip ao passar com o rato / etiqueta de descoberta */
  label: string;
  reveal: Reveal;
};

export type Chapter = {
  id: number;
  title: string;
  subtitle?: string;
  /** imagem de fundo da página (ilustração aguarela). Pode ser URL ou caminho /illustrations/... */
  background: string;
  /** texto narrativo principal da página */
  intro: string;
  /** linha "manuscrita" mais pequena por baixo (opcional) */
  note?: string;
  hotspots: Hotspot[];
};

// Pequeno helper para fundos placeholder consistentes (picsum com seed)
const bg = (seed: string) =>
  `https://picsum.photos/seed/${seed}/1600/1100?grayscale&blur=1`;

export const BOOK_TITLE = "Para a mamã do Pedrinho";
export const BOOK_SUBTITLE = "um livro pequenino, com muito amor";
export const BABY_NAME = "Pedrinho";

export const CHAPTERS: Chapter[] = [
  {
    id: 1,
    title: "A notícia",
    subtitle: "o dia em que tudo começou",
    background: bg("noticia-pastel"),
    intro:
      "Houve um dia, sem aviso, em que duas linhas mudaram o mundo. " +
      "Tu sorriste de uma maneira diferente. Eu chorei de uma maneira diferente. " +
      "E a casa, sem fazer barulho, ficou para sempre maior.",
    note: "clica nos pontinhos da página para descobrires...",
    hotspots: [
      {
        id: "c1-h1",
        x: 22,
        y: 38,
        icon: "sparkle",
        label: "O teste",
        reveal: {
          type: "photo",
          src: "https://picsum.photos/seed/teste/900/1200",
          caption: "(troca por uma foto do teste, ou da nossa cara nesse dia)",
        },
      },
      {
        id: "c1-h2",
        x: 70,
        y: 30,
        icon: "heart",
        label: "O que eu senti",
        reveal: {
          type: "message",
          text:
            "Senti o chão a abrir-se em flores. Senti medo, do bom. " +
            "Olhei para ti e pensei: nunca, em toda a minha vida, te vi tão bonita.",
          signature: "— teu marido",
        },
      },
      {
        id: "c1-h3",
        x: 55,
        y: 72,
        icon: "star",
        label: "A primeira promessa",
        reveal: {
          type: "message",
          text:
            "Prometi a mim mesmo que te ia tratar como uma rainha durante toda esta viagem. " +
            "Espero estar a cumprir, mamã.",
        },
      },
    ],
  },
  {
    id: 2,
    title: "A espera",
    subtitle: "nove meses, mil conversas",
    background: bg("espera-aguarela"),
    intro:
      "A barriga começou a ser uma casa. Falávamos contigo todas as noites — " +
      "tu respondias com pontapés certeiros, sempre que eu cantava mal. " +
      "A mamã andava radiante, e o mundo parecia preparar-se para te receber.",
    note: "três coisas escondidas nesta página",
    hotspots: [
      {
        id: "c2-h1",
        x: 30,
        y: 28,
        icon: "moon",
        label: "A primeira ecografia",
        reveal: {
          type: "photo",
          src: "https://picsum.photos/seed/ecografia/900/1200",
          caption: "Olá, feijãozinho. (substituir pela ecografia real)",
        },
      },
      {
        id: "c2-h2",
        x: 75,
        y: 55,
        icon: "flower",
        label: "Barriga em flor",
        reveal: {
          type: "photo",
          src: "https://picsum.photos/seed/barriga/900/1200",
          caption: "A casa onde o Pedrinho viveu primeiro.",
        },
      },
      {
        id: "c2-h3",
        x: 48,
        y: 78,
        icon: "heart",
        label: "Carta à barriga",
        reveal: {
          type: "message",
          text:
            "Falávamos contigo todas as noites. Tu não sabes, " +
            "mas a mamã passava as mãos pela barriga como quem afaga o universo. " +
            "Acho que aprendeste a amá-la antes de aprenderes a respirar.",
        },
      },
    ],
  },
  {
    id: 3,
    title: "A chegada",
    subtitle: "o dia em que apareceste",
    background: bg("chegada-rosa"),
    intro:
      "Chegaste com pressa e com calma, ao mesmo tempo. " +
      "Eu olhei primeiro para ti — minúsculo, perfeito — e logo a seguir para ela. " +
      "E percebi, naquele segundo, que tinha duas vidas para proteger para sempre.",
    note: "três descobertas",
    hotspots: [
      {
        id: "c3-h1",
        x: 28,
        y: 40,
        icon: "sun",
        label: "A primeira foto",
        reveal: {
          type: "photo",
          src: "https://picsum.photos/seed/primeira-foto/900/1200",
          caption: "Olá, mundo. (troca pela primeira foto do Pedrinho)",
        },
      },
      {
        id: "c3-h2",
        x: 65,
        y: 32,
        icon: "star",
        label: "Hora, peso, milagre",
        reveal: {
          type: "message",
          text:
            "Pedrinho • [hora] • [peso] • [comprimento]\n" +
            "(edita estes valores em lib/content.ts — ficam aqui guardados como o bilhete da tua maternidade)",
        },
      },
      {
        id: "c3-h3",
        x: 50,
        y: 75,
        icon: "heart",
        label: "Vídeo do hospital",
        reveal: {
          type: "video",
          src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
          caption:
            "(substituir por um vídeo curto do hospital — em /public/media/hospital.mp4)",
        },
      },
    ],
  },
  {
    id: 4,
    title: "Os primeiros dias",
    subtitle: "noites curtas, colos longos",
    background: bg("primeiros-dias"),
    intro:
      "A casa cheirava a fralda lavada e a leite morno. " +
      "Tu, mamã, parecias cansada e linda em proporções iguais. " +
      "Eu fazia chá às três da manhã e tu fazias o mundo girar.",
    note: "três pequenos segredos",
    hotspots: [
      {
        id: "c4-h1",
        x: 25,
        y: 35,
        icon: "moon",
        label: "A dormir ao colo",
        reveal: {
          type: "photo",
          src: "https://picsum.photos/seed/colo/900/1200",
          caption: "Cabias todo num antebraço.",
        },
      },
      {
        id: "c4-h2",
        x: 72,
        y: 48,
        icon: "flower",
        label: "Primeiro banho",
        reveal: {
          type: "photo",
          src: "https://picsum.photos/seed/primeiro-banho/900/1200",
          caption: "Cara de quem estava a julgar a temperatura.",
        },
      },
      {
        id: "c4-h3",
        x: 45,
        y: 78,
        icon: "heart",
        label: "Para ti, naqueles dias",
        reveal: {
          type: "message",
          text:
            "Tu eras incrível e nem sabias. " +
            "Davas peito de noite, cantavas baixinho, e ainda tinhas força para sorrir " +
            "quando eu te trazia a sopa fria. Eu vi tudo. Eu lembro-me de tudo.",
          signature: "— para sempre, o teu",
        },
      },
    ],
  },
  {
    id: 5,
    title: "Pequenas conquistas",
    subtitle: "primeiros sorrisos, primeiras gargalhadas",
    background: bg("conquistas-pastel"),
    intro:
      "Cada dia trazia uma estreia. O primeiro sorriso (foi para ti, claro). " +
      "A primeira gargalhada (foi quando o pai fez de cão). " +
      "A primeira noite a dormir seguida (essa, choraste tu de alegria, mamã).",
    note: "três conquistas escondidas",
    hotspots: [
      {
        id: "c5-h1",
        x: 28,
        y: 32,
        icon: "sun",
        label: "Primeiro sorriso",
        reveal: {
          type: "photo",
          src: "https://picsum.photos/seed/sorriso/900/1200",
          caption: "(substituir por foto do primeiro sorriso)",
        },
      },
      {
        id: "c5-h2",
        x: 70,
        y: 55,
        icon: "sparkle",
        label: "Primeira gargalhada",
        reveal: {
          type: "video",
          src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
          caption: "(troca por /media/gargalhada.mp4 quando tiveres)",
        },
      },
      {
        id: "c5-h3",
        x: 50,
        y: 80,
        icon: "star",
        label: "A primeira noite inteira",
        reveal: {
          type: "message",
          text:
            "Acordaste com o sol em vez de à uma da manhã. " +
            "Tu, mamã, abriste os olhos, olhaste para o relógio, e disseste, baixinho: " +
            "«acho que ele me ama mesmo». E eu pensei: pois claro que sim.",
        },
      },
    ],
  },
  {
    id: 6,
    title: "Os nossos dias",
    subtitle: "cinco meses inteirinhos",
    background: bg("rotina-aguarela"),
    intro:
      "Hoje o Pedrinho tem cinco meses. " +
      "Mexe-se, agarra coisas, faz som de avião quando come. " +
      "E tu, mamã, és a paisagem mais bonita destes nossos dias pequeninos.",
    note: "três momentos do dia-a-dia",
    hotspots: [
      {
        id: "c6-h1",
        x: 25,
        y: 30,
        icon: "leaf",
        label: "Hora de brincar",
        reveal: {
          type: "photo",
          src: "https://picsum.photos/seed/brincar/900/1200",
          caption: "O móbile continua imbatível.",
        },
      },
      {
        id: "c6-h2",
        x: 72,
        y: 45,
        icon: "flower",
        label: "Hora do banho",
        reveal: {
          type: "photo",
          src: "https://picsum.photos/seed/banho/900/1200",
          caption: "Esponja em forma de pato. Sempre.",
        },
      },
      {
        id: "c6-h3",
        x: 48,
        y: 75,
        icon: "moon",
        label: "Sesta no peito da mamã",
        reveal: {
          type: "photo",
          src: "https://picsum.photos/seed/sesta/900/1200",
          caption: "O sítio mais seguro do mundo.",
        },
      },
    ],
  },
  {
    id: 7,
    title: "Carta do Pedrinho à mamã",
    subtitle: "para leres devagarinho",
    background: bg("carta-final"),
    intro:
      "Mamã,\n\n" +
      "Eu ainda não sei falar, mas o pai escreve por mim. " +
      "Quero dizer-te que tu és o sítio onde eu sou feliz. " +
      "És a primeira voz que eu reconheci, és o cheiro do colo, " +
      "és a luz que eu procuro quando abro os olhos.\n\n" +
      "Obrigado por seres a minha mamã.\n" +
      "Hoje, no teu primeiro Dia da Mãe, eu queria saber dizer-te tudo isto. " +
      "Mas como não sei, deixa-me sorrir-te muitas vezes — vai ser sempre essa " +
      "a minha maneira de te dizer «amo-te».",
    note: "encontra os últimos segredinhos antes do beijinho final",
    hotspots: [
      {
        id: "c7-h1",
        x: 22,
        y: 35,
        icon: "heart",
        label: "Pequeno P.S. do Pedrinho",
        reveal: {
          type: "message",
          text:
            "P.S.: também adoro quando me cantas a do «atirei o pau ao gato». " +
            "Mesmo quando desafinas, mamã. Especialmente quando desafinas.",
        },
      },
      {
        id: "c7-h2",
        x: 75,
        y: 38,
        icon: "sparkle",
        label: "Recado do pai",
        reveal: {
          type: "message",
          text:
            "Vi-te tornar-te mãe com os meus próprios olhos. " +
            "Foi a coisa mais bonita que vi em toda a vida. Obrigado por seres ela. " +
            "Obrigado por seres dele. Obrigado por seres minha.",
          signature: "— teu marido",
        },
      },
      {
        id: "c7-h3",
        x: 50,
        y: 70,
        icon: "flower",
        label: "Foto dos três",
        reveal: {
          type: "photo",
          src: "https://picsum.photos/seed/familia/900/1200",
          caption: "Nós os três. (substituir pela foto preferida da família)",
        },
      },
    ],
  },
];

export const TOTAL_HOTSPOTS = CHAPTERS.reduce(
  (acc, ch) => acc + ch.hotspots.length,
  0,
);

// Mensagem da surpresa final, depois de descobrir todos os hotspots
export const FINAL_MESSAGE = {
  title: "Feliz Dia da Mãe, meu amor",
  body:
    "Descobriste tudo. Tal como descobriste, todos os dias, " +
    "uma maneira nova de seres mãe. Não há um único pedacinho " +
    "deste livro que não tenha sido escrito por causa de ti. " +
    "Obrigado por seres o nosso lar.",
  signature: "— o Pedrinho e o pai",
};
