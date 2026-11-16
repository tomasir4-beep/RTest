// Guide du coach : glossaire illustré des mesures, fiches techniques par coup, prévention, préparation physique,
// mental, matériel, tactique, plan de progression, conseils de filmage.
// Les affirmations chiffrées renvoient à des publications de l'onglet Sources ([id]) ; le reste relève de la pratique
// courante des entraîneurs et reste à adapter à chaque joueur avec un professionnel.
import { metricPanelSVG, topFigure, gaugeSVG } from "./posefig.js";
import { METRIC_DEFS } from "./metrics.js";

// ---------------------------------------------------------------------------------------------------------------------
// 1. Glossaire illustré : « que mesure l'application, comment, et que viser ? »
// ---------------------------------------------------------------------------------------------------------------------
export const GLOSSARY = [
  { id: "elbow_contact", title: "Angle du coude au contact", fig: ["serve_contact", ["elbow"]],
    what: "L'angle entre le bras (épaule → coude) et l'avant-bras (coude → poignet). 180° = bras tendu ; 90° = coude à angle droit.",
    how: "Calculé en 3D estimée sur la photo/vidéo à l'instant de l'impact (angle épaule–coude–poignet).",
    target: "Service et smash : 165° ou plus. Coups de fond : 135–180° selon le coup.",
    mistakes: "Bras plié par manque d'espace (balle trop proche), lancer trop bas, geste « poussé » avec le coude.",
    tip: "Au service : « touche le plafond avec la raquette ». Aux coups de fond : éloigne-toi un peu de la balle." },
  { id: "knee_load", title: "Flexion des jambes", fig: ["serve_trophy", ["knee"]],
    what: "L'angle du genou (hanche–genou–cheville). 180° = jambe tendue ; plus l'angle est petit, plus les jambes sont fléchies.",
    how: "Moyenne des deux genoux à l'instant du chargement (service : point bas du bassin ; coups de fond : rotation maximale des épaules).",
    target: "Environ 105–150° au service ; 110–160° aux coups de fond. Les jambes participent à la vitesse du service [colomar2022].",
    mistakes: "Jambes raides, flexion faite trop tôt ou relâchée avant le geste, poids sur les talons.",
    tip: "« Assieds-toi » puis pousse dans le sol : la flexion doit servir à propulser, pas seulement à se baisser." },
  { id: "elbow_trophy", title: "Hauteur du coude (position trophée / armé)", fig: ["serve_trophy", ["elbow", "shoulderLine"]],
    what: "Position du coude de la main qui frappe par rapport à la ligne des épaules. 0 = au niveau des épaules ; négatif = en dessous.",
    how: "Différence de hauteur coude–épaule, divisée par la longueur du buste (hanches → épaules).",
    target: "0 ou plus (coude à hauteur d'épaule ou au-dessus), l'avant-bras plutôt vertical (« L »).",
    mistakes: "Coude qui tombe quand la raquette descend dans le dos ; épaule qui monte pour compenser.",
    tip: "Pense « coude à hauteur d'épaule » : c'est la bonne position de départ pour la rotation interne de l'épaule." },
  { id: "toss_arm", title: "Bras libre levé (trophée / armé)", fig: ["serve_trophy", ["toss"]],
    what: "Hauteur du poignet du bras qui n'a pas la raquette, par rapport à l'épaule.",
    how: "Différence de hauteur poignet libre – épaule, divisée par la longueur du buste.",
    target: "Poignet libre au-dessus de l'épaule (valeur positive) pendant que la raquette monte.",
    mistakes: "Bras libre qui retombe dès que la balle est lancée : le tronc perd son repère.",
    tip: "Garde le bras libre pointé vers la balle jusqu'à ce que la raquette s'accélère, puis ramène le coude vers le ventre." },
  { id: "contact_height", title: "Hauteur du point de contact", fig: ["serve_contact", ["wrist"]],
    what: "Hauteur du poignet frappeur à l'impact, comparée à la distance cheville → nez du joueur.",
    how: "Rapport (cheville→poignet) / (cheville→nez) sur l'image à l'impact. Le poignet n'est pas la raquette : la valeur réelle de la raquette est plus haute.",
    target: "1,15 ou plus (valeur provisoire, calibrée sur un joueur). Plus c'est haut, plus l'angle de frappe est favorable.",
    mistakes: "Lancer trop bas ou trop en arrière, jambes qui ne se déplient pas, saut insuffisant.",
    tip: "Au smash : place-toi sous la balle avec des pas chassés, puis saute pour la frapper au plus haut." },
  { id: "separation", title: "Dissociation bassin–épaules", fig: ["TOP", 30, "épaules"],
    what: "L'écart de rotation entre la ligne des épaules et la ligne du bassin, vus d'en haut. C'est le « ressort » du tronc.",
    how: "Estimée à partir de la profondeur 3D (donc approximative) : écart maximal de rotation entre épaules et hanches.",
    target: "Environ 20° ou plus au service ; 12–15° ou plus aux coups de fond (valeurs indicatives).",
    mistakes: "Épaules et bassin qui tournent d'un bloc ; bassin trop lent à démarrer.",
    tip: "Charge d'abord les épaules, puis le bassin ouvre : l'énergie se transmet jusqu'au bras (chaîne cinétique) [vantrigt2025]." },
  { id: "shoulder_turn", title: "Rotation des épaules en préparation", fig: ["TOP", 50, "rotation des épaules"],
    what: "L'amplitude dont les épaules tournent pendant la préparation (vue de dessus).",
    how: "Étendue de rotation des épaules entre le début de la préparation et l'impact.",
    target: "45° ou plus pour un coup de fond classique ; 30° pour un slice ou un retour compact.",
    mistakes: "Préparation uniquement avec le bras ; épaules qui ne tournent pas.",
    tip: "Dès que tu lis la trajectoire, tourne le menton vers l'épaule opposée : la raquette suit." },
  { id: "contact_front", title: "Point de contact devant le corps", fig: ["ground_contact", ["front", "wrist"]],
    what: "Distance entre les hanches et la main au moment de l'impact, dans l'axe du coup, en nombre de « bustes » (longueur hanches → épaules).",
    how: "Projection du poignet sur la direction du coup (déduite du mouvement du poignet), divisée par la longueur du buste.",
    target: "0,25 buste ou plus devant les hanches (volée et coups de fond).",
    mistakes: "Balle prise trop tard ou trop près du corps : on subit au lieu de contrôler.",
    tip: "Anticipe plus tôt, ajuste les petits pas, et frappe « devant la hanche »." },
  { id: "head_stability", title: "Stabilité de la tête", fig: ["ground_contact", ["head"]],
    what: "Déplacement de la tête autour de l'impact (± 0,15 s), rapporté à la longueur du buste.",
    how: "Distance parcourue par le nez entre 0,15 s avant et 0,15 s après l'impact.",
    target: "0,25 buste ou moins.",
    mistakes: "Regard qui part trop tôt vers la cible ; tête qui suit le mouvement des épaules.",
    tip: "Regarde la balle partir : « annonce contact ! » dans ta tête, tête immobile." },
  { id: "trunk_lean", title: "Inclinaison du tronc", fig: ["ground_contact", ["trunk"]],
    what: "L'angle du buste (hanches → épaules) par rapport à la verticale. 0° = tronc droit.",
    how: "Angle entre le tronc estimé en 3D et la verticale de l'image.",
    target: "Moins de 22° à l'impact.",
    mistakes: "Se jeter sur la balle ; fin de geste qui fait tomber le tronc ; jambes raides.",
    tip: "Reste « grand » sur la jambe d'appui et finis le geste en équilibre." },
  { id: "backswing", title: "Amplitude de la préparation", fig: ["volley_prep", ["wrist"]],
    what: "De combien le poignet recule avant l'impact, en nombre de « bustes ».",
    how: "Recul maximal du poignet dans l'axe du coup, pendant 0,6 s avant l'impact.",
    target: "Volée : 0,7 buste ou moins. Retour : 0,9 buste ou moins.",
    mistakes: "Préparation large qui fait perdre du temps ; poignet trop mou.",
    tip: "Raquette devant, poignet ferme, petit pas en avant : « bloque »." },
  { id: "wrist_path", title: "Trajectoire verticale du poignet", fig: ["slice_contact", ["path", "wrist"], { pathGood: { a: 148, elbow: 112 } }],
    what: "Le poignet monte-t-il ou descend-il vers l'impact ? Positif = descend (slice), négatif = monte (lob).",
    how: "Variation de hauteur du poignet sur 0,25 s avant l'impact, divisée par la longueur du buste.",
    target: "Slice / chop : +0,25 ou plus. Lob : −0,25 ou moins (valeurs provisoires).",
    mistakes: "Slice : geste plat ou qui remonte. Lob : geste horizontal qui ne donne pas de hauteur.",
    tip: "Slice : « coupe la tranche de pain » du haut vers le bas. Lob : tamis sous la balle, geste vers le haut." },
  { id: "follow_high", title: "Hauteur de la finition", fig: ["lob_finish", ["wrist", "shoulderLine"]],
    what: "Hauteur du poignet à la fin du geste par rapport à l'épaule.",
    how: "Différence de hauteur épaule – poignet 0,3 s après l'impact, divisée par la longueur du buste.",
    target: "0,4 ou plus au lob (poignet au-dessus de l'épaule à la fin).",
    mistakes: "La raquette s'arrête devant : la balle manque de hauteur.",
    tip: "Finis haut, raquette au-dessus de l'épaule opposée, et garde l'équilibre." },
  { id: "contact_speed", title: "Vitesse du poignet à l'impact", fig: ["drop_contact", ["wrist", "speed"]],
    what: "La vitesse du poignet à l'impact, en longueurs de buste par seconde (ou en m/s si la taille est renseignée).",
    how: "Dérivée de la position du poignet dans l'image, corrigée de la cadence de la vidéo.",
    target: "Amortie : faible (4 buste/s ou moins, seuil provisoire). Pour les autres coups : sert au suivi de vos progrès.",
    mistakes: "Amortie jouée avec un geste de coup normal ; tamis qui accélère au lieu de ralentir.",
    tip: "Amortie : même préparation, puis la main devient souple et le tamis accompagne la balle." },
];

/** Illustration d'une entrée du glossaire. */
export function glossaryFigure(entry) {
  const [pose, focus, extra] = entry.fig;
  if (pose === "TOP") return topFigure(focus, extra);
  return metricPanelSVG(pose, focus, extra || {});
}

/** Définition de la mesure (plages cibles) pour afficher la jauge du glossaire. */
export function glossaryDef(id) {
  for (const defs of Object.values(METRIC_DEFS)) { const d = defs.find((x) => x.id === id); if (d) return d; }
  return null;
}

// ---------------------------------------------------------------------------------------------------------------------
// 2. Fiches techniques par coup
// ---------------------------------------------------------------------------------------------------------------------
export const STROKE_GUIDE = {
  serve: {
    title: "Service", icon: "🎾",
    keys: ["Prise continentale (« poignée de marteau »), poignet souple.", "Lancer régulier : légèrement devant le pied avant, assez haut pour étirer le bras.", "Trophée : genoux fléchis, coude à hauteur d'épaule, bras libre haut.", "Chaîne cinétique : jambes → bassin → tronc → épaule → bras → raquette (pronation) [colomar2022] [martin2026].", "Contact haut bras tendu, puis finition équilibrée (retombée sur le pied avant)."],
    faults: ["Lancer trop bas, trop en arrière ou différent à chaque fois.", "Coude bas en position trophée.", "Bras plié au contact (point de frappe bas).", "Jambes non utilisées ; service « avec le bras ».", "Tomber sur le côté en fin de geste."],
    levels: { debutant: "Service en deux temps (trophée → frappe), balle de mousse ou raquette courte, viser la zone sans puissance.", intermediaire: "Rythme continu, 3 zones (T / ouvert / corps), 2e service slicé ou kické à 70–75 % de puissance.", avance: "Variation de zones et d'effets, service + 1, service sous pression (jeu décisif)." },
    camera: "De côté (flexion, coude, hauteur de contact) et de dos (rotations). Une étude d'experts a évalué des services sur vidéo 2D avec deux angles de caméra [wood2023]. 5 à 10 services par séquence.",
  },
  forehand: {
    title: "Coup droit", icon: "🟢",
    keys: ["Préparation d'épaule précoce (« unit turn »), raquette prête avant le rebond.", "Appuis fléchis et stables : la flexion transmet la puissance du sol.", "Rotation du bassin puis des épaules : c'est le moteur du coup [reid2013] [elliott2018].", "Contact devant la hanche, bras confortable.", "Accélération du bas vers le haut puis finition équilibrée ; une finition plus courte a été associée à plus de précision chez des jeunes joueurs [bottura2025]."],
    faults: ["Préparation tardive.", "Appuis raides ou trop larges.", "Contact trop près ou derrière.", "Tête qui bouge à l'impact.", "Fin de geste déséquilibrée."],
    levels: { debutant: "Balles lancées à la main, préparation en un temps, viser le centre.", intermediaire: "Rotation et contact devant sur balles régulières, croisé puis long de ligne.", avance: "Variation de hauteur et de rythme, coup droit inside-out, accélération sur balle courte." },
    camera: "De dos dans l'axe du coup (rotation) puis de côté (contact devant, flexion).",
  },
  backhand1: {
    title: "Revers à 1 main", icon: "🔵",
    keys: ["Épaule opposée tournée vers le filet dès la préparation.", "Contact bien devant, bras allongé, poignet ferme.", "Balance : le bras libre équilibre le geste.", "Tête stable jusqu'après l'impact.", "Finition haute pour le lift ; plus basse et vers l'avant pour le slice (revue de référence sur les revers : [genevois2015])."],
    faults: ["Contact trop tardif.", "Poignet qui lâche.", "Épaules qui s'ouvrent trop tôt.", "Balles hautes mal gérées (reculer ou monter la prise)."],
    levels: { debutant: "Slice de revers pour la sécurité, puis lift sur balles lentes.", intermediaire: "Lift régulier croisé, changement de ligne sur balle courte.", avance: "Revers lifté à plat, revers slicé d'approche, passing." },
    camera: "De dos puis de côté.",
  },
  backhand2: {
    title: "Revers à 2 mains", icon: "🔷",
    keys: ["Deux mains qui travaillent ensemble : la main non dominante guide.", "Contact un peu moins devant qu'à 1 main, tronc moteur.", "Épaules et hanches tournent ensemble puis se dissocient.", "Tête stable à l'impact.", "Finition haute au-dessus de l'épaule (revue de référence : [genevois2015])."],
    faults: ["Contact trop proche du corps.", "Bras qui se raidit.", "Absence de rotation.", "Appuis trop fermés."],
    levels: { debutant: "Préparation en un temps, balles lancées.", intermediaire: "Direction croisée / long de ligne.", avance: "Accélération sur balle courte, revers sous pression." },
    camera: "De dos ou de côté, joueur entier.",
  },
  volley: {
    title: "Volée", icon: "🟡",
    keys: ["Raquette devant, tamis au-dessus du poignet.", "Préparation très courte : on bloque.", "Un pas en avant à l'impact ; jambes fléchies sur la balle basse.", "Contact devant le corps, poignet ferme.", "Placement profond avant l'angle."],
    faults: ["Préparation large.", "Jambes raides (on se penche du dos).", "Poignet qui se casse.", "Contact près du corps."],
    levels: { debutant: "Volées au mur et volées de blocage, jeu de jambes.", intermediaire: "Volée croisée profonde, volée de transition.", avance: "Volée courte, volée coupée, enchaînement volée-smash." },
    camera: "De côté, à hauteur de hanche, 60 i/s si possible.",
  },
  slice: {
    title: "Coup coupé (chop / slice)", icon: "✂️",
    keys: ["Armé haut : le tamis est au-dessus de la balle.", "Le poignet descend vers l'avant : trajectoire de haut en bas.", "Contact devant, bras allongé et poignet ferme.", "Jambes fléchies pour rester bas ; tête stable.", "Finition basse et longue vers la cible."],
    faults: ["Geste plat ou qui remonte (balle qui flotte).", "Contact trop près du corps.", "Pas assez de rotation des épaules.", "Tamis trop ouvert (la balle part en l'air)."],
    levels: { debutant: "Slice lent au mur, direction avant effet.", intermediaire: "Slice bas sur cible (corde à 1 m du filet).", avance: "Slice d'approche, slice défensif profond, slice court." },
    camera: "De côté ; l'angle du tamis n'est pas mesuré (il faut le vérifier à l'œil et à la trajectoire de la balle).",
  },
  dropshot: {
    title: "Amortie (drop shot)", icon: "🪶",
    keys: ["Même préparation que le coup de fond : rien ne doit trahir l'intention.", "Main souple, tamis légèrement ouvert à l'impact.", "Le tamis ralentit et accompagne la balle.", "Contact devant, jambes fléchies.", "Choisir le bon moment : adversaire reculé, balle pas trop haute."],
    faults: ["Préparation plus petite : l'adversaire devine.", "Geste trop rapide : la balle part trop loin.", "Balle jouée trop haut ou trop profonde.", "Pas de suivi : on reste sur place."],
    levels: { debutant: "Toucher sur balle lancée, viser une zone large.", intermediaire: "Amortie déguisée après un coup de fond croisé.", avance: "Amortie suivie d'un lob ou d'une montée ; amortie de revers." },
    camera: "De côté ; filmez aussi un coup de fond normal pour comparer les préparations.",
  },
  smash: {
    title: "Smash", icon: "💥",
    keys: ["Dès que le lob part : tourner l'épaule, bras libre pointé vers la balle.", "Pas chassés vers l'arrière (ne pas croiser les jambes).", "Armé comme au service : coude à hauteur d'épaule.", "Contact haut, bras tendu, sous la balle.", "Finition équilibrée, retour au filet."],
    faults: ["Mal placé sous la balle.", "Coude bas.", "Bras libre baissé.", "Départ tardif."],
    levels: { debutant: "Smash sur lob lent, sans saut, viser le grand côté.", intermediaire: "Smash avec pas chassés, rebond ou volée.", avance: "Smash en reculant, smash de défense, smash après saut." },
    camera: "De côté ou de dos, jusqu'à la fin du geste ; lob lent pour un geste complet.",
  },
  lob: {
    title: "Lob", icon: "🌙",
    keys: ["Préparation comme un coup de fond pour ne pas prévenir.", "Tamis sous la balle, geste de bas en haut et vers l'avant.", "Jambes fléchies puis qui poussent vers le haut.", "Finition haute : raquette au-dessus de l'épaule opposée.", "Viser la profondeur : la balle doit passer au-dessus de la raquette adverse et retomber près du fond."],
    faults: ["Geste plat, balle trop tendue.", "Finition basse.", "Trop tôt ou trop tard.", "Lob trop court (facile à smasher)."],
    levels: { debutant: "Lob défensif haut au centre.", intermediaire: "Lob d'attaque croisé.", avance: "Lob lifté, lob de revers, lob sous pression." },
    camera: "De côté, joueur entier, finition comprise.",
  },
  return: {
    title: "Retour de service", icon: "↩️",
    keys: ["Position d'attente équilibrée, split-step au moment où le serveur frappe.", "Lire la balle : trajectoire, effet, vitesse.", "Préparation courte et compacte.", "Contact devant la hanche, accompagner la balle.", "Premier objectif : remettre profond, puis attaquer les secondes balles faibles."],
    faults: ["Préparation large.", "Appuis trop lourds ou trop tardifs.", "Contact trop près du corps.", "Retour trop court."],
    levels: { debutant: "Bloquer la balle au centre, balles faciles.", intermediaire: "Retour croisé profond, retour slicé.", avance: "Retour agressif sur 2e service (avancer), retour long de ligne en surprise." },
    camera: "De côté ou de dos depuis la position d'attente.",
  },
};

// ---------------------------------------------------------------------------------------------------------------------
// 3. Sections transversales
// ---------------------------------------------------------------------------------------------------------------------
export const GUIDE_SECTIONS = [
  { id: "filming", title: "Bien filmer pour une mesure fiable", icon: "🎥", html: `
    <ul class="clean">
      <li><b>Caméra immobile</b> (trépied, mur, sac) à hauteur de hanche, à 4–8 m du joueur ; le joueur entier reste dans l'image du début à la fin du geste.</li>
      <li><b>Deux angles</b> sont préférables : <b>de côté</b> (flexion, angle du coude, hauteur du contact) et <b>de dos</b> (rotations). Une étude a fait évaluer des services sur vidéo 2D par des experts depuis deux angles de caméra [wood2023].</li>
      <li><b>Cadence :</b> 60 i/s (ou ralenti) pour les gestes rapides ; indiquez la cadence dans l'application si la vidéo est au ralenti.</li>
      <li><b>Lumière et contraste :</b> évitez le contre-jour ; un vêtement qui contraste avec le fond aide la détection.</li>
      <li><b>Un seul joueur à l'image</b> si possible ; sinon touchez le joueur à analyser.</li>
      <li><b>Répétez le geste</b> 5 à 10 fois dans la même séquence (ou plusieurs vidéos) : la médiane est bien plus fiable qu'un geste isolé.</li>
      <li><b>Limites :</b> une seule caméra estime la profondeur (rotations) avec moins de précision que les angles dans le plan de l'image (voir les revues et validations de l'estimation de pose : [roggio2024] [yue2026]).</li>
    </ul>` },
  { id: "health", title: "Prévention et santé (épaule, coude, dos, poignet)", icon: "🩺", html: `
    <p>Le service est le coup le plus exigeant pour le corps ; les blessures aiguës touchent surtout les membres inférieurs, et les blessures chroniques surtout le membre supérieur (coiffe des rotateurs, conflit interne, labrum, épicondylite) [dines2015].</p>
    <ul class="clean">
      <li><b>Échauffement dynamique de 10–15 minutes</b> avant de jouer : mobilité de hanches, tronc et épaules, activation des jambes, puis frappes progressives ; échauffements dynamique et neuromusculaire ont été comparés chez de jeunes joueurs [fernandez2020].</li>
      <li><b>Épaule :</b> renforcez les rotateurs externes et les muscles de l'omoplate (trapèze inférieur, dentelé) ; l'effet d'une faiblesse du trapèze inférieur sur la mécanique de l'épaule au service a été étudié [gillet2019] ; une approche de prévention fondée sur la définition des facteurs de risque et de valeurs seuils est proposée [cools2015].</li>
      <li><b>Mobilité :</b> le lien entre le dépistage de la mobilité d'épaule en début de saison et le risque de blessure a fait l'objet d'une méta-analyse [pozzi2020] ; les facteurs de risque du membre supérieur sont synthétisés dans des revues [tooth2020] [kekelekis2020].</li>
      <li><b>Charge :</b> augmentez progressivement le volume de frappe (nombre de services, durée) ; le suivi de charge est un axe de recherche actif [whiteside2017].</li>
      <li><b>Technique :</b> coude à hauteur d'épaule au trophée, contact haut bras tendu, tronc qui participe : un geste qui utilise bien la chaîne cinétique sollicite moins l'épaule seule.</li>
      <li><b>Consultez</b> un médecin du sport ou un kinésithérapeute en cas de douleur persistante (plus de quelques jours), de douleur nocturne, de perte de force ou d'engourdissement. Cette application ne remplace pas un avis médical.</li>
    </ul>` },
  { id: "physical", title: "Préparation physique spécifique", icon: "💪", html: `
    <p>La vitesse de service dépend notamment de la poussée des jambes, des rotations du bassin et du tronc, de l'extension du bras et de la rotation interne de l'épaule [colomar2022] ; l'influence de la force, de la puissance et de la raideur musculaire sur la vitesse de frappe a été étudiée chez les juniors [colomar2020]. La préparation physique du service se pense comme une chaîne cinétique [martin2026].</p>
    <ul class="clean">
      <li><b>Jambes (2 séances/semaine) :</b> squats, fentes, sauts verticaux et unilatéraux.</li>
      <li><b>Tronc :</b> rotations à la medecine ball contre un mur (bassin → tronc → bras), gainage, anti-rotation.</li>
      <li><b>Épaule :</b> rotateurs externes à l'élastique, tirages, Y-T-W ; un programme de force de tronc + élastiques + medecine ball de 6 semaines a été étudié chez des jeunes joueurs [fernandez2013] ; une méta-analyse d'essais randomisés a examiné l'effet de renforcements sur la vitesse de balle (dont le service) chez les athlètes lanceurs [myers2015].</li>
      <li><b>Déplacement :</b> split-step, appuis latéraux, changements de direction.</li>
      <li><b>Récupération :</b> sommeil, hydratation, alimentation ; une semaine de charge = une séance de moindre intensité.</li>
    </ul>
    <p class="muted small">Programme indicatif : à adapter à l'âge, au niveau et à l'état de santé avec un préparateur physique.</p>` },
  { id: "mental", title: "Mental, routines et gestion des points importants", icon: "🧠", html: `
    <ul class="clean">
      <li><b>Routine entre les points :</b> respiration, regard sur les cordes, choix de la zone et de l'effet, puis lancer. Des protocoles de routine ont été testés en tennis, avec des résultats nuancés sous pression [lautenbach2014] ; essayez, mesurez, gardez ce qui marche pour vous.</li>
      <li><b>Un point à la fois :</b> le prochain point est le seul que vous contrôlez.</li>
      <li><b>Après une erreur :</b> une consigne simple (« haut et profond »), pas de réflexion technique pendant le jeu.</li>
      <li><b>Points importants (break, jeu décisif) :</b> jouez vos schémas fiables ; la pression se gère par une routine et des choix simples.</li>
      <li><b>Pratique représentative :</b> à l'entraînement, travaillez le service avec un retourneur et le coup d'après (« service + 3e balle ») plutôt qu'à vide ; cette conception d'entraînement (service seul, service + retour, service + 3e balle) a été étudiée pour favoriser le transfert chez des juniors [krause2019].</li>
    </ul>` },
  { id: "tactics", title: "Principes tactiques d'un coach", icon: "♟️", html: `
    <ul class="clean">
      <li><b>Les 5 variables :</b> hauteur, profondeur, direction, vitesse (rythme), rotation (effet). Un bon joueur en change une à la fois.</li>
      <li><b>Construire le point en 3 temps :</b> ouvrir (déplacer l'adversaire), forcer (le mettre en difficulté), finir (espace libre ou filet).</li>
      <li><b>Les zones :</b> le croisé est le plus sûr (filet plus bas, terrain plus long) ; le long de ligne se joue sur une balle courte ou un contre-pied.</li>
      <li><b>Les points courts décident beaucoup de matchs :</b> sur gazon d'élite, les points de 0 à 4 coups sont déterminants [fitzpatrick2021] ; les caractéristiques des matchs de Grand Chelem sont décrites dans [reid2016] ; travaillez service, retour et la balle qui suit.</li>
      <li><b>Service :</b> les caractéristiques spatiales d'un ace (zone, vitesse, angle) ont été étudiées à partir de données Hawk-Eye [whiteside2016] ; variez les zones et gardez une 2e balle fiable.</li>
      <li><b>Jeu décisif :</b> l'analyse de matchs d'élite sert de base aux conseils [meffert2019] ; gardez des schémas simples et un 1er service solide.</li>
      <li><b>Surface :</b> les exigences physiques varient selon la surface [pluim2023] ; adaptez durée des échanges et choix tactiques (voir l'onglet Tactique).</li>
    </ul>` },
  { id: "gear", title: "Matériel", icon: "🏸", html: `
    <ul class="clean">
      <li><b>Raquette :</b> taille adaptée à la taille de l'enfant ; chez de jeunes joueurs intermédiaires, un changement de raquette trop rapide n'est pas toujours utile [touzard2023].</li>
      <li><b>Prise (grip) :</b> épaisseur du manche adaptée à la main ; un surgrip usé fait serrer plus fort.</li>
      <li><b>Cordage :</b> demandez conseil à un cordeur ; une tension trop élevée ou un cordage rigide augmente les vibrations ressenties au bras (épicondylite).</li>
      <li><b>Balles :</b> des balles usées sont plus lentes ; renouvelez-les pour les séances de service.</li>
      <li><b>Chaussures :</b> adaptées à la surface (terre, dur), remplacées avant usure complète.</li>
    </ul>` },
  { id: "plan", title: "Plan de progression et suivi (objectif 2e série)", icon: "📅", html: `
    <p><b>Cycle de 4 semaines :</b> conscience du geste → automatisation → variabilité → intégration en match. L'onglet « Exercices » génère ce programme à partir de vos défauts.</p>
    <ul class="clean">
      <li><b>Chaque semaine :</b> 2–3 séances techniques (20 min de geste + jeu de situation), 1 séance physique, 1 match d'entraînement avec un objectif unique.</li>
      <li><b>Mesurez :</b> filmez les mêmes gestes (5–10 répétitions) tous les 15 jours, de côté et de dos, et suivez la médiane et la régularité dans l'onglet Suivi.</li>
      <li><b>Statistiques de match à noter :</b> pourcentage de 1res balles, points gagnés sur 1re et 2e balle, fautes directes / coups gagnants, points de 0 à 4 coups gagnés [reid2016] [kovalchik2017].</li>
      <li><b>Pour viser la 2e série :</b> un 2e service fiable (kické/slicé à 70–75 % de puissance), un retour solide, une régularité de fond de court et 3 schémas de jeu maîtrisés.</li>
      <li><b>Une seule priorité technique à la fois</b> (par exemple : flexion → hauteur de contact → dissociation) : réglez, automatisez, passez à la suivante.</li>
    </ul>` },
];

// --- Rendu HTML ---------------------------------------------------------------------------------------------------------
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
/** Remplace les renvois [id] par des liens vers l'onglet Sources. */
export const linkRefs = (html) => html.replace(/\[([a-z]+[0-9]{4})\]/g, (_, id) => `<a href="#src" data-go="src" data-ref="${id}" class="refl">[${id}]</a>`);

/** HTML du glossaire illustré. */
export function glossaryHTML() {
  return GLOSSARY.map((g) => {
    const d = glossaryDef(g.id);
    return `<article class="gloss card"><h3>${esc(g.title)}</h3>
      <div class="gloss-row"><div class="gloss-fig">${glossaryFigure(g)}${d ? gaugeSVG(d, null) : ""}<p class="muted small">Jauge : <span style="color:var(--ok)">vert = cible</span>, orange = à surveiller, rouge = à corriger.</p></div>
      <dl><dt>Ce que c'est</dt><dd>${linkRefs(esc(g.what))}</dd><dt>Comment c'est mesuré</dt><dd>${linkRefs(esc(g.how))}</dd><dt>Cible</dt><dd>${linkRefs(esc(g.target))}</dd><dt>Erreurs fréquentes</dt><dd>${linkRefs(esc(g.mistakes))}</dd><dt>Le conseil du coach</dt><dd>${linkRefs(esc(g.tip))}</dd></dl></div></article>`;
  }).join("");
}

/** HTML d'une fiche technique. */
export function strokeGuideHTML(key) {
  const g = STROKE_GUIDE[key];
  const li = (a) => a.map((x) => `<li>${linkRefs(esc(x))}</li>`).join("");
  return `<details class="gdet"><summary>${g.icon} ${esc(g.title)}</summary>
    <h4>Les clés techniques</h4><ol class="clean">${li(g.keys)}</ol>
    <h4>Erreurs fréquentes</h4><ul class="clean">${li(g.faults)}</ul>
    <h4>Progression</h4><ul class="clean"><li><b>Débutant :</b> ${linkRefs(esc(g.levels.debutant))}</li><li><b>Intermédiaire :</b> ${linkRefs(esc(g.levels.intermediaire))}</li><li><b>Avancé :</b> ${linkRefs(esc(g.levels.avance))}</li></ul>
    <h4>Comment filmer</h4><p>${linkRefs(esc(g.camera))}</p></details>`;
}

/** HTML d'une section transversale (le contenu est maîtrisé : liens de références seulement). */
export const sectionHTML = (s) => `<details class="gdet"><summary>${s.icon} ${esc(s.title)}</summary>${linkRefs(s.html)}</details>`;
