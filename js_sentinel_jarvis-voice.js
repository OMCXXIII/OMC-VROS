/* ═══════════════════════════════════════════════════════════════════════════
   OMC VR-OS | SENTINEL JARVIS-VOICE
   VoiceCore & Speech-to-Intent
   Fragmento 4/4
═══════════════════════════════════════════════════════════════════════════ */

const VoiceCore = {
    synth: window.speechSynthesis,
    init: function() {
        console.log("[JARVIS] VoiceCore inicializado.");
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
        // Reservado para bips e sons de interface
    }
};

const JARVIS_AI = {
    async dispatch(prompt) {
        if (!JARVIS_CONFIG.apiEndpoint) {
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
                const nexus = document.getElementById('nexus-display');
                if (nexus) nexus.setAttribute('value', `IA_REPLY:\n${data.reply}`);
            }
        } catch(err) {
            console.warn('[JARVIS] API dispatch falhou:', err.message);
        }
    }
};

function updateDynamicFeeds() {
    const feeds = [
        "LINK_ESTÁVEL: 100%",
        "BIOMETRIA: NOMINAL",
        "LOG: KERNEL_LOADED",
        "STATUS: SOBERANO"
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
