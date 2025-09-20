// api/tts.js
import textToSpeech from "@google-cloud/text-to-speech";
import fs from "fs";
import path from "path";

// 🔹 Cria cliente do Google TTS usando variáveis de ambiente
const client = new textToSpeech.TextToSpeechClient({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  },
  projectId: process.env.GOOGLE_PROJECT_ID,
});

// 🔹 Função principal para gerar áudio
async function generateTTS(text, filename = "tts") {
  const request = {
    input: { text },
    voice: {
      languageCode: "en-US",
      name: "en-US-Wavenet-D", // 🔊 voz neural masculina natural
      ssmlGender: "MALE",
    },
    audioConfig: {
      audioEncoding: "MP3",
      speakingRate: 1.05, // ritmo natural
      pitch: -2.0,        // tom mais grave
    },
  };

  const [response] = await client.synthesizeSpeech(request);

  // Caminho fixo para salvar em static/audio
  const filePath = path.join(
    process.cwd(),
    "src",
    "main",
    "resources",
    "static",
    "audio",
    `${filename}.mp3`
  );

  // Garante que a pasta existe
  fs.mkdirSync(path.dirname(filePath), { recursive: true });

  // Salva arquivo
  fs.writeFileSync(filePath, response.audioContent, "base64");
  console.log(`✅ Áudio salvo em: ${filePath}`);
  return `/static/audio/${filename}.mp3`;
}

// 🔹 Handler para rodar como API (Vercel/Netlify)
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  try {
    const { text, filename } = req.body;
    if (!text) {
      return res.status(400).json({ error: "Text is required" });
    }

    const file = await generateTTS(text, filename || "tts");
    res.status(200).json({ file });
  } catch (err) {
    console.error("❌ Error generating speech:", err);
    res.status(500).json({ error: "Failed to generate speech" });
  }
}

// 🔹 Se for chamado direto pelo Node (CLI)
if (process.argv.length > 2) {
  const text = process.argv[2];
  const filename = process.argv[3] || "tts";
  generateTTS(text, filename).catch((err) => {
    console.error("❌ CLI Error:", err);
  });
}
