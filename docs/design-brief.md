# Design brief — évolution v0.4

**Charte** : inchangée (voir `design-tokens.md`). Mobile d'abord (largeur 360–420 px), lisible sur ordinateur (colonne de 980 px max).

## Besoin exprimé
1. Schémas d'explication plus explicites, avec des illustrations parlantes (exemple : « l'angle du coude »).
2. Sur les images arrêtées de la vidéo, montrer en pointillés les valeurs idéales à côté des mesures.
3. Répétitions : plusieurs vidéos, ou une vidéo avec plusieurs gestes, pour moyenner.
4. Plus de contenu de coaching.

## Composants conçus
| Composant | Rôle | Comportement |
|---|---|---|
| Figure « À éviter / Cible » | Expliquer un défaut en 3 secondes | 2 panneaux côte à côte (empilés sur petit écran) ; angle mesuré en jaune ; légende sous chaque panneau |
| Glossaire illustré (onglet Guide) | Comprendre chaque mesure | Schéma + jauge + 5 rubriques (ce que c'est, comment mesuré, cible, erreurs, conseil) |
| Jauge dans le tableau des mesures | Situer la valeur | Zones verte/orange/rouge ; repère = valeur ; trait = étendue des répétitions |
| Cibles en pointillés sur l'image | Corriger sur l'image concernée | Case à cocher « Afficher les valeurs cibles » ; plus marqué = à corriger, atténué = conforme |
| Tableau des répétitions | Fiabiliser la moyenne | Cases à cocher, étiquette « atypique », bouton « Voir », régularité en % |
| Liste de vidéos | Ajouter / retirer des vidéos | Plage début–fin par vidéo, bouton « ➕ Ajouter une vidéo » |
| Fiches par coup / sections coaching | Contenu pédagogique | Accordéons `details` ; renvois `[id]` vers la source |

## États
- Case « cibles » : cochée par défaut, mémorisée sur l'appareil.
- Répétition exclue : ligne grisée ; au moins un geste doit rester coché.
- Analyse en cours : barre de progression et message d'état.

## Points à valider avec l'utilisateur
Lisibilité des légendes sur les images de la vidéo (taille du texte), densité du tableau des mesures sur petit écran, ordre des onglets.
