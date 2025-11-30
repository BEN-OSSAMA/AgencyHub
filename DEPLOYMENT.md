# 🚀 Guide de Déploiement - Agency Dashboard

Guide complet pour déployer l'application Agency Dashboard sur GitHub et Vercel.

## 📋 Table des Matières

1. [Préparation du Projet](#préparation-du-projet)
2. [Déploiement sur GitHub](#déploiement-sur-github)
3. [Déploiement sur Vercel](#déploiement-sur-vercel)
4. [Configuration de la Base de Données](#configuration-de-la-base-de-données)
5. [Configuration de Clerk](#configuration-de-clerk)
6. [Vérification Post-Déploiement](#vérification-post-déploiement)

## 🔧 Préparation du Projet

### 1. Vérifier les Fichiers Nécessaires

Assurez-vous que ces fichiers existent :
- ✅ `.env.local` (pour le développement local)
- ✅ `.gitignore` (pour exclure les fichiers sensibles)
- ✅ `package.json` (avec tous les scripts)
- ✅ `next.config.mjs` (configuration Next.js)

### 2. Vérifier .gitignore

Votre `.gitignore` doit inclure :
\`\`\`
# Environment variables
.env
.env.local
.env*.local

# Next.js
.next
out
dist

# Node
node_modules
npm-debug.log*

# IDE
.vscode
.idea

# OS
.DS_Store
Thumbs.db
\`\`\`

## 📦 Déploiement sur GitHub

### Étape 1: Initialiser Git (si pas déjà fait)

\`\`\`bash
cd "c:\Users\oussama\Desktop\task intenship"
git init
\`\`\`

### Étape 2: Créer un Repository sur GitHub

1. Allez sur [github.com](https://github.com)
2. Cliquez sur "New repository"
3. Nommez-le : `agency-dashboard`
4. **Ne pas** initialiser avec README, .gitignore, ou license
5. Cliquez sur "Create repository"

### Étape 3: Ajouter les Fichiers et Pousser

\`\`\`bash
# Ajouter tous les fichiers
git add .

# Créer le premier commit
git commit -m "Initial commit: Agency Dashboard with 3D UI"

# Ajouter le remote (remplacez YOUR_USERNAME par votre nom d'utilisateur GitHub)
git remote add origin https://github.com/YOUR_USERNAME/agency-dashboard.git

# Pousser vers GitHub
git branch -M main
git push -u origin main
\`\`\`

### Étape 4: Vérifier sur GitHub

- Ouvrez votre repository sur GitHub
- Vérifiez que tous les fichiers sont présents
- Vérifiez que `.env.local` n'est **PAS** présent (c'est important pour la sécurité)

## ☁️ Déploiement sur Vercel

### Option 1: Déploiement via GitHub (Recommandé)

1. **Connecter GitHub à Vercel:**
   - Allez sur [vercel.com](https://vercel.com)
   - Connectez-vous avec votre compte GitHub
   - Autorisez Vercel à accéder à vos repositories

2. **Importer le Projet:**
   - Cliquez sur "Add New Project"
   - Sélectionnez le repository `agency-dashboard`
   - Cliquez sur "Import"

3. **Configurer le Projet:**
   - **Framework Preset:** Next.js (détecté automatiquement)
   - **Root Directory:** `./` (par défaut)
   - **Build Command:** `npm run build` (par défaut)
   - **Output Directory:** `.next` (par défaut)

4. **Ajouter les Variables d'Environnement:**
   
   Cliquez sur "Environment Variables" et ajoutez :
   
   \`\`\`
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY = pk_test_...
   CLERK_SECRET_KEY = sk_test_...
   NEXT_PUBLIC_CLERK_SIGN_IN_URL = /sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL = /sign-up
   DATABASE_URL = postgresql://...
   \`\`\`
   
   ⚠️ **Important:** Cochez les environnements (Production, Preview, Development)

5. **Déployer:**
   - Cliquez sur "Deploy"
   - Attendez la fin du build (2-3 minutes)
   - Votre application sera accessible via l'URL fournie

### Option 2: Déploiement via Vercel CLI

1. **Installer Vercel CLI:**
   \`\`\`bash
   npm i -g vercel
   \`\`\`

2. **Se connecter:**
   \`\`\`bash
   vercel login
   \`\`\`

3. **Déployer:**
   \`\`\`bash
   cd "c:\Users\oussama\Desktop\task intenship"
   vercel
   \`\`\`
   
   Suivez les instructions et ajoutez les variables d'environnement quand demandé.

## 🗄️ Configuration de la Base de Données

### Avec Neon (Recommandé)

1. **Créer un compte Neon:**
   - Allez sur [neon.tech](https://neon.tech)
   - Créez un compte gratuit

2. **Créer une Base de Données:**
   - Créez un nouveau projet
   - Copiez la connection string
   - Format: `postgresql://user:password@host/database?sslmode=require`

3. **Exécuter le Script SQL:**
   - Allez dans l'onglet "SQL Editor" de Neon
   - Copiez le contenu de `scripts/001-create-tables.sql`
   - Exécutez le script

4. **Ajouter DATABASE_URL à Vercel:**
   - Dans Vercel, allez dans Settings > Environment Variables
   - Ajoutez `DATABASE_URL` avec votre connection string Neon
   - Redéployez l'application

## 🔐 Configuration de Clerk pour Production

### 1. Configuration dans Clerk Dashboard

1. **Ajouter votre Domaine Vercel:**
   - Allez dans [Clerk Dashboard](https://dashboard.clerk.com)
   - Navigate to "Configure" > "Domains"
   - Ajoutez votre domaine Vercel (ex: `agency-dashboard.vercel.app`)

2. **Configurer les URLs:**
   - Sign-in URL: `https://your-app.vercel.app/sign-in`
   - Sign-up URL: `https://your-app.vercel.app/sign-up`
   - After sign-in URL: `https://your-app.vercel.app/dashboard`
   - After sign-up URL: `https://your-app.vercel.app/dashboard`

3. **Copier les Clés:**
   - Allez dans "API Keys"
   - Copiez le **Publishable Key** (commence par `pk_live_...`)
   - Copiez le **Secret Key** (commence par `sk_live_...`)

4. **Mettre à jour Vercel:**
   - Remplacez les clés de test par les clés de production dans Vercel
   - Redéployez

### 2. Créer un Compte de Test/Demo

1. **Dans Clerk Dashboard:**
   - Allez dans "Users"
   - Cliquez sur "Create User"
   - Email: `demo@agencyhub.com`
   - Password: `Demo@2024`
   - Ou utilisez la page de sign-up de l'application

## ✅ Vérification Post-Déploiement

### Checklist de Vérification

- [ ] ✅ L'application charge sans erreurs
- [ ] ✅ La page d'accueil s'affiche avec les effets 3D
- [ ] ✅ L'inscription fonctionne
- [ ] ✅ La connexion fonctionne
- [ ] ✅ Le dashboard est accessible après connexion
- [ ] ✅ La page Agencies s'affiche
- [ ] ✅ La page Contacts s'affiche
- [ ] ✅ La recherche fonctionne
- [ ] ✅ Le dark mode fonctionne
- [ ] ✅ Le profil utilisateur est accessible
- [ ] ✅ La déconnexion fonctionne
- [ ] ✅ La base de données est connectée (pas d'erreurs dans les logs)

### Tests à Effectuer

1. **Test d'Authentification:**
   - Tentez d'accéder à `/dashboard` sans être connecté
   - Devrait rediriger vers `/sign-in`
   - Connectez-vous et vérifiez l'accès au dashboard

2. **Test des Pages:**
   - Naviguez entre Dashboard, Agencies, Contacts
   - Vérifiez que tout se charge correctement

3. **Test de la Base de Données:**
   - Vérifiez les logs Vercel pour les erreurs de connexion
   - Si DATABASE_URL n'est pas configuré, l'app fonctionne mais sans tracking d'usage

4. **Test Responsive:**
   - Testez sur mobile, tablette, desktop
   - Vérifiez que le design s'adapte

## 🔗 URLs Importantes

Après le déploiement, notez ces URLs :

- **Application Live:** `https://your-app.vercel.app`
- **Repository GitHub:** `https://github.com/YOUR_USERNAME/agency-dashboard`
- **Vercel Dashboard:** `https://vercel.com/dashboard`
- **Clerk Dashboard:** `https://dashboard.clerk.com`

## 🐛 Résolution de Problèmes

### Erreur: "Build Failed"

- Vérifiez les logs de build dans Vercel
- Assurez-vous que toutes les dépendances sont dans `package.json`
- Vérifiez que Node.js version est compatible (18+)

### Erreur: "Environment Variables Missing"

- Vérifiez que toutes les variables sont ajoutées dans Vercel
- Vérifiez que les noms des variables sont exactement corrects
- Redéployez après avoir ajouté les variables

### Erreur: "Database Connection Failed"

- Vérifiez que DATABASE_URL est correct
- Vérifiez que la base de données est accessible depuis l'extérieur
- Pour Neon, vérifiez les paramètres de connection pooling

### L'Application Ne Charge Pas

- Vérifiez les logs dans Vercel Dashboard
- Vérifiez que le build s'est terminé avec succès
- Vérifiez les domaines dans Clerk Dashboard

## 📝 Commandes Utiles

\`\`\`bash
# Développement local
npm run dev

# Build pour production
npm run build

# Démarrer en mode production
npm start

# Linter
npm run lint

# Vérifier les variables d'environnement
vercel env ls
\`\`\`

## 🎯 Prochaines Étapes

Après le déploiement :

1. ✅ Tester toutes les fonctionnalités
2. ✅ Partager le lien avec votre équipe
3. ✅ Ajouter à votre portfolio
4. ✅ Configurer un domaine personnalisé (optionnel)
5. ✅ Configurer les analytics (optionnel)

---

**🚀 Votre application est maintenant en ligne !**

