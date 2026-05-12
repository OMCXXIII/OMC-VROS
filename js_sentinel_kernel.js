/* ═══════════════════════════════════════════════════════════════════════════
   OMC VR-OS | SENTINEL KERNEL
   Gestão de Estado, Persistência e Boot
   Fragmento 1/4
═══════════════════════════════════════════════════════════════════════════ */

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

const JARVIS_CONFIG = {
    apiEndpoint:      "",
    autoSaveInterval: 300000,
    voiceSensitivity: 0.8,
    lang:             'pt-BR'
};

const Kernel = {
    save: (profile, data) => {
        const payload = {
            data,
            timestamp: Date.now(),
            mielina: SYSTEM_STATE.telemetry.mielina
        };
        localStorage.setItem(`OMC_VR_OS_${profile}`, JSON.stringify(payload));
        console.log(`[KERNEL] Snapshot salvo: ${profile}`);
    },
    load: (profile) => {
        const raw = localStorage.getItem(`OMC_VR_OS_${profile}`);
        return raw ? JSON.parse(raw).data : "";
    }
};

function updateSessionClock() {
    const now = new Date();
    const clock = document.getElementById('session-clock');
    if (clock) {
        clock.setAttribute('value', now.toLocaleTimeString('pt-BR', { hour12: false }));
    }
    setTimeout(updateSessionClock, 1000);
}

window.addEventListener('load', () => {
    console.log('%c OMC VR-OS | KERNEL v6.0 SENTINEL ', 'background:#000;color:#00D4FF;font-weight:bold;');
    SYSTEM_STATE.ops.buffer = Kernel.load('ALPHA');
    if (typeof _flushBuffer === 'function') _flushBuffer();
    
    if (window.IS_MOBILE) {
        const scene = document.querySelector('a-scene');
        if (scene) {
            scene.setAttribute('renderer', 'precision: low; antialias: false; alpha: false; powerPreference: low-power');
        }
    }
    
    if (typeof VoiceCore !== 'undefined') VoiceCore.init();
    updateSessionClock();
    if (typeof updateDynamicFeeds === 'function') updateDynamicFeeds();

    let lastProx = 0;
    const PROX_INTERVAL = window.IS_MOBILE ? 100 : 16;
    function proximityLoop(ts) {
        if (ts - lastProx >= PROX_INTERVAL) {
            if (typeof updateQuantumProximity === 'function') updateQuantumProximity();
            lastProx = ts;
        }
        requestAnimationFrame(proximityLoop);
    }
    requestAnimationFrame(proximityLoop);
    if (typeof updateBioStatus === 'function') updateBioStatus();
});
