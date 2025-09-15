// iris.js — Funções globais da Íris (usando arquivo de áudio pronto)

let irisAudio = null;

function speakIris() {
  // Se já existe áudio tocando, reinicia
  if (irisAudio) {
    irisAudio.pause();
    irisAudio.currentTime = 0;
  }

  // Carrega o arquivo gravado
  irisAudio = new Audio("iris-voice.mp3"); // garante que o arquivo está na mesma pasta dos HTMLs
  irisAudio.play();

  // Atualiza ícone do botão
  const btn = document.getElementById("replay-iris");
  if (btn) {
    btn.textContent = "🔇";
    irisAudio.onended = () => {
      btn.textContent = "🔊";
    };
  }
}

// Facilita replay/mute
function toggleReplayIris() {
  if (!irisAudio || irisAudio.ended) {
    speakIris();
  } else {
    irisAudio.pause();
    irisAudio.currentTime = 0;
    const btn = document.getElementById("replay-iris");
    if (btn) btn.textContent = "🔊";
  }
}

// Exporta funções no escopo global
window.speakIris = speakIris;
window.toggleReplayIris = toggleReplayIris;
