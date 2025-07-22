import { type NextRequest, NextResponse } from "next/server"
import { DatabaseService } from "@/lib/database"

export async function GET(request: NextRequest) {
  try {
    const plans = await DatabaseService.getStakingPlans()
    return NextResponse.json({ plans })
  } catch (error) {
    console.error("Get staking plans API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
