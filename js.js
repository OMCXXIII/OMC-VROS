/* ═══════════════════════════════════════════════════════════════════════════
   OMC VR-OS | JS KERNEL v6.0 SENTINEL
   Motor de Soberania Operativa — Arquitetura Nível 6
   SYSTEM_STATE: ui / ops / telemetry
   JARVIS VoiceCore: Speech-to-Intent + Tradução Cognitiva
   Status: JARVIS Active Interface — Operação Híbrida 2D/3D
═══════════════════════════════════════════════════════════════════════════ */

/* ──────────────────────────────────────────────────────────────────────────
   0. ESTADO GLOBAL
────────────────────────────────────────────────────────────────────────── */
const SYSTEM_STATE = {
    ui: {
        isSleep:  false,
        isShadow: false,
        isLocked: false
    },
    ops: {
        profile: 'ALPHA',
        buffer:  "",
        battery: 100
    },
    telemetry: {
        startTime: Date.now(),
        lastInput: Date.now(),
        latency:   12,
        mielina:   150
    }
};

/* ──────────────────────────────────────────────────────────────────────────
   0b. JARVIS CONFIG  (dispatcher para expansão futura)
────────────────────────────────────────────────────────────────────────── */
const JARVIS_CONFIG = {
    apiEndpoint:      "",          // URL futura de IA (GPT, Gemini, etc.)
    autoSaveInterval: 300_000,     // 5 minutos em ms
    voiceSensitivity: 0.8,
    lang:             'pt-BR'
};

/* ──────────────────────────────────────────────────────────────────────────
   1. KERNEL ENGINE  (Solve et Coagula)
────────────────────────────────────────────────────────────────────────── */
const Kernel = {
    save(content) {
        const key = `OMC_STORAGE_${SYSTEM_STATE.ops.profile}`;
        try {
            localStorage.setItem(key, content);
        } catch(e) {
            console.warn('[KERNEL] localStorage indisponível:', e);
        }

        console.log(`[DUMP] Memória Coagulada em ${SYSTEM_STATE.ops.profile}`);

        // Feedback 3D: flash verde no núcleo
        const core = document.getElementById('singularidade');
        if (core) {
            core.setAttribute('material', 'color', '#00FF41');
            setTimeout(() => core.setAttribute('material', 'color', '#00D4FF'), 300);
        }

        // Feedback 3D: confirmação no monitor de execução
        const exec = document.getElementById('execution-text');
        if (exec) {
            exec.setAttribute('color', '#00FF41');
            exec.setAttribute('value', '>>> MEMÓRIA_COAGULADA_SUCESSO <<<');
            setTimeout(() => {
                exec.setAttribute('color', '#00D4FF');
                exec.setAttribute('value', SYSTEM_STATE.ops.buffer + '_');
            }, 1500);
        }

        // Feedback HUD DOM
        _hudFlash('hud-status', '● DUMP OK', '#00FF41', 1500);
    },

    load(profileId) {
        try {
            return localStorage.getItem(`OMC_STORAGE_${profileId}`) || '';
        } catch(e) {
            return '';
        }
    }
};

/* ──────────────────────────────────────────────────────────────────────────
   2. MOTOR DE ESCRITA ATIVA
────────────────────────────────────────────────────────────────────────── */
function _flushBuffer() {
    const display = document.getElementById('execution-text');
    if (display) {
        display.setAttribute('value', SYSTEM_STATE.ops.buffer + '_');
        display.setAttribute('color', '#00D4FF');
    }
}

function handleCmdInput(e) {
    if (SYSTEM_STATE.ui.isSleep || SYSTEM_STATE.ui.isLocked) return;

    if (e.key === 'Enter') {
        e.preventDefault();
        const raw = e.target.value.trim();

        if (raw.startsWith('/')) {
            _parseCommand(raw);
        } else if (raw) {
            SYSTEM_STATE.ops.buffer += (SYSTEM_STATE.ops.buffer ? '\n> ' : '') + raw;
        }

        e.target.value = '';
        _flushBuffer();
        SYSTEM_STATE.telemetry.lastInput = Date.now();
        return;
    }

    SYSTEM_STATE.telemetry.lastInput = Date.now();
}

function _parseCommand(cmd) {
    const parts = cmd.slice(1).split(' ');
    const verb  = parts[0].toLowerCase();

    switch (verb) {
        case 'save':   Kernel.save(SYSTEM_STATE.ops.buffer);               break;
        case 'clear':  SYSTEM_STATE.ops.buffer = ''; _flushBuffer();       break;
        case 'swap':   if (parts[1]) swapContext(parts[1].toUpperCase()); break;
        case 'shadow': toggleShadowMode();                                 break;
        case 'sleep':  toggleSleepMode();                                  break;
        case 'nav':    if (parts[1]) navigate(parts[1]);                    break;
        case 'jarvis': VoiceCore.toggle();                                 break;
        case 'help':   _showHelp();                                        break;
        default:       updateBioStatus(`CMD_UNKNOWN: /${verb}`);
    }
}

function _showHelp() {
    const exec = document.getElementById('execution-text');
    const help = [
        '/save           — coagular memória',
        '/clear          — limpar buffer',
        '/swap PERFIL   — trocar contexto',
        '/shadow         — modo sombra',
        '/sleep          — modo repouso',
        '/nav 1|2|3|4|5 — navegar entre sigilos',
        '/jarvis         — ativar/desativar JARVIS',
        '/help           — esta mensagem'
    ].join('\n');
    if (exec) exec.setAttribute('value', help);
}

/* ──────────────────────────────────────────────────────────────────────────
   3. CONTEXT SWAPPING
────────────────────────────────────────────────────────────────────────── */
function swapContext(newProfile) {
    Kernel.save(SYSTEM_STATE.ops.buffer);
    SYSTEM_STATE.ops.profile = newProfile;
    SYSTEM_STATE.ops.buffer  = Kernel.load(newProfile);
    _flushBuffer();

    const core = document.getElementById('singularidade');
    if (core) {
        core.setAttribute('material', 'color', '#FFB800');
        setTimeout(() => core.setAttribute('material', 'color', '#00D4FF'), 300);
    }
    updateBioStatus(`CONTEXTO: ${newProfile}`);
}

/* ──────────────────────────────────────────────────────────────────────────
   4. MÓDULO CLOCK: Cronômetro de Sessão Real
────────────────────────────────────────────────────────────────────────── */
function updateSessionClock() {
    setInterval(() => {
        if (SYSTEM_STATE.ui.isSleep) return;

        const elapsed = Math.floor((Date.now() - SYSTEM_STATE.telemetry.startTime) / 1000);
        const mins    = String(Math.floor(elapsed / 60)).padStart(2, '0');
        const secs    = String(elapsed % 60).padStart(2, '0');
        const idle    = Math.floor((Date.now() - SYSTEM_STATE.telemetry.lastInput) / 1000);

        // Monitor 3D
        const timerDisplay = document.getElementById('atc-timer');
        if (timerDisplay) {
            const statusLabel = idle > 30 ? 'IDLE_ALERT' : 'UPLINK: ACTIVE';
            timerDisplay.setAttribute('value',
                `ATC_CLOCK: ${mins}m ${secs}s\n${statusLabel}\n──────────\nIDLE: ${idle}s`);
            timerDisplay.setAttribute('color', idle > 30 ? '#FF4B00' : '#00D4FF');
        }

        // HUD DOM: session
        const hudSession = document.getElementById('hud-session');
        if (hudSession) hudSession.textContent = `SESSION: ${mins}:${secs}`;

        // HUD DOM: relógio real
        const hudClock = document.getElementById('hud-clock-real');
        if (hudClock) {
            hudClock.textContent = new Date().toLocaleTimeString('pt-BR', { hour12: false });
        }

        // Latência simulada
        SYSTEM_STATE.telemetry.latency = 10 + Math.floor(Math.random() * 8);
        const hudLat = document.getElementById('hud-latency');
        if (hudLat) {
            hudLat.textContent = `LAT: ${SYSTEM_STATE.telemetry.latency}ms`;
            hudLat.className   = SYSTEM_STATE.telemetry.latency > 20
                ? 'latency-critical-active'
                : 'latency-ok';
        }

        if (idle > 30) updateBioStatus('ALERTA: ESTADO DE INÉRCIA DETECTADO');

    }, 1000);
}

/* ──────────────────────────────────────────────────────────────────────────
   5. DATA INTEGRATION: Feeds Dinâmicos Mockados
────────────────────────────────────────────────────────────────────────── */
const _STARLINK_NODES = ['0x4F3A', '0xB21C', '0x9E07', '0xD44F', '0x1A8B'];

function updateDynamicFeeds() {
    setInterval(() => {
        if (SYSTEM_STATE.ui.isSleep) return;

        SYSTEM_STATE.telemetry.mielina = 140 + Math.floor(Math.random() * 20);
        const bpm = 70 + Math.floor(Math.random() * 8);
        const o2  = 97 + Math.floor(Math.random() * 3);

        const bioDisp = document.getElementById('bio-display');
        if (bioDisp) {
            bioDisp.setAttribute('value',
                `STATUS\n[BIOMETRIA]\n──────────\nBPM: ${bpm}\nMIELINA: ${SYSTEM_STATE.telemetry.mielina}m/s\nO2: ${o2}%`);
        }

        const nodeIdx = Math.floor(Math.random() * _STARLINK_NODES.length);
        const rawDisp = document.getElementById('raw-data-display');
        if (rawDisp) {
            rawDisp.setAttribute('value',
                `RAW_DATA\n[DADOS_BRUTOS]\n──────────\nSTARLINK: OK\nNODE: ${_STARLINK_NODES[nodeIdx]}\nPACKETS: ${Math.floor(Math.random() * 999)}`);
        }

        const onlineCount = 5 + Math.floor(Math.random() * 3);
        const nexusDisp   = document.getElementById('nexus-display');
        if (nexusDisp) {
            nexusDisp.setAttribute('value',
                `NEXUS\n[DOMÍNIOS]\n──────────\nNODES: ${onlineCount} ONLINE\nLATENCY: ${SYSTEM_STATE.telemetry.latency}ms`);
        }

        // Battery drain cosmética
        if (SYSTEM_STATE.ops.battery > 0) {
            SYSTEM_STATE.ops.battery = Math.max(0, SYSTEM_STATE.ops.battery - 0.01);
        }
        const hudBat = document.getElementById('hud-battery');
        if (hudBat) hudBat.textContent = `CPF_BATTERY: ${SYSTEM_STATE.ops.battery.toFixed(1)}%`;

    }, 5000);
}

/* ──────────────────────────────────────────────────────────────────────────
   6. NAVEGAÇÃO  (translação do camera-rig)
────────────────────────────────────────────────────────────────────────── */
function navigate(key) {
    const rig = document.getElementById('camera-rig');
    if (!rig) return;

    const positions = {
        '1': { x: -3,   y: 0, z: 1 },
        '2': { x: -1.5, y: 0, z: 0 },
        '3': { x:  0,   y: 0, z: 0 },
        '4': { x:  1.5, y: 0, z: 0 },
        '5': { x:  3,   y: 0, z: 1 }
    };

    const target = positions[key];
    if (!target) return;

    rig.setAttribute('animation', {
        property: 'position',
        to:        `${target.x} ${target.y} ${target.z}`,
        dur:       1000,
        easing:    'easeInOutQuad'
    });

    updateBioStatus(`NAV → POSIÇÃO ${key}`);
}

/* ──────────────────────────────────────────────────────────────────────────
   7. MODO SOMBRA  (Alt+S)
────────────────────────────────────────────────────────────────────────── */
function toggleShadowMode() {
    SYSTEM_STATE.ui.isShadow = !SYSTEM_STATE.ui.isShadow;
    const targets = document.querySelectorAll(
        '.ghost-window, #bio-monitor, #firewall-sigil, #grid-floor'
    );
    targets.forEach(el => {
        const opacity = SYSTEM_STATE.ui.isShadow ? 0.05 : 0.6;
        el.setAttribute('animation__shadow',
            `property: material.opacity; to: ${opacity}; dur: 600; easing: easeInOutSine`);
    });
    updateBioStatus(SYSTEM_STATE.ui.isShadow ? 'MODO SOMBRA: ATIVO' : 'STATUS: ESTÁVEL');
}

/* ──────────────────────────────────────────────────────────────────────────
   8. MODO REPOUSO  (Alt+R)
────────────────────────────────────────────────────────────────────────── */
function toggleSleepMode() {
    SYSTEM_STATE.ui.isSleep = !SYSTEM_STATE.ui.isSleep;
    const body = document.body;

    if (SYSTEM_STATE.ui.isSleep) {
        body.classList.remove('system-active');
        body.classList.add('system-sleep');
        Kernel.save(SYSTEM_STATE.ops.buffer);
        updateBioStatus('MODO REPOUSO: SISTEMA EM ESTASE');
    } else {
        body.classList.remove('system-sleep');
        body.classList.add('system-active');
        SYSTEM_STATE.telemetry.lastInput = Date.now();
        updateBioStatus('SISTEMA REATIVADO');
    }
}

/* ──────────────────────────────────────────────────────────────────────────
   9. PROXIMIDADE QUÂNTICA  (rAF loop — throttle mobile)
────────────────────────────────────────────────────────────────────────── */
function updateQuantumProximity() {
    const camera = document.querySelector('#main-camera');
    if (!camera) return;

    const sigils = document.querySelectorAll(
        '.ghost-window, #mon-0, #bio-monitor, #firewall-sigil, #reactor-core'
    );

    sigils.forEach(sigil => {
        const sigilPos = sigil.object3D?.position;
        const camPos   = camera.object3D?.position;
        if (!sigilPos || !camPos) return;

        const dist = camPos.distanceTo(sigilPos);

        if (dist < 2.5) {
            sigil.setAttribute('animation__zoom',
                'property: scale; to: 1.5 1.5 1.5; dur: 400; easing: easeOutQuad');
            if (!window.IS_MOBILE) {
                const mat = sigil.querySelector('[mixin]');
                if (mat) mat.setAttribute('material', 'emissiveIntensity', '2.5');
            }
        } else {
            sigil.setAttribute('animation__zoom',
                'property: scale; to: 1 1 1; dur: 600; easing: easeInQuad');
            if (!window.IS_MOBILE) {
                const mat = sigil.querySelector('[mixin]');
                if (mat) mat.setAttribute('material', 'emissiveIntensity', '0.6');
            }
        }
    });
}

/* ──────────────────────────────────────────────────────────────────────────
   10. ESCUTA DE EVENTOS GLOBAIS
────────────────────────────────────────────────────────────────────────── */
window.addEventListener('keydown', e => {
    if (e.altKey) {
        if (['1','2','3','4','5'].includes(e.key)) navigate(e.key);
        if (e.key === 's') toggleShadowMode();
        if (e.key === 'r') toggleSleepMode();
        if (e.key === 'v') VoiceCore.toggle();           // ← JARVIS on/off
        if (e.key === 'Enter') Kernel.save(SYSTEM_STATE.ops.buffer);
        return;
    }

    // Foca o input DOM se não estiver focado
    const input = document.getElementById('cmd-input');
    if (input && document.activeElement !== input) {
        input.focus();
    }
});

/* ──────────────────────────────────────────────────────────────────────────
   11. UTILITÁRIOS
────────────────────────────────────────────────────────────────────────── */
function updateBioStatus(msg) {
    const domBio = document.getElementById('bio-feedback-dom');
    if (domBio) domBio.textContent = msg;

    const afrBio = document.querySelector('#bio-feedback');
    if (afrBio) {
        afrBio.setAttribute('value',
            `CPF: ${SYSTEM_STATE.ops.battery.toFixed(0)}% | ${msg}`);
    }
}

function _hudFlash(id, text, color, duration = 1000) {
    const el = document.getElementById(id);
    if (!el) return;
    const orig = { text: el.textContent, color: el.style.color };
    el.textContent = text;
    el.style.color = color;
    setTimeout(() => {
        el.textContent = orig.text;
        el.style.color = orig.color;
    }, duration);
}

/* ──────────────────────────────────────────────────────────────────────────
   12. ONBOARDING
────────────────────────────────────────────────────────────────────────── */
function establishConnection() {
    const overlay      = document.getElementById('onboarding-overlay');
    const progressText = document.getElementById('progress-text');
    const progressFill = document.getElementById('progress-fill');
    if (!overlay) return;

    let pct = 0;
    const tick = setInterval(() => {
        pct += Math.floor(Math.random() * 15) + 5;
        if (pct >= 100) { pct = 100; clearInterval(tick); finalize(); }
        if (progressText) progressText.textContent = `HANDSHAKE... ${pct}%`;
        if (progressFill) progressFill.style.width  = `${pct}%`;
    }, 120);

    function finalize() {
        setTimeout(() => {
            overlay.style.opacity = '0';
            setTimeout(() => {
                overlay.style.display = 'none';
                document.body.classList.remove('system-idle');
                document.body.classList.add('system-active');
                _startAutoSave();
            }, 800);
        }, 300);

        SYSTEM_STATE.telemetry.startTime = Date.now();
        updateBioStatus('NÍVEL 6.0 ATIVADO | Alt+V = JARVIS');
        console.log('%c OMC VR-OS · CONEXÃO ESTABELECIDA — NÍVEL 6.0 ',
            'background:#000;color:#00D4FF;font-weight:bold;');
    }
}

/* ──────────────────────────────────────────────────────────────────────────
   13. AUTO-SAVE  (JARVIS_CONFIG.autoSaveInterval)
────────────────────────────────────────────────────────────────────────── */
function _startAutoSave() {
    if (!JARVIS_CONFIG.autoSaveInterval || JARVIS_CONFIG.autoSaveInterval <= 0) return;
    setInterval(() => {
        if (SYSTEM_STATE.ops.buffer.trim()) {
            Kernel.save(SYSTEM_STATE.ops.buffer);
            console.log('[AUTO-SAVE] Dump automático executado.');
        }
    }, JARVIS_CONFIG.autoSaveInterval);
}

/* ──────────────────────────────────────────────────────────────────────────
   14. VOICE CORE  (JARVIS Integration — Nível 6.0)
   Speech-to-Intent: voz → comando OU conteúdo para o buffer do e-book
────────────────────────────────────────────────────────────────────────── */
const VoiceCore = {
    recognition:  null,
    isListening:  false,
    isSupported:  false,

    init() {
        const SpeechAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechAPI) {
            console.warn('[JARVIS] Web Speech API não suportada neste browser.');
            updateBioStatus('JARVIS: SEM SUPORTE DE VOZ');
            return;
        }

        this.isSupported  = true;
        this.recognition  = new SpeechAPI();

        this.recognition.continuous     = true;
        this.recognition.interimResults = true;
        this.recognition.lang            = JARVIS_CONFIG.lang;

        this.recognition.onresult = (event) => {
            let interim = '';
            for (let i = event.resultIndex; i < event.results.length; i++) {
                if (event.results[i].isFinal) {
                    const transcript = event.results[i][0].transcript.trim();
                    this.processIntent(transcript);
                } else {
                    interim += event.results[i][0].transcript;
                }
            }
            if (interim) this._showInterim(interim);
        };

        this.recognition.onend = () => {
            if (this.isListening) {
                try { this.recognition.start(); } catch(_) {}
            }
        };

        this.recognition.onerror = (e) => {
            if (e.error !== 'no-speech') {
                console.warn('[JARVIS] Erro:', e.error);
                updateBioStatus(`JARVIS: ERRO — ${e.error.toUpperCase()}`);
            }
        };

        console.log('[JARVIS] VoiceCore inicializado. Alt+V para ativar.');
    },

    toggle() {
        if (!this.isSupported) {
            updateBioStatus('JARVIS: WEB SPEECH API NÃO SUPORTADA');
            return;
        }

        this.isListening = !this.isListening;

        if (this.isListening) {
            try { this.recognition.start(); } catch(_) {}
            document.body.classList.add('jarvis-listening');

            const hudStatus = document.getElementById('hud-status');
            if (hudStatus) {
                hudStatus.textContent = '● JARVIS ATIVO';
                hudStatus.style.color = '#00FF41';
            }
            this.speak("Protocolo JARVIS ativo. Aguardando comandos ou ditado.");
            updateBioStatus('JARVIS: ESCUTA ATIVA — fale um comando ou dite');

            const core = document.getElementById('singularidade');
            if (core) core.setAttribute('material', 'color', '#00FF41');

        } else {
            this.recognition.stop();
            document.body.classList.remove('jarvis-listening');

            const hudStatus = document.getElementById('hud-status');
            if (hudStatus) {
                hudStatus.textContent = '● LINK ESTÁVEL';
                hudStatus.style.color = '';
            }
            this.speak("JARVIS em standby.");
            updateBioStatus('JARVIS: STANDBY');

            const core = document.getElementById('singularidade');
            if (core) {
                core.setAttribute('material', 'color', '#FF4B00');
                setTimeout(() => core.setAttribute('material', 'color', '#00D4FF'), 300);
            }

            _flushBuffer();
        }
    },

    /* ── Feedback de Voz (TTS) ── */
    speak(msg) {
        const utterance = new SpeechSynthesisUtterance(msg);
        utterance.lang = JARVIS_CONFIG.lang;
        utterance.pitch = 0.9;
        utterance.rate = 1.1;
        window.speechSynthesis.speak(utterance);
    },

    /* ── Configuração de Tema via Voz ── */
    applyTheme(theme) {
        const root = document.documentElement;
        if (theme === 'amber') {
            root.style.setProperty('--cyan', '#FFB800');
            this.speak("Injetando paleta Âmbar. Foco cognitivo ampliado.");
        } else if (theme === 'matrix') {
            root.style.setProperty('--cyan', '#00FF41');
            this.speak("Modo Matrix ativo. Soberania total do código.");
        } else {
            root.style.setProperty('--cyan', '#00D4FF');
            this.speak("Restaurando paleta padrão.");
        }
    },

    /* ── Interpreta intenção: comando ou conteúdo ── */
    processIntent(text) {
        const cmd = text.toLowerCase().trim();
        console.log('[JARVIS] Ouvi:', cmd);

        let isCommand = true;

        // Comandos de Configuração Direta
        if (cmd.includes('configurar tema') || cmd.includes('mudar cor')) {
            if (cmd.includes('âmbar') || cmd.includes('amarelo')) this.applyTheme('amber');
            else if (cmd.includes('matrix') || cmd.includes('verde')) this.applyTheme('matrix');
            else if (cmd.includes('padrão') || cmd.includes('azul')) this.applyTheme('default');
        }
        // Comandos de Navegação
        else if (cmd.includes('navegar para biometria')) { navigate('1'); this.speak("Movendo para Biometria."); }
        else if (cmd.includes('navegar para diagnóstico')) { navigate('2'); this.speak("Acessando Diagnóstico."); }
        else if (cmd.includes('navegar para o centro')) { navigate('3'); this.speak("Focando Reator Core."); }
        else if (cmd.includes('navegar para nexus')) { navigate('4'); this.speak("Sincronizando Nexus."); }
        else if (cmd.includes('navegar para soberania')) { navigate('5'); this.speak("Entrando na zona de Soberania."); }
        // Comandos de Estado
        else if (cmd.includes('ativar modo sombra')) toggleShadowMode();
        else if (cmd.includes('desativar modo sombra')) { SYSTEM_STATE.ui.isShadow = true; toggleShadowMode(); }
        else if (cmd.includes('dormir') || cmd.includes('estase')) toggleSleepMode();
        else if (cmd.includes('acordar') || cmd.includes('despertar')) { SYSTEM_STATE.ui.isSleep = true; toggleSleepMode(); }
        else if (cmd.includes('salvar memória') || cmd.includes('coagular')) { Kernel.save(SYSTEM_STATE.ops.buffer); this.speak("Memória coagulada com sucesso."); }
        else if (cmd.includes('limpar buffer')) { SYSTEM_STATE.ops.buffer = ''; _flushBuffer(); this.speak("Buffer limpo."); }
        else if (cmd.includes('ajuda') || cmd.includes('comandos')) _showHelp();
        else {
            // Não é comando → conteúdo para o e-book / buffer
            isCommand = false;
            SYSTEM_STATE.ops.buffer += (SYSTEM_STATE.ops.buffer ? ' ' : '') + text;
            _flushBuffer();
            updateBioStatus(`JARVIS: DITADO — ${text.slice(0, 40)}...`);
        }

        if (isCommand) updateBioStatus(`JARVIS: CMD → ${cmd.slice(0, 50)}`);

        // Dispatcher para API externa (quando configurada)
        if (JARVIS_CONFIG.apiEndpoint && !isCommand) {
            this._dispatchToAPI(text);
        }
    },

    _showInterim(text) {
        const display = document.getElementById('execution-text');
        if (display) {
            display.setAttribute('color', '#FFB800');
            display.setAttribute('value', `>>> OUVINDO: ${text}...`);
        }
    },

    async _dispatchToAPI(text) {
        if (!JARVIS_CONFIG.apiEndpoint) return;
        try {
            const res = await fetch(JARVIS_CONFIG.apiEndpoint, {
                method:  'POST',
                headers: { 'Content-Type': 'application/json' },
                body:    JSON.stringify({
                    text,
                    profile:   SYSTEM_STATE.ops.profile,
                    mielina:   SYSTEM_STATE.telemetry.mielina,
                    timestamp: new Date().toISOString()
                })
            });
            if (res.ok) {
                const data = await res.json();
                if (data.reply) {
                    this.speak(data.reply); // IA responde por voz
                    const nexus = document.getElementById('nexus-display');
                    if (nexus) nexus.setAttribute('value', `IA_REPLY:\n${data.reply}`);
                }
            }
        } catch(err) {
            console.warn('[JARVIS] API dispatch falhou:', err.message);
        }
    }
};

/* ──────────────────────────────────────────────────────────────────────────
   15. BOOT SEQUENCER
────────────────────────────────────────────────────────────────────────── */
window.addEventListener('load', () => {
    console.log('%c OMC VR-OS | KERNEL v6.0 SENTINEL ',
        'background:#000;color:#00D4FF;font-weight:bold;');

    SYSTEM_STATE.ops.buffer = Kernel.load('ALPHA');
    _flushBuffer();

    if (window.IS_MOBILE) {
        const scene = document.querySelector('a-scene');
        if (scene) {
            scene.setAttribute('renderer',
                'precision: low; antialias: false; alpha: false; powerPreference: low-power');
        }
    }

    VoiceCore.init();
    updateSessionClock();
    updateDynamicFeeds();

    let lastProx = 0;
    const PROX_INTERVAL = window.IS_MOBILE ? 100 : 16;

    function proximityLoop(ts) {
        if (ts - lastProx >= PROX_INTERVAL) {
            updateQuantumProximity();
            lastProx = ts;
        }
        requestAnimationFrame(proximityLoop);
    }
    requestAnimationFrame(proximityLoop);

    updateBioStatus('SISTEMA OPERACIONAL NÍVEL 6.0 | Alt+V = JARVIS');
});