// Assistant « coach » : reformule les conseils avec Claude. Clé API personnelle (BYOK) conservée uniquement sur cet appareil.
// Seules des données textuelles (mesures, défauts, profil, réponses tactiques) sont envoyées : jamais les vidéos ni les images.

const SDK_URL = "https://cdn.jsdelivr.net/npm/@anthropic-ai/sdk@1.0.0/+esm";

export const MODELS = [
  { id: "claude-opus-5-5", label: "Claude Opus 5.5 (le plus capable)" },
  { id: "claude-sonnet-5-5", label: "Claude Sonnet 5.5 (équilibré)" },
  { id: "claude-haiku-5-5", label: "Claude Haiku 5.5 (rapide, économique)" },
];

const SYSTEM = `Tu es un entraîneur de tennis diplômé, bienveillant et précis, qui s'exprime en français.
Tu reçois des mesures biomécaniques estimées automatiquement à partir d'une vidéo de smartphone (précision limitée), des défauts détectés et le profil du joueur.
Règles :
- N'invente aucune mesure ni aucun fait absent des données ; signale l'incertitude quand l'estimation est limite.
- Pas de diagnostic médical : en cas de douleur (épaule, coude, dos), recommande de consulter un professionnel de santé.
- Adapte le vocabulaire et la quantité d'information au niveau du joueur.
- Réponds de façon concise, structurée et motivante.`;

let sdk = null;
async function client(apiKey) {
  if (!sdk) sdk = (await import(SDK_URL)).default;
  return new sdk({ apiKey, dangerouslyAllowBrowser: true });
}

export function buildAnalysisPrompt({ stroke, profile, metrics, issues, notes }) {
  const data = { geste: stroke, profil: profile, mesures: metrics, defauts_detectes: issues, remarques: notes };
  return `Voici l'analyse d'un geste de tennis :\n\n${JSON.stringify(data, null, 2)}\n\nRédige pour le joueur :\n1. Un résumé en 2 phrases.\n2. Les 3 priorités de progression, chacune avec une consigne simple (image mentale) et UN exercice concret adapté à son niveau et à son objectif.\n3. Une phrase d'encouragement.\nMaximum 250 mots.`;
}

export function buildTacticsPrompt({ headline, principles, serve, ret, patterns, cond }) {
  const data = { titre: headline, principes: principles, service: serve, retour: ret, schemas: patterns, conditions: cond };
  return `Voici le plan tactique généré pour un match de tennis :\n\n${JSON.stringify(data, null, 2)}\n\nRédige un briefing d'avant-match en 10 lignes maximum : l'idée directrice, 3 schémas à jouer, 2 pièges à éviter, une consigne mentale pour les moments difficiles.`;
}

/** Appelle Claude et renvoie le texte. */
export async function askClaude({ apiKey, model, prompt }) {
  if (!apiKey) throw new Error("Aucune clé API : renseignez-la dans l'onglet Coach › Assistant.");
  const c = await client(apiKey);
  try {
    const msg = await c.messages.create({
      model,
      max_tokens: 2000,
      system: SYSTEM,
      output_config: { effort: "low" },
      messages: [{ role: "user", content: prompt }],
    });
    return msg.content.filter((b) => b.type === "text").map((b) => b.text).join("\n").trim() || "(réponse vide)";
  } catch (e) {
    const code = e?.status;
    if (code === 401) throw new Error("Clé API refusée (401). Vérifiez-la.");
    if (code === 429) throw new Error("Limite de débit atteinte (429). Réessayez dans un instant.");
    throw new Error(`Erreur de l'assistant${code ? " (" + code + ")" : ""} : ${e?.message || e}`);
  }
}

export const getSystemPrompt = () => SYSTEM;
