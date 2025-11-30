import { auth } from "@clerk/nextjs/server"
import { type NextRequest, NextResponse } from "next/server"
import { getPaginatedContacts } from "@/lib/data"
import { getUserDailyUsage } from "@/lib/usage"

export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Check usage limits
    const usage = await getUserDailyUsage(userId)

    if (usage.hasReachedLimit) {
      return NextResponse.json({ error: "Daily limit reached", hasReachedLimit: true }, { status: 403 })
    }

    const searchParams = request.nextUrl.searchParams
    const page = Number.parseInt(searchParams.get("page") ?? "1", 10)
    const limit = Number.parseInt(searchParams.get("limit") ?? "10", 10)

    const { contacts, total, pages } = getPaginatedContacts(page, limit)

    return NextResponse.json({
      contacts,
      pagination: {
        page,
        limit,
        total,
        pages,
      },
    })
  } catch (error) {
    console.error("Error fetching contacts:", error)
    return NextResponse.json({ error: "Failed to fetch contacts" }, { status: 500 })
  }
}
