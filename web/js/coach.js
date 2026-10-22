// Espace joueur ↔ coach : échanges par fichiers (aucun serveur). Le joueur exporte un « dossier joueur » (JSON),
// le coach l'importe, commente et renvoie un « retour coach » (JSON) que le joueur importe à son tour.
// Les données restent sur les appareils ; les fichiers peuvent être envoyés par mail, messagerie ou cloud personnel.

const APP = "tennis-coach-ia";

const load = (k, d) => { try { const v = localStorage.getItem("tca." + k); return v ? JSON.parse(v) : d; } catch { return d; } };
const save = (k, v) => { try { localStorage.setItem("tca." + k, JSON.stringify(v)); return true; } catch { return false; } };

export const getProfile = () => load("profile", { name: "", heightCm: "", coachName: "" });
export const setProfile = (p) => save("profile", p);

/** Construit le dossier joueur. images : tableau de { label, dataUrl } (facultatif). */
export function buildPackage({ profile, history, answers, current, images }) {
  return {
    app: APP, kind: "player-package", v: 1, createdAt: new Date().toISOString(),
    player: { name: profile.name || "Joueur", heightCm: profile.heightCm || null, coach: profile.coachName || "" },
    history: (history || []).slice(-30),
    current: current || null, // { stroke, score, issues:[{id}], metrics:[{id,label,value,unit,status}], notes, date }
    tactics: answers || null,
    images: images || [],
  };
}

export function parseFile(text) {
  let o;
  try { o = JSON.parse(text); } catch { throw new Error("Fichier illisible (JSON invalide)."); }
  if (!o || o.app !== APP) throw new Error("Ce fichier n'a pas été créé par Tennis Coach IA.");
  if (!["player-package", "coach-feedback"].includes(o.kind)) throw new Error("Type de fichier inconnu.");
  return o;
}

// --- Côté coach : joueurs importés -------------------------------------------------------------------------
export const listPlayers = () => load("coach.players", []);

export function importPlayer(pkg) {
  const players = listPlayers();
  const id = (pkg.player.name || "joueur").toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const rec = { id, name: pkg.player.name, heightCm: pkg.player.heightCm, receivedAt: new Date().toISOString(), history: pkg.history, current: pkg.current, tactics: pkg.tactics, images: pkg.images || [], comments: [] };
  const i = players.findIndex((p) => p.id === id);
  if (i >= 0) { rec.comments = players[i].comments || []; players[i] = rec; } else players.push(rec);
  if (!save("coach.players", players)) { // quota dépassé : on retire les images
    rec.images = []; save("coach.players", players);
  }
  return rec;
}

export function addComment(playerId, comment) {
  const players = listPlayers();
  const p = players.find((x) => x.id === playerId);
  if (!p) return null;
  p.comments = [...(p.comments || []), { ...comment, date: new Date().toISOString() }];
  save("coach.players", players);
  return p;
}

export function deletePlayer(id) { save("coach.players", listPlayers().filter((p) => p.id !== id)); }

export function buildFeedback({ player, coachName, general, comments }) {
  return { app: APP, kind: "coach-feedback", v: 1, createdAt: new Date().toISOString(), to: player.name, from: coachName || "Coach", general: general || "", items: comments || [] };
}

// --- Côté joueur : retours reçus -----------------------------------------------------------------------------
export const listFeedback = () => load("feedback", []);
export function importFeedback(fb) {
  const all = listFeedback();
  all.unshift({ ...fb, receivedAt: new Date().toISOString() });
  save("feedback", all.slice(0, 50));
}

// --- Assistant IA : réglages ------------------------------------------------------------------------------------
export const getAI = () => load("ai", { apiKey: "", model: "claude-opus-5-5" });
export const setAI = (s) => save("ai", s);

/** Partage (feuille de partage Android) ou téléchargement du fichier. */
export async function shareOrDownload(obj, filename, title) {
  const blob = new Blob([JSON.stringify(obj)], { type: "application/json" });
  const file = new File([blob], filename, { type: "application/json" });
  // Application Android (Capacitor) : le WebView ne sait pas enregistrer un téléchargement ; on passe par les plugins natifs.
  const cap = window.Capacitor;
  if (cap?.isNativePlatform?.() && cap.Plugins?.Filesystem && cap.Plugins?.Share) {
    try {
      await cap.Plugins.Filesystem.writeFile({ path: filename, data: JSON.stringify(obj), directory: "CACHE", encoding: "utf8" });
      const { uri } = await cap.Plugins.Filesystem.getUri({ path: filename, directory: "CACHE" });
      await cap.Plugins.Share.share({ title, files: [uri] });
      return "shared";
    } catch (e) { if (/cancel/i.test(String(e?.message))) return "cancelled"; }
  }
  if (navigator.canShare && navigator.canShare({ files: [file] })) {
    try { await navigator.share({ files: [file], title }); return "shared"; } catch (e) { if (e.name === "AbortError") return "cancelled"; }
  }
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob); a.download = filename; a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 5000);
  return "downloaded";
}
