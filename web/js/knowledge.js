// Base de connaissances : références, défauts techniques, exercices.
// Les plages cibles sont des REPÈRES PÉDAGOGIQUES indicatifs (consensus de la littérature
// biomécanique et du coaching), pas des normes médicales. Elles sont mesurées en 2D/3D estimé
// à partir d'une vidéo de smartphone : à interpréter avec un entraîneur.

export const REFERENCES = [
  { id: "elliott1988", cite: "Elliott B. (1988). Biomechanics of the serve in tennis. Sports Medicine 5(5).", doi: "10.2165/00007256-198806050-00004", topic: "Service" },
  { id: "reid2011", cite: "Reid M., Whiteside D., Elliott B. (2011). Serving to different locations: set-up, toss, and racket kinematics of the professional tennis serve. Sports Biomechanics.", doi: "10.1080/14763141.2011.629206", topic: "Service" },
  { id: "abrams2011", cite: "Abrams G. et al. (2011). Review of tennis serve motion analysis and the biomechanics of three serve types with implications for injury. Sports Biomechanics.", doi: "10.1080/14763141.2011.629302", topic: "Service / blessures" },
  { id: "abrams2012", cite: "Abrams G. et al. (2012). Biomechanical analysis of three tennis serve types using a markerless system. Br J Sports Med.", doi: "10.1136/bjsports-2012-091371", topic: "Service (sans marqueurs)" },
  { id: "whiteside2013", cite: "Whiteside D., Elliott B., Lay B., Reid M. (2013). A kinematic comparison of successful and unsuccessful tennis serves across the elite development pathway. Human Movement Science.", doi: "10.1016/j.humov.2013.06.003", topic: "Service" },
  { id: "martin2014", cite: "Martin C. et al. (2014). Energy flow analysis during the tennis serve. Am J Sports Med.", doi: "10.1177/0363546514547173", topic: "Service / chaîne cinétique" },
  { id: "kibler2007", cite: "Kibler W.B. et al. (2007). Muscle activation in coupled scapulohumeral motions in the high performance tennis serve. Br J Sports Med.", doi: "10.1136/bjsm.2007.037333", topic: "Service / épaule" },
  { id: "roetert2009", cite: "Roetert E.P., Ellenbecker T., Reid M. (2009). Biomechanics of the tennis serve: implications for strength training. Strength & Conditioning Journal.", doi: "10.1519/ssc.0b013e3181af65e1", topic: "Service / préparation physique" },
  { id: "reid2013", cite: "Reid M., Elliott B., Crespo M. (2013). Mechanics and learning practices associated with the tennis forehand: a review. J Sports Sci Med 12:225-231.", url: "https://jssm.org/jssm-12-225.xml-Fulltext", topic: "Coup droit" },
  { id: "elliott2006", cite: "Elliott B. (2006). Biomechanics and tennis. Br J Sports Med 40(5).", topic: "Général" },
  { id: "ryu1988", cite: "Ryu R. et al. (1988). An electromyographic analysis of shoulder function in tennis players. Am J Sports Med.", doi: "10.1177/036354658801600509", topic: "Épaule / EMG" },
  { id: "roetert1995", cite: "Roetert E.P. et al. (1995). The biomechanics of tennis elbow: an integrated approach. Clin Sports Med.", doi: "10.1016/s0278-5919(20)30257-x", topic: "Coude" },
  { id: "itf", cite: "ITF Coaching & Sport Science Review (revue de l'ITF, articles de Elliott, Reid, Crespo : techniques de frappe, service, coup droit).", url: "https://www.itfcoachingreview.com", topic: "Coaching (ITF)" },
  { id: "mediapipe", cite: "Google MediaPipe Pose Landmarker (BlazePose, estimation de pose 33 points 2D/3D, exécutée sur l'appareil).", url: "https://developers.google.com/edge/mediapipe/solutions/vision/pose_landmarker/web_js", topic: "Outil IA" },
  { id: "fft", cite: "FFT – Ressources pédagogiques (Direction Technique Nationale) et programmes de formation d'entraîneur (DE/DES tennis).", topic: "Pédagogie FR" },
  { id: "usta", cite: "USTA / PTR / Tennis Australia – Documentation d'entraîneurs sur les patterns de jeu, la tactique singles/doubles.", topic: "Tactique" },
];

export const STROKES = {
  serve: { label: "Service", icon: "🎾", cam: "Filmez de côté (perpendiculaire à la ligne de service) ou de dos, à ~5 m, joueur entier visible, caméra immobile à hauteur de hanche, 60 i/s si possible. Un seul service par séquence idéalement." },
  forehand: { label: "Coup droit", icon: "🟢", cam: "Filmez de dos (derrière la ligne de fond, dans l'axe du coup) ou de côté. Joueur entier, de la préparation à la fin du geste." },
  backhand1: { label: "Revers à 1 main", icon: "🔵", cam: "Filmez de dos ou de côté, joueur entier visible, caméra fixe." },
  backhand2: { label: "Revers à 2 mains", icon: "🔷", cam: "Filmez de dos ou de côté, joueur entier visible, caméra fixe." },
  volley: { label: "Volée", icon: "🟡", cam: "Filmez de côté, à hauteur de hanche, joueur entier visible. Geste court : privilégiez 60 i/s." },
};

// Défauts techniques : id → libellé, pourquoi (biomécanique), consigne (cue), exercices recommandés.
export const ISSUES = {
  s_knee_stiff: {
    label: "Jambes trop raides au chargement",
    why: "La flexion des jambes puis leur extension explosive initient la chaîne cinétique du service (jambes → bassin → tronc → épaule → bras → raquette) et participent à la hauteur du point de contact (Elliott 1988 ; Martin 2014).",
    cue: "« Assieds-toi » : fléchis les genoux pendant le geste de trophée, puis pousse vers le haut avant que la raquette ne descende.",
    ex: ["ex_serve_knee", "ex_trophy_freeze", "ex_squat_jump"],
  },
  s_elbow_bent: {
    label: "Bras plié au contact",
    why: "Un bras tendu au contact augmente le rayon du levier, la hauteur du point de frappe et l'angle d'entrée dans le carré de service (Reid 2011 ; Whiteside 2013).",
    cue: "Frappe « le plus haut possible », comme pour toucher le plafond avec la raquette, bras allongé.",
    ex: ["ex_toss_contact_freeze", "ex_wall_reach", "ex_serve_ladder"],
  },
  s_contact_low: {
    label: "Point de contact trop bas",
    why: "Un point de contact bas réduit les angles et la marge au-dessus du filet, et oblige à compenser par de la force : les secondes balles deviennent courtes ou lentes.",
    cue: "Lancer plus devant et un peu plus haut ; étirement complet vers le haut, talon qui décolle.",
    ex: ["ex_toss_target", "ex_toss_contact_freeze", "ex_wall_reach"],
  },
  s_elbow_low: {
    label: "Coude trop bas en position trophée",
    why: "Un coude sous la ligne des épaules gêne la rotation interne de l'épaule et augmente les contraintes en cas de compensation (Kibler 2007 ; Roetert 2009).",
    cue: "Forme un « L » : coude à hauteur d'épaule, raquette qui monte vers le haut.",
    ex: ["ex_trophy_freeze", "ex_shadow_serve_slow", "ex_scap_band"],
  },
  s_toss_arm: {
    label: "Bras lanceur qui retombe trop tôt",
    why: "Le bras non-frappeur tenu haut puis replié stabilise le tronc et optimise l'inclinaison des épaules ; il améliore aussi la régularité du lancer.",
    cue: "Reste « pointé » vers la balle jusqu'au sommet du lancer, puis ramène le coude vers le ventre.",
    ex: ["ex_toss_target", "ex_trophy_freeze"],
  },
  s_sep_low: {
    label: "Peu de dissociation bassin–épaules",
    why: "La dissociation (X-factor) emmagasine de l'énergie élastique dans le tronc et la restitue à l'accélération de l'épaule (Martin 2014 ; Reid 2013).",
    cue: "Tourne les épaules avant le bassin au lancer, puis laisse le bassin ouvrir en premier.",
    ex: ["ex_med_ball_rot", "ex_shadow_serve_slow", "ex_hip_shoulder_drill"],
  },
  g_knee_stiff: {
    label: "Jambes peu fléchies à l'appui",
    why: "La flexion d'appui permet de transférer le poids du corps vers l'avant et de générer de la vitesse de raquette depuis le sol (Reid 2013).",
    cue: "Baisse ton centre de gravité avant de frapper ; pousse dans le sol vers la balle.",
    ex: ["ex_split_step_lunge", "ex_shadow_stroke_load", "ex_cross_court_rhythm"],
  },
  g_sep_low: {
    label: "Faible dissociation bassin–épaules",
    why: "La rotation axiale du bassin puis du tronc est le contributeur principal de la vitesse de raquette en coup droit (Reid 2013).",
    cue: "Épaules tournées, bassin qui démarre le premier ; pense « ouvre la hanche, l'épaule suit ».",
    ex: ["ex_med_ball_rot", "ex_hip_shoulder_drill", "ex_shadow_stroke_load"],
  },
  g_turn_small: {
    label: "Rotation des épaules trop faible en préparation",
    why: "Une préparation d'épaule complète allonge la course d'accélération et augmente la vitesse de raquette sans effort supplémentaire.",
    cue: "Préparation « compacte et complète » : le menton passe sur l'épaule opposée dès que la balle quitte la raquette adverse.",
    ex: ["ex_shadow_stroke_load", "ex_unit_turn_feed", "ex_hip_shoulder_drill"],
  },
  g_contact_behind: {
    label: "Contact trop proche ou en arrière du corps",
    why: "Frapper devant permet de mieux contrôler la direction et d'utiliser l'élan du corps vers l'avant. Un contact tardif réduit la précision et la profondeur.",
    cue: "Cherche la balle plus tôt : anticipe, ajuste les pas, frappe « devant la hanche ».",
    ex: ["ex_contact_cone", "ex_feed_early_prep", "ex_unit_turn_feed"],
  },
  g_arm_cramped: {
    label: "Bras trop plié / coincé au contact",
    why: "Un bras trop collé au corps indique souvent une balle trop proche : on perd de la longueur de levier et de la fluidité.",
    cue: "Éloigne-toi de la balle ; garde un bras confortablement étendu au contact (sans le raidir).",
    ex: ["ex_spacing_feed", "ex_contact_cone"],
  },
  g_head_moves: {
    label: "Tête instable autour de la frappe",
    why: "Une tête stable stabilise les épaules et améliore le timing et la qualité de contact visuel.",
    cue: "Garde le regard sur la zone de contact une fraction de seconde après l'impact (« regarde la balle partir »).",
    ex: ["ex_head_still", "ex_contact_cone"],
  },
  g_lean: {
    label: "Tronc déséquilibré (trop penché)",
    why: "Une inclinaison excessive du tronc reflète une prise de balle en déséquilibre ; la raquette perd en stabilité et en répétabilité.",
    cue: "Reste « grand » sur la jambe d'appui ; ralentis la fin du geste pour finir en équilibre.",
    ex: ["ex_balance_finish", "ex_split_step_lunge"],
  },
  v_swing_big: {
    label: "Préparation de volée trop longue",
    why: "À la volée, la vitesse vient de la balle adverse : une grande préparation entraîne des retards et des fautes.",
    cue: "Raquette devant, « bloque » : jeu de poignet fixe, petit pas en avant.",
    ex: ["ex_volley_wall", "ex_volley_block_feed"],
  },
  v_contact_behind: {
    label: "Contact de volée trop près du corps",
    why: "Frapper devant donne de l'angle et de la contrôlabilité ; un contact près du corps oblige à faire des gestes compensatoires.",
    cue: "Pousse la raquette devant, avance sur la balle avec un pas croisé.",
    ex: ["ex_volley_wall", "ex_volley_block_feed"],
  },
  v_knee_stiff: {
    label: "Jambes trop raides à la volée",
    why: "Fléchir les jambes sur les volées basses permet de garder la raquette devant et la tête stable (au lieu de se pencher).",
    cue: "Plie les jambes, pas le dos : « descends avec les genoux ».",
    ex: ["ex_volley_low_knee", "ex_volley_block_feed"],
  },
};

// Bibliothèque d'exercices (descriptions courtes, progressions par niveau).
export const EXERCISES = {
  ex_serve_knee: { name: "Service au ralenti avec flexion exagérée", where: "Seul, au service", dose: "3 × 8 gestes lents, puis 10 services", level: 1,
    how: "Enchaîne le lancer et la position trophée en fléchissant volontairement beaucoup les genoux, puis pousse vers le haut. Ajoute progressivement la vitesse. Filme-toi de côté pour vérifier l'angle." },
  ex_trophy_freeze: { name: "Statue trophée", where: "Seul, au service", dose: "3 × 6 répétitions (arrêt 2 s)", level: 1,
    how: "Fais un service lent et arrête-toi en position trophée : genoux fléchis, coude en « L » à hauteur d'épaule, bras lanceur haut. Compare avec ta vidéo." },
  ex_squat_jump: { name: "Squat + saut vertical", where: "Préparation physique", dose: "3 × 8 (récup 60 s)", level: 2,
    how: "Descente contrôlée puis saut vertical explosif en extension complète. Transfert direct vers la poussée des jambes au service." },
  ex_toss_contact_freeze: { name: "Statue contact", where: "Seul, au service", dose: "3 × 6 répétitions", level: 1,
    how: "Fais un service lent et arrête-toi au contact : bras tendu, raquette au plus haut, regard sur la balle. Ressens l'extension complète." },
  ex_wall_reach: { name: "Étirement mural au contact", where: "Mur / grille", dose: "3 × 10", level: 1,
    how: "Debout face à un mur, marque une trace à la hauteur maximale que tu peux toucher avec la raquette. Vise cette trace au service imaginé." },
  ex_serve_ladder: { name: "Échelle de service par zones", where: "Au service", dose: "20 services (4 cibles)", level: 2,
    how: "Un panier de balles : 5 vers le T, 5 vers l'extérieur, 5 au corps, puis 5 en second service (kick/slice). Compte les réussites : objectif 70 % pour 2e série." },
  ex_toss_target: { name: "Lancer sur cible", where: "Seul, avec raquette posée au sol", dose: "3 × 10 lancers", level: 1,
    how: "Pose la raquette au sol devant toi (légèrement à droite pour un droitier) : la balle doit retomber sur le tamis 8 fois sur 10 sans frapper." },
  ex_med_ball_rot: { name: "Rotation à la medecine ball", where: "Préparation physique", dose: "3 × 8 de chaque côté (balle 2–3 kg)", level: 2,
    how: "Lance une medecine ball contre un mur en partant du bassin, puis du tronc, puis des bras, pour apprendre l'ordre de la chaîne cinétique." },
  ex_shadow_serve_slow: { name: "Service fantôme (sans balle)", where: "Seul", dose: "3 × 8", level: 1,
    how: "Sans balle, au ralenti : trophée → bras qui chute derrière → extension → pronation → finition. Respecte le rythme jambes–tronc–bras." },
  ex_scap_band: { name: "Renforcement de coiffe et stabilité scapulaire (élastique)", where: "Échauffement / prévention", dose: "2 × 12 par mouvement", level: 1,
    how: "Rotations externes, rétractions et élévations en « Y/T/W » avec élastique léger (prévention épaule). Si douleurs : consulter un kinésithérapeute." },
  ex_hip_shoulder_drill: { name: "Dissociation bassin–épaules (bâton)", where: "Seul", dose: "3 × 10", level: 1,
    how: "Un bâton sur les épaules : tourne d'abord les épaules, puis ouvre le bassin pour que les épaules suivent. Fais-le avec raquette ensuite." },
  ex_split_step_lunge: { name: "Split-step + fente d'appui", where: "Fond de court", dose: "4 × 6 de chaque côté", level: 1,
    how: "Split-step, fente latérale vers une balle imaginaire, frappe au ralenti en gardant le tronc grand et les jambes fléchies." },
  ex_shadow_stroke_load: { name: "Chargement avec raquette (coup fantôme)", where: "Seul", dose: "3 × 10", level: 1,
    how: "Chargement épaules/hanche, pause 1 s, accélération vers l'avant : travaille le timing du chargement (positionnement du bassin avant les épaules)." },
  ex_cross_court_rhythm: { name: "Échange croisé régulier", where: "Fond de court, avec partenaire", dose: "5 × 3 min", level: 2,
    how: "Rallye cross court sans faute pendant 3 min (objectif 20 balles de suite), en cherchant la hauteur de contact constante et les jambes fléchies." },
  ex_unit_turn_feed: { name: "Panier : préparation en un temps", where: "Panier de balles", dose: "3 × 12", level: 1,
    how: "Le panier lance la balle : dès qu'elle quitte la raquette adverse, tourne les épaules et lève la raquette, puis frappe." },
  ex_contact_cone: { name: "Plot de contact devant", where: "Panier de balles", dose: "3 × 12", level: 1,
    how: "Pose un plot 30 cm devant ta hanche : frappe la balle à la hauteur du plot, toujours devant ton corps (progression : balles plus rapides)." },
  ex_feed_early_prep: { name: "Frapper plus tôt (balle à rebond)", where: "Panier de balles", dose: "3 × 12", level: 2,
    how: "Fais tomber la balle par-dessus ton épaule opposée puis joue-la au sommet du rebond en cherchant à la frapper plus devant." },
  ex_spacing_feed: { name: "Gérer l'espace avec la balle", where: "Panier de balles", dose: "3 × 10", level: 1,
    how: "Place un cône à 1 m de tes pieds : colle-toi à la ligne et ajuste les pas pour garder la balle à une distance de raquette constante." },
  ex_head_still: { name: "Regard sur la zone de contact", where: "Panier de balles", dose: "3 × 12", level: 1,
    how: "Lance-toi un défi : garde la tête immobile jusqu'à ce que la balle ait quitté le tamis, en annonçant « contact ! »." },
  ex_balance_finish: { name: "Finition équilibrée (freeze)", where: "Panier de balles", dose: "3 × 12", level: 1,
    how: "Après chaque coup, reste immobile 2 s sur la jambe d'appui, tronc grand. Si tu bouges, ralentis le geste." },
  ex_volley_wall: { name: "Volées au mur", where: "Mur", dose: "3 × 2 min", level: 1,
    how: "Face à un mur à 3–4 m, volées courtes, raquette devant, petit pas en avant, sans prise de balle en arrière." },
  ex_volley_block_feed: { name: "Panier : volées bloquées (cible)", where: "Filet, panier de balles", dose: "3 × 12", level: 1,
    how: "Le panier envoie à vitesse modérée : volées de blocage profondes en visant une zone de 2 m." },
  ex_volley_low_knee: { name: "Volées basses : genoux plus que dos", where: "Filet", dose: "3 × 10", level: 1,
    how: "Panier bas : plie les genoux, raquette ouverte devant, vise à plat. Garde la tête stable à la hauteur du contact." },
};

export const LEVELS = {
  debutant: "Débutant / non classé",
  s4: "4e série",
  s3: "3e série",
  s2: "2e série",
  s1: "1re série ou +",
};
