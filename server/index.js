// index.js — Backend para Íris com Google Cloud TTS (Vercel)

import express from "express";
import textToSpeech from "@google-cloud/text-to-speech";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

// 🔑 Cliente do Google TTS usando variáveis de ambiente
const client = new textToSpeech.TextToSpeechClient({
  credentials: {
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
  },
  projectId: process.env.GOOGLE_PROJECT_ID,
});

// 🎤 Rota para gerar voz
app.post("/api/speak", async (req, res) => {
  try {
    const { text } = req.body;

    const request = {
      input: { text },
      voice: {
        languageCode: "en-US",   // inglês
        name: "en-US-Wavenet-F", // voz feminina neural natural
        ssmlGender: "FEMALE",
      },
      audioConfig: {
        audioEncoding: "MP3",
        speakingRate: 1.15,
        pitch: 2.0,
      },
    };

    const [response] = await client.synthesizeSpeech(request);

    res.set("Content-Type", "audio/mpeg");
    res.send(response.audioContent);
  } catch (err) {
    console.error("❌ Erro no TTS:", err);
    res.status(500).send("Erro ao gerar fala");
  }
});

// 🚀 Exporta o app para a Vercel rodar como serverless
export default app;
