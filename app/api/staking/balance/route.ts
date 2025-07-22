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

    const balance = await DatabaseService.getUserBalance(user.id)
    if (!balance) {
      return NextResponse.json({ error: "Balance not found" }, { status: 404 })
    }

    return NextResponse.json({ balance })
  } catch (error) {
    console.error("Get balance API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
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

    const { type, amount } = await request.json()

    if (!type || !amount || amount <= 0) {
      return NextResponse.json({ error: "Invalid request data" }, { status: 400 })
    }

    const currentBalance = await DatabaseService.getUserBalance(user.id)
    if (!currentBalance) {
      return NextResponse.json({ error: "Balance not found" }, { status: 404 })
    }

    let updatedBalance
    if (type === "deposit") {
      updatedBalance = await DatabaseService.updateUserBalance(user.id, {
        totalBalance: currentBalance.totalBalance + amount,
        availableBalance: currentBalance.availableBalance + amount,
      })

      await DatabaseService.createTransaction(user.id, "deposit", amount)
    } else if (type === "withdraw") {
      if (amount > currentBalance.availableBalance) {
        return NextResponse.json({ error: "Insufficient balance" }, { status: 400 })
      }

      updatedBalance = await DatabaseService.updateUserBalance(user.id, {
        totalBalance: currentBalance.totalBalance - amount,
        availableBalance: currentBalance.availableBalance - amount,
      })

      await DatabaseService.createTransaction(user.id, "withdraw", amount)
    } else {
      return NextResponse.json({ error: "Invalid transaction type" }, { status: 400 })
    }

    return NextResponse.json({ balance: updatedBalance })
  } catch (error) {
    console.error("Update balance API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
