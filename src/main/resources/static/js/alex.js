// alex.js — Alex multilíngue + GeoIP + Movimento + Paleta de cores por país

let alexUtterance = null;
let alexVoice = null;
let userCountry = null;
let alexInterval = null;

// Detecta idioma e país
async function getPageLang() {
  let lang = document.documentElement.lang || navigator.language || "en-US";
  lang = lang.toLowerCase();

  try {
    const response = await fetch("https://ipapi.co/json/");
    if (response.ok) {
      const data = await response.json();
      if (data && data.country_code) {
        userCountry = data.country_code.toUpperCase();

        if (userCountry === "BR") return "pt-BR";
        if (userCountry === "US") return "en-US";
        if (userCountry === "PE") return "es-ES"; // Peru → espanhol
        if (userCountry === "CH") return "en-US"; // Suíça → inglês + mensagem especial

        const spanishCountries = ["ES","MX","AR","CL","CO","PE","VE","UY","EC","BO","PY","CR","PA","HN","NI","SV","GT","DO"];
        if (spanishCountries.includes(userCountry)) return "es-ES";

        return "en-US";
      }
    }
  } catch (err) {
    console.warn("GeoIP lookup failed:", err);
  }

  return "en-US"; // fallback
}

// Carrega voz
function loadAlexVoice(lang) {
  const voices = speechSynthesis.getVoices();

  if (lang === "pt-BR") {
    const preferredPT = ["Google português do Brasil", "Microsoft Daniel", "Microsoft João"];
    alexVoice = voices.find(v => preferredPT.some(name => v.name.includes(name))) ||
                voices.find(v => v.lang === "pt-BR");
  } else if (lang === "es-ES") {
    const preferredES = ["Google español", "Microsoft Pablo", "Microsoft Raul"];
    alexVoice = voices.find(v => preferredES.some(name => v.name.includes(name))) ||
                voices.find(v => v.lang === "es-ES");
  } else {
    const preferredEN = ["Microsoft David", "Google US English Male", "Daniel", "Alex"];
    alexVoice = voices.find(v => preferredEN.some(name => v.name.includes(name))) ||
                voices.find(v => v.lang === "en-US");
  }

  if (!alexVoice && voices.length > 0) {
    alexVoice = voices[0];
  }
}

// Movimento do Alex na tela
function moveAlexContainer() {
  const alex = document.getElementById("alex-container");
  if (!alex) return;

  const positions = [
    { bottom: "20px", right: "20px", top: "", left: "" },
    { bottom: "20px", left: "20px", top: "", right: "" },
    { top: "20px", right: "20px", bottom: "", left: "" },
    { top: "20px", left: "20px", bottom: "", right: "" }
  ];

  let next = positions[Math.floor(Math.random() * positions.length)];
  alex.style.top = next.top;
  alex.style.bottom = next.bottom;
  alex.style.left = next.left;
  alex.style.right = next.right;
}

// Paleta de cores por país
function getCountryPalette() {
  if (userCountry === "BR") return ["#009739", "#FFDF00"]; // Brasil
  if (userCountry === "US") return ["#3C3B6E", "#B22234", "#FFFFFF"]; // EUA
  if (userCountry === "CH") return ["#FF0000", "#FFFFFF"]; // Suíça
  if (userCountry === "PE") return ["#D91023", "#FFFFFF"]; // Peru
  return ["#062D3E", "#25535B", "#B15330", "#C9AFA5"]; // Padrão
}

// Fala texto
function speakAlex(text, lang) {
  if (!alexVoice) loadAlexVoice(lang);

  speechSynthesis.cancel();

  alexUtterance = new SpeechSynthesisUtterance(text);
  alexUtterance.lang = lang;
  alexUtterance.rate = 1.05;
  alexUtterance.pitch = 1.0;
  if (alexVoice) alexUtterance.voice = alexVoice;

  alexUtterance.onstart = () => {
    const btn = document.getElementById("replay-alex");
    if (btn) btn.textContent = "🔇";

    moveAlexContainer();
    alexInterval = setInterval(moveAlexContainer, 6000); // muda a posição a cada 6s
  };

  alexUtterance.onend = () => {
    const btn = document.getElementById("replay-alex");
    if (btn) btn.textContent = "🔊";

    clearInterval(alexInterval);
  };

  speechSynthesis.speak(alexUtterance);
}

// Para fala
function stopAlex() {
  if (speechSynthesis.speaking) {
    speechSynthesis.cancel();
    clearInterval(alexInterval);
    const btn = document.getElementById("replay-alex");
    if (btn) btn.textContent = "🔊";
  }
}

// Alterna fala
function toggleReplayAlex(text, lang) {
  if (speechSynthesis.speaking) {
    stopAlex();
  } else {
    speakAlex(text, lang);
  }
}

// Mensagens
function getNarrationForPage(lang) {
  const path = window.location.pathname.toLowerCase();

  // Mensagens especiais por país
  if (userCountry === "CH") {
    return "Greetings from Switzerland! A land of neutrality, innovation, and precision — just like technology should be. Welcome to Nívea Ribeiro's interactive portfolio.";
  }
  if (userCountry === "PE") {
    return "Saludos desde Perú! Tierra de historia milenaria e innovación moderna. Bienvenido al portafolio interactivo de Nívea Ribeiro.";
  }
  if (userCountry === "US") {
    return "Greetings from the United States! A land of diversity and innovation. Welcome to Nívea Ribeiro's interactive portfolio.";
  }
  if (userCountry === "BR") {
    return "Saudações do Brasil! Terra de criatividade, resiliência e tecnologia. Bem-vindo ao portfólio interativo de Nívea Ribeiro.";
  }

  const narrations = {
    "en-US": {
      index: "Hello, it's a pleasure to have you here. Welcome to the Interactive Portfolio by Nívea Ribeiro!",
      about: "Welcome to Nívea Ribeiro's story. Explore her journey, vision, achievements, values, and selected works.",
      project: "Explore Nívea Ribeiro's multiverse of projects. Each one represents innovation, creativity, and technology shaping the future.",
      contact: "Here are Nívea Ribeiro's contact details. You can reach her by email, phone, GitHub, or LinkedIn."
    },
    "pt-BR": {
      index: "Olá, é um prazer ter você aqui. Bem-vindo ao Portfólio Interativo de Nívea Ribeiro!",
      about: "Bem-vindo à história de Nívea Ribeiro. Explore sua jornada, visão, conquistas, valores e trabalhos selecionados.",
      project: "Explore o multiverso de projetos de Nívea Ribeiro. Cada um representa inovação, criatividade e tecnologia moldando o futuro.",
      contact: "Aqui estão os contatos de Nívea Ribeiro. Você pode falar com ela por e-mail, telefone, GitHub ou LinkedIn."
    },
    "es-ES": {
      index: "¡Hola! Es un placer tenerte aquí. Bienvenido al Portafolio Interactivo de Nívea Ribeiro!",
      about: "Bienvenido a la historia de Nívea Ribeiro. Explora su trayectoria, visión, logros, valores y trabajos seleccionados.",
      project: "Explora el multiverso de proyectos de Nívea Ribeiro. Cada uno representa innovación, creatividad y tecnología que moldea el futuro.",
      contact: "Aquí están los contactos de Nívea Ribeiro. Puedes comunicarte con ella por correo electrónico, teléfono, GitHub o LinkedIn."
    }
  };

  let key = "index";
  if (path.includes("about")) key = "about";
  else if (path.includes("project")) key = "project";
  else if (path.includes("contact")) key = "contact";

  return narrations[lang][key] || narrations["en-US"][key];
}

// Inicialização
window.addEventListener("load", async () => {
  const lang = await getPageLang();

  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = () => loadAlexVoice(lang);
  } else {
    loadAlexVoice(lang);
  }

  const narration = getNarrationForPage(lang);
  speakAlex(narration, lang);

  const btn = document.getElementById("replay-alex");
  if (btn) {
    btn.addEventListener("click", () => toggleReplayAlex(narration, lang));
  }
});

// Exporta global
window.speakAlex = speakAlex;
window.stopAlex = stopAlex;
window.toggleReplayAlex = toggleReplayAlex;
window.getCountryPalette = getCountryPalette;
