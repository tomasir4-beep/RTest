# Note technique — mesures biomécaniques de Tennis Coach IA

*Revue « expert du domaine » du 16/11/2026. Références : voir `BIBLIOGRAPHIE.md` (niveau de lecture : titre ou résumé).*

## 1. Domaine et références
Biomécanique du tennis (service, coups de fond, volée, coups spéciaux) évaluée par vidéo d'un smartphone. Cadre conceptuel : la chaîne cinétique proximo-distale du service (jambes → bassin → tronc → épaule → bras → raquette) [colomar2022] [martin2026] [vantrigt2025], le rôle de la rotation du bassin et du tronc au coup droit [reid2013], les revues sur les coups de fond [lambrich2023] [elliott2018] et les revers [genevois2015]. L'évaluation de services par des experts sur vidéo 2D à deux angles de caméra est documentée [wood2023]. Les validations de l'estimation de pose sont encore partielles [roggio2024] [yue2026] [emmerson2025].

**Les plages cibles de l'application ne sont pas extraites de ces publications** : ce sont des repères pédagogiques à calibrer (voir §5).

## 2. Définition des mesures (convention : angles en degrés, 180° = segment aligné)
| Mesure | Définition | Source des points | Fiabilité |
|---|---|---|---|
| `knee_load` | angle hanche–genou–cheville, moyenne des deux jambes | coordonnées monde 3D estimées | élevée (dans le plan de l'image) |
| `elbow_contact` | angle épaule–coude–poignet du bras frappeur à l'impact | monde 3D | élevée |
| `elbow_trophy`, `toss_arm`, `follow_high` | différence de hauteur (image) divisée par la longueur du buste ; > 0 = au-dessus de l'épaule | image 2D | indicative |
| `contact_height` | (cheville→poignet) / (cheville→nez) dans l'image à l'impact | image 2D | indicative (le poignet n'est pas la raquette ; la hauteur de saut est ignorée) |
| `separation` | écart de rotation (lacet) entre la ligne des épaules et celle des hanches, maximum sur la fenêtre | monde 3D (profondeur) | **approximative** (profondeur monoculaire) |
| `shoulder_turn` | étendue de rotation des épaules entre le début de la préparation et l'impact | monde 3D | approximative |
| `contact_front` | distance poignet–hanches projetée sur la direction du coup / longueur du buste | monde 3D + déplacement du poignet | indicative |
| `head_stability` | trajet du nez entre ± 0,15 s autour de l'impact / longueur du buste | image 2D | indicative |
| `trunk_lean` | angle tronc–verticale | monde 3D | indicative (suppose la caméra à peu près à l'horizontale) |
| `backswing`, `wrist_path`, `contact_speed` | recul / variation verticale / vitesse du poignet, en longueurs de buste | image 2D | indicative à approximative |

**Normalisation** : toutes les distances de l'image sont divisées par la longueur du buste (hanches → épaules), ce qui rend les mesures indépendantes de la distance à la caméra. Avec la taille du joueur, elles sont converties en mètres (buste ≈ 0,30 × taille ; incertitude ≈ 15 %).

## 3. Hypothèses implicites (documentées)
1. **Une seule caméra fixe**, joueur entier visible ; les rotations dépendent de la profondeur estimée par le modèle, donc sous-estimées.
2. **Le contact est défini par la cinématique** : pic de vitesse du poignet ; pour le service et le smash, affiné au point le plus haut du poignet à ± 0,12 s (le pic de vitesse arrive un peu avant la pleine extension, ce qui faisait paraître le bras plié).
3. **Le chargement du service** est le point bas du bassin dans la fenêtre précédant l'impact (indépendant de la cadence de la vidéo).
4. **Cadence** : les durées de référence sont multipliées par le facteur de ralenti indiqué ; en vidéo ralentie non déclarée, les fenêtres de temps sont trop courtes.
5. **Un geste = ≥ 0,2 s entre le point bas du bassin et l'impact** (service, smash) : en dessous, il s'agit d'un faux départ ou d'un second pic de vitesse.
6. **L'agrégation** est la médiane des gestes retenus ; la dispersion est l'écart-type comparé à une tolérance par mesure (10° pour un angle, 0,15 buste, etc.).
7. **L'axe vertical** des coordonnées monde est supposé aligné avec la verticale de l'image.

## 4. Points d'attention relevés par la revue
| # | Constat | Décision |
|---|---|---|
| 1 | Le pic de vitesse du poignet précède le point d'impact : angle du coude sous-estimé, contact trop bas | **Corrigé** (affinage au point le plus haut du poignet) |
| 2 | Des pics de vitesse secondaires (retombée du bras) étaient comptés comme des services | **Corrigé** (durée minimale ≥ 0,2 s) |
| 3 | La dissociation bassin–épaules (22–30° chez tous les joueurs testés) ne discrimine pas et reste approximative | **Poids réduit de 1 à 0,5** dans le score ; fiabilité « approximative » affichée |
| 4 | `contact_height` ignore la hauteur de saut et mesure le poignet | Fiabilité « indicative » affichée ; valeur absolue donnée « au-dessus de la cheville » |
| 5 | Seuils des 5 coups ajoutés (slice, amortie, smash, lob, retour) non calibrés sur des vidéos réelles | **Provisoires**, signalés dans l'application |
| 6 | La vitesse du poignet n'est pas la vitesse de tête de raquette | Libellé explicite, usage = suivi de progression |

## 5. Calibration sur vidéos réelles (services)
Médianes par vidéo (20 images/s, joueur droitier). Détail : `CALIBRATION.md`.

| Vidéo | Gestes | Genoux (°) | Coude trophée | Bras libre | Dissociation (°) | Coude contact (°) | Hauteur contact |
|---|---|---|---|---|---|---|---|
| 18/10 – 177 s, ralenti (ancienne méthode de contact) | 7 | 130 | 0,00 | 0,80 | 26 | 166 | 1,15 |
| 18/10 – 41 s, 1080×1920, temps réel | 6 | 127 | −0,09 | 0,8 | 25,6 | 152 | 1,08 |
| 18/10 – 152 s, 720×1280, ralenti | 5 retenus sur 8 | 139 | −0,06 | 0,9 | 26,4 | 167 | 1,17 |
| 25/10 – 3 clips, 1080×1920 (méthode de contact antérieure) | 3 | 132 | −0,15 | 0,88 | 23,6 | 150 | 1,11 |

**Lecture.** Le coude au contact (141–171°) et la hauteur de contact (1,02–1,24) **discriminent** bien les services : les seuils actuels (≥ 165° et ≥ 1,15) séparent un service très étendu d'un service plus bas. La flexion des jambes (121–149°) et le coude en trophée restent dans les plages cibles. **Aucune vérité terrain** (mocap, repères manuels) n'a été utilisée : ces valeurs montrent la cohérence de la mesure, pas sa justesse.

## 6. Cas de test de référence
Séquences synthétiques (squelette généré par cinématique directe, bon geste contre mauvais geste). Tolérance : le bon geste doit obtenir un score supérieur d'au moins 20 points au mauvais.

| Coup | Bon geste | Mauvais geste | Défauts attendus (mauvais geste) |
|---|---|---|---|
| Slice | 100 | 51 | `sl_path_flat`, `g_contact_behind`, `g_turn_small` |
| Lob | 100 | 60 | `lb_path_flat`, `lb_finish_low` |
| Amortie | 100 | 68 | `dr_not_disguised`, `dr_too_fast` |
| Retour | 100 | 60 | `rt_prep_big`, `g_turn_small`, `g_knee_stiff` |
| Smash | ≈ 63 | 32 | `sm_elbow_low`, `sm_toss_arm`, `sm_elbow_bent`, `sm_contact_low` |

Limite : le smash simulé du « bon geste » est mal noté car le contact est mal repéré sur ces séquences synthétiques (vitesses constantes) ; à valider sur de vraies vidéos de smash.

## 7. Limites de validité
- Estimation monoculaire : à ± 5–10° pour les angles dans le plan de la caméra, davantage pour les rotations.
- Pas de suivi de balle ni de raquette : l'angle du tamis, l'effet et la trajectoire de la balle ne sont pas évalués.
- Seuils calibrés sur quelques joueurs seulement ; ils doivent être revus avec des joueurs de niveaux variés et, idéalement, une mesure de référence.
- Ne remplace ni un entraîneur ni un avis médical.
