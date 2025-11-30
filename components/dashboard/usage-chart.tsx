"use client"

import { Progress } from "@/components/ui/progress"

interface UsageChartProps {
  todayViews: number
  weekViews: number
  dailyLimit: number
}

export function UsageChart({ todayViews, weekViews, dailyLimit }: UsageChartProps) {
  const usagePercentage = Math.min((todayViews / dailyLimit) * 100, 100)
  const isNearLimit = usagePercentage >= 80
  const isAtLimit = usagePercentage >= 100

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Today's Usage</span>
          <span className={`font-medium ${isAtLimit ? "text-destructive" : isNearLimit ? "text-amber-500" : ""}`}>
            {todayViews} / {dailyLimit}
          </span>
        </div>
        <Progress
          value={usagePercentage}
          className={`h-2 ${isAtLimit ? "[&>div]:bg-destructive" : isNearLimit ? "[&>div]:bg-amber-500" : ""}`}
        />
        {isAtLimit && (
          <p className="text-xs text-destructive">You've reached your daily limit. Upgrade for unlimited access.</p>
        )}
        {isNearLimit && !isAtLimit && <p className="text-xs text-amber-500">You're approaching your daily limit.</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-lg border border-border p-3">
          <p className="text-xs text-muted-foreground">Week Total</p>
          <p className="text-xl font-semibold">{weekViews}</p>
        </div>
        <div className="rounded-lg border border-border p-3">
          <p className="text-xs text-muted-foreground">Remaining</p>
          <p className="text-xl font-semibold">{Math.max(0, dailyLimit - todayViews)}</p>
        </div>
      </div>
    </div>
  )
}
