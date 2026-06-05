const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/", async (req, res) => {
  const { mensaje } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    // Si no hay API key, le indicamos al cliente que use el fallback local
    return res.json({ fallback: true });
  }

  try {
    const prompt = `Eres el Dios del Sol Ra, el oráculo ancestral del antiguo Egipto. 
Responde a la siguiente pregunta de un viajero con un tono místico, sabio, enigmático, noble y protector. 
Utiliza metáforas sobre el Nilo, el sol naciente, las arenas eternas o el poder de las pirámides. 
La respuesta debe ser relativamente breve (máximo 3 o 4 líneas) y redactada en español.

Pregunta del viajero: "${mensaje}"`;

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const response = await axios.post(url, {
      contents: [
        {
          parts: [
            {
              text: prompt
            }
          ]
        }
      ]
    }, {
      headers: {
        "Content-Type": "application/json"
      },
      timeout: 5000 // 5 segundos de timeout para no colgar la petición
    });

    const respuestaTexto = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (respuestaTexto) {
      return res.json({ ok: true, respuesta: respuestaTexto.trim() });
    } else {
      return res.json({ fallback: true });
    }
  } catch (error) {
    console.error("⚠️ Error en el Oráculo de Ra (Gemini):", error.message);
    // Retornamos fallback para no romper la experiencia de usuario
    return res.json({ fallback: true });
  }
});

module.exports = router;
