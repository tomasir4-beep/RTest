// Moteur tactique à règles : questionnaire (joueur / adversaire / conditions) → plan de jeu + schémas.
// Approche explicable : chaque schéma reçoit un score et des raisons lisibles (pas de boîte noire).

export const STYLES = {
  attaquant: "Attaquant de fond de court : prend la balle tôt, cherche à dicter l'échange, accepte le risque.",
  contreur: "Contreur : utilise la vitesse adverse, défend bien et contre-attaque dans les pieds.",
  limeur: "Limeur : coupe (slice), « chope » toutes les balles et vous laisse faire la faute.",
  rameur: "Rameur : ramène toutes les balles, il faut le « bousculer » ; il vous laisse faire la faute.",
  sv: "Serveur-volleyeur / joueur de filet : écourte les points, service puis montée.",
  complet: "Polyvalent : sait varier les rythmes et les placements.",
};

const opt = (arr) => arr.map(([value, label]) => ({ value, label }));
const STYLE_OPTS = [["attaquant", "Attaquant de fond de court — prend la balle tôt, dicte l'échange"], ["contreur", "Contreur — utilise votre vitesse, contre-attaque"], ["limeur", "Limeur — coupe (slice), prend toutes les balles, attend la faute"], ["rameur", "Rameur — ramène tout, à bousculer, attend la faute"], ["sv", "Serveur-volleyeur / filet"], ["complet", "Polyvalent / inconnu"]];

export const QUESTIONS = [
  { section: "Moi (joueur)", items: [
    { id: "p_style", label: "Mon style de jeu", type: "radio", options: opt(STYLE_OPTS), def: "complet" },
    { id: "p_hand", label: "Je suis", type: "radio", options: opt([["right", "Droitier"], ["left", "Gaucher"]]), def: "right" },
    { id: "p_bh", label: "Mon revers", type: "radio", options: opt([["2", "À 2 mains"], ["1", "À 1 main"]]), def: "2" },
    { id: "p_level", label: "Niveau actuel", type: "select", options: opt([["debutant", "Débutant / non classé"], ["s4", "4e série"], ["s3", "3e série"], ["s2", "2e série"], ["s1", "1re série ou +"]]), def: "s3" },
    { id: "p_weapon", label: "Mes armes (plusieurs choix)", type: "multi", options: opt([["serve", "Service"], ["fh", "Coup droit"], ["bh", "Revers"], ["volley", "Volée / filet"], ["return", "Retour"], ["defense", "Défense / physique"]]), def: ["fh"] },
    { id: "p_weak", label: "Mes points faibles (plusieurs choix)", type: "multi", options: opt([["serve2", "2e service"], ["bh", "Revers"], ["fh", "Coup droit"], ["volley", "Volée / filet"], ["move", "Déplacement"], ["mental", "Mental / pression"], ["fitness", "Endurance"]]), def: [] },
    { id: "p_serve1", label: "Pourcentage de 1res balles", type: "select", options: opt([["low", "Faible (< 50 %)"], ["mid", "Moyen (50–62 %)"], ["high", "Bon (> 62 %)"]]), def: "mid" },
    { id: "p_serve2", label: "Mon 2e service", type: "select", options: opt([["flat", "Plat / poussé"], ["slice", "Slicé"], ["kick", "Lifté / kické"], ["weak", "Peu fiable"]]), def: "slice" },
    { id: "p_net", label: "Aisance au filet", type: "select", options: opt([["low", "Faible"], ["mid", "Moyenne"], ["high", "Forte"]]), def: "mid" },
    { id: "p_fit", label: "Condition physique", type: "select", options: opt([["low", "Moyenne"], ["mid", "Bonne"], ["high", "Excellente"]]), def: "mid" },
  ] },
  { section: "Adversaire", items: [
    { id: "o_style", label: "Style de l'adversaire", type: "radio", options: opt(STYLE_OPTS), def: "complet" },
    { id: "o_hand", label: "Il / elle est", type: "radio", options: opt([["right", "Droitier(e)"], ["left", "Gaucher(ère)"]]), def: "right" },
    { id: "o_bh", label: "Son revers", type: "radio", options: opt([["2", "À 2 mains"], ["1", "À 1 main"], ["slice", "Surtout en slice"], ["unknown", "Je ne sais pas"]]), def: "unknown" },
    { id: "o_like", label: "Ce qu'il / elle AIME (plusieurs choix)", type: "multi", options: opt([["fast", "Rythme rapide, balles à plat"], ["heavy", "Balles lourdes et liftées"], ["short", "Balles courtes à attaquer"], ["slice", "Jouer en slice"], ["net", "Monter au filet"], ["fhinout", "Coup droit inside-out"], ["cross", "Échanges croisés"], ["dtl", "Long de ligne"], ["drop", "Amorties"], ["lob", "Lobs"], ["return", "Retourner fort"]]), def: [] },
    { id: "o_dislike", label: "Ce qu'il / elle N'AIME PAS (plusieurs choix)", type: "multi", options: opt([["high", "Balles hautes (lift) surtout au revers"], ["low", "Balles basses / slice"], ["short", "Balles courtes / amorties"], ["fast", "Rythme rapide, balles plates"], ["body", "Balles au corps"], ["pace", "Changements de rythme"], ["net", "Un joueur qui monte au filet"], ["lob", "Lobs"], ["long", "Balles profondes"], ["move", "Être déplacé latéralement"], ["kick", "Service kické"]]), def: [] },
    { id: "o_react", label: "Son comportement sous pression", type: "radio", options: opt([["passive", "Passif : renvoie tout, attend la faute"], ["risk", "Prend des risques, accélère"], ["net", "Monte au filet"], ["fight", "S'accroche, joue plus fort"], ["unknown", "Je ne sais pas"]]), def: "unknown" },
    { id: "o_pos", label: "Sa position au retour / fond de court", type: "radio", options: opt([["deep", "Loin derrière la ligne"], ["line", "Sur la ligne"], ["in", "Dans le terrain, prend tôt"], ["unknown", "Je ne sais pas"]]), def: "unknown" },
    { id: "o_weak", label: "Faiblesses repérées (plusieurs choix)", type: "multi", options: opt([["bh", "Revers"], ["fh", "Coup droit"], ["volley", "Volée / filet"], ["passing", "Passing"], ["serve2", "2e service"], ["mental", "Craque sous pression"], ["fitness", "Endurance"]]), def: [] },
    { id: "o_serve", label: "Son service", type: "select", options: opt([["big", "Gros service"], ["mid", "Moyen"], ["weak", "Faible"]]), def: "mid" },
    { id: "o_pace", label: "Rythme préféré", type: "select", options: opt([["fast", "Rapide (aime la vitesse)"], ["slow", "Lent / balles molles"], ["none", "Indifférent"]]), def: "none" },
    { id: "o_net", label: "Va-t-il / elle au filet ?", type: "select", options: opt([["low", "Rarement"], ["mid", "Parfois"], ["high", "Souvent"]]), def: "low" },
    { id: "o_move", label: "Mobilité de l'adversaire", type: "select", options: opt([["good", "Très mobile"], ["mid", "Correcte"], ["limited", "Limitée"]]), def: "mid" },
  ] },
  { section: "Conditions & contexte", items: [
    { id: "c_mode", label: "Format", type: "radio", options: opt([["single", "Simple"], ["double", "Double"]]), def: "single" },
    { id: "c_surface", label: "Surface", type: "radio", options: opt([["terre", "Terre battue"], ["dur_rapide", "Dur rapide"], ["dur_lent", "Dur lent / résine"], ["gazon", "Gazon"], ["indoor", "Indoor (moquette / parquet)"]]), def: "dur_lent" },
    { id: "c_wind", label: "Vent", type: "select", options: opt([["none", "Aucun"], ["face", "De face (il me souffle dessus)"], ["back", "Dans le dos"], ["cross", "De travers"]]), def: "none" },
    { id: "c_sun", label: "Soleil gênant", type: "select", options: opt([["no", "Non"], ["yes", "Oui"]]), def: "no" },
    { id: "c_heat", label: "Température", type: "select", options: opt([["cool", "Fraîche"], ["normal", "Normale"], ["hot", "Chaude (> 28 °C)"]]), def: "normal" },
    { id: "c_balls", label: "Balles", type: "select", options: opt([["new", "Neuves"], ["worn", "Usées"]]), def: "new" },
    { id: "c_alt", label: "Altitude", type: "select", options: opt([["normal", "Normale"], ["high", "Altitude (> 1000 m)"]]), def: "normal" },
  ] },
];

export function defaultAnswers() {
  const a = {};
  for (const s of QUESTIONS) for (const q of s.items) a[q.id] = Array.isArray(q.def) ? [...q.def] : q.def;
  return a;
}

// --- Schémas de jeu ------------------------------------------------------------------------------------
// Coordonnées : x 0 (gauche) → 1 (droite) vu de ma ligne de fond, y 0 = ma ligne de fond, 1 = fond adverse.
// Les schémas sont écrits pour un joueur DROITIER ; ils sont symétrisés pour un gaucher.
const m = (x1, y1, x2, y2, label) => ({ who: "me", x1, y1, x2, y2, label });
const o = (x1, y1, x2, y2, label) => ({ who: "opp", x1, y1, x2, y2, label });
const has = (a, v) => Array.isArray(a) && a.includes(v);
// « Faiblesse » = cochée dans « faiblesses » OU dans « n'aime pas » (correspondance d'identifiants).
const WKMAP = { highball: "high", lowball: "low", short: "short", lateral: "move" };
const wk = (A, id) => has(A.o_weak, id) || has(A.o_dislike, WKMAP[id]);
const like = (A, id) => has(A.o_like, id);
const dislike = (A, id) => has(A.o_dislike, id);
const level = (P) => ({ debutant: 0, s4: 1, s3: 2, s2: 3, s1: 4 }[P.p_level] ?? 2);

function mk(base) {
  const acc = { s: 0, why: [] };
  return {
    add(cond, pts, text) { if (cond) { acc.s += pts; if (text) acc.why.push(text); } return this; },
    done() { return { score: base + acc.s, why: acc.why }; },
  };
}

export const PATTERNS = [
  // ----- SERVICE
  { id: "sv_T_open", phase: "Service", name: "Service au T, puis ouvrir le court",
    desc: "1re balle au T (côté égalité), le retour est souvent court ou au centre : frappez le coup droit dans le grand côté ouvert.",
    steps: [m(0.62, 0, 0.47, 0.68, "1 Service T"), o(0.38, 1, 0.5, 0.06, "2 Retour"), m(0.5, 0.06, 0.12, 0.92, "3 CD croisé ouvert")],
    fit: (P, O, C) => mk(3).add(has(P.p_weapon, "fh"), 2, "Votre coup droit est une arme pour finir la balle ouverte.").add(P.p_serve1 === "high", 1, "Bon pourcentage de 1res balles : vous pouvez viser les lignes.").add(wk(O, "lateral"), 1, "L'adversaire se déplace mal latéralement.").done() },
  { id: "sv_wide_slice", phase: "Service", name: "Service excentré (slice) puis attaque",
    desc: "Service slicé très ouvert pour sortir l'adversaire du court, puis balle dans le grand côté libre.",
    steps: [m(0.38, 0, 0.98, 0.66, "1 Service slicé ouvert"), o(0.9, 1, 0.65, 0.1, "2 Retour"), m(0.65, 0.1, 0.2, 0.95, "3 Frappe à contre-pied")],
    fit: (P, O, C) => mk(2).add(["terre", "gazon"].includes(C.c_surface), 1, "Le slice glisse et reste bas sur cette surface.").add(wk(O, "lateral") || O.o_move === "limited", 3, "Adversaire peu mobile latéralement.").add(wk(O, "lowball"), 2, "Il est gêné par les balles basses / slicées.").add(P.p_serve2 === "slice", 1, "Votre slice est fiable.").done() },
  { id: "sv_body", phase: "Service", name: "Service au corps",
    desc: "Service au corps pour empêcher l'armé du retour et gêner un adversaire qui prend la balle tôt.",
    steps: [m(0.62, 0, 0.35, 0.62, "1 Service au corps"), o(0.4, 1, 0.6, 0.15, "2 Retour contraint"), m(0.6, 0.15, 0.2, 0.9, "3 Attaque")],
    fit: (P, O, C) => mk(1).add(O.o_style === "attaquant" || O.o_pace === "fast", 3, "L'adversaire aime prendre la balle tôt et vite.").add(C.c_wind === "cross", 2, "Vent de travers : un service plus central limite les risques.").add(dislike(O, "body"), 3, "Il est gêné par les balles au corps.").add(O.o_serve === "weak", 0).done() },
  { id: "sv_kick_bh", phase: "Service", name: "Kick au revers (2e service)",
    desc: "2e service lifté haut au revers adverse : la balle monte au-dessus de l'épaule et rend le retour difficile.",
    steps: [m(0.38, 0, 0.9, 0.68, "1 Kick côté avantage"), o(0.9, 1, 0.5, 0.12, "2 Retour haut"), m(0.5, 0.12, 0.5, 0.85, "3 Balle profonde au centre")],
    fit: (P, O, C) => mk(1).add(P.p_serve2 === "kick", 3, "Vous avez un bon kick.").add(dislike(O, "kick"), 3, "Il n'aime pas le service kické.").add(C.c_surface === "terre", 2, "Le kick saute beaucoup sur terre battue.").add(wk(O, "highball") || wk(O, "bh"), 3, "Revers et/ou balles hautes sont ses points faibles.").add(P.p_weak.includes("serve2"), 1, "Un 2e service lifté est plus sûr (marge au-dessus du filet).").done() },
  { id: "sv_serve_volley", phase: "Service", name: "Service-volée",
    desc: "Service puis montée sur la 2e balle : écourtez le point si l'adversaire retourne court ou lentement.",
    steps: [m(0.62, 0, 0.45, 0.67, "1 Service T"), m(0.62, 0, 0.55, 0.48, "2 Montée"), o(0.4, 1, 0.5, 0.2, "Retour"), m(0.55, 0.48, 0.15, 0.8, "3 Volée croisée")],
    fit: (P, O, C) => mk(0).add(P.p_style === "sv", 4, "C'est votre style naturel.").add(["gazon", "indoor", "dur_rapide"].includes(C.c_surface), 2, "La surface rapide favorise la montée.").add(P.p_net === "high", 2, "Vous êtes à l'aise au filet.").add(wk(O, "passing") || O.o_pace === "slow", 2, "Il a du mal à passer / joue lentement.").add(P.p_net === "low", -4).done() },
  // ----- RETOUR
  { id: "ret_deep_middle", phase: "Retour", name: "Retour profond au centre",
    desc: "Retour de sécurité, profond et au centre : supprime les angles, donne du temps pour se replacer.",
    steps: [o(0.55, 0, 0.4, 1, "Service adverse"), m(0.4, 1, 0.5, 0.88, "Retour profond centre")],
    fit: (P, O, C) => mk(2).add(O.o_serve === "big", 3, "Gros service : priorité à la mise en jeu.").add(level(P) <= 1, 1, "Priorité à la régularité à ce niveau.").add(P.p_weapon.includes("return"), -1).done() },
  { id: "ret_block_cross", phase: "Retour", name: "Retour bloqué croisé",
    desc: "Retour court et compact (peu de backswing) en croisé : idéal contre un service rapide.",
    steps: [o(0.55, 0, 0.35, 1, "Service rapide"), m(0.35, 1, 0.85, 0.5, "Retour bloqué croisé bas")],
    fit: (P, O, C) => mk(1).add(O.o_serve === "big", 3, "Contre un gros service, bloquer évite les retards.").add(["dur_rapide", "gazon", "indoor"].includes(C.c_surface), 2, "Surface rapide : la balle vous arrive tôt.").done() },
  { id: "ret_step_in", phase: "Retour", name: "Retour agressif sur 2e service (step-in)",
    desc: "Avancez d'1 à 2 mètres et frappez le retour dans la zone profonde : le 2e service est une opportunité.",
    steps: [o(0.55, 0, 0.38, 0.9, "2e service"), m(0.38, 1.0, 0.55, 0.85, "Avance + retour profond")],
    fit: (P, O, C) => mk(1).add(O.o_serve !== "big", 3, "Son service ne vous met pas en difficulté.").add(wk(O, "serve2"), 3, "Son 2e service est une faiblesse.").add(P.p_style === "attaquant", 2, "Style offensif.").add(P.p_weapon.includes("return"), 2, "Le retour est une de vos armes.").done() },
  { id: "ret_chip_charge", phase: "Retour", name: "Retour slicé + montée",
    desc: "Retour slicé bas aux pieds de l'adversaire puis montée au filet pour ne pas lui laisser le temps.",
    steps: [o(0.55, 0, 0.4, 1, "2e service"), m(0.4, 1, 0.55, 0.8, "Retour slicé"), m(0.4, 1, 0.5, 0.5, "Montée")],
    fit: (P, O, C) => mk(0).add(P.p_net === "high", 3, "Vous êtes à l'aise au filet.").add(["gazon", "indoor", "dur_rapide"].includes(C.c_surface), 2).add(wk(O, "lowball"), 3, "Il est gêné par les balles basses.").add(P.p_net === "low", -4).done() },
  // ----- ÉCHANGE
  { id: "ry_cross_bh", phase: "Échange", name: "Cross de revers, changement de ligne sur balle courte",
    desc: "Échangez en croisé (zone la plus longue, filet plus bas) et ne changez de ligne que sur une balle courte.",
    steps: [m(0.2, 0, 0.82, 0.95, "1 Croisé"), o(0.82, 1, 0.2, 0.05, "2 Retour croisé"), m(0.2, 0.05, 0.9, 0.95, "3 Croisé profond"), o(0.9, 1, 0.55, 0.45, "4 Balle courte"), m(0.55, 0.45, 0.1, 0.95, "5 Long de ligne")],
    fit: (P, O, C) => mk(2).add(["limeur", "contreur", "complet", "rameur"].includes(P.p_style), 2, "Cohérent avec votre jeu régulier.").add(level(P) <= 2, 1, "Priorité à la sécurité du croisé.").add(C.c_surface === "terre", 1, "Sur terre les rallyes sont plus longs.").done() },
  { id: "ry_inside_out", phase: "Échange", name: "Coup droit inside-out",
    desc: "Contournez le revers pour jouer le coup droit en diagonale vers le revers adverse : votre meilleure arme dicte le point.",
    steps: [m(0.3, 0, 0.9, 0.95, "1 CD inside-out"), o(0.9, 1, 0.75, 0.1, "2 Retour"), m(0.4, 0.05, 0.1, 0.9, "3 CD inside-in")],
    fit: (P, O, C) => mk(1).add(has(P.p_weapon, "fh") && P.p_style === "attaquant", 4, "Coup droit = arme, style offensif.").add(has(P.p_weapon, "fh"), 1).add(wk(O, "bh"), 2, "Son revers est vulnérable (si droitier).").add(P.p_weak.includes("bh"), 1, "Contourner protège votre revers.").done() },
  { id: "ry_high_cross", phase: "Échange", name: "Balle haute croisée sur le revers adverse",
    desc: "Balle lourde et haute en croisé qui monte au-dessus de l'épaule : le revers (surtout à 1 main) perd en puissance.",
    steps: [m(0.8, 0, 0.18, 0.93, "1 Lift haut sur le revers"), o(0.18, 1, 0.5, 0.1, "2 Retour faible"), m(0.5, 0.1, 0.9, 0.9, "3 Attaque coup droit")],
    fit: (P, O, C) => mk(1).add(wk(O, "highball"), 3, "Il est gêné par les balles hautes.").add(wk(O, "bh"), 2, "Revers adverse faible.").add(["limeur", "rameur"].includes(P.p_style), 2, "Jeu lourd cohérent avec votre style.").add(C.c_surface === "terre", 2, "La terre rend la balle haute plus efficace.").add(C.c_alt === "high", 1, "Altitude : plus de lift pour contrôler la profondeur.").done() },
  { id: "ry_short_drop", phase: "Échange", name: "Balle profonde puis amortie / angle court",
    desc: "Fixez l'adversaire derrière la ligne avec des balles profondes, puis jouez une amortie ou un angle court croisé.",
    steps: [m(0.2, 0, 0.7, 0.97, "1 Balle profonde"), o(0.7, 1, 0.3, 0.05, "2 Retour reculé"), m(0.3, 0.05, 0.85, 0.58, "3 Amortie / angle court")],
    fit: (P, O, C) => mk(0).add(O.o_move === "limited" || wk(O, "lateral"), 3, "Sa mobilité est limitée.").add(wk(O, "short"), 3, "Il gère mal les balles courtes.").add(C.c_surface === "terre", 2, "La terre facilite l'amortie (rebond mort).").add(O.o_style === "limeur" || O.o_style === "rameur", 3, "Il faut bousculer ce type de joueur : l'amortie l'oblige à avancer et casse son rythme.").add(O.o_pos === "deep", 3, "Il joue très en retrait.").done() },
  { id: "ry_push_open", phase: "Échange", name: "Bousculer : ouvrir le court puis monter",
    desc: "Contre un joueur qui ramène tout : angle croisé court pour l'étirer, approche sur la balle faible, volée dans l'espace libre. Ne cherchez pas le gagnant direct.",
    steps: [m(0.25, 0, 0.88, 0.6, "1 Angle croisé court"), o(0.88, 1, 0.5, 0.1, "2 Balle défensive"), m(0.5, 0.15, 0.2, 0.9, "3 Approche profonde"), m(0.2, 0.5, 0.85, 0.75, "4 Volée ouverte")],
    fit: (P, O, C) => mk(0).add(O.o_style === "rameur" || O.o_style === "limeur", 5, "Il ramène tout : il faut le bousculer, pas attendre qu'il craque.").add(O.o_react === "passive", 2, "Il attend la faute.").add(P.p_net !== "low", 2, "Vous êtes à l'aise pour conclure au filet.").add(wk(O, "short"), 2, "Il est gêné par les balles courtes.").add(P.p_net === "low", -2).done() },
  { id: "ry_lift_vs_slice", phase: "Échange", name: "Relever le slice et accélérer sur la balle courte",
    desc: "Contre un limeur : fléchissez, relevez le slice bas avec un lift lourd et profond (au revers), puis attaquez la première balle courte et montez.",
    steps: [o(0.8, 1, 0.3, 0.1, "1 Slice bas adverse"), m(0.3, 0.05, 0.75, 0.95, "2 Lift lourd et profond"), o(0.75, 1, 0.35, 0.3, "3 Slice court"), m(0.35, 0.3, 0.1, 0.9, "4 Attaque long de ligne + montée")],
    fit: (P, O, C) => mk(0).add(O.o_style === "limeur", 5, "Il coupe toutes les balles : relevez et accélérez.").add(like(O, "slice") || O.o_bh === "slice", 2, "Il joue beaucoup en slice.").add(dislike(O, "high"), 2, "Il n'aime pas les balles hautes.").add(P.p_net !== "low", 1).done() },
  { id: "ry_counter_dtl", phase: "Échange", name: "Contre-attaque long de ligne",
    desc: "Sur une balle rapide du fond, utilisez sa vitesse : contre-attaque long de ligne ou croisé court, puis retour au centre.",
    steps: [o(0.2, 1, 0.8, 0.1, "1 Balle rapide adverse"), m(0.8, 0.05, 0.92, 0.95, "2 Contre long de ligne"), o(0.92, 1, 0.5, 0.2, "3 Retour"), m(0.5, 0.1, 0.1, 0.9, "4 Coup gagnant")],
    fit: (P, O, C) => mk(0).add(P.p_style === "contreur", 4, "Style contreur.").add(O.o_pace === "fast" || like(O, "fast"), 3, "Il envoie de la vitesse que vous pouvez utiliser.").add(O.o_style === "attaquant", 2, "Vous jouez à contre-courant.").done() },
  { id: "ry_reset_middle", phase: "Échange", name: "Jouer au centre pour se replacer",
    desc: "Quand vous êtes en difficulté ou sous pression, jouez haut et profond au centre pour reprendre l'initiative.",
    steps: [o(0.15, 1, 0.85, 0.05, "1 Balle qui vous pousse"), m(0.85, 0.05, 0.5, 0.9, "2 Balle haute au centre"), o(0.5, 1, 0.55, 0.1, "3 Retour neutre"), m(0.5, 0.0, 0.5, 0.95, "4 Reprise du point")],
    fit: (P, O, C) => mk(2).add(level(P) <= 1, 2, "Fiabilité avant tout à ce niveau.").add(P.p_style === "limeur", 2, "Style régulier.").add(P.p_weak.includes("mental"), 2, "Aide en moments de pression.").add(C.c_wind !== "none", 1, "Vent : réduire les risques.").done() },
  { id: "ry_slice_change", phase: "Échange", name: "Slice bas pour casser le rythme",
    desc: "Alternez un slice bas et lent avec le lift pour empêcher l'adversaire de prendre confiance et de régler son timing.",
    steps: [m(0.2, 0, 0.82, 0.93, "1 Slice bas"), o(0.82, 1, 0.3, 0.1, "2 Balle molle"), m(0.3, 0.1, 0.9, 0.92, "3 Accélération lift")],
    fit: (P, O, C) => mk(1).add(O.o_style === "attaquant" || O.o_pace === "fast" || like(O, "fast"), 4, "Il aime le rythme : ralentissez-le.").add(dislike(O, "pace"), 2, "Il n'aime pas les changements de rythme.").add(O.o_style === "limeur", -3, "Un limeur coupe mieux que vous : ne rentrez pas dans son jeu.").add(wk(O, "lowball"), 3, "Balles basses = point faible.").add(["gazon", "dur_rapide"].includes(C.c_surface), 1, "Le slice glisse sur cette surface.").add(O.o_pace === "slow", -2).done() },
  { id: "ry_moonball", phase: "Échange", name: "Balles hautes et profondes pour fatiguer",
    desc: "Balles hautes et profondes au revers adverse pour l'obliger à reculer et puiser dans son physique, puis attaque sur la balle courte.",
    steps: [m(0.5, 0, 0.3, 0.97, "1 Lob profond"), o(0.3, 1, 0.6, 0.1, "2 Retour"), m(0.6, 0.05, 0.4, 0.97, "3 Reprise")],
    fit: (P, O, C) => mk(0).add(["limeur", "rameur", "contreur"].includes(P.p_style), 2, "Cohérent avec votre jeu.").add(P.p_fit === "high", 2, "Vous avez le physique pour des échanges longs.").add(wk(O, "highball"), 3, "Il est gêné par les balles hautes.").add(wk(O, "fitness"), 2, "Son endurance est limitée.").add(O.o_style === "rameur", -3, "Il renvoie toutes les balles : les balles hautes ne le font pas craquer.").add(C.c_heat === "hot", 1, "Chaleur : l'usure physique compte.").add(C.c_wind === "back", -3, "Vent dans le dos : risque de long.").done() },
  // ----- FILET
  { id: "net_approach", phase: "Filet", name: "Approche long de ligne + volée croisée",
    desc: "Sur une balle courte, approche profonde long de ligne, puis volée croisée dans le grand angle ouvert.",
    steps: [o(0.4, 1, 0.5, 0.35, "1 Balle courte"), m(0.5, 0.35, 0.92, 0.9, "2 Approche long de ligne"), o(0.92, 1, 0.55, 0.2, "3 Passing"), m(0.85, 0.5, 0.2, 0.8, "4 Volée croisée")],
    fit: (P, O, C) => mk(1).add(P.p_net !== "low", 2, "Vous êtes à l'aise sur les 2 premiers coups.").add(wk(O, "passing"), 3, "Son passing est faible.").add(["dur_rapide", "indoor", "gazon"].includes(C.c_surface), 1).add(wk(O, "short"), 2).add(P.p_net === "low", -3).done() },
  { id: "net_pass_lob", phase: "Filet", name: "Passing croisé / lob contre un joueur de filet",
    desc: "Contre un adversaire qui monte : passing croisé bas (aux pieds) puis lob de variation pour le faire reculer.",
    steps: [o(0.4, 0.5, 0.6, 0.45, "1 Montée adverse"), m(0.8, 0, 0.2, 0.55, "2 Passing croisé bas"), m(0.8, 0, 0.3, 0.98, "3 Lob de variation")],
    fit: (P, O, C) => mk(0).add(O.o_net === "high" || like(O, "net"), 4, "Il monte souvent au filet.").add(O.o_style === "sv", 3, "Serveur-volleyeur : retours bas et lobs.").add(C.c_sun === "yes", 1, "Le soleil peut gêner ses smashs.").add(C.c_wind === "face", -2, "Vent de face : lob plus difficile à doser.").done() },
  // ----- DOUBLE
  { id: "db_return_low", phase: "Double", dbl: true, name: "Retour croisé bas aux pieds du serveur",
    desc: "Retour croisé bas : le serveur-volleyeur doit volleyer vers le haut et le partenaire reste hors-jeu.",
    steps: [o(0.55, 0, 0.35, 1, "Service"), m(0.35, 1, 0.65, 0.55, "Retour croisé bas")],
    fit: (P, O, C) => mk(3).add(C.c_mode === "double", 1).done() },
  { id: "db_lob_reset", phase: "Double", dbl: true, name: "Lob par-dessus le volleyeur",
    desc: "Si les deux adversaires sont au filet : lob croisé pour les faire reculer et casser la formation.",
    steps: [m(0.3, 0, 0.7, 0.98, "Lob croisé"), o(0.5, 0.6, 0.7, 1.0, "Recul adverse")],
    fit: (P, O, C) => mk(2).add(O.o_net === "high", 2).add(C.c_wind !== "face", 1).done() },
  { id: "db_poach", phase: "Double", dbl: true, name: "Poach (volée croisée au centre)",
    desc: "Le partenaire au filet croise sur le retour adverse : annoncez le signal avant le service.",
    steps: [m(0.62, 0, 0.45, 0.66, "Service T"), o(0.4, 1, 0.45, 0.3, "Retour croisé"), m(0.2, 0.5, 0.6, 0.78, "Poach volée")],
    fit: (P, O, C) => mk(2).add(P.p_net !== "low", 2).add(P.p_style === "sv", 2).done() },
  { id: "db_middle", phase: "Double", dbl: true, name: "Frapper entre les adversaires (centre)",
    desc: "Visez le milieu du terrain entre les deux adversaires : crée de l'hésitation (« à toi ! ») et réduit l'angle adverse.",
    steps: [m(0.5, 0, 0.5, 0.9, "Balle au milieu"), o(0.3, 1, 0.5, 0.3, "Hésitation")],
    fit: (P, O, C) => mk(3).add(wk(O, "lateral"), 1).done() },
];

// --- Moteur ------------------------------------------------------------------------------------------------
const label = (list, id) => ((list.find((x) => x.value === id) || {}).label || id).split(" — ")[0];

export function buildPlan(A) {
  const P = A, O = A, C = A;
  const dbl = A.c_mode === "double";
  const rank = (phase, n, min = 3) => PATTERNS.filter((p) => p.phase === phase && !!p.dbl === dbl)
    .map((p) => ({ p, ...p.fit(P, O, C) })).filter((x) => x.score >= min).sort((a, b) => b.score - a.score).slice(0, n);
  const patterns = dbl ? rank("Double", 4, 3) : [...rank("Service", 2, 3), ...rank("Retour", 2, 3), ...rank("Échange", 3, 3), ...rank("Filet", 1, 4)];

  const principles = [], serve = [], ret = [], rally = [], cond = [], situ = [], avoid = [], check = [];
  const surf = A.c_surface;

  // Principes généraux selon le style adverse
  const ov = {
    attaquant: ["Il aime frapper tôt : donnez-lui de la hauteur, de la profondeur et du slice bas.", "Évitez les balles courtes et à mi-hauteur : elles lui permettent de dicter."],
    contreur: ["Ne lui donnez pas de vitesse : il en profite. Construisez le point en 2–3 coups puis finissez au filet ou à contre-pied.", "Variez les hauteurs et les rotations pour casser son rythme."],
    limeur: ["Limeur : il coupe, chope toutes les balles et attend que vous fassiez la faute. N'entrez pas dans son jeu : ne cherchez pas à le battre avec des coups gagnants prématurés.", "Son slice reste bas : fléchissez les jambes, relevez la balle avec du lift et de la profondeur, puis accélérez sur la première balle courte (approche + volée).", "Jouez en sécurité sur 3 balles sur 4 et gardez un 'plan B' pour terminer le point : montée au filet, balle au corps, changement de rythme."],
    rameur: ["Rameur : il ramène toutes les balles et ne fera la faute que si vous le laissez faire. Il faut le bousculer : angles, profondeur, rythme qui change, montée au filet.", "Ne tentez pas de gagner le point en un seul coup : ouvrez le court (croisé court, angle), puis finissez dans l'espace libre ou au filet.", "Restez patient et régulier : ne lui offrez pas de faute directe ; jouez 70 % de vos balles dans le court et attaquez sur la première balle faible."],
    sv: ["Retours bas aux pieds, slice et lobs ; montez sur le 2e service pour mettre la pression.", "Variez vos retours pour ne pas lui laisser une volée facile."],
    complet: ["Observez les 3 premiers jeux pour repérer sa balle préférée, puis ciblez systématiquement son point faible."],
  };
  principles.push(...(ov[A.o_style] || []));
  if (A.p_style === "attaquant") principles.push("Votre style : restez agressif mais gardez une marge (3 balles sur 4 dans le terrain) ; ouvrez le court puis finissez.");
  if (A.p_style === "contreur") principles.push("Votre style : laissez venir, jouez bas dans les pieds et contre-attaquez dès que la balle est molle ou courte.");
  if (A.p_style === "limeur") principles.push("Votre style (limeur) : votre slice et votre régularité sont des armes, mais contre un adversaire plus solide gardez un 'plan B' (montée, amortie) pour ne pas attendre sa faute.");
  if (A.p_style === "rameur") principles.push("Votre style (rameur) : vous ramenez toutes les balles ; ajoutez une accélération contrôlée et un jeu de filet pour ne pas dépendre de la faute adverse.");
  if (A.p_style === "sv") principles.push("Votre style : enchaînez service + 1re volée ; gardez un retour solide pour ne pas être mis en difficulté.");
  if (A.o_weak.includes("bh")) principles.push("Ciblez son revers (croisé lifté, haut) pour provoquer un coup court ou en défense.");
  if (A.o_weak.includes("mental")) principles.push("Il craque sous pression : jouez les points importants avec le maximum de balles dans le court.");
  // Goûts et dégoûts de l'adversaire
  if (like(A, "fast")) principles.push("Il aime le rythme rapide : ne lui donnez pas de vitesse, jouez plus lent et plus haut ou slicez bas.");
  if (like(A, "heavy")) principles.push("Il aime les balles lourdes et liftées : coupez ou jouez bas et plat, ne lui donnez pas de balle à hauteur d'épaule.");
  if (like(A, "short")) principles.push("Il aime attaquer les balles courtes : gardez de la profondeur et ne laissez pas retomber la balle à mi-court.");
  if (like(A, "net")) principles.push("Il aime monter au filet : jouez des retours bas aux pieds, des passings croisés et des lobs de variation.");
  if (like(A, "fhinout")) principles.push("Il aime l'inside-out coup droit : couvrez le revers côté centre et recentrez-vous vite, ou jouez sur son revers pour l'empêcher de contourner.");
  if (like(A, "cross")) principles.push("Il est à l'aise en croisé : changez de ligne tôt (long de ligne) sur une balle courte pour casser son rythme.");
  if (like(A, "dtl")) principles.push("Il aime le long de ligne : restez à l'affût du changement de direction après vos balles croisées.");
  if (like(A, "slice")) principles.push("Il utilise souvent le slice : avancez sur la balle basse et relevez-la avec de la profondeur.");
  if (like(A, "drop")) principles.push("Il joue des amorties : restez à 1 mètre derrière la ligne et prêt à avancer ; ciblez la balle courte.");
  if (like(A, "lob")) principles.push("Il lobbe : gardez la distance de smash et ne montez pas trop près du filet.");
  if (dislike(A, "high")) principles.push("Il n'aime pas les balles hautes : jouez lift haut et profond, surtout sur son revers.");
  if (dislike(A, "low")) principles.push("Il n'aime pas les balles basses : slicez et jouez dans ses pieds, notamment sur 2e service et retours.");
  if (dislike(A, "short")) principles.push("Il gère mal les balles courtes et amorties : variez avec une amortie ou un angle court après une balle profonde.");
  if (dislike(A, "fast")) principles.push("Il n'aime pas le rythme rapide : accélérez avec des balles plates et prenez la balle tôt.");
  if (dislike(A, "body")) principles.push("Il est gêné par les balles au corps : servez et jouez au corps sur les points importants.");
  if (dislike(A, "pace")) principles.push("Il souffre des changements de rythme : alternez slice lent, lift lourd et accélération plate.");
  if (dislike(A, "net")) principles.push("Il n'aime pas qu'on monte au filet : approchez sur balle courte et fermez le point à la volée.");
  if (dislike(A, "lob")) principles.push("Il a du mal sur les lobs : variez avec un lob défensif ou d'attaque quand il est collé au filet.");
  if (dislike(A, "long")) principles.push("Il n'aime pas les balles profondes : jouez-les près de la ligne pour l'obliger à reculer.");
  if (dislike(A, "move")) principles.push("Il n'aime pas être déplacé : jouez un côté puis l'autre, croisé puis long de ligne.");
  if (A.o_react === "passive") principles.push("Il attend la faute : ne forcez pas, mais ne jouez pas non plus un rallye infini ; fixez-vous 1 changement de rythme tous les 5 coups.");
  if (A.o_react === "risk") principles.push("Il prend des risques sous pression : restez régulier sur les points importants, il fera la faute.");
  if (A.o_react === "net") principles.push("Il monte quand il est pressé : préparez le passing croisé ou le lob.");
  if (A.o_react === "fight") principles.push("Il s'accroche et hausse son niveau : commencez à imposer votre jeu dès les premiers jeux et gardez le contrôle du rythme.");
  if (A.o_pos === "deep") principles.push("Il joue très en retrait : amortie, balle courte et montée pour l'obliger à avancer.");
  if (A.o_pos === "in") principles.push("Il prend la balle tôt : haut et profond, évitez le plat au centre.");
  if (A.o_bh === "1") principles.push("Revers à 1 main : balles hautes et lourdes sur son revers (au-dessus de l'épaule), puis jouez dans l'espace libre.");
  if (A.o_bh === "slice") principles.push("Revers slicé : il ne peut pas accélérer ; montez sur sa balle courte et jouez-lui des balles hautes pour qu'il ne puisse pas couper.");
  if (A.o_hand === "left") principles.push("Adversaire gaucher : le service slicé extérieur (côté égalité) sort plus du court pour un droitier ; sur le revers lifté croisé, visez son coup droit haut et lourd avec prudence.");

  // Service
  if (A.p_serve1 === "low") serve.push("1res balles < 50 % : réduisez la puissance (80 %) pour viser 60 % ; priorité à la zone.");
  if (A.p_serve2 === "weak") serve.push("2e service fragile : kick ou slice à 70–75 % de la puissance, 3 m de marge au-dessus du filet, visez le revers.");
  if (A.p_serve2 === "kick") serve.push("2e service kick : utilisez-le comme 'service d'attaque' sur son revers, surtout si l'adversaire reste en retrait.");
  if (A.o_style === "attaquant") serve.push("Variez : T, ouvert et au corps ; ne pas servir 3 fois au même endroit.");
  if (A.o_weak.includes("bh")) serve.push("Servez par défaut au revers pour limiter ses retours agressifs.");
  if (!serve.length) serve.push("Alternez les zones (T / ouvert / corps), 60 % de 1res balles et 70 % de points gagnés sur 1re.");

  // Retour
  if (A.o_serve === "big") ret.push("Gros service : reculez d'un mètre, prenez 'à plat' et bloquez le retour au centre ou en croisé.");
  else ret.push("Service peu dangereux : avancez et frappez le retour pour mettre la pression dès le 1er coup.");
  if (A.o_weak.includes("serve2")) ret.push("Attaquez systématiquement son 2e service (step-in) : visez le revers ou le centre profond.");

  // Conditions
  const sc = {
    terre: ["Terre battue : privilégiez la balle haute avec du lift, la patience et les amorties ; glissez sur les appuis et finissez les points à 2–3 frappes.", "Revenez au centre après chaque frappe : le rebond ralentit le jeu."],
    dur_rapide: ["Dur rapide : service + 1re balle, prise de balle tôt, slice bas ; points courts."],
    dur_lent: ["Dur lent : les échanges sont plus longs ; utilisez le lift, construisez en 3–4 coups, gardez de la marge."],
    gazon: ["Gazon : rebond bas et irrégulier ; fléchissez bien les jambes, slice bas et service-volée si possible ; évitez les longs échanges."],
    indoor: ["Indoor : pas de vent ni de soleil ; service dominant et retours précis ; jouez plus court."],
  };
  cond.push(...(sc[surf] || []));
  const wind = {
    face: ["Vent de face (il vous souffle dessus) : vos balles ralentissent, celles de l'adversaire accélèrent ; jouez plus lourd et profond, les lobs sont plus difficiles à doser, l'amortie est plus facile."],
    back: ["Vent dans le dos : vos balles partent plus loin ; ajoutez du lift et de la marge en longueur, jouez les lobs avec prudence."],
    cross: ["Vent de travers : visez le centre du terrain et gardez 1 mètre de marge côté ligne ; lancez la balle de service un peu plus devant/à contre-vent."],
  };
  if (wind[A.c_wind]) cond.push(...wind[A.c_wind]);
  if (A.c_sun === "yes") cond.push("Soleil : lancer plus bas ou plus tôt, casquette/lunettes ; jouez des lobs vers le soleil si l'adversaire y fait face.");
  if (A.c_heat === "hot") cond.push("Forte chaleur : réduisez la durée des points, hydratez-vous à chaque changement de côté, économisez l'énergie en jouant des balles hautes et en servant plus sûr.");
  if (A.c_balls === "new") cond.push("Balles neuves : plus rapides et plus de rebond au début ; attention aux frappes trop longues.");
  if (A.c_balls === "worn") cond.push("Balles usées : jeu plus lent, rebond bas ; privilégiez la frappe plate et les slices.");
  if (A.c_alt === "high") cond.push("Altitude : la balle vole plus loin, plus de topspin et de marge.");

  // Situations clés
  situ.push("Menant : gardez le même plan, ne passez pas en mode défensif.");
  situ.push("Mené d'un break : changez un seul paramètre (rythme, hauteur ou zone) sans tout bouleverser.");
  situ.push("Balle de break contre vous : 1re balle zone sûre (T ou revers), 3 balles dans le court avant d'attaquer.");
  situ.push("Tie-break : 1re balle à 70 %, évitez les fautes directes, changez de côté après chaque 6 points avec une routine respiratoire.");
  if (A.p_weak.includes("mental")) situ.push("Routine entre les points : respiration, regard sur les cordes, choix de la zone avant de servir (mental).");

  // À éviter
  if (A.o_style === "attaquant") avoid.push("Balles courtes ou à hauteur de hanches au centre.");
  if (A.o_style === "limeur" || A.o_style === "rameur") avoid.push("Faire la faute à sa place : forcer un coup gagnant sur une balle moyenne, ou entrer dans un échange sans fin sans changer de rythme.");
  if (A.o_style === "limeur") avoid.push("Frapper fort sur ses slices bas sans fléchir les jambes : la balle sortira ou ira dans le filet.");
  if (A.o_weak.includes("bh")) avoid.push("Jouer sur son coup droit sans raison tactique.");
  if (A.p_weak.includes("bh")) avoid.push("Se laisser coincer au revers : jouez haut et au centre pour reprendre l'initiative.");
  avoid.push("Changer complètement de tactique après 2 points perdus.");

  check.push("Avant le match : 1 plan A (arme principale), 1 plan B (variation), 1 plan C (urgence).");
  check.push("Après 6 jeux : bilan flash (ce qui marche / ce que j'abandonne).");
  check.push("Entre les points : respirer, choisir zone + hauteur, jouer le point suivant.");

  return { principles, serve, ret, cond, situ, avoid, check, patterns, headline: `Plan de jeu — ${label(QUESTIONS[0].items[0].options, A.p_style)} vs ${label(QUESTIONS[1].items[0].options, A.o_style)} (${label(QUESTIONS[2].items[1].options, A.c_surface)})` };
}

// --- Schéma SVG d'un court -----------------------------------------------------------------------------------
export function courtSVG(pattern, leftHanded) {
  const W = 230, H = 420, x0 = 28, x1 = 202, y0 = 400, y1 = 20;
  const px = (x) => x0 + (leftHanded ? 1 - x : x) * (x1 - x0);
  const py = (y) => y0 - y * (y0 - y1);
  const alley = (x1 - x0) * 0.166 / 1.332; // couloirs de double (visuels)
  let s = `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" class="court" role="img" aria-label="Schéma tactique : ${pattern.name}">`;
  s += `<defs><marker id="a-me" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0,0L10,5L0,10z" fill="#12b886"/></marker><marker id="a-op" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0,0L10,5L0,10z" fill="#f59f00"/></marker></defs>`;
  s += `<rect x="0" y="0" width="${W}" height="${H}" rx="10" class="court-bg"/>`;
  const L = (xa, ya, xb, yb, extra = "") => `<line x1="${xa}" y1="${ya}" x2="${xb}" y2="${yb}" class="court-line" ${extra}/>`;
  s += `<rect x="${x0}" y="${y1}" width="${x1 - x0}" height="${y0 - y1}" class="court-line" fill="none"/>`;
  s += L(x0, py(0.231), x1, py(0.231)) + L(x0, py(0.769), x1, py(0.769)) + L((x0 + x1) / 2, py(0.231), (x0 + x1) / 2, py(0.769));
  s += `<line x1="${x0 - 8}" y1="${py(0.5)}" x2="${x1 + 8}" y2="${py(0.5)}" class="court-net"/>`;
  pattern.steps.forEach((st, i) => {
    const a = [px(st.x1), py(st.y1)], b = [px(st.x2), py(st.y2)];
    const cls = st.who === "me" ? "me" : "op";
    s += `<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" class="arrow ${cls}" ${st.who === "opp" ? 'stroke-dasharray="6 4"' : ""} marker-end="url(#a-${cls === "me" ? "me" : "op"})"/>`;
    s += `<circle cx="${a[0]}" cy="${a[1]}" r="9" class="dot ${cls}"/><text x="${a[0]}" y="${a[1] + 4}" text-anchor="middle" class="dot-t">${i + 1}</text>`;
  });
  s += `</svg>`;
  return s;
}

