# 🔧 Configuration des Variables d'Environnement sur Vercel

## ⚠️ Erreur Courante

Si vous voyez cette erreur lors du déploiement :
```
Error: @clerk/clerk-react: Missing publishableKey
```

Cela signifie que les variables d'environnement Clerk ne sont pas configurées dans Vercel.

## ✅ Solution : Configurer les Variables dans Vercel

### Étape 1 : Accéder aux Paramètres du Projet

1. Allez sur [vercel.com](https://vercel.com)
2. Connectez-vous à votre compte
3. Sélectionnez votre projet `agency-dashboard`
4. Cliquez sur **Settings** (Paramètres) dans le menu de navigation
5. Cliquez sur **Environment Variables** dans le menu latéral

### Étape 2 : Ajouter les Variables d'Environnement

Ajoutez **TOUTES** ces variables une par une :

#### 1. Clerk Publishable Key (OBLIGATOIRE)
- **Name:** `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- **Value:** Votre clé publique Clerk (commence par `pk_test_` ou `pk_live_`)
- **Environments:** ✅ Cochez **Production**, **Preview**, et **Development**

#### 2. Clerk Secret Key (OBLIGATOIRE)
- **Name:** `CLERK_SECRET_KEY`
- **Value:** Votre clé secrète Clerk (commence par `sk_test_` ou `sk_live_`)
- **Environments:** ✅ Cochez **Production**, **Preview**, et **Development**

#### 3. Sign In URL
- **Name:** `NEXT_PUBLIC_CLERK_SIGN_IN_URL`
- **Value:** `/sign-in`
- **Environments:** ✅ Cochez **Production**, **Preview**, et **Development**

#### 4. Sign Up URL
- **Name:** `NEXT_PUBLIC_CLERK_SIGN_UP_URL`
- **Value:** `/sign-up`
- **Environments:** ✅ Cochez **Production**, **Preview**, et **Development**

#### 5. Database URL (Optionnel)
- **Name:** `DATABASE_URL`
- **Value:** Votre connection string PostgreSQL (si vous utilisez une base de données)
- **Environments:** ✅ Cochez **Production**, **Preview**, et **Development**

### Étape 3 : Obtenir vos Clés Clerk

Si vous n'avez pas encore vos clés Clerk :

1. Allez sur [Clerk Dashboard](https://dashboard.clerk.com)
2. Connectez-vous ou créez un compte
3. Créez une nouvelle application ou sélectionnez une existante
4. Allez dans **API Keys** dans le menu latéral
5. Copiez :
   - Le **Publishable Key** (commence par `pk_test_...`)
   - Le **Secret Key** (commence par `sk_test_...`)

### Étape 4 : Redéployer

Après avoir ajouté toutes les variables :

1. Allez dans l'onglet **Deployments**
2. Trouvez votre dernier déploiement (celui qui a échoué)
3. Cliquez sur les **3 points (...)** à droite
4. Sélectionnez **Redeploy**
5. Attendez que le build se termine (2-3 minutes)

## ✅ Vérification

Après le redéploiement, votre application devrait fonctionner sans erreur.

Pour vérifier :
- ✅ Le build se termine sans erreur
- ✅ L'application charge correctement
- ✅ La page d'accueil s'affiche
- ✅ Les pages de connexion/inscription fonctionnent

## 🔐 Pour la Production

Une fois que votre application fonctionne en test :

1. Dans Clerk Dashboard, passez aux **clés de production** (commencent par `pk_live_` et `sk_live_`)
2. Remplacez les clés de test dans Vercel par les clés de production
3. Ajoutez votre domaine Vercel dans Clerk Dashboard > Domains
4. Redéployez l'application

## 📝 Notes Importantes

- ⚠️ **Ne commitez JAMAIS** vos clés secrètes dans Git
- ✅ Les variables d'environnement dans Vercel sont sécurisées et chiffrées
- ✅ Cochez **toujours** les 3 environnements (Production, Preview, Development) pour chaque variable
- ✅ Les variables `NEXT_PUBLIC_*` sont accessibles côté client
- ✅ Les variables sans `NEXT_PUBLIC_` sont uniquement côté serveur


