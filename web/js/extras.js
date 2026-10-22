// Fonctions d'affichage avancées : images clés, comparaison à un modèle, lecteur ralenti annoté, mesures calibrées.
import { grabFrame, cropToPlayer, drawSkeleton, drawAngleLabel } from "./pose.js";
import { figureSVG, IDEAL } from "./posefig.js";

const S_IDX = (hand) => (hand === "left" ? [11, 13, 15] : [12, 14, 16]);

/** Image d'une phase (load / contact / follow) recadrée sur le joueur, squelette et angles dessinés. */
export async function phaseCanvas(L, src, k, { labels = true } = {}) {
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
  return { canvas: crop.canvas, lm: crop.lm, i };
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
