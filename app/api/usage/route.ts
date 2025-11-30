import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import { getUserDailyUsage, incrementContactsViewed } from "@/lib/usage"
import { DAILY_CONTACT_LIMIT } from "@/lib/types"

export async function GET() {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const usage = await getUserDailyUsage(userId)

    return NextResponse.json({
      contactsViewed: usage.contactsViewed,
      dailyLimit: DAILY_CONTACT_LIMIT,
      hasReachedLimit: usage.hasReachedLimit,
      remainingViews: usage.remainingViews,
    })
  } catch (error) {
    console.error("Error fetching usage:", error)
    return NextResponse.json({ error: "Failed to fetch usage data" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const count = body.count ?? 1

    // Check current usage first
    const currentUsage = await getUserDailyUsage(userId)

    if (currentUsage.hasReachedLimit) {
      return NextResponse.json({
        success: false,
        message: "Daily limit reached",
        newCount: currentUsage.contactsViewed,
        hasReachedLimit: true,
      })
    }

    // Increment usage
    const result = await incrementContactsViewed(userId, count)

    return NextResponse.json({
      success: result.success,
      newCount: result.newCount,
      hasReachedLimit: result.newCount >= DAILY_CONTACT_LIMIT,
      remainingViews: Math.max(0, DAILY_CONTACT_LIMIT - result.newCount),
    })
  } catch (error) {
    console.error("Error updating usage:", error)
    return NextResponse.json({ error: "Failed to update usage" }, { status: 500 })
  }
}
