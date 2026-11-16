// FICHIER GENERE par scripts/build-bundle.ps1 - ne pas modifier a la main.
const __M_knowledge = (() => {
"use strict";
// Base de connaissances : références, défauts techniques, exercices.
// Les plages cibles sont des REPÈRES PÉDAGOGIQUES indicatifs (consensus de la littérature
// biomécanique et du coaching), pas des normes médicales. Elles sont mesurées en 2D/3D estimé
// à partir d'une vidéo de smartphone : à interpréter avec un entraîneur.

const REFERENCES = [
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
  // --- Actualisation du 16/11/2026 (OpenAlex ; niveau de lecture : titre + résumé) ---
  { id: "lambrich2023", cite: "Lambrich J., Muehlbauer T. (2023). Biomechanical analyses of different serve and groundstroke techniques in tennis: a systematic scoping review. PLoS ONE.", doi: "10.1371/journal.pone.0290320", topic: "Service / coups de fond (revue)", lu: "résumé" },
  { id: "elliott2018", cite: "Elliott B.C., Reid M., Whiteside D. (2018). Biomechanics of groundstrokes and volleys. In : Tennis Medicine, Springer.", doi: "10.1007/978-3-319-71498-1_2", topic: "Coups de fond / volée", lu: "titre" },
  { id: "genevois2015", cite: "Genevois C., Reid M., Rogowski I., Crespo M. (2015). Performance factors related to the different tennis backhand groundstrokes: a review. J Sports Sci Med.", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC4306773/", topic: "Revers (1 et 2 mains, lift et slice)", lu: "résumé" },
  { id: "colomar2022", cite: "Colomar J., Corbi F., Brich Q., Baiget E. (2022). Determinant physical factors of tennis serve velocity: a brief review. Int J Sports Physiol Perform.", doi: "10.1123/ijspp.2022-0091", topic: "Service / facteurs physiques", lu: "résumé" },
  { id: "wood2023", cite: "Wood D., Reid M., Elliott B., Alderson J.A., Mian A.S. (2023). The expert eye? An inter-rater comparison of elite tennis serve kinematics and performance. J Sports Sci.", doi: "10.1080/02640414.2023.2298102", topic: "Évaluation du service sur vidéo 2D par des experts", lu: "résumé" },
  { id: "vantrigt2025", cite: "van Trigt B. et al. (2025). Uncovering the hidden mechanics of upper body rotations in tennis serves using wearable sensors on Dutch professional players. Front Sports Act Living.", doi: "10.3389/fspor.2024.1463299", topic: "Service / chaîne cinétique", lu: "résumé" },
  { id: "martin2026", cite: "Martin C., Touzard P., Fourel L., Fernández-Fernández J. (2026). Tennis serve biomechanics and implications for physical conditioning. Strength Cond J.", doi: "10.1519/ssc.0000000000000977", topic: "Service / préparation physique", lu: "résumé" },
  { id: "palmer2018", cite: "Palmer K.J. et al. (2018). Relationship between range of motion, strength, motor control, power, and the tennis serve in competitive-level tennis players: a pilot study. Sports Health.", doi: "10.1177/1941738118785348", topic: "Service / mobilité, force, puissance", lu: "résumé" },
  { id: "reid2012", cite: "Reid M., Whiteside D., Gilbin G., Elliott B. (2012). Effect of a common task constraint on the body, racket, and ball kinematics of the elite junior tennis serve. Sports Biomech.", doi: "10.1080/14763141.2012.724702", topic: "Service / exercice contraint", lu: "résumé" },
  { id: "sheets2011", cite: "Sheets A.L. et al. (2011). Kinematics differences between the flat, kick, and slice serves measured using a markerless motion capture method. Ann Biomed Eng.", doi: "10.1007/s10439-011-0418-y", topic: "Service à plat / kické / slicé", lu: "titre" },
  { id: "bottura2025", cite: "Bottura R.M. et al. (2025). Shorter follow-through is associated with greater accuracy: a kinematic analysis of the tennis forehand in youth athletes. Int J Perform Anal Sport.", doi: "10.1080/24748668.2025.2577551", topic: "Coup droit / finition", lu: "résumé" },
  { id: "liu2026", cite: "Liu F. et al. (2026). Relationship between trunk and pelvis coordination strategies and stances during tennis forehand strokes. Sports Biomech.", doi: "10.1080/14763141.2026.2759826", topic: "Coup droit / appuis et rotation", lu: "résumé" },
  { id: "dines2015", cite: "Dines J.S. et al. (2015). Tennis injuries: epidemiology, pathophysiology, and treatment. J Am Acad Orthop Surg.", doi: "10.5435/jaaos-d-13-00148", topic: "Blessures", lu: "résumé" },
  { id: "cools2015", cite: "Cools A.M.J., Johansson F.R., Borms D., Maenhout A. (2015). Prevention of shoulder injuries in overhead athletes: a science-based approach. Braz J Phys Ther.", doi: "10.1590/bjpt-rbf.2014.0109", topic: "Prévention épaule", lu: "résumé" },
  { id: "tooth2020", cite: "Tooth C. et al. (2020). Risk factors of overuse shoulder injuries in overhead athletes: a systematic review. Sports Health.", doi: "10.1177/1941738120931764", topic: "Prévention épaule", lu: "titre" },
  { id: "pozzi2020", cite: "Pozzi F. et al. (2020). Preseason shoulder range of motion screening and in-season risk of shoulder and elbow injuries in overhead athletes: systematic review and meta-analysis. Br J Sports Med.", doi: "10.1136/bjsports-2019-100698", topic: "Prévention épaule / coude", lu: "titre" },
  { id: "kekelekis2020", cite: "Kekelekis A. et al. (2020). Risk factors for upper limb injury in tennis players: a systematic review. Int J Environ Res Public Health.", doi: "10.3390/ijerph17082744", topic: "Prévention membre supérieur", lu: "titre" },
  { id: "gillet2019", cite: "Gillet B., Rogowski I., Monga-Dubreuil É., Begon M. (2019). Lower trapezius weakness and shoulder complex biomechanics during the tennis serve. Med Sci Sports Exerc.", doi: "10.1249/mss.0000000000002079", topic: "Service / épaule", lu: "résumé" },
  { id: "gescheit2017", cite: "Gescheit D.T. et al. (2017). Injury epidemiology of tennis players at the 2011–2016 Australian Open Grand Slam. Br J Sports Med.", doi: "10.1136/bjsports-2016-097283", topic: "Blessures", lu: "titre" },
  { id: "fernandez2013", cite: "Fernández-Fernández J., Ellenbecker T., Sanz-Rivas D., Ulbricht A., Ferrauti A. (2013). Effects of a 6-week junior tennis conditioning program on service velocity. J Sports Sci Med.", url: "https://www.ncbi.nlm.nih.gov/pmc/articles/3761833", topic: "Préparation physique jeunes", lu: "résumé" },
  { id: "myers2015", cite: "Myers N.L. et al. (2015). Increasing ball velocity in the overhead athlete: a meta-analysis of randomized controlled trials. J Strength Cond Res.", doi: "10.1519/jsc.0000000000000931", topic: "Préparation physique", lu: "résumé" },
  { id: "fernandez2020", cite: "Fernández-Fernández J. et al. (2020). The effect of a neuromuscular vs. dynamic warm-up on physical performance in young tennis players. J Strength Cond Res.", doi: "10.1519/jsc.0000000000003703", topic: "Échauffement", lu: "titre" },
  { id: "colomar2020", cite: "Colomar J., Baiget E., Corbi F. (2020). Influence of strength, power, and muscular stiffness on stroke velocity in junior tennis players. Front Physiol.", doi: "10.3389/fphys.2020.00196", topic: "Préparation physique", lu: "titre" },
  { id: "hayes2018", cite: "Hayes M.J., Spits D.R., Watts D.G., Kelly V.G. (2018). Relationship between tennis serve velocity and select performance measures. J Strength Cond Res.", doi: "10.1519/jsc.0000000000002440", topic: "Service / performance physique", lu: "titre" },
  { id: "touzard2023", cite: "Touzard P. et al. (2023). There is no rush to upgrade the tennis racket in young intermediate competitive players: the effects of scaling racket on serve biomechanics and performance. Front Psychol.", doi: "10.3389/fpsyg.2023.1104146", topic: "Matériel / jeunes joueurs", lu: "résumé" },
  { id: "whiteside2017", cite: "Whiteside D., Cant O., Connolly M., Reid M. (2017). Monitoring hitting load in tennis using inertial sensors and machine learning. Int J Sports Physiol Perform.", doi: "10.1123/ijspp.2016-0683", topic: "Charge de frappe", lu: "titre" },
  { id: "whiteside2016", cite: "Whiteside D., Reid M. (2016). Spatial characteristics of professional tennis serves with implications for serving aces: a machine learning approach. J Sports Sci.", doi: "10.1080/02640414.2016.1183805", topic: "Tactique / service (Hawk-Eye)", lu: "résumé" },
  { id: "reid2016", cite: "Reid M., Morgan S., Whiteside D. (2016). Matchplay characteristics of Grand Slam tennis: implications for training and conditioning. J Sports Sci.", doi: "10.1080/02640414.2016.1139161", topic: "Tactique / match", lu: "résumé" },
  { id: "kovalchik2017", cite: "Kovalchik S.A., Reid M. (2017). Comparing matchplay characteristics and physical demands of junior and professional tennis athletes in the era of big data. J Sports Sci Med.", url: "https://www.ncbi.nlm.nih.gov/pmc/articles/5721178", topic: "Tactique / match", lu: "titre" },
  { id: "fitzpatrick2021", cite: "Fitzpatrick A., Stone J.A., Choppin S.B., Kelley J. (2021). Investigating the most important aspect of elite grass court tennis: short points. Int J Sports Sci Coach.", doi: "10.1177/1747954121999593", topic: "Tactique / points courts", lu: "résumé" },
  { id: "meffert2019", cite: "Meffert D., O'Shannessy C., Born P., Grambow R., Vogt T. (2019). Tennis at tiebreaks: addressing elite players' performance for tomorrows' coaching. Ger J Exerc Sport Res.", doi: "10.1007/s12662-019-00611-3", topic: "Tactique / tie-break", lu: "titre" },
  { id: "pluim2023", cite: "Pluim B.M. et al. (2023). Physical demands of tennis across the different court surfaces, performance levels and sexes: a systematic review with meta-analysis. Sports Med.", doi: "10.1007/s40279-022-01807-8", topic: "Surfaces / exigences physiques", lu: "titre" },
  { id: "krause2019", cite: "Krause L., Farrow D., Pinder R., Buszard T., Kovalchik S. et al. (2019). Enhancing skill transfer in tennis using representative learning design. J Sports Sci.", doi: "10.1080/02640414.2019.1647739", topic: "Apprentissage / pratique représentative", lu: "résumé" },
  { id: "lautenbach2014", cite: "Lautenbach F. et al. (2014). Nonautomated pre-performance routine in tennis: an intervention study. J Appl Sport Psychol.", doi: "10.1080/10413200.2014.957364", topic: "Mental / routines", lu: "résumé" },
  { id: "beckmann2021", cite: "Beckmann J., Fimpel L., Wergin V.V. (2021). Preventing a loss of accuracy of the tennis serve under pressure. PLoS ONE.", doi: "10.1371/journal.pone.0255060", topic: "Mental / pression", lu: "résumé" },
  { id: "bacic2018", cite: "Bačić B., Hume P.A. (2018). Computational intelligence for qualitative coaching diagnostics: automated assessment of tennis swings to improve performance and safety. Big Data.", doi: "10.1089/big.2018.0062", topic: "Outil IA / diagnostic technique", lu: "résumé" },
  { id: "roggio2024", cite: "Roggio F., Trovato B., Sortino M., Musumeci G. (2024). A comprehensive analysis of the machine learning pose estimation models used in human movement and posture analyses: a narrative review. Heliyon.", doi: "10.1016/j.heliyon.2024.e39977", topic: "Outil IA / estimation de pose", lu: "titre" },
  { id: "emmerson2025", cite: "Emmerson J., Needham L., Williams S., Colyer S. (2025). Evaluation of a markerless motion capture system for measuring mechanical work during tennis strokes. J Sports Sci.", doi: "10.1080/02640414.2025.2555096", topic: "Outil IA / sans marqueurs", lu: "résumé" },
  { id: "yue2026", cite: "Yue X.A., Gu Y., Yu B. (2026). Validation of single-camera MediaPipe BlazePose for knee joint angle measurement across multiple functional tasks. JMIR Rehabil Assist Technol.", doi: "10.2196/102399", topic: "Outil IA / validité BlazePose", lu: "titre" },
];

const REFERENCES_UPDATED = "16/11/2026";

const STROKES = {
  serve: { label: "Service", icon: "🎾", cam: "Filmez de côté (perpendiculaire à la ligne de service) ou de dos, à ~5 m, joueur entier visible, caméra immobile à hauteur de hanche, 60 i/s si possible. Un seul service par séquence idéalement." },
  forehand: { label: "Coup droit", icon: "🟢", cam: "Filmez de dos (derrière la ligne de fond, dans l'axe du coup) ou de côté. Joueur entier, de la préparation à la fin du geste." },
  backhand1: { label: "Revers à 1 main", icon: "🔵", cam: "Filmez de dos ou de côté, joueur entier visible, caméra fixe." },
  backhand2: { label: "Revers à 2 mains", icon: "🔷", cam: "Filmez de dos ou de côté, joueur entier visible, caméra fixe." },
  volley: { label: "Volée", icon: "🟡", cam: "Filmez de côté, à hauteur de hanche, joueur entier visible. Geste court : privilégiez 60 i/s." },
  slice: { label: "Coup coupé (chop / slice)", icon: "✂️", cam: "Filmez de côté ou de dos, joueur entier visible, caméra fixe, 60 i/s si possible. Un coup coupé par séquence idéalement (revers ou coup droit)." },
  dropshot: { label: "Amortie (drop shot)", icon: "🪶", cam: "Filmez de côté ou de dos, joueur entier visible. Pour juger le déguisement, filmez aussi un coup droit ou un revers normal dans les mêmes conditions." },
  smash: { label: "Smash", icon: "💥", cam: "Filmez de côté ou de dos, joueur entier visible, jusqu'à la fin du geste. Smash sur lob lent (ou lancé à la main) pour un geste complet." },
  lob: { label: "Lob", icon: "🌙", cam: "Filmez de côté, joueur entier visible, caméra fixe, avec la finition complète du geste." },
  return: { label: "Retour de service", icon: "↩️", cam: "Filmez de côté ou de dos, depuis la position d'attente jusqu'à la fin du retour, joueur entier visible." },
};

// Défauts techniques : id → libellé, pourquoi (biomécanique), consigne (cue), exercices recommandés.
const ISSUES = {
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
  sl_path_flat: {
    label: "Geste coupé trop plat ou ascendant",
    why: "Le slice se joue de haut en bas : le tamis descend derrière puis sous la balle, ce qui crée un effet rétrograde, une trajectoire basse et un rebond qui reste bas. Un geste plat ou qui remonte donne une balle molle qui flotte.",
    cue: "Armer haut, puis « couper la tranche de pain » : le poignet descend vers l'avant, la main finit devant, pas au-dessus de la tête.",
    ex: ["ex_slice_shadow", "ex_slice_wall", "ex_slice_target"],
  },
  dr_too_fast: {
    label: "Amortie trop rapide ou trop appuyée",
    why: "L'amortie se joue avec un tamis qui ralentit à l'impact : la balle perd sa vitesse et son rebond mort la rend difficile à rattraper. Un geste trop rapide donne une balle qui va trop loin.",
    cue: "Même préparation qu'un coup normal, mais la main devient souple et le tamis « accompagne » la balle sans la frapper.",
    ex: ["ex_drop_touch", "ex_drop_disguise"],
  },
  dr_not_disguised: {
    label: "Préparation trop petite : amortie devinable",
    why: "Une amortie efficace part de la même préparation que le coup de fond : l'adversaire ne doit pas pouvoir deviner. Une préparation courte ou différente prévient l'adversaire.",
    cue: "Tourne les épaules comme pour un coup normal et ne change l'intention qu'au dernier moment.",
    ex: ["ex_drop_disguise", "ex_unit_turn_feed"],
  },
  sm_elbow_low: {
    label: "Smash : coude trop bas à l'armé",
    why: "Un coude sous les épaules limite l'extension et la hauteur du contact : le smash perd de la puissance et de l'angle.",
    cue: "Raquette derrière la tête, coude à hauteur d'épaule, comme au service.",
    ex: ["ex_smash_shadow", "ex_trophy_freeze"],
  },
  sm_toss_arm: {
    label: "Smash : bras libre pas assez levé",
    why: "Le bras libre pointé vers la balle sert de repère et équilibre le tronc : sans lui, le contact est moins précis.",
    cue: "Bras libre tendu vers la balle jusqu'au dernier moment.",
    ex: ["ex_smash_shadow", "ex_smash_footwork"],
  },
  sm_elbow_bent: {
    label: "Smash : bras plié au contact",
    why: "Frapper bras tendu donne la plus grande hauteur de contact et le meilleur angle d'attaque.",
    cue: "Frappe le plus haut possible, bras allongé.",
    ex: ["ex_smash_shadow", "ex_wall_reach"],
  },
  sm_contact_low: {
    label: "Smash : contact trop bas",
    why: "Un contact trop bas arrive quand on est mal placé sous la balle : on frappe devant ou à côté plutôt que de reculer.",
    cue: "Recule avec des pas chassés pour te placer sous la balle, puis saute pour la frapper plus haut.",
    ex: ["ex_smash_footwork", "ex_smash_shadow"],
  },
  lb_path_flat: {
    label: "Lob : geste pas assez ascendant",
    why: "Le lob demande un geste de bas en haut pour donner de la hauteur : un geste plat produit une balle trop tendue que l'adversaire peut smasher.",
    cue: "Tamis sous la balle, geste vers le haut et vers l'avant, comme pour lancer la balle par-dessus le filet.",
    ex: ["ex_lob_target", "ex_lob_finish"],
  },
  lb_finish_low: {
    label: "Lob : finition trop basse",
    why: "Une finition haute accompagne la balle et garantit la hauteur et la profondeur.",
    cue: "Finis le geste haut, raquette au-dessus de l'épaule opposée.",
    ex: ["ex_lob_finish", "ex_lob_target"],
  },
  rt_prep_big: {
    label: "Retour : préparation trop longue",
    why: "Au retour, la balle arrive vite : une préparation large fait perdre du temps et crée des fautes.",
    cue: "Épaules tournées, raquette devant, préparation courte et compacte.",
    ex: ["ex_return_block", "ex_return_split"],
  },
  rt_contact_behind: {
    label: "Retour : contact trop près du corps",
    why: "Prendre la balle devant permet de mieux contrôler la direction et la profondeur du retour.",
    cue: "Avance sur la balle, frappe devant la hanche et accompagne.",
    ex: ["ex_return_block", "ex_return_split"],
  },
};

// Bibliothèque d'exercices (descriptions courtes, progressions par niveau).
const EXERCISES = {
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
  ex_slice_shadow: { name: "Slice fantôme (sans balle)", where: "Seul", dose: "3 × 10 gestes lents", level: 1,
    how: "Armé haut, descends le tamis vers l'avant et finis devant toi. Filme-toi de côté : le poignet doit descendre vers l'impact." },
  ex_slice_wall: { name: "Slices au mur", where: "Mur", dose: "3 × 2 min", level: 1,
    how: "À 3–4 m d'un mur, slices lents et réguliers. La balle doit revenir basse et sans effet vers le haut." },
  ex_slice_target: { name: "Slice sur cible basse", where: "Fond de court", dose: "3 × 10", level: 2,
    how: "Place une corde ou un élastique à 1 m du filet : le slice doit passer juste au-dessus et rester bas. Vise une zone de 2 m au fond." },
  ex_drop_touch: { name: "Toucher d'amortie", where: "Fond de court", dose: "3 × 8 de chaque côté", level: 1,
    how: "Panier lent : amortie avec le tamis qui accompagne la balle. Vise une zone de 3 m derrière le filet, la balle doit rebondir deux fois avant la ligne de service." },
  ex_drop_disguise: { name: "Déguiser l'amortie", where: "Fond de court, avec partenaire", dose: "3 × 10", level: 2,
    how: "Même préparation que pour un coup de fond, ton partenaire annonce « long » ou « court » au dernier moment ; tu joues l'un ou l'autre. Il doit être surpris." },
  ex_smash_shadow: { name: "Smash fantôme", where: "Seul", dose: "3 × 10", level: 1,
    how: "Sans balle : pas chassés vers l'arrière, bras libre pointé, armé comme au service, extension complète au contact." },
  ex_smash_footwork: { name: "Placement sous le lob", where: "Filet, avec partenaire", dose: "3 × 8", level: 1,
    how: "Le partenaire lance des lobs. Recule avec des pas chassés (jamais en croisant) et vise le smash tendu, bras haut." },
  ex_lob_target: { name: "Lob sur cible", where: "Fond de court", dose: "3 × 10", level: 1,
    how: "Vise une zone au fond du terrain adverse, balle au moins 4 m au-dessus du filet." },
  ex_lob_finish: { name: "Finition haute du lob", where: "Fond de court", dose: "3 × 10", level: 1,
    how: "Après chaque lob, garde la raquette haute 2 secondes : elle doit finir au-dessus de l'épaule opposée." },
  ex_return_block: { name: "Retour bloqué", where: "Au retour, avec partenaire", dose: "3 × 10 services", level: 1,
    how: "Raquette devant, préparation courte, bloque la balle profonde au centre." },
  ex_return_split: { name: "Retour : split-step et fente", where: "Au retour", dose: "4 × 8", level: 1,
    how: "Split-step au moment où le serveur frappe, fente vers la balle, contact devant la hanche." },
};

const LEVELS = {
  debutant: "Débutant / non classé",
  s4: "4e série",
  s3: "3e série",
  s2: "2e série",
  s1: "1re série ou +",
};

return { REFERENCES, REFERENCES_UPDATED, STROKES, ISSUES, EXERCISES, LEVELS };
})();
const __M_metrics = (() => {
"use strict";
// Calcul des métriques biomécaniques à partir des points de pose (MediaPipe, 33 points).
// frames[i] = { t (s), lm: [{x,y,z,visibility}] image normalisée | null, wl: [{x,y,z}] monde en m | null }

const LM = { nose: 0, lSh: 11, rSh: 12, lEl: 13, rEl: 14, lWr: 15, rWr: 16, lHip: 23, rHip: 24, lKn: 25, rKn: 26, lAn: 27, rAn: 28 };

const D2R = Math.PI / 180;
const deg = (r) => r / D2R;
const sub = (a, b) => ({ x: a.x - b.x, y: a.y - b.y, z: (a.z || 0) - (b.z || 0) });
const dot = (a, b) => a.x * b.x + a.y * b.y + a.z * b.z;
const norm = (a) => Math.hypot(a.x, a.y, a.z);
const mid = (a, b) => ({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2, z: ((a.z || 0) + (b.z || 0)) / 2 });
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

function angle3(a, b, c) {
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

function prepare(frames) {
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
  { id: "separation", label: "Dissociation bassin–épaules (max)", unit: "°", ok: [15, 120], warn: [8, 120], low: "g_sep_low", w: 0.5, tip: "écart de rotation épaules / bassin" },
  { id: "contact_front", label: "Point de contact devant le corps", unit: "× buste", ok: [0.25, 5], warn: [0.05, 5], low: "g_contact_behind", w: 2, video: true, tip: "distance poignet–hanches dans l'axe du coup" },
  opts.skipElbow ? null : { id: "elbow_contact", label: "Angle du coude au contact", unit: "°", ok: [opts.elbowMin || 135, 181], warn: [110, 181], low: "g_arm_cramped", w: 1, tip: "180° = bras tendu" },
  { id: "head_stability", label: "Stabilité de la tête (± 0,15 s)", unit: "× buste", ok: [0, 0.25], warn: [0, 0.45], high: "g_head_moves", w: 1, video: true, tip: "déplacement de la tête autour de l'impact" },
  { id: "trunk_lean", label: "Inclinaison du tronc au contact", unit: "°", ok: [0, 22], warn: [0, 32], high: "g_lean", w: 1, tip: "0° = tronc vertical" },
].filter(Boolean);

const METRIC_DEFS = {
  serve: [
    { id: "knee_load", label: "Flexion des jambes (position trophée)", unit: "°", ok: [105, 150], warn: [95, 160], high: "s_knee_stiff", w: 2, tip: "180° = jambes tendues" },
    { id: "elbow_trophy", label: "Hauteur du coude / épaule (trophée)", unit: "× buste", ok: [-0.1, 3], warn: [-0.3, 3], low: "s_elbow_low", w: 1, tip: "≥ 0 : coude au niveau des épaules" },
    { id: "toss_arm", label: "Bras lanceur haut (trophée)", unit: "× buste", ok: [0.2, 5], warn: [-0.1, 5], low: "s_toss_arm", w: 1, tip: "poignet lanceur au-dessus de l'épaule" },
    { id: "separation", label: "Dissociation bassin–épaules (max)", unit: "°", ok: [20, 140], warn: [10, 140], low: "s_sep_low", w: 0.5, tip: "écart de rotation épaules / bassin" },
    { id: "elbow_contact", label: "Angle du coude au contact", unit: "°", ok: [165, 181], warn: [150, 181], low: "s_elbow_bent", w: 2, tip: "180° = bras tendu" },
    { id: "contact_height", label: "Hauteur du point de contact", unit: "× (cheville→nez)", ok: [1.15, 4], warn: [1.05, 4], low: "s_contact_low", w: 2, tip: "poignet frappeur relatif à la taille" },
  ],
  forehand: GROUND(),
  backhand1: GROUND({ elbowMin: 145 }),
  backhand2: GROUND({ skipElbow: true }),
  // --- Coups ajoutés (seuils PROVISOIRES : non calibrés sur des vidéos réelles) ---
  slice: [
    { id: "knee_load", label: "Flexion des jambes au chargement", unit: "°", ok: [110, 165], warn: [100, 172], high: "g_knee_stiff", w: 1.5, tip: "180° = jambes tendues" },
    { id: "shoulder_turn", label: "Rotation des épaules (préparation)", unit: "°", ok: [35, 400], warn: [20, 400], low: "g_turn_small", w: 1, video: true, tip: "amplitude de rotation du buste" },
    { id: "wrist_path", label: "Descente du poignet vers l'impact", unit: "× buste", ok: [0.25, 6], warn: [0.05, 6], low: "sl_path_flat", w: 2.5, video: true, tip: "positif = le poignet descend (geste coupé)" },
    { id: "contact_front", label: "Point de contact devant le corps", unit: "× buste", ok: [0.25, 5], warn: [0.05, 5], low: "g_contact_behind", w: 2, video: true, tip: "distance poignet–hanches dans l'axe du coup" },
    { id: "elbow_contact", label: "Angle du coude au contact", unit: "°", ok: [145, 181], warn: [120, 181], low: "g_arm_cramped", w: 1, tip: "180° = bras tendu" },
    { id: "head_stability", label: "Stabilité de la tête (± 0,15 s)", unit: "× buste", ok: [0, 0.25], warn: [0, 0.45], high: "g_head_moves", w: 1, video: true, tip: "déplacement de la tête autour de l'impact" },
  ],
  dropshot: [
    { id: "shoulder_turn", label: "Préparation déguisée (rotation des épaules)", unit: "°", ok: [40, 400], warn: [25, 400], low: "dr_not_disguised", w: 2, video: true, tip: "comparable à celle d'un coup normal" },
    { id: "contact_speed", label: "Vitesse du poignet à l'impact", unit: "buste/s", ok: [0, 4], warn: [0, 6], high: "dr_too_fast", w: 2.5, video: true, tip: "faible : le tamis ralentit au toucher (seuil provisoire)" },
    { id: "contact_front", label: "Point de contact devant le corps", unit: "× buste", ok: [0.25, 5], warn: [0.05, 5], low: "g_contact_behind", w: 1.5, video: true, tip: "distance poignet–hanches dans l'axe du coup" },
    { id: "knee_load", label: "Flexion des jambes", unit: "°", ok: [110, 165], warn: [100, 172], high: "g_knee_stiff", w: 1, tip: "180° = jambes tendues" },
    { id: "head_stability", label: "Stabilité de la tête (± 0,15 s)", unit: "× buste", ok: [0, 0.25], warn: [0, 0.45], high: "g_head_moves", w: 1, video: true, tip: "déplacement de la tête autour de l'impact" },
  ],
  smash: [
    { id: "elbow_trophy", label: "Hauteur du coude / épaule (armé)", unit: "× buste", ok: [-0.1, 3], warn: [-0.3, 3], low: "sm_elbow_low", w: 1.5, tip: "≥ 0 : coude au niveau des épaules" },
    { id: "toss_arm", label: "Bras libre levé (armé)", unit: "× buste", ok: [0.2, 5], warn: [-0.1, 5], low: "sm_toss_arm", w: 1, tip: "poignet libre au-dessus de l'épaule" },
    { id: "elbow_contact", label: "Angle du coude au contact", unit: "°", ok: [165, 181], warn: [150, 181], low: "sm_elbow_bent", w: 2, tip: "180° = bras tendu" },
    { id: "contact_height", label: "Hauteur du point de contact", unit: "× (cheville→nez)", ok: [1.15, 4], warn: [1.05, 4], low: "sm_contact_low", w: 2, tip: "poignet frappeur relatif à la taille" },
  ],
  lob: [
    { id: "wrist_path", label: "Montée du poignet vers l'impact", unit: "× buste", ok: [-6, -0.25], warn: [-6, -0.05], high: "lb_path_flat", w: 2.5, video: true, tip: "négatif = le poignet monte (geste ascendant)" },
    { id: "follow_high", label: "Hauteur de la finition", unit: "× buste", ok: [0.4, 5], warn: [0, 5], low: "lb_finish_low", w: 2, video: true, tip: "poignet au-dessus de l'épaule à la fin" },
    { id: "knee_load", label: "Flexion des jambes", unit: "°", ok: [105, 160], warn: [95, 168], high: "g_knee_stiff", w: 1, tip: "180° = jambes tendues" },
    { id: "head_stability", label: "Stabilité de la tête (± 0,15 s)", unit: "× buste", ok: [0, 0.25], warn: [0, 0.45], high: "g_head_moves", w: 1, video: true, tip: "déplacement de la tête autour de l'impact" },
  ],
  return: [
    { id: "backswing", label: "Amplitude de la préparation", unit: "× buste", ok: [0, 0.9], warn: [0, 1.3], high: "rt_prep_big", w: 2, video: true, tip: "recul du poignet avant l'impact" },
    { id: "contact_front", label: "Point de contact devant le corps", unit: "× buste", ok: [0.2, 5], warn: [0, 5], low: "rt_contact_behind", w: 2, video: true, tip: "distance poignet–hanches dans l'axe du coup" },
    { id: "knee_load", label: "Flexion des jambes", unit: "°", ok: [110, 160], warn: [100, 168], high: "g_knee_stiff", w: 1.5, tip: "180° = jambes tendues" },
    { id: "shoulder_turn", label: "Rotation des épaules (préparation)", unit: "°", ok: [30, 400], warn: [18, 400], low: "g_turn_small", w: 1, video: true, tip: "amplitude de rotation du buste" },
    { id: "head_stability", label: "Stabilité de la tête (± 0,15 s)", unit: "× buste", ok: [0, 0.25], warn: [0, 0.45], high: "g_head_moves", w: 1, video: true, tip: "déplacement de la tête autour de l'impact" },
  ],
  volley: [
    { id: "backswing", label: "Amplitude de la préparation", unit: "× buste", ok: [0, 0.7], warn: [0, 1.1], high: "v_swing_big", w: 2, video: true, tip: "recul du poignet avant l'impact" },
    { id: "contact_front", label: "Point de contact devant le corps", unit: "× buste", ok: [0.25, 5], warn: [0.05, 5], low: "v_contact_behind", w: 2, video: true, tip: "distance poignet–hanches dans l'axe du coup" },
    { id: "knee_load", label: "Flexion des jambes", unit: "°", ok: [115, 168], warn: [105, 175], high: "v_knee_stiff", w: 1, tip: "180° = jambes tendues" },
  ],
};

// Métadonnées issues de la revue « expert du domaine » : fiabilité de la mesure (monoculaire), vue de caméra conseillée,
// tolérance de régularité (écart-type au-delà duquel le geste est jugé variable d'une répétition à l'autre).
const METRIC_META = {
  knee_load: { conf: "high", view: "side", tol: 10 },
  elbow_contact: { conf: "high", view: "side", tol: 10 },
  elbow_trophy: { conf: "mid", view: "side", tol: 0.15 },
  toss_arm: { conf: "mid", view: "side", tol: 0.2 },
  contact_height: { conf: "mid", view: "side", tol: 0.08 },
  separation: { conf: "low", view: "behind", tol: 10 },
  shoulder_turn: { conf: "low", view: "behind", tol: 15 },
  contact_front: { conf: "mid", view: "side", tol: 0.25 },
  head_stability: { conf: "mid", view: "any", tol: 0.1 },
  trunk_lean: { conf: "mid", view: "side", tol: 6 },
  backswing: { conf: "mid", view: "side", tol: 0.25 },
  wrist_path: { conf: "mid", view: "side", tol: 0.2 },
  follow_high: { conf: "mid", view: "side", tol: 0.2 },
  contact_speed: { conf: "low", view: "side", tol: 1.0 },
};
for (const defs of Object.values(METRIC_DEFS)) for (const d of defs) Object.assign(d, METRIC_META[d.id] || {});
// --- Analyse principale ----------------------------------------------------------------------
/**
 * @param {Array} rawFrames
 * @param {{stroke:string, hand:'right'|'left', aspect:number, timed:boolean, contactIdx?:number, loadIdx?:number, followIdx?:number}} o
 */
function analyze(rawFrames, o) {
  const prep = prepare(rawFrames);
  if (!prep.ok) return { error: "Silhouette non détectée (moins de 3 images exploitables). Filmez le joueur entier, bien éclairé.", detRate: prep.detRate };
  const fr = prep.frames, n = fr.length;
  const aspect = o.aspect || 16 / 9;
  const notes = [];
  let hand = o.hand;
  const serveLike = o.stroke === "serve" || o.stroke === "smash"; // frappe au-dessus de la tête, même logique de phases
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
      if (serveLike) {
        const cand = [];
        for (let i = 0; i < n; i++) if (fr[i].lm[S.wr].y < fr[i].lm[LM.nose].y) cand.push(i);
        c = cand.length ? cand.reduce((b, i) => (spd[i] > spd[b] ? i : b), cand[0]) : argmax(spd);
      } else c = argmax(spd);
    } else c = serveLike ? argmin(fr.map((f) => f.lm[S.wr].y), 0, n - 1) : Math.floor(n / 2);
  }
  // Cadence de la vidéo : 1 = temps réel ; > 1 = ralenti (les durées de référence sont multipliées).
  const slow = o.slow || 1;
  // Service / smash : l'impact est au point le plus haut du poignet, à ± 0,12 s du pic de vitesse (le pic de vitesse
  // arrive un peu avant la pleine extension : sans cet affinage, le bras paraît plié et le contact trop bas).
  if (serveLike && o.timed && o.contactIdx == null) {
    const lo = idxAt(fr, fr[c].t - 0.12 * slow), hi = idxAt(fr, fr[c].t + 0.12 * slow);
    let best = c, bestY = Infinity;
    for (let i = lo; i <= hi; i++) { const y = fr[i].lm[S.wr].y; if (y < fr[i].lm[LM.nose].y && y < bestY) { bestY = y; best = i; } }
    c = best;
  }
  const winLo = (sec) => (o.timed ? idxAt(fr, fr[c].t - sec * slow) : Math.max(0, c - 1));
  const kneeSeries = fr.map(kneeAvg);
  let l = o.loadIdx;
  if (l == null) {
    if (o.timed && serveLike) {
      // Service : chargement = point le plus bas du bassin avant l'impact (remontée monotone jusqu'au contact),
      // indépendant de la cadence de la vidéo (temps réel ou ralenti).
      const hy = fr.map((ff) => (ff.lm[LM.lHip].y + ff.lm[LM.rHip].y) / 2);
      const hs = hy.map((_, i) => { let s = 0, k = 0; for (let j = Math.max(0, i - 2); j <= Math.min(n - 1, i + 2); j++) { s += hy[j]; k++; } return s / k; });
      const lo = winLo(1.8), hi = Math.max(lo, c - 2);
      l = argmax(hs, lo, hi);
    } else if (o.timed) {
      const lo = winLo(o.stroke === "volley" || o.stroke === "return" ? 0.6 : 1.0);
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
  values.knee_load = serveLike && o.timed && o.loadIdx == null ? Math.min(...kneeSeries.slice(Math.max(0, l - 3), Math.min(c, l + 3) + 1)) : kneeSeries[l];
  values.elbow_contact = angle3(fc.wl[S.sh], fc.wl[S.el], fc.wl[S.wr]);
  {
    const sh = mid(fc.wl[LM.lSh], fc.wl[LM.rSh]), hp = mid(fc.wl[LM.lHip], fc.wl[LM.rHip]);
    const t = sub(sh, hp);
    values.trunk_lean = deg(Math.acos(clamp(-t.y / (norm(t) || 1), -1, 1)));
  }
  // dissociation max autour de l'impact (fenêtre) ou instantanée (photo)
  {
    const lo = o.timed ? (serveLike ? Math.max(0, l - 2) : winLo(0.9)) : l, hi = o.timed ? c : Math.max(c, l);
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

  // Trajectoire verticale du poignet vers l'impact (+ = descend), niveau du contact, finition, vitesse (coups coupés, lob, amortie)
  if (o.timed) {
    const dts = []; for (let i = 1; i < n; i++) dts.push(fr[i].t - fr[i - 1].t);
    dts.sort((a, b) => a - b);
    const dtm = dts[Math.floor(dts.length / 2)] || 0.066;
    const k = Math.max(1, Math.round((0.25 * slow) / dtm));
    values.wrist_path = (fc.lm[S.wr].y - fr[Math.max(0, c - k)].lm[S.wr].y) / torso;
    const shy = (fr[f].lm[LM.lSh].y + fr[f].lm[LM.rSh].y) / 2;
    values.follow_high = (shy - fr[f].lm[S.wr].y) / torso;
    values.contact_speed = Math.max(spd[Math.max(0, c - 1)], spd[c], spd[Math.min(n - 1, c + 1)]) * slow;
  }
  const { metrics, issues: issueList, score } = evaluate(o.stroke, values, o.timed);
  if (prep.detRate < 0.7) notes.push(`Silhouette détectée sur ${Math.round(prep.detRate * 100)} % des images seulement : résultats moins fiables.`);
  if (o.timed && (fr[n - 1].t - fr[0].t) < 0.8) notes.push("Séquence très courte : filmez la préparation complète du geste.");
  return {
    score, values,
    metrics, issues: issueList, notes, hand,
    phases: { load: l, contact: c, follow: f },
    detRate: prep.detRate, frames: fr,
    series: {
      speed: spd, knee: kneeSeries, t: fr.map((x) => x.t),
      elbow: fr.map((ff) => angle3(ff.wl[S.sh], ff.wl[S.el], ff.wl[S.wr])),
      trunk: fr.map((ff) => { const t = sub(mid(ff.wl[LM.lSh], ff.wl[LM.rSh]), mid(ff.wl[LM.lHip], ff.wl[LM.rHip])); return deg(Math.acos(clamp(-t.y / (norm(t) || 1), -1, 1))); }),
    },
    contactSpeed: Math.max(spd[Math.max(0, c - 1)], spd[c], spd[Math.min(n - 1, c + 1)]), // longueurs de buste / s (vidéo)
    slow,
  };
}

// Évaluation des valeurs mesurées vs plages cibles → statuts, défauts priorisés, score.
function evaluate(stroke, values, timed = true) {
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
function aggregate(stroke, reps) {
  const values = {}, spread = {};
  let regular = 0, counted = 0;
  for (const d of METRIC_DEFS[stroke] || []) {
    const v = reps.map((r) => r.values[d.id]).filter((x) => x != null && !Number.isNaN(x));
    if (!v.length) continue;
    const mean = v.reduce((a, b) => a + b, 0) / v.length;
    const sd = v.length > 1 ? Math.sqrt(v.reduce((a, b) => a + (b - mean) ** 2, 0) / (v.length - 1)) : 0;
    const med = median(v);
    const mad = median(v.map((x) => Math.abs(x - med))) || 0; // dispersion robuste pour repérer un geste aberrant
    values[d.id] = med;
    spread[d.id] = { min: Math.min(...v), max: Math.max(...v), n: v.length, mean, sd, regular: v.length < 2 ? null : sd <= (d.tol ?? Infinity), mad, 0: Math.min(...v), 1: Math.max(...v), 2: v.length };
    if (v.length > 1) { counted++; if (sd <= (d.tol ?? Infinity)) regular++; }
  }
  return { ...evaluate(stroke, values, true), values, spread, consistency: counted ? Math.round((regular / counted) * 100) : null };
}
/**
 * Repère les gestes dans une longue séquence (séance entière) : pics de vitesse du poignet frappeur.
 * Service : poignet au-dessus de la tête et bras tendu. Renvoie des instants de contact (s).
 */
function segmentStrokes(rawFrames, { stroke, hand = "right", aspect = 16 / 9, minGap = 2.5 }) {
  const prep = prepare(rawFrames);
  if (!prep.ok) return [];
  const fr = prep.frames, torso = torsoImg(fr, aspect);
  const S = sides(hand);
  const sR = wristSpeed(fr, LM.rWr, aspect, torso), sL = wristSpeed(fr, LM.lWr, aspect, torso);
  const speed = stroke === "serve" || stroke === "smash" ? (hand === "left" ? sL : sR) : sR.map((v, i) => Math.max(v, sL[i]));
  const sorted = [...speed].sort((a, b) => a - b);
  const p99 = sorted[Math.floor(sorted.length * 0.995)] || 1;
  const thr = stroke === "dropshot" ? Math.max(0.18 * p99, 0.7) : Math.max(0.4 * p99, 1.5); // amortie : geste lent, seuil plus bas
  const out = [];
  for (let i = 2; i < fr.length - 2; i++) {
    if (!(speed[i] > thr && speed[i] >= speed[i - 1] && speed[i] >= speed[i + 1])) continue;
    if (stroke === "serve" || stroke === "smash") {
      // poignet au-dessus de la tête et bras tendu, à ± 2 images du pic de vitesse
      let ok = false;
      for (let j = Math.max(0, i - 2); j <= Math.min(fr.length - 1, i + 2) && !ok; j++) {
        ok = fr[j].lm[S.wr].y < fr[j].lm[LM.nose].y && angle3(fr[j].wl[S.sh], fr[j].wl[S.el], fr[j].wl[S.wr]) >= 140;
      }
      if (!ok) continue;
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


return { LM, angle3, prepare, METRIC_DEFS, METRIC_META, analyze, evaluate, aggregate, segmentStrokes };
})();
const __M_posefig = (() => {
"use strict";
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
function buildFigure(p) {
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
const IDEAL = {
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
const ISSUE_FIG = {
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
function metricPanelSVG(poseKey, focus, extra = {}) {
  const d = { focus, ...extra };
  return `${svgOpen} role="img" aria-label="Illustration">${panel(IDEAL[poseKey], d, false)}</svg>`;
}

/** Deux panneaux « À éviter / Cible » pour un défaut, avec légendes. */
function issueFigure(issueId) {
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
const GAUGE_DOMAIN = {
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
function gaugeSVG(def, value, range) {
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
const figureSVG = (poseKey) => metricPanelSVG(poseKey, []);

/** Vue de dessus seule (glossaire) : bassin gris, épaules en jaune. */
const topFigure = (angle, label) => `${svgOpen} role="img" aria-label="Vue de dessus">${topPanelFull({ top: { good: angle, bad: angle }, topLabel: label }, false)}</svg>`;

return { buildFigure, IDEAL, ISSUE_FIG, metricPanelSVG, issueFigure, GAUGE_DOMAIN, gaugeSVG, figureSVG, topFigure };
})();
const __M_guide = (() => {
"use strict";
// Guide du coach : glossaire illustré des mesures, fiches techniques par coup, prévention, préparation physique,
// mental, matériel, tactique, plan de progression, conseils de filmage.
// Les affirmations chiffrées renvoient à des publications de l'onglet Sources ([id]) ; le reste relève de la pratique
// courante des entraîneurs et reste à adapter à chaque joueur avec un professionnel.
const { metricPanelSVG, topFigure, gaugeSVG } = __M_posefig;
const { METRIC_DEFS } = __M_metrics;

// ---------------------------------------------------------------------------------------------------------------------
// 1. Glossaire illustré : « que mesure l'application, comment, et que viser ? »
// ---------------------------------------------------------------------------------------------------------------------
const GLOSSARY = [
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
function glossaryFigure(entry) {
  const [pose, focus, extra] = entry.fig;
  if (pose === "TOP") return topFigure(focus, extra);
  return metricPanelSVG(pose, focus, extra || {});
}

/** Définition de la mesure (plages cibles) pour afficher la jauge du glossaire. */
function glossaryDef(id) {
  for (const defs of Object.values(METRIC_DEFS)) { const d = defs.find((x) => x.id === id); if (d) return d; }
  return null;
}

// ---------------------------------------------------------------------------------------------------------------------
// 2. Fiches techniques par coup
// ---------------------------------------------------------------------------------------------------------------------
const STROKE_GUIDE = {
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
const GUIDE_SECTIONS = [
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
const linkRefs = (html) => html.replace(/\[([a-z]+[0-9]{4})\]/g, (_, id) => `<a href="#src" data-go="src" data-ref="${id}" class="refl">[${id}]</a>`);

/** HTML du glossaire illustré. */
function glossaryHTML() {
  return GLOSSARY.map((g) => {
    const d = glossaryDef(g.id);
    return `<article class="gloss card"><h3>${esc(g.title)}</h3>
      <div class="gloss-row"><div class="gloss-fig">${glossaryFigure(g)}${d ? gaugeSVG(d, null) : ""}<p class="muted small">Jauge : <span style="color:var(--ok)">vert = cible</span>, orange = à surveiller, rouge = à corriger.</p></div>
      <dl><dt>Ce que c'est</dt><dd>${linkRefs(esc(g.what))}</dd><dt>Comment c'est mesuré</dt><dd>${linkRefs(esc(g.how))}</dd><dt>Cible</dt><dd>${linkRefs(esc(g.target))}</dd><dt>Erreurs fréquentes</dt><dd>${linkRefs(esc(g.mistakes))}</dd><dt>Le conseil du coach</dt><dd>${linkRefs(esc(g.tip))}</dd></dl></div></article>`;
  }).join("");
}

/** HTML d'une fiche technique. */
function strokeGuideHTML(key) {
  const g = STROKE_GUIDE[key];
  const li = (a) => a.map((x) => `<li>${linkRefs(esc(x))}</li>`).join("");
  return `<details class="gdet"><summary>${g.icon} ${esc(g.title)}</summary>
    <h4>Les clés techniques</h4><ol class="clean">${li(g.keys)}</ol>
    <h4>Erreurs fréquentes</h4><ul class="clean">${li(g.faults)}</ul>
    <h4>Progression</h4><ul class="clean"><li><b>Débutant :</b> ${linkRefs(esc(g.levels.debutant))}</li><li><b>Intermédiaire :</b> ${linkRefs(esc(g.levels.intermediaire))}</li><li><b>Avancé :</b> ${linkRefs(esc(g.levels.avance))}</li></ul>
    <h4>Comment filmer</h4><p>${linkRefs(esc(g.camera))}</p></details>`;
}

/** HTML d'une section transversale (le contenu est maîtrisé : liens de références seulement). */
const sectionHTML = (s) => `<details class="gdet"><summary>${s.icon} ${esc(s.title)}</summary>${linkRefs(s.html)}</details>`;

return { GLOSSARY, glossaryFigure, glossaryDef, STROKE_GUIDE, GUIDE_SECTIONS, linkRefs, glossaryHTML, strokeGuideHTML, sectionHTML };
})();
const __M_tactics = (() => {
"use strict";
// Moteur tactique à règles : questionnaire (joueur / adversaire / conditions) → plan de jeu + schémas.
// Approche explicable : chaque schéma reçoit un score et des raisons lisibles (pas de boîte noire).

const STYLES = {
  attaquant: "Attaquant de fond de court : prend la balle tôt, cherche à dicter l'échange, accepte le risque.",
  contreur: "Contreur : utilise la vitesse adverse, défend bien et contre-attaque dans les pieds.",
  limeur: "Limeur : coupe (slice), « chope » toutes les balles et vous laisse faire la faute.",
  rameur: "Rameur : ramène toutes les balles, il faut le « bousculer » ; il vous laisse faire la faute.",
  sv: "Serveur-volleyeur / joueur de filet : écourte les points, service puis montée.",
  complet: "Polyvalent : sait varier les rythmes et les placements.",
};

const opt = (arr) => arr.map(([value, label]) => ({ value, label }));
const STYLE_OPTS = [["attaquant", "Attaquant de fond de court — prend la balle tôt, dicte l'échange"], ["contreur", "Contreur — utilise votre vitesse, contre-attaque"], ["limeur", "Limeur — coupe (slice), prend toutes les balles, attend la faute"], ["rameur", "Rameur — ramène tout, à bousculer, attend la faute"], ["sv", "Serveur-volleyeur / filet"], ["complet", "Polyvalent / inconnu"]];

const QUESTIONS = [
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

function defaultAnswers() {
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

const PATTERNS = [
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
  // ===== Actualisation du 16/11/2026 : schémas supplémentaires =====
  // ----- SERVICE
  { id: "sv_plus1_bh", phase: "Service", name: "Service sur le revers, puis attaque en long de ligne",
    desc: "Le service au revers donne souvent un retour faible ou court : prenez la balle tôt et attaquez dans le grand côté ouvert (long de ligne).",
    steps: [m(0.62, 0, 0.12, 0.66, "1 Service au revers"), o(0.2, 1, 0.55, 0.2, "2 Retour faible"), m(0.55, 0.2, 0.92, 0.92, "3 Attaque long de ligne")],
    fit: (P, O, C) => mk(2).add(wk(O, "bh"), 3, "Son revers est un point faible.").add(has(P.p_weapon, "fh"), 2, "Votre coup droit finit bien la balle.").add(P.p_serve1 !== "low", 1, "Votre 1re balle est assez régulière pour viser une zone.").done() },
  { id: "sv_vary", phase: "Service", name: "Varier les zones : jamais deux fois le même service",
    desc: "Alternez T, extérieur et corps selon un ordre non prévisible : l'adversaire ne peut plus anticiper et son retour perd en précision.",
    steps: [m(0.62, 0, 0.47, 0.68, "1 T"), m(0.62, 0, 0.06, 0.68, "2 Extérieur"), m(0.62, 0, 0.3, 0.64, "3 Corps")],
    fit: (P, O, C) => mk(2).add(O.o_style === "attaquant" || like(O, "return"), 3, "Il prend vite le retour : ne le laissez pas anticiper.").add(level(P) >= 2, 1, "À votre niveau, la variation des zones est rentable.").add(P.p_serve1 === "high", 1, "Vous placez bien vos 1res balles.").done() },
  { id: "sv_second_deep", phase: "Service", name: "2e service profond au corps (sécurité)",
    desc: "Un 2e service lifté au corps, bien profond, évite les doubles fautes et limite l'attaque du retourneur.",
    steps: [m(0.38, 0, 0.7, 0.72, "1 2e service profond au corps"), o(0.75, 1, 0.5, 0.2, "2 Retour contraint"), m(0.5, 0.1, 0.4, 0.9, "3 Reprise du point")],
    fit: (P, O, C) => mk(1).add(P.p_serve2 === "weak" || P.p_weak.includes("serve2"), 4, "Votre 2e service est fragile : sécurité d'abord.").add(O.o_style === "attaquant" || like(O, "return"), 2, "Il attaque les secondes balles.").add(C.c_wind !== "none", 1, "Vent : réduire le risque.").done() },
  // ----- RETOUR
  { id: "ret_long_line", phase: "Retour", name: "Retour long de ligne en surprise",
    desc: "Après plusieurs retours croisés, un retour long de ligne surprend l'adversaire qui s'est déplacé vers le centre ou le filet.",
    steps: [o(0.55, 0, 0.35, 1, "Service"), m(0.35, 1, 0.05, 0.9, "Retour long de ligne")],
    fit: (P, O, C) => mk(0).add(O.o_pos === "in", 3, "Il avance après le service : la ligne est ouverte.").add(O.o_net === "high" || like(O, "net"), 3, "Il monte au filet : un retour long de ligne le surprend.").add(level(P) >= 2, 1, "Option rentable à ce niveau.").done() },
  { id: "ret_slice_low", phase: "Retour", name: "Retour slicé bas sur gros service",
    desc: "Contre un service puissant, le retour slicé bas et compact absorbe la vitesse et laisse du temps pour se replacer.",
    steps: [o(0.55, 0, 0.35, 1, "Gros service"), m(0.35, 1, 0.6, 0.72, "Retour slicé bas et compact")],
    fit: (P, O, C) => mk(1).add(O.o_serve === "big", 4, "Gros service : absorbez la vitesse.").add(["dur_rapide", "indoor", "gazon"].includes(C.c_surface), 2, "Surface rapide : la balle glisse.").add(wk(O, "lowball"), 2, "Il n'aime pas les balles basses.").done() },
  // ----- ÉCHANGE
  { id: "ry_triangle", phase: "Échange", name: "Triangle : croisé, croisé, puis long de ligne",
    desc: "Deux croisés profonds pour fixer l'adversaire, puis un changement de ligne sur une balle courte : le terrain à couvrir est le plus grand.",
    steps: [m(0.2, 0, 0.8, 0.95, "1 Croisé"), o(0.8, 1, 0.2, 0.05, "2 Retour croisé"), m(0.2, 0.05, 0.8, 0.95, "3 Croisé"), o(0.8, 1, 0.25, 0.1, "4 Balle courte"), m(0.25, 0.1, 0.05, 0.9, "5 Long de ligne")],
    fit: (P, O, C) => mk(2).add(["limeur", "contreur", "complet", "rameur"].includes(P.p_style), 2, "Jeu régulier adapté à ce schéma.").add(level(P) <= 2, 2, "Croisé = zone la plus sûre.").add(O.o_style === "rameur", 1, "Un joueur qui ramène tout finit par offrir une balle courte.").done() },
  { id: "ry_defense_lob", phase: "Échange", name: "Défense : lob profond puis reprise du point",
    desc: "Quand vous êtes poussé hors du terrain, un lob profond au centre redonne le temps de revenir et neutralise l'attaque adverse.",
    steps: [o(0.15, 1, 0.85, 0.05, "1 Balle qui vous pousse"), m(0.85, 0.05, 0.4, 0.97, "2 Lob défensif profond"), o(0.4, 1, 0.55, 0.15, "3 Retour neutre"), m(0.5, 0.0, 0.5, 0.9, "4 Reprise du point")],
    fit: (P, O, C) => mk(1).add(O.o_style === "attaquant", 3, "Il dicte le jeu : cassez son attaque.").add(P.p_weak.includes("move"), 2, "Gagne du temps pour se replacer.").add(C.c_wind === "back", -3, "Vent dans le dos : risque de long.").done() },
  { id: "ry_slice_lob", phase: "Échange", name: "Slice court puis lob",
    desc: "Un slice court attire l'adversaire vers le filet, puis un lob profond le prend à contre-pied : il doit repartir vers le fond.",
    steps: [m(0.3, 0, 0.65, 0.6, "1 Slice court"), o(0.6, 1, 0.65, 0.62, "2 Il avance"), m(0.4, 0.05, 0.35, 0.98, "3 Lob profond")],
    fit: (P, O, C) => mk(0).add(wk(O, "short"), 3, "Il gère mal les balles courtes.").add(O.o_pos === "deep", 3, "Il joue en retrait : il doit avancer puis reculer.").add(C.c_surface === "terre", 1).add(C.c_wind === "face", -2, "Vent de face : le lob est difficile à doser.").done() },
  { id: "ry_wrongfoot", phase: "Échange", name: "Contre-pied : jouer derrière le joueur",
    desc: "Quand l'adversaire court d'un côté, renvoyez la balle dans la zone qu'il vient de quitter : il ne peut pas inverser son appui.",
    steps: [m(0.8, 0, 0.2, 0.95, "1 Croisé à gauche"), o(0.2, 1, 0.4, 0.1, "2 Il est excentré"), m(0.4, 0.1, 0.78, 0.95, "3 Derrière lui")],
    fit: (P, O, C) => mk(1).add(wk(O, "lateral") || O.o_move !== "good", 3, "Sa mobilité latérale est limitée.").add(like(O, "cross"), 2, "Il s'installe en croisé : jouez derrière lui.").add(level(P) >= 2, 1).done() },
  { id: "ry_pace_change", phase: "Échange", name: "Changement de rythme : lift lourd puis accélération plate",
    desc: "Une balle haute et lourde lui fait perdre son rythme, puis une accélération à plat sur la balle suivante le surprend.",
    steps: [m(0.25, 0, 0.8, 0.95, "1 Lift lourd"), o(0.8, 1, 0.3, 0.1, "2 Balle haute"), m(0.3, 0.1, 0.15, 0.9, "3 Accélération plate")],
    fit: (P, O, C) => mk(1).add(dislike(O, "pace"), 3, "Il n'aime pas les changements de rythme.").add(O.o_style === "rameur" || O.o_style === "limeur", 3, "À bousculer : il ne prend pas de risque.").add(O.o_react === "passive", 1).done() },
  { id: "ry_feet", phase: "Échange", name: "Jouer dans les pieds du joueur qui monte",
    desc: "Contre un joueur de filet, une balle basse et rapide dans ses pieds l'oblige à volleyer vers le haut : le passing devient facile.",
    steps: [o(0.4, 0.55, 0.5, 0.5, "1 Il monte"), m(0.7, 0, 0.5, 0.52, "2 Balle dans les pieds")],
    fit: (P, O, C) => mk(0).add(O.o_net === "high" || like(O, "net") || O.o_react === "net", 4, "Il monte souvent au filet.").add(dislike(O, "low"), 2, "Il n'aime pas les balles basses.").done() },
  // ----- FILET
  { id: "net_block_short", phase: "Filet", name: "Volée de blocage profonde, puis volée courte",
    desc: "Une première volée profonde au fond de court, puis une volée courte croisée pour terminer le point.",
    steps: [m(0.5, 0.5, 0.1, 0.85, "1 Volée profonde croisée"), o(0.1, 1, 0.45, 0.35, "2 Défense adverse"), m(0.4, 0.55, 0.55, 0.62, "3 Volée courte")],
    fit: (P, O, C) => mk(1).add(P.p_net !== "low", 3, "Vous êtes à l'aise au filet.").add(O.o_style === "limeur" || O.o_style === "rameur", 2, "Il ramène tout : finissez au filet.").add(wk(O, "short"), 1).done() },
  { id: "net_smash", phase: "Filet", name: "Smash : placement avant puissance",
    desc: "Contre un lob, placez-vous sous la balle avec des pas chassés, frappez dans le grand côté ouvert et gardez de la marge.",
    steps: [o(0.5, 1, 0.5, 0.2, "1 Lob adverse"), m(0.5, 0.35, 0.9, 0.9, "2 Smash dans le grand côté")],
    fit: (P, O, C) => mk(0).add(like(O, "lob") || O.o_style === "limeur", 3, "Il lobe souvent.").add(P.p_net === "high", 2).add(C.c_sun === "yes", -2, "Soleil : lancez-vous tôt sous la balle.").done() },
  { id: "net_approach_slice", phase: "Filet", name: "Approche slicée long de ligne",
    desc: "L'approche slicée reste basse : l'adversaire ne peut pas attaquer le passing, et le slice vous laisse le temps de monter.",
    steps: [m(0.4, 0.3, 0.92, 0.95, "1 Approche slicée"), m(0.92, 0.6, 0.55, 0.5, "2 Montée au filet"), o(0.92, 1, 0.5, 0.2, "3 Passing contraint")],
    fit: (P, O, C) => mk(0).add(["gazon", "dur_rapide", "indoor"].includes(C.c_surface), 3, "Surface rapide : le slice glisse.").add(P.p_net !== "low", 2).add(wk(O, "passing"), 2, "Son passing est faible.").add(P.p_net === "low", -3).done() },
  // ----- DOUBLE
  { id: "db_australian", phase: "Double", dbl: true, name: "Formation australienne",
    desc: "Le serveur et son partenaire sont du même côté du terrain : cela perturbe le retour croisé habituel et protège un côté faible.",
    steps: [m(0.62, 0, 0.45, 0.66, "Service T"), m(0.75, 0.5, 0.55, 0.62, "Partenaire du même côté, au filet")],
    fit: (P, O, C) => mk(2).add(C.c_mode === "double", 1).add(O.o_style === "attaquant" || like(O, "return"), 2, "Le retour croisé est son point fort : changez la donne.").done() },
  { id: "db_i_formation", phase: "Double", dbl: true, name: "Formation « I » avec signaux",
    desc: "Le partenaire se place au centre, accroupi, et indique par un signal s'il croise ou reste. Le retourneur ne sait pas d'où viendra la volée.",
    steps: [m(0.5, 0, 0.45, 0.66, "Service"), m(0.5, 0.5, 0.7, 0.62, "Partenaire au centre : poach ou reste")],
    fit: (P, O, C) => mk(2).add(P.p_net !== "low", 2).add(C.c_mode === "double", 1).done() },
  { id: "db_lob_cross", phase: "Double", dbl: true, name: "Retour lobé croisé sur le volleyeur",
    desc: "Quand le partenaire adverse est au filet, un lob croisé le fait reculer et ouvre le terrain.",
    steps: [o(0.55, 0, 0.35, 1, "Service"), m(0.35, 1, 0.8, 0.98, "Lob croisé")],
    fit: (P, O, C) => mk(2).add(O.o_net === "high" || like(O, "net"), 3, "L'adversaire monte souvent.").add(C.c_wind === "face", -2).done() },
  { id: "db_target_weak", phase: "Double", dbl: true, name: "Cibler l'adversaire le plus faible",
    desc: "Au double, 2 à 3 balles sur 4 vers le joueur le plus fragile ; il finit par faire la faute ou affaiblit son partenaire.",
    steps: [m(0.5, 0, 0.8, 0.9, "Balle au plus faible"), o(0.8, 1, 0.5, 0.2, "Retour sous contrainte")],
    fit: (P, O, C) => mk(3).add(wk(O, "bh") || wk(O, "fh"), 3, "Une faiblesse est repérée.").done() },
];

// --- Moteur ------------------------------------------------------------------------------------------------
const label = (list, id) => ((list.find((x) => x.value === id) || {}).label || id).split(" — ")[0];

function buildPlan(A) {
  const P = A, O = A, C = A;
  const dbl = A.c_mode === "double";
  const rank = (phase, n, min = 3) => PATTERNS.filter((p) => p.phase === phase && !!p.dbl === dbl)
    .map((p) => ({ p, ...p.fit(P, O, C) })).filter((x) => x.score >= min).sort((a, b) => b.score - a.score).slice(0, n);
  const patterns = dbl ? rank("Double", 6, 3) : [...rank("Service", 3, 3), ...rank("Retour", 2, 3), ...rank("Échange", 4, 3), ...rank("Filet", 2, 4)];

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
  check.push("Échauffement de 15 minutes : mobilité, déplacements, puis frappes progressives ; testez les balles, le rebond et le vent (ou le soleil) avant le premier jeu.");
  check.push("Pendant le match : après 6 jeux, bilan flash (ce qui marche / ce que j'abandonne) ; à chaque changement de côté, boire, respirer, rappeler le plan.");
  check.push("Entre les points : respirer, choisir zone + hauteur, jouer le point suivant.");
  check.push("Après le match : notez 1res balles en jeu, points gagnés sur 1re/2e balle, fautes directes / coups gagnants, 2 choses réussies et 1 axe de progrès.");
  const growthByStyle = {
    attaquant: ["Ajoutez de la variation de hauteur et de rythme (slice, balle haute) pour ne pas dépendre de votre seule vitesse.", "Fabriquez un coup de sécurité (croisé profond) pour les moments difficiles.", "Patience sur 3 balles : l'attaque vient quand la balle est courte."],
    contreur: ["Ajoutez une arme pour finir (coup droit inside-in, passing) afin de ne pas attendre la faute.", "Travaillez l'anticipation et la transition défense → attaque.", "Apprenez à jouer plus fort sur les balles courtes."],
    limeur: ["Gagnez en profondeur : balles près de la ligne de fond pour repousser l'adversaire.", "Développez la montée au filet sur balle courte.", "Ajoutez un deuxième rythme (lift lourd) pour ne pas être prévisible."],
    rameur: ["Ajoutez une accélération contrôlée sur la première balle faible.", "Travaillez un jeu de filet minimal (volée de blocage, smash).", "Gérez l'énergie : points courts quand c'est possible."],
    sv: ["Retour solide et profond avant tout : le service seul ne suffit pas.", "Volée basse et placement en 2 temps (profondeur puis angle).", "Passing défensif pour les jours où la montée ne passe pas."],
    complet: ["Choisissez une signature (service + 1, coup droit inside-out…) pour décider les points importants.", "Entraînez les variations jusqu'à ce qu'elles soient réflexes.", "Évitez de tout changer à chaque jeu : un seul changement à la fois."],
  };
  const growth = growthByStyle[A.p_style] || growthByStyle.complet;

  return { principles, serve, ret, cond, situ, avoid, check, growth, patterns, headline: `Plan de jeu — ${label(QUESTIONS[0].items[0].options, A.p_style)} vs ${label(QUESTIONS[1].items[0].options, A.o_style)} (${label(QUESTIONS[2].items[1].options, A.c_surface)})` };
}

// --- Schéma SVG d'un court -----------------------------------------------------------------------------------
function courtSVG(pattern, leftHanded) {
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


return { STYLES, QUESTIONS, defaultAnswers, PATTERNS, buildPlan, courtSVG };
})();
const __M_coach = (() => {
"use strict";
// Espace joueur ↔ coach : échanges par fichiers (aucun serveur). Le joueur exporte un « dossier joueur » (JSON),
// le coach l'importe, commente et renvoie un « retour coach » (JSON) que le joueur importe à son tour.
// Les données restent sur les appareils ; les fichiers peuvent être envoyés par mail, messagerie ou cloud personnel.

const APP = "tennis-coach-ia";

const load = (k, d) => { try { const v = localStorage.getItem("tca." + k); return v ? JSON.parse(v) : d; } catch { return d; } };
const save = (k, v) => { try { localStorage.setItem("tca." + k, JSON.stringify(v)); return true; } catch { return false; } };

const getProfile = () => load("profile", { name: "", heightCm: "", coachName: "" });
const setProfile = (p) => save("profile", p);

/** Construit le dossier joueur. images : tableau de { label, dataUrl } (facultatif). */
function buildPackage({ profile, history, answers, current, images }) {
  return {
    app: APP, kind: "player-package", v: 1, createdAt: new Date().toISOString(),
    player: { name: profile.name || "Joueur", heightCm: profile.heightCm || null, coach: profile.coachName || "" },
    history: (history || []).slice(-30),
    current: current || null, // { stroke, score, issues:[{id}], metrics:[{id,label,value,unit,status}], notes, date }
    tactics: answers || null,
    images: images || [],
  };
}

function parseFile(text) {
  let o;
  try { o = JSON.parse(text); } catch { throw new Error("Fichier illisible (JSON invalide)."); }
  if (!o || o.app !== APP) throw new Error("Ce fichier n'a pas été créé par Tennis Coach IA.");
  if (!["player-package", "coach-feedback"].includes(o.kind)) throw new Error("Type de fichier inconnu.");
  return o;
}

// --- Côté coach : joueurs importés -------------------------------------------------------------------------
const listPlayers = () => load("coach.players", []);

function importPlayer(pkg) {
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

function addComment(playerId, comment) {
  const players = listPlayers();
  const p = players.find((x) => x.id === playerId);
  if (!p) return null;
  p.comments = [...(p.comments || []), { ...comment, date: new Date().toISOString() }];
  save("coach.players", players);
  return p;
}

function deletePlayer(id) { save("coach.players", listPlayers().filter((p) => p.id !== id)); }

function buildFeedback({ player, coachName, general, comments }) {
  return { app: APP, kind: "coach-feedback", v: 1, createdAt: new Date().toISOString(), to: player.name, from: coachName || "Coach", general: general || "", items: comments || [] };
}

// --- Côté joueur : retours reçus -----------------------------------------------------------------------------
const listFeedback = () => load("feedback", []);
function importFeedback(fb) {
  const all = listFeedback();
  all.unshift({ ...fb, receivedAt: new Date().toISOString() });
  save("feedback", all.slice(0, 50));
}

// --- Assistant IA : réglages ------------------------------------------------------------------------------------
const getAI = () => load("ai", { apiKey: "", model: "claude-opus-5-5" });
const setAI = (s) => save("ai", s);

/** Partage (feuille de partage Android) ou téléchargement du fichier. */
async function shareOrDownload(obj, filename, title) {
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

return { getProfile, setProfile, buildPackage, parseFile, listPlayers, importPlayer, addComment, deletePlayer, buildFeedback, listFeedback, importFeedback, getAI, setAI, shareOrDownload };
})();
const __M_assistant = (() => {
"use strict";
// Assistant « coach » : reformule les conseils avec Claude. Clé API personnelle (BYOK) conservée uniquement sur cet appareil.
// Seules des données textuelles (mesures, défauts, profil, réponses tactiques) sont envoyées : jamais les vidéos ni les images.

const SDK_URL = "https://cdn.jsdelivr.net/npm/@anthropic-ai/sdk@1.0.0/+esm";

const MODELS = [
  { id: "claude-opus-5-5", label: "Claude Opus 5.5 (le plus capable)" },
  { id: "claude-sonnet-5-5", label: "Claude Sonnet 5.5 (équilibré)" },
  { id: "claude-haiku-5-5", label: "Claude Haiku 5.5 (rapide, économique)" },
];

const SYSTEM = `Tu es un entraîneur de tennis diplômé, bienveillant et précis, qui s'exprime en français.
Tu reçois des mesures biomécaniques estimées automatiquement à partir d'une vidéo de smartphone (précision limitée), des défauts détectés et le profil du joueur.
Règles :
- N'invente aucune mesure ni aucun fait absent des données ; signale l'incertitude quand l'estimation est limite.
- Pas de diagnostic médical : en cas de douleur (épaule, coude, dos), recommande de consulter un professionnel de santé.
- Adapte le vocabulaire et la quantité d'information au niveau du joueur.
- Réponds de façon concise, structurée et motivante.`;

let sdk = null;
async function client(apiKey) {
  if (!sdk) sdk = (await import(SDK_URL)).default;
  return new sdk({ apiKey, dangerouslyAllowBrowser: true });
}

function buildAnalysisPrompt({ stroke, profile, metrics, issues, notes }) {
  const data = { geste: stroke, profil: profile, mesures: metrics, defauts_detectes: issues, remarques: notes };
  return `Voici l'analyse d'un geste de tennis :\n\n${JSON.stringify(data, null, 2)}\n\nRédige pour le joueur :\n1. Un résumé en 2 phrases.\n2. Les 3 priorités de progression, chacune avec une consigne simple (image mentale) et UN exercice concret adapté à son niveau et à son objectif.\n3. Une phrase d'encouragement.\nMaximum 250 mots.`;
}

function buildTacticsPrompt({ headline, principles, serve, ret, patterns, cond }) {
  const data = { titre: headline, principes: principles, service: serve, retour: ret, schemas: patterns, conditions: cond };
  return `Voici le plan tactique généré pour un match de tennis :\n\n${JSON.stringify(data, null, 2)}\n\nRédige un briefing d'avant-match en 10 lignes maximum : l'idée directrice, 3 schémas à jouer, 2 pièges à éviter, une consigne mentale pour les moments difficiles.`;
}

/** Appelle Claude et renvoie le texte. */
async function askClaude({ apiKey, model, prompt }) {
  if (!apiKey) throw new Error("Aucune clé API : renseignez-la dans l'onglet Coach › Assistant.");
  const c = await client(apiKey);
  try {
    const msg = await c.messages.create({
      model,
      max_tokens: 2000,
      system: SYSTEM,
      output_config: { effort: "low" },
      messages: [{ role: "user", content: prompt }],
    });
    return msg.content.filter((b) => b.type === "text").map((b) => b.text).join("\n").trim() || "(réponse vide)";
  } catch (e) {
    const code = e?.status;
    if (code === 401) throw new Error("Clé API refusée (401). Vérifiez-la.");
    if (code === 429) throw new Error("Limite de débit atteinte (429). Réessayez dans un instant.");
    throw new Error(`Erreur de l'assistant${code ? " (" + code + ")" : ""} : ${e?.message || e}`);
  }
}

const getSystemPrompt = () => SYSTEM;

return { MODELS, buildAnalysisPrompt, buildTacticsPrompt, askClaude, getSystemPrompt };
})();
const __M_pose = (() => {
"use strict";
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

async function loadPose(model = "full", onStatus = () => {}) {
  if (landmarker && loadedModel === model) return landmarker;
  onStatus("Chargement du moteur IA (première fois : ~10 Mo)…");
  // Mode hors-ligne : si les fichiers ont été téléchargés (scripts/fetch-offline-assets.ps1), ils sont utilisés en priorité.
  const local = new URL("vendor/mediapipe/", document.baseURI).href;
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

function openVideo(file) {
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
async function detectRotation(src) {
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

/** Aperçu pour « choisir le joueur par toucher » : image (orientée) + personnes détectées. Coordonnées normalisées. */
async function previewPlayers(src, t, rot = "auto") {
  if (rot === "auto") rot = await detectRotation(src);
  const full = makeFull(src, rot);
  await seek(src.video, t);
  drawFull(src, full, rot);
  const persons = findPlayers(full).filter((p) => p.h > full.height * 0.02).map((p) => ({ cx: p.cx / full.width, cy: p.cy / full.height, h: p.h / full.height, pts: p.pts.map((q) => ({ x: q.x / full.width, y: q.y / full.height })) }));
  return { canvas: full, persons, rot };
}

async function processVideo(src, { start = 0, end, fps = 20, rot = "auto", seed = null, onProgress = () => {}, signal, onStatus = () => {} }) {
  const { video } = src;
  if (seed && seed.rot != null && rot === "auto") rot = seed.rot;
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
      // joueur désigné par toucher : le plus proche du point choisi (ou de la dernière position connue) ; sinon le plus grand
      const ref = track ? { x: track.cx, y: track.cy } : seed ? { x: seed.x * W, y: seed.y * H } : null;
      if (ps.length) pick = ref ? ps.reduce((a, b) => (Math.hypot(b.cx - ref.x, b.cy - ref.y) < Math.hypot(a.cx - ref.x, a.cy - ref.y) ? b : a)) : ps.reduce((a, b) => (b.h > a.h ? b : a));
    }
    if (pick) {
      track = { cx: pick.cx, cy: pick.cy, h: track ? track.h * 0.5 + pick.h * 0.5 : pick.h }; miss = 0;
      frames.push({ t: t - start, lm: toLm(pick), wl: toWl(pick) });
    } else { miss++; if (miss > 6) track = null; frames.push({ t: t - start, lm: null, wl: null }); }
    onProgress(k / total);
  }
  return { frames, aspect: W / H, size: [W, H], offset: start, rot };
}

async function processImages(files, { maxW = 960, onProgress = () => {} }) {
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
async function grabFrame(src, t, rot = 0) {
  const full = makeFull(src, rot);
  await seek(src.video, t);
  drawFull(src, full, rot);
  return full;
}

// Recadre l'image autour du joueur (marge) et recalcule les points : les keyframes restent lisibles même si le joueur est petit.
function cropToPlayer(canvas, lm, margin = 0.6) {
  if (!lm) return { canvas, lm, map: (p) => p };
  const W = canvas.width, H = canvas.height;
  const xs = lm.map((p) => p.x * W), ys = lm.map((p) => p.y * H);
  const minX = Math.min(...xs), maxX = Math.max(...xs), minY = Math.min(...ys), maxY = Math.max(...ys);
  const side = Math.max(maxX - minX, maxY - minY) * (1 + margin);
  const x0 = Math.max(0, Math.min(W - side, (minX + maxX) / 2 - side / 2)), y0 = Math.max(0, Math.min(H - side, (minY + maxY) / 2 - side / 2));
  const s = Math.min(side, W, H), out = 520;
  const c = document.createElement("canvas"); c.width = c.height = out;
  c.getContext("2d").drawImage(canvas, x0, y0, s, s, 0, 0, out, out);
  const map = (p) => ({ ...p, x: (p.x * W - x0) / s, y: (p.y * H - y0) / s }); // image complète → image recadrée
  return { canvas: c, lm: lm.map(map), map };
}

const BONES = [[11, 12], [11, 13], [13, 15], [12, 14], [14, 16], [11, 23], [12, 24], [23, 24], [23, 25], [25, 27], [24, 26], [26, 28], [27, 31], [28, 32]];

function drawSkeleton(canvas, lm, { hand = "right", color = "#22d3a6" } = {}) {
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
function drawAngleLabel(canvas, lm, a, b, c, text) {
  const ctx = canvas.getContext("2d");
  const W = canvas.width, H = canvas.height;
  const bx = lm[b].x * W, by = lm[b].y * H;
  ctx.font = `bold ${Math.max(12, W / 40)}px system-ui, sans-serif`;
  ctx.fillStyle = "#000a"; ctx.fillRect(bx + 8, by - 22, ctx.measureText(text).width + 10, Math.max(18, W / 32));
  ctx.fillStyle = "#fff"; ctx.fillText(text, bx + 13, by - 6);
}

return { loadPose, openVideo, detectRotation, previewPlayers, processVideo, processImages, grabFrame, cropToPlayer, drawSkeleton, drawAngleLabel };
})();
const __M_extras = (() => {
"use strict";
// Fonctions d'affichage avancées : images clés, comparaison à un modèle, lecteur ralenti annoté, mesures calibrées.
const { grabFrame, cropToPlayer, drawSkeleton, drawAngleLabel } = __M_pose;
const { figureSVG, IDEAL } = __M_posefig;
const { METRIC_DEFS } = __M_metrics;

const S_IDX = (hand) => (hand === "left" ? [11, 13, 15] : [12, 14, 16]);

/** Image d'une phase (load / contact / follow) recadrée sur le joueur, squelette et angles dessinés. */
async function phaseCanvas(L, src, k, { labels = true, targets = false } = {}) {
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
async function renderCompare(L, src, host, stroke) {
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
async function renderRefCompare(L, src, R, refSrc, host, topUser, topRef) {
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
function calibratedHTML(L, heightCm, stroke) {
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
function mountSlowmo(host, L, src) {
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

return { phaseCanvas, renderCompare, renderRefCompare, calibratedHTML, mountSlowmo };
})();
const __M_app = (() => {
"use strict";
const { STROKES, ISSUES, EXERCISES, REFERENCES, REFERENCES_UPDATED, LEVELS } = __M_knowledge;
const { glossaryHTML, strokeGuideHTML, GUIDE_SECTIONS, sectionHTML, STROKE_GUIDE } = __M_guide;
const { analyze, segmentStrokes, aggregate } = __M_metrics;
const { loadPose, openVideo, processVideo, processImages, previewPlayers } = __M_pose;
const { issueFigure, gaugeSVG } = __M_posefig;
const { phaseCanvas, renderCompare, renderRefCompare, calibratedHTML, mountSlowmo } = __M_extras;
const { askClaude, buildAnalysisPrompt, buildTacticsPrompt, getSystemPrompt, MODELS } = __M_assistant;
const coach = __M_coach;
const { QUESTIONS, defaultAnswers, buildPlan, courtSVG } = __M_tactics;

const $ = (s, r = document) => r.querySelector(s);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const store = {
  get(k, d) { try { const v = localStorage.getItem("tca." + k); return v ? JSON.parse(v) : d; } catch { return d; } },
  set(k, v) { try { localStorage.setItem("tca." + k, JSON.stringify(v)); } catch { /* stockage indisponible */ } },
};

const state = {
  tab: "home",
  stroke: store.get("stroke", "serve"),
  hand: store.get("hand", "right"),
  goal: store.get("goal", "s2"),
  answers: { ...defaultAnswers(), ...store.get("answers", {}) },
  last: null, // dernière analyse
  seed: null, // joueur désigné par toucher
  showTargets: store.get("showTargets", true), // cibles en pointillés sur les images clés
  ref: null, // analyse de référence (comparaison)
  media: null, // { kind, src|files, ... }
  busy: false,
};

window.__tca = state; // aide au débogage (console du navigateur)
const TABS = [["home", "Accueil"], ["analyse", "Analyse"], ["tactic", "Tactique"], ["exo", "Exercices"], ["track", "Suivi"], ["guide", "Guide"], ["coach", "Coach"], ["src", "Sources"]];

function toast(msg) { const t = $("#toast"); t.textContent = msg; t.classList.add("show"); clearTimeout(toast.h); toast.h = setTimeout(() => t.classList.remove("show"), 3500); }

function go(tab) { state.tab = tab; history.replaceState(null, "", "#" + tab); render(); window.scrollTo(0, 0); }

function render() {
  $("#nav").innerHTML = TABS.map(([id, l]) => `<button data-tab="${id}" ${state.tab === id ? 'aria-current="page"' : ""}>${l}</button>`).join("");
  const view = { home: viewHome, analyse: viewAnalyse, tactic: viewTactic, exo: viewExo, track: viewTrack, guide: viewGuide, coach: viewCoach, src: viewSources }[state.tab];
  $("#app").innerHTML = view();
  ({ home: bindHome, analyse: bindAnalyse, tactic: bindTactic, exo: bindExo, track: bindTrack, guide: bindGuide, coach: bindCoach, src: () => {} })[state.tab]?.();
}

document.addEventListener("click", (e) => {
  const t = e.target.closest("[data-tab]");
  if (t) go(t.dataset.tab);
  const g = e.target.closest("[data-go]");
  if (g) {
    go(g.dataset.go);
    const ref = g.dataset.ref;
    if (ref) setTimeout(() => { const el = document.getElementById("ref-" + ref); if (el) { el.scrollIntoView({ block: "center" }); el.classList.add("flash"); } }, 60);
  }
});

// =========================== ACCUEIL ===========================================================================
function viewHome() {
  const hist = store.get("history", []);
  return `
  <section class="card hero">
    <h2>Progressez à votre rythme, avec l'IA comme œil de coach</h2>
    <p>Filmez un service, un coup droit, un revers ou une volée : l'IA détecte votre squelette 3D <b>directement sur votre téléphone</b> (aucune vidéo n'est envoyée), mesure les angles clés et vous propose des corrections et des exercices adaptés à votre objectif (par ex. atteindre la 2e série).</p>
    <div class="row"><button class="btn" data-go="analyse">📹 Analyser un geste</button><button class="btn secondary" style="color:#fff;border-color:#fff6" data-go="tactic">🧠 Plan tactique</button></div>
  </section>
  <div class="grid three">
    <section class="card"><h3>1 · Analyse des gestes</h3><p class="muted">Import vidéo, photos ou rafale. Score technique, images clés annotées, défauts priorisés et exercices.</p><button class="btn secondary" data-go="analyse">Ouvrir</button></section>
    <section class="card"><h3>2 · Questionnaire tactique</h3><p class="muted">Votre style, celui de l'adversaire, la surface, le vent… → plan de jeu et schémas de points.</p><button class="btn secondary" data-go="tactic">Ouvrir</button></section>
    <section class="card"><h3>3 · Programme & suivi</h3><p class="muted">Plan d'entraînement sur 4 semaines selon vos défauts et votre objectif. ${hist.length} analyse(s) enregistrée(s).</p><button class="btn secondary" data-go="exo">Ouvrir</button></section>
  </div>
  <section class="card"><h3>Comment ça marche</h3>
    <ol class="clean"><li><b>Filmez</b> le joueur entier, caméra fixe, à hauteur de hanche (conseils affichés par geste).</li><li>L'IA (MediaPipe BlazePose) extrait 33 points du corps image par image.</li><li>L'app calcule des angles et positions et les compare à des <b>repères pédagogiques</b> tirés de la littérature de biomécanique du tennis.</li><li>Elle hiérarchise les défauts et propose <b>consignes + exercices</b>.</li></ol>
    <div class="notice">⚠️ Estimation 3D à partir d'une seule caméra : précision limitée (±5–10° selon l'angle de filmage). Les résultats sont des <b>pistes de travail</b>, pas un diagnostic. En cas de douleur (épaule, coude), consultez un professionnel de santé.</div>
  </section>`;
}
function bindHome() {}

// =========================== ANALYSE ===========================================================================
function viewAnalyse() {
  const s = STROKES[state.stroke];
  return `
  <section class="card">
    <h2>Analyse de geste</h2>
    <label class="field">Geste</label>
    <div class="chips" id="strokeChips">${Object.entries(STROKES).map(([k, v]) => `<button class="chip" data-stroke="${k}" aria-pressed="${state.stroke === k}">${v.icon} ${v.label}</button>`).join("")}</div>
    <div class="grid two">
      <div><label class="field" for="hand">Main de frappe</label><select id="hand"><option value="right" ${state.hand === "right" ? "selected" : ""}>Droitier</option><option value="left" ${state.hand === "left" ? "selected" : ""}>Gaucher</option></select></div>
      <div><label class="field" for="goal">Objectif de niveau</label><select id="goal">${Object.entries(LEVELS).map(([k, v]) => `<option value="${k}" ${state.goal === k ? "selected" : ""}>${v}</option>`).join("")}</select></div>
    </div>
    <p class="notice">🎥 <b>Conseil de filmage :</b> ${esc(s.cam)}</p>
    <div class="drop" id="drop">
      <p><b>Importez une vidéo, des photos ou une rafale</b></p>
      <div class="row" style="justify-content:center">
        <label class="btn">📁 Importer<input id="file" type="file" accept="video/*,image/*" multiple hidden></label>
        <label class="btn secondary">🎬 Filmer<input id="cam" type="file" accept="video/*" capture="environment" hidden></label>
      </div>
      <p class="muted small">Vidéo : 1 geste de préférence (3–8 s). Photos : 3 images ou plus (chargement, contact, fin).</p>
    </div>
    <div id="mediaZone"></div>
  </section>
  <section id="results"></section>`;
}

function bindAnalyse() {
  $("#strokeChips").addEventListener("click", (e) => { const b = e.target.closest("[data-stroke]"); if (!b) return; state.stroke = b.dataset.stroke; store.set("stroke", state.stroke); render(); if (state.media) showMedia(); });
  $("#hand").onchange = (e) => { state.hand = e.target.value; store.set("hand", state.hand); };
  $("#goal").onchange = (e) => { state.goal = e.target.value; store.set("goal", state.goal); };
  const onFiles = (files) => files.length && handleFiles([...files]);
  $("#file").onchange = (e) => onFiles(e.target.files);
  $("#cam").onchange = (e) => onFiles(e.target.files);
  const d = $("#drop");
  d.ondragover = (e) => { e.preventDefault(); d.classList.add("over"); };
  d.ondragleave = () => d.classList.remove("over");
  d.ondrop = (e) => { e.preventDefault(); d.classList.remove("over"); onFiles(e.dataTransfer.files); };
  if (state.media) showMedia();
  if (state.last) renderResults();
}

/**
 * Ajoute les fichiers choisis à la sélection courante.
 * Vidéos : plusieurs fichiers possibles (toutes les répétitions seront moyennées). Photos : une série de phases.
 * @param {File[]} files fichiers sélectionnés
 * @param {boolean} [append=false] true : ajoute aux vidéos déjà chargées
 */
async function handleFiles(files, append = false) {
  const vids = files.filter((f) => f.type.startsWith("video/"));
  const imgs = files.filter((f) => f.type.startsWith("image/"));
  try {
    if (vids.length) {
      const opened = [];
      for (const f of vids) { const src = await openVideo(f); opened.push({ src, name: f.name, t0: 0, t1: src.duration }); }
      const keep = append && state.media?.kind === "video" ? state.media.videos : [];
      state.media = { kind: "video", videos: [...keep, ...opened] };
    } else if (imgs.length) {
      state.media = { kind: "images", files: imgs, phases: imgs.map((_, i) => (imgs.length === 1 ? "contact" : i === 0 ? "load" : i === imgs.length - 1 ? "follow" : "contact")) };
      if (imgs.length >= 3) state.media.phases = imgs.map((_, i) => (i === 0 ? "load" : i === Math.floor(imgs.length / 2) ? "contact" : i === imgs.length - 1 ? "follow" : "contact"));
    } else return toast("Format non pris en charge : choisissez une vidéo ou des images.");
    state.last = null; state.seed = null; state.ref = null; showMedia(); $("#results").innerHTML = "";
  } catch (err) { toast(err.message); }
}

/** Mémorise les bornes saisies pour chaque vidéo avant un nouvel affichage de la liste. */
function readVideoRanges() {
  const m = state.media;
  if (!m || m.kind !== "video") return;
  m.videos.forEach((v, i) => {
    const a = $(`#t0-${i}`), b = $(`#t1-${i}`);
    if (a) v.t0 = Math.max(0, +a.value || 0);
    if (b) v.t1 = Math.min(v.src.duration, +b.value || v.src.duration);
  });
}

function showMedia() {
  const z = $("#mediaZone"); if (!z) return;
  const m = state.media;
  if (m.kind === "video") {
    const first = m.videos[0];
    const rows = m.videos.map((v, i) => `<div class="vrow"><div><b>${esc(v.name)}</b> <span class="muted small">(${v.src.duration.toFixed(1)} s, ${v.src.width}×${v.src.height})</span></div>
      <div class="row"><label class="small" for="t0-${i}">Début (s)</label><input type="number" id="t0-${i}" min="0" max="${v.src.duration.toFixed(1)}" step="0.1" value="${v.t0.toFixed(1)}" style="width:80px">
      <label class="small" for="t1-${i}">Fin (s)</label><input type="number" id="t1-${i}" min="0" max="${v.src.duration.toFixed(1)}" step="0.1" value="${v.t1.toFixed(1)}" style="width:80px">
      ${m.videos.length > 1 ? `<button class="chip" data-del="${i}">Retirer</button>` : ""}</div></div>`).join("");
    z.innerHTML = `
    <h3>${m.videos.length > 1 ? `${m.videos.length} vidéos` : "Vidéo"} <label class="btn secondary" style="margin-left:8px">➕ Ajouter une vidéo<input id="addvid" type="file" accept="video/*" multiple hidden></label></h3>
    <div id="vlist">${rows}</div>
    <video id="prev" src="${first.src.url}" controls playsinline muted style="width:100%;max-height:300px;border-radius:10px;background:#000"></video>
    <div class="notice">🔁 <b>Répétitions :</b> une vidéo peut contenir plusieurs fois le même geste, et vous pouvez ajouter plusieurs vidéos. Chaque geste est repéré, analysé, puis les résultats sont <b>moyennés (médiane)</b> avec leur dispersion. Visez 5 à 10 gestes pour une mesure fiable.</div>
    <div class="row">
      <div><label class="field" for="fps">Précision</label><select id="fps"><option value="12">Rapide (12 i/s)</option><option value="20" selected>Standard (20 i/s)</option><option value="30">Fine (30 i/s)</option></select></div>
      <div><label class="field" for="slow">Cadence de la vidéo</label><select id="slow"><option value="1">Temps réel</option><option value="2">Ralenti ×2</option><option value="4">Ralenti ×4</option><option value="8">Ralenti ×8</option></select></div>
      <div><label class="field" for="rot">Orientation</label><select id="rot"><option value="auto">Automatique</option><option value="0">Normale</option><option value="180">Retournée (180°)</option><option value="90">Rotation 90°</option><option value="270">Rotation 270°</option></select></div>
      <div><label class="field" for="model">Modèle IA</label><select id="model"><option value="full">Standard</option><option value="heavy">Précis (plus lent)</option></select></div>
      <div><label class="field" for="height">Taille du joueur (cm)</label><input type="number" id="height" min="100" max="230" step="1" placeholder="ex. 178" value="${esc(coach.getProfile().heightCm || "")}" style="width:100px"></div>
    </div>
    <p class="muted small">Le joueur est suivi et recadré automatiquement. Plusieurs personnes à l'image ? Touchez le joueur à analyser (première vidéo).</p>
    <div class="row"><button class="btn secondary" id="pick">👆 Choisir le joueur</button><span id="seedInfo" class="muted small">${state.seed ? "✔ joueur choisi" : "joueur : le plus proche de la caméra"}</span></div>
    <div id="pickZone"></div>
    <div class="row"><button class="btn" id="go">▶ Lancer l'analyse</button><progress id="prog" max="1" value="0" hidden></progress></div><div id="status" class="muted small"></div>`;
    $("#pick").onclick = pickPlayer;
    $("#addvid").onchange = (e) => { readVideoRanges(); if (e.target.files.length) handleFiles([...e.target.files], true); };
    $("#vlist").onclick = (e) => { const b = e.target.closest("[data-del]"); if (!b) return; readVideoRanges(); m.videos.splice(+b.dataset.del, 1); state.last = null; showMedia(); };
  } else {
    z.innerHTML = `
    <h3>${m.files.length} photo(s)</h3>
    <p class="muted small">Indiquez la phase de chaque image : <b>chargement</b> (trophée / armé), <b>contact</b>, <b>fin de geste</b>. Plusieurs photos de « contact » : la meilleure sera retenue.</p>
    <div class="thumbs" id="thumbs"></div>
    <div class="row"><button class="btn" id="go">▶ Lancer l'analyse</button><progress id="prog" max="1" value="0" hidden></progress></div><div id="status" class="muted small"></div>`;
    const th = $("#thumbs");
    m.files.forEach((f, i) => {
      const fig = document.createElement("figure");
      const img = document.createElement("img"); img.src = URL.createObjectURL(f); img.style.cssText = "width:100%;border-radius:8px";
      const sel = document.createElement("select");
      sel.innerHTML = `<option value="load">Chargement</option><option value="contact">Contact</option><option value="follow">Fin de geste</option>`;
      sel.value = m.phases[i]; sel.onchange = () => (m.phases[i] = sel.value);
      fig.append(img, sel); th.append(fig);
    });
  }
  $("#go").onclick = runAnalysis;
}

/**
 * Segmente une séquence, analyse chaque geste repéré ; sinon analyse la séquence entière.
 * @param {object} proc résultat de processVideo/processImages
 * @param {string} kind "video" | "images"
 * @param {object} opts options d'analyse (stroke, hand, aspect, slow…)
 * @param {object|null} src vidéo source (pour recadrer les images clés)
 * @param {string} name nom du fichier (affichage)
 * @returns {object} analyse ({res, reps?, …}) ; chaque geste porte sa vidéo (proc, src) pour pouvoir mélanger plusieurs vidéos
 */
function buildLast(proc, kind, opts, src = null, name = "") {
  const slow = opts.slow || 1;
  const segs = kind === "video" ? segmentStrokes(proc.frames, { stroke: opts.stroke, hand: opts.hand, aspect: proc.aspect, minGap: 2.5 * slow }) : [];
  const pre = 1.8 * slow + 0.6, post = 0.3 * slow + 0.9;
  const win = (tc) => proc.frames.filter((f) => f.t >= tc - pre && f.t <= tc + post).map((f) => ({ ...f, t: f.t - (tc - pre) }));
  if (segs.length >= 2) {
    // Service / smash : un vrai geste dure au moins ~0,2 s entre le point bas du bassin et l'impact ; en dessous, il s'agit
    // d'un faux départ, d'un lancer sans frappe ou d'un second pic de vitesse (retombée du bras).
    const overhead = opts.stroke === "serve" || opts.stroke === "smash";
    const MIN_LOAD_TO_CONTACT = 0.2;
    const reps = segs.map((tc) => { const r = analyze(win(tc), opts); return r.error ? null : { tc, t0: tc - pre, res: r, proc, src, name }; }).filter(Boolean)
      .filter((r) => !overhead || r.res.frames[r.res.phases.contact].t - r.res.frames[r.res.phases.load].t >= MIN_LOAD_TO_CONTACT);
    if (reps.length >= 2) return makeRepsLast(reps, opts);
  }
  if (segs.length === 1) {
    const w = win(segs[0]), res = analyze(w, opts);
    if (!res.error) return { res, proc, src, name, opts, kind, t0: segs[0] - pre, wframes: w };
  }
  const res = analyze(proc.frames, opts);
  if (res.error) throw new Error(res.error);
  return { res, proc, src, name, opts, kind, t0: 0, wframes: proc.frames };
}

/** Un résultat simple devient une « répétition » pour pouvoir être regroupé avec celles d'autres vidéos. */
function toRep(l) {
  return l.reps ? l.reps : [{ tc: l.t0 + l.res.frames[l.res.phases.contact].t, t0: l.t0, res: l.res, proc: l.proc, src: l.src, name: l.name }];
}

/**
 * Construit l'analyse regroupée d'un ensemble de répétitions (médiane des gestes retenus + dispersion).
 * @param {object[]} reps répétitions ({res, proc, src, t0, tc, name})
 * @param {object} opts options d'analyse
 * @param {Set<number>} [excluded] indices des répétitions écartées par l'utilisateur
 * @param {number} [sel] répétition affichée pour les images clés
 */
function makeRepsLast(reps, opts, excluded = new Set(), sel = 0) {
  const kept = reps.filter((_, i) => !excluded.has(i));
  const agg = kept.length >= 2 ? aggregate(opts.stroke, kept.map((r) => r.res)) : null;
  const cur = reps[Math.min(sel, reps.length - 1)];
  return { res: cur.res, proc: cur.proc, src: cur.src, opts, kind: "video", reps, agg, sel: Math.min(sel, reps.length - 1), t0: cur.t0, excluded, wframes: undefined };
}

/** Fusionne les analyses de plusieurs vidéos en un seul résultat moyenné. */
function mergeLasts(lasts, opts) {
  if (lasts.length === 1) return lasts[0];
  const reps = lasts.flatMap(toRep);
  return reps.length >= 2 ? makeRepsLast(reps, opts) : lasts[0];
}

/** Choix du joueur par toucher : affiche l'image de départ, entoure les personnes détectées, mémorise celle touchée. */
async function pickPlayer() {
  const zone = $("#pickZone"), info = $("#seedInfo"), m = state.media;
  if (!m || m.kind !== "video") return;
  const v = m.videos[0];
  zone.innerHTML = `<p class="muted small">Chargement de l'IA et détection des personnes…</p>`;
  try {
    await loadPose($("#model")?.value || "full", (t) => (zone.innerHTML = `<p class="muted small">${esc(t)}</p>`));
    const rotSel = $("#rot").value;
    const t = Math.max(0, Math.min(v.src.duration - 0.1, +$("#t0-0").value || 0)) + 0.3;
    const pv = await previewPlayers(v.src, Math.min(t, v.src.duration - 0.05), rotSel === "auto" ? "auto" : +rotSel);
    if (!pv.persons.length) { zone.innerHTML = `<div class="notice">Personne détectée à cet instant : avancez le début (champ « Début ») sur un moment où le joueur est visible.</div>`; return; }
    const cv = document.createElement("canvas"); cv.width = pv.canvas.width; cv.height = pv.canvas.height; cv.className = "pickcv";
    const c = cv.getContext("2d"); c.drawImage(pv.canvas, 0, 0);
    c.lineWidth = Math.max(3, cv.width / 160); c.font = `bold ${Math.max(16, cv.width / 28)}px system-ui,sans-serif`;
    pv.persons.forEach((p, k) => {
      const xs = p.pts.map((q) => q.x * cv.width), ys = p.pts.map((q) => q.y * cv.height);
      const x = Math.min(...xs) - 6, y = Math.min(...ys) - 6, w = Math.max(...xs) - x + 6, h = Math.max(...ys) - y + 6;
      c.strokeStyle = "#ffd23f"; c.strokeRect(x, y, w, h); c.fillStyle = "#ffd23f"; c.fillText(String(k + 1), x + 4, y - 6 < 14 ? y + 20 : y - 6);
    });
    zone.innerHTML = `<p class="small"><b>Touchez le joueur à analyser</b> (cadre jaune).</p>`;
    zone.append(cv);
    cv.onclick = (e) => {
      const r = cv.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      const best = pv.persons.reduce((a, b) => (Math.hypot(b.cx - x, b.cy - y) < Math.hypot(a.cx - x, a.cy - y) ? b : a));
      state.seed = { x: best.cx, y: best.cy, rot: pv.rot };
      info.textContent = "✔ joueur choisi";
      zone.innerHTML = `<p class="small">✔ Joueur n° ${pv.persons.indexOf(best) + 1} sélectionné${pv.rot ? " (vidéo remise à l'endroit)" : ""}.</p>`;
    };
  } catch (e) { zone.innerHTML = `<div class="notice">${esc(e.message)}</div>`; }
}

async function runAnalysis() {
  if (state.busy) return; state.busy = true;
  const btn = $("#go"), prog = $("#prog"), status = $("#status");
  btn.disabled = true; prog.hidden = false; prog.value = 0;
  const say = (t) => (status.textContent = t);
  try {
    const model = $("#model")?.value || "full";
    await loadPose(model, say);
    const m = state.media;
    const hCm = +$("#height")?.value || 0;
    if (hCm) coach.setProfile({ ...coach.getProfile(), heightCm: hCm });
    const slow = +($("#slow")?.value || 1);
    let last;
    if (m.kind === "video") {
      readVideoRanges();
      const rotSel = $("#rot").value, n = m.videos.length, lasts = [];
      let opts;
      for (let vi = 0; vi < n; vi++) {
        const v = m.videos[vi];
        if (v.t1 - v.t0 < 0.4) throw new Error(`« ${v.name} » : plage trop courte (augmentez la fin ou diminuez le début).`);
        say(n > 1 ? `Vidéo ${vi + 1}/${n} : analyse image par image…` : "Analyse image par image…");
        const proc = await processVideo(v.src, { start: v.t0, end: v.t1, fps: +$("#fps").value, rot: rotSel === "auto" ? "auto" : +rotSel, seed: vi === 0 ? state.seed : null, onProgress: (p) => (prog.value = (vi + p) / n), onStatus: say });
        opts = { stroke: state.stroke, hand: state.hand, aspect: proc.aspect, timed: true, slow };
        lasts.push(buildLast(proc, "video", opts, v.src, v.name));
      }
      last = mergeLasts(lasts, opts);
    } else {
      say("Analyse des photos…");
      const proc = await processImages(m.files, { onProgress: (p) => (prog.value = p) });
      const idx = (ph) => m.phases.map((p, i) => (p === ph ? i : -1)).filter((i) => i >= 0);
      const c = idx("contact"), l = idx("load"), f = idx("follow");
      const cdet = c.filter((i) => proc.frames[i].lm);
      const opts = { stroke: state.stroke, hand: state.hand, aspect: proc.aspect, timed: false, contactIdx: cdet[0] ?? c[0], loadIdx: l[0] ?? cdet[0] ?? 0, followIdx: f[0] ?? cdet[0] ?? 0, slow };
      if (opts.contactIdx == null) throw new Error("Marquez au moins une photo comme « Contact ».");
      last = buildLast(proc, "images", opts);
    }
    state.last = last;
    say("Terminé ✔");
    renderResults();
    saveHistory();
    $("#results")?.scrollIntoView({ behavior: "smooth" });
  } catch (err) { console.error(err); toast(err.message || "Erreur d'analyse"); say(err.message || "Erreur d'analyse"); }
  finally { state.busy = false; btn.disabled = false; prog.hidden = true; }
}

const fmt = (v, u) => (v == null ? "—" : `${u === "°" ? Math.round(v) : v.toFixed(2)} ${u}`);
function fmtRange(d) {
  const [a, b] = d.ok;
  if (b >= 90 && b > a + 5 && !(u(d) === "°" && b < 180)) return `≥ ${a}${u(d) === "°" ? "°" : ""}`;
  if (a <= 0 && b < 90) return `≤ ${b}${u(d) === "°" ? "°" : ""}`;
  return `${a}–${b}${u(d) === "°" ? "°" : ""}`;
}
const u = (d) => d.unit;

let stopSlowmo = null;

const CONF_LABEL = { high: "fiable", mid: "indicative", low: "approximative" };
const VIEW_LABEL = { side: "de côté", behind: "de dos", any: "toute vue" };
const ATYPICAL_Z = 1.5; // écart à la médiane (en tolérances) au-delà duquel une mesure est jugée atypique

/**
 * Repère les gestes qui s'écartent de la médiane sur au moins deux mesures.
 * @param {object} L analyse regroupée ({reps, excluded, agg})
 * @returns {Set<number>} indices des gestes atypiques
 */
function atypicalReps(L) {
  const out = new Set();
  L.reps.forEach((r, i) => {
    if (L.excluded?.has(i)) return;
    let far = 0;
    for (const m of L.agg.metrics) {
      const v = r.res.values[m.id];
      if (m.value == null || v == null || Number.isNaN(v) || !m.tol) continue;
      if (Math.abs(v - m.value) / m.tol > ATYPICAL_Z) far++;
    }
    if (far >= 2) out.add(i);
  });
  return out;
}

const metricsForAI = (top) => top.metrics.filter((d) => d.value != null).map((d) => ({ critere: d.label, valeur: +(+d.value).toFixed(2), unite: d.unit, statut: { ok: "conforme", warn: "à surveiller", bad: "à corriger" }[d.status], repere: fmtRange(d) }));

function aiPayload() {
  const L = state.last, top = L.agg || L.res, p = coach.getProfile();
  return {
    stroke: STROKES[state.stroke].label,
    profile: { niveau_vise: LEVELS[state.goal], main: state.hand === "left" ? "gaucher" : "droitier", taille_cm: p.heightCm || undefined },
    metrics: metricsForAI(top),
    issues: top.issues.map((i) => ({ defaut: ISSUES[i.id]?.label, explication: ISSUES[i.id]?.why })).filter((x) => x.defaut),
    notes: L.res.notes,
  };
}

async function runAI(prompt, out, btn) {
  const s = coach.getAI();
  out.innerHTML = `<p class="muted">✨ L'assistant réfléchit…</p>`;
  btn.disabled = true;
  try {
    const text = await askClaude({ apiKey: s.apiKey, model: s.model, prompt });
    out.innerHTML = `<div class="ai-out">${esc(text).replace(/\n/g, "<br>")}</div><p class="muted small">Reformulation générée par ${esc(s.model)} à partir des mesures ci-dessus. À valider avec un entraîneur.</p>`;
  } catch (e) { out.innerHTML = `<div class="notice">${esc(e.message)}${s.apiKey ? "" : ' <button class="chip" data-go="coach">Ouvrir Coach › Assistant</button>'}</div>`; }
  finally { btn.disabled = false; }
}

function aiBlock(kind) {
  return `<div class="ai-box"><div class="row"><button class="btn" id="aiGo-${kind}">✨ Reformuler avec Claude</button><button class="btn secondary" id="aiCopy-${kind}">📋 Copier le prompt</button></div><div id="aiOut-${kind}"></div></div>`;
}

function bindAI(kind, promptFn) {
  const go = $(`#aiGo-${kind}`), cp = $(`#aiCopy-${kind}`), out = $(`#aiOut-${kind}`);
  if (!go) return;
  go.onclick = () => runAI(promptFn(), out, go);
  cp.onclick = async () => {
    const txt = `${getSystemPrompt()}\n\n${promptFn()}`;
    try { await navigator.clipboard.writeText(txt); toast("Prompt copié : collez-le dans l'assistant de votre choix."); } catch { out.innerHTML = `<textarea style="width:100%;height:160px">${esc(txt)}</textarea>`; }
  };
}

function renderResults() {
  const L = state.last; if (!L || !$("#results")) return; // onglet quitté pendant l'analyse : résultats affichés au retour
  if (stopSlowmo) { stopSlowmo(); stopSlowmo = null; }
  const { res } = L;
  const keptReps = L.reps ? L.reps.filter((_, i) => !L.excluded?.has(i)) : null;
  const top = L.agg || (keptReps && keptReps.length === 1 ? keptReps[0].res : res); // séance : médianes des gestes cochés ; sinon geste unique
  const color = top.score >= 75 ? "var(--ok)" : top.score >= 50 ? "var(--warn)" : "var(--bad)";
  const rows = top.metrics.map((d) => {
    const sp = L.agg && L.agg.spread[d.id];
    const spread = sp && sp.n > 1 ? `<br><small class="muted">${fmt(sp.min, d.unit)} → ${fmt(sp.max, d.unit)} · ${sp.n} gestes · <span class="reg ${sp.regular ? "ok" : "warn"}">${sp.regular ? "régulier" : "variable"}</span></small>` : "";
    const meta = d.conf ? `<br><small class="muted"><span class="conf ${d.conf}">mesure ${CONF_LABEL[d.conf]}</span> · meilleure vue : ${VIEW_LABEL[d.view]}</small>` : "";
    return `<tr><td>${esc(d.label)}<br><small class="muted">${esc(d.tip || "")}</small>${meta}</td><td><b>${fmt(d.value, d.unit)}</b>${d.status === "na" ? "" : gaugeSVG(d, d.value, sp && sp.n > 1 ? { min: sp.min, max: sp.max } : null)}${spread}</td><td class="muted">${d.status === "na" ? "n/a (vidéo requise)" : "cible " + fmtRange(d)}</td><td><span class="tag ${d.status}">${{ ok: "OK", warn: "À surveiller", bad: "À corriger", na: "—" }[d.status]}</span></td></tr>`;
  }).join("");
  const atyp = L.reps && L.agg ? atypicalReps(L) : new Set();
  const nVideos = L.reps ? new Set(L.reps.map((r) => r.name)).size : 1;
  const repRows = L.reps ? L.reps.map((r, i) => `<tr class="${atyp.has(i) ? "atyp" : ""}"><td><input type="checkbox" data-inc="${i}" ${L.excluded?.has(i) ? "" : "checked"} aria-label="Inclure le geste ${i + 1}"></td><td>n° ${i + 1} ${atyp.has(i) ? '<span class="tag warn">atypique</span>' : ""}</td><td class="small">${esc(r.name || "")}</td><td>${(r.proc.offset + r.tc).toFixed(1)} s</td><td><b>${r.res.score ?? "—"}</b></td><td><button class="chip" data-show="${i}" ${i === L.sel ? 'aria-pressed="true"' : ""}>Voir</button></td></tr>`).join("") : "";
  const repsCard = L.reps ? `<section class="card"><h2>🔁 Répétitions : ${L.reps.length} gestes${nVideos > 1 ? ` · ${nVideos} vidéos` : ""}</h2>
    <p class="muted small">Les mesures ci-dessous sont les <b>médianes</b> des gestes cochés. Décochez un geste raté ou atypique pour le retirer de la moyenne ; « Voir » affiche ses images clés.</p>
    ${L.agg && L.agg.consistency != null ? `<div class="kpi"><div>Régularité : <b>${L.agg.consistency} %</b> des mesures stables</div><div>Gestes retenus : <b>${keptReps.length}/${L.reps.length}</b></div></div>` : `<div class="notice">Cochez au moins 2 gestes pour obtenir une moyenne.</div>`}
    <table><thead><tr><th></th><th>Geste</th><th>Vidéo</th><th>Instant</th><th>Score</th><th></th></tr></thead><tbody>${repRows}</tbody></table>
    <p class="muted small">Régulier = écart-type d'une mesure inférieur à sa tolérance (ex. 10° pour un angle). Un geste régulier est un geste automatisé : c'est un objectif en soi.</p></section>` : "";
  const repSel = "";
  const issues = top.issues.length ? top.issues.map((it) => {
    const I = ISSUES[it.id]; if (!I) return "";
    return `<div class="issue ${it.sev >= 3 ? "sev2" : ""}"><div class="issue-row"><div class="issue-body"><h3>${esc(I.label)}</h3><p>${esc(I.why)}</p><div class="cue">🎯 <b>Consigne :</b> ${esc(I.cue)}</div>
      <details><summary>Exercices recommandés (${I.ex.length})</summary>${I.ex.map((id) => exCard(id)).join("")}</details></div>${issueFigure(it.id)}</div></div>`;
  }).join("") : `<p>Aucun défaut majeur détecté sur les critères mesurables. Continuez à filmer sous plusieurs angles pour confirmer.</p>`;
  const video = L.kind === "video";
  $("#results").innerHTML = `
  <section class="card">
    <h2>Résultat — ${STROKES[state.stroke].label}</h2>
    <div class="score"><div class="ring" style="--p:${top.score ?? 0};--c:${color}"><span>${top.score ?? "—"}</span></div>
      <div><b>Score technique indicatif /100</b><div class="kpi"><div>Détection : ${Math.round(res.detRate * 100)} %</div><div>Bras frappeur : ${res.hand === "left" ? "gauche" : "droit"}</div><div>Images : ${res.frames.length}</div></div></div></div>
    ${res.notes.map((n) => `<div class="notice">${esc(n)}</div>`).join("")}
    ${repSel}
    <h3>Images clés</h3>
    <label class="small"><input type="checkbox" id="tgl" ${state.showTargets ? "checked" : ""}> Afficher les <b>valeurs cibles en pointillés verts</b> sur les images</label>
    <div class="canvases" id="keys"></div>
    <p class="muted small">Traits pleins = votre geste mesuré. <span style="color:var(--ok);font-weight:700">Pointillés verts = valeur cible</span> (angle du coude, flexion du genou, hauteur de contact, contact devant, tronc, tête, trajet du poignet). Plus marqué = à corriger ; atténué = déjà conforme.</p>
    ${video && !L.reps ? `<label class="field" for="cslide">Corriger l'instant d'impact (image ${res.phases.contact + 1}/${res.frames.length})</label><input id="cslide" type="range" min="0" max="${res.frames.length - 1}" value="${res.phases.contact}" style="width:100%"><p class="muted small">Si l'image « Contact » n'est pas la bonne, faites glisser puis relâchez : les mesures sont recalculées.</p>` : ""}
    ${video ? `<h3>Courbes</h3><canvas class="chart" id="chart" width="900" height="300"></canvas><p class="muted small">Vert : vitesse du poignet (u. relatives). Orange : flexion moyenne des genoux (°). Traits verticaux : chargement / contact / fin.</p>` : ""}
  </section>
  ${repsCard}
  <section class="card"><h2>Mesures</h2><table><thead><tr><th>Critère</th><th>Mesuré</th><th>Repère</th><th>Statut</th></tr></thead><tbody>${rows}</tbody></table>
    <p class="muted small">Les repères sont des plages pédagogiques indicatives issues de la littérature et du coaching ; les valeurs varient selon la morphologie, le style (ex. coup droit semi-ouvert) et l'angle de caméra. <button class="chip" data-go="guide">📐 Comprendre chaque mesure</button></p></section>
  <section class="card"><h2>Mesures calibrées (taille du joueur)</h2>${calibratedHTML(L, coach.getProfile().heightCm, state.stroke)}</section>
  <section class="card"><h2>Comparaison côte à côte</h2>
    <h3>Avec le modèle de référence</h3><div id="cmp" class="cmp"></div>
    <h3>Avec une vidéo de référence</h3>
    <p class="muted small">Importez une vidéo d'un joueur modèle (de votre choix, ex. fournie par votre coach) : elle est analysée de la même façon, sur votre appareil.</p>
    <div class="row"><label class="btn secondary">📁 Choisir la vidéo de référence<input id="refFile" type="file" accept="video/*" hidden></label><span id="refStatus" class="muted small"></span></div>
    <div id="refcmp" class="cmp"></div>
  </section>
  ${video ? `<section class="card"><h2>Lecteur ralenti annoté</h2><p class="muted small">Image par image avec squelette, angles en direct et trace du poignet.</p><div id="slowmo"></div></section>` : ""}
  <section class="card"><h2>Priorités de progression</h2>${issues}
    ${aiBlock("analysis")}
    <div class="row"><button class="btn" data-go="exo">📅 Voir mon programme</button><button class="btn secondary" id="print">🖨 Exporter / imprimer</button><button class="btn secondary" id="toCoach">📨 Envoyer à mon coach</button></div></section>`;
  drawKeys();
  renderCompare(L, L.src, $("#cmp"), state.stroke).catch(() => {});
  if (video) { drawChart(); stopSlowmo = mountSlowmo($("#slowmo"), L, L.src); }
  if ($("#cslide")) $("#cslide").onchange = (e) => recompute(+e.target.value);
  $("#tgl").onchange = (e) => { state.showTargets = e.target.checked; store.set("showTargets", state.showTargets); drawKeys(); };
  document.querySelectorAll("[data-inc]").forEach((cb) => (cb.onchange = () => {
    const ex = new Set(L.excluded); const i = +cb.dataset.inc;
    if (cb.checked) ex.delete(i); else ex.add(i);
    if (ex.size >= L.reps.length) { toast("Gardez au moins un geste."); renderResults(); return; }
    state.last = makeRepsLast(L.reps, L.opts, ex, ex.has(L.sel) ? [...L.reps.keys()].find((k) => !ex.has(k)) : L.sel);
    renderResults();
  }));
  document.querySelectorAll("[data-show]").forEach((b) => (b.onclick = () => { state.last = makeRepsLast(L.reps, L.opts, L.excluded, +b.dataset.show); renderResults(); $("#keys")?.scrollIntoView({ behavior: "smooth" }); }));
  $("#print").onclick = () => window.print();
  $("#toCoach").onclick = () => sendToCoach();
  $("#refFile").onchange = (e) => e.target.files[0] && loadReference(e.target.files[0]);
  bindAI("analysis", () => buildAnalysisPrompt(aiPayload()));
  if (state.ref) showRefCompare();
}

async function showRefCompare() {
  const L = state.last, R = state.ref, host = $("#refcmp"); if (!host || !R) return;
  try { await renderRefCompare(L, L.src, R.last, R.src, host, L.agg || L.res, R.last.agg || R.last.res); } catch (e) { host.innerHTML = `<div class="notice">${esc(e.message)}</div>`; }
}

/** Analyse la vidéo de référence avec la même chaîne que la vidéo du joueur. */
async function loadReference(file) {
  const st = $("#refStatus"); const say = (t) => (st.textContent = t);
  if (state.busy) return say("Une analyse est déjà en cours.");
  state.busy = true;
  try {
    say("Ouverture de la vidéo…");
    const src = await openVideo(file);
    await loadPose($("#model")?.value || "full", say);
    const end = Math.min(src.duration, 90);
    const proc = await processVideo(src, { start: 0, end, fps: 12, rot: "auto", onProgress: (p) => say(`Analyse de la référence… ${Math.round(p * 100)} %`), onStatus: say });
    const opts = { stroke: state.stroke, hand: state.hand, aspect: proc.aspect, timed: true, slow: +($("#slow")?.value || 1) };
    state.ref = { src, last: buildLast(proc, "video", opts, src, file.name), name: file.name };
    say(`✔ Référence prête (${file.name})`);
    await showRefCompare();
  } catch (e) { console.error("référence:", e); say(e.message || "Erreur d'analyse de la référence"); }
  finally { state.busy = false; }
}

function recompute(contactIdx) {
  const L = state.last;
  const opts = { ...L.opts, contactIdx, loadIdx: undefined, followIdx: undefined };
  const res = analyze(L.wframes || L.proc.frames, opts);
  if (res.error) return toast(res.error);
  state.last = { ...L, res, opts };
  renderResults(); saveHistory(true);
}

async function drawKeys() {
  const L = state.last, host = $("#keys"); if (!host) return;
  const names = [["load", "Chargement"], ["contact", "Contact"], ["follow", "Fin de geste"]];
  host.innerHTML = "";
  for (const [k, name] of names) {
    const { canvas, i } = await phaseCanvas(L, L.src, k, { targets: state.showTargets });
    const fig = document.createElement("figure"); fig.append(canvas);
    const cap = document.createElement("figcaption"); cap.textContent = `${name}${L.kind === "video" ? ` (t = ${((L.t0 || 0) + L.proc.offset + L.res.frames[i].t).toFixed(2)} s)` : ""}`; fig.append(cap);
    host.append(fig);
  }
}

/** Envoi du dossier au coach : fichier JSON (images clés légères en option) via la feuille de partage ou téléchargement. */
async function sendToCoach() {
  const L = state.last; if (!L) return;
  const top = L.agg || L.res, prof = coach.getProfile();
  const images = [];
  if (confirm("Joindre les 3 images clés (quelques dizaines de Ko) au dossier ?")) {
    for (const c of document.querySelectorAll("#keys canvas")) images.push(c.toDataURL("image/jpeg", 0.7));
  }
  const pkg = coach.buildPackage({
    profile: prof, history: store.get("history", []), answers: store.get("answers", null), images,
    current: { date: new Date().toISOString(), stroke: state.stroke, label: STROKES[state.stroke].label, score: top.score, reps: L.reps ? L.reps.length : 1, issues: top.issues.map((i) => ({ id: i.id, label: ISSUES[i.id]?.label })), metrics: top.metrics.filter((m) => m.value != null).map((m) => ({ id: m.id, label: m.label, value: +(+m.value).toFixed(2), unit: m.unit, status: m.status })), notes: L.res.notes },
  });
  const r = await coach.shareOrDownload(pkg, `dossier-${(prof.name || "joueur").replace(/\W+/g, "-")}-${new Date().toISOString().slice(0, 10)}.json`, "Dossier Tennis Coach IA");
  toast(r === "downloaded" ? "Fichier téléchargé : envoyez-le à votre coach." : r === "shared" ? "Dossier partagé." : "Envoi annulé.");
}

function drawChart() {
  const cv = $("#chart"); if (!cv) return; const { res } = state.last;
  const ctx = cv.getContext("2d"), W = cv.width, H = cv.height;
  ctx.clearRect(0, 0, W, H);
  const t = res.series.t, T = t[t.length - 1] || 1;
  const plot = (arr, color, lo, hi) => {
    ctx.strokeStyle = color; ctx.lineWidth = 3; ctx.beginPath();
    arr.forEach((v, i) => { const x = (t[i] / T) * (W - 20) + 10, y = H - 10 - ((v - lo) / (hi - lo || 1)) * (H - 20); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); });
    ctx.stroke();
  };
  const sp = res.series.speed; plot(sp, "#12b886", 0, Math.max(...sp));
  const kn = res.series.knee; plot(kn, "#f59f00", Math.min(...kn) - 5, Math.max(...kn) + 5);
  for (const [k, col] of [["load", "#888"], ["contact", "#e03131"], ["follow", "#888"]]) {
    const x = (t[res.phases[k]] / T) * (W - 20) + 10; ctx.strokeStyle = col; ctx.lineWidth = 2; ctx.setLineDash([6, 5]);
    ctx.beginPath(); ctx.moveTo(x, 4); ctx.lineTo(x, H - 4); ctx.stroke(); ctx.setLineDash([]);
  }
}

function saveHistory(replaceLast = false) {
  const L = state.last; if (!L) return;
  const h = store.get("history", []);
  const entry = { date: new Date().toISOString(), stroke: state.stroke, score: (L.agg || L.res).score, reps: L.reps ? L.reps.length : 1, issues: (L.agg || L.res).issues.map((i) => i.id), values: Object.fromEntries((L.agg || L.res).metrics.filter((m) => m.value != null).map((m) => [m.id, +m.value.toFixed(2)])) };
  if (replaceLast && h.length) h[h.length - 1] = entry; else h.push(entry);
  store.set("history", h.slice(-100));
}

// =========================== TACTIQUE ==========================================================================
function viewTactic() {
  const form = QUESTIONS.map((s) => `<fieldset class="card qsec"><legend><h3>${esc(s.section)}</h3></legend>${s.items.map(qHTML).join("")}</fieldset>`).join("");
  return `<section class="card"><h2>Questionnaire tactique</h2><p class="muted">Répondez en 2 minutes : l'app génère un plan de jeu, des schémas de points et des ajustements selon la surface, le vent, la chaleur… Les réponses sont mémorisées sur cet appareil.</p></section>
  <form id="qform">${form}<div class="row"><button class="btn" type="submit">⚡ Générer le plan de jeu</button><button class="btn secondary" type="button" id="reset">Réinitialiser</button></div></form>
  <section id="plan"></section>`;
}
function qHTML(q) {
  const v = state.answers[q.id];
  if (q.type === "select") return `<label class="field" for="${q.id}">${esc(q.label)}</label><select id="${q.id}" name="${q.id}">${q.options.map((o) => `<option value="${o.value}" ${v === o.value ? "selected" : ""}>${esc(o.label)}</option>`).join("")}</select>`;
  const kind = q.type === "multi" ? "checkbox" : "radio";
  return `<label class="field">${esc(q.label)}</label><div class="opts">${q.options.map((o) => `<label><input type="${kind}" name="${q.id}" value="${o.value}" ${(kind === "checkbox" ? (v || []).includes(o.value) : v === o.value) ? "checked" : ""}> ${esc(o.label)}</label>`).join("")}</div>`;
}
function readForm() {
  const f = $("#qform"), a = {};
  for (const s of QUESTIONS) for (const q of s.items) {
    if (q.type === "multi") a[q.id] = [...f.querySelectorAll(`[name="${q.id}"]:checked`)].map((i) => i.value);
    else if (q.type === "radio") a[q.id] = (f.querySelector(`[name="${q.id}"]:checked`) || {}).value ?? q.def;
    else a[q.id] = f.querySelector(`[name="${q.id}"]`).value;
  }
  return a;
}
function bindTactic() {
  $("#qform").onsubmit = (e) => { e.preventDefault(); state.answers = readForm(); store.set("answers", state.answers); renderPlan(); $("#plan").scrollIntoView({ behavior: "smooth" }); };
  $("#reset").onclick = () => { state.answers = defaultAnswers(); store.set("answers", state.answers); render(); };
  if (store.get("answers", null)) renderPlan();
}
function renderPlan() {
  const A = state.answers, plan = buildPlan(A);
  const ul = (a) => (a.length ? `<ul class="clean">${a.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>` : "<p class='muted'>—</p>");
  const lefty = A.p_hand === "left";
  $("#plan").innerHTML = `
  <section class="card hero"><h2>${esc(plan.headline)}</h2><p>${plan.principles.length ? esc(plan.principles[0]) : ""}</p></section>
  <div class="grid two">
    <section class="card"><h3>🧭 Principes de jeu</h3>${ul(plan.principles)}</section>
    <section class="card"><h3>🎾 Service</h3>${ul(plan.serve)}<h3>↩️ Retour</h3>${ul(plan.ret)}</section>
  </div>
  <section class="card"><h2>Schémas tactiques recommandés</h2><p class="muted small">Vert : vos frappes · Orange pointillé : adversaire · Les numéros indiquent l'ordre. Schémas symétrisés pour ${lefty ? "gaucher" : "droitier"}. Score = adéquation avec votre profil.</p>
    ${plan.patterns.length ? plan.patterns.map(({ p, score, why }) => `<div class="pat card"><div>${courtSVG(p, lefty)}</div><div><span class="tag ok">${esc(p.phase)}</span> <small class="muted">adéquation ${Math.round(score)}</small><h3>${esc(p.name)}</h3><p>${esc(p.desc)}</p>${why.length ? `<ul class="why clean">${why.map((w) => `<li>${esc(w)}</li>`).join("")}</ul>` : ""}</div></div>`).join("") : "<p>Aucun schéma ne ressort nettement : jouez au centre, profond, et observez l'adversaire.</p>"}</section>
  <div class="grid two">
    <section class="card"><h3>🌤 Conditions</h3>${ul(plan.cond)}</section>
    <section class="card"><h3>⏱ Situations clés</h3>${ul(plan.situ)}</section>
    <section class="card"><h3>🚫 À éviter</h3>${ul(plan.avoid)}</section>
    <section class="card"><h3>✅ Check-list : avant, pendant, après</h3>${ul(plan.check)}</section>
    <section class="card"><h3>🌱 Vos axes de progression</h3>${ul(plan.growth)}</section>
  </div>
  <section class="card"><h3>✨ Briefing d'avant-match</h3>${aiBlock("tactic")}</section>
  <div class="row"><button class="btn secondary" onclick="window.print()">🖨 Imprimer le plan</button></div>`;
  bindAI("tactic", () => buildTacticsPrompt({ headline: plan.headline, principles: plan.principles, serve: plan.serve, ret: plan.ret, cond: plan.cond, patterns: plan.patterns.map(({ p, why }) => ({ nom: p.name, phase: p.phase, description: p.desc, pourquoi: why })) }));
}

// =========================== EXERCICES / PROGRAMME ====================================================================
function exCard(id) {
  const e = EXERCISES[id]; if (!e) return "";
  return `<div class="card" style="margin:8px 0"><b>${esc(e.name)}</b> <span class="tag ${e.level === 1 ? "ok" : "warn"}">${e.level === 1 ? "niveau 1" : "niveau 2"}</span><br><small class="muted">${esc(e.where)} · ${esc(e.dose)}</small><p style="margin:.4em 0 0">${esc(e.how)}</p></div>`;
}

function buildProgram() {
  const hist = store.get("history", []);
  const lastByStroke = {};
  hist.forEach((h) => (lastByStroke[h.stroke] = h));
  const issueScore = new Map();
  Object.values(lastByStroke).forEach((h) => h.issues.forEach((id, i) => issueScore.set(id, (issueScore.get(id) || 0) + (10 - i))));
  const top = [...issueScore.entries()].sort((a, b) => b[1] - a[1]).map(([id]) => id).slice(0, 3);
  return { top, hasData: top.length > 0 };
}

function viewExo() {
  const prog = buildProgram();
  const goal = LEVELS[state.goal] || "";
  let plan = "";
  if (!prog.hasData) plan = `<p class="muted">Faites d'abord une analyse (onglet Analyse) : le programme s'adaptera à vos défauts prioritaires.</p><button class="btn" data-go="analyse">📹 Analyser un geste</button>`;
  else {
    const weeks = [
      { t: "Semaine 1 · Conscience du geste", ids: [prog.top[0]], lvl: 1, note: "3 séances de 20 min : exercices niveau 1 sans balle ou au ralenti, filmez-vous en fin de semaine." },
      { t: "Semaine 2 · Automatisation", ids: [prog.top[0], prog.top[1]].filter(Boolean), lvl: 1, note: "Ajoutez de la balle (panier) puis des petits blocs de 10 répétitions : 70 % de réussite visés." },
      { t: "Semaine 3 · Variabilité", ids: [prog.top[1], prog.top[2]].filter(Boolean), lvl: 2, note: "Exercices niveau 2 + situations de jeu (cibles, vitesses différentes)." },
      { t: "Semaine 4 · Intégration & bilan", ids: [prog.top[0], prog.top[1], prog.top[2]].filter(Boolean), lvl: 2, note: "Match d'entraînement avec objectif technique unique ; refaites l'analyse vidéo pour comparer." },
    ];
    plan = weeks.map((w) => `<details ${w === weeks[0] ? "open" : ""}><summary>${w.t}</summary><p class="muted">${w.note}</p>${w.ids.map((id) => `<h3>${esc(ISSUES[id]?.label || id)}</h3>${(ISSUES[id]?.ex || []).map((e) => EXERCISES[e]).filter(Boolean).filter((e) => e.level <= w.lvl).length ? ISSUES[id].ex.filter((e) => EXERCISES[e] && EXERCISES[e].level <= w.lvl).map(exCard).join("") : ISSUES[id].ex.map(exCard).join("")}`).join("")}</details>`).join("");
  }
  const s2 = state.goal === "s2" ? `<section class="card"><h3>🎯 Repères pour viser la 2e série (service)</h3><ul class="clean"><li>Un 2e service fiable (≥ 70 % en jeu) avec rotation (kick/slice) est un levier majeur de progression, plus que la vitesse de 1re balle.</li><li>Travaillez la zone : T / extérieur / corps, sur 1re et 2e balle (voir « échelle de service »).</li><li>Fixez 1 critère technique à la fois : flexion → hauteur de contact → dissociation.</li><li>Tracez vos stats en match (1res en jeu, points sur 1re/2e) pour mesurer l'effet réel.</li></ul><p class="muted small">Repères indicatifs, à adapter avec votre entraîneur.</p></section>` : "";
  return `<section class="card"><h2>Programme sur 4 semaines</h2><p>Objectif : <b>${esc(goal)}</b> <button class="chip" data-go="analyse">modifier</button></p>${plan}</section>${s2}
  <section class="card"><h2>Bibliothèque d'exercices</h2>${Object.keys(EXERCISES).map(exCard).join("")}</section>`;
}
function bindExo() {}

// =========================== SUIVI =====================================================================================
function viewTrack() {
  const h = store.get("history", []);
  if (!h.length) return `<section class="card"><h2>Suivi</h2><p class="muted">Aucune analyse enregistrée. Vos scores seront affichés ici.</p><button class="btn" data-go="analyse">Analyser un geste</button></section>`;
  return `<section class="card"><h2>Évolution des scores</h2><canvas class="chart" id="hchart" width="900" height="300"></canvas></section>
  <section class="card"><h2>Historique</h2><table><thead><tr><th>Date</th><th>Geste</th><th>Score</th><th>Défauts</th></tr></thead><tbody>${[...h].reverse().map((e) => `<tr><td>${new Date(e.date).toLocaleDateString("fr-FR")}</td><td>${esc(STROKES[e.stroke]?.label || e.stroke)}</td><td><b>${e.score ?? "—"}</b></td><td class="small">${e.issues.map((i) => esc(ISSUES[i]?.label || i)).join(", ") || "—"}</td></tr>`).join("")}</tbody></table>
  <div class="row"><button class="btn secondary" id="exp">⬇ Exporter (JSON)</button><button class="btn secondary" id="clr">🗑 Effacer</button></div></section>`;
}
function bindTrack() {
  const h = store.get("history", []); if (!h.length) return;
  const cv = $("#hchart"), ctx = cv.getContext("2d"), W = cv.width, H = cv.height;
  const strokes = [...new Set(h.map((e) => e.stroke))];
  const cols = ["#12b886", "#f59f00", "#4c6ef5", "#e03131", "#ae3ec9"];
  strokes.forEach((s, si) => {
    const pts = h.filter((e) => e.stroke === s && e.score != null);
    ctx.strokeStyle = cols[si % cols.length]; ctx.fillStyle = ctx.strokeStyle; ctx.lineWidth = 3; ctx.beginPath();
    pts.forEach((p, i) => { const x = pts.length === 1 ? W / 2 : 20 + (i / (pts.length - 1)) * (W - 40), y = H - 20 - (p.score / 100) * (H - 40); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); });
    ctx.stroke();
    pts.forEach((p, i) => { const x = pts.length === 1 ? W / 2 : 20 + (i / (pts.length - 1)) * (W - 40), y = H - 20 - (p.score / 100) * (H - 40); ctx.beginPath(); ctx.arc(x, y, 5, 0, 7); ctx.fill(); });
    ctx.font = "20px system-ui"; ctx.fillText(STROKES[s]?.label || s, 24 + si * 190, 24);
  });
  $("#exp").onclick = () => { const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([JSON.stringify(h, null, 2)], { type: "application/json" })); a.download = "tennis-coach-historique.json"; a.click(); };
  $("#clr").onclick = () => { if (confirm("Effacer tout l'historique ?")) { store.set("history", []); render(); } };
}

// =========================== COACH / COMPTE / ASSISTANT =============================================================
function viewCoach() {
  const prof = coach.getProfile(), ai = coach.getAI(), fb = coach.listFeedback();
  return `
  <section class="card"><h2>Mon profil</h2>
    <div class="grid two">
      <div><label class="field" for="pName">Nom / pseudo</label><input id="pName" type="text" value="${esc(prof.name)}" placeholder="ex. Richard" style="width:100%"></div>
      <div><label class="field" for="pHeight">Taille (cm)</label><input id="pHeight" type="number" min="100" max="230" value="${esc(prof.heightCm || "")}" style="width:100%"></div>
    </div>
    <label class="field" for="pCoach">Nom de mon coach (facultatif)</label><input id="pCoach" type="text" value="${esc(prof.coachName || "")}" style="width:100%">
    <div class="row" style="margin-top:10px"><button class="btn" id="pSave">Enregistrer</button><span class="muted small">Stocké sur cet appareil uniquement.</span></div>
  </section>

  <section class="card"><h2>📨 Échanger avec mon coach</h2>
    <p class="muted">Sans compte ni serveur : vous envoyez un fichier à votre coach (mail, messagerie, cloud), il vous renvoie ses commentaires dans un fichier que vous importez ici.</p>
    <div class="row"><button class="btn" id="cSend">Envoyer mon dossier au coach</button>
      <label class="btn secondary">📥 Importer un retour du coach<input id="fbFile" type="file" accept=".json,application/json" hidden></label></div>
    <p class="muted small">Le dossier contient : votre profil, vos scores, vos défauts, vos réponses au questionnaire et, si vous l'autorisez, 3 images clés. Jamais la vidéo complète.</p>
    <div id="fbList">${fb.length ? fb.map(feedbackHTML).join("") : '<p class="muted">Aucun retour reçu pour l\'instant.</p>'}</div>
  </section>

  <section class="card"><h2>🧑‍🏫 Mode coach</h2>
    <p class="muted">Vous êtes entraîneur ? Importez les dossiers de vos joueurs, commentez, recommandez des exercices et renvoyez un retour.</p>
    <label class="btn secondary">📥 Importer un dossier joueur<input id="pkgFile" type="file" accept=".json,application/json" multiple hidden></label>
    <div id="coachMode"></div>
  </section>

  <section class="card"><h2>✨ Assistant IA (Claude)</h2>
    <p class="muted">Reformule vos résultats et plans tactiques en conseils personnalisés. Il faut une clé API Anthropic <b>personnelle</b> (console.anthropic.com) : elle reste sur cet appareil et n'est envoyée qu'à Anthropic. Seuls des <b>textes</b> (mesures, défauts, réponses tactiques) sont transmis, jamais vos vidéos ni images.</p>
    <label class="field" for="aiKey">Clé API</label><input id="aiKey" type="password" autocomplete="off" value="${esc(ai.apiKey)}" placeholder="sk-ant-…" style="width:100%">
    <label class="field" for="aiModel">Modèle</label><select id="aiModel">${MODELS.map((m) => `<option value="${m.id}" ${ai.model === m.id ? "selected" : ""}>${esc(m.label)}</option>`).join("")}</select>
    <div class="row" style="margin-top:10px"><button class="btn" id="aiSave">Enregistrer</button><button class="btn secondary" id="aiTest">Tester</button><button class="btn secondary" id="aiClear">Effacer la clé</button></div>
    <div id="aiTestOut" class="small muted"></div>
    <div class="notice">🔒 Conseil : créez une clé dédiée avec une limite de dépense mensuelle. Une clé enregistrée dans une application est lisible par quiconque accède à votre téléphone déverrouillé. Sans clé, le bouton « Copier le prompt » permet d'utiliser n'importe quel assistant.</div>
  </section>

  <section class="card"><h2>☁️ Compte en ligne et synchronisation</h2>
    <p class="muted">Non disponible dans cette version : une vraie synchronisation (compte joueur/coach, historique partagé en continu) demande un serveur d'authentification et de stockage. En attendant, les fichiers ci-dessus assurent l'échange joueur ↔ coach sans compte.</p>
  </section>`;
}

function feedbackHTML(f) {
  return `<div class="card" style="margin:8px 0"><b>De ${esc(f.from || "Coach")}</b> <span class="muted small">— ${new Date(f.createdAt).toLocaleDateString("fr-FR")}</span>
    ${f.general ? `<p>${esc(f.general).replace(/\n/g, "<br>")}</p>` : ""}
    ${(f.items || []).map((it) => `<div class="cue"><b>${esc(it.label || it.stroke || "Analyse")}</b>${it.date ? ` <small class="muted">${new Date(it.date).toLocaleDateString("fr-FR")}</small>` : ""}<br>${esc(it.comment || "").replace(/\n/g, "<br>")}${(it.exercises || []).length ? `<br><small>Exercices : ${it.exercises.map((id) => esc(EXERCISES[id]?.name || id)).join(", ")}</small>` : ""}</div>`).join("")}</div>`;
}

function coachPlayerHTML(p) {
  const cur = p.current;
  const hist = (p.history || []).slice(-10).map((h) => `${new Date(h.date).toLocaleDateString("fr-FR")} · ${esc(STROKES[h.stroke]?.label || h.stroke)} : <b>${h.score ?? "—"}</b>`).join("<br>");
  return `<div class="card" style="margin-top:12px"><h3>${esc(p.name)} <small class="muted">${p.heightCm ? p.heightCm + " cm · " : ""}reçu le ${new Date(p.receivedAt).toLocaleDateString("fr-FR")}</small></h3>
    ${cur ? `<p><b>${esc(cur.label || cur.stroke)}</b> — score <b>${cur.score ?? "—"}</b>${cur.reps > 1 ? ` (${cur.reps} gestes)` : ""}</p>
      <table><tbody>${(cur.metrics || []).map((m) => `<tr><td>${esc(m.label)}</td><td><b>${m.unit === "°" ? Math.round(m.value) : m.value} ${esc(m.unit)}</b></td><td><span class="tag ${m.status}">${{ ok: "OK", warn: "À surveiller", bad: "À corriger" }[m.status] || ""}</span></td></tr>`).join("")}</tbody></table>
      ${(cur.issues || []).length ? `<p><b>Défauts :</b> ${cur.issues.map((i) => esc(i.label || i.id)).join(" · ")}</p>` : ""}` : ""}
    ${(p.images || []).length ? `<div class="canvases">${p.images.map((src) => `<figure><img src="${src}" alt="image clé"></figure>`).join("")}</div>` : ""}
    ${hist ? `<details><summary>Historique</summary><p class="small">${hist}</p></details>` : ""}
    <h3>Commentaire du coach</h3>
    <textarea id="cmText" rows="4" style="width:100%" placeholder="Votre retour sur cette analyse…"></textarea>
    <label class="field" for="cmEx">Exercices recommandés (Ctrl/Cmd pour plusieurs)</label>
    <select id="cmEx" multiple size="6" style="width:100%">${Object.entries(EXERCISES).map(([id, e]) => `<option value="${id}">${esc(e.name)}</option>`).join("")}</select>
    <div class="row" style="margin-top:8px"><button class="btn" id="cmAdd">Ajouter</button><button class="btn secondary" id="cmExport">📤 Exporter le retour au joueur</button><button class="btn secondary" id="cmDel">Supprimer ce joueur</button></div>
    <div id="cmList">${(p.comments || []).map((c) => `<div class="cue"><small class="muted">${new Date(c.date).toLocaleDateString("fr-FR")}</small><br>${esc(c.comment).replace(/\n/g, "<br>")}${(c.exercises || []).length ? `<br><small>Exercices : ${c.exercises.map((id) => esc(EXERCISES[id]?.name || id)).join(", ")}</small>` : ""}</div>`).join("")}</div></div>`;
}

function bindCoach() {
  $("#pSave").onclick = () => { coach.setProfile({ name: $("#pName").value.trim(), heightCm: +$("#pHeight").value || "", coachName: $("#pCoach").value.trim() }); toast("Profil enregistré."); };
  $("#cSend").onclick = () => {
    if (state.last) return sendToCoach();
    // sans analyse en cours : dossier avec l'historique seulement
    const prof = coach.getProfile();
    coach.shareOrDownload(coach.buildPackage({ profile: prof, history: store.get("history", []), answers: store.get("answers", null), current: null, images: [] }), `dossier-${(prof.name || "joueur").replace(/\W+/g, "-")}.json`, "Dossier Tennis Coach IA").then((r) => toast(r === "cancelled" ? "Envoi annulé." : "Dossier prêt."));
  };
  const readFile = (f) => new Promise((res, rej) => { const r = new FileReader(); r.onload = () => res(r.result); r.onerror = () => rej(new Error("Lecture impossible")); r.readAsText(f); });
  $("#fbFile").onchange = async (e) => {
    try { for (const f of e.target.files) { const o = coach.parseFile(await readFile(f)); if (o.kind !== "coach-feedback") throw new Error("Ce fichier est un dossier joueur, pas un retour de coach."); coach.importFeedback(o); } render(); toast("Retour du coach importé."); } catch (err) { toast(err.message); }
  };
  const showCoach = () => {
    const players = coach.listPlayers(), host = $("#coachMode");
    if (!players.length) { host.innerHTML = `<p class="muted">Aucun joueur importé.</p>`; return; }
    const sel = state.coachSel && players.find((p) => p.id === state.coachSel) ? state.coachSel : players[0].id;
    state.coachSel = sel;
    host.innerHTML = `<label class="field" for="plSel">Joueur</label><select id="plSel">${players.map((p) => `<option value="${p.id}" ${p.id === sel ? "selected" : ""}>${esc(p.name)}</option>`).join("")}</select><div id="plView">${coachPlayerHTML(players.find((p) => p.id === sel))}</div>`;
    $("#plSel").onchange = (e) => { state.coachSel = e.target.value; showCoach(); };
    const p = players.find((x) => x.id === sel);
    $("#cmAdd").onclick = () => { const text = $("#cmText").value.trim(); if (!text) return toast("Écrivez un commentaire."); coach.addComment(p.id, { comment: text, exercises: [...$("#cmEx").selectedOptions].map((o) => o.value), label: p.current?.label, stroke: p.current?.stroke }); showCoach(); toast("Commentaire ajouté."); };
    $("#cmExport").onclick = async () => {
      const pl = coach.listPlayers().find((x) => x.id === p.id);
      if (!(pl.comments || []).length) return toast("Ajoutez d'abord au moins un commentaire.");
      const fb = coach.buildFeedback({ player: pl, coachName: coach.getProfile().name, general: "", comments: pl.comments });
      const r = await coach.shareOrDownload(fb, `retour-coach-${pl.id}.json`, "Retour du coach");
      toast(r === "cancelled" ? "Envoi annulé." : "Retour prêt à envoyer au joueur.");
    };
    $("#cmDel").onclick = () => { if (confirm(`Supprimer ${p.name} de la liste ?`)) { coach.deletePlayer(p.id); showCoach(); } };
  };
  $("#pkgFile").onchange = async (e) => {
    try { for (const f of e.target.files) { const o = coach.parseFile(await readFile(f)); if (o.kind !== "player-package") throw new Error("Ce fichier est un retour de coach, pas un dossier joueur."); state.coachSel = coach.importPlayer(o).id; } showCoach(); toast("Dossier importé."); } catch (err) { toast(err.message); }
  };
  showCoach();
  $("#aiSave").onclick = () => { coach.setAI({ apiKey: $("#aiKey").value.trim(), model: $("#aiModel").value }); toast("Réglages de l'assistant enregistrés."); };
  $("#aiClear").onclick = () => { coach.setAI({ apiKey: "", model: $("#aiModel").value }); $("#aiKey").value = ""; toast("Clé effacée."); };
  $("#aiTest").onclick = async () => {
    const out = $("#aiTestOut"); out.textContent = "Test en cours…";
    try { const t = await askClaude({ apiKey: $("#aiKey").value.trim(), model: $("#aiModel").value, prompt: "Réponds uniquement par : OK" }); out.textContent = "✔ Connexion réussie : " + t.slice(0, 40); }
    catch (err) { out.textContent = "✖ " + err.message; }
  };
}

// =========================== GUIDE DU COACH ===========================================================================
function viewGuide() {
  return `<section class="card"><h2>📖 Guide du coach</h2>
    <p class="muted">Pour comprendre vos résultats et progresser : mesures illustrées, fiches techniques par coup, prévention, préparation physique, mental, tactique, matériel et plan de progression. Les renvois <a href="#src" data-go="src" class="refl">[xxx]</a> ouvrent la source dans l'onglet Sources.</p>
    <div class="chips"><a class="chip" href="#g-mesures">📐 Comprendre les mesures</a><a class="chip" href="#g-coups">🎾 Fiches par coup</a><a class="chip" href="#g-coaching">📚 Coaching complet</a></div></section>
  <section class="card" id="g-mesures"><h2>📐 Comprendre les mesures</h2>
    <p>Chaque mesure de l'application est expliquée ci-dessous avec un schéma : ce qu'on mesure, comment, la cible, les erreurs fréquentes et le conseil d'un coach. La <b>jauge</b> montre les zones cible (vert), à surveiller (orange) et à corriger (rouge).</p>
    ${glossaryHTML()}</section>
  <section class="card" id="g-coups"><h2>🎾 Fiches techniques par coup</h2>${Object.keys(STROKE_GUIDE).map(strokeGuideHTML).join("")}</section>
  <section class="card" id="g-coaching"><h2>📚 Coaching complet</h2>${GUIDE_SECTIONS.map(sectionHTML).join("")}</section>`;
}
function bindGuide() {
  document.querySelectorAll('#app a.chip[href^="#g-"]').forEach((a) => (a.onclick = (e) => { e.preventDefault(); $(a.getAttribute("href"))?.scrollIntoView({ behavior: "smooth" }); }));
}

// =========================== SOURCES ===================================================================================
function viewSources() {
  const link = (r) => (r.doi ? ` <a href="https://doi.org/${r.doi}" target="_blank" rel="noopener">DOI</a>` : r.url ? ` <a href="${r.url}" target="_blank" rel="noopener">lien</a>` : "");
  const item = (r) => `<li id="ref-${r.id}"><span class="tag ok">${esc(r.topic)}</span> <code class="refid">${r.id}</code> ${esc(r.cite)}${link(r)}${r.lu ? ` <span class="muted small">· lu : ${esc(r.lu)}</span>` : ""}</li>`;
  const base = REFERENCES.filter((r) => !r.lu), fresh = REFERENCES.filter((r) => r.lu);
  return `<section class="card"><h2>Sources scientifiques & pédagogiques</h2><p class="muted">Les repères et consignes de l'application s'appuient sur la littérature de biomécanique du tennis et sur la documentation d'entraîneurs. Les plages cibles sont simplifiées à des fins pédagogiques.</p>
  <h3>Références de base</h3><ul class="clean">${base.map(item).join("")}</ul></section>
  <section class="card"><h3>Actualisation du ${esc(REFERENCES_UPDATED)} (${fresh.length} publications)</h3>
    <p class="muted small">Recherche dans OpenAlex (métadonnées de publications). Pour chaque travail, le « niveau de lecture » indique ce qui a été consulté : <b>résumé</b> ou <b>titre</b> seulement. Aucune valeur chiffrée n'est attribuée à une publication au-delà de ce que son résumé indique ; les cibles de l'application restent des repères pédagogiques à calibrer.</p>
    <ul class="clean">${fresh.map(item).join("")}</ul></section>
  <section class="card"><h3>Limites & usage responsable</h3><ul class="clean"><li>Estimation de pose monoculaire : les angles dans le plan de la caméra sont plus fiables que la profondeur.</li><li>Les rotations (bassin/épaules) sont des estimations ; filmez de dos ou de face pour les mieux voir.</li><li>Ne remplace pas un entraîneur diplômé ni un avis médical.</li><li>Les données restent sur votre appareil (localStorage) ; le moteur IA et le modèle sont téléchargés une fois depuis des CDN publics.</li></ul></section>`;
}

// =========================== DÉMARRAGE ================================================================================
const initial = location.hash.slice(1);
if (TABS.some(([id]) => id === initial)) state.tab = initial;
render();
window.addEventListener("hashchange", () => { const h = location.hash.slice(1); if (h !== state.tab && TABS.some(([id]) => id === h)) { state.tab = h; render(); } });
if ("serviceWorker" in navigator && location.protocol.startsWith("http")) navigator.serviceWorker.register("sw.js").catch(() => {});






})();
