# 🐝 Vespacaution — Projet Global

Bienvenue sur le dépôt officiel de **Vespacaution**, une association suisse à but non lucratif dédiée au développement d'outils numériques ouverts, fiables et respectueux de la vie privée pour les apiculteurs et les chasseurs de frelons.

## 🌟 À propos de l'association

**Vespacaution** est un projet indépendant fondé par Ben Hupka. Notre mission est de fournir des outils numériques gratuits et accessibles pour aider les apiculteurs à gérer leurs ruchers et à lutter contre le frelon asiatique (*Vespa velutina*).

- **Président** : Ben Hupka
- **Vice-président** : Grégoire Hupka
- **Siège** : Vullierens (canton de Vaud, Suisse)

## 🌐 Le Site Web (Portail)

Le site principal sert de portail vers les différentes applications et ressources.

- **Site Web** : [https://vespacaution.ch](https://vespacaution.ch)
- **Langues** : Français, Anglais, Allemand, Italien, Romanche (Rumantsch Grischun)
- **Fonctionnalités** : Design responsive, PWA (installable), mode sombre/clair (selon le système), système de traduction complet.

### Pages du site
- **Accueil** : Présentation du projet et des applications.
- **Apps** : Détails des applications (avec instructions et captures d'écran).
- **Membres** : Présentation du comité et des membres.
- **Ressources** : Liens utiles, crédits et fichiers téléchargeables.
- **Soutenir** : Possibilité de faire un don via Twint.
- **Contact** : Formulaire de contact (via Web3Forms).
- **Politique de confidentialité** : Explication de la gestion des données.

## 📱 Les Applications

Le site donne accès à trois applications web autonomes (PWA) :

1.  **⏱️ VespaTimer** : L'assistant digital du Pot-à-Mèche (multi-chronomètre, triangulation, boussole, export PDF/GPX/KML).
2.  **📖 ApiGuide** : Guide des saisons et activités apicoles (navigation hiérarchique, Apipedia).
3.  **📋 AlvearCheck** : Le carnet de rucher numérique (suivi des ruches, alertes d'essaimage, dictaphone IA).

## 📁 Structure du Dépôt

```text
/
├── index.html              # Page de redirection vers /site/
│
├── site/                   # Site principal (portail)
│   ├── index.html          # Page d'accueil du portail
│   ├── manifest.json       # Configuration PWA
│   ├── sw.js               # Service Worker
│   ├── icon.png            # Icône PWA
│   ├── logo.png            # Logo horizontal
│   ├── ben.png             # Photo de Ben Hupka
│   ├── gregoire.png        # Photo de Grégoire Hupka
│   ├── status.pdf          # Statuts de l'association
│   └── imprimable.pdf      # Fichiers imprimables
│
├── apps/                   # Dossier contenant toutes les applications
│   ├── vespatimer/         # Application VespaTimer
│   ├── apiguide/           # Application ApiGuide
│   ├── alvearcheck/        # Application AlvearCheck
│   └── admin/              # Espace Comité (interface privée)
│
├── beta/                   # Version Bêta (tests)
│   ├── site/               # Copie du site pour les tests
│   └── apps/               # Copie des apps pour les tests
│
├── .github/
│   └── workflows/
│       └── deploy.yml      # Action de déploiement (injecte le Token secret)
│
├── README.md               # Ce fichier
└── LICENSE                 # Licence Propriétaire Vespacaution
