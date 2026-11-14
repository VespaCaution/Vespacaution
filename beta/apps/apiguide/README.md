#🐝 ApiGuide v1.0

Un guide apicole saisonnier en cinq langues, installable comme application.

---

## À propos

**ApiGuide** est une application web légère (PWA) qui accompagne les apiculteurs à travers les activités de chaque saison. Elle s'organise selon une hiérarchie simple et intuitive :

- **4 boutons de saison** sur l'écran d'accueil (printemps, été, automne, hiver).
- Chaque saison ouvre **10 boutons d'activité** adaptés à cette période de l'année.
- Chaque activité ouvre une **page de texte dédiée** contenant des notes, conseils ou procédures.

Rien n'est modifiable dans l'application — les lecteurs naviguent et lisent, tout simplement.

---

## Langues

ApiGuide est disponible en cinq langues, chacune entièrement indépendante :

| Code | Langue |
|------|--------|
| `en` | English (anglais) |
| `fr` | Français |
| `it` | Italiano (italien) |
| `de` | Deutsch (allemand) |
| `rm` | Rumantsch Grischun (romanche grischun) |

Un sélecteur de langue dans l'en-tête permet aux lecteurs de changer à tout moment. Changer de langue affiche les saisons, activités et textes propres à cette langue — jamais un mélange.

---

## Comment l'utiliser

1. **Choisissez une saison** sur l'écran d'accueil.
2. **Choisissez une activité** parmi les dix boutons qui apparaissent.
3. **Lisez la page** — notes, conseils ou étapes pour cette activité.
4. Appuyez sur **← Retour** à tout moment pour revenir en arrière.

C'est tout. Pas de compte, pas de menu, pas de distraction.

---

## Installation en tant qu'application

ApiGuide est une **Progressive Web App (PWA)**. Elle peut être installée sur l'écran d'accueil et fonctionne hors ligne après la première visite.

### Sur Android (Chrome, Edge, Samsung Internet)

1. Ouvrez le site dans votre navigateur.
2. Appuyez sur le bouton vert **⬇ Installer l'application** en bas de la page.
3. Confirmez l'invite d'installation.
4. ApiGuide apparaît sur votre écran d'accueil comme une application native.

Si le bouton ne répond pas (rare), ouvrez le menu du navigateur (⋮) et choisissez **« Installer l'application »** ou **« Ajouter à l'écran d'accueil »**.

### Sur iPhone / iPad (Safari)

iOS ne permet pas l'installation en un clic. À la place :

1. Ouvrez ApiGuide dans **Safari** (obligatoire — Chrome et Firefox sur iOS ne peuvent pas installer de PWA).
2. Appuyez sur le bouton vert **⬇ Installer l'application** — un guide étape par étape s'ouvre.
3. Ou faites-le manuellement :
   - Appuyez sur le bouton **Partager** (carré avec une flèche vers le haut) en bas.
   - Faites défiler et appuyez sur **« Sur l'écran d'accueil »**.
   - Appuyez sur **« Ajouter »** en haut à droite.
4. L'icône ApiGuide apparaît sur votre écran d'accueil.

Une fois installée, l'application s'ouvre en plein écran et fonctionne sans connexion internet.

---

## Utilisation hors ligne

Après la première visite, ApiGuide se met en cache sur votre appareil via un service worker. Vous pouvez l'ouvrir dans un avion, dans un rucher sans signal, ou partout sans internet — tant que vous l'avez visitée au moins une fois auparavant.

---

## Fichiers inclus

| Fichier | Rôle |
|---------|------|
| `index.html` | L'application elle-même — le guide complet, prêt à consulter |
| `manifest.json` | Indique aux navigateurs le nom, l'icône et les couleurs de l'application pour l'installation |
| `sw.js` | Service worker — permet l'utilisation hors ligne et la mise en cache |
| `icon.png` | L'icône de l'application (au moins 512×512 px) |

Les quatre fichiers doivent être **dans le même dossier**, servis depuis le **même domaine**, en **HTTPS** (ou `localhost` pendant les tests). C'est une exigence des navigateurs pour l'installation PWA et la mise en cache hors ligne.

---

## Hébergement

ApiGuide est entièrement statique — pas de backend, pas de base de données, pas de comptes. Vous pouvez l'héberger partout où des fichiers HTML sont servis :

- **GitHub Pages** (gratuit)
- **Netlify** (gratuit)
- **Vercel** (gratuit)
- **Cloudflare Pages** (gratuit)
- Tout serveur web que vous contrôlez

Il suffit de téléverser les quatre fichiers ensemble et de pointer votre navigateur vers `index.html`.

**Le HTTPS est obligatoire** pour que l'installation et le mode hors ligne fonctionnent dans de vrais navigateurs. Tous les hébergeurs gratuits ci-dessus fournissent HTTPS automatiquement.

---

## Fonctionnalités en un coup d'œil

- 🐝 **Structure saisonnière** — quatre saisons, dix activités chacune, une page de texte par activité
- 🌍 **Cinq langues** — anglais, français, italien, allemand, romanche grischun, chacune entièrement séparée
- 📱 **PWA installable** — ajout à l'écran d'accueil sur Android et iOS
- 📴 **Fonctionne hors ligne** — mis en cache après la première visite
- 🎨 **Aucune dépendance** — HTML, CSS et JavaScript purs dans un seul fichier
- 🔒 **Aucun suivi, aucune publicité, aucun compte** — rien ne quitte votre appareil
- 📖 **Lecture seule pour les lecteurs** — le contenu est rédigé une fois et affiché tel quel

---

## Version

**ApiGuide v1.0**

---

## Crédits

Fait pour les apiculteurs, par les apiculteurs.
