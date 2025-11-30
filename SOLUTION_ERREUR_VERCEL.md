# 🔧 Solution Rapide : Erreur "Missing publishableKey" sur Vercel

## ❌ Erreur que vous voyez

```
Error: @clerk/clerk-react: Missing publishableKey
Export encountered an error on /_not-found/page: /_not-found, exiting the build.
```

## ✅ Solution (5 minutes)

### Étape 1 : Aller dans les Paramètres Vercel

1. Allez sur [vercel.com](https://vercel.com)
2. Connectez-vous
3. Sélectionnez votre projet
4. Cliquez sur **Settings** (Paramètres)
5. Cliquez sur **Environment Variables**

### Étape 2 : Ajouter les Variables OBLIGATOIRES

Ajoutez ces 4 variables (une par une) :

#### Variable 1 : Clerk Publishable Key
- **Name:** `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- **Value:** Votre clé Clerk (commence par `pk_test_...` ou `pk_live_...`)
- **Environments:** ✅ Cochez **Production**, **Preview**, **Development**

#### Variable 2 : Clerk Secret Key
- **Name:** `CLERK_SECRET_KEY`
- **Value:** Votre clé secrète Clerk (commence par `sk_test_...` ou `sk_live_...`)
- **Environments:** ✅ Cochez **Production**, **Preview**, **Development**

#### Variable 3 : Sign In URL
- **Name:** `NEXT_PUBLIC_CLERK_SIGN_IN_URL`
- **Value:** `/sign-in`
- **Environments:** ✅ Cochez **Production**, **Preview**, **Development**

#### Variable 4 : Sign Up URL
- **Name:** `NEXT_PUBLIC_CLERK_SIGN_UP_URL`
- **Value:** `/sign-up`
- **Environments:** ✅ Cochez **Production**, **Preview**, **Development**

### Étape 3 : Obtenir vos Clés Clerk

Si vous n'avez pas vos clés :

1. Allez sur [Clerk Dashboard](https://dashboard.clerk.com)
2. Connectez-vous
3. Sélectionnez votre application (ou créez-en une)
4. Allez dans **API Keys**
5. Copiez :
   - **Publishable Key** (pk_test_...)
   - **Secret Key** (sk_test_...)

### Étape 4 : Redéployer

1. Allez dans **Deployments**
2. Cliquez sur les **3 points (...)** du dernier déploiement
3. Sélectionnez **Redeploy**
4. Attendez 2-3 minutes

## ✅ C'est tout !

Votre application devrait maintenant se déployer sans erreur.

## 📖 Guide Complet

Pour plus de détails, consultez [VERCEL_ENV_SETUP.md](./VERCEL_ENV_SETUP.md)


