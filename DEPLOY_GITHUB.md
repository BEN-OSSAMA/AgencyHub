# 🚀 Script de Déploiement Rapide sur GitHub

Instructions rapides pour déployer votre projet sur GitHub.

## 📝 Étapes Rapides

### 1. Préparer le Repository

Exécutez ces commandes dans PowerShell :

\`\`\`powershell
# Aller dans le dossier du projet
cd "c:\Users\oussama\Desktop\task intenship"

# Initialiser Git (si pas déjà fait)
git init

# Vérifier le statut
git status

# Ajouter tous les fichiers
git add .

# Créer le premier commit
git commit -m "Initial commit: Agency Dashboard with 3D UI and all features"
\`\`\`

### 2. Créer le Repository sur GitHub

1. Allez sur https://github.com/new
2. Repository name: `agency-dashboard`
3. Description: `Modern Next.js 16 dashboard with Clerk auth and 3D UI`
4. Choisissez Public ou Private
5. **Ne cochez pas** "Add a README file"
6. Cliquez sur "Create repository"

### 3. Connecter et Pousser

Remplacez `YOUR_USERNAME` par votre nom d'utilisateur GitHub :

\`\`\`powershell
# Ajouter le remote
git remote add origin https://github.com/YOUR_USERNAME/agency-dashboard.git

# Ou si vous utilisez SSH:
# git remote add origin git@github.com:YOUR_USERNAME/agency-dashboard.git

# Renommer la branche en main
git branch -M main

# Pousser vers GitHub
git push -u origin main
\`\`\`

### 4. Vérifier

Allez sur `https://github.com/YOUR_USERNAME/agency-dashboard` pour voir votre code.

## ⚠️ Important

- ✅ Le fichier `.env.local` sera ignoré automatiquement (grâce à .gitignore)
- ✅ Ne commitez **JAMAIS** vos clés secrètes
- ✅ Vérifiez que `.env.local` n'apparaît pas dans `git status`

## 🔄 Pour les Prochains Changements

\`\`\`powershell
git add .
git commit -m "Description de vos changements"
git push
\`\`\`

