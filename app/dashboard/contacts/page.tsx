import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { getContacts, getAgencies } from "@/lib/data"
import { getUserDailyUsage } from "@/lib/usage"
import { DAILY_CONTACT_LIMIT } from "@/lib/types"
import { ContactsPageClient } from "@/components/contacts/contacts-page-client"

export default async function ContactsPage() {
  const { userId } = await auth()

  if (!userId) {
    redirect("/sign-in")
  }

  const contacts = getContacts()
  const agencies = getAgencies()

  let usageData = { contactsViewed: 0, hasReachedLimit: false, remainingViews: DAILY_CONTACT_LIMIT }
  try {
    usageData = await getUserDailyUsage(userId)
  } catch (error) {
    // Database might not be set up yet
    console.log("Usage data not available yet")
  }

  // Create agency lookup map
  const agencyMap = new Map(agencies.map((a) => [a.id, a.city]))

  return (
    <ContactsPageClient
      contacts={contacts}
      agencyMap={Object.fromEntries(agencyMap)}
      initialUsage={usageData}
      dailyLimit={DAILY_CONTACT_LIMIT}
    />
  )
}
