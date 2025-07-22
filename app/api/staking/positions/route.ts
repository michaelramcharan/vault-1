import { type NextRequest, NextResponse } from "next/server"
import { AuthService } from "@/lib/auth"
import { DatabaseService } from "@/lib/database"

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 })
    }

    const token = authHeader.substring(7)
    const user = await AuthService.getCurrentUser(token)
    if (!user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")

    const positions = await DatabaseService.getUserStakingPositions(user.id, status || undefined)
    return NextResponse.json({ positions })
  } catch (error) {
    console.error("Get positions API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
