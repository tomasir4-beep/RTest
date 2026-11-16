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

---

# Compléments du 16/11/2026 — 5 nouvelles vidéos de service

| Vidéo | Durée / format | Cadence | Gestes retenus | Remarques |
|---|---|---|---|---|
| 20261018_145725 | 41 s, 1080×1920 | temps réel (chargement → impact ≈ 0,45 s) | 6 | 6 services à 20 i/s (4 seulement à 12 i/s : la cadence d'analyse compte) |
| 20261018_150047 | 152 s, 720×1280 | ralenti (chargement → impact ≈ 1–1,5 s) | 5 sur 8 | 3 pics secondaires écartés (durée < 0,2 s) ou atypiques |
| 20261025_153928 / _154433 / _154519 | 5,4 à 6,9 s, 1080×1920 | temps réel | 1 par vidéo | analysées ensemble : médiane de 3 gestes de 3 vidéos, régularité 100 % |

## Changements décidés
1. **Affinage du contact au service/smash** : point le plus haut du poignet à ± 0,12 s du pic de vitesse.
2. **Durée minimale** d'un geste (≥ 0,2 s entre le point bas du bassin et l'impact) pour écarter les faux services.
3. **Poids de la dissociation bassin–épaules : 1 → 0,5** (22–30° chez tous les joueurs : ne discrimine pas).
4. Les seuils du coude au contact (≥ 165°) et de la hauteur de contact (≥ 1,15) sont **conservés** : ils séparent bien les joueurs (141–171° et 1,02–1,24).

## Résultats par geste (extraits)
Vidéo 20261018_145725 (20 i/s) : coude au contact 147–159°, hauteur de contact 1,02–1,18, genoux 121–132°, dissociation 25–27°.
Vidéo 20261018_150047 : coude au contact 141–171°, hauteur de contact 1,04–1,24 ; 2 gestes à faible score (64 et 73) à vérifier visuellement.

Réserve inchangée : aucune vérité terrain ; ces mesures démontrent la cohérence et la capacité de discrimination, pas la justesse absolue.