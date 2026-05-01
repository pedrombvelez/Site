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
      "Houve um dia, sem aviso, em que uma cruz mudou o mundo. " +
      "Tu sorriste de uma maneira diferente. Eu chorei de uma maneira diferente. " +
      "Com medo e com esperança. " +
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
            "Pedimos na capela em Lyon, soubemos contigo na Suíça e eu em " +
            "Portugal, com viagem marcada para o Brasil. " +
            "Mas nesse dia tudo mudou, para sempre.",
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
            "que íamos ser os melhores pais do mundo, " +
            "e que tudo seria para o nosso pequeno.",
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
      "tu respondias com pontapés certeiros, sempre que eu me enganava no teu nome. " +
      "A mamã corajosa a enfrentar tudo, por ti.",
    note: "quatro coisas escondidas nesta página",
    hotspots: [
      {
        id: "c2-h1",
        x: 25,
        y: 25,
        icon: "moon",
        label: "A ecografia",
        reveal: {
          type: "photo",
          src: "https://picsum.photos/seed/ecografia/900/1200",
          caption: "Olá, Mirtilo.",
        },
      },
      {
        id: "c2-h2",
        x: 75,
        y: 28,
        icon: "flower",
        label: "Barriga em flor",
        reveal: {
          type: "photo",
          src: "https://picsum.photos/seed/barriga/900/1200",
          caption:
            "A casa onde o Pedrinho viveu quando gostava de se vestir de Matilde.",
        },
      },
      {
        id: "c2-h3",
        x: 50,
        y: 55,
        icon: "sparkle",
        label: "Os teus pontapés",
        reveal: {
          type: "video",
          src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
          caption:
            "(troca por um vídeo dos pontapés do Pedrinho na barriga)",
        },
      },
      {
        id: "c2-h4",
        x: 50,
        y: 80,
        icon: "heart",
        label: "Carta à barriga",
        reveal: {
          type: "message",
          text:
            "Falávamos contigo todas as noites. Tu não sabes, " +
            "mas a mamã passou por tudo durante a gravidez. " +
            "Sempre que passava a mão pela barriga, " +
            "sabia que tudo ia valer a pena. " +
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
      "Chegaste com calma, num momento apressado ao mesmo tempo. " +
      "Eu tive medo, muito medo. Até que te ouvi. " +
      "Eu olhei primeiro para ti — minúsculo, perfeito — e só mais tarde para ela. " +
      "E percebi, naquele segundo, que tinha duas vidas para proteger para sempre.",
    note: "três descobertas",
    hotspots: [
      {
        id: "c3-h1",
        x: 28,
        y: 32,
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
        x: 70,
        y: 32,
        icon: "star",
        label: "Hora, peso, milagre",
        reveal: {
          type: "message",
          text: "Pedrinho • 15:24 • 2,7 kg • 47 cm",
        },
      },
      {
        id: "c3-h3",
        x: 50,
        y: 75,
        icon: "heart",
        label: "Beijinho",
        reveal: {
          type: "photo",
          src: "https://picsum.photos/seed/beijinho/900/1200",
          caption: "(troca pela foto a mandar um beijinho)",
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
          caption: "Sem saberes, já eras feliz.",
        },
      },
      {
        id: "c4-h2",
        x: 72,
        y: 48,
        icon: "flower",
        label: "Hora do banho",
        reveal: {
          type: "video",
          src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
          caption: "(troca por um vídeo de um banho — mas não o primeiro)",
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
            "Davas mama de noite, fazias shhh baixinho, " +
            "e ainda tinhas força para sorrir quando eu te dizia que te amo. " +
            "Eu vi tudo. Eu lembro-me de tudo.",
          signature: "— para sempre, o teu",
        },
      },
    ],
  },
  {
    id: 5,
    title: "Pequenas conquistas",
    subtitle: "as primeiras vezes",
    background: bg("conquistas-pastel"),
    intro:
      "Cada dia tem uma estreia. O primeiro Natal. " +
      "A primeira vez com os avós. " +
      "Aquela vez que fiquei a dormir seguido até às 4 da manhã.",
    note: "três conquistas escondidas",
    hotspots: [
      {
        id: "c5-h1",
        x: 28,
        y: 32,
        icon: "sparkle",
        label: "Primeiro Natal",
        reveal: {
          type: "photo",
          src: "https://picsum.photos/seed/natal/900/1200",
          caption: "(troca pela foto do primeiro Natal)",
        },
      },
      {
        id: "c5-h2",
        x: 70,
        y: 32,
        icon: "sun",
        label: "Com os avós",
        reveal: {
          type: "photo",
          src: "https://picsum.photos/seed/avos/900/1200",
          caption: "(troca pela foto com os avós maternos)",
        },
      },
      {
        id: "c5-h3",
        x: 50,
        y: 75,
        icon: "star",
        label: "Os meus pequenos passos",
        reveal: {
          type: "message",
          text:
            "Todos os pequenos passos que tenho dado, " +
            "sempre contigo a encorajar-me a enfrentar o mundo. " +
            "Sempre ao meu lado, mamã.",
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
      "Mexe-se, agarra coisas, faz-se ouvir quando o pousamos e não quer. " +
      "E tu, mamã, és a paisagem mais bonita destes nossos dias pequeninos.",
    note: "cinco momentos escondidos",
    hotspots: [
      {
        id: "c6-h1",
        x: 22,
        y: 25,
        icon: "moon",
        label: "Hora de dormir",
        reveal: {
          type: "photo",
          src: "https://picsum.photos/seed/dormir-1/900/1200",
          caption: "Hora de dormir.",
        },
      },
      {
        id: "c6-h2",
        x: 50,
        y: 22,
        icon: "star",
        label: "Hora de dormir outra vez",
        reveal: {
          type: "photo",
          src: "https://picsum.photos/seed/dormir-2/900/1200",
          caption: "Hora de dormir outra vez.",
        },
      },
      {
        id: "c6-h3",
        x: 78,
        y: 25,
        icon: "sun",
        label: "Hora de acordar a mamã",
        reveal: {
          type: "photo",
          src: "https://picsum.photos/seed/acordar/900/1200",
          caption: "Hora de acordar a mamã.",
        },
      },
      {
        id: "c6-h4",
        x: 33,
        y: 72,
        icon: "heart",
        label: "Hora de dormir com a mamã",
        reveal: {
          type: "photo",
          src: "https://picsum.photos/seed/dormir-mae/900/1200",
          caption: "Hora de dormir com a mamã. O sítio mais seguro do mundo.",
        },
      },
      {
        id: "c6-h5",
        x: 67,
        y: 72,
        icon: "sparkle",
        label: "Podes-me dobrar também?",
        reveal: {
          type: "photo",
          src: "https://picsum.photos/seed/dobrar/900/1200",
          caption: "«Podes-me dobrar também, mamã? Eu porto-me bem.»",
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
            "P.S.: adoro quando me cantas músicas do Sporting " +
            "para convencer o papá a vir para baixo ter connosco.",
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
            "Foi a coisa mais bonita que vi em toda a vida. " +
            "Obrigado por seres ela. Obrigado por seres dele. " +
            "Obrigado por seres minha.",
          signature: "— teu Pedro",
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
    "uma maneira nova de seres mãe. Mereces uma massagem no Egito. " +
    "Não há um único pedacinho deste livro que não tenha sido escrito " +
    "por causa de ti. Obrigado por seres o nosso lar.",
  signature: "— o Pedrinho e o Pedro",
};
