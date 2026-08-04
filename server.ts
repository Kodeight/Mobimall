import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

// Increase payload limit for uploading room layout snapshots
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// Lazy load Gemini Client to handle cases where API Key might be loaded or set up later
let aiClient: GoogleGenAI | null = null;

function getAiClient() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("GEMINI_API_KEY environment variable is not defined yet.");
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey || "MOCK_KEY",
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// ----------------------------------------------------
// API ROUTES FIRST
// ----------------------------------------------------

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// AI interior decorator endpoint
app.post("/api/design", async (req, res) => {
  const { roomPresetId, roomWidth, roomDepth, userPreferences, uploadedImageBase64 } = req.body;

  try {
    const ai = getAiClient();
    
    // Fallback if no real key is set yet to ensure client never crashes and stays functional
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === "MY_GEMINI_API_KEY") {
      console.warn("Using high-fidelity mockup AI response since real GEMINI_API_KEY is not defined in env.");
      // Return high-quality, realistic interior layout recommendations based on preferences
      const isBedroom = userPreferences?.toLowerCase().includes("bed") || userPreferences?.toLowerCase().includes("chambre");
      const isDining = userPreferences?.toLowerCase().includes("dine") || userPreferences?.toLowerCase().includes("manger") || userPreferences?.toLowerCase().includes("table");
      
      let items = [
        {
          productId: "p-casbah-sofa",
          coordinates: { x: roomWidth / 2, y: roomDepth * 0.7 },
          rotation: 0,
          reasoning: "Placé comme pièce maîtresse de votre salon pour créer une atmosphère chaleureuse face à la lumière naturelle."
        },
        {
          productId: "p-tassili-chair",
          coordinates: { x: (roomWidth / 2) - 1.2, y: roomDepth * 0.6 },
          rotation: 45,
          reasoning: "Une assise sculpturale d'appoint orientée vers le canapé Casbah pour encourager la conversation."
        },
        {
          productId: "p-sahara-credenza",
          coordinates: { x: roomWidth * 0.25, y: roomDepth * 0.3 },
          rotation: 180,
          reasoning: "Adossé au mur principal, ce buffet aux motifs de dunes apporte une profondeur texturelle."
        },
        {
          productId: "p-djurdjura-pendant",
          coordinates: { x: roomWidth / 2, y: roomDepth / 2 },
          rotation: 0,
          reasoning: "Suspendu au centre géométrique pour inonder la pièce d'une lueur dorée rappelant les couchers de soleil kabyles."
        }
      ];

      if (isBedroom) {
        items = [
          {
            productId: "p-atlas-bed",
            coordinates: { x: roomWidth / 2, y: roomDepth * 0.4 },
            rotation: 0,
            reasoning: "Le lit Atlas à baldaquin est positionné contre le mur d'honneur pour structurer majestueusement votre chambre."
          },
          {
            productId: "p-sahara-credenza",
            coordinates: { x: roomWidth * 0.15, y: roomDepth * 0.5 },
            rotation: 90,
            reasoning: "Placé latéralement pour servir de coiffeuse élégante et offrir un espace de rangement texturé."
          },
          {
            productId: "p-tassili-chair",
            coordinates: { x: roomWidth * 0.8, y: roomDepth * 0.7 },
            rotation: -45,
            reasoning: "Un coin lecture serein placé près de la fenêtre ou dans l'angle de repos."
          }
        ];
      } else if (isDining) {
        items = [
          {
            productId: "p-hoggar-table",
            coordinates: { x: roomWidth / 2, y: roomDepth / 2 },
            rotation: 0,
            reasoning: "La table Hoggar en pierre de basalte est positionnée au centre pour asseoir le caractère architectural de la salle à manger."
          },
          {
            productId: "p-djurdjura-pendant",
            coordinates: { x: roomWidth / 2, y: roomDepth / 2 },
            rotation: 0,
            reasoning: "Directement alignée au-dessus de la table monolithique pour focaliser la lumière et valoriser le marbre/basalte."
          },
          {
            productId: "p-sahara-credenza",
            coordinates: { x: roomWidth * 0.85, y: roomDepth * 0.5 },
            rotation: -90,
            reasoning: "Buffet placé à proximité pour le service de table et pour équilibrer le caractère monolithique."
          }
        ];
      }

      const mockResponse = {
        overallConcept: `Atmosphère Chic Algérienne Contemporaine: Un mélange sublime inspiré de l'élégance minimaliste d'Herman Miller et du savoir-faire local. ${userPreferences || "Déco chaleureuse et lumineuse."}`,
        colorPalette: ["#e3dbcb", "#3d271d", "#004b39", "#be9b7b"],
        recommendations: items,
        proTips: [
          "Laissez au moins 80cm de dégagement autour de la table de repas ou du canapé pour fluidifier le passage.",
          "Mettez en valeur les textures minérales et le chêne brûlé de l'Atlas sous une lumière indirecte.",
          "Ajoutez un tapis artisanal traditionnel en laine neutre pour ancrer le mobilier de salon."
        ]
      };
      return res.json(mockResponse);
    }

    // Call real Gemini API
    const systemPrompt = `You are Mobimall Algeria's Chief Premium AI Interior Designer & Showroom Director.
Your task is to analyze an Algerian room (described by the user, and optionally shown in an uploaded image) and suggest a luxurious, functional spatial layout using strictly these Mobimall Product IDs:
1. 'p-tassili-chair' (Tassili Sculptural Lounge Chair, size: 0.9m W x 0.85m D)
2. 'p-casbah-sofa' (Casbah Modular Minimalist Sofa, size: 2.4m W x 1.05m D)
3. 'p-sahara-credenza' (Sahara Dunes Credenza Sideboard, size: 1.8m W x 0.45m D)
4. 'p-hoggar-table' (Hoggar Basalt Monolith Dining Table, size: 2.2m W x 1.0m D)
5. 'p-atlas-bed' (Atlas Canopy Sculpted Bed, size: 2.1m W x 2.2m D)
6. 'p-djurdjura-pendant' (Djurdjura Sunset Amber Pendant, size: 0.6m W x 0.6m D)

The room dimensions are ${roomWidth} meters wide by ${roomDepth} meters deep.
You MUST suggest furniture positions (x and y coordinates) inside the room layout grid. x must be between 0.5 and ${roomWidth - 0.5}. y must be between 0.5 and ${roomDepth - 0.5}.
You MUST also specify rotation for each recommended item (can be 0, 90, 180, 270 degrees).
Generate a custom, luxurious concept description, color palette, specific reasonings in French for each product, and expert architectural pro tips.
Respond STRICTLY with valid JSON matching the schema format below.`;

    let userPrompt = `I have a room which is ${roomWidth}m wide x ${roomDepth}m deep (Preset style: ${roomPresetId || "Custom"}).
My design style preferences are: ${userPreferences || "Luxury Algerian minimal elegance with organic textures"}.
Please place the best matching Mobimall pieces and provide a detailed curation plan.`;

    let parts: any[] = [];
    if (uploadedImageBase64) {
      // If user uploaded a custom room image, send it as inlineData
      const matches = uploadedImageBase64.match(/^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64,(.+)$/);
      if (matches && matches.length === 3) {
        parts.push({
          inlineData: {
            mimeType: matches[1],
            data: matches[2]
          }
        });
      }
    }
    parts.push({ text: userPrompt });

    console.log("Calling Gemini API with model gemini-3.5-flash...");
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: { parts },
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: ["overallConcept", "colorPalette", "recommendations", "proTips"],
          properties: {
            overallConcept: {
              type: Type.STRING,
              description: "High-end luxury concept name and overview in French (e.g., 'Élégance Tellienne', 'Sirocco Minimaliste')."
            },
            colorPalette: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Array of 4 hex colors matching the recommended mood."
            },
            recommendations: {
              type: Type.ARRAY,
              description: "A curated layout list placing 2 to 5 Mobimall items precisely in the room grid.",
              items: {
                type: Type.OBJECT,
                required: ["productId", "coordinates", "rotation", "reasoning"],
                properties: {
                  productId: {
                    type: Type.STRING,
                    description: "Must be exactly one of the six provided Mobimall product IDs."
                  },
                  coordinates: {
                    type: Type.OBJECT,
                    required: ["x", "y"],
                    properties: {
                      x: { type: Type.NUMBER, description: "Distance from left wall in meters (0 to roomWidth)." },
                      y: { type: Type.NUMBER, description: "Distance from top wall in meters (0 to roomDepth)." }
                    }
                  },
                  rotation: { type: Type.INTEGER, description: "0, 90, 180, or 270 degrees." },
                  reasoning: { type: Type.STRING, description: "Brief, highly professional interior designer reasoning in French." }
                }
              }
            },
            proTips: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "3 highly polished, luxurious decor/arrangement pro tips in French."
            }
          }
        }
      }
    });

    const textOutput = response.text;
    if (!textOutput) {
      throw new Error("Empty response from Gemini API");
    }

    const parsedData = JSON.parse(textOutput.trim());
    return res.json(parsedData);
  } catch (error: any) {
    console.error("Gemini AI Design Error:", error);
    res.status(500).json({ error: "Failed to generate design concept: " + error.message });
  }
});

// ----------------------------------------------------
// VITE OR STATIC SERVING MIDDLEWARE
// ----------------------------------------------------

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    // Development server with Vite hot reloading
    console.log("Setting up Vite development middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production serving of built assets
    const distPath = path.join(process.cwd(), "dist");
    console.log(`Serving static files from production dist: ${distPath}`);
    app.use(express.static(distPath));
    app.get("*all", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Mobimall server running on http://localhost:${PORT}`);
  });
}

startServer();
