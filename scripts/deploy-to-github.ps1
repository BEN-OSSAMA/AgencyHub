# Script PowerShell pour déployer sur GitHub
# Exécutez ce script depuis le dossier du projet

Write-Host "🚀 Déploiement sur GitHub - Agency Dashboard" -ForegroundColor Cyan
Write-Host ""

# Vérifier si Git est installé
try {
    $gitVersion = git --version
    Write-Host "✅ Git détecté: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Git n'est pas installé. Veuillez l'installer depuis https://git-scm.com" -ForegroundColor Red
    exit 1
}

# Vérifier si on est dans le bon dossier
if (-not (Test-Path "package.json")) {
    Write-Host "❌ Erreur: package.json introuvable. Exécutez ce script depuis le dossier du projet." -ForegroundColor Red
    exit 1
}

Write-Host "📦 Initialisation du repository Git..." -ForegroundColor Yellow

# Initialiser Git si pas déjà fait
if (-not (Test-Path ".git")) {
    git init
    Write-Host "✅ Repository Git initialisé" -ForegroundColor Green
} else {
    Write-Host "✅ Repository Git existe déjà" -ForegroundColor Green
}

# Vérifier le statut
Write-Host ""
Write-Host "📋 Statut actuel:" -ForegroundColor Yellow
git status --short

# Demander confirmation
Write-Host ""
$confirm = Read-Host "Voulez-vous continuer et créer le commit initial? (O/N)"
if ($confirm -ne "O" -and $confirm -ne "o" -and $confirm -ne "Y" -and $confirm -ne "y") {
    Write-Host "❌ Opération annulée" -ForegroundColor Red
    exit 0
}

# Ajouter tous les fichiers
Write-Host ""
Write-Host "📝 Ajout des fichiers..." -ForegroundColor Yellow
git add .

# Créer le commit
Write-Host "💾 Création du commit..." -ForegroundColor Yellow
git commit -m "Initial commit: Agency Dashboard with 3D UI, Clerk auth, and full features"

Write-Host ""
Write-Host "✅ Commit créé avec succès!" -ForegroundColor Green
Write-Host ""
Write-Host "📝 Prochaines étapes:" -ForegroundColor Cyan
Write-Host "1. Créez un nouveau repository sur GitHub: https://github.com/new" -ForegroundColor White
Write-Host "2. Nommez-le: agency-dashboard" -ForegroundColor White
Write-Host "3. Ne cochez PAS 'Add a README file'" -ForegroundColor White
Write-Host "4. Copiez l'URL de votre repository (ex: https://github.com/YOUR_USERNAME/agency-dashboard.git)" -ForegroundColor White
Write-Host ""
Write-Host "Ensuite, exécutez:" -ForegroundColor Yellow
Write-Host '  git remote add origin https://github.com/YOUR_USERNAME/agency-dashboard.git' -ForegroundColor White
Write-Host '  git branch -M main' -ForegroundColor White
Write-Host '  git push -u origin main' -ForegroundColor White
Write-Host ""

