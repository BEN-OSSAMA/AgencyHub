# 🚀 Agency Dashboard

A modern Next.js 16 dashboard application with Clerk authentication and PostgreSQL database integration for managing agencies and contacts with daily usage limits.

![Next.js](https://img.shields.io/badge/Next.js-16.0.3-black?style=flat&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.0-blue?style=flat&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.9-38bdf8?style=flat&logo=tailwind-css)

## 🌐 Live Demo

**🔗 Application Live:** [https://agency-hub01.vercel.app](https://agency-hub01.vercel.app)

### 🧪 Test Account

Create your own account using the sign-up page, or use these test credentials:

- **Email:** `demo@agencyhub.com`
- **Password:** `Demo@2024`

> **Note:** If test credentials don't work, please create a new account via the sign-up page.

## ✨ Core Features

### Required Functionality ✅

- 🔐 **User Authentication** - Secure authentication with Clerk (required to access dashboard)
- 🏢 **View All Agencies** - Access complete database of agencies in a dedicated table page
- 👥 **View Contacts** - Browse contacts database with pagination in a separate table page
- 🎯 **Daily Limit System** - Users limited to 50 contact views per day
- 💳 **Upgrade Prompt** - Modal appears when daily limit is exceeded (no payment integration)
- 📊 **Usage Tracking** - Monitor daily contact views with PostgreSQL database

### Additional Features

- 🌓 **Dark Mode** - Theme toggle with system preference detection
- 📱 **Responsive Design** - Optimized for all screen sizes
- 🔍 **Search & Filter** - Advanced search across agencies and contacts
- 📈 **Usage Analytics** - Visual charts showing your daily usage patterns

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | Next.js 16 (App Router) |
| **Authentication** | Clerk |
| **Database** | PostgreSQL (Neon) |
| **Styling** | Tailwind CSS v4 + shadcn/ui |
| **Deployment** | Vercel |
| **Language** | TypeScript |
| **Version Control** | GitHub |

## 📋 Requirements Verification

| Requirement | Status | Implementation |
|------------|--------|----------------|
| User authentication required | ✅ | Clerk authentication with middleware protection |
| View all agencies | ✅ | `/dashboard/agencies` page with full database table |
| 50 contacts/day limit | ✅ | PostgreSQL tracking with daily reset |
| Upgrade prompt on limit | ✅ | Modal with blur effect (no payment) |
| Separate table pages | ✅ | `/agencies` and `/contacts` routes |
| Next.js 16 | ✅ | Using App Router and React 19 |
| Clerk authentication | ✅ | Full integration with protected routes |
| Vercel deployment | ✅ | Optimized for Vercel platform |
| GitHub repository | ✅ | Version controlled with Git |
| System design diagram | ✅ | See diagram section below |

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- [Clerk account](https://clerk.com) (free tier available)
- [Neon database](https://neon.tech) or any PostgreSQL provider
- Git for version control

### Installation Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/BEN-OSSAMA/AgencyHub.git
   cd AgencyHub
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   
   Create `.env.local` in the root directory:
   
   ```env
   # Clerk Authentication Keys
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
   CLERK_SECRET_KEY=sk_test_your_secret_key_here
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

   # PostgreSQL Database Connection
   DATABASE_URL=postgresql://user:password@host:5432/database?sslmode=require
   ```

4. **Set up the database:**
   
   Run the SQL initialization script:
   
   ```bash
   # Using psql
   psql -d your_database -f scripts/001-create-tables.sql
   
   # Or use Neon SQL Editor to run the script
   ```

5. **Start development server:**
   ```bash
   npm run dev
   ```

6. **Access the application:**
   
   Open [http://localhost:3000](http://localhost:3000) in your browser

## 📦 Deployment to Vercel

### Step-by-Step Guide

1. **Push code to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/BEN-OSSAMA/AgencyHub.git
   git push -u origin main
   ```

2. **Import to Vercel:**
   - Visit [vercel.com](https://vercel.com) and sign in
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js configuration

3. **Configure Environment Variables:**
   
   ⚠️ **CRITICAL:** Set these in Vercel Project Settings → Environment Variables
   
   | Variable | Value | Required |
   |----------|-------|----------|
   | `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | From Clerk Dashboard | ✅ Yes |
   | `CLERK_SECRET_KEY` | From Clerk Dashboard | ✅ Yes |
   | `NEXT_PUBLIC_CLERK_SIGN_IN_URL` | `/sign-in` | ✅ Yes |
   | `NEXT_PUBLIC_CLERK_SIGN_UP_URL` | `/sign-up` | ✅ Yes |
   | `DATABASE_URL` | Your PostgreSQL connection string | ✅ Yes |
   
   Enable for: **Production, Preview, and Development**

4. **Deploy:**
   - Click "Deploy"
   - Wait for build to complete (~2-3 minutes)
   - Your app will be live at `your-app.vercel.app`

5. **Update Clerk Settings:**
   - Add your Vercel domain to Clerk Dashboard → Settings → Domains
   - Update allowed origins to include your production URL

## 📊 System Design Diagram

```mermaid
flowchart TD
    Start([User Opens App]) --> Auth{Authenticated?}
    
    Auth -->|No| SignIn[Sign In Page]
    Auth -->|Yes| Dashboard[Dashboard Home]
    
    SignIn --> Clerk[Clerk Authentication]
    Clerk --> Dashboard
    
    Dashboard --> NavChoice{User Navigation}
    
    NavChoice --> Agencies[Agencies Page]
    NavChoice --> Contacts[Contacts Page]
    
    Agencies --> AgenciesAPI[/api/agencies]
    AgenciesAPI --> AgenciesJSON[(agencies.json)]
    AgenciesJSON --> AgenciesTable[Display All Agencies Table]
    
    Contacts --> CheckLimit{Check Daily Limit}
    
    CheckLimit --> GetUsage[/api/usage GET]
    GetUsage --> DB[(PostgreSQL Database)]
    DB --> UsageData[user_daily_usage table]
    
    UsageData --> LimitCheck{Views < 50?}
    
    LimitCheck -->|Yes| ContactsAPI[/api/contacts]
    LimitCheck -->|No| UpgradeModal[Upgrade Modal + Blur]
    
    ContactsAPI --> ContactsJSON[(contacts.json)]
    ContactsJSON --> ContactsTable[Display Contacts Table]
    
    ContactsTable --> IncrementUsage[/api/usage POST]
    IncrementUsage --> DB
    
    UpgradeModal --> End([User Sees Upgrade Prompt])
    AgenciesTable --> End
    ContactsTable --> End
    
    style Start fill:#4ade80
    style End fill:#f87171
    style Dashboard fill:#60a5fa
    style Clerk fill:#fbbf24
    style DB fill:#a78bfa
    style UpgradeModal fill:#fb923c
```

### System Flow Explanation

1. **Authentication Layer**: Users must authenticate via Clerk before accessing any dashboard features
2. **Dashboard Router**: After authentication, users can navigate to Agencies or Contacts pages
3. **Agencies Flow**: Direct access to view all agencies in table format (no limits)
4. **Contacts Flow**: 
   - System checks daily usage from PostgreSQL
   - If under 50 views: display contacts and increment counter
   - If 50+ views: show upgrade modal with blurred content
5. **Database**: PostgreSQL stores daily usage per user with automatic date tracking

## 📁 Project Structure

```
AgencyHub/
├── app/
│   ├── api/                      # API Routes
│   │   ├── agencies/
│   │   │   └── route.ts          # GET all agencies
│   │   ├── contacts/
│   │   │   └── route.ts          # GET paginated contacts
│   │   └── usage/
│   │       └── route.ts          # GET/POST usage tracking
│   ├── dashboard/                # Protected dashboard pages
│   │   ├── agencies/
│   │   │   └── page.tsx          # All agencies table
│   │   ├── contacts/
│   │   │   └── page.tsx          # Contacts table with limit
│   │   ├── layout.tsx            # Dashboard layout
│   │   └── page.tsx              # Dashboard home
│   ├── sign-in/[[...sign-in]]/
│   │   └── page.tsx              # Clerk sign-in
│   ├── sign-up/[[...sign-up]]/
│   │   └── page.tsx              # Clerk sign-up
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Landing page
├── components/
│   ├── agencies/
│   │   └── agencies-table.tsx    # Agencies table component
│   ├── contacts/
│   │   ├── contacts-table.tsx    # Contacts table component
│   │   ├── limit-reached-modal.tsx # Limit exceeded modal
│   │   └── usage-banner.tsx      # Usage indicator banner
│   ├── dashboard/
│   │   └── usage-chart.tsx       # Usage analytics chart
│   └── ui/                       # shadcn/ui components
├── data/
│   ├── agencies.json             # Static agencies data
│   └── contacts.json             # Static contacts data
├── lib/
│   ├── db.ts                     # PostgreSQL connection
│   ├── types.ts                  # TypeScript interfaces
│   ├── usage.ts                  # Usage tracking logic
│   └── utils.ts                  # Utility functions
├── scripts/
│   └── 001-create-tables.sql     # Database schema
├── middleware.ts                 # Clerk auth middleware
└── package.json
```

## 🔌 API Endpoints

| Endpoint | Method | Description | Auth | Purpose |
|----------|--------|-------------|------|---------|
| `/api/agencies` | GET | Retrieve all agencies | No | Agencies page data |
| `/api/contacts` | GET | Get paginated contacts | Yes | Contacts page data |
| `/api/usage` | GET | Get user's daily usage | Yes | Check limit status |
| `/api/usage` | POST | Increment contact views | Yes | Track usage |

## 🎯 Key Features Implementation

### 1. Authentication Protection

```typescript
// middleware.ts
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isPublicRoute = createRouteMatcher(['/', '/sign-in(.*)', '/sign-up(.*)'])

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect()
  }
})
```

All `/dashboard/*` routes require authentication via Clerk.

### 2. Daily Limit System

**Database Schema:**
```sql
CREATE TABLE user_daily_usage (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  usage_date DATE NOT NULL DEFAULT CURRENT_DATE,
  contacts_viewed INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, usage_date)
);
```

**Logic Flow:**
1. User visits contacts page
2. System queries `user_daily_usage` for today's count
3. If count < 50: display contacts and increment
4. If count ≥ 50: show upgrade modal with blurred table

### 3. Upgrade Modal (No Payment)

When limit is reached:
- Modal overlay appears
- Contact table becomes blurred
- "Upgrade Now" button (UI only, no payment)
- User cannot interact with contacts until next day

### 4. Usage Analytics Chart

The dashboard includes a visual usage chart that displays:
- Today's usage progress (with progress bar)
- Weekly total views
- Remaining views for the day
- Visual indicators when approaching or reaching the limit

![Usage Chart](images/chart.png)

The chart provides real-time feedback on your daily contact viewing activity, helping you manage your usage effectively.

## 🧪 Testing the Application

### Test Scenario 1: Authentication Flow
1. Navigate to `/dashboard` without logging in
2. Should redirect to `/sign-in`
3. After authentication, should access dashboard

### Test Scenario 2: View Agencies
1. Log in to dashboard
2. Navigate to "Agencies" page
3. Should see complete table of all agencies
4. No limits applied

### Test Scenario 3: Daily Limit
1. Log in to dashboard
2. Navigate to "Contacts" page
3. View contacts repeatedly (each page view counts)
4. After 50 views, upgrade modal should appear
5. Table should be blurred and non-interactive
6. Next day (or manual DB reset), limit resets

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
- Ensure all environment variables are set

## 👨‍💻 Author

**Oussama Ben Kacem**

- GitHub: [@BEN-OSSAMA](https://github.com/BEN-OSSAMA)
- LinkedIn: [Oussama Ben Kacem](https://www.linkedin.com/in/oussama-ben-kacem/)
- Live Demo: [https://agency-hub01.vercel.app](https://agency-hub01.vercel.app)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org) - The React Framework for Production
- [Clerk](https://clerk.com) - User Authentication & Management
- [shadcn/ui](https://ui.shadcn.com) - Beautifully Designed Components
- [Tailwind CSS](https://tailwindcss.com) - Utility-First CSS Framework
- [Neon](https://neon.tech) - Serverless PostgreSQL Database
- [Vercel](https://vercel.com) - Deployment Platform

---

**⭐ If you found this project helpful, please give it a star on GitHub!**

**🔗 Live Application:** [https://agency-hub01.vercel.app](https://agency-hub01.vercel.app)
