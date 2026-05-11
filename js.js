/* OMC VR-OS | JS KERNEL v3.2 
   Diretriz: Persistent State & Context Swapping
*/

const SYSTEM_STATE = {
    profile: 'ALPHA', // Padrão: Tech Lab
    lastInput: Date.now(),
    latencyLimit: 60, // Segundos
    isShadowMode: false
};

// 1. GESTÃO DE MEMÓRIA (Solve et Coagula)
function saveToKernel(content) {
    const key = `OMC_STORAGE_${SYSTEM_STATE.profile}`;
    localStorage.setItem(key, content);
    console.log(`[DUMP] Dados salvos no perfil ${SYSTEM_STATE.profile}`);
}

function loadFromKernel(profileId) {
    const key = `OMC_STORAGE_${profileId}`;
    return localStorage.getItem(key) || "";
}

// 2. TROCA DE CONTEXTO (Escalabilidade)
function swapContext(newProfile) {
    // Coagular estado atual antes de trocar
    const currentContent = document.getElementById('input-area').value;
    saveToKernel(currentContent);

    // Mudar estado e carregar novo
    SYSTEM_STATE.profile = newProfile;
    const newContent = loadFromKernel(newProfile);
    
    // Atualizar UI
    document.getElementById('input-area').value = newContent;
    document.getElementById('active-mode').innerText = newProfile;
    
    // Feedback visual no VR (Sinal de Clock)
    const clock = document.getElementById('clock');
    if(clock) clock.setAttribute('color', '#FFB800'); // Cor de transição
    setTimeout(() => clock.setAttribute('color', '#00D4FF'), 500);
}

// 3. MONITOR DE LATÊNCIA (Bio-Feedback)
function runLatencyMonitor() {
    setInterval(() => {
        const now = Date.now();
        const idleTime = Math.floor((now - SYSTEM_STATE.lastInput) / 1000);
        
        // Atualizar display de latência
        const latDisplay = document.getElementById('lat-val');
        if(latDisplay) latDisplay.innerText = `${idleTime}s`;

        // Ativar Alerta de Glitch
        const sysStatus = document.getElementById('sys-status');
        if (idleTime > SYSTEM_STATE.latencyLimit) {
            sysStatus.classList.add('latency-critical');
            sysStatus.innerText = "ALERTA: LATÊNCIA ALTA";
        } else {
            sysStatus.classList.remove('latency-critical');
            sysStatus.innerText = "STATUS: ESTÁVEL";
        }
    }, 1000);
}

// Inicializar Monitor ao carregar
window.onload = () => {
    runLatencyMonitor();
    // Carregar último estado Alpha
    swapContext('ALPHA');
};