# ⚡ Déploiement Rapide - Guide Complet

## 🚀 Étapes pour Déployer sur GitHub et Vercel

### 📦 Partie 1: Déployer sur GitHub

#### Option A: Utiliser le Script Automatique (Recommandé)

1. **Ouvrir PowerShell** dans le dossier du projet
2. **Exécuter le script:**
   \`\`\`powershell
   .\scripts\deploy-to-github.ps1
   \`\`\`
3. **Suivre les instructions** affichées

#### Option B: Commandes Manuelles

\`\`\`powershell
# 1. Aller dans le dossier du projet
cd "c:\Users\oussama\Desktop\task intenship"

# 2. Initialiser Git (si pas déjà fait)
git init

# 3. Ajouter tous les fichiers
git add .

# 4. Créer le premier commit
git commit -m "Initial commit: Agency Dashboard with 3D UI and full features"

# 5. Créer un repository sur GitHub.com (via le site web)

# 6. Ajouter le remote (remplacez YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/agency-dashboard.git

# 7. Renommer la branche
git branch -M main

# 8. Pousser vers GitHub
git push -u origin main
\`\`\`

### ☁️ Partie 2: Déployer sur Vercel

1. **Aller sur [vercel.com](https://vercel.com)**
2. **Se connecter avec GitHub**
3. **Importer le projet** depuis votre repository GitHub
4. **Ajouter les variables d'environnement** (voir ci-dessous)
5. **Cliquer sur "Deploy"**

### 🔑 Variables d'Environnement pour Vercel

Dans Vercel Dashboard > Settings > Environment Variables, ajoutez :

| Variable | Valeur |
|----------|--------|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Votre clé publique Clerk |
| `CLERK_SECRET_KEY` | Votre clé secrète Clerk |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL` | `/sign-in` |
| `NEXT_PUBLIC_CLERK_SIGN_UP_URL` | `/sign-up` |
| `DATABASE_URL` | Votre connection string PostgreSQL |

⚠️ **Cochez** Production, Preview, et Development pour chaque variable.

### 🔗 Configuration de Clerk

1. Dans [Clerk Dashboard](https://dashboard.clerk.com) :
   - Ajoutez votre domaine Vercel dans "Domains"
   - Configurez les URLs de sign-in/sign-up
2. Utilisez les clés de **production** pour Vercel

### ✅ Vérification

Après le déploiement :
- ✅ L'app charge sans erreurs
- ✅ L'inscription/connexion fonctionne
- ✅ Le dashboard est accessible
- ✅ Toutes les pages fonctionnent

---

**🎉 Votre app sera en ligne sur : `https://your-app.vercel.app`**

