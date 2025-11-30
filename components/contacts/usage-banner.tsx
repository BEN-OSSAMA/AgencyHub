"use client"

import { AlertCircle, Zap } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"

interface UsageBannerProps {
  contactsViewed: number
  dailyLimit: number
  hasReachedLimit: boolean
}

export function UsageBanner({ contactsViewed, dailyLimit, hasReachedLimit }: UsageBannerProps) {
  const usagePercentage = Math.min((contactsViewed / dailyLimit) * 100, 100)
  const isNearLimit = usagePercentage >= 80

  if (hasReachedLimit) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Daily Limit Reached</AlertTitle>
        <AlertDescription className="flex items-center justify-between">
          <span>You've viewed {contactsViewed} contacts today. Upgrade to continue browsing.</span>
          <Button size="sm" variant="outline" className="ml-4 bg-transparent">
            <Zap className="mr-2 h-4 w-4" />
            Upgrade Now
          </Button>
        </AlertDescription>
      </Alert>
    )
  }

  if (isNearLimit) {
    return (
      <Alert className="border-amber-500/50 bg-amber-500/10">
        <AlertCircle className="h-4 w-4 text-amber-500" />
        <AlertTitle className="text-amber-500">Approaching Daily Limit</AlertTitle>
        <AlertDescription>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">
              You've viewed {contactsViewed} of {dailyLimit} contacts today.
            </span>
            <span className="text-sm font-medium">{dailyLimit - contactsViewed} remaining</span>
          </div>
          <Progress value={usagePercentage} className="mt-2 h-1.5 [&>div]:bg-amber-500" />
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="flex items-center justify-between rounded-lg border border-border bg-muted/30 px-4 py-3">
      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground">
          Daily views:{" "}
          <span className="font-medium text-foreground">
            {contactsViewed}/{dailyLimit}
          </span>
        </span>
        <Progress value={usagePercentage} className="h-1.5 w-32" />
      </div>
      <span className="text-sm text-muted-foreground">{dailyLimit - contactsViewed} views remaining today</span>
    </div>
  )
}
