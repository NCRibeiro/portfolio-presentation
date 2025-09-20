// server/api/speak.js — handler para Vercel

import textToSpeech from "@google-cloud/text-to-speech";

const client = new textToSpeech.TextToSpeechClient({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  },
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Text is required" });
    }

    const request = {
      input: { text },
      voice: {
        languageCode: "en-US",
        name: "en-US-Wavenet-D", // 🔊 voz masculina neural natural
        ssmlGender: "MALE",
      },
      audioConfig: {
        audioEncoding: "MP3",
        speakingRate: 1.05, // ritmo mais natural
        pitch: -2.0,        // tom mais grave
      },
    };

    const [response] = await client.synthesizeSpeech(request);

    res.setHeader("Content-Type", "audio/mpeg");
    res.send(response.audioContent);
  } catch (err) {
    console.error("❌ Erro no TTS:", err);
    res.status(500).json({ error: "Erro ao gerar fala" });
  }
}
