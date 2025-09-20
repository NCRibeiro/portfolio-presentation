// alex.js — Funções globais do Alex (usando arquivo de áudio pronto)

let alexAudio = null;

function speakAlex() {
  // Se já existe áudio tocando, reinicia
  if (alexAudio) {
    alexAudio.pause();
    alexAudio.currentTime = 0;
  }

  // Carrega o arquivo gravado (certifique-se de renomear o mp3 para alex-voice.mp3)
  alexAudio = new Audio("alex-voice.mp3");
  alexAudio.play();

  // Atualiza ícone do botão
  const btn = document.getElementById("replay-alex");
  if (btn) {
    btn.textContent = "🔇";
    alexAudio.onended = () => {
      btn.textContent = "🔊";
    };
  }
}

// Facilita replay/mute
function toggleReplayAlex() {
  if (!alexAudio || alexAudio.ended) {
    speakAlex();
  } else {
    alexAudio.pause();
    alexAudio.currentTime = 0;
    const btn = document.getElementById("replay-alex");
    if (btn) btn.textContent = "🔊";
  }
}

// Exporta funções no escopo global
window.speakAlex = speakAlex;
window.toggleReplayAlex = toggleReplayAlex;
