import { type NextRequest, NextResponse } from "next/server"
import { AuthService } from "@/lib/auth"
import { DatabaseService } from "@/lib/database"

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

    const { planId, amount } = await request.json()

    if (!planId || !amount || amount <= 0) {
      return NextResponse.json({ error: "Invalid request data" }, { status: 400 })
    }

    // Get staking plan
    const plan = await DatabaseService.getStakingPlan(planId)
    if (!plan) {
      return NextResponse.json({ error: "Staking plan not found" }, { status: 404 })
    }

    // Check minimum stake amount
    if (amount < plan.minStakeAmount) {
      return NextResponse.json(
        {
          error: `Minimum stake amount is ${plan.minStakeAmount} SOL`,
        },
        { status: 400 },
      )
    }

    // Check user balance
    const currentBalance = await DatabaseService.getUserBalance(user.id)
    if (!currentBalance || amount > currentBalance.availableBalance) {
      return NextResponse.json({ error: "Insufficient balance" }, { status: 400 })
    }

    // Create staking position
    const position = await DatabaseService.createStakingPosition(
      user.id,
      planId,
      amount,
      plan.dailyRate,
      plan.lockPeriodDays,
    )

    // Update user balance
    const updatedBalance = await DatabaseService.updateUserBalance(user.id, {
      availableBalance: currentBalance.availableBalance - amount,
      stakedAmount: currentBalance.stakedAmount + amount,
    })

    // Create stake transaction
    await DatabaseService.createTransaction(user.id, "stake", amount, "completed", position.id, undefined, {
      planId,
      planName: plan.name,
    })

    return NextResponse.json({
      position,
      balance: updatedBalance,
    })
  } catch (error) {
    console.error("Stake API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
