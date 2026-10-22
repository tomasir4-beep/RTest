# Tennis Coach IA — webapp (PWA) + application Android

Analyse de gestes de tennis par IA (pose 3D sur l'appareil), exercices correctifs, programme sur 4 semaines
(objectif « 2e série » inclus) et **plans tactiques** générés par questionnaire (style, adversaire, surface, vent…).

## Lancer la webapp (Windows)

```powershell
.\serve.ps1            # http://localhost:8080
```
Aucune dépendance (ni Node, ni Python). N'importe quel serveur statique fonctionne (`web/` à la racine).
L'application doit être servie en **HTTPS ou localhost** (caméra, service worker, import de modules).

## Utiliser sur Android — 3 options

1. **PWA (le plus simple)** : hébergez le dossier `web/` en HTTPS (GitHub Pages, Netlify, serveur interne), ouvrez l'URL
   dans Chrome Android → menu ⋮ → « Installer l'application ». Icône, plein écran, mode hors-ligne après la 1re visite.
2. **APK via Capacitor** (dossier `android/`) : voir ci-dessous.
3. **TWA / Play Store** : `npx @bubblewrap/cli init --manifest https://VOTRE-URL/manifest.webmanifest` puis `bubblewrap build`.

### APK Capacitor
Prérequis : Node.js 18+, Android Studio (SDK + JDK 17).
```powershell
.\scripts\fetch-offline-assets.ps1     # (facultatif) embarque le moteur IA et les modèles -> 100 % hors-ligne
cd android
npm install
npx cap add android
npx cap sync android
npx cap open android                    # Android Studio -> Build > Build APK(s)
```
Ajoutez dans `android/android/app/src/main/AndroidManifest.xml` (avant `<application>`) :
```xml
<uses-permission android:name="android.permission.CAMERA" />
<uses-feature android:name="android.hardware.camera" android:required="false" />
```

## Architecture

| Fichier | Rôle |
|---|---|
| `web/js/pose.js` | MediaPipe Pose Landmarker (33 points 2D + monde 3D), lecture vidéo image par image, photos/rafales, dessin du squelette |
| `web/js/metrics.js` | Lissage, détection des phases (chargement / impact / fin), métriques biomécaniques, score, défauts priorisés |
| `web/js/knowledge.js` | Références, défauts → pourquoi (biomécanique) → consigne → exercices, bibliothèque d'exercices |
| `web/js/tactics.js` | Questionnaire, 23 schémas de jeu avec règles de score explicables, plan de jeu, schémas SVG |
| `web/js/app.js` | Interface (Accueil, Analyse, Tactique, Exercices, Suivi, Sources), historique local |
| `web/sw.js`, `manifest.webmanifest` | PWA installable + cache hors-ligne |

## Métriques mesurées

- **Service** : flexion des jambes (trophée), hauteur du coude et du bras lanceur (trophée), dissociation bassin–épaules, angle du coude au contact, hauteur du point de contact.
- **Coup droit / revers 1 main / revers 2 mains** : flexion d'appui, rotation des épaules, dissociation, contact devant le corps, angle du coude, stabilité de la tête, inclinaison du tronc.
- **Volée** : amplitude de préparation, contact devant, flexion des jambes.

## Limites (à connaître)

- Pose monoculaire : la profondeur (rotations) est estimée → précision indicative, surtout sans caméra fixe ni joueur entier visible.
- Les plages cibles sont des **repères pédagogiques simplifiés** tirés de la littérature, à valider/ajuster par un entraîneur ; elles ne sont pas des normes.
- Pas de suivi de balle ni de raquette ; le point d'impact est estimé par le pic de vitesse du poignet (corrigeable au curseur).
- Les rotations dépendent de l'angle de filmage ; aucune donnée ne quitte l'appareil (stockage local).

## Pistes d'évolution
Comparaison avec un modèle pro côte à côte, ralenti annoté, détection du joueur par toucher, calibration par la taille du joueur,
export PDF, synchronisation compte/coach, stats de match (1res balles…), modèle de balle (TrackNet), assistant LLM pour reformuler les conseils.
