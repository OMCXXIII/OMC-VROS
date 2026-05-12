/* OMC VR-OS | JS KERNEL v4.5 
   Diretriz: Motor de Soberania Operativa (Escrita Ativa e Latência Zero)
   Status: JARVIS Active Interface - Operação Híbrida 2D/3D
*/

const SYSTEM_STATE = {
    profile: 'ALPHA',
    lastInput: Date.now(),
    latencyLimit: 60, 
    cpfBattery: 100,
    mielinaProgress: 0,
    isShadowMode: false,
    isLocked: false,
    buffer: "" // Armazena o texto em tempo real antes da "coagulação"
};

// 1. KERNEL ENGINE: Gestão de Estado e Persistência (Solve et Coagula)
const Kernel = {
    save: (content) => {
        const key = `OMC_STORAGE_${SYSTEM_STATE.profile}`;
        localStorage.setItem(key, content);
        console.log(`[DUMP] Memória Coagulada em ${SYSTEM_STATE.profile}`);
        Kernel.feedback('#00FF41'); // Verde Matrix para sucesso
    },
    load: (profileId) => {
        return localStorage.getItem(`OMC_STORAGE_${profileId}`) || "";
    },
    feedback: (color) => {
        const core = document.getElementById('orbital-ring');
        if(core) {
            const original = core.getAttribute('color');
            core.setAttribute('color', color);
            setTimeout(() => core.setAttribute('color', original), 300);
        }
    }
};

// 2. MOTOR DE ESCRITA ATIVA (Interação Direta com o Monitor 0)
function handleTyping(e) {
    if (e.altKey || e.ctrlKey) return; // Evita conflito com atalhos

    const display = document.getElementById('execution-text');
    
    if (e.key === 'Backspace') {
        SYSTEM_STATE.buffer = SYSTEM_STATE.buffer.slice(0, -1);
    } else if (e.key === 'Enter') {
        SYSTEM_STATE.buffer += '\n> ';
    } else if (e.key.length === 1) {
        SYSTEM_STATE.buffer += e.key;
    }

    // Atualiza o Monitor 3D em tempo real
    display.setAttribute('value', SYSTEM_STATE.buffer + "_");
    SYSTEM_STATE.lastInput = Date.now();
}

// 3. CONTEXT SWAPPING: Task Sandboxing (Multitarefa sem Aquecimento)
function swapContext(newProfile) {
    const display = document.getElementById('execution-text');
    
    // Salva o que estava sendo escrito no perfil anterior
    Kernel.save(SYSTEM_STATE.buffer);

    // Troca e recupera
    SYSTEM_STATE.profile = newProfile;
    SYSTEM_STATE.buffer = Kernel.load(newProfile);
    
    // Atualiza UI
    display.setAttribute('value', SYSTEM_STATE.buffer || `INICIALIZANDO ${newProfile}...`);
    
    // Feedback visual de transição
    Kernel.feedback('#FFB800'); // Âmbar
}

// 4. TELEMETRIA DE LATÊNCIA: Sinal de Clock (Bio-Feedback)
function runLatencyMonitor() {
    setInterval(() => {
        if (SYSTEM_STATE.isLocked) return;

        const idleTime = Math.floor((Date.now() - SYSTEM_STATE.lastInput) / 1000);
        const timerDisplay = document.getElementById('atc-timer');
        
        if(timerDisplay) {
            const status = idleTime > 30 ? 'CRITICAL' : 'STABLE';
            timerDisplay.setAttribute('value', `TIME_IDLE: ${idleTime}s\nSTATUS: ${status}\nUPLINK: ACTIVE`);
            timerDisplay.setAttribute('color', idleTime > 30 ? '#FF4B00' : '#00D4FF');
        }

        // Alerta de Glitch Visual (Disparado no Monitor Central)
        const mon0 = document.getElementById('mon-0');
        if (idleTime > SYSTEM_STATE.latencyLimit) {
            updateBioStatus("ALERTA: ESTADO DE INÉRCIA DETECTADO");
            // Aqui o CSS "latency-critical" fará o monitor tremer
            mon0.setAttribute('material', 'emissive: #FF4B00; emissiveIntensity: 0.5');
        } else {
            mon0.setAttribute('material', 'emissive: #00D4FF; emissiveIntensity: 0.1');
        }
    }, 1000);
}

// 5. NAVEGAÇÃO CINEMATOGRÁFICA (Snap-to-Panel)
function navigate(key) {
    const camera = document.getElementById('main-camera');
    const positions = {
        '1': '0 50 0',   // Monitor -2
        '2': '0 25 0',   // Monitor -1
        '3': '0 0 0',    // Monitor 0
        '4': '0 -25 0',  // Monitor +1
        '5': '0 -50 0'   // Monitor +2
    };

    if (positions[key]) {
        // Aumentamos para 800ms para um movimento mais fluido e menos "robótico"
        camera.setAttribute('animation', {
            property: 'rotation',
            to: positions[key],
            dur: 800,
            easing: 'easeInOutExpo'
        });
    }
}

// 6. FOCUS CLIPPING: Modo Sombra (Alt+S)
function toggleShadowMode() {
    SYSTEM_STATE.isShadowMode = !SYSTEM_STATE.isShadowMode;
    const targets = document.querySelectorAll('.ghost-window, #reactor-core, #grid-floor');
    
    targets.forEach(el => {
        const targetOpacity = SYSTEM_STATE.isShadowMode ? 0 : 0.2;
        el.setAttribute('animation', `property: material.opacity; to: ${targetOpacity}; dur: 600`);
    });
    
    updateBioStatus(SYSTEM_STATE.isShadowMode ? "MODO SOMBRA: ATIVO" : "STATUS: ESTÁVEL");
}

// 7. ESCUTA DE EVENTOS (O Sistema de Audição do Kernel)
window.addEventListener('keydown', (e) => {
    // 1. Atalhos de Comando (ALT)
    if (e.altKey) {
        if (['1','2','3','4','5'].includes(e.key)) navigate(e.key);
        if (e.key === 's') toggleShadowMode();
        if (e.key === 'Enter') Kernel.save(SYSTEM_STATE.buffer); // Atalho manual de "Dump"
        return;
    }

    // 2. Captura de Escrita (Se não houver tecla de comando)
    handleTyping(e);
});

function updateBioStatus(msg) {
    const bioText = document.querySelector('#hud-stats a-text');
    if(bioText) {
        bioText.setAttribute('value', `CPF: ${SYSTEM_STATE.cpfBattery}% | ${msg}`);
    }
}

// BOOT SEQUENCER
window.onload = () => {
    console.log("%c OMC VR-OS | KERNEL v4.5 ONLINE ", "background: #000; color: #00D4FF; font-weight: bold;");
    
    // Recupera o último estado salvo para o perfil inicial
    SYSTEM_STATE.buffer = Kernel.load('ALPHA');
    
    runLatencyMonitor();
    updateBioStatus("KERNEL ESTABILIZADO");
};