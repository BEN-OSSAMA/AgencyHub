import { sql } from "./db"
import { DAILY_CONTACT_LIMIT } from "./types"

export async function getUserDailyUsage(userId: string): Promise<{
  contactsViewed: number
  hasReachedLimit: boolean
  remainingViews: number
}> {
  // Return default values if database is not configured
  if (!process.env.DATABASE_URL) {
    return {
      contactsViewed: 0,
      hasReachedLimit: false,
      remainingViews: DAILY_CONTACT_LIMIT,
    }
  }

  try {
    const today = new Date().toISOString().split("T")[0]

    const result = await sql`
      SELECT contacts_viewed 
      FROM user_daily_usage 
      WHERE user_id = ${userId} AND usage_date = ${today}
    `

    const contactsViewed = result[0]?.contacts_viewed ?? 0
    const hasReachedLimit = contactsViewed >= DAILY_CONTACT_LIMIT
    const remainingViews = Math.max(0, DAILY_CONTACT_LIMIT - contactsViewed)

    return { contactsViewed, hasReachedLimit, remainingViews }
  } catch (error) {
    console.error("Error fetching daily usage:", error)
    // Return default values on error
    return {
      contactsViewed: 0,
      hasReachedLimit: false,
      remainingViews: DAILY_CONTACT_LIMIT,
    }
  }
}

export async function incrementContactsViewed(
  userId: string,
  count = 1,
): Promise<{ success: boolean; newCount: number }> {
  // Return default response if database is not configured
  if (!process.env.DATABASE_URL) {
    console.warn("Database not configured. Usage tracking is disabled.")
    return {
      success: false,
      newCount: 0,
    }
  }

  try {
    const today = new Date().toISOString().split("T")[0]

    // Upsert: insert or update the daily usage
    const result = await sql`
      INSERT INTO user_daily_usage (user_id, usage_date, contacts_viewed, updated_at)
      VALUES (${userId}, ${today}, ${count}, NOW())
      ON CONFLICT (user_id, usage_date) 
      DO UPDATE SET 
        contacts_viewed = user_daily_usage.contacts_viewed + ${count},
        updated_at = NOW()
      RETURNING contacts_viewed
    `

    return {
      success: true,
      newCount: result[0]?.contacts_viewed ?? count,
    }
  } catch (error) {
    console.error("Error incrementing contacts viewed:", error)
    return {
      success: false,
      newCount: 0,
    }
  }
}

export async function getUsageStats(userId: string): Promise<{
  today: number
  thisWeek: number
  thisMonth: number
}> {
  // Return default values if database is not configured
  if (!process.env.DATABASE_URL) {
    return {
      today: 0,
      thisWeek: 0,
      thisMonth: 0,
    }
  }

  try {
    const today = new Date().toISOString().split("T")[0]
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]
    const monthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]

    const [todayResult, weekResult, monthResult] = await Promise.all([
      sql`SELECT COALESCE(SUM(contacts_viewed), 0) as total FROM user_daily_usage WHERE user_id = ${userId} AND usage_date = ${today}`,
      sql`SELECT COALESCE(SUM(contacts_viewed), 0) as total FROM user_daily_usage WHERE user_id = ${userId} AND usage_date >= ${weekAgo}`,
      sql`SELECT COALESCE(SUM(contacts_viewed), 0) as total FROM user_daily_usage WHERE user_id = ${userId} AND usage_date >= ${monthAgo}`,
    ])

    return {
      today: Number(todayResult[0]?.total ?? 0),
      thisWeek: Number(weekResult[0]?.total ?? 0),
      thisMonth: Number(monthResult[0]?.total ?? 0),
    }
  } catch (error) {
    console.error("Error fetching usage stats:", error)
    // Return default values on error
    return {
      today: 0,
      thisWeek: 0,
      thisMonth: 0,
    }
  }
}
