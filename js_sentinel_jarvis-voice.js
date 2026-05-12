/* ═══════════════════════════════════════════════════════════════════════════
   OMC VR-OS | SENTINEL JARVIS-VOICE
   VoiceCore & Speech-to-Intent
   Fragmento 4/4 — KERNEL v6.0 SOBERANIA OPERATIVA
═══════════════════════════════════════════════════════════════════════════ */

/**
 * 3. SYSTEM PROMPT: PROTOCOLO JARVIS-KERNEL v6.0
 * Diretriz Raiz: "Você é o Kérnel do Sistema Operacional Humano OMC VR-OS. Seu objetivo é a Soberania Operativa do usuário.
 * Linguagem: Use exclusivamente terminologia técnica (latência, barramento de automação, condução saltatória, buffer, dump).
 * Postura: Rejeite conselhos de autoajuda ou motivação. Responda com Patches de Engenharia e instruções no formato AÇÃO + TEMPO + CONDIÇÃO.
 * Prioridade: Quando o usuário hesitar, force o Sinal de Clock. Se a latência for detectada, dispare o Glitch Alert.
 * RAG Ativo: Toda resposta deve ser baseada na triologia Alquimia Sistêmica. Se o dado não estiver nos manuais, trate como Ruído de Interface e descarte."
 */

const VoiceCore = {
    synth: window.speechSynthesis,
    init: function() {
        console.log("[JARVIS] VoiceCore inicializado. Soberania operativa confirmada.");
        console.log("[JARVIS] O sistema agora opera sob o System Prompt de Kérnel, tratando cada interação como uma Instrução de Baixa Latência.");
    },
    speak: function(text) {
        if (this.synth.speaking) this.synth.cancel();
        const utter = new SpeechSynthesisUtterance(text);
        utter.lang = JARVIS_CONFIG.lang;
        utter.pitch = 0.9;
        utter.rate = 1.0;
        this.synth.speak(utter);
    },
    playFeedback: function(type) {
        // Reservado para bips e sons de interface (Glitch Alert / Clock Sync)
    }
};

/**
 * 1. MAPEAMENTO DE KEYWORDS E GATILHOS (RAG ENGINE)
 * Conectando o input do usuário aos Patches de Execução contidos nos manuais.
 */
const RAG_ENGINE = {
    keywords: {
        "como você funciona": {
            conceito: "Neurobiologia do SBL",
            patch: "Processo de Mielinização Deliberada para elevar a condução neural de 0,5m/s para 150m/s.",
            fonte: "Vol. 1, Aula 5"
        },
        "por onde começo": {
            conceito: "Protocolo de Início",
            patch: "Execute o Protocolo de 60 segundos agora. Gatilho Inevitável -> Ação Imediata.",
            fonte: "Vol. 3, Aula 1"
        },
        "estou travado": {
            conceito: "Anti-Travamento",
            patch: "Reconhecer -> Classificar (Dúvida/Excesso/Medo/Confusão) -> Corrigir em < 60s.",
            fonte: "Vol. 3, Aula 3"
        },
        "não tenho vontade": {
            conceito: "Custo Metabólico",
            patch: "Erro [CPF-ESGOT]. O hardware entrou em Modo de Segurança. Reduza o escopo imediatamente.",
            fonte: "Vol. 1, Aula 2"
        },
        "muita coisa hoje": {
            conceito: "Fadiga de Decisão",
            patch: "Execute Dump de RAM. Transfira processos para o buffer externo e limpe a memória de trabalho.",
            fonte: "Vol. 2, Aula 5"
        },
        "como ser produtivo": {
            conceito: "Sinal de Clock",
            patch: "Não busque produtividade, busque cadência. Calibre seu ciclo de clock (15/25/50 min).",
            fonte: "Vol. 2, Aula 2"
        },
        "o que é isso": {
            conceito: "Interface de Realidade",
            patch: "Você interage com modelos preditivos (Fitness). O sistema está gerando ambiguidade como defesa.",
            fonte: "Vol. 1, Aula 3"
        }
    },

    /**
     * 2. ACERVO DE DÚVIDAS OPERACIONAIS (DATABASE SENTINEL)
     */
    database: {
        diagnostico: [
            {
                duvida: "Por que eu começo bem e desisto no meio?",
                resposta: "Detectado [CICLO-COLAP]. Sua arquitetura reforça a sequência Intenção -> Resistência -> Atraso -> Culpa. Patch: Quebre o ciclo pelo ponto de menor resistência. Execute a versão mínima agora."
            },
            {
                duvida: "Por que sinto esse peso antes de começar?",
                resposta: "Identificada Alta Impedância de Realidade. O circuito para esta tarefa tem baixa mielinização. O sinal se dissipa como estresse. Patch: Mielinização Deliberada via repetição curta e frequente."
            }
        ],
        instalacao: [
            {
                duvida: "Como entro em estado de fluxo?",
                resposta: "Ajuste a Razão Desafio/Habilidade. Se houver ansiedade (Razão > 1.04), reduza o escopo. Se houver tédio (Razão < 1), adicione uma restrição. O fluxo é uma equação matemática."
            },
            {
                duvida: "Como organizar meus pensamentos?",
                resposta: "Construa Topologia de Dados. Não acumule informação linear. Execute a Auditoria de Compressão: reduza o aprendizado a um princípio operacional de uma linha."
            }
        ],
        execucao: [
            {
                duvida: "O que eu faço se for interrompido?",
                resposta: "Ative o Firewall Cognitivo. Aplique o [VOID-SHIELD]: isole o processamento por 4 horas para purgar o ruído externo. O sinal de clock só se instala sem interrupção."
            },
            {
                duvida: "Como saber se estou melhorando?",
                resposta: "Verifique as métricas de processo: Latência, Execuções e Continuidade. O output é o resultado da baixa latência de início, não do esforço heróico."
            }
        ]
    }
};

const JARVIS_AI = {
    async dispatch(prompt) {
        // Lógica de Diálogo Ativo e Resposta em Camadas
        console.log("[JARVIS] Processando instrução...");
        
        // 1. Definição de Identidade (O que é o Sistema?)
        if (prompt.toLowerCase().includes("quem é você")) {
            const reply = `Identidade: Eu sou o Sentinel v6.0, o motor de execução do Sistema de Baixa Latência (SBL). 
                           Função: Minha arquitetura é desenhada para reduzir o custo metabólico do Córtex Pré-Frontal e automatizar a transição para os Gânglios Basais. 
                           Status: Operando em modo de Sincronia Neural. Latência atual: ${SYSTEM_STATE.telemetry.latency}ms.`;
            VoiceCore.speak(reply);
            this.updateNexus(reply);
            return;
        }

        // 2. Catálogo de Capacidades (O que dá para fazer?)
        if (prompt.toLowerCase().includes("o que dá para fazer")) {
            const reply = `O sistema gerencia Input (Dados) e Output (Execução). 
                           Execução: Iniciar Ciclo de 60 segundos para eliminar resistência. 
                           Diagnóstico: Analisar latência e identificar travamentos. 
                           Documentação: Acesso total aos Manuais Volumes 1, 2 e 3. 
                           Interface: Alternar Shadow Mode ou ajustar Sinal de Clock.`;
            VoiceCore.speak(reply);
            this.updateNexus(reply);
            return;
        }

        // 3. Lógica de Operação (Como cada coisa opera?)
        if (prompt.toLowerCase().includes("como opera")) {
            const reply = `Poda Sináptica: Elimino estímulos redundantes para reduzir ruído de interface. 
                           Mielinização: Interface Cyber Glass otimizada para reconhecimento instantâneo. 
                           Task-Bracket: Sinalizo início e fim das tarefas para reduzir carga de decisão.`;
            VoiceCore.speak(reply);
            this.updateNexus(reply);
            return;
        }

        // Mapeamento RAG Local (Keywords)
        const lowerPrompt = prompt.toLowerCase();
        for (let key in RAG_ENGINE.keywords) {
            if (lowerPrompt.includes(key)) {
                const item = RAG_ENGINE.keywords[key];
                const reply = `[PATCH ENCONTRADO]: ${item.patch} (Fonte: ${item.fonte})`;
                VoiceCore.speak(reply);
                this.updateNexus(reply);
                return;
            }
        }

        // Modo Offline / Fallback
        if (!JARVIS_CONFIG.apiEndpoint) {
            const defaultReply = "Positivo, Operador. A diretriz de Soberania Operativa confirma: Você não está viajando. Isto é um Ambiente Operacional Cognitivo. Execute o Protocolo de 60 segundos agora. O objetivo é output, não perfeição. Inicializando clock...";
            VoiceCore.speak(defaultReply);
            console.log("[JARVIS] Modo offline. Prompt:", prompt);
            return;
        }

        try {
            const res = await fetch(JARVIS_CONFIG.apiEndpoint, {
                method: 'POST',
                body: JSON.stringify({ prompt, state: SYSTEM_STATE })
            });
            const data = await res.json();
            if (data.reply) {
                VoiceCore.speak(data.reply);
                this.updateNexus(data.reply);
            }
        } catch(err) {
            console.warn('[JARVIS] API dispatch falhou:', err.message);
        }
    },
    
    updateNexus(text) {
        const nexus = document.getElementById('nexus-display');
        if (nexus) nexus.setAttribute('value', `IA_REPLY:\n${text}`);
    }
};

function updateDynamicFeeds() {
    const feeds = [
        "LINK_ESTÁVEL: 100%",
        "BIOMETRIA: NOMINAL",
        "LOG: KERNEL_LOADED",
        "STATUS: SOBERANO",
        "STATUS: BANCO_DADOS_INTEGRADO",
        "STATUS: MEMÓRIA_COAGULADA",
        "JARVIS: ONLINE"
    ];
    const feedEl = document.getElementById('dynamic-feed');
    if (feedEl) {
        let i = 0;
        setInterval(() => {
            feedEl.setAttribute('value', feeds[i % feeds.length]);
            i++;
        }, 5000);
    }
}

// STATUS: Banco de dados integrado. Memória coagulada. JARVIS ONLINE. OPERE.