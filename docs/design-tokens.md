# Design tokens — Tennis Coach IA

Source : `web/css/style.css` (variables CSS `:root`, thème sombre via `prefers-color-scheme`).

## Couleurs
| Rôle | Clair | Sombre | Usage |
|---|---|---|---|
| `--bg` | #f4f7f5 | #0d1512 | fond de page |
| `--card` | #ffffff | #15211c | cartes |
| `--ink` | #14201b | #e8f1ed | texte |
| `--muted` | #5b6b64 | #9bb0a7 | texte secondaire |
| `--line` | #dbe4df | #27382f | bordures |
| `--brand` | #0b3d2e | — | en-tête, onglet actif |
| `--brand2` | #12b886 | — | boutons principaux, liens |
| `--accent` | #d7f205 | — | filet de l'onglet actif, bouton « hero » |
| `--ok` | #2f9e44 | — | mesure conforme / cible |
| `--warn` | #f59f00 | — | à surveiller |
| `--bad` | #e03131 | — | à corriger |

**Schémas pédagogiques** : vert clair `#9be15d` (cible), rouge clair `#ff8a80` (à éviter), jaune `#ffd23f` (ce qu'il faut regarder), fond de figure `#14532d` (cible) / `#4a2323` (à éviter). **Cibles sur les images** : vert `#8cff9e` en pointillés.

## Typographie
Police système (`system-ui, -apple-system, Segoe UI, Roboto`). Corps 16 px / interligne 1,5 ; titres 1,35 rem (h2) et 1,05 rem (h3) ; texte secondaire 0,875 rem.

## Espacement et formes
Marges de page 16 px ; cartes : rayon 14 px, ombre légère, 16 px de remplissage ; boutons : rayon 10 px, hauteur tactile ≥ 44 px ; pastilles (`.chip`, `.tag`) : rayon 999 px.

## Composants
- **Jauge** (`gaugeSVG`) : barre rouge / orange / verte + repère de la valeur + étendue des répétitions.
- **Figure « À éviter / Cible »** (`issueFigure`) : deux panneaux avec angle mesuré et légende.
- **Images clés** : squelette en traits pleins, cibles en pointillés verts (case à cocher).
- **Tableau des répétitions** : cases à cocher, étiquette « atypique », bouton « Voir ».
- **Accessibilité** : contraste WCAG AA pour le texte, libellés sur les champs, `aria-label` sur les figures.
