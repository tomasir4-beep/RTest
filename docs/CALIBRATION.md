# Calibration sur vidéo réelle (20261018_151008.mp4)

**Vidéo** : 177 s, 720×1280 (portrait), séance de **service** en salle, joueur droitier filmé de dos/3-quarts arrière à ~8 m
(le joueur ne mesure que ~13 % de la hauteur de l'image). Le fichier était **à l'envers** (180°).

## Problèmes détectés et corrigés
| Problème | Correction |
|---|---|
| Image retournée → squelette à l'envers, angles faux | Détection automatique de l'orientation (tête au-dessus du bassin) + réglage manuel |
| Joueur trop petit : détection 79 % et instable | Suivi du joueur avec recadrage carré (≈ 2,4 × sa taille) → détection 100 % |
| Séance de 7 services dans un seul fichier | Segmentation automatique des gestes (pics de vitesse du poignet, poignet > tête, bras tendu) + agrégation par médiane |
| Durées en secondes inadaptées (vidéo en ralenti : ~1,1 s entre le point bas du bassin et le contact) | Option « Cadence de la vidéo » (× durées) ; chargement du service défini par le point bas du bassin |

## Mesures obtenues (médiane de 7 services, 15 i/s)
| Mesure | Médiane | Étendue | Seuil avant | Seuil après |
|---|---|---|---|---|
| Flexion jambes (trophée) | 130° | 117–148° | 105–150° | inchangé |
| Coude / épaule (trophée) | 0,00 | -0,03 – 0,02 | ≥ -0,1 | inchangé |
| Bras lanceur | 0,8 buste | 0,55–0,91 | ≥ 0,2 | inchangé |
| Dissociation bassin–épaules | 26° | 17–32° | ≥ 25° | **≥ 20°** (la profondeur 3D monoculaire sous-estime les rotations) |
| Coude au contact | 166° | 133–172° | ≥ 165° | inchangé |
| Hauteur de contact (poignet) | 1,15 | 1,02–1,20 | ≥ 1,28 | **≥ 1,15** (poignet ≠ raquette, bras incliné) |

## Réserves
- Un seul joueur, un seul angle de caméra : les 2 seuils modifiés ne sont **pas** validés statistiquement. À rejouer avec 5–10 joueurs de niveaux différents, idéalement avec une mesure de référence (analyse 3D labo, ou repères manuels sur images).
- Le « contact » est le pic de vitesse du poignet ; à valider image par image (contrôlé visuellement sur 3 services : cohérent).
- Résultat du joueur : tous les critères OK sauf **hauteur de contact légèrement basse** (médiane 1,13–1,15, limite du seuil) et 2 services sur 7 avec le coude plié (133° et 159°).
