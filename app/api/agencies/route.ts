import { NextResponse } from "next/server"
import { getAgencies } from "@/lib/data"

export async function GET() {
  try {
    const agencies = getAgencies()
    return NextResponse.json({ agencies })
  } catch (error) {
    console.error("Error fetching agencies:", error)
    return NextResponse.json({ error: "Failed to fetch agencies" }, { status: 500 })
  }
}
