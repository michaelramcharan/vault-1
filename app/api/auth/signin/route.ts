import { type NextRequest, NextResponse } from "next/server"
import { AuthService } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    const result = await AuthService.signIn(email, password)

    if ("error" in result) {
      return NextResponse.json({ error: result.error }, { status: 400 })
    }

    return NextResponse.json({
      user: result.user,
      token: result.token,
    })
  } catch (error) {
    console.error("Signin API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
