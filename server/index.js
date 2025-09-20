// server/index.js — Backend para Alex com Google Cloud TTS (Vercel)
import express from "express";
import textToSpeech from "@google-cloud/text-to-speech";
import path from "path";
import { fileURLToPath } from "url";

// Ajusta __dirname para ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

// Cria cliente do TTS usando variáveis de ambiente da Vercel
// (essas variáveis foram configuradas na aba Settings → Environment Variables)
const client = new textToSpeech.TextToSpeechClient({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  },
  projectId: process.env.GOOGLE_PROJECT_ID,
});

// Rota principal só para confirmar se o backend está de pé
app.get("/api", (req, res) => {
  res.send({ status: "ok", message: "Alex TTS backend ativo!" });
});

// Rota para gerar voz
app.post("/api/speak", async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: "Texto não fornecido" });
    }

    const request = {
      input: { text },
      voice: {
        languageCode: "en-US",       // 🔊 Inglês
        name: "en-US-Wavenet-D",     // Voz masculina neural natural
        ssmlGender: "MALE",
      },
      audioConfig: {
        audioEncoding: "MP3",
        speakingRate: 1.05,          // ritmo levemente acelerado
        pitch: -2.0,                 // tom mais grave
      },
    };

    const [response] = await client.synthesizeSpeech(request);

    res.set("Content-Type", "audio/mpeg");
    res.send(response.audioContent);
  } catch (err) {
    console.error("❌ Erro no TTS:", err);
    res.status(500).json({ error: "Erro ao gerar fala" });
  }
});

// 🚀 Exporta para Vercel como função serverless
export default app;
