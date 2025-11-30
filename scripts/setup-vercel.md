# ⚡ Configuration Rapide Vercel

Guide rapide pour déployer sur Vercel après avoir poussé sur GitHub.

## 🔗 Étapes Rapides

### 1. Aller sur Vercel
- Visitez [vercel.com](https://vercel.com)
- Cliquez sur "Sign Up" ou "Log In"
- Connectez-vous avec votre compte GitHub

### 2. Importer le Projet
- Cliquez sur "Add New..." > "Project"
- Sélectionnez le repository `agency-dashboard`
- Cliquez sur "Import"

### 3. Configurer les Variables d'Environnement

Dans la section "Environment Variables", ajoutez :

| Variable | Valeur | Exemple |
|----------|--------|---------|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Votre clé publique Clerk | `pk_test_...` |
| `CLERK_SECRET_KEY` | Votre clé secrète Clerk | `sk_test_...` |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL` | `/sign-in` | `/sign-in` |
| `NEXT_PUBLIC_CLERK_SIGN_UP_URL` | `/sign-up` | `/sign-up` |
| `DATABASE_URL` | Votre connection string PostgreSQL | `postgresql://...` |

⚠️ **Important:** Cochez toutes les cases (Production, Preview, Development)

### 4. Déployer
- Cliquez sur "Deploy"
- Attendez 2-3 minutes
- Votre app sera en ligne !

### 5. Configurer Clerk pour Production

1. Dans [Clerk Dashboard](https://dashboard.clerk.com) :
   - Allez dans "Configure" > "Domains"
   - Ajoutez votre domaine Vercel (ex: `agency-dashboard.vercel.app`)

2. Dans "API Keys" :
   - Copiez les clés de **production** (commencent par `pk_live_` et `sk_live_`)
   - Remplacez les clés de test dans Vercel

3. Redéployez l'application

## 🎯 Votre App Sera Accessible Ici

Après le déploiement, Vercel vous donnera une URL comme :
- `https://agency-dashboard-xyz.vercel.app`
- Ou votre domaine personnalisé si configuré

## ✅ Checklist Post-Déploiement

- [ ] L'application charge sans erreurs
- [ ] La page d'accueil s'affiche
- [ ] L'inscription fonctionne
- [ ] La connexion fonctionne
- [ ] Le dashboard est accessible
- [ ] Les pages Agencies et Contacts fonctionnent
- [ ] Le dark mode fonctionne
- [ ] Le profil utilisateur fonctionne

## 🔧 Commandes Vercel CLI (Optionnel)

Si vous préférez utiliser la ligne de commande :

\`\`\`bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter
vercel login

# Déployer
cd "c:\Users\oussama\Desktop\task intenship"
vercel

# Suivre les instructions pour ajouter les variables d'environnement
\`\`\`

