# 🚀 Agency Dashboard

A modern, interactive Next.js 16 dashboard application with Clerk authentication, PostgreSQL database integration, and a stunning 3D UI for managing agencies and contacts.

![Next.js](https://img.shields.io/badge/Next.js-16.0.3-black?style=flat&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.0-blue?style=flat&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.9-38bdf8?style=flat&logo=tailwind-css)

## 🌐 Live Demo

**🔗 Application Live:** [https://your-app.vercel.app](https://your-app.vercel.app)  
*(Remplacez par votre URL Vercel après déploiement)*

### 🧪 Compte de Test / Demo

Pour tester l'application, créez un compte en utilisant le formulaire d'inscription sur la page d'accueil, ou utilisez ces identifiants de test :

- **Email:** `demo@agencyhub.com`
- **Mot de passe:** `Demo@2024`
- *(Ces identifiants doivent être créés dans votre instance Clerk - voir [DEMO_ACCOUNT.md](./DEMO_ACCOUNT.md))*

## ✨ Features

- 🔐 **Authentication** - Secure user authentication with Clerk
- 🏢 **Agency Management** - View and manage all agencies in a beautiful table
- 👥 **Contact Directory** - Access contact database with smart search and pagination
- 📊 **Usage Analytics** - Track daily usage with visual charts and statistics
- 🎯 **Daily Limits** - Smart limit system (50 contacts/day) with upgrade prompts
- 🎨 **3D Interactive UI** - Modern 3D effects and animations on homepage
- 🌓 **Dark Mode** - Full dark/light theme support with system preference
- 📱 **Responsive Design** - Perfect experience on all devices
- 🔍 **Advanced Search** - Powerful search functionality across all data

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Authentication:** Clerk
- **Database:** PostgreSQL (Neon)
- **Styling:** Tailwind CSS v4 + shadcn/ui
- **Deployment:** Vercel
- **Language:** TypeScript

## 📋 Requirements Checklist

✅ Users must authenticate to access the dashboard  
✅ Authenticated users can view all agencies  
✅ Users limited to 50 contacts per day  
✅ Upgrade prompt when daily limit exceeded  
✅ Agencies and contacts in separate table pages  
✅ Next.js 16 framework  
✅ Clerk authentication  
✅ System design diagram included  

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- A Clerk account ([Sign up here](https://clerk.com))
- A Neon database account ([Get started here](https://neon.tech)) or other PostgreSQL provider
- Git installed

### Local Development

1. **Clone the repository:**
   \`\`\`bash
   git clone https://github.com/YOUR_USERNAME/agency-dashboard.git
   cd agency-dashboard
   \`\`\`

2. **Install dependencies:**
   \`\`\`bash
   npm install
   # or
   pnpm install
   \`\`\`

3. **Set up environment variables:**
   
   Create a \`.env.local\` file in the root directory:
   
   \`\`\`env
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
   CLERK_SECRET_KEY=sk_test_your_secret_key_here
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

   # Database (Neon PostgreSQL)
   DATABASE_URL=postgresql://user:password@host:5432/database?sslmode=require
   \`\`\`

4. **Set up the database:**
   
   Run the SQL script to create the required tables:
   
   \`\`\`bash
   # Connect to your PostgreSQL database and run:
   psql -d your_database -f scripts/001-create-tables.sql
   \`\`\`
   
   Or use the Neon SQL Editor to run the script from \`scripts/001-create-tables.sql\`

5. **Run the development server:**
   \`\`\`bash
   npm run dev
   # or
   pnpm dev
   \`\`\`

6. **Open your browser:**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📦 Deployment

### Deploy to Vercel

1. **Push to GitHub:**
   \`\`\`bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/agency-dashboard.git
   git push -u origin main
   \`\`\`

2. **Import to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Configure environment variables (see below)
   - Deploy!

3. **Environment Variables in Vercel:**
   
   ⚠️ **IMPORTANT:** You MUST configure these variables BEFORE deploying, otherwise you'll get a build error.
   
   📖 **See detailed guide:** [VERCEL_ENV_SETUP.md](./VERCEL_ENV_SETUP.md)
   
   Add these in your Vercel project settings (Settings > Environment Variables):
   
   - \`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY\` (REQUIRED - get from [Clerk Dashboard](https://dashboard.clerk.com))
   - \`CLERK_SECRET_KEY\` (REQUIRED - get from [Clerk Dashboard](https://dashboard.clerk.com))
   - \`NEXT_PUBLIC_CLERK_SIGN_IN_URL\` = \`/sign-in\`
   - \`NEXT_PUBLIC_CLERK_SIGN_UP_URL\` = \`/sign-up\`
   - \`DATABASE_URL\` (optional - your PostgreSQL connection string)
   
   ✅ **Check all environments** (Production, Preview, Development) for each variable!

4. **Configure Clerk for Production:**
   - Add your Vercel domain to Clerk dashboard
   - Update allowed origins in Clerk settings
   - Enable production keys

### Alternative: Deploy to Other Platforms

The application can also be deployed to:
- **Netlify** - Similar process to Vercel
- **Railway** - Supports PostgreSQL natively
- **Render** - Full-stack deployment support
- **AWS Amplify** - Enterprise deployment option

## 🔧 Configuration

### Clerk Setup

1. Create a new application in [Clerk Dashboard](https://dashboard.clerk.com)
2. Copy your Publishable Key and Secret Key
3. Configure sign-in/sign-up URLs:
   - Sign-in URL: \`/sign-in\`
   - Sign-up URL: \`/sign-up\`
4. Add your domain to allowed origins (for production)

### Database Setup

1. Create a PostgreSQL database (recommended: [Neon.tech](https://neon.tech))
2. Run the SQL script from \`scripts/001-create-tables.sql\`
3. Copy your connection string to \`DATABASE_URL\`

**Database Schema:**
\`\`\`sql
CREATE TABLE IF NOT EXISTS user_daily_usage (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  usage_date DATE NOT NULL DEFAULT CURRENT_DATE,
  contacts_viewed INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, usage_date)
);
\`\`\`

## 📁 Project Structure

\`\`\`
agency-dashboard/
├── app/
│   ├── api/                    # API Routes
│   │   ├── agencies/          # Agencies endpoint
│   │   ├── contacts/          # Contacts endpoint
│   │   └── usage/             # Usage tracking endpoint
│   ├── dashboard/             # Dashboard pages
│   │   ├── agencies/          # Agencies page
│   │   ├── contacts/          # Contacts page
│   │   ├── profile/           # User profile page
│   │   ├── layout.tsx         # Dashboard layout
│   │   └── page.tsx           # Dashboard home
│   ├── sign-in/               # Clerk sign-in
│   ├── sign-up/               # Clerk sign-up
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Landing page (3D UI)
├── components/
│   ├── agencies/              # Agency components
│   ├── contacts/              # Contact components
│   ├── dashboard/             # Dashboard components
│   ├── home/                  # Homepage components (3D)
│   └── ui/                    # shadcn/ui components
├── data/
│   ├── agencies.json          # Static agency data
│   └── contacts.json          # Static contact data
├── lib/
│   ├── data.ts                # Data access functions
│   ├── db.ts                  # Database connection
│   ├── types.ts               # TypeScript types
│   ├── usage.ts               # Usage tracking logic
│   └── utils.ts               # Utility functions
├── scripts/
│   └── 001-create-tables.sql  # Database schema
├── middleware.ts              # Clerk auth middleware
└── package.json
\`\`\`

## 🎯 Features Explained

### Authentication Flow

1. User visits the application
2. If not authenticated, redirected to `/sign-in`
3. After authentication, redirected to `/dashboard`
4. All dashboard routes are protected by middleware

### Daily Limit System

1. Each user starts with 50 contact views per day
2. Views are tracked in the `user_daily_usage` table
3. When viewing contacts page, usage is incremented
4. When limit is reached:
   - Modal appears with upgrade option
   - Contacts table becomes blurred
   - Pagination is disabled
5. Usage resets at midnight (server time)

### 3D Interactive Homepage

- Beautiful 3D card effects that follow mouse movement
- Gradient animations and particle effects
- Glassmorphism design with backdrop blur
- Smooth transitions and hover effects

## 🔌 API Endpoints

| Endpoint | Method | Description | Auth Required |
|----------|--------|-------------|---------------|
| `/api/agencies` | GET | Get all agencies | No |
| `/api/contacts` | GET | Get paginated contacts | Yes |
| `/api/usage` | GET | Get user usage stats | Yes |
| `/api/usage` | POST | Increment contact views | Yes |

## 🎨 UI/UX Features

- **3D Interactive Cards** - Homepage cards rotate with mouse movement
- **Gradient Animations** - Smooth color transitions
- **Glassmorphism** - Modern blur effects
- **Dark Mode** - Full theme support
- **Responsive Design** - Mobile-first approach
- **Smooth Animations** - CSS transitions and transforms

## 🧪 Testing

### Demo Account Setup

To create a demo account for testing:

1. Go to your Clerk Dashboard
2. Navigate to Users section
3. Create a new test user with:
   - Email: `demo@agencyhub.com`
   - Password: `Demo@2024`
4. Or use the sign-up page to create one

### Test Scenarios

1. **Authentication Test:**
   - Try accessing `/dashboard` without login
   - Should redirect to `/sign-in`
   - After login, should access dashboard

2. **Usage Limit Test:**
   - View contacts repeatedly
   - After 50 views, should see upgrade modal
   - Table should become blurred

3. **Navigation Test:**
   - Navigate between Dashboard, Agencies, Contacts
   - Test search functionality
   - Test pagination

## 📊 System Design

\`\`\`mermaid
flowchart TD
    User[User] --> ClerkAuth[Clerk Authentication]
    ClerkAuth --> |Authenticated| Dashboard[Dashboard]
    ClerkAuth --> |Not Authenticated| SignIn[Sign In Page]
    
    Dashboard --> Agencies[Agencies Page]
    Dashboard --> Contacts[Contacts Page]
    Dashboard --> Stats[Usage Stats]
    Dashboard --> Profile[User Profile]
    
    Contacts --> DailyLimitCheck{Daily Limit Check}
    DailyLimitCheck --> |Under Limit| ContactsTable[View Contacts]
    DailyLimitCheck --> |Over Limit| LimitModal[Upgrade Modal]
    
    ContactsTable --> TrackUsage[Track Usage]
    TrackUsage --> DB[(PostgreSQL DB)]
    
    Stats --> DB
    Profile --> Clerk[Clerk User Profile]
    
    subgraph Database
        DB --> UsageTable[user_daily_usage]
    end
    
    subgraph Static Data
        Agencies --> AgenciesJSON[agencies.json]
        ContactsTable --> ContactsJSON[contacts.json]
    end
\`\`\`

## 🐛 Troubleshooting

### Database Connection Issues

- Verify `DATABASE_URL` is set correctly
- Check database credentials
- Ensure database is accessible from your IP
- For Neon, check connection pooling settings

### Clerk Authentication Issues

- Verify keys match your Clerk instance
- Check allowed origins in Clerk dashboard
- Ensure URLs are correctly configured
- Clear browser cache and cookies

### Build Errors

- Run `npm install` to ensure dependencies are installed
- Check Node.js version (should be 18+)
- Clear `.next` folder and rebuild

## 📝 License

MIT License - feel free to use this project for your portfolio or learning purposes.

## 👨‍💻 Author

**Oussama Ben Kacem**

- GitHub: [@yourusername](https://github.com/BEN-OSSAMA)
- LinkedIn: [Your LinkedIn](https://www.linkedin.com/in/oussama-ben-kacem/)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org) - The React Framework
- [Clerk](https://clerk.com) - Authentication made easy
- [shadcn/ui](https://ui.shadcn.com) - Beautiful UI components
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS
- [Neon](https://neon.tech) - Serverless PostgreSQL

## 📄 Additional Documentation

- [DEPLOYMENT.md](./DEPLOYMENT.md) - Detailed deployment guide
- [REQUIREMENTS_CHECKLIST.md](./REQUIREMENTS_CHECKLIST.md) - Requirements verification

---

**⭐ Star this repo if you found it helpful!**
