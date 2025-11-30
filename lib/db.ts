import { neon } from "@neondatabase/serverless"

// Create a SQL connection only if DATABASE_URL is provided
const databaseUrl = process.env.DATABASE_URL

// Create a mock SQL function that returns empty results when DB is not configured
const createMockSql = () => {
  return async (strings: TemplateStringsArray, ...values: any[]) => {
    console.warn("Database not configured. DATABASE_URL is missing.")
    return []
  }
}

export const sql = databaseUrl 
  ? neon(databaseUrl) 
  : (createMockSql() as ReturnType<typeof neon>)

export type UserDailyUsage = {
  id: number
  user_id: string
  usage_date: string
  contacts_viewed: number
  created_at: string
  updated_at: string
}
