// Figures schématiques de « bonnes postures » (vue de profil, joueur tourné vers la droite) générées par cinématique directe,
// avec mise en évidence de l'articulation à corriger. Ce sont des modèles pédagogiques simplifiés, pas des captures de joueurs réels.

const L = { thigh: 0.245, shank: 0.246, torso: 0.3, neck: 0.1, upper: 0.186, fore: 0.146, hand: 0.07, racket: 0.3 };
const rad = (d) => (d * Math.PI) / 180;

// Angle d'un bras : 0° = vers le bas, 90° = horizontal vers l'avant, 180° = vers le haut.
const armVec = (a) => ({ x: Math.sin(rad(a)), y: -Math.cos(rad(a)) }); // y vers le haut (coordonnées monde)
const add = (p, v, k) => ({ x: p.x + v.x * k, y: p.y + v.y * k });

/** pose = { knee, lean, hit:{a, elbow}, toss:{a}, racket (bool) } -> points monde (y vers le haut, taille = 1) */
export function buildFigure(p) {
  const flex = 180 - p.knee, psi = flex / 2;
  const ankle = { x: 0, y: 0.04 };
  const knee = add(ankle, { x: Math.sin(rad(psi)), y: Math.cos(rad(psi)) }, L.shank);
  const hip = add(knee, { x: Math.sin(rad(psi - flex)), y: Math.cos(rad(psi - flex)) }, L.thigh);
  const tv = { x: Math.sin(rad(p.lean)), y: Math.cos(rad(p.lean)) };
  const sh = add(hip, tv, L.torso);
  const nose = add(sh, { x: Math.sin(rad(p.lean * 0.5)), y: Math.cos(rad(p.lean * 0.5)) }, L.neck + 0.03);
  const head = add(sh, { x: Math.sin(rad(p.lean * 0.5)), y: Math.cos(rad(p.lean * 0.5)) }, L.neck + 0.03);
  const elbow = add(sh, armVec(p.hit.a), L.upper);
  const fa = p.hit.a + (180 - p.hit.elbow) * (p.hit.a > 90 ? 1 : 1);
  const wrist = add(elbow, armVec(fa), L.fore);
  const racketTip = add(wrist, armVec(fa), L.hand + L.racket);
  const tElbow = add(sh, armVec(p.toss.a), L.upper);
  const tWrist = add(tElbow, armVec(p.toss.a), L.fore);
  return { ankle, knee, hip, sh, nose, head, elbow, wrist, racketTip, tElbow, tWrist };
}

// Poses idéales (valeurs cohérentes avec les repères de métriques)
export const IDEAL = {
  serve_trophy: { knee: 130, lean: 4, hit: { a: 100, elbow: 90 }, toss: { a: 172 } },
  serve_contact: { knee: 172, lean: 12, hit: { a: 168, elbow: 175 }, toss: { a: 40 } },
  ground_load: { knee: 130, lean: 8, hit: { a: -55, elbow: 125 }, toss: { a: 70 } },
  ground_contact: { knee: 142, lean: 10, hit: { a: 78, elbow: 150 }, toss: { a: 120 } },
  volley_prep: { knee: 140, lean: 12, hit: { a: 60, elbow: 105 }, toss: { a: 55 } },
  volley_contact: { knee: 138, lean: 14, hit: { a: 75, elbow: 120 }, toss: { a: 35 } },
  // coups ajoutés (poses pédagogiques simplifiées)
  slice_prep: { knee: 140, lean: 8, hit: { a: 140, elbow: 110 }, toss: { a: 80 } },
  slice_contact: { knee: 145, lean: 10, hit: { a: 85, elbow: 155 }, toss: { a: 110 } },
  drop_contact: { knee: 138, lean: 12, hit: { a: 70, elbow: 140 }, toss: { a: 100 } },
  smash_trophy: { knee: 160, lean: 3, hit: { a: 105, elbow: 90 }, toss: { a: 165 } },
  smash_contact: { knee: 175, lean: 8, hit: { a: 168, elbow: 175 }, toss: { a: 60 } },
  lob_load: { knee: 125, lean: 5, hit: { a: -35, elbow: 130 }, toss: { a: 90 } },
  lob_finish: { knee: 165, lean: 6, hit: { a: 150, elbow: 150 }, toss: { a: 100 } },
  return_prep: { knee: 135, lean: 10, hit: { a: 25, elbow: 105 }, toss: { a: 55 } },
};

// défaut -> figure de référence + élément à mettre en évidence + légende courte
export const FIG_FOR_ISSUE = {
  s_knee_stiff: { pose: "serve_trophy", hi: ["knee"], cap: "Trophée : genoux fléchis (≈ 110–150°), poids sur les appuis" },
  s_elbow_bent: { pose: "serve_contact", hi: ["elbow"], cap: "Contact : bras allongé, coude proche de 180°" },
  s_contact_low: { pose: "serve_contact", hi: ["wrist"], cap: "Contact haut : poignet au plus haut, talon décollé" },
  s_elbow_low: { pose: "serve_trophy", hi: ["elbow"], cap: "Coude au niveau des épaules, avant-bras vertical (« L »)" },
  s_toss_arm: { pose: "serve_trophy", hi: ["toss"], cap: "Bras lanceur haut, pointé vers la balle" },
  s_sep_low: { pose: "serve_trophy", hi: [], top: 30, cap: "Épaules tournées avant le bassin (dissociation ≈ 20–40°)" },
  g_knee_stiff: { pose: "ground_load", hi: ["knee"], cap: "Appui fléchi (≈ 110–160°) pour pousser vers l'avant" },
  g_sep_low: { pose: "ground_load", hi: [], top: 25, cap: "Épaules en avance de rotation sur le bassin au chargement" },
  g_turn_small: { pose: "ground_load", hi: [], top: 45, cap: "Préparation complète : épaules tournées de 45° ou plus" },
  g_contact_behind: { pose: "ground_contact", hi: ["wrist", "front"], cap: "Contact devant la hanche, balle gérée à bout de bras" },
  g_arm_cramped: { pose: "ground_contact", hi: ["elbow"], cap: "Bras confortablement étendu au contact (coude ≈ 135–180°)" },
  g_head_moves: { pose: "ground_contact", hi: ["head"], cap: "Tête stable : regard sur la zone de contact" },
  g_lean: { pose: "ground_contact", hi: ["trunk"], cap: "Tronc proche de la verticale (< 22°), équilibre à la finition" },
  v_swing_big: { pose: "volley_prep", hi: ["wrist"], cap: "Préparation courte : raquette devant, bloc" },
  v_contact_behind: { pose: "volley_contact", hi: ["wrist", "front"], cap: "Contact devant le corps, poignet ferme" },
  v_knee_stiff: { pose: "volley_contact", hi: ["knee"], cap: "Fléchir les jambes (≈ 115–165°), pas le dos" },
  sl_path_flat: { pose: "slice_prep", hi: ["wrist"], cap: "Armé haut, puis le poignet descend vers l'impact (geste de haut en bas)" },
  dr_too_fast: { pose: "drop_contact", hi: ["wrist"], cap: "Contact souple : le tamis ralentit et accompagne la balle" },
  dr_not_disguised: { pose: "slice_prep", hi: [], top: 40, cap: "Même préparation (épaules tournées) que le coup de fond" },
  sm_elbow_low: { pose: "smash_trophy", hi: ["elbow"], cap: "Armé : coude à hauteur d'épaule, raquette derrière la tête" },
  sm_toss_arm: { pose: "smash_trophy", hi: ["toss"], cap: "Bras libre levé et pointé vers la balle" },
  sm_elbow_bent: { pose: "smash_contact", hi: ["elbow"], cap: "Contact : bras allongé, coude proche de 180°" },
  sm_contact_low: { pose: "smash_contact", hi: ["wrist"], cap: "Contact haut, bien placé sous la balle" },
  lb_path_flat: { pose: "lob_load", hi: ["wrist"], cap: "Tamis sous la balle puis geste de bas en haut" },
  lb_finish_low: { pose: "lob_finish", hi: ["wrist"], cap: "Finition haute : raquette au-dessus de l'épaule opposée" },
  rt_prep_big: { pose: "return_prep", hi: ["wrist"], cap: "Préparation courte, raquette devant" },
  rt_contact_behind: { pose: "ground_contact", hi: ["wrist", "front"], cap: "Contact devant la hanche, accompagner" },
};

const ACC = "#ffd23f";
const css = (c) => c;

/** SVG de la figure. opts: { hi: [], cap, top (angle de dissociation à illustrer), ghost: pose utilisateur (facultatif) } */
export function figureSVG(poseKey, opts = {}) {
  const pose = typeof poseKey === "string" ? IDEAL[poseKey] : poseKey;
  const f = buildFigure(pose);
  const W = 300, H = 300, ox = 110, oy = 282, sc = 160;
  const X = (p) => (ox + p.x * sc).toFixed(1), Y = (p) => (oy - p.y * sc).toFixed(1);
  const hi = new Set(opts.hi || []);
  const seg = (a, b, key, w = 6) => `<line x1="${X(a)}" y1="${Y(a)}" x2="${X(b)}" y2="${Y(b)}" stroke="${hi.has(key) ? ACC : "#9be15d"}" stroke-width="${hi.has(key) ? w + 2 : w}" stroke-linecap="round"/>`;
  const dot = (p, key, r = 4.5) => `<circle cx="${X(p)}" cy="${Y(p)}" r="${hi.has(key) ? r + 3 : r}" fill="${hi.has(key) ? ACC : "#fff"}" stroke="#0b3d2e" stroke-width="1.5"/>`;
  let s = `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" class="figsvg" role="img" aria-label="${opts.cap || "Posture de référence"}">`;
  s += `<rect width="${W}" height="${H}" rx="12" fill="#14532d"/><line x1="10" y1="${oy + 4}" x2="${W - 10}" y2="${oy + 4}" stroke="#fff6" stroke-width="2"/>`;
  // lignes d'aide
  if (hi.has("front")) s += `<line x1="${X(f.hip)}" y1="${Y(f.wrist) - 40}" x2="${X(f.hip)}" y2="${oy}" stroke="#fff8" stroke-dasharray="4 4"/><line x1="${X(f.hip)}" y1="${Y(f.wrist)}" x2="${X(f.wrist)}" y2="${Y(f.wrist)}" stroke="${ACC}" stroke-width="3"/><text x="${(+X(f.hip) + +X(f.wrist)) / 2}" y="${+Y(f.wrist) - 6}" fill="${ACC}" font-size="11" text-anchor="middle">devant</text>`;
  if (hi.has("trunk")) s += `<line x1="${X(f.hip)}" y1="${Y(f.hip)}" x2="${X(f.hip)}" y2="${+Y(f.hip) - 90}" stroke="#fff8" stroke-dasharray="4 4"/>`;
  if (hi.has("wrist") && !hi.has("front")) s += `<line x1="10" y1="${Y(f.wrist)}" x2="${+X(f.wrist) + 20}" y2="${Y(f.wrist)}" stroke="${ACC}" stroke-dasharray="5 4" stroke-width="2"/>`;
  // corps
  s += seg(f.ankle, f.knee, "knee") + seg(f.knee, f.hip, "knee") + seg(f.hip, f.sh, "trunk", 8);
  s += seg(f.sh, f.tElbow, "toss") + seg(f.tElbow, f.tWrist, "toss");
  s += seg(f.sh, f.elbow, "elbow") + seg(f.elbow, f.wrist, "elbow");
  if (pose.racket !== false) s += `<line x1="${X(f.wrist)}" y1="${Y(f.wrist)}" x2="${X(f.racketTip)}" y2="${Y(f.racketTip)}" stroke="#e5e7eb" stroke-width="3" stroke-linecap="round"/><circle cx="${X(f.racketTip)}" cy="${Y(f.racketTip)}" r="9" fill="none" stroke="#e5e7eb" stroke-width="2.5"/>`;
  s += `<circle cx="${X(f.head)}" cy="${Y(f.head)}" r="${hi.has("head") ? 17 : 14}" fill="#14532d" stroke="${hi.has("head") ? ACC : "#9be15d"}" stroke-width="${hi.has("head") ? 4 : 3}"/>`;
  s += dot(f.knee, "knee") + dot(f.hip, "x") + dot(f.sh, "x") + dot(f.elbow, "elbow") + dot(f.wrist, "wrist", 5);
  // inset vue de dessus (dissociation)
  if (opts.top != null) {
    const cx = 252, cy = 50, r = 26, a = rad(opts.top);
    s += `<circle cx="${cx}" cy="${cy}" r="${r + 8}" fill="#0b3d2e" stroke="#fff4"/><line x1="${cx - r}" y1="${cy}" x2="${cx + r}" y2="${cy}" stroke="#9be15d" stroke-width="5" stroke-linecap="round"/><line x1="${cx - r * Math.cos(a)}" y1="${cy - r * Math.sin(a)}" x2="${cx + r * Math.cos(a)}" y2="${cy + r * Math.sin(a)}" stroke="${ACC}" stroke-width="5" stroke-linecap="round"/><text x="${cx}" y="${cy + r + 22}" fill="#fff" font-size="10" text-anchor="middle">dessus : bassin / épaules</text>`;
  }
  s += `</svg>`;
  return s;
}

export function issueFigure(issueId) {
  const d = FIG_FOR_ISSUE[issueId];
  if (!d) return "";
  return `<figure class="postfig">${figureSVG(d.pose, { hi: d.hi, top: d.top, cap: d.cap })}<figcaption>✅ ${d.cap}</figcaption></figure>`;
}



