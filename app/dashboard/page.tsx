import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, Users, Eye, TrendingUp } from "lucide-react"
import { getAgencies, getContacts } from "@/lib/data"
import { getUsageStats } from "@/lib/usage"
import { DAILY_CONTACT_LIMIT } from "@/lib/types"
import { UsageChart } from "@/components/dashboard/usage-chart"

export default async function DashboardPage() {
  const { userId } = await auth()

  if (!userId) {
    redirect("/sign-in")
  }

  const agencies = getAgencies()
  const contacts = getContacts()

  let usageStats = { today: 0, thisWeek: 0, thisMonth: 0 }
  try {
    usageStats = await getUsageStats(userId)
  } catch (error) {
    // Database might not be set up yet
    console.log("Usage stats not available yet")
  }

  const stats = [
    {
      title: "Total Agencies",
      value: agencies.length,
      description: "Registered locations",
      icon: Building2,
      gradient: "from-blue-500/10 to-blue-600/10",
      iconColor: "text-blue-600 dark:text-blue-400",
      borderColor: "border-blue-200 dark:border-blue-800",
    },
    {
      title: "Total Contacts",
      value: contacts.length,
      description: "In your network",
      icon: Users,
      gradient: "from-purple-500/10 to-purple-600/10",
      iconColor: "text-purple-600 dark:text-purple-400",
      borderColor: "border-purple-200 dark:border-purple-800",
    },
    {
      title: "Views Today",
      value: usageStats.today,
      description: `of ${DAILY_CONTACT_LIMIT} daily limit`,
      icon: Eye,
      gradient: "from-green-500/10 to-green-600/10",
      iconColor: "text-green-600 dark:text-green-400",
      borderColor: "border-green-200 dark:border-green-800",
    },
    {
      title: "Views This Month",
      value: usageStats.thisMonth,
      description: "Total contact views",
      icon: TrendingUp,
      gradient: "from-orange-500/10 to-orange-600/10",
      iconColor: "text-orange-600 dark:text-orange-400",
      borderColor: "border-orange-200 dark:border-orange-800",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Dashboard
        </h1>
        <p className="text-muted-foreground mt-1">Welcome back! Here's an overview of your agency network.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className={`border-2 ${stat.borderColor} bg-gradient-to-br ${stat.gradient} transition-all hover:shadow-lg hover:scale-[1.02]`}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.iconColor}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-2 border-primary/20 bg-gradient-to-br from-card to-card/50 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent border-b">
            <CardTitle className="text-xl">Daily Usage</CardTitle>
            <CardDescription>Your contact viewing activity this week</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <UsageChart
              todayViews={usageStats.today}
              weekViews={usageStats.thisWeek}
              dailyLimit={DAILY_CONTACT_LIMIT}
            />
          </CardContent>
        </Card>

        <Card className="border-2 border-primary/20 bg-gradient-to-br from-card to-card/50 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent border-b">
            <CardTitle className="text-xl">Quick Stats</CardTitle>
            <CardDescription>Key metrics at a glance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <div className="flex items-center justify-between p-3 rounded-lg bg-accent/50">
              <span className="text-sm font-medium">Remaining views today</span>
              <span className="font-bold text-lg text-primary">{Math.max(0, DAILY_CONTACT_LIMIT - usageStats.today)}</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-accent/50">
              <span className="text-sm font-medium">Average contacts/agency</span>
              <span className="font-bold text-lg text-primary">{(contacts.length / agencies.length).toFixed(1)}</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-accent/50">
              <span className="text-sm font-medium">Daily limit</span>
              <span className="font-bold text-lg text-primary">{DAILY_CONTACT_LIMIT}</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-accent/50">
              <span className="text-sm font-medium">Views this week</span>
              <span className="font-bold text-lg text-primary">{usageStats.thisWeek}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
