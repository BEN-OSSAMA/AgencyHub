"use client"

import { Database, Lock, TrendingUp, Globe } from "lucide-react"
import { LucideIcon } from "lucide-react"

const iconMap: Record<string, LucideIcon> = {
  Database,
  Lock,
  TrendingUp,
  Globe,
}

interface Feature {
  iconName: string
  text: string
}

interface FeaturePillsProps {
  features: Feature[]
}

export function FeaturePills({ features }: FeaturePillsProps) {
  return (
    <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
      {features.map((feature, index) => {
        const Icon = iconMap[feature.iconName] || Database
        return (
          <div
            key={index}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-300 hover:scale-105"
          >
            <Icon className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">{feature.text}</span>
          </div>
        )
      })}
    </div>
  )
}

