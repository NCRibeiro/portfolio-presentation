// tts.js — Raiz do projeto
import fs from "fs";
import util from "util";
import textToSpeech from "@google-cloud/text-to-speech";
import path from "path";
import { fileURLToPath } from "url";

// Resolve caminhos corretamente
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Caminho do JSON de credenciais
const keyPath = path.join(__dirname, "tts-key.json");

// Cria cliente do TTS
const client = new textToSpeech.TextToSpeechClient({
  keyFilename: keyPath,
});

// Função para gerar voz
async function synthesizeSpeech(text, outputFile) {
  const request = {
    input: { text },
    voice: {
      languageCode: "en-US",
      name: "en-US-Wavenet-F", // voz feminina neural natural
      ssmlGender: "FEMALE",
    },
    audioConfig: {
      audioEncoding: "MP3",
      speakingRate: 1.05, // ritmo natural, levemente acelerado
      pitch: 1.5,         // mais feminino
    },
  };

  try {
    const [response] = await client.synthesizeSpeech(request);
    const writeFile = util.promisify(fs.writeFile);
    await writeFile(outputFile, response.audioContent, "binary");
    console.log(`✔ Audio saved: ${outputFile}`);
  } catch (err) {
    console.error("❌ Error generating speech:", err);
  }
}

// Textos para cada página
const narrations = [
  {
    text: "Hello, I am Iris. Welcome to Nívea Ribeiro's interactive portfolio. Let's begin this journey together.",
    file: "iris-index.mp3",
  },
  {
    text: "Welcome to the Multiverse of Projects. OneAPIIRS modernizes fiscal data with secure APIs. SADB trains banking cyber defense. Life brings AI voice support for mental health. Alternate Reality explores who we might have been. Visual Recommendations boost engagement with deep learning. Face Detection secures industrial access with YOLOv8. Virtual Assistant automates marketing with Gemini. Sentiment Classifier adapts chatbot tone. Precision Agriculture monitors crops on the edge. And the Contact Portal connects technology to people.",
    file: "iris-project.mp3",
  },
  {
    text: "Welcome to the Contact Portal. Here, you can reach Nívea Ribeiro directly — whether to collaborate, exchange ideas, or simply say hello.",
    file: "iris-contact.mp3",
  },
];

// Executa todos em sequência
(async () => {
  for (const narr of narrations) {
    await synthesizeSpeech(narr.text, path.join(__dirname, narr.file));
  }
})();
