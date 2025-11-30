"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Zap, Check } from "lucide-react"

interface LimitReachedModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function LimitReachedModal({ open, onOpenChange }: LimitReachedModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-amber-500" />
            You've Reached Today's Limit
          </DialogTitle>
          <DialogDescription>
            You've viewed the maximum number of contacts allowed for today. Upgrade your plan to get unlimited access.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="rounded-lg border border-primary bg-primary/5 p-4">
            <h4 className="font-semibold">Pro Plan</h4>
            <p className="text-2xl font-bold">
              $29<span className="text-sm font-normal text-muted-foreground">/month</span>
            </p>
            <ul className="mt-4 space-y-2">
              {["Unlimited contact views", "Advanced search filters", "Export contacts to CSV", "Priority support"].map(
                (feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-primary" />
                    {feature}
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>

        <DialogFooter className="flex-col gap-2 sm:flex-row">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Maybe Later
          </Button>
          <Button className="gap-2">
            <Zap className="h-4 w-4" />
            Upgrade to Pro
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
