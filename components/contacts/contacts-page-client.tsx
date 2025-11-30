"use client"

import { useState, useEffect } from "react"
import type { Contact } from "@/lib/types"
import { ContactsTable } from "./contacts-table"
import { LimitReachedModal } from "./limit-reached-modal"
import { UsageBanner } from "./usage-banner"

interface ContactsPageClientProps {
  contacts: Contact[]
  agencyMap: Record<string, string>
  initialUsage: {
    contactsViewed: number
    hasReachedLimit: boolean
    remainingViews: number
  }
  dailyLimit: number
}

export function ContactsPageClient({ contacts, agencyMap, initialUsage, dailyLimit }: ContactsPageClientProps) {
  const [usage, setUsage] = useState(initialUsage)
  const [showLimitModal, setShowLimitModal] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 10

  // Track contact views when page changes
  useEffect(() => {
    async function trackViews() {
      if (usage.hasReachedLimit) return

      try {
        const response = await fetch("/api/usage", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ count: pageSize }),
        })

        if (response.ok) {
          const data = await response.json()
          setUsage({
            contactsViewed: data.newCount,
            hasReachedLimit: data.newCount >= dailyLimit,
            remainingViews: Math.max(0, dailyLimit - data.newCount),
          })

          if (data.newCount >= dailyLimit) {
            setShowLimitModal(true)
          }
        }
      } catch (error) {
        console.error("Failed to track usage:", error)
      }
    }

    trackViews()
  }, [currentPage])

  const handlePageChange = (page: number) => {
    if (usage.hasReachedLimit) {
      setShowLimitModal(true)
      return
    }
    setCurrentPage(page)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Contacts</h1>
        <p className="text-muted-foreground">Browse and search through your contact directory.</p>
      </div>

      <UsageBanner
        contactsViewed={usage.contactsViewed}
        dailyLimit={dailyLimit}
        hasReachedLimit={usage.hasReachedLimit}
      />

      <ContactsTable
        contacts={contacts}
        agencyMap={agencyMap}
        currentPage={currentPage}
        pageSize={pageSize}
        onPageChange={handlePageChange}
        isBlurred={usage.hasReachedLimit}
      />

      <LimitReachedModal open={showLimitModal} onOpenChange={setShowLimitModal} />
    </div>
  )
}
