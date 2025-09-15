// index.js — Backend para Íris com Google Cloud TTS

import express from "express";
import textToSpeech from "@google-cloud/text-to-speech";
import path from "path";
import { fileURLToPath } from "url";

// Ajusta __dirname para ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

// Cliente do Google TTS usando sua chave
const client = new textToSpeech.TextToSpeechClient({
  keyFilename: path.join(__dirname, "tts-key.json"), // ✅ aponta para sua chave
});

// rota para gerar voz
app.post("/api/speak", async (req, res) => {
  try {
    const { text } = req.body;

    const request = {
      input: { text },
      voice: {
        languageCode: "en-US",
        name: "en-US-Wavenet-F", // voz feminina neural natural
        ssmlGender: "FEMALE",
      },
      audioConfig: {
        audioEncoding: "MP3",
        speakingRate: 1.15, // velocidade ajustada
        pitch: 2.0,         // mais agudo/feminino
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

// inicia servidor
app.listen(3000, () => console.log("✅ Backend rodando em http://localhost:3000"));
