// Fonctions d'affichage avancées : images clés, comparaison à un modèle, lecteur ralenti annoté, mesures calibrées.
import { grabFrame, cropToPlayer, drawSkeleton, drawAngleLabel } from "./pose.js";
import { figureSVG, IDEAL } from "./posefig.js";
import { METRIC_DEFS } from "./metrics.js";

const S_IDX = (hand) => (hand === "left" ? [11, 13, 15] : [12, 14, 16]);

/** Image d'une phase (load / contact / follow) recadrée sur le joueur, squelette et angles dessinés. */
export async function phaseCanvas(L, src, k, { labels = true, targets = false } = {}) {
  const { res, proc } = L;
  const i = res.phases[k];
  let cv;
  if (L.kind === "video") cv = await grabFrame(src, proc.offset + (L.t0 || 0) + res.frames[i].t, proc.rot || 0);
  else { const s = proc.canvases[i]; cv = document.createElement("canvas"); cv.width = s.width; cv.height = s.height; cv.getContext("2d").drawImage(s, 0, 0); }
  const crop = cropToPlayer(cv, res.frames[i].lm);
  drawSkeleton(crop.canvas, crop.lm, { hand: res.hand });
  if (labels) {
    const S = S_IDX(res.hand);
    if (k === "contact") drawAngleLabel(crop.canvas, crop.lm, S[0], S[1], S[2], `coude ${Math.round(res.series.elbow[i])}°`);
    if (k === "load") drawAngleLabel(crop.canvas, crop.lm, 23, 25, 27, `genoux ${Math.round(res.series.knee[i])}°`);
  }
  if (targets && crop.lm) drawTargets(crop.canvas, L, k, i, crop.lm, crop.map);
  return { canvas: crop.canvas, lm: crop.lm, i };
}

// --- Cibles en pointillés sur l'image de la vidéo ------------------------------------------------------------------------
const TARGET_COLOR = "#8cff9e";
const ATTENTION_COLOR = "#ffb4a8";

const mid2 = (a, b) => ({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 });
const rotate = (v, a) => ({ x: v.x * Math.cos(a) - v.y * Math.sin(a), y: v.x * Math.sin(a) + v.y * Math.cos(a) });
const unit = (v) => { const n = Math.hypot(v.x, v.y) || 1; return { x: v.x / n, y: v.y / n }; };

/** Texte contouré, lisible sur n'importe quel fond. */
function tag(ctx, text, x, y, color, size, align = "left") {
  ctx.font = `bold ${size}px system-ui,sans-serif`; ctx.textAlign = align;
  ctx.lineWidth = 4; ctx.strokeStyle = "#0b3d2e"; ctx.lineJoin = "round"; ctx.strokeText(text, x, y);
  ctx.fillStyle = color; ctx.fillText(text, x, y);
}

function dashed(ctx, x1, y1, x2, y2, color, width, alpha = 1) {
  ctx.save(); ctx.globalAlpha = alpha; ctx.strokeStyle = color; ctx.lineWidth = width; ctx.lineCap = "round"; ctx.setLineDash([width * 2.6, width * 2]);
  ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); ctx.restore();
}

/** Direction (±1) de la frappe dans l'image, d'après le déplacement du poignet autour de l'impact. */
function strokeSign(res, S) {
  const c = res.phases.contact, n = res.frames.length;
  const a = res.frames[Math.max(0, c - 2)].lm[S[2]].x, b = res.frames[Math.min(n - 1, c + 2)].lm[S[2]].x;
  return b >= a ? 1 : -1;
}

/**
 * Dessine, en pointillés verts, la position idéale de chaque articulation ou ligne mesurée sur l'image de la phase.
 * Les mesures déjà conformes sont atténuées ; celles à corriger sont plus marquées et légendées.
 * @param {HTMLCanvasElement} canvas image recadrée (modifiée en place)
 * @param {object} L analyse (res, opts)
 * @param {string} k phase : "load" | "contact" | "follow"
 * @param {number} i indice de l'image dans res.frames
 * @param {object[]} lm points recadrés (coordonnées normalisées du canvas)
 * @param {function} mapPt convertit un point de l'image complète vers le canvas recadré
 */
function drawTargets(canvas, L, k, i, lm, mapPt) {
  const { res } = L, stroke = L.opts?.stroke, defs = METRIC_DEFS[stroke] || [];
  const ctx = canvas.getContext("2d"), W = canvas.width, H = canvas.height;
  const px = (j) => ({ x: lm[j].x * W, y: lm[j].y * H });
  const S = S_IDX(res.hand), O = res.hand === "left" ? [12, 14, 16] : [11, 13, 15];
  const hip = mid2(px(23), px(24)), sh = mid2(px(11), px(12));
  const torso = Math.hypot(sh.x - hip.x, sh.y - hip.y) || 1;
  const lw = Math.max(3, W / 150), fs = Math.max(20, W / 21);
  const st = Object.fromEntries(res.metrics.map((m) => [m.id, m.status]));
  const def = (id) => defs.find((d) => d.id === id);
  const alphaOf = (id) => (st[id] === "ok" ? 0.55 : 1);
  const colorOf = (id) => (st[id] === "ok" ? TARGET_COLOR : TARGET_COLOR);
  const overhead = stroke === "serve" || stroke === "smash";
  const sign = strokeSign(res, S);

  // Angle cible à une articulation : on prolonge le segment proximal et on fait tourner le distal à l'angle voulu
  const idealLimb = (rootIdx, jointIdx, endIdx, targetDeg, id, text, noLabel = false) => {
    const root = px(rootIdx), joint = px(jointIdx), end = px(endIdx);
    const u = unit({ x: root.x - joint.x, y: root.y - joint.y }), len = Math.hypot(end.x - joint.x, end.y - joint.y);
    const actual = unit({ x: end.x - joint.x, y: end.y - joint.y });
    const cands = [rotate(u, (targetDeg * Math.PI) / 180), rotate(u, (-targetDeg * Math.PI) / 180)];
    const v = cands.reduce((a, b) => (a.x * actual.x + a.y * actual.y >= b.x * actual.x + b.y * actual.y ? a : b));
    const e = { x: joint.x + v.x * len, y: joint.y + v.y * len };
    dashed(ctx, joint.x, joint.y, e.x, e.y, colorOf(id), lw * 1.4, alphaOf(id));
    ctx.save(); ctx.globalAlpha = alphaOf(id); ctx.fillStyle = TARGET_COLOR; ctx.beginPath(); ctx.arc(e.x, e.y, lw * 1.8, 0, 7); ctx.fill(); ctx.restore();
    if (!noLabel) tag(ctx, text, e.x + (v.x >= 0 ? 8 : -8), e.y + (v.y >= 0 ? fs : -4), TARGET_COLOR, fs, v.x >= 0 ? "left" : "right");
  };
  const target = (d, fallback) => { const [a, b] = d.ok; return Math.max(a, Math.min(b > 180 ? 180 : b, fallback ?? (a + Math.min(b, 180)) / 2)); };

  if (k === "load") {
    const d = def("knee_load");
    if (d) { const t = Math.round(target(d)); idealLimb(23, 25, 27, t, "knee_load", `genou ≈${t}°`); idealLimb(24, 26, 28, t, "knee_load", "", true); }
    if (overhead) {
      const e = def("elbow_trophy");
      if (e) { const y = px(S[0]).y; dashed(ctx, 6, y, W - 6, y, TARGET_COLOR, lw, alphaOf("elbow_trophy")); tag(ctx, "coude ≥ épaules", W - 8, y - 6, TARGET_COLOR, fs * 0.9, "right"); }
      const t = def("toss_arm");
      if (t) { const y = px(O[0]).y - t.ok[0] * torso; dashed(ctx, 6, y, W - 6, y, TARGET_COLOR, lw, alphaOf("toss_arm")); tag(ctx, "bras libre haut", W - 8, y - 6, TARGET_COLOR, fs * 0.9, "right"); }
    }
  }

  if (k === "contact") {
    const e = def("elbow_contact");
    if (e) { const t = Math.round(target(e)); idealLimb(S[0], S[1], S[2], t, "elbow_contact", `coude ≈${t}°`); }
    const ch = def("contact_height");
    if (ch) {
      const ank = Math.max(px(27).y, px(28).y), nose = px(0).y, y = ank - ch.ok[0] * (ank - nose);
      dashed(ctx, 6, y, W - 6, y, TARGET_COLOR, lw * 1.3, alphaOf("contact_height"));
      tag(ctx, "contact : hauteur cible", 8, y - 6, TARGET_COLOR, fs * 0.9, "left");
      const w = px(S[2]);
      if (w.y > y + 4) { // flèche du poignet vers la hauteur cible
        ctx.save(); ctx.strokeStyle = ATTENTION_COLOR; ctx.fillStyle = ATTENTION_COLOR; ctx.lineWidth = lw; ctx.beginPath(); ctx.moveTo(w.x + 14, w.y); ctx.lineTo(w.x + 14, y + 6); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(w.x + 14, y); ctx.lineTo(w.x + 8, y + 12); ctx.lineTo(w.x + 20, y + 12); ctx.fill(); ctx.restore();
      }
    }
    const cf = def("contact_front");
    if (cf) {
      const x0 = hip.x, x1 = hip.x + sign * cf.ok[0] * torso, w = px(S[2]);
      dashed(ctx, x0, hip.y - torso * 1.2, x0, hip.y + torso * 0.9, "#ffffff", lw, 0.7);
      dashed(ctx, x1, w.y - torso * 0.5, x1, w.y + torso * 0.5, TARGET_COLOR, lw * 1.4, alphaOf("contact_front"));
      tag(ctx, "contact ≥ ici", x1 + (sign > 0 ? 6 : -6), w.y - torso * 0.55, TARGET_COLOR, fs * 0.9, sign > 0 ? "left" : "right");
    }
    const tl = def("trunk_lean");
    if (tl) {
      const lim = (tl.ok[1] * Math.PI) / 180, side = Math.sign(sh.x - hip.x) || 1, len = torso * 1.15;
      dashed(ctx, hip.x, hip.y, hip.x, hip.y - len, "#ffffff", lw, 0.7);
      dashed(ctx, hip.x, hip.y, hip.x + side * Math.sin(lim) * len, hip.y - Math.cos(lim) * len, TARGET_COLOR, lw * 1.3, alphaOf("trunk_lean"));
      tag(ctx, `tronc ≤ ${tl.ok[1]}°`, hip.x + side * (Math.sin(lim) * len + 8), hip.y - Math.cos(lim) * len, TARGET_COLOR, fs * 0.9, side > 0 ? "left" : "right");
    }
    const hd = def("head_stability");
    if (hd && res.frames.length > 4) { // zone de stabilité de la tête + trajet réel
      const c = res.phases.contact, slow = res.slow || 1, tc = res.frames[c].t;
      const idx = res.frames.map((f, j) => j).filter((j) => Math.abs(res.frames[j].t - tc) <= 0.15 * slow);
      if (idx.length > 1) {
        const pts = idx.map((j) => mapPt(res.frames[j].lm[0])), p0 = { x: pts[0].x * W, y: pts[0].y * H };
        ctx.save(); ctx.globalAlpha = alphaOf("head_stability"); ctx.strokeStyle = TARGET_COLOR; ctx.lineWidth = lw; ctx.setLineDash([lw * 2.6, lw * 2]);
        ctx.beginPath(); ctx.arc(p0.x, p0.y, hd.ok[1] * torso, 0, Math.PI * 2); ctx.stroke(); ctx.setLineDash([]);
        ctx.strokeStyle = "#ffd23f"; ctx.lineWidth = lw; ctx.beginPath(); pts.forEach((p, n) => (n ? ctx.lineTo(p.x * W, p.y * H) : ctx.moveTo(p.x * W, p.y * H))); ctx.stroke(); ctx.restore();
        tag(ctx, "tête dans le cercle", p0.x, p0.y - hd.ok[1] * torso - 6, TARGET_COLOR, fs * 0.85, "center");
      }
    }
    const wp = def("wrist_path");
    if (wp && res.frames.length > 4) { // trajet réel du poignet et direction cible
      const c = res.phases.contact, slow = res.slow || 1, tc = res.frames[c].t;
      const idx = res.frames.map((f, j) => j).filter((j) => res.frames[j].t >= tc - 0.25 * slow && res.frames[j].t <= tc);
      const pts = idx.map((j) => mapPt(res.frames[j].lm[S[2]]));
      if (pts.length > 1) {
        ctx.save(); ctx.strokeStyle = "#ffd23f"; ctx.lineWidth = lw * 1.2; ctx.beginPath(); pts.forEach((p, n) => (n ? ctx.lineTo(p.x * W, p.y * H) : ctx.moveTo(p.x * W, p.y * H))); ctx.stroke(); ctx.restore();
        const p0 = { x: pts[0].x * W, y: pts[0].y * H }, dir = wp.ok[0] < 0 ? -1 : 1, len = Math.max(0.35, Math.abs(wp.ok[0]) * 1.6) * torso;
        dashed(ctx, p0.x, p0.y, p0.x + sign * torso * 0.2, p0.y + dir * len, TARGET_COLOR, lw * 1.5, alphaOf("wrist_path"));
        tag(ctx, dir > 0 ? "le poignet doit descendre" : "le poignet doit monter", p0.x + sign * torso * 0.2 + 8, p0.y + dir * len, TARGET_COLOR, fs * 0.85, "left");
      }
    }
  }

  if (k === "follow") {
    const fh = def("follow_high");
    if (fh) { const y = sh.y - fh.ok[0] * torso; dashed(ctx, 6, y, W - 6, y, TARGET_COLOR, lw * 1.3, alphaOf("follow_high")); tag(ctx, "finition ≥ ici", W - 8, y - 6, TARGET_COLOR, fs * 0.9, "right"); }
  }
}

const PHASES = {
  serve: [["load", "serve_trophy", "Position trophée"], ["contact", "serve_contact", "Contact"]],
  volley: [["load", "volley_prep", "Préparation"], ["contact", "volley_contact", "Contact"]],
  ground: [["load", "ground_load", "Chargement"], ["contact", "ground_contact", "Contact"]],
  slice: [["load", "slice_prep", "Armé"], ["contact", "slice_contact", "Contact"]],
  dropshot: [["load", "slice_prep", "Préparation"], ["contact", "drop_contact", "Contact"]],
  smash: [["load", "smash_trophy", "Armé"], ["contact", "smash_contact", "Contact"]],
  lob: [["load", "lob_load", "Préparation"], ["contact", "lob_finish", "Finition"]],
  return: [["load", "return_prep", "Préparation"], ["contact", "ground_contact", "Contact"]],
};

/** Comparaison côte à côte : joueur vs figure de référence (modèle pédagogique), phase par phase. */
export async function renderCompare(L, src, host, stroke) {
  const key = PHASES[stroke] ? stroke : "ground";
  host.innerHTML = "";
  for (const [k, ideal, name] of PHASES[key]) {
    const { canvas, lm } = await phaseCanvas(L, src, k);
    // sens de jeu du joueur : poignet à gauche des hanches -> miroir de la figure
    const S = S_IDX(L.res.hand);
    const faceLeft = lm && lm[S[2]].x < (lm[23].x + lm[24].x) / 2;
    const row = document.createElement("div");
    row.className = "cmp-row";
    const a = document.createElement("figure"); a.append(canvas); a.insertAdjacentHTML("beforeend", `<figcaption>Vous — ${name}</figcaption>`);
    const b = document.createElement("figure"); b.className = faceLeft ? "flip" : ""; b.innerHTML = figureSVG(ideal) + `<figcaption>Modèle de référence — ${name}</figcaption>`;
    row.append(a, b); host.append(row);
  }
}

/** Comparaison à une vidéo de référence analysée (autre joueur, ex. un modèle choisi par le coach). */
export async function renderRefCompare(L, src, R, refSrc, host, topUser, topRef) {
  host.innerHTML = "";
  for (const [k, name] of [["load", "Chargement / trophée"], ["contact", "Contact"], ["follow", "Fin de geste"]]) {
    const [u, r] = await Promise.all([phaseCanvas(L, src, k), phaseCanvas(R, refSrc, k)]);
    const row = document.createElement("div"); row.className = "cmp-row";
    const a = document.createElement("figure"); a.append(u.canvas); a.insertAdjacentHTML("beforeend", `<figcaption>Vous — ${name}</figcaption>`);
    const b = document.createElement("figure"); b.append(r.canvas); b.insertAdjacentHTML("beforeend", `<figcaption>Référence — ${name}</figcaption>`);
    row.append(a, b); host.append(row);
  }
  const fmt = (v, unit) => (v == null ? "—" : `${unit === "°" ? Math.round(v) : v.toFixed(2)}${unit === "°" ? "°" : ""}`);
  const rows = topUser.metrics.map((m) => {
    const r = topRef.metrics.find((x) => x.id === m.id);
    const d = m.value != null && r?.value != null ? m.value - r.value : null;
    return `<tr><td>${m.label}</td><td><b>${fmt(m.value, m.unit)}</b></td><td>${fmt(r?.value, m.unit)}</td><td>${d == null ? "—" : (d > 0 ? "+" : "") + fmt(d, m.unit)}</td></tr>`;
  }).join("");
  host.insertAdjacentHTML("beforeend", `<table><thead><tr><th>Critère</th><th>Vous</th><th>Référence</th><th>Écart</th></tr></thead><tbody>${rows}</tbody></table>
  <p class="muted small">Une référence n'est pas une norme : morphologie et style diffèrent. Cherchez les grandes tendances (ex. flexion, hauteur de contact), pas l'égalité des valeurs.</p>`);
}

/** Mesures converties en unités réelles grâce à la taille du joueur (estimations). */
export function calibratedHTML(L, heightCm, stroke) {
  const H = (+heightCm || 0) / 100;
  if (!H) return `<p class="muted small">Renseignez la taille du joueur (champ « Taille » avant l'analyse, ou onglet Coach › Profil) pour obtenir des valeurs en mètres et en m/s.</p>`;
  const top = L.agg || L.res;
  const slow = L.opts?.slow || L.res.slow || 1;
  const speeds = (L.reps ? L.reps.map((r) => r.res.contactSpeed) : [L.res.contactSpeed]).filter((v) => v != null && !Number.isNaN(v)).sort((a, b) => a - b);
  const sp = speeds.length ? speeds[Math.floor(speeds.length / 2)] : null;
  const torso = 0.3 * H; // distance bassin → épaules ≈ 0,30 × taille
  const items = [];
  const ratio = top.values?.contact_height;
  if (stroke === "serve" && ratio != null && !Number.isNaN(ratio)) {
    const above = ratio * 0.89 * H;
    items.push(`Poignet frappeur au contact : <b>≈ ${above.toFixed(2)} m au-dessus de la cheville</b> (≈ ${(above / H).toFixed(2)} × votre taille, hors hauteur de saut).`);
  }
  if (sp != null) {
    const ms = sp * torso * slow;
    items.push(`Vitesse du poignet à l'impact : <b>≈ ${ms.toFixed(1)} m/s</b> (≈ ${(ms * 3.6).toFixed(0)} km/h). La tête de raquette va nettement plus vite ; cette valeur sert à suivre vos progrès, pas à comparer des joueurs.${slow > 1 ? ` (corrigé de la cadence ralentie ×${slow})` : ""}`);
  }
  return `<ul class="clean">${items.map((i) => `<li>${i}</li>`).join("")}</ul><p class="muted small">Calibration : taille ${Math.round(H * 100)} cm, buste ≈ ${Math.round(torso * 100)} cm. Incertitude typique ± 15 %.</p>`;
}

/** Lecteur image par image, ralenti, avec squelette, angles en direct, trace du poignet et phase. */
export function mountSlowmo(host, L, src) {
  const { res, proc } = L;
  const fr = res.frames, n = fr.length;
  if (L.kind !== "video" || !src) { host.innerHTML = `<p class="muted">Le lecteur ralenti nécessite une vidéo.</p>`; return () => {}; }
  // cadre fixe (union des positions) pour éviter l'effet de « zoom » pendant la lecture
  let minX = 1, maxX = 0, minY = 1, maxY = 0;
  for (const f of fr) for (const p of f.lm) { minX = Math.min(minX, p.x); maxX = Math.max(maxX, p.x); minY = Math.min(minY, p.y); maxY = Math.max(maxY, p.y); }
  const full = { w: proc.size[0], h: proc.size[1] };
  const side = Math.min(Math.max((maxX - minX) * full.w, (maxY - minY) * full.h) * 1.25, full.w, full.h);
  const cx = ((minX + maxX) / 2) * full.w, cy = ((minY + maxY) / 2) * full.h;
  const x0 = Math.max(0, Math.min(full.w - side, cx - side / 2)), y0 = Math.max(0, Math.min(full.h - side, cy - side / 2));
  host.innerHTML = `<div class="slowmo"><canvas width="560" height="560"></canvas>
    <div class="row"><button class="btn" data-a="play">▶ Lecture</button><button class="btn secondary" data-a="prev">◀ Image</button><button class="btn secondary" data-a="next">Image ▶</button>
    <label class="small">Vitesse <select data-a="speed"><option value="0.1">× 0,1</option><option value="0.25" selected>× 0,25</option><option value="0.5">× 0,5</option><option value="1">× 1</option></select></label></div>
    <input type="range" min="0" max="${n - 1}" value="${res.phases.load}" data-a="seek" style="width:100%"></div>`;
  const cvs = host.querySelector("canvas"), ctx = cvs.getContext("2d");
  const seek = host.querySelector('[data-a="seek"]'), speedSel = host.querySelector('[data-a="speed"]'), playBtn = host.querySelector('[data-a="play"]');
  const S = S_IDX(res.hand);
  const dt = n > 1 ? (fr[n - 1].t - fr[0].t) / (n - 1) : 0.066;
  let i = res.phases.load, playing = false, busy = false, alive = true;
  const phaseName = (k) => (k < res.phases.load ? "Préparation" : k < res.phases.contact ? "Chargement → impact" : k === res.phases.contact ? "CONTACT" : "Fin de geste");
  async function draw(k) {
    if (busy) return; busy = true;
    try {
      const full = await grabFrame(src, proc.offset + (L.t0 || 0) + fr[k].t, proc.rot || 0);
      ctx.drawImage(full, x0, y0, side, side, 0, 0, cvs.width, cvs.height);
      const m = (p) => ({ x: ((p.x * full.width - x0) / side) * cvs.width, y: ((p.y * full.height - y0) / side) * cvs.height });
      // trace du poignet depuis le chargement
      ctx.strokeStyle = "#ffd23f"; ctx.lineWidth = 3; ctx.beginPath();
      let first = true;
      for (let j = Math.max(0, res.phases.load - 2); j <= k; j++) { const p = m(fr[j].lm[S[2]]); first ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y); first = false; }
      ctx.stroke();
      // squelette
      const pts = fr[k].lm.map((p) => ({ ...p, ...(() => { const q = m(p); return { x: q.x / cvs.width, y: q.y / cvs.height }; })() }));
      drawSkeleton(cvs, pts, { hand: res.hand });
      // HUD
      ctx.fillStyle = "#000a"; ctx.fillRect(0, 0, cvs.width, 54);
      ctx.fillStyle = k === res.phases.contact ? "#ffd23f" : "#fff"; ctx.font = "bold 20px system-ui,sans-serif";
      ctx.fillText(phaseName(k), 10, 22);
      ctx.fillStyle = "#fff"; ctx.font = "15px system-ui,sans-serif";
      ctx.fillText(`Genoux ${Math.round(res.series.knee[k])}°   Coude ${Math.round(res.series.elbow[k])}°   Tronc ${Math.round(res.series.trunk[k])}°`, 10, 44);
      seek.value = k;
    } finally { busy = false; }
  }
  async function loop() {
    while (playing && alive) {
      const t0 = performance.now();
      await draw(i);
      i = i >= n - 1 ? 0 : i + 1;
      const wait = Math.max(0, (dt / +speedSel.value) * 1000 - (performance.now() - t0));
      await new Promise((r) => setTimeout(r, wait));
    }
  }
  host.addEventListener("click", (e) => {
    const a = e.target.closest("[data-a]")?.dataset.a;
    if (a === "play") { playing = !playing; playBtn.textContent = playing ? "⏸ Pause" : "▶ Lecture"; if (playing) loop(); }
    if (a === "prev") { playing = false; playBtn.textContent = "▶ Lecture"; i = Math.max(0, i - 1); draw(i); }
    if (a === "next") { playing = false; playBtn.textContent = "▶ Lecture"; i = Math.min(n - 1, i + 1); draw(i); }
  });
  seek.addEventListener("input", () => { playing = false; playBtn.textContent = "▶ Lecture"; i = +seek.value; draw(i); });
  draw(i);
  return () => { alive = false; playing = false; };
}
