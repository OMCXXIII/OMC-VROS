/* ═══════════════════════════════════════════════════════════════════════════
   OMC VR-OS | SENTINEL PROTOCOLS
   Mielinização, Regra dos 60s e Telemetria
   Fragmento 3/4
═══════════════════════════════════════════════════════════════════════════ */

function checkLatency() {
    const idleTime = (Date.now() - SYSTEM_STATE.telemetry.lastInput) / 1000;
    const latencyEl = document.getElementById('latency-value');
    
    if (latencyEl) {
        latencyEl.innerText = `${idleTime.toFixed(1)}s`;
        if (idleTime > 60) {
            latencyEl.classList.add('latency-critical');
            if (idleTime % 30 < 1) {
                if (typeof VoiceCore !== 'undefined') VoiceCore.speak("Alerta de Latência. Retome a execução.");
            }
        } else {
            latencyEl.classList.remove('latency-critical');
        }
    }
    SYSTEM_STATE.telemetry.latency = idleTime;
    setTimeout(checkLatency, 1000);
}

function updateBioStatus() {
    const mielinaEl = document.getElementById('mielina-value');
    if (mielinaEl) {
        mielinaEl.innerText = `${SYSTEM_STATE.telemetry.mielina} m/s`;
    }
    const batteryEl = document.getElementById('battery-value');
    if (batteryEl) {
        batteryEl.innerText = `${SYSTEM_STATE.ops.battery}%`;
    }
}

function toggleShadowMode() {
    SYSTEM_STATE.ui.isShadow = !SYSTEM_STATE.ui.isShadow;
    const scene = document.querySelector('a-scene');
    if (SYSTEM_STATE.ui.isShadow) {
        scene.setAttribute('background', 'color: #000');
        console.log("[PROTOCOLO] Shadow Mode: ON");
    } else {
        scene.setAttribute('background', 'color: #00050a');
    }
}

// Iniciar loops de telemetria
setTimeout(checkLatency, 2000);
