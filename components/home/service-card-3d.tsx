"use client"

import { ReactNode, useRef, useState } from "react"
import { ArrowRight } from "lucide-react"
import { LucideIcon } from "lucide-react"

interface ServiceCard3DProps {
  icon: LucideIcon
  title: string
  description: string
  gradient: string
  iconGradient: string
  borderGradient: string
}

export function ServiceCard3D({
  icon: Icon,
  title,
  description,
  gradient,
  iconGradient,
  borderGradient,
}: ServiceCard3DProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const mouseX = e.clientX - centerX
    const mouseY = e.clientY - centerY
    
    const maxRotation = 15
    const rotateXValue = (mouseY / rect.height) * maxRotation * -1
    const rotateYValue = (mouseX / rect.width) * maxRotation
    
    setRotateX(rotateXValue)
    setRotateY(rotateYValue)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
  }

  return (
    <div
      ref={cardRef}
      className="group relative"
      style={{
        perspective: "1000px",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* 3D Card Container */}
      <div
        className="relative h-full rounded-2xl border-2 border-border/50 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl p-8 transition-all duration-300 group-hover:border-primary/50 group-hover:shadow-2xl group-hover:shadow-primary/20"
        style={{
          transformStyle: "preserve-3d",
          transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0)`,
        }}
      >
        {/* Glow Effect */}
        <div className={`absolute -inset-0.5 bg-gradient-to-r ${gradient} rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
        
        {/* Content */}
        <div className="relative">
          {/* Icon with 3D Effect */}
          <div className="mb-6 relative">
            <div 
              className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${gradient} shadow-lg group-hover:shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6`}
            >
              <Icon className={`h-8 w-8 bg-gradient-to-br ${iconGradient} bg-clip-text text-transparent`} style={{ filter: 'drop-shadow(0 0 8px currentColor)' }} />
            </div>
            {/* Floating Particles */}
            <div className="absolute top-0 left-0 w-16 h-16">
              <div 
                className={`absolute top-2 right-2 w-2 h-2 rounded-full bg-gradient-to-br ${iconGradient} opacity-0 group-hover:opacity-100 group-hover:animate-ping`}
                style={{ animationDelay: '0ms' }}
              />
              <div 
                className={`absolute bottom-2 left-2 w-1.5 h-1.5 rounded-full bg-gradient-to-br ${iconGradient} opacity-0 group-hover:opacity-100 group-hover:animate-ping`}
                style={{ animationDelay: '150ms' }}
              />
            </div>
          </div>

          <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {description}
          </p>

          {/* Hover Arrow */}
          <div className="mt-6 flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 translate-x-0 group-hover:translate-x-2 transition-all duration-300">
            <span className="text-sm font-medium">Learn more</span>
            <ArrowRight className="h-4 w-4" />
          </div>
        </div>

        {/* 3D Shadow Effect */}
        <div 
          className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${gradient}`}
          style={{
            transform: "translateZ(-50px) scale(0.95)",
          }}
        />
      </div>
    </div>
  )
}

