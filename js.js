/* OMC VR-OS | JS KERNEL v4.5 
   Diretriz: Motor de Soberania Operativa (Escrita Ativa e Latência Zero)
   Status: JARVIS Active Interface - Operação Híbrida 2D/3D (QUANTUM UPGRADE)
*/

const SYSTEM_STATE = {
    profile: 'ALPHA',
    lastInput: Date.now(),
    latencyLimit: 60, 
    cpfBattery: 100,
    mielinaProgress: 0,
    isShadowMode: false,
    isLocked: false,
    isSynced: false,
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
        const core = document.getElementById('reactor-core');
        if(core) {
            const sphere = core.querySelector('a-sphere');
            const original = sphere.getAttribute('color');
            sphere.setAttribute('color', color);
            setTimeout(() => sphere.setAttribute('color', original), 300);
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
    if (display) {
        display.setAttribute('value', SYSTEM_STATE.buffer + "_");
    }
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
    if (display) {
        display.setAttribute('value', SYSTEM_STATE.buffer || `INICIALIZANDO ${newProfile}...`);
    }
    
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

        // Alerta de Glitch Visual (Disparado no Monitor Central / Singularidade)
        const mon0 = document.getElementById('mon-0');
        if (idleTime > SYSTEM_STATE.latencyLimit) {
            updateBioStatus("ALERTA: ESTADO DE INÉRCIA DETECTADO");
            if (mon0) mon0.setAttribute('material', 'emissive: #FF4B00; emissiveIntensity: 0.8');
        } else {
            if (mon0) mon0.setAttribute('material', 'emissive: #00D4FF; emissiveIntensity: 0.2');
        }
    }, 1000);
}

// 5. NAVEGAÇÃO CINEMATOGRÁFICA (Snap-to-Panel)
function navigate(key) {
    const camera = document.getElementById('main-camera');
    const positions = {
        '1': '0 50 0',   // Monitor -2 (Icosaedro)
        '2': '0 25 0',   // Monitor -1 (Octaedro)
        '3': '0 0 0',    // Monitor 0 (Singularidade)
        '4': '0 -25 0',  // Monitor +1 (Tetraedro)
        '5': '0 -50 0'   // Monitor +2 (Ampulheta)
    };

    if (positions[key]) {
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
    const targets = document.querySelectorAll('.ghost-window, #bio-sigil, #firewall-sigil, a-grid');
    
    targets.forEach(el => {
        const targetOpacity = SYSTEM_STATE.isShadowMode ? 0.05 : 0.6;
        el.setAttribute('animation', `property: material.opacity; to: ${targetOpacity}; dur: 600`);
    });
    
    updateBioStatus(SYSTEM_STATE.isShadowMode ? "MODO SOMBRA: ATIVO" : "STATUS: ESTÁVEL");
}

// 7. MECÂNICA DE APROXIMAÇÃO QUÂNTICA (Zoom Dinâmico e Ativação de Sigilos)
function updateQuantumProximity() {
    const camera = document.querySelector('#main-camera');
    const sigils = document.querySelectorAll('.ghost-window, #mon-0, #bio-sigil, #firewall-sigil');

    sigils.forEach(sigil => {
        const sigilPos = sigil.object3D.position;
        const camPos = camera.object3D.position;
        const distance = camPos.distanceTo(sigilPos);
        
        // Se o operador aproximar o óculos/câmera a menos de 2.5 unidades
        if (distance < 2.5) {
            sigil.setAttribute('animation__zoom', 'property: scale; to: 1.8 1.8 1.8; dur: 400; easing: easeOutQuad');
            if (sigil.components.material) {
                sigil.setAttribute('material', 'emissiveIntensity', '4');
            }
        } else {
            sigil.setAttribute('animation__zoom', 'property: scale; to: 1 1 1; dur: 600; easing: easeInQuad');
            if (sigil.components.material) {
                sigil.setAttribute('material', 'emissiveIntensity', '0.6');
            }
        }
    });
}

// 8. ESCUTA DE EVENTOS (O Sistema de Audição do Kernel)
window.addEventListener('keydown', (e) => {
    if (e.altKey) {
        if (['1','2','3','4','5'].includes(e.key)) navigate(e.key);
        if (e.key === 's') toggleShadowMode();
        if (e.key === 'Enter') Kernel.save(SYSTEM_STATE.buffer); 
        return;
    }
    handleTyping(e);
});

function updateBioStatus(msg) {
    const bioText = document.querySelector('#bio-feedback');
    if(bioText) {
        bioText.setAttribute('value', `CPF: ${SYSTEM_STATE.cpfBattery}% | ${msg}`);
    }
}

// 9. GATILHO DE ENTRADA (Onboarding Sync)
function establishConnection() {
    const overlay = document.getElementById('onboarding-overlay');
    if (overlay) {
        overlay.style.opacity = '0';
        setTimeout(() => {
            overlay.style.display = 'none';
        }, 800);
    }
    SYSTEM_STATE.isSynced = true;
    console.log("CONEXÃO ESTABELECIDA: Fluxo Quântico Ativo.");
}

// BOOT SEQUENCER
window.onload = () => {
    console.log("%c OMC VR-OS | KERNEL v4.5 QUANTUM ONLINE ", "background: #000; color: #00D4FF; font-weight: bold;");
    
    // Recupera o último estado salvo
    SYSTEM_STATE.buffer = Kernel.load('ALPHA');
    const display = document.getElementById('execution-text');
    if (display && SYSTEM_STATE.buffer) {
        display.setAttribute('value', SYSTEM_STATE.buffer + "_");
    }

    runLatencyMonitor();
    
    // Inicia Loop de Proximidade Quântica
    function loop() {
        updateQuantumProximity();
        requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);

    updateBioStatus("KERNEL ESTABILIZADO");
};