"use client"

import { Building2, Users, Shield, BarChart3, Search, Zap } from "lucide-react"
import { LucideIcon } from "lucide-react"
import { ServiceCard3D } from "./service-card-3d"

const iconMap: Record<string, LucideIcon> = {
  Building2,
  Users,
  Shield,
  BarChart3,
  Search,
  Zap,
}

interface Service {
  iconName: string
  title: string
  description: string
  gradient: string
  iconGradient: string
  borderGradient: string
}

interface ServicesGridProps {
  services: Service[]
}

export function ServicesGrid({ services }: ServicesGridProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service, index) => {
        const Icon = iconMap[service.iconName] || Building2
        return (
          <ServiceCard3D
            key={index}
            icon={Icon}
            title={service.title}
            description={service.description}
            gradient={service.gradient}
            iconGradient={service.iconGradient}
            borderGradient={service.borderGradient}
          />
        )
      })}
    </div>
  )
}

