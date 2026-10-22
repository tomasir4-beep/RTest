// Estimation de pose sur l'appareil (MediaPipe Pose Landmarker, WebAssembly/WebGL).
// Aucune vidéo n'est envoyée sur un serveur : tout est calculé dans le navigateur.

const VER = "0.10.14";
const CDN = `https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@${VER}`;
const MODELS = {
  full: "https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_full/float16/1/pose_landmarker_full.task",
  heavy: "https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_heavy/float16/1/pose_landmarker_heavy.task",
};

let landmarker = null;
let loadedModel = null;

export async function loadPose(model = "full", onStatus = () => {}) {
  if (landmarker && loadedModel === model) return landmarker;
  onStatus("Chargement du moteur IA (première fois : ~10 Mo)…");
  // Mode hors-ligne : si les fichiers ont été téléchargés (scripts/fetch-offline-assets.ps1), ils sont utilisés en priorité.
  const local = new URL("../vendor/mediapipe/", import.meta.url).href;
  let base = CDN, modelUrl = MODELS[model];
  try {
    const head = await fetch(`${local}pose_landmarker_${model}.task`, { method: "HEAD" });
    if (head.ok && !(head.headers.get("content-type") || "").includes("text/html")) { base = local.replace(/\/$/, ""); modelUrl = `${local}pose_landmarker_${model}.task`; }
  } catch { /* pas de fichiers locaux */ }
  const vision = await import(`${base}/vision_bundle.mjs`);
  const fileset = await vision.FilesetResolver.forVisionTasks(`${base}/wasm`);
  const make = (delegate) => vision.PoseLandmarker.createFromOptions(fileset, {
    baseOptions: { modelAssetPath: modelUrl, delegate },
    runningMode: "IMAGE",
    numPoses: 2,
    minPoseDetectionConfidence: 0.4,
    minPosePresenceConfidence: 0.4,
    minTrackingConfidence: 0.4,
  });
  try { landmarker = await make("GPU"); }
  catch (e) { onStatus("GPU indisponible, passage en mode CPU…"); landmarker = await make("CPU"); }
  loadedModel = model;
  return landmarker;
}

// Choix de la personne : la plus grande à la 1re image, puis la plus proche de la précédente.
function pickPerson(res, prev) {
  if (!res || !res.landmarks || !res.landmarks.length) return null;
  const info = res.landmarks.map((lm, i) => {
    const ys = lm.map((p) => p.y), xs = lm.map((p) => p.x);
    return { i, h: Math.max(...ys) - Math.min(...ys), cx: (Math.max(...xs) + Math.min(...xs)) / 2, cy: (Math.max(...ys) + Math.min(...ys)) / 2 };
  });
  let best = info[0];
  if (!prev) best = info.reduce((a, b) => (b.h > a.h ? b : a));
  else best = info.reduce((a, b) => (Math.hypot(b.cx - prev.cx, b.cy - prev.cy) < Math.hypot(a.cx - prev.cx, a.cy - prev.cy) ? b : a));
  return { lm: res.landmarks[best.i], wl: res.worldLandmarks[best.i], center: best };
}

const seek = (video, t) => new Promise((resolve) => {
  let done = false;
  const fin = () => { if (!done) { done = true; video.removeEventListener("seeked", fin); resolve(); } };
  video.addEventListener("seeked", fin);
  video.currentTime = t;
  setTimeout(fin, 2500);
});

export function openVideo(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const v = document.createElement("video");
    v.muted = true; v.playsInline = true; v.preload = "auto"; v.src = url;
    v.onloadedmetadata = () => resolve({ video: v, url, duration: v.duration, width: v.videoWidth, height: v.videoHeight });
    v.onerror = () => reject(new Error("Impossible de lire cette vidéo (format non pris en charge par le navigateur ?). Essayez MP4/H.264."));
  });
}

// --- Cadre complet (rotation éventuelle) + suivi du joueur par recadrage ------------------------------
// Les joueurs filmés de loin n'occupent que quelques % de l'image : le détecteur les rate. On recadre donc
// autour du joueur suivi (carré ≈ 2,4 × sa hauteur) ; les points sont ramenés en coordonnées du cadre complet.
const FULL_MAX = 1280;

function makeFull(src, rot) {
  const swap = rot === 90 || rot === 270;
  const w0 = swap ? src.height : src.width, h0 = swap ? src.width : src.height;
  const k = Math.min(1, FULL_MAX / Math.max(w0, h0));
  const c = document.createElement("canvas");
  c.width = Math.round(w0 * k); c.height = Math.round(h0 * k);
  return c;
}
function drawFull(src, full, rot) {
  const ctx = full.getContext("2d");
  ctx.save();
  ctx.translate(full.width / 2, full.height / 2);
  ctx.rotate((rot * Math.PI) / 180);
  const swap = rot === 90 || rot === 270;
  const dw = swap ? full.height : full.width, dh = swap ? full.width : full.height;
  ctx.drawImage(src.video, -dw / 2, -dh / 2, dw, dh);
  ctx.restore();
}

// Personnes détectées dans une zone carrée (en px du cadre complet) ; coordonnées renvoyées en px du cadre complet.
function personsIn(full, x0, y0, side, outSide = 480) {
  const s = Math.max(32, Math.round(side));
  const c = document.createElement("canvas"); c.width = c.height = Math.min(outSide, s);
  c.getContext("2d").drawImage(full, x0, y0, s, s, 0, 0, c.width, c.height);
  const res = landmarker.detect(c);
  const out = [];
  (res?.landmarks || []).forEach((lm, i) => {
    const pts = lm.map((p) => ({ x: x0 + p.x * s, y: y0 + p.y * s, z: p.z, visibility: p.visibility }));
    const ys = pts.map((p) => p.y), xs = pts.map((p) => p.x);
    const vis = pts.filter((p) => (p.visibility ?? 1) > 0.5).length;
    out.push({ pts, wl: res.worldLandmarks[i], h: Math.max(...ys) - Math.min(...ys), cx: (Math.max(...xs) + Math.min(...xs)) / 2, cy: (Math.max(...ys) + Math.min(...ys)) / 2, vis });
  });
  return out;
}

// Recherche du joueur sur tout le cadre : image entière + fenêtres carrées glissantes. Retient le plus grand.
function findPlayers(full) {
  const W = full.width, H = full.height, side = Math.min(W, H);
  const found = [];
  const long = Math.max(W, H), nTiles = Math.max(1, Math.ceil((long - side) / (side * 0.5)) + 1);
  for (let i = 0; i < nTiles; i++) {
    const off = nTiles === 1 ? 0 : ((long - side) * i) / (nTiles - 1);
    found.push(...(H >= W ? personsIn(full, 0, off, side) : personsIn(full, off, 0, side)));
  }
  return found;
}

const upright = (p) => {
  const nose = p.pts[0], hip = (p.pts[23].y + p.pts[24].y) / 2, sh = (p.pts[11].y + p.pts[12].y) / 2;
  return nose.y < sh && sh < hip;
};

/** Détecte si la vidéo est à l'envers (0 ou 180°) en testant quelques instants. */
export async function detectRotation(src) {
  const votes = { 0: 0, 180: 0 };
  for (const rot of [0, 180]) {
    const full = makeFull(src, rot);
    for (const f of [0.1, 0.3, 0.5]) {
      await seek(src.video, Math.min(src.duration - 0.1, src.duration * f));
      drawFull(src, full, rot);
      const ps = findPlayers(full).filter((p) => p.h > full.height * 0.03);
      if (!ps.length) continue;
      const best = ps.reduce((a, b) => (b.h > a.h ? b : a));
      if (upright(best)) votes[rot] += 1;
    }
  }
  return votes[180] > votes[0] ? 180 : 0;
}

export async function processVideo(src, { start = 0, end, fps = 20, rot = "auto", onProgress = () => {}, signal, onStatus = () => {} }) {
  const { video } = src;
  if (rot === "auto") { onStatus("Détection de l'orientation de la vidéo…"); rot = await detectRotation(src); if (rot) onStatus("Vidéo à l'envers détectée : remise à l'endroit."); }
  const full = makeFull(src, rot), W = full.width, H = full.height;
  const stop = Math.min(end ?? src.duration, src.duration);
  const step = 1 / fps, total = Math.max(1, Math.floor((stop - start) / step));
  const frames = [];
  let track = null, miss = 0;
  const toLm = (p) => p.pts.map((q) => ({ x: q.x / W, y: q.y / H, z: q.z, visibility: q.visibility }));
  const toWl = (p) => p.wl.map((q) => ({ x: q.x, y: q.y, z: q.z }));
  for (let k = 0; k <= total; k++) {
    if (signal?.aborted) throw new Error("Analyse annulée.");
    const t = start + k * step;
    await seek(video, Math.min(t, stop));
    drawFull(src, full, rot);
    let pick = null;
    if (track) {
      const side = Math.max(224, Math.min(Math.min(W, H), track.h * 2.4));
      const x0 = Math.max(0, Math.min(W - side, track.cx - side / 2)), y0 = Math.max(0, Math.min(H - side, track.cy - side / 2));
      const ps = personsIn(full, x0, y0, side, 512);
      if (ps.length) pick = ps.reduce((a, b) => (Math.hypot(b.cx - track.cx, b.cy - track.cy) < Math.hypot(a.cx - track.cx, a.cy - track.cy) ? b : a));
      if (pick && Math.hypot(pick.cx - track.cx, pick.cy - track.cy) > track.h * 1.5) pick = null; // saut vers un autre joueur
    }
    if (!pick && (!track || miss >= 2)) {
      const ps = findPlayers(full).filter((p) => p.vis >= 8 && p.h > H * 0.03);
      if (ps.length) pick = ps.reduce((a, b) => (b.h > a.h ? b : a));
    }
    if (pick) {
      track = { cx: pick.cx, cy: pick.cy, h: track ? track.h * 0.5 + pick.h * 0.5 : pick.h }; miss = 0;
      frames.push({ t: t - start, lm: toLm(pick), wl: toWl(pick) });
    } else { miss++; if (miss > 6) track = null; frames.push({ t: t - start, lm: null, wl: null }); }
    onProgress(k / total);
  }
  return { frames, aspect: W / H, size: [W, H], offset: start, rot };
}

export async function processImages(files, { maxW = 960, onProgress = () => {} }) {
  const frames = [], bitmaps = [];
  let aspect = 1;
  for (let k = 0; k < files.length; k++) {
    const bmp = await createImageBitmap(files[k]);
    const scale = Math.min(1, maxW / bmp.width);
    const c = document.createElement("canvas");
    c.width = Math.round(bmp.width * scale); c.height = Math.round(bmp.height * scale);
    c.getContext("2d").drawImage(bmp, 0, 0, c.width, c.height);
    aspect = c.width / c.height;
    const res = landmarker.detect(c);
    const p = pickPerson(res, null);
    frames.push({ t: k, lm: p ? p.lm.map((q) => ({ x: q.x, y: q.y, z: q.z, visibility: q.visibility })) : null, wl: p ? p.wl.map((q) => ({ x: q.x, y: q.y, z: q.z })) : null });
    bitmaps.push(c);
    onProgress((k + 1) / files.length);
  }
  return { frames, aspect, canvases: bitmaps };
}

// Image complète (avec rotation éventuelle) à l'instant t.
export async function grabFrame(src, t, rot = 0) {
  const full = makeFull(src, rot);
  await seek(src.video, t);
  drawFull(src, full, rot);
  return full;
}

// Recadre l'image autour du joueur (marge) et recalcule les points : les keyframes restent lisibles même si le joueur est petit.
export function cropToPlayer(canvas, lm, margin = 0.6) {
  if (!lm) return { canvas, lm };
  const W = canvas.width, H = canvas.height;
  const xs = lm.map((p) => p.x * W), ys = lm.map((p) => p.y * H);
  const minX = Math.min(...xs), maxX = Math.max(...xs), minY = Math.min(...ys), maxY = Math.max(...ys);
  const side = Math.max(maxX - minX, maxY - minY) * (1 + margin);
  const x0 = Math.max(0, Math.min(W - side, (minX + maxX) / 2 - side / 2)), y0 = Math.max(0, Math.min(H - side, (minY + maxY) / 2 - side / 2));
  const s = Math.min(side, W, H), out = 520;
  const c = document.createElement("canvas"); c.width = c.height = out;
  c.getContext("2d").drawImage(canvas, x0, y0, s, s, 0, 0, out, out);
  return { canvas: c, lm: lm.map((p) => ({ ...p, x: (p.x * W - x0) / s, y: (p.y * H - y0) / s })) };
}

const BONES = [[11, 12], [11, 13], [13, 15], [12, 14], [14, 16], [11, 23], [12, 24], [23, 24], [23, 25], [25, 27], [24, 26], [26, 28], [27, 31], [28, 32]];

export function drawSkeleton(canvas, lm, { hand = "right", color = "#22d3a6" } = {}) {
  if (!lm) return;
  const ctx = canvas.getContext("2d");
  const W = canvas.width, H = canvas.height;
  const dom = hand === "left" ? [11, 13, 15] : [12, 14, 16];
  ctx.lineWidth = Math.max(2, W / 220);
  ctx.lineCap = "round";
  for (const [a, b] of BONES) {
    const isDom = dom.includes(a) && dom.includes(b);
    ctx.strokeStyle = isDom ? "#ffd23f" : color;
    ctx.beginPath(); ctx.moveTo(lm[a].x * W, lm[a].y * H); ctx.lineTo(lm[b].x * W, lm[b].y * H); ctx.stroke();
  }
  ctx.fillStyle = "#fff";
  for (const i of [0, 11, 12, 13, 14, 15, 16, 23, 24, 25, 26, 27, 28]) {
    ctx.beginPath(); ctx.arc(lm[i].x * W, lm[i].y * H, Math.max(2.5, W / 190), 0, Math.PI * 2); ctx.fill();
  }
}

// Mise en évidence d'un angle (ex. coude) : arc + valeur
export function drawAngleLabel(canvas, lm, a, b, c, text) {
  const ctx = canvas.getContext("2d");
  const W = canvas.width, H = canvas.height;
  const bx = lm[b].x * W, by = lm[b].y * H;
  ctx.font = `bold ${Math.max(12, W / 40)}px system-ui, sans-serif`;
  ctx.fillStyle = "#000a"; ctx.fillRect(bx + 8, by - 22, ctx.measureText(text).width + 10, Math.max(18, W / 32));
  ctx.fillStyle = "#fff"; ctx.fillText(text, bx + 13, by - 6);
}
