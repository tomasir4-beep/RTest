// Figures pédagogiques (vue de profil, joueur tourné vers la droite) générées par cinématique directe.
// Chaque défaut est illustré par deux panneaux « À éviter / Cible » avec l'angle mesuré, la zone à regarder et une légende.
// Ce sont des modèles simplifiés : les valeurs d'angle affichées sont calculées à partir de la figure elle-même.

const SEG = { thigh: 0.245, shank: 0.246, torso: 0.3, neck: 0.1, upper: 0.186, fore: 0.146, hand: 0.07, racket: 0.3 };
const rad = (d) => (d * Math.PI) / 180;
const deg = (r) => (r * 180) / Math.PI;

// Angle d'un bras : 0° = vers le bas, 90° = horizontal vers l'avant, 180° = vers le haut.
const armVec = (a) => ({ x: Math.sin(rad(a)), y: -Math.cos(rad(a)) }); // y vers le haut (coordonnées monde)
const add = (p, v, k) => ({ x: p.x + v.x * k, y: p.y + v.y * k });

/**
 * Cinématique directe de la figure.
 * @param {{knee:number, lean:number, hit:{a:number, elbow:number}, toss:{a:number}}} p pose (angles en degrés)
 * @returns {object} points en coordonnées monde (y vers le haut, taille = 1)
 */
export function buildFigure(p) {
  const flex = 180 - p.knee, psi = flex / 2;
  const ankle = { x: 0, y: 0.04 };
  const knee = add(ankle, { x: Math.sin(rad(psi)), y: Math.cos(rad(psi)) }, SEG.shank);
  const hip = add(knee, { x: Math.sin(rad(psi - flex)), y: Math.cos(rad(psi - flex)) }, SEG.thigh);
  const tv = { x: Math.sin(rad(p.lean)), y: Math.cos(rad(p.lean)) };
  const sh = add(hip, tv, SEG.torso);
  const hv = { x: Math.sin(rad(p.lean * 0.5)), y: Math.cos(rad(p.lean * 0.5)) };
  const nose = add(sh, hv, SEG.neck + 0.03);
  const head = add(sh, hv, SEG.neck + 0.03);
  const elbow = add(sh, armVec(p.hit.a), SEG.upper);
  const fa = p.hit.a + (180 - p.hit.elbow);
  const wrist = add(elbow, armVec(fa), SEG.fore);
  const racketTip = add(wrist, armVec(fa), SEG.hand + SEG.racket);
  const tElbow = add(sh, armVec(p.toss.a), SEG.upper);
  const tWrist = add(tElbow, armVec(p.toss.a), SEG.fore);
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
  slice_prep: { knee: 140, lean: 8, hit: { a: 140, elbow: 110 }, toss: { a: 80 } },
  slice_contact: { knee: 145, lean: 10, hit: { a: 85, elbow: 155 }, toss: { a: 110 } },
  drop_contact: { knee: 138, lean: 12, hit: { a: 70, elbow: 140 }, toss: { a: 100 } },
  smash_trophy: { knee: 160, lean: 3, hit: { a: 105, elbow: 90 }, toss: { a: 165 } },
  smash_contact: { knee: 175, lean: 8, hit: { a: 168, elbow: 175 }, toss: { a: 60 } },
  lob_load: { knee: 125, lean: 5, hit: { a: -35, elbow: 130 }, toss: { a: 90 } },
  lob_finish: { knee: 165, lean: 6, hit: { a: 150, elbow: 150 }, toss: { a: 100 } },
  return_prep: { knee: 135, lean: 10, hit: { a: 25, elbow: 105 }, toss: { a: 55 } },
};

/**
 * Description pédagogique de chaque défaut : pose cible, pose « à éviter » (surcharges), zone à regarder, légendes.
 * focus : knee | elbow | wrist | front | trunk | head | toss | shoulderLine | path | speed ; top : vue de dessus (dissociation).
 */
export const ISSUE_FIG = {
  s_knee_stiff: { base: "serve_trophy", bad: { knee: 176 }, focus: ["knee"], badNote: "Jambes presque tendues : l'énergie venue du sol n'est pas utilisée.", goodNote: "Genoux fléchis : on « s'assoit », puis on pousse vers le haut." },
  s_elbow_bent: { base: "serve_contact", bad: { hit: { a: 150, elbow: 118 } }, focus: ["elbow"], badNote: "Bras plié au contact : point de frappe bas et levier court.", goodNote: "Bras presque tendu (coude proche de 180°) : contact le plus haut possible." },
  s_contact_low: { base: "serve_contact", bad: { knee: 176, hit: { a: 135, elbow: 150 } }, focus: ["wrist"], badNote: "Contact trop bas : peu d'angle, la balle passe tout juste le filet.", goodNote: "Contact haut : on s'étire et le talon décolle." },
  s_elbow_low: { base: "serve_trophy", bad: { hit: { a: 55, elbow: 90 } }, focus: ["elbow", "shoulderLine"], badNote: "Coude sous la ligne des épaules : l'épaule est mal placée pour accélérer.", goodNote: "Coude à hauteur d'épaule, avant-bras vertical : le « L » du trophée." },
  s_toss_arm: { base: "serve_trophy", bad: { toss: { a: 60 } }, focus: ["toss"], badNote: "Bras libre qui retombe trop tôt : le tronc perd son repère.", goodNote: "Bras libre haut et pointé vers la balle jusqu'au dernier moment." },
  s_sep_low: { top: { bad: 5, good: 30 }, badNote: "Épaules et bassin tournent ensemble : pas de « ressort » dans le tronc.", goodNote: "Les épaules tournent en avance sur le bassin (≈ 20–40°) : le tronc se charge." },
  g_knee_stiff: { base: "ground_load", bad: { knee: 176 }, focus: ["knee"], badNote: "Appui raide : on frappe avec les bras seulement.", goodNote: "Appui fléchi : le sol devient une source de puissance." },
  g_sep_low: { top: { bad: 6, good: 25 }, badNote: "Épaules et bassin tournent d'un bloc.", goodNote: "Le bassin démarre, les épaules suivent : dissociation visible." },
  g_turn_small: { top: { bad: 15, good: 50 }, topLabel: "rotation des épaules", badNote: "Préparation trop petite : peu de course pour accélérer.", goodNote: "Épaules bien tournées dès la préparation." },
  g_contact_behind: { base: "ground_contact", bad: { hit: { a: -8, elbow: 150 } }, focus: ["front", "wrist"], badNote: "Contact à hauteur du corps ou derrière : on subit la balle.", goodNote: "Contact devant la hanche : on contrôle la direction." },
  g_arm_cramped: { base: "ground_contact", bad: { hit: { a: 45, elbow: 85 } }, focus: ["elbow"], badNote: "Bras coincé contre le corps : balle trop proche.", goodNote: "Bras confortablement étendu (coude ≈ 135–180°) : on garde de l'espace." },
  g_head_moves: { base: "ground_contact", bad: {}, focus: ["head"], badMotion: true, badNote: "La tête bouge à l'impact : les épaules suivent, le timing se dégrade.", goodNote: "Tête immobile, regard sur la zone de contact jusqu'après l'impact." },
  g_lean: { base: "ground_contact", bad: { lean: 36 }, focus: ["trunk"], badNote: "Tronc très penché : déséquilibre, geste moins répétable.", goodNote: "Tronc proche de la verticale (< 22°) : on reste équilibré." },
  v_swing_big: { base: "volley_prep", bad: { hit: { a: -55, elbow: 110 } }, focus: ["wrist"], badNote: "Grande préparation : la volée arrive trop vite pour ce geste.", goodNote: "Préparation courte : raquette devant, on bloque." },
  v_contact_behind: { base: "volley_contact", bad: { hit: { a: 8, elbow: 125 } }, focus: ["front", "wrist"], badNote: "Contact près du corps : peu d'angle, geste de rattrapage.", goodNote: "Contact devant le corps, poignet ferme." },
  v_knee_stiff: { base: "volley_contact", bad: { knee: 176, lean: 28 }, focus: ["knee"], badNote: "Jambes raides : on se penche du dos pour la balle basse.", goodNote: "Genoux fléchis : le dos reste droit, la tête stable." },
  sl_path_flat: { base: "slice_contact", bad: {}, focus: ["path", "wrist"], pathGood: { a: 148, elbow: 112 }, pathBad: { a: 40, elbow: 145 }, badNote: "Le poignet monte vers la balle : pas d'effet rétrograde, balle qui flotte.", goodNote: "Armé haut puis le poignet descend vers l'impact : slice bas." },
  dr_too_fast: { base: "drop_contact", bad: {}, focus: ["wrist", "speed"], badFast: true, badNote: "Geste rapide à l'impact : la balle part trop loin.", goodNote: "Contact souple : le tamis ralentit et accompagne la balle." },
  dr_not_disguised: { top: { bad: 12, good: 45 }, topLabel: "rotation des épaules", badNote: "Préparation courte ou différente : l'adversaire devine l'amortie.", goodNote: "Même préparation que le coup de fond : l'adversaire est piégé." },
  sm_elbow_low: { base: "smash_trophy", bad: { hit: { a: 55, elbow: 90 } }, focus: ["elbow", "shoulderLine"], badNote: "Coude trop bas à l'armé : peu d'extension ensuite.", goodNote: "Coude à hauteur d'épaule, raquette derrière la tête." },
  sm_toss_arm: { base: "smash_trophy", bad: { toss: { a: 55 } }, focus: ["toss"], badNote: "Bras libre baissé : plus de repère sur la balle.", goodNote: "Bras libre levé et pointé vers la balle." },
  sm_elbow_bent: { base: "smash_contact", bad: { hit: { a: 150, elbow: 118 } }, focus: ["elbow"], badNote: "Bras plié au contact : smash sans hauteur ni puissance.", goodNote: "Bras tendu au point le plus haut." },
  sm_contact_low: { base: "smash_contact", bad: { knee: 176, hit: { a: 135, elbow: 150 } }, focus: ["wrist"], badNote: "Mal placé sous la balle : on frappe plus bas et devant.", goodNote: "Bien placé (pas chassés) : contact haut, sous la balle." },
  lb_path_flat: { base: "lob_finish", bad: {}, focus: ["path", "wrist"], pathGood: { a: -35, elbow: 130 }, pathBad: { a: 70, elbow: 140 }, badNote: "Geste plat : balle trop tendue, facile à smasher.", goodNote: "Geste de bas en haut : de la hauteur, de la profondeur." },
  lb_finish_low: { base: "lob_finish", bad: { hit: { a: 85, elbow: 150 } }, focus: ["wrist", "shoulderLine"], badNote: "La raquette s'arrête devant : la balle manque de hauteur.", goodNote: "Finition haute : raquette au-dessus de l'épaule opposée." },
  rt_prep_big: { base: "return_prep", bad: { hit: { a: -60, elbow: 110 } }, focus: ["wrist"], badNote: "Préparation large : on est en retard sur le service.", goodNote: "Préparation courte et compacte, raquette devant." },
  rt_contact_behind: { base: "ground_contact", bad: { hit: { a: -8, elbow: 150 } }, focus: ["front", "wrist"], badNote: "Contact trop près du corps : retour court ou en retard.", goodNote: "On avance sur la balle : contact devant la hanche." },
};

// ----------------------------------------------------------------------------------------------------------------------
const ACCENT = "#ffd23f", GOOD = "#9be15d", BADC = "#ff8a80";
const merge = (base, over = {}) => ({ ...base, ...over, hit: { ...base.hit, ...(over.hit || {}) }, toss: { ...base.toss, ...(over.toss || {}) } });
const angleBetween = (a, b, c) => { // angle en b entre a et c (y vers le haut), degrés
  const u = { x: a.x - b.x, y: a.y - b.y }, v = { x: c.x - b.x, y: c.y - b.y };
  return deg(Math.acos(Math.max(-1, Math.min(1, (u.x * v.x + u.y * v.y) / ((Math.hypot(u.x, u.y) * Math.hypot(v.x, v.y)) || 1)))));
};

const W = 260, H = 300, OX = 100, OY = 282, SC = 165;
const label = (x, y, text, anchor = "middle", color = "#fff", size = 15) =>
  `<text x="${x.toFixed(1)}" y="${y.toFixed(1)}" text-anchor="${anchor}" font-size="${size}" font-weight="700" fill="${color}" stroke="#0b3d2e" stroke-width="3.5" paint-order="stroke" stroke-linejoin="round">${text}</text>`;

/** Arc d'angle en b entre les points a et c (coordonnées écran), avec la valeur. */
function arc(b, a, c, r, color, text) {
  const ua = { x: a.x - b.x, y: a.y - b.y }, uc = { x: c.x - b.x, y: c.y - b.y };
  const la = Math.hypot(ua.x, ua.y) || 1, lc = Math.hypot(uc.x, uc.y) || 1;
  const p1 = { x: b.x + (ua.x / la) * r, y: b.y + (ua.y / la) * r }, p2 = { x: b.x + (uc.x / lc) * r, y: b.y + (uc.y / lc) * r };
  const cross = ua.x * uc.y - ua.y * uc.x;
  const mid = { x: ua.x / la + uc.x / lc, y: ua.y / la + uc.y / lc };
  const ml = Math.hypot(mid.x, mid.y) || 1;
  const tp = { x: b.x + (mid.x / ml) * (r + 20), y: b.y + (mid.y / ml) * (r + 20) };
  return `<path d="M ${p1.x.toFixed(1)} ${p1.y.toFixed(1)} A ${r} ${r} 0 0 ${cross > 0 ? 1 : 0} ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}" fill="none" stroke="${color}" stroke-width="4" stroke-linecap="round"/>` + label(tp.x, tp.y + 5, text, "middle", color, 16);
}

/** Panneau « vue de dessus » : bassin et épaules vus d'en haut avec leur écart de rotation. */
function topPanel(angle, color, label2) {
  const cx = 130, cy = 150, r = 82, a = rad(angle);
  const hipEnd = { x: r, y: 0 }; // bassin de référence (horizontal)
  const sh = { x: r * Math.cos(a), y: -r * Math.sin(a) };
  let s = `<circle cx="${cx}" cy="${cy}" r="${r + 22}" fill="#0f4a35" stroke="#fff3" stroke-width="2"/>`;
  s += `<text x="${cx}" y="${cy - r - 34}" text-anchor="middle" font-size="12" fill="#fffb">Vue de dessus (le joueur regarde en haut)</text>`;
  s += `<line x1="${cx - hipEnd.x}" y1="${cy}" x2="${cx + hipEnd.x}" y2="${cy}" stroke="#c9d6cf" stroke-width="9" stroke-linecap="round"/>`;
  s += `<line x1="${cx - sh.x}" y1="${cy - sh.y}" x2="${cx + sh.x}" y2="${cy + sh.y}" stroke="${ACCENT}" stroke-width="9" stroke-linecap="round"/>`;
  s += `<circle cx="${cx}" cy="${cy}" r="9" fill="#fff"/>`;
  s += `<path d="M ${cx + 46} ${cy} A 46 46 0 0 0 ${cx + 46 * Math.cos(a)} ${cy - 46 * Math.sin(a)}" fill="none" stroke="${color}" stroke-width="4"/>`;
  s += label(cx + 70, cy - 22, `${Math.round(angle)}°`, "middle", color, 20);
  s += `<text x="${cx - r - 4}" y="${cy + 24}" font-size="13" font-weight="700" fill="#c9d6cf">bassin</text>`;
  s += `<text x="${cx - sh.x - 4}" y="${cy - sh.y - 10}" font-size="13" font-weight="700" fill="${ACCENT}">${label2 || "épaules"}</text>`;
  return s;
}

/**
 * Un panneau (figure + annotations).
 * @param {object} pose pose à dessiner
 * @param {object} d définition du défaut (ISSUE_FIG[id])
 * @param {boolean} isBad panneau « à éviter »
 */
function panel(pose, d, isBad, refPose) {
  const col = isBad ? BADC : GOOD;
  const f = buildFigure(pose);
  const X = (p) => OX + p.x * SC, Y = (p) => OY - p.y * SC;
  const P = (p) => ({ x: X(p), y: Y(p) });
  const has = (k) => (d.focus || []).includes(k);
  const seg = (a, b, key, w = 7) => `<line x1="${X(a).toFixed(1)}" y1="${Y(a).toFixed(1)}" x2="${X(b).toFixed(1)}" y2="${Y(b).toFixed(1)}" stroke="${key && has(key) ? ACCENT : col}" stroke-width="${key && has(key) ? w + 3 : w}" stroke-linecap="round"/>`;
  const dot = (p, key, r = 5) => `<circle cx="${X(p).toFixed(1)}" cy="${Y(p).toFixed(1)}" r="${key && has(key) ? r + 3 : r}" fill="${key && has(key) ? ACCENT : "#fff"}" stroke="#0b3d2e" stroke-width="1.8"/>`;
  let s = `<rect width="${W}" height="${H}" rx="14" fill="${isBad ? "#4a2323" : "#14532d"}"/>`;
  s += `<line x1="12" y1="${OY + 4}" x2="${W - 12}" y2="${OY + 4}" stroke="#fff5" stroke-width="2"/>`;

  // repères en arrière-plan
  if (has("shoulderLine")) s += `<line x1="14" y1="${Y(f.sh).toFixed(1)}" x2="${W - 14}" y2="${Y(f.sh).toFixed(1)}" stroke="#fff" stroke-opacity=".55" stroke-dasharray="6 5" stroke-width="2"/>` + label(W - 16, Y(f.sh) - 6, "ligne des épaules", "end", "#fff", 12);
  if (has("trunk")) s += `<line x1="${X(f.hip).toFixed(1)}" y1="${(Y(f.hip) + 14).toFixed(1)}" x2="${X(f.hip).toFixed(1)}" y2="${(Y(f.hip) - 105).toFixed(1)}" stroke="#fff" stroke-opacity=".6" stroke-dasharray="5 5" stroke-width="2"/>`;
  if (has("front")) s += `<line x1="${X(f.hip).toFixed(1)}" y1="${(Y(f.wrist) - 50).toFixed(1)}" x2="${X(f.hip).toFixed(1)}" y2="${OY}" stroke="#fff" stroke-opacity=".6" stroke-dasharray="5 5" stroke-width="2"/>`;
  if (has("wrist") && !has("front") && !has("path")) {
    const ry = refPose ? Y(buildFigure(refPose).wrist) : null;
    if (isBad && ry != null) s += `<line x1="14" y1="${ry.toFixed(1)}" x2="${W - 14}" y2="${ry.toFixed(1)}" stroke="${GOOD}" stroke-opacity=".8" stroke-dasharray="6 5" stroke-width="2"/>` + label(W - 16, ry - 6, "cible", "end", GOOD, 12);
    s += `<line x1="14" y1="${Y(f.wrist).toFixed(1)}" x2="${(X(f.wrist) + 24).toFixed(1)}" y2="${Y(f.wrist).toFixed(1)}" stroke="${ACCENT}" stroke-dasharray="5 4" stroke-width="2.5"/>`;
  }
  if (has("path")) {
    const start = merge(pose, { hit: isBad ? d.pathBad : d.pathGood });
    const fs = buildFigure(start);
    s += `<defs><marker id="arw${isBad ? "b" : "g"}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0L10,5L0,10z" fill="${ACCENT}"/></marker></defs>`;
    s += `<circle cx="${X(fs.wrist).toFixed(1)}" cy="${Y(fs.wrist).toFixed(1)}" r="6" fill="none" stroke="${ACCENT}" stroke-width="2.5" stroke-dasharray="3 3"/>`;
    s += `<line x1="${X(fs.wrist).toFixed(1)}" y1="${Y(fs.wrist).toFixed(1)}" x2="${X(f.wrist).toFixed(1)}" y2="${Y(f.wrist).toFixed(1)}" stroke="${ACCENT}" stroke-width="4" stroke-dasharray="7 5" marker-end="url(#arw${isBad ? "b" : "g"})"/>`;
  }

  // corps
  s += seg(f.ankle, f.knee, "knee") + seg(f.knee, f.hip, "knee") + seg(f.hip, f.sh, "trunk", 9);
  s += seg(f.sh, f.tElbow, "toss") + seg(f.tElbow, f.tWrist, "toss");
  s += seg(f.sh, f.elbow, "elbow") + seg(f.elbow, f.wrist, "elbow");
  s += `<line x1="${X(f.wrist).toFixed(1)}" y1="${Y(f.wrist).toFixed(1)}" x2="${X(f.racketTip).toFixed(1)}" y2="${Y(f.racketTip).toFixed(1)}" stroke="#e5e7eb" stroke-width="3.5" stroke-linecap="round"/><ellipse cx="${X(f.racketTip).toFixed(1)}" cy="${Y(f.racketTip).toFixed(1)}" rx="10" ry="12" fill="none" stroke="#e5e7eb" stroke-width="3"/>`;
  s += `<circle cx="${X(f.head).toFixed(1)}" cy="${Y(f.head).toFixed(1)}" r="${has("head") ? 19 : 15}" fill="#14532d" stroke="${has("head") ? ACCENT : col}" stroke-width="${has("head") ? 4 : 3}"/>`;
  s += dot(f.knee, "knee") + dot(f.hip) + dot(f.sh) + dot(f.elbow, "elbow") + dot(f.wrist, "wrist", 6);

  // angle mesuré
  if (has("knee")) s += arc(P(f.knee), P(f.ankle), P(f.hip), 26, ACCENT, `${Math.round(angleBetween(f.ankle, f.knee, f.hip))}°`);
  if (has("elbow")) s += arc(P(f.elbow), P(f.sh), P(f.wrist), 24, ACCENT, `${Math.round(angleBetween(f.sh, f.elbow, f.wrist))}°`);
  if (has("trunk")) {
    const up = { x: f.hip.x, y: f.hip.y + 0.3 };
    s += arc(P(f.hip), P(up), P(f.sh), 40, ACCENT, `${Math.round(angleBetween(up, f.hip, f.sh))}°`);
  }
  if (has("front")) {
    const dx = (f.wrist.x - f.hip.x) / SEG.torso;
    const y = Y(f.wrist) - 12;
    s += `<line x1="${X(f.hip).toFixed(1)}" y1="${y}" x2="${X(f.wrist).toFixed(1)}" y2="${y}" stroke="${ACCENT}" stroke-width="3.5"/>`;
    s += label((X(f.hip) + X(f.wrist)) / 2, y - 8, `${dx >= 0 ? "+" : "−"}${Math.abs(dx).toFixed(1)} buste`, "middle", ACCENT, 13);
  }
  if (has("head") && isBad && d.badMotion) {
    const hx = X(f.head), hy = Y(f.head);
    s += `<path d="M ${hx - 34} ${hy - 4} l 10 -8 l 10 8 l 10 -8" fill="none" stroke="${BADC}" stroke-width="3" stroke-linecap="round"/><path d="M ${hx + 22} ${hy + 6} l 10 8 l 10 -8" fill="none" stroke="${BADC}" stroke-width="3" stroke-linecap="round"/>`;
  }
  if (has("head") && !isBad) s += label(X(f.head) + 10, Y(f.head) - 24, "immobile", "middle", GOOD, 12);
  if (has("speed")) {
    const wx = X(f.wrist), wy = Y(f.wrist), n = d.badFast && isBad ? 6 : 2, len = d.badFast && isBad ? 46 : 14;
    for (let k = 0; k < n; k++) s += `<line x1="${(wx - 14 - len).toFixed(1)}" y1="${(wy - 12 + k * 8).toFixed(1)}" x2="${(wx - 14).toFixed(1)}" y2="${(wy - 12 + k * 8).toFixed(1)}" stroke="${ACCENT}" stroke-width="3" stroke-linecap="round" stroke-opacity="${isBad ? 0.95 : 0.7}"/>`;
  }
  return s;
}

const svgOpen = `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" class="figsvg"`;

/** Panneau seul (utilisé pour le glossaire) : pose idéale + annotation de la grandeur. */
export function metricPanelSVG(poseKey, focus, extra = {}) {
  const d = { focus, ...extra };
  return `${svgOpen} role="img" aria-label="Illustration">${panel(IDEAL[poseKey], d, false)}</svg>`;
}

/** Deux panneaux « À éviter / Cible » pour un défaut, avec légendes. */
export function issueFigure(issueId) {
  const d = ISSUE_FIG[issueId];
  if (!d) return "";
  const goodPose = d.base ? IDEAL[d.base] : null;
  const badPose = goodPose ? merge(goodPose, d.bad) : null;
  const mk = (isBad) => `${svgOpen} role="img" aria-label="${isBad ? "À éviter" : "Cible"}">${panel(isBad ? badPose : goodPose, d, isBad, goodPose)}</svg>`;
  const mkTop = (isBad) => `${svgOpen} role="img">${topPanelFull(d, isBad)}</svg>`;
  const draw = d.top ? mkTop : mk;
  return `<figure class="issuefig"><div class="pans">
    <div class="pan bad"><div class="pt">✗ À éviter</div>${draw(true)}<p>${d.badNote}</p></div>
    <div class="pan good"><div class="pt">✓ Cible</div>${draw(false)}<p>${d.goodNote}</p></div></div>
    <figcaption class="small muted">Jaune = ce qu'il faut regarder · l'angle est mesuré à l'articulation · figure schématique, vue de profil.</figcaption></figure>`;
}

function topPanelFull(d, isBad) {
  const col = isBad ? BADC : GOOD;
  return `<rect width="${W}" height="${H}" rx="14" fill="${isBad ? "#4a2323" : "#14532d"}"/>` + topPanel(isBad ? d.top.bad : d.top.good, col, d.topLabel);
}

// --- Jauge : où se situe la valeur mesurée par rapport à la cible ---------------------------------------------------
export const GAUGE_DOMAIN = {
  knee_load: [80, 180], elbow_contact: [90, 180], elbow_trophy: [-0.6, 0.6], toss_arm: [-0.6, 1.4], contact_height: [0.9, 1.4],
  separation: [0, 60], shoulder_turn: [0, 100], contact_front: [-0.6, 1.2], head_stability: [0, 0.8], trunk_lean: [0, 45],
  backswing: [0, 1.6], wrist_path: [-1.2, 1.2], follow_high: [-0.6, 1.4], contact_speed: [0, 10],
};

/**
 * Jauge horizontale : zone verte (cible), orange (à surveiller), rouge (à corriger), repère de la valeur mesurée.
 * @param {{id:string, ok:number[], warn:number[], unit:string}} def définition de la mesure
 * @param {number|null} value valeur mesurée (médiane)
 * @param {{min:number, max:number}} [range] étendue des répétitions (facultatif)
 * @returns {string} SVG
 */
export function gaugeSVG(def, value, range) {
  const [lo, hi] = GAUGE_DOMAIN[def.id] || [0, 1];
  const w = 220, h = 34, pad = 6;
  const x = (v) => pad + ((Math.max(lo, Math.min(hi, v)) - lo) / (hi - lo)) * (w - 2 * pad);
  const rect = (a, b, c) => `<rect x="${x(a).toFixed(1)}" y="12" width="${Math.max(0, x(b) - x(a)).toFixed(1)}" height="10" fill="${c}"/>`;
  let s = `<svg viewBox="0 0 ${w} ${h}" class="gauge" role="img" aria-label="Jauge ${def.label}"><rect x="${pad}" y="12" width="${w - 2 * pad}" height="10" rx="5" fill="#e03131" opacity=".85"/>`;
  s += rect(def.warn[0], def.warn[1], "#f59f00") + rect(def.ok[0], def.ok[1], "#2f9e44");
  s += `<rect x="${pad}" y="12" width="${w - 2 * pad}" height="10" rx="5" fill="none" stroke="#0004"/>`;
  if (range && range.max > range.min) s += `<line x1="${x(range.min).toFixed(1)}" y1="27" x2="${x(range.max).toFixed(1)}" y2="27" stroke="currentColor" stroke-width="3" opacity=".55"/>`;
  if (value != null && !Number.isNaN(value)) s += `<path d="M ${x(value).toFixed(1)} 11 l -6 -10 l 12 0 z" fill="currentColor"/><line x1="${x(value).toFixed(1)}" y1="11" x2="${x(value).toFixed(1)}" y2="24" stroke="currentColor" stroke-width="2.5"/>`;
  return s + `</svg>`;
}

/** Figure simple d'une pose de référence (comparaison joueur / modèle). */
export const figureSVG = (poseKey) => metricPanelSVG(poseKey, []);

/** Vue de dessus seule (glossaire) : bassin gris, épaules en jaune. */
export const topFigure = (angle, label) => `${svgOpen} role="img" aria-label="Vue de dessus">${topPanelFull({ top: { good: angle, bad: angle }, topLabel: label }, false)}</svg>`;
