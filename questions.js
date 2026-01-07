// ========== BASE DE DADOS DAS QUESTÕES ==========
const questoes = [
    {
        id: 1,
        pergunta: "O Sr. António, 68 anos, reformado há 6 meses, sente que os seus dias perderam estrutura e propósito. Qual destas opções representa uma estratégia de coping focada no problema adaptativa?",
        opcoes: [
            "Permanecer em casa a ver televisão durante todo o dia, afirmando que 'já não vale a pena fazer planos'",
            "Inscrever-se como voluntário no centro comunitário local duas vezes por semana e participar num grupo de caminhada matinal",
            "Recusar sistematicamente convites de amigos para sair, justificando que 'já não tem energia para socializar'"
        ],
        respostaCorreta: 1,
        explicacao: "A segunda opção é correta porque representa uma estratégia de coping focada no problema. Segundo Lazarus e Folkman (1984), esta estratégia envolve ações diretas para alterar a situação stressante. Ao estruturar o tempo com atividades significativas, o Sr. António está a lidar ativamente com a falta de propósito pós-reforma, promovendo um envelhecimento ativo.",
        referencia: "Lazarus, R. S., & Folkman, S. (1984). Stress, appraisal, and coping. Springer Publishing Company.",
        estrategia: "Estruturação do tempo pós-reforma com actividades significativas (coping focada no problema)"
    },
    {
        id: 2,
        pergunta: "A D. Maria, 72 anos, foi diagnosticada com osteoporose. Recebeu recomendações médicas complexas e sente-se sobrecarregada. Qual estratégia representa coping focada na emoção adaptativa?",
        opcoes: [
            "Ignorar as recomendações porque 'são demasiado complicadas' e continuar com os seus hábitos anteriores",
            "Marcar uma consulta apenas para esclarecer dúvidas e pedir que as instruções sejam escritas de forma simples",
            "Partilhar os seus medos e ansiedades com o grupo de caminhada do bairro e ouvir experiências de outras pessoas na mesma situação"
        ],
        respostaCorreta: 2,
        explicacao: "A terceira opção é correta porque representa coping focada na emoção. Folkman e Moskowitz (2004) destacam que esta estratégia é particularmente útil em situações percebidas como incontroláveis. Ao partilhar preocupações e receber apoio social, a D. Maria está a regular as suas emoções face ao diagnóstico.",
        referencia: "Folkman, S., & Moskowitz, J. T. (2004). Coping: Pitfalls and promise. Annual Review of Psychology, 55, 745-774.",
        estrategia: "Procura de apoio social para regulação emocional (coping focada na emoção)"
    },
    {
        id: 3,
        pergunta: "O neto do Sr. João, 75 anos, ofereceu-lhe um smartphone para se manterem em contacto. Ele sente-se frustrado e incompetente com a tecnologia. Qual resposta representa um coping desadaptativo?",
        opcoes: [
            "Pedir ao neto para ensinar apenas uma função de cada vez, praticando diariamente durante 15 minutos até dominar",
            "Dizer 'isto não é para a minha geração' e recusar-se sequer a tentar aprender, guardando o telemóvel numa gaveta",
            "Participar num workshop para seniores sobre tecnologia básica oferecido pela junta de freguesia"
        ],
        respostaCorreta: 1,
        explicacao: "A segunda opção representa coping desadaptativo. Carver et al. (1989) associam a evitação a piores resultados de saúde mental a longo prazo. A resignação e a evitação impedem a aprendizagem e aumentam a frustração, contribuindo para o isolamento digital.",
        referencia: "Carver, C. S., Scheier, M. F., & Weintraub, J. K. (1989). Assessing coping strategies: A theoretically based approach. Journal of Personality and Social Psychology, 56(2), 267-283.",
        estrategia: "Evitação tecnológica como coping desadaptativo"
    },
    {
        id: 4,
        pergunta: "A D. Fernanda, 78 anos, perdeu o marido há 8 meses. Sente ondas de tristeza intensa em datas significativas. Qual é um exemplo de coping proativo adaptativo?",
        opcoes: [
            "Ignorar completamente o aniversário do falecido marido e fingir que é um dia normal como os outros",
            "Planear antecipadamente: combinar passar o dia com a filha, visitar o cemitério juntas e depois jantar num restaurante que gostavam",
            "Isolar-se em casa durante toda a semana do aniversário do falecimento, recusando contacto com familiares"
        ],
        respostaCorreta: 1,
        explicacao: "A segunda opção ilustra coping proativo. Aspinwall e Taylor (1997) definem coping proativo como antecipar potenciais stressors e preparar-se para eles. O planeamento reduz a imprevisibilidade e dá controlo sobre a situação.",
        referencia: "Aspinwall, L. G., & Taylor, S. E. (1997). A stitch in time: Self-regulation and proactive coping. Psychological Bulletin, 121(3), 417-436.",
        estrategia: "Planeamento antecipatório para situações previsivelmente stressantes"
    },
    {
        id: 5,
        pergunta: "O Sr. Manuel, 70 anos, tem dificuldades financeiras desde que se reformou. Sente-se envergonhado por não poder ajudar os netos como antes. Qual estratégia representa coping coletivo adaptativo?",
        opcoes: [
            "Deixar de atender chamadas dos filhos para evitar conversas sobre dificuldades financeiras",
            "Participar numa associação de reformados que discute soluções coletivas para questões financeiras pós-reforma e partilha informações sobre apoios sociais",
            "Pedir empréstimos informais sem falar com a família para manter as aparências de estabilidade financeira"
        ],
        respostaCorreta: 1,
        explicacao: "A segunda opção demonstra coping coletivo. Skinner et al. (2003) destacam que o coping coletivo é particularmente relevante em situações de stress partilhado por um grupo. Esta abordagem reduz o estigma e promove soluções mútuas.",
        referencia: "Skinner, E. A., Edge, K., Altman, J., & Sherwood, H. (2003). Searching for the structure of coping: A review and critique. Psychological Bulletin, 129(2), 216-269.",
        estrategia: "Participação em grupos de apoio mútuo para stress partilhado (coping coletivo)"
    },
    {
        id: 6,
        pergunta: "A D. Odete, 80 anos, vive sozinha e começou a ter pequenos esquecimentos. Preocupa-se que possa ser início de demência. Qual estratégia representa coping de reavaliação positiva?",
        opcoes: [
            "Deixar de sair de casa com medo de se perder ou fazer figura ridícula perante os outros",
            "Consultar um neurologista para avaliação, ao mesmo tempo que se lembra que 'esquecimentos benignos são comuns na idade' e mantém um diário para anotações",
            "Esconder os esquecimentos da família para não os preocupar, aumentando assim a sua própria ansiedade"
        ],
        respostaCorreta: 1,
        explicacao: "A segunda opção combina ação prática com reavaliação positiva. Folkman (1997) mostra que encontrar significado e manter funcionalidade, mesmo face a limitações, é adaptativo. Procurar ajuda profissional enquanto reenquadra cognitivamente a situação é uma abordagem equilibrada.",
        referencia: "Folkman, S. (1997). Positive psychological states and coping with severe stress. Social Science & Medicine, 45(8), 1207-1221.",
        estrategia: "Reavaliação cognitiva positiva combinada com ação prática"
    },
    {
        id: 7,
        pergunta: "O Sr. Carlos, 67 anos, sofre de artrite que limita a sua mobilidade. Antes muito ativo, sente-se frustrado. Qual é um exemplo de coping de aceitação adaptativa?",
        opcoes: [
            "Insistir em fazer as mesmas caminhadas de antes, apesar da dor, arriscando lesões mais graves",
            "Recusar usar bengala por vergonha, mesmo quando recomendada pelo fisioterapeuta",
            "Aceitar as suas novas limitações e adaptar-se: caminhadas mais curtas com bengala, natação e participação num grupo de alongamentos para seniores"
        ],
        respostaCorreta: 2,
        explicacao: "A terceira opção representa aceitação adaptativa. Hayes et al. (2006) mostram que aceitar realisticamente as limitações, sem resignação passiva, permite adaptação funcional e manutenção da qualidade de vida. A aceitação adaptativa não é desistência, mas reconhecimento realista com ajustamento das actividades.",
        referencia: "Hayes, S. C., Luoma, J. B., Bond, F. W., Masuda, A., & Lillis, J. (2006). Acceptance and commitment therapy: Model, processes and outcomes. Behaviour Research and Therapy, 44(1), 1-25.",
        estrategia: "Aceitação realista com adaptação funcional"
    },
    {
        id: 8,
        pergunta: "A D. Rosa, 85 anos, mudou-se para um lar de idosos após uma queda em casa. Sente saudades da sua casa e dos vizinhos. Qual estratégia representa coping de significado?",
        opcoes: [
            "Ficar no quarto a chorar e recusar participar em atividades do lar",
            "Criar um álbum de fotografias da sua casa antiga para mostrar aos novos amigos e organizar pequenas festas no seu quarto para socializar",
            "Comparar constantemente negativamente o lar com a sua casa anterior, criando insatisfação crónica"
        ],
        respostaCorreta: 1,
        explicacao: "A segunda opção é uma estratégia de coping de significado. Park e Folkman (1997) destacam a importância de encontrar significado em experiências stressantes e integrá-las numa narrativa de vida coerente. Ao manter ligações com o passado enquanto se adapta ao presente, a D. Rosa cria continuidade.",
        referencia: "Park, C. L., & Folkman, S. (1997). Meaning in the context of stress and coping. Review of General Psychology, 1(2), 115-144.",
        estrategia: "Criação de continuidade e significado em transições de vida"
    },
    {
        id: 9,
        pergunta: "O Sr. Eduardo, 77 anos, cuida da esposa com demência moderada. Sente-se sobrecarregado emocional e fisicamente. Qual estratégia representa coping de autocuidado para cuidadores?",
        opcoes: [
            "Ignorar os próprios cansaço e continuar 24 horas por dia sem descanso, por considerar que 'é o seu dever'",
            "Aceitar ajuda de um auxiliar algumas horas por semana para poder descansar, participar num grupo de apoio a cuidadores e manter o seu hobby de jardinagem",
            "Recusar toda a ajuda externa por achar que 'ninguém cuida tão bem como ele' da esposa"
        ],
        respostaCorreta: 1,
        explicacao: "A segunda opção é uma estratégia de coping de autocuidado para cuidadores. Zarit et al. (1986) mostram que cuidadores que praticam autocuidado apresentam menor burnout e melhor qualidade de cuidado. O autocuidado não é egoísmo, mas uma necessidade para sustentar o cuidado a longo prazo.",
        referencia: "Zarit, S. H., Todd, P. A., & Zarit, J. M. (1986). Subjective burden of husbands and wives as caregivers: A longitudinal study. The Gerontologist, 26(3), 260-266.",
        estrategia: "Autocuidado sistemático para sustentabilidade do cuidado"
    },
    {
        id: 10,
        pergunta: "A D. Isabel, 90 anos, enfrenta múltiplas perdas: amigos falecidos, mobilidade reduzida, saúde frágil. Mantém, no entanto, senso de humor e interesse pela vida. Qual conceito melhor descreve esta postura?",
        opcoes: [
            "Negação da realidade como mecanismo de defesa",
            "Resiliência e coping baseado em recursos pessoais acumulados ao longo da vida",
            "Apatia e desistência face às adversidades"
        ],
        respostaCorreta: 1,
        explicacao: "A segunda opção é correta. Esta postura representa resiliência. Masten (2001) define resiliência como a capacidade de manter funcionamento adaptativo face a adversidades significativas. O senso de humor e manutenção de interesses são recursos internos desenvolvidos ao longo da vida que facilitam o coping adaptativo.",
        referencia: "Masten, A. S. (2001). Ordinary magic: Resilience processes in development. American Psychologist, 56(3), 227-238.",
        estrategia: "Resiliência como coping baseado em recursos pessoais acumulados"
    }
];