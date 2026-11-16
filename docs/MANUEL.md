# Manuel utilisateur — Tennis Coach IA

Ce manuel est organisé par **tâches** : chaque titre est une question que vous pouvez vous poser.

---

## 1. Comment analyser mon service (ou un autre coup) ?

**Avant de commencer**
- Un téléphone ou une tablette, une connexion Internet la première fois (le moteur d'IA se télécharge une fois, environ 10 Mo).
- Une vidéo du geste : joueur entier visible, caméra immobile (voir « Comment bien filmer ? »).

**Étapes**
1. Ouvrez l'onglet **Analyse**.
2. Choisissez le **geste** (service, coup droit, revers, volée, slice, amortie, smash, lob, retour), votre **main** et votre **objectif de niveau**.
3. Touchez **Importer** (ou **Filmer**) et choisissez la vidéo. *Résultat attendu : la vidéo apparaît avec ses réglages.*
4. Renseignez votre **taille** (facultatif, pour obtenir des valeurs en mètres et en m/s).
5. Touchez **Lancer l'analyse**. *Résultat attendu : une barre de progression ; au bout de quelques dizaines de secondes, le résultat s'affiche.*

**Exemple.** Trois vidéos d'un service de 6 secondes (1080×1920), analysées à 20 images par seconde : environ 1 minute. Résultat : score 78/100, avec 3 mesures « à surveiller » (hauteur du contact, coude au contact, coude en position trophée).

**Messages courants**
| Message | Cause | Que faire |
|---|---|---|
| « Silhouette non détectée » | Joueur trop petit, caché ou mal éclairé | Rapprochez la caméra, évitez le contre-jour, touchez le joueur à analyser |
| « Plage trop courte » | Début et fin trop proches | Élargissez la plage de la vidéo |
| « Format non pris en charge » | Fichier ni vidéo ni image | Utilisez un MP4 (H.264) ou des JPEG |

---

## 2. Comment obtenir un résultat fiable avec plusieurs répétitions ?

Un geste isolé peut être raté. L'application **moyenne** plusieurs gestes (médiane) et mesure leur **régularité**.

1. Importez **une vidéo contenant plusieurs fois le même geste**, ou ajoutez **plusieurs vidéos** avec le bouton **➕ Ajouter une vidéo**.
2. Lancez l'analyse. *Résultat attendu : « 🔁 Répétitions : N gestes » avec un tableau.*
3. Décochez un geste raté ou signalé **atypique** : la moyenne se recalcule.
4. Touchez **Voir** sur un geste pour afficher ses images clés.

**À lire dans le tableau**
- **Étendue** : valeur minimale → maximale sur vos gestes.
- **Régulier / variable** : un geste « régulier » a un écart-type inférieur à la tolérance de la mesure (par exemple 10° pour un angle). C'est un bon signe d'automatisation.
- **Conseil** : visez 5 à 10 gestes par séance de mesure.

---

## 3. Comment lire un résultat ?

- **Score /100** : synthèse des mesures. Il sert à suivre vos progrès, pas à vous comparer à d'autres joueurs.
- **Images clés** : chargement, contact, fin de geste, avec angles dessinés.
- **Mesures** : chaque ligne montre la valeur, une **jauge** (vert = cible, orange = à surveiller, rouge = à corriger), la **fiabilité de la mesure** et la **meilleure vue de caméra**.
- **Priorités de progression** : pour chaque défaut, un schéma « À éviter / Cible », la consigne et des exercices.
- **Besoin d'aide ?** L'onglet **Guide** explique chaque mesure avec un schéma.

---

## 4. Comment comparer mon geste à un modèle ?

1. Dans le résultat, ouvrez **Comparaison côte à côte**.
2. **Modèle de référence** : votre image clé à côté d'une figure schématique idéale.
3. **Vidéo de référence** : touchez **Choisir la vidéo de référence** (un joueur de votre choix ou fourni par votre coach). Elle est analysée de la même façon, sur votre appareil. Un tableau donne les écarts.

Une référence n'est pas une norme : la morphologie et le style diffèrent.

---

## 5. Comment revoir le geste au ralenti ?

Dans le résultat, ouvrez **Lecteur ralenti annoté** : lecture image par image (× 0,1 à × 1), squelette, angles en direct (genoux, coude, tronc) et trace du poignet.

---

## 6. Comment préparer un match (tactique) ?

1. Ouvrez **Tactique** et répondez au questionnaire : votre style, l'adversaire (ce qu'il aime, ce qu'il n'aime pas, sa réaction sous pression), la surface, le vent, la chaleur.
2. Touchez **Générer le plan de jeu**.
3. Lisez les principes de jeu, les schémas de points (flèches vertes = vos frappes, orange pointillé = l'adversaire) et la check-list avant / pendant / après le match.
4. Facultatif : **Reformuler avec Claude** (clé API personnelle) pour obtenir un briefing d'avant-match.

---

## 7. Comment envoyer mon dossier à mon coach ?

1. Renseignez votre nom dans **Coach › Mon profil**.
2. Dans le résultat, touchez **Envoyer à mon coach**, ou ouvrez l'onglet Coach.
3. Un fichier est créé ; envoyez-le par messagerie ou mail. Votre coach l'importe dans **Mode coach**, commente, puis vous renvoie un fichier que vous importez dans **Coach › Importer un retour du coach**.

Le dossier contient vos scores, vos défauts, vos réponses au questionnaire et, si vous l'acceptez, 3 images clés. Jamais la vidéo complète.

---

## 8. Que faire en cas de douleur ?

Arrêtez le geste concerné et consultez un professionnel de santé. L'application ne remplace pas un avis médical. Voir **Guide › Prévention et santé**.
