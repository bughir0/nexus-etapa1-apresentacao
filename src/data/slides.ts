export type Slide = {
  id: string;
  eyebrow: string;
  title: string;
  lead?: string;
  kind:
    | "hero"
    | "split"
    | "sci"
    | "quotes"
    | "rules"
    | "enactment"
    | "theory"
    | "closing";
  image?: {
    src: string;
    alt: string;
    tag: string;
  };
  panels?: Array<{
    title: string;
    items: string[];
    tone?: "default" | "danger";
    body?: string;
  }>;
  sci?: Array<{ letter: string; title: string; text: string }>;
  quotes?: Array<{ letter: string; text: string }>;
  steps?: string[];
  hint?: string;
  checklist?: string[];
  finalLine?: string;
  /** Citação do livro (slide de fundamentação) */
  citation?: {
    text: string;
    theme?: string;
  };
  /** Metadados usados na Home estilo Netflix (não altera o conteúdo do slide) */
  synopsis: string;
  /**
   * Roteiro curto para o apresentador ler em voz alta para a turma.
   * Não substitui o conteúdo visual do slide — é o “texto falado”.
   */
  script: string;
  category: string;
  card: {
    src: string;
    accent: string;
  };
  /** Badges exibidos nos cards da home */
  badges?: Array<"novo" | "top" | "original">;
};

export const slides: Slide[] = [
  {
    id: "capa",
    kind: "hero",
    eyebrow: "Etapa 1 · Consultoria Administrativa",
    title: "Comunicação Interna e Feedback",
    lead:
      "Protocolo prático com o modelo SCI para restaurar o diálogo e reduzir a rotatividade.",
    image: {
      src: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1400&q=80",
      alt: "Equipe em reunião corporativa",
      tag: "Diálogo · Confiança · Resultado",
    },
    synopsis:
      "A abertura da Etapa 1: um protocolo prático com o modelo SCI para restaurar o diálogo e reduzir a rotatividade na Nexus.",
    script:
      "Bom dia, pessoal. Somos a equipe de consultoria da Nexus Serviços & Logística. Nesta Etapa 1 vamos tratar de comunicação interna e feedback. O objetivo é apresentar um protocolo prático, baseado no modelo SCI, para melhorar o diálogo entre gestores e liderados e reduzir a rotatividade no setor.",
    category: "Abertura",
    badges: ["original"],
    card: {
      src: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80",
      accent: "#E50914",
    },
  },
  {
    id: "problema",
    kind: "split",
    eyebrow: "Diagnóstico",
    title: "O setor está em guerra",
    panels: [
      {
        title: "O que acontece",
        tone: "danger",
        items: [
          "Supervisores criticam em público",
          "Auxiliares sem canal seguro para falar",
          "Agressividade verbal no dia a dia",
        ],
      },
      {
        title: "Consequências",
        items: [
          "Queda na qualidade do atendimento",
          "Alta rotatividade de funcionários",
          "Clima organizacional conturbado",
        ],
      },
    ],
    synopsis:
      "O diagnóstico do setor: críticas em público, ausência de canais seguros e agressividade verbal corroendo o clima e os resultados.",
    script:
      "O diagnóstico que encontramos é crítico: o setor está em conflito. Supervisores criticam em público, os auxiliares não têm um canal seguro para falar e a agressividade verbal vira rotina. Isso derruba a qualidade do atendimento, aumenta a rotatividade e deixa o clima organizacional conturbado. Sem mudança na forma de se comunicar, o problema se agrava.",
    category: "Diagnóstico",
    badges: ["top"],
    card: {
      src: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80",
      accent: "#B81D24",
    },
  },
  {
    id: "missao",
    kind: "hero",
    eyebrow: "Missão do grupo",
    title: "Duas entregas urgentes",
    lead: "Protocolo SCI + simulação de feedback construtivo sobre atraso de relatórios.",
    image: {
      src: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1400&q=80",
      alt: "Planejamento em equipe",
      tag: "Soluções práticas",
    },
    panels: [
      {
        title: "Entrega 1",
        items: [],
        body: "Protocolo SCI de feedback interno para padronizar a conversa entre gestores e liderados.",
      },
      {
        title: "Entrega 2",
        items: [],
        body: "Simulação de feedback construtivo sobre atraso no envio de relatórios administrativos.",
      },
    ],
    synopsis:
      "Duas entregas urgentes do grupo: o protocolo SCI de feedback interno e a simulação de feedback sobre atraso de relatórios.",
    script:
      "Nossa missão nesta etapa tem duas entregas. A primeira é o Protocolo SCI de feedback interno, para padronizar a conversa entre gestores e liderados. A segunda é uma simulação prática: a gestora Ana dá um feedback construtivo ao colaborador Pedro sobre atraso no envio de relatórios. Assim unimos teoria e ensaio.",
    category: "Missão",
    card: {
      src: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80",
      accent: "#E50914",
    },
  },
  {
    id: "sci",
    kind: "sci",
    eyebrow: "Ferramenta",
    title: "Modelo SCI",
    lead: "Feedback objetivo: fatos observáveis, sem julgar a pessoa.",
    sci: [
      {
        letter: "S",
        title: "Situação",
        text: "Quando e onde o fato ocorreu — data, horário ou contexto específico.",
      },
      {
        letter: "C",
        title: "Comportamento",
        text: "Ação observável, sem rótulos (“irresponsável”, “preguiçoso”).",
      },
      {
        letter: "I",
        title: "Impacto",
        text: "Consequência no time, no cliente ou na reputação da Nexus.",
      },
    ],
    synopsis:
      "A ferramenta central: Situação, Comportamento e Impacto para um feedback objetivo, baseado em fatos e sem julgar a pessoa.",
    script:
      "A ferramenta central é o modelo SCI. S de Situação: quando e onde o fato aconteceu. C de Comportamento: o que a pessoa fez, de forma observável, sem rótulos. I de Impacto: o efeito disso no time, no cliente ou na reputação da Nexus. Com o SCI, o feedback fica objetivo e respeitoso — fala do fato, não ataca a pessoa.",
    category: "Ferramentas de Feedback",
    badges: ["original"],
    card: {
      src: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
      accent: "#E50914",
    },
  },
  {
    id: "exemplo",
    kind: "quotes",
    eyebrow: "Caso prático",
    title: "Atraso de relatório",
    quotes: [
      {
        letter: "S",
        text: "“Na sexta, o relatório do cliente Alfa tinha prazo até 17h.”",
      },
      {
        letter: "C",
        text: "“O arquivo foi enviado na segunda-feira, às 11h.”",
      },
      {
        letter: "I",
        text: "“O cliente cobrou e a equipe teve retrabalho.”",
      },
    ],
    synopsis:
      "O modelo SCI aplicado a um caso real: o atraso no envio do relatório do cliente Alfa, descrito por fatos observáveis.",
    script:
      "Vejam o SCI em um caso real. Situação: na sexta, o relatório do cliente Alfa tinha prazo até 17h. Comportamento: o arquivo só foi enviado na segunda, às 11h. Impacto: o cliente cobrou e a equipe teve retrabalho. Notem: nenhum xingamento, só fatos. É assim que o corretivo deixa de ser agressão e vira conversa útil.",
    category: "Ferramentas de Feedback",
    badges: ["novo"],
    card: {
      src: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80",
      accent: "#E50914",
    },
  },
  {
    id: "protocolo",
    kind: "rules",
    eyebrow: "Protocolo prático",
    title: "Regras da comunicação assertiva",
    panels: [
      {
        title: "Fazer",
        items: [
          "Feedback sempre em privado",
          "Aplicar SCI em todo corretivo",
          "Escuta ativa antes da solução",
          "Combinar plano e acompanhar",
          "Canal “Preciso de apoio” para auxiliares",
        ],
      },
      {
        title: "Proibir",
        tone: "danger",
        items: [
          "Criticar em público",
          "Gritar, ironizar ou xingar",
          "Comparar colaboradores",
          "Só falar quando a situação explode",
        ],
      },
    ],
    synopsis:
      "As regras da comunicação assertiva: o que fazer e o que proibir para transformar o corretivo em conversa construtiva.",
    script:
      "O protocolo resume o que fazer e o que proibir. Fazer: feedback em privado, aplicar SCI, escutar antes de propor solução, combinar plano e acompanhar, e abrir o canal “Preciso de apoio” para auxiliares. Proibir: criticar em público, gritar ou ironizar, comparar colaboradores e só falar quando a situação já explodiu. São regras simples para mudar o dia a dia.",
    category: "Etapa 1 em destaque",
    card: {
      src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",
      accent: "#B81D24",
    },
  },
  {
    id: "simulacao",
    kind: "enactment",
    eyebrow: "Encenação",
    title: "Ana × Pedro",
    lead: "Gestora da retaguarda dá feedback sobre atraso de relatório.",
    steps: [
      "Abrir em particular, com respeito",
      "Aplicar SCI (situação → comportamento → impacto)",
      "Escutar: “O que dificultou o prazo?”",
      "Acordo: prioridades, aviso antecipado e apoio",
    ],
    hint: "Não fazer: “Você é irresponsável! Sempre atrasa!”",
    image: {
      src: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1400&q=80",
      alt: "Conversa profissional de feedback",
      tag: "Feedback construtivo",
    },
    synopsis:
      "A encenação Ana × Pedro: uma gestora dá feedback sobre atraso de relatório aplicando o SCI, com escuta ativa e acordo.",
    script:
      "Agora a parte prática: a encenação Ana × Pedro. Ana, gestora da retaguarda, chama Pedro em particular. Ela aplica o SCI, pergunta o que dificultou o prazo e fecha um acordo — prioridades claras, aviso antecipado e apoio. O que não fazer: dizer “você é irresponsável, sempre atrasa”. Queremos ensaiar o jeito certo antes de levar para o setor.",
    category: "Simulação & Prática",
    badges: ["original"],
    card: {
      src: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=800&q=80",
      accent: "#E50914",
    },
  },
  {
    id: "fundamento",
    kind: "theory",
    eyebrow: "Acervo da biblioteca",
    title: "Fundamentação teórica",
    lead: "Escuta ativa como base da comunicação assertiva no feedback interno.",
    citation: {
      theme: "Escuta ativa",
      text: "Saber ouvir é uma característica indispensável para o sucesso. Além de um talento, é uma fonte reveladora de novos horizontes. Ouvir com plena eficácia é dar a sua completa atenção e compreensão a quem fala, interpretando os símbolos verbais e não verbais do processo da comunicação. Antes de ser um orador bem sucedido é importante que se seja um bom ouvinte, pois ao ouvir as pessoas, demonstrando interesse, provavelmente elas darão igual atenção à sua fala.",
    },
    panels: [
      {
        title: "Assertividade",
        items: [],
        body: "Expressar com clareza e respeito — sem agressão e sem omissão.",
      },
      {
        title: "Escuta ativa",
        items: [],
        body: "Ouvir sem interromper, validar e só então construir a solução.",
      },
    ],
    synopsis:
      "A base teórica: assertividade e escuta ativa, com a citação do livro sobre saber ouvir com plena eficácia.",
    script:
      "A base teórica une assertividade e escuta ativa. Assertividade é falar com clareza e respeito, sem agressão e sem omissão. Escuta ativa é ouvir de verdade, sem interromper, validar o que a pessoa disse e só então construir a solução. Como diz a citação do livro: saber ouvir é indispensável — quem escuta com atenção costuma ser ouvido da mesma forma.",
    category: "Etapa 1 em destaque",
    card: {
      src: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=800&q=80",
      accent: "#564D4D",
    },
  },
  {
    id: "fechamento",
    kind: "closing",
    eyebrow: "Encerramento",
    title: "Fechamento",
    finalLine:
      "Feedback privado, factual e com acordo retém talentos na Nexus.",
    checklist: [
      "Protocolo digitado no Word/Docs",
      "Citação do livro preenchida (escuta ativa)",
      "Simulação ensaiada (Ana e Pedro)",
    ],
    synopsis:
      "O fechamento da Etapa 1: um checklist de entrega e a mensagem final — feedback privado, factual e com acordo retém talentos.",
    script:
      "Para fechar: nosso checklist é protocolo digitado, citação do livro preenchida e simulação ensaiada. A mensagem final que queremos deixar: feedback privado, baseado em fatos e com acordo claro retém talentos na Nexus. Comunicação assertiva não é luxo — é ferramenta de gestão e de clima saudável. Obrigado, e seguimos para as perguntas.",
    category: "Encerramento",
    badges: ["original"],
    card: {
      src: "https://images.unsplash.com/photo-1552581234-26160f608093?auto=format&fit=crop&w=800&q=80",
      accent: "#E50914",
    },
  },
];

/** Fileiras (rows) estilo Netflix — referenciam os slides por índice. */
export const rows: Array<{
  title: string;
  slideIndices: number[];
  /** Destaque visual: números grandes estilo Top 10 / posters verticais */
  variant?: "default" | "top10" | "posters";
}> = [
  { title: "Continue assistindo", slideIndices: [0, 3, 6] },
  {
    title: "Top 5 na Nexus hoje",
    slideIndices: [1, 3, 6, 5, 2],
    variant: "top10",
  },
  {
    title: "Em alta · Capas da temporada",
    slideIndices: [0, 3, 6, 1, 8],
    variant: "posters",
  },
  { title: "Etapa 1 · Temporada completa", slideIndices: [0, 1, 2, 3, 4, 5, 6, 7, 8] },
  { title: "Ferramentas de Feedback", slideIndices: [3, 4, 1, 5] },
  { title: "Simulação & Prática", slideIndices: [6, 4, 5, 8] },
  { title: "Nexus Originals", slideIndices: [0, 2, 7, 8] },
];
