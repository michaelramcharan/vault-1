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
    const limit = Number.parseInt(searchParams.get("limit") || "50")

    const transactions = await DatabaseService.getUserTransactions(user.id, limit)
    return NextResponse.json({ transactions })
  } catch (error) {
    console.error("Get transactions API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
