# CodeRefactor – Plateforme de Refactorisation de Code

## 🔷 Frontend

👉 Voir [`frontend/README.md`](frontend/README.md) pour les instructions détaillées sur :

- l'installation des dépendances
- le démarrage du serveur de développement
- la structure du projet

## 🔐 Authentification (Simulation Temporaire)

Pour tester l'application, vous pouvez utiliser les identifiants suivants :

- **Email** : `user@example.com`
- **Mot de passe** : `password123`

⚠️ Il s'agit d'une simulation locale d'authentification – aucune connexion réelle à une base de données pour le moment.


## ⚙️ Configuration Générale

- Le projet utilise **Next.js** pour le rendu côté serveur et le développement frontend.
- Le contexte d'authentification est géré via `React Context` avec persistance dans `localStorage`.
- L’interface est compatible avec les thèmes **clair/sombre**.

## 🚀 Lancer le projet (version simplifiée)

```bash
cd frontend
npm install
npm run dev