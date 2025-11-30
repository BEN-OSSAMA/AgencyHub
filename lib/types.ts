export interface Agency {
  id: string
  city: string
  address: string | null
  createdAt: string
}

export interface Contact {
  id: string
  name: string
  phone: string
  email: string
  agencyId: string
  position: string
}

export interface UsageData {
  contactsViewed: number
  dailyLimit: number
  hasReachedLimit: boolean
  remainingViews: number
}

export const DAILY_CONTACT_LIMIT = 50
