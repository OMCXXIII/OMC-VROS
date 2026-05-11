/* OMC VR-OS | JS KERNEL v4.0 
   Diretriz: Motor de Soberania Operativa (Latência Zero)
   Status: JARVIS Active Interface
*/

const SYSTEM_STATE = {
    profile: 'ALPHA',
    lastInput: Date.now(),
    latencyLimit: 60, // Regra dos 60s
    cpfBattery: 100,
    mielinaProgress: 0,
    isShadowMode: false,
    isLocked: false
};

// 1. KERNEL ENGINE: Gestão de Estado Centralizada (Solve et Coagula)
const Kernel = {
    save: (content) => {
        const key = `OMC_STORAGE_${SYSTEM_STATE.profile}`;
        localStorage.setItem(key, content);
        console.log(`[DUMP] Memória Coagulada: ${SYSTEM_STATE.profile}`);
    },
    load: (profileId) => {
        return localStorage.getItem(`OMC_STORAGE_${profileId}`) || "";
    }
};

// 2. CONTEXT SWAPPING: Task Sandboxing (Aquecimento Zero)
function swapContext(newProfile) {
    const inputArea = document.getElementById('execution-text'); // Monitor 0
    
    // Memory Dump do estado anterior
    Kernel.save(inputArea.getAttribute('value'));

    // Troca de Perfil e Snapshot de Retomada
    SYSTEM_STATE.profile = newProfile;
    const recoveredData = Kernel.load(newProfile);
    
    // Atualização da UI e Feedback Visual (Sinal de Clock)
    inputArea.setAttribute('value', recoveredData || `INICIALIZANDO ${newProfile}...`);
    
    const core = document.getElementById('orbital-ring');
    if(core) {
        core.setAttribute('color', '#FFB800'); // Cor de Transição (Âmbar)
        setTimeout(() => core.setAttribute('color', '#00D4FF'), 500);
    }
}

// 3. TELEMETRIA DE LATÊNCIA: Sinal de Clock (Bio-Feedback)
function runLatencyMonitor() {
    setInterval(() => {
        if (SYSTEM_STATE.isLocked) return;

        const idleTime = Math.floor((Date.now() - SYSTEM_STATE.lastInput) / 1000);
        const latDisplay = document.getElementById('atc-timer'); // Monitor +2
        
        if(latDisplay) {
            latDisplay.setAttribute('value', `ATC_CLOCK: ${idleTime}s\nLATENCY: ${idleTime > 30 ? 'CRITICAL' : 'STABLE'}`);
        }

        // Diagnóstico de Hardware: Alerta de Glitch (Quebra do Ciclo de Colapso)
        const monCentral = document.getElementById('mon-0');
        if (idleTime > SYSTEM_STATE.latencyLimit) {
            monCentral.classList.add('latency-critical'); // Dispara tremor holográfico
            updateBioStatus("ALERTA: LATÊNCIA ALTA");
        } else {
            monCentral.classList.remove('latency-critical');
            updateBioStatus("STATUS: ESTÁVEL");
        }
    }, 1000);
}

// 4. FOCUS CLIPPING: Módulo de Sombra (Alt+S)
function toggleShadowMode() {
    SYSTEM_STATE.isShadowMode = !SYSTEM_STATE.isShadowMode;
    const overlays = document.querySelectorAll('.ghost-window');
    
    overlays.forEach(el => {
        el.setAttribute('animation', `property: material.opacity; to: ${SYSTEM_STATE.isShadowMode ? 0 : 0.2}; dur: 500`);
    });
    
    console.log(`[SHADOW_MODE]: ${SYSTEM_STATE.isShadowMode ? 'ATIVADO' : 'DESATIVADO'}`);
}

// 5. NAVEGAÇÃO HÍBRIDA: Snap-to-Panel (Gânglios Basais)
window.addEventListener('keydown', (e) => {
    SYSTEM_STATE.lastInput = Date.now(); // Reset de Latência

    if (e.altKey) {
        const camera = document.querySelector('[camera]');
        const positions = {
            '1': '0 50 0',   // Monitor -2
            '2': '0 25 0',   // Monitor -1
            '3': '0 0 0',    // Monitor 0
            '4': '0 -25 0',  // Monitor +1
            '5': '0 -50 0',  // Monitor +2
            's': 'SHADOW'    // Modo Foco
        };

        if (positions[e.key]) {
            if (e.key === 's') {
                toggleShadowMode();
            } else {
                camera.setAttribute('animation', `property: rotation; to: ${positions[e.key]}; dur: 300; easing: easeOutQuad`);
            }
        }
    }
});

// 6. SÍNTESE E OUTPUT: Conclusão do Ciclo Zeigarnik
function synthesizeMission() {
    const content = document.getElementById('execution-text').getAttribute('value');
    // Preparação para exportação (Markdown/Blogger)
    console.log("Sintetizando Mission Data...");
    // Adicionar efeito de dissolução de partículas aqui
}

function updateBioStatus(msg) {
    const bio = document.getElementById('bio-monitor');
    if(bio) {
        const text = bio.querySelector('a-text');
        text.setAttribute('value', `CPF BATTERY: ${SYSTEM_STATE.cpfBattery}% | ${msg}`);
    }
}

// Inicialização Soberana
window.onload = () => {
    console.log("OMC VR-OS | SENTINEL v4.1 ONLINE");
    runLatencyMonitor();
    swapContext('ALPHA'); // Boot no Tech Lab
};