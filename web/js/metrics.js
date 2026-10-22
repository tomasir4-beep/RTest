// Calcul des métriques biomécaniques à partir des points de pose (MediaPipe, 33 points).
// frames[i] = { t (s), lm: [{x,y,z,visibility}] image normalisée | null, wl: [{x,y,z}] monde en m | null }

export const LM = { nose: 0, lSh: 11, rSh: 12, lEl: 13, rEl: 14, lWr: 15, rWr: 16, lHip: 23, rHip: 24, lKn: 25, rKn: 26, lAn: 27, rAn: 28 };

const D2R = Math.PI / 180;
const deg = (r) => r / D2R;
const sub = (a, b) => ({ x: a.x - b.x, y: a.y - b.y, z: (a.z || 0) - (b.z || 0) });
const dot = (a, b) => a.x * b.x + a.y * b.y + a.z * b.z;
const norm = (a) => Math.hypot(a.x, a.y, a.z);
const mid = (a, b) => ({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2, z: ((a.z || 0) + (b.z || 0)) / 2 });
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

export function angle3(a, b, c) {
  const u = sub(a, b), v = sub(c, b);
  const n = norm(u) * norm(v);
  if (!n) return NaN;
  return deg(Math.acos(clamp(dot(u, v) / n, -1, 1)));
}

// --- Pré-traitement : comblement des trous + lissage -----------------------------------
function cloneFrames(frames) {
  return frames.map((f) => ({ t: f.t, lm: f.lm ? f.lm.map((p) => ({ ...p })) : null, wl: f.wl ? f.wl.map((p) => ({ ...p })) : null }));
}

function fillGaps(fr, key) {
  const n = fr.length;
  let last = -1;
  for (let i = 0; i < n; i++) {
    if (fr[i][key]) {
      if (last >= 0 && i - last > 1) {
        for (let k = last + 1; k < i; k++) {
          const a = (k - last) / (i - last);
          fr[k][key] = fr[last][key].map((p, j) => lerpPt(p, fr[i][key][j], a));
        }
      }
      last = i;
    }
  }
  // extrémités : recopie
  const first = fr.findIndex((f) => f[key]);
  if (first > 0) for (let k = 0; k < first; k++) fr[k][key] = fr[first][key].map((p) => ({ ...p }));
  for (let k = last + 1; k < n && last >= 0; k++) fr[k][key] = fr[last][key].map((p) => ({ ...p }));
}
const lerpPt = (p, q, a) => ({ x: p.x + (q.x - p.x) * a, y: p.y + (q.y - p.y) * a, z: (p.z || 0) + ((q.z || 0) - (p.z || 0)) * a, visibility: Math.min(p.visibility ?? 1, q.visibility ?? 1) });

function smooth(fr, key, half) {
  const n = fr.length;
  const src = fr.map((f) => f[key]);
  for (let i = 0; i < n; i++) {
    const lo = Math.max(0, i - half), hi = Math.min(n - 1, i + half);
    fr[i][key] = src[i].map((p, j) => {
      let sx = 0, sy = 0, sz = 0, c = 0;
      for (let k = lo; k <= hi; k++) { const q = src[k][j]; sx += q.x; sy += q.y; sz += q.z || 0; c++; }
      return { x: sx / c, y: sy / c, z: sz / c, visibility: p.visibility };
    });
  }
}

export function prepare(frames) {
  const fr = cloneFrames(frames);
  const have = fr.filter((f) => f.lm && f.wl).length;
  for (const f of fr) if (!f.lm || !f.wl) { f.lm = null; f.wl = null; }
  if (have < 3) return { frames: fr, detRate: have / Math.max(1, fr.length), ok: false };
  fillGaps(fr, "lm"); fillGaps(fr, "wl");
  const half = fr.length > 40 ? 2 : 1;
  smooth(fr, "lm", half); smooth(fr, "wl", half);
  return { frames: fr, detRate: have / fr.length, ok: true };
}

// --- Séries -------------------------------------------------------------------------------
function sides(hand) {
  return hand === "left"
    ? { sh: LM.lSh, el: LM.lEl, wr: LM.lWr, osh: LM.rSh, oel: LM.rEl, owr: LM.rWr }
    : { sh: LM.rSh, el: LM.rEl, wr: LM.rWr, osh: LM.lSh, oel: LM.lEl, owr: LM.lWr };
}

function torsoImg(fr, aspect) {
  const v = fr.map((f) => {
    const s = mid(f.lm[LM.lSh], f.lm[LM.rSh]), h = mid(f.lm[LM.lHip], f.lm[LM.rHip]);
    return Math.hypot((s.x - h.x) * aspect, s.y - h.y);
  }).sort((a, b) => a - b);
  return v[Math.floor(v.length / 2)] || 0.2;
}

function wristSpeed(fr, idx, aspect, torso) {
  const s = new Array(fr.length).fill(0);
  for (let i = 1; i < fr.length - 1; i++) {
    const dt = fr[i + 1].t - fr[i - 1].t || 1e-3;
    const a = fr[i + 1].lm[idx], b = fr[i - 1].lm[idx];
    s[i] = Math.hypot((a.x - b.x) * aspect, a.y - b.y) / torso / dt;
  }
  return s;
}

const argmax = (arr, lo = 0, hi = arr.length - 1) => {
  let bi = lo, bv = -Infinity;
  for (let i = lo; i <= hi; i++) if (arr[i] > bv) { bv = arr[i]; bi = i; }
  return bi;
};
const argmin = (arr, lo, hi) => {
  let bi = lo, bv = Infinity;
  for (let i = lo; i <= hi; i++) if (arr[i] < bv) { bv = arr[i]; bi = i; }
  return bi;
};

function idxAt(fr, t, from = 0) {
  let best = from, bd = Infinity;
  for (let i = 0; i < fr.length; i++) { const d = Math.abs(fr[i].t - t); if (d < bd) { bd = d; best = i; } }
  return best;
}

const kneeAvg = (f) => {
  const a = angle3(f.wl[LM.lHip], f.wl[LM.lKn], f.wl[LM.lAn]);
  const b = angle3(f.wl[LM.rHip], f.wl[LM.rKn], f.wl[LM.rAn]);
  return (a + b) / 2;
};
const yaw = (f, a, b) => deg(Math.atan2(f.wl[b].z - f.wl[a].z, f.wl[b].x - f.wl[a].x));
function unwrap(arr) {
  const o = [arr[0]];
  for (let i = 1; i < arr.length; i++) {
    let d = arr[i] - arr[i - 1];
    while (d > 180) d -= 360;
    while (d < -180) d += 360;
    o.push(o[i - 1] + d);
  }
  return o;
}
const wrapDiff = (d) => { while (d > 180) d -= 360; while (d < -180) d += 360; return d; };
const torsoWorld = (f) => norm(sub(mid(f.wl[LM.lSh], f.wl[LM.rSh]), mid(f.wl[LM.lHip], f.wl[LM.rHip]))) || 0.45;

// --- Définition des métriques par geste -------------------------------------------------
const GROUND = (opts = {}) => [
  { id: "knee_load", label: "Flexion des jambes au chargement", unit: "°", ok: [110, 160], warn: [100, 168], high: "g_knee_stiff", w: 1.5, tip: "180° = jambes tendues" },
  { id: "shoulder_turn", label: "Rotation des épaules (préparation)", unit: "°", ok: [45, 400], warn: [28, 400], low: "g_turn_small", w: 1.5, video: true, tip: "amplitude de rotation du buste" },
  { id: "separation", label: "Dissociation bassin–épaules (max)", unit: "°", ok: [15, 120], warn: [8, 120], low: "g_sep_low", w: 1, tip: "écart de rotation épaules / bassin" },
  { id: "contact_front", label: "Point de contact devant le corps", unit: "× buste", ok: [0.25, 5], warn: [0.05, 5], low: "g_contact_behind", w: 2, video: true, tip: "distance poignet–hanches dans l'axe du coup" },
  opts.skipElbow ? null : { id: "elbow_contact", label: "Angle du coude au contact", unit: "°", ok: [opts.elbowMin || 135, 181], warn: [110, 181], low: "g_arm_cramped", w: 1, tip: "180° = bras tendu" },
  { id: "head_stability", label: "Stabilité de la tête (± 0,15 s)", unit: "× buste", ok: [0, 0.25], warn: [0, 0.45], high: "g_head_moves", w: 1, video: true, tip: "déplacement de la tête autour de l'impact" },
  { id: "trunk_lean", label: "Inclinaison du tronc au contact", unit: "°", ok: [0, 22], warn: [0, 32], high: "g_lean", w: 1, tip: "0° = tronc vertical" },
].filter(Boolean);

export const METRIC_DEFS = {
  serve: [
    { id: "knee_load", label: "Flexion des jambes (position trophée)", unit: "°", ok: [105, 150], warn: [95, 160], high: "s_knee_stiff", w: 2, tip: "180° = jambes tendues" },
    { id: "elbow_trophy", label: "Hauteur du coude / épaule (trophée)", unit: "× buste", ok: [-0.1, 3], warn: [-0.3, 3], low: "s_elbow_low", w: 1, tip: "≥ 0 : coude au niveau des épaules" },
    { id: "toss_arm", label: "Bras lanceur haut (trophée)", unit: "× buste", ok: [0.2, 5], warn: [-0.1, 5], low: "s_toss_arm", w: 1, tip: "poignet lanceur au-dessus de l'épaule" },
    { id: "separation", label: "Dissociation bassin–épaules (max)", unit: "°", ok: [20, 140], warn: [10, 140], low: "s_sep_low", w: 1, tip: "écart de rotation épaules / bassin" },
    { id: "elbow_contact", label: "Angle du coude au contact", unit: "°", ok: [165, 181], warn: [150, 181], low: "s_elbow_bent", w: 2, tip: "180° = bras tendu" },
    { id: "contact_height", label: "Hauteur du point de contact", unit: "× (cheville→nez)", ok: [1.15, 4], warn: [1.05, 4], low: "s_contact_low", w: 2, tip: "poignet frappeur relatif à la taille" },
  ],
  forehand: GROUND(),
  backhand1: GROUND({ elbowMin: 145 }),
  backhand2: GROUND({ skipElbow: true }),
  volley: [
    { id: "backswing", label: "Amplitude de la préparation", unit: "× buste", ok: [0, 0.7], warn: [0, 1.1], high: "v_swing_big", w: 2, video: true, tip: "recul du poignet avant l'impact" },
    { id: "contact_front", label: "Point de contact devant le corps", unit: "× buste", ok: [0.25, 5], warn: [0.05, 5], low: "v_contact_behind", w: 2, video: true, tip: "distance poignet–hanches dans l'axe du coup" },
    { id: "knee_load", label: "Flexion des jambes", unit: "°", ok: [115, 168], warn: [105, 175], high: "v_knee_stiff", w: 1, tip: "180° = jambes tendues" },
  ],
};

// --- Analyse principale ----------------------------------------------------------------------
/**
 * @param {Array} rawFrames
 * @param {{stroke:string, hand:'right'|'left', aspect:number, timed:boolean, contactIdx?:number, loadIdx?:number, followIdx?:number}} o
 */
export function analyze(rawFrames, o) {
  const prep = prepare(rawFrames);
  if (!prep.ok) return { error: "Silhouette non détectée (moins de 3 images exploitables). Filmez le joueur entier, bien éclairé.", detRate: prep.detRate };
  const fr = prep.frames, n = fr.length;
  const aspect = o.aspect || 16 / 9;
  const notes = [];
  let hand = o.hand;
  let S = sides(hand);
  const torso = torsoImg(fr, aspect);

  // Bras frappeur : bascule automatique si l'autre poignet est nettement plus rapide.
  let spd = wristSpeed(fr, S.wr, aspect, torso);
  if (o.timed && o.stroke !== "backhand2") {
    const sOther = wristSpeed(fr, sides(hand === "left" ? "right" : "left").wr, aspect, torso);
    const mA = Math.max(...spd), mB = Math.max(...sOther);
    if (mB > mA * 1.6) {
      hand = hand === "left" ? "right" : "left"; S = sides(hand); spd = sOther;
      notes.push(`Bras frappeur détecté : ${hand === "left" ? "gauche" : "droit"} (différent de votre réglage ; vidéo en miroir ?).`);
    }
  }
  if (o.stroke === "backhand2" && o.timed) {
    const sOther = wristSpeed(fr, sides(hand === "left" ? "right" : "left").wr, aspect, torso);
    spd = spd.map((v, i) => Math.max(v, sOther[i]));
  }

  // Phase : contact (impact), chargement, fin de geste
  let c = o.contactIdx;
  if (c == null) {
    if (o.timed) {
      if (o.stroke === "serve") {
        const cand = [];
        for (let i = 0; i < n; i++) if (fr[i].lm[S.wr].y < fr[i].lm[LM.nose].y) cand.push(i);
        c = cand.length ? cand.reduce((b, i) => (spd[i] > spd[b] ? i : b), cand[0]) : argmax(spd);
      } else c = argmax(spd);
    } else c = o.stroke === "serve" ? argmin(fr.map((f) => f.lm[S.wr].y), 0, n - 1) : Math.floor(n / 2);
  }
  // Cadence de la vidéo : 1 = temps réel ; > 1 = ralenti (les durées de référence sont multipliées).
  const slow = o.slow || 1;
  const winLo = (sec) => (o.timed ? idxAt(fr, fr[c].t - sec * slow) : Math.max(0, c - 1));
  const kneeSeries = fr.map(kneeAvg);
  let l = o.loadIdx;
  if (l == null) {
    if (o.timed && o.stroke === "serve") {
      // Service : chargement = point le plus bas du bassin avant l'impact (remontée monotone jusqu'au contact),
      // indépendant de la cadence de la vidéo (temps réel ou ralenti).
      const hy = fr.map((ff) => (ff.lm[LM.lHip].y + ff.lm[LM.rHip].y) / 2);
      const hs = hy.map((_, i) => { let s = 0, k = 0; for (let j = Math.max(0, i - 2); j <= Math.min(n - 1, i + 2); j++) { s += hy[j]; k++; } return s / k; });
      const lo = winLo(1.8), hi = Math.max(lo, c - 2);
      l = argmax(hs, lo, hi);
    } else if (o.timed) {
      const lo = winLo(o.stroke === "volley" ? 0.6 : 1.0);
      const hi = Math.max(lo, idxAt(fr, fr[c].t - 0.05 * slow));
      // Volée : flexion maximale ; coups de fond : rotation d'épaules maximale (chargement)
      l = o.stroke === "volley" ? argmin(kneeSeries, lo, hi) : argmax(shoulderYawAbs(fr), lo, hi);
      if (l > c) l = Math.max(0, c - 1);
    } else l = Math.max(0, c - 1);
  }
  const f = o.followIdx ?? (o.timed ? idxAt(fr, fr[c].t + 0.3 * slow) : Math.min(n - 1, c + 1));

  // Direction du coup (horizontale, monde) pour mesurer « devant le corps »
  let dir = null;
  if (o.timed && c >= 2 && c < n - 2) {
    const a = fr[Math.min(n - 1, c + 2)].wl[S.wr], b = fr[Math.max(0, c - 2)].wl[S.wr];
    const v = { x: a.x - b.x, y: 0, z: a.z - b.z };
    const m = norm(v);
    if (m > 0.02) dir = { x: v.x / m, y: 0, z: v.z / m };
  }
  const tw = torsoWorld(fr[c]);
  const fc = fr[c], fl = fr[l];
  const wlSh = (ff, i) => ff.wl[i];

  const shYaw = unwrap(fr.map((ff) => yaw(ff, LM.lSh, LM.rSh)));
  const hipYaw = unwrap(fr.map((ff) => yaw(ff, LM.lHip, LM.rHip)));

  const values = {};
  // service : flexion maximale autour du point bas du bassin (± 3 images)
  values.knee_load = o.stroke === "serve" && o.timed && o.loadIdx == null ? Math.min(...kneeSeries.slice(Math.max(0, l - 3), Math.min(c, l + 3) + 1)) : kneeSeries[l];
  values.elbow_contact = angle3(fc.wl[S.sh], fc.wl[S.el], fc.wl[S.wr]);
  {
    const sh = mid(fc.wl[LM.lSh], fc.wl[LM.rSh]), hp = mid(fc.wl[LM.lHip], fc.wl[LM.rHip]);
    const t = sub(sh, hp);
    values.trunk_lean = deg(Math.acos(clamp(-t.y / (norm(t) || 1), -1, 1)));
  }
  // dissociation max autour de l'impact (fenêtre) ou instantanée (photo)
  {
    const lo = o.timed ? (o.stroke === "serve" ? Math.max(0, l - 2) : winLo(0.9)) : l, hi = o.timed ? c : Math.max(c, l);
    let best = 0;
    for (let i = Math.min(lo, hi); i <= Math.max(lo, hi); i++) best = Math.max(best, Math.abs(wrapDiff(shYaw[i] - hipYaw[i])));
    values.separation = best;
  }
  if (o.timed) {
    const lo = winLo(1.2);
    values.separation = Math.max(values.separation, 0);
    values.shoulder_turn = Math.max(...shYaw.slice(lo, c + 1)) - Math.min(...shYaw.slice(lo, c + 1));
    const a = idxAt(fr, fr[c].t - 0.15 * slow), b = idxAt(fr, fr[c].t + 0.15 * slow);
    let dmax = 0;
    for (let i = a; i <= b; i++) dmax = Math.max(dmax, Math.hypot((fr[i].lm[LM.nose].x - fr[a].lm[LM.nose].x) * aspect, fr[i].lm[LM.nose].y - fr[a].lm[LM.nose].y));
    values.head_stability = dmax / torso;
    if (dir) {
      const off = dot(fc.wl[S.wr], dir);
      values.contact_front = off / tw;
      const lo2 = idxAt(fr, fr[c].t - 0.6 * slow), hi2 = Math.max(lo2, idxAt(fr, fr[c].t - 0.05 * slow));
      let back = 0;
      for (let i = lo2; i <= hi2; i++) back = Math.max(back, off - dot(fr[i].wl[S.wr], dir));
      values.backswing = back / tw;
    }
  }
  // Service : trophée + contact en coordonnées image
  {
    const sh = fl.lm[S.sh], el = fl.lm[S.el], osh = fl.lm[S.osh], owr = fl.lm[S.owr];
    const tImg = torso;
    values.elbow_trophy = (sh.y - el.y) / tImg;
    values.toss_arm = (osh.y - owr.y) / tImg;
    const ank = Math.max(fc.lm[LM.lAn].y, fc.lm[LM.rAn].y);
    const den = ank - fc.lm[LM.nose].y;
    values.contact_height = den > 0 ? (ank - fc.lm[S.wr].y) / den : NaN;
  }

  const { metrics, issues: issueList, score } = evaluate(o.stroke, values, o.timed);
  if (prep.detRate < 0.7) notes.push(`Silhouette détectée sur ${Math.round(prep.detRate * 100)} % des images seulement : résultats moins fiables.`);
  if (o.timed && (fr[n - 1].t - fr[0].t) < 0.8) notes.push("Séquence très courte : filmez la préparation complète du geste.");
  return {
    score, values,
    metrics, issues: issueList, notes, hand,
    phases: { load: l, contact: c, follow: f },
    detRate: prep.detRate, frames: fr,
    series: { speed: spd, knee: kneeSeries, t: fr.map((x) => x.t) },
  };
}

// Évaluation des valeurs mesurées vs plages cibles → statuts, défauts priorisés, score.
export function evaluate(stroke, values, timed = true) {
  const defs = METRIC_DEFS[stroke] || [];
  const metrics = [];
  let wsum = 0, ssum = 0;
  const issues = new Map();
  for (const d of defs) {
    const v = values[d.id];
    if (v == null || Number.isNaN(v) || (d.video && !timed)) { metrics.push({ ...d, value: null, status: "na" }); continue; }
    const inR = (r) => v >= r[0] && v <= r[1];
    const status = inR(d.ok) ? "ok" : inR(d.warn) ? "warn" : "bad";
    metrics.push({ ...d, value: v, status });
    wsum += d.w; ssum += d.w * (status === "ok" ? 1 : status === "warn" ? 0.6 : 0.2);
    if (status !== "ok") {
      const issueId = v < d.ok[0] ? d.low : d.high;
      if (issueId) issues.set(issueId, (issues.get(issueId) || 0) + (status === "bad" ? 2 : 1) * d.w);
    }
  }
  return {
    metrics,
    issues: [...issues.entries()].sort((a, b) => b[1] - a[1]).map(([id, sev]) => ({ id, sev })),
    score: wsum ? Math.round((ssum / wsum) * 100) : null,
  };
}

const median = (a) => { const s = [...a].sort((x, y) => x - y); const m = Math.floor(s.length / 2); return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2; };

/** Agrège plusieurs gestes de la même séance : médiane de chaque mesure + dispersion. */
export function aggregate(stroke, reps) {
  const values = {}, spread = {};
  for (const d of METRIC_DEFS[stroke] || []) {
    const v = reps.map((r) => r.values[d.id]).filter((x) => x != null && !Number.isNaN(x));
    if (v.length) { values[d.id] = median(v); spread[d.id] = [Math.min(...v), Math.max(...v), v.length]; }
  }
  return { ...evaluate(stroke, values, true), values, spread };
}

/**
 * Repère les gestes dans une longue séquence (séance entière) : pics de vitesse du poignet frappeur.
 * Service : poignet au-dessus de la tête et bras tendu. Renvoie des instants de contact (s).
 */
export function segmentStrokes(rawFrames, { stroke, hand = "right", aspect = 16 / 9, minGap = 2.5 }) {
  const prep = prepare(rawFrames);
  if (!prep.ok) return [];
  const fr = prep.frames, torso = torsoImg(fr, aspect);
  const S = sides(hand);
  const sR = wristSpeed(fr, LM.rWr, aspect, torso), sL = wristSpeed(fr, LM.lWr, aspect, torso);
  const speed = stroke === "serve" ? (hand === "left" ? sL : sR) : sR.map((v, i) => Math.max(v, sL[i]));
  const sorted = [...speed].sort((a, b) => a - b);
  const p99 = sorted[Math.floor(sorted.length * 0.995)] || 1;
  const thr = Math.max(0.4 * p99, 1.5);
  const out = [];
  for (let i = 2; i < fr.length - 2; i++) {
    if (!(speed[i] > thr && speed[i] >= speed[i - 1] && speed[i] >= speed[i + 1])) continue;
    if (stroke === "serve") {
      const hi = fr[i].lm[S.wr].y < fr[i].lm[LM.nose].y;
      const elbow = angle3(fr[i].wl[S.sh], fr[i].wl[S.el], fr[i].wl[S.wr]);
      if (!hi || elbow < 140) continue;
    }
    if (out.length && fr[i].t - out[out.length - 1].t < minGap) { if (speed[i] > out[out.length - 1].v) out[out.length - 1] = { t: fr[i].t, v: speed[i] }; }
    else out.push({ t: fr[i].t, v: speed[i] });
  }
  return out.map((o) => o.t);
}

function shoulderYawAbs(fr) {
  const y = unwrap(fr.map((ff) => yaw(ff, LM.lSh, LM.rSh)));
  const m = y.reduce((a, b) => a + b, 0) / y.length;
  return y.map((v) => Math.abs(v - m));
}

