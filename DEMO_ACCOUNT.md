# 🧪 Compte de Test / Demo

## Informations du Compte Demo

Pour tester l'application, vous pouvez utiliser un compte de démonstration.

### Option 1: Créer un Compte via l'Application

1. Allez sur la page d'accueil
2. Cliquez sur "Sign Up" ou "Get Started"
3. Créez un compte avec :
   - Email: `demo@agencyhub.com`
   - Password: `Demo@2024`
   - (Ou utilisez votre propre email)

### Option 2: Créer via Clerk Dashboard

1. Connectez-vous à [Clerk Dashboard](https://dashboard.clerk.com)
2. Allez dans "Users" > "Create User"
3. Remplissez :
   - Email: `demo@agencyhub.com`
   - Password: `Demo@2024`
   - Email verified: ✅ (cocher)
4. Cliquez sur "Create"

### Option 3: Comptes de Test Pré-configurés

Si vous avez configuré des comptes de test dans Clerk, vous pouvez les utiliser :

**Compte Admin:**
- Email: `admin@agencyhub.com`
- Password: `Admin@2024`

**Compte Utilisateur:**
- Email: `user@agencyhub.com`
- Password: `User@2024`

## 🔐 Connexion

1. Allez sur `/sign-in`
2. Entrez votre email et mot de passe
3. Cliquez sur "Sign In"
4. Vous serez redirigé vers `/dashboard`

## 📝 Notes Importantes

- Les comptes de test doivent être créés dans votre instance Clerk
- Le mot de passe doit respecter les règles de sécurité de Clerk
- Pour la production, utilisez des comptes réels avec emails vérifiés

## 🧪 Scénarios de Test

### Test 1: Navigation
- ✅ Se connecter
- ✅ Accéder au Dashboard
- ✅ Naviguer vers Agencies
- ✅ Naviguer vers Contacts
- ✅ Accéder au Profil

### Test 2: Limite Quotidienne
- ✅ Visualiser des contacts (jusqu'à 50/jour)
- ✅ Vérifier le compteur d'utilisation
- ✅ Voir la modal d'upgrade quand la limite est atteinte

### Test 3: Recherche
- ✅ Rechercher des agencies
- ✅ Rechercher des contacts
- ✅ Vérifier que les filtres fonctionnent

---

**💡 Astuce:** Pour réinitialiser la limite quotidienne, attendez minuit (server time) ou créez un nouveau compte de test.

