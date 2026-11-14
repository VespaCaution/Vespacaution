🐝 Vespacaution
Bienvenue sur le dépôt officiel de Vespacaution, un projet indépendant créé par Ben Hupka pour développer des outils numériques ouverts, fiables et respectueux de la vie privée pour les apiculteurs et les chasseurs de frelons.

🌐 Le Site
Le site principal sert de portail vers les différentes applications développées par Vespacaution.

Site Web : https://vespacaution.ch
Langues disponibles : Français, Anglais, Allemand, Italien, Romanche (Rumantsch Grischun)
Applications disponibles
⏱️ VespaTimer : L'assistant digital du Pot-à-Mèche (chronomètre, triangulation, boussole, export PDF/GPX/KML).
📖 ApiGuide : Guide des saisons et activités apicoles (navigation hiérarchique, Apipedia).
📋 AlvearCheck : Le carnet de rucher numérique (suivi des ruches, alertes d'essaimage, dictaphone IA).
📁 Structure du Dépôt
Le dépôt est organisé de manière à séparer le site principal, les applications et la version bêta.

/
├── index.html              # Redirection racine
├── apps/                   # Dossier contenant toutes les applications
│   ├── vespatimer/
│   ├── apiguide/
│   ├── alvearcheck/
│   └── admin/              # Interface d'administration du comité (privée)
├── site/                   # Dossier contenant le site principal
│   ├── index.html          # Page d'accueil (portail)
│   ├── manifest.json       # Configuration PWA
│   ├── sw.js               # Service Worker
│   ├── icon.png
│   ├── logo.png
│   ├── ben.png
│   ├── gregoire.png
│   ├── status.pdf
│   └── imprimable.pdf
├── beta/                   # Version bêta (tests)
│   ├── site/               # Copie du site pour les tests
│   └── apps/               # Copie des apps pour les tests
├── .github/
│   └── workflows/
│       └── deploy.yml      # Action de déploiement (injecte le Token)
└── README.md
