import Link from "next/link"
import { redirect } from "next/navigation"
import { auth } from "@clerk/nextjs/server"
import { Button } from "@/components/ui/button"
import { Building2, ArrowRight, Zap } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { ServicesGrid } from "@/components/home/services-grid"
import { FeaturePills } from "@/components/home/feature-pills"

export default async function HomePage() {
  const { userId } = await auth()

  if (userId) {
    redirect("/dashboard")
  }

  const services = [
    {
      iconName: "Building2",
      title: "Agency Management",
      description: "View and manage all your agency locations in one centralized dashboard with advanced search and filtering.",
      gradient: "from-blue-500/20 to-cyan-500/20",
      iconGradient: "from-blue-500 to-cyan-500",
      borderGradient: "from-blue-500/50 to-cyan-500/50",
    },
    {
      iconName: "Users",
      title: "Contact Directory",
      description: "Access your complete contact database with smart search, pagination, and detailed information at your fingertips.",
      gradient: "from-purple-500/20 to-pink-500/20",
      iconGradient: "from-purple-500 to-pink-500",
      borderGradient: "from-purple-500/50 to-pink-500/50",
    },
    {
      iconName: "Shield",
      title: "Secure Access",
      description: "Enterprise-grade authentication keeps your data safe and secure with industry-standard encryption.",
      gradient: "from-green-500/20 to-emerald-500/20",
      iconGradient: "from-green-500 to-emerald-500",
      borderGradient: "from-green-500/50 to-emerald-500/50",
    },
    {
      iconName: "BarChart3",
      title: "Usage Analytics",
      description: "Track your daily usage with detailed statistics and visual charts to monitor your activity.",
      gradient: "from-orange-500/20 to-red-500/20",
      iconGradient: "from-orange-500 to-red-500",
      borderGradient: "from-orange-500/50 to-red-500/50",
    },
    {
      iconName: "Search",
      title: "Smart Search",
      description: "Find agencies and contacts instantly with powerful search functionality across all fields.",
      gradient: "from-indigo-500/20 to-blue-500/20",
      iconGradient: "from-indigo-500 to-blue-500",
      borderGradient: "from-indigo-500/50 to-blue-500/50",
    },
    {
      iconName: "Zap",
      title: "Daily Limits",
      description: "Smart daily limits help you manage usage efficiently with upgrade options for unlimited access.",
      gradient: "from-yellow-500/20 to-amber-500/20",
      iconGradient: "from-yellow-500 to-amber-500",
      borderGradient: "from-yellow-500/50 to-amber-500/50",
    },
  ]

  const features = [
    { iconName: "Database", text: "PostgreSQL Database" },
    { iconName: "Lock", text: "Secure Authentication" },
    { iconName: "TrendingUp", text: "Usage Tracking" },
    { iconName: "Globe", text: "Cloud Deployed" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 overflow-hidden relative">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1000ms' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2000ms' }} />
      </div>

      {/* Header */}
      <header className="relative z-50 border-b border-border/50 backdrop-blur-sm bg-background/80">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Building2 className="h-6 w-6 text-primary" />
              <div className="absolute inset-0 h-6 w-6 text-primary blur-md opacity-50" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              AgencyHub
            </span>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link href="/sign-in">
              <Button variant="ghost" className="hover:bg-accent/50">Sign In</Button>
            </Link>
            <Link href="/sign-up">
              <Button className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg shadow-primary/25">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 container mx-auto px-4 py-16 sm:py-24">
        {/* Hero Content */}
        <div className="mx-auto max-w-4xl text-center mb-24">
          <h1 className="text-balance text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6">
            <span className="bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent animate-gradient">
              Manage Your Agencies
            </span>
            <br />
            <span className="bg-gradient-to-r from-primary via-purple-500 to-primary bg-clip-text text-transparent">
              & Contacts
            </span>
          </h1>
          
          <p className="mt-6 text-pretty text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            A powerful dashboard to organize and access your agency network and contact database. 
            Track usage, manage relationships, and stay organized with our modern 3D interface.
          </p>
          
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/sign-up" className="group">
              <Button 
                size="lg" 
                className="gap-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 transition-all duration-300 hover:scale-105 hover:-translate-y-1"
              >
                Start Free Trial 
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/sign-in">
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 hover:bg-accent/50 hover:border-primary/50 transition-all duration-300 hover:scale-105"
              >
                Sign In
              </Button>
            </Link>
          </div>

          {/* Feature Pills */}
          <FeaturePills features={features} />
        </div>

        {/* Services Grid with 3D Effect */}
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Powerful Features
            </h2>
            <p className="text-muted-foreground text-lg">
              Everything you need to manage your agency network
            </p>
          </div>

          <ServicesGrid services={services} />
        </div>

        {/* CTA Section */}
        <div className="mt-24 mx-auto max-w-4xl text-center">
          <div className="relative rounded-3xl border-2 border-primary/20 bg-gradient-to-br from-primary/10 via-card/50 to-primary/5 backdrop-blur-xl p-12 overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 animate-shimmer" />
            
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of agencies managing their networks efficiently with AgencyHub
              </p>
              <Link href="/sign-up">
                <Button 
                  size="lg" 
                  className="gap-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 transition-all duration-300 hover:scale-110 hover:-translate-y-1 text-lg px-8 py-6"
                >
                  Start Your Free Trial Now
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/50 backdrop-blur-sm bg-background/80 mt-24">
        <div className="container mx-auto px-4 py-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} AgencyHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
