// alex-core.js — Universal Alex Assistant (Bilingual Voice + GeoIP + Visuals)
// ---------------------------------------------------------------------------

let alexUtterance = null;
let alexVoice = null;
let userCountry = null;
let alexInterval = null;
let unlocked = false;
let currentLang = "en-US";

// 🔊 1. Unlock Audio (for iOS & Android)
function unlockAudio() {
  if (unlocked) return;
  try {
    const temp = new SpeechSynthesisUtterance(" ");
    window.speechSynthesis.speak(temp);
    window.speechSynthesis.cancel();
  } catch (e) {
    console.warn("Audio unlock failed:", e);
  }
  unlocked = true;
  window.removeEventListener("touchend", unlockAudio);
  window.removeEventListener("click", unlockAudio);
}
window.addEventListener("touchend", unlockAudio);
window.addEventListener("click", unlockAudio);

// 🌍 2. Detect language & country
async function detectLang() {
  const stored = localStorage.getItem("alexLang");
  if (stored) {
    currentLang = stored;
    return currentLang;
  }

  let lang = "en-US";
  try {
    const res = await fetch("https://ipapi.co/json/");
    if (res.ok) {
      const data = await res.json();
      userCountry = data.country_code?.toUpperCase() || "US";
      if (["BR", "PT", "MZ", "AO"].includes(userCountry)) lang = "pt-BR";
    }
  } catch (err) {
    console.warn("GeoIP lookup failed:", err);
  }

  currentLang = lang;
  localStorage.setItem("alexLang", lang);
  return lang;
}

// 🎙️ 3. Load the most natural voice per language
function loadVoice(lang) {
  const voices = speechSynthesis.getVoices();
  if (!voices.length) return;

  if (lang === "pt-BR") {
    alexVoice =
      voices.find((v) => /Luciana|Camila|Maria|pt-BR|Brazilian Portuguese/i.test(v.name + v.lang)) ||
      voices.find((v) => v.lang.startsWith("pt")) ||
      voices[0];
  } else {
    alexVoice =
      voices.find((v) => /Alex|Allison|Samantha|Joanna|en-US/i.test(v.name + v.lang)) ||
      voices.find((v) => v.lang.startsWith("en")) ||
      voices[0];
  }

  console.log("✅ Alex voice loaded:", alexVoice.name || "default");
}

// 🎨 4. Country-based color palette
function getCountryPalette() {
  switch (userCountry) {
    case "BR": return ["#009739", "#FFDF00"];
    case "US": return ["#3C3B6E", "#B22234", "#FFFFFF"];
    case "CH": return ["#FF0000", "#FFFFFF"];
    case "PE": return ["#D91023", "#FFFFFF"];
    default: return ["#062D3E", "#25535B", "#B15330", "#C9AFA5"];
  }
}

// 💬 5. Speak with contextual speed & tone
function speakAlex(text, lang = currentLang) {
  if (!alexVoice) loadVoice(lang);
  speechSynthesis.cancel();

  const u = new SpeechSynthesisUtterance(text);
  u.lang = lang;
  u.voice = alexVoice;
  u.rate = lang === "pt-BR" ? 1.05 : 1.25;
  u.pitch = lang === "pt-BR" ? 1.0 : 1.1;
  u.volume = 1.0;

  u.onstart = () => {
    const btn = document.getElementById("replay-alex") || document.getElementById("toggleAlex");
    if (btn) btn.textContent = "🔇";
    window.dispatchEvent(new Event("alex-speaking-start"));
    alexInterval = setInterval(moveAlex, 6000);
  };

  u.onend = () => {
    const btn = document.getElementById("replay-alex") || document.getElementById("toggleAlex");
    if (btn) btn.textContent = "🔊";
    clearInterval(alexInterval);
    window.dispatchEvent(new Event("alex-speaking-end"));
  };

  alexUtterance = u;
  speechSynthesis.speak(u);
}

// 🌀 6. Move Alex around the screen
function moveAlex() {
  const alex = document.getElementById("alex-container");
  if (!alex) return;
  const positions = [
    { top: "20px", right: "20px" },
    { bottom: "20px", right: "20px" },
    { bottom: "20px", left: "20px" },
    { top: "20px", left: "20px" },
  ];
  const pos = positions[Math.floor(Math.random() * positions.length)];
  Object.assign(alex.style, pos);
}

// 🧠 7. Page narrations
function getNarration(lang) {
  const path = window.location.pathname.toLowerCase();
  const narrations = {
    "pt-BR": {
      index: "Olá! Seja bem-vindo ao portfólio interativo de Nívea Ribeiro. Eu sou Alex, sua guia virtual.",
      about: "Esta é a página sobre Nívea Ribeiro. Aqui você conhecerá sua trajetória, visão e conquistas.",
      projects: "Explore os projetos de Nívea Ribeiro — inovação, criatividade e impacto real.",
      contact: "Aqui estão as formas de contato com Nívea Ribeiro: e-mail, GitHub, LinkedIn e muito mais.",
      details: "Detalhes deste projeto — tecnologias, objetivos e contribuições.",
    },
    "en-US": {
      index: "Hello! Welcome to Nívea Ribeiro’s interactive portfolio. I'm Alex, your virtual guide.",
      about: "This is Nívea Ribeiro’s About page — discover her journey, vision, and impact.",
      projects: "Explore Nívea Ribeiro’s projects — innovation, creativity, and real-world impact.",
      contact: "Here you can find Nívea Ribeiro’s contact info: email, GitHub, LinkedIn and more.",
      details: "Project details — technologies, goals, and achievements.",
    },
  };

  let key = "index";
  if (path.includes("about")) key = "about";
  else if (path.includes("contact")) key = "contact";
  else if (path.includes("project-details")) key = "details";
  else if (path.includes("project")) key = "projects";

  return narrations[lang][key];
}

// 🔁 8. Replay toggle
function toggleReplay(text, lang = currentLang) {
  if (speechSynthesis.speaking) {
    speechSynthesis.cancel();
    window.dispatchEvent(new Event("alex-speaking-end"));
  } else {
    speakAlex(text, lang);
  }
}

// 🚀 9. Initialize on load
window.addEventListener("load", async () => {
  const lang = await detectLang();
  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = () => loadVoice(lang);
  } else {
    loadVoice(lang);
  }

  const narration = getNarration(lang);
  speakAlex(narration, lang);

  const btn = document.getElementById("replay-alex") || document.getElementById("toggleAlex");
  if (btn) btn.addEventListener("click", () => toggleReplay(narration, lang));
});

// 🌟 Export functions for reuse
window.speakAlex = speakAlex;
window.toggleReplay = toggleReplay;
window.getCountryPalette = getCountryPalette;
