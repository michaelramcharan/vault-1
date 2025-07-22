import { type NextRequest, NextResponse } from "next/server"
import { DatabaseService } from "@/lib/database"

export async function POST(request: NextRequest) {
  try {
    // This endpoint should be called by a cron job or scheduled task
    // In production, you'd want to add authentication/authorization here

    await DatabaseService.processRewardDistribution()

    return NextResponse.json({
      success: true,
      message: "Reward distribution processed successfully",
    })
  } catch (error) {
    console.error("Process rewards API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
