🐝 AlvearCheck v1.3
AlvearCheck est une application web progressive (PWA) pour les apiculteurs. Elle permet de suivre les ruchers et les ruches depuis un téléphone, avec commandes vocales, synchronisation cloud et installation sur l'écran d'accueil.

✨ Fonctionnalités
Gestion des ruchers : Création avec nom, orientation et coordonnées GPS (bouton de géolocalisation).
Suivi des ruches : Pour chaque ruche, enregistrement de :
Nombre de cadres mâles, cadres de miel, cadres de couvain.
Couleur de la reine (bleu, blanc, jaune, rouge, vert).
Nombre de varroas.
Risque d'essaimage (avec alerte automatique après 14 jours).
Remarques libres.
Historique des visites : Chaque sauvegarde crée une entrée horodatée. Export possible en CSV.
Alertes d'essaimage : Si une ruche est marquée "à risque", un ⚠️ apparaît après 14 jours sur le rucher et la ruche.
Dictée vocale par IA : Utilisation du microphone pour remplir les formulaires et naviguer. Propulsé par Groq (Whisper + LLM).
Synchronisation cloud : Données stockées sur Supabase et synchronisées entre appareils.
Connexion biométrique : Face ID / empreinte digitale via les Passkeys (WebAuthn).
Multi-langues : Anglais, Français, Allemand, Italien, Romanche.
PWA installable : Sur Android et iOS. Fonctionne hors ligne (après le premier chargement).
Pull-to-Refresh désactivé : Évite le rechargement accidentel de la page sur mobile.
🛠️ Technologies utilisées
Frontend : HTML, CSS, JavaScript (fichier index.html unique).
Backend : Supabase (Auth + base de données PostgreSQL).
IA : Groq (Whisper pour la transcription, Llama/Qwen pour la compréhension des formulaires).
PWA : manifest.json + sw.js (service worker).
🚀 Installation
1. Cloner le dépôt
git clone https://github.com/ton-utilisateur/AlvearCheck.git
cd AlvearCheck
