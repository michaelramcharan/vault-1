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

    const { positionId } = await request.json()

    if (!positionId) {
      return NextResponse.json({ error: "Position ID is required" }, { status: 400 })
    }

    // Get staking position
    const positions = await DatabaseService.getUserStakingPositions(user.id)
    const position = positions.find((p) => p.id === positionId)

    if (!position || position.status !== "active") {
      return NextResponse.json({ error: "Active staking position not found" }, { status: 404 })
    }

    // Check if lock period is complete
    const now = new Date()
    const daysSinceStart = (now.getTime() - position.startDate.getTime()) / (1000 * 60 * 60 * 24)
    let totalRewards = position.totalRewards

    if (daysSinceStart < position.lockPeriodDays) {
      // Early withdrawal penalty (lose 10% of rewards)
      totalRewards *= 0.9
    }

    // Update position status
    const updatedPosition = await DatabaseService.updateStakingPosition(positionId, {
      status: "withdrawn",
      endDate: now,
      totalRewards,
    })

    // Update user balance
    const currentBalance = await DatabaseService.getUserBalance(user.id)
    if (currentBalance) {
      const updatedBalance = await DatabaseService.updateUserBalance(user.id, {
        availableBalance: currentBalance.availableBalance + position.amount + totalRewards,
        stakedAmount: currentBalance.stakedAmount - position.amount,
      })

      // Create unstake transaction
      await DatabaseService.createTransaction(
        user.id,
        "unstake",
        position.amount + totalRewards,
        "completed",
        positionId,
        undefined,
        {
          originalAmount: position.amount,
          rewards: totalRewards,
          earlyWithdrawal: daysSinceStart < position.lockPeriodDays,
        },
      )

      return NextResponse.json({
        position: updatedPosition,
        balance: updatedBalance,
      })
    }

    return NextResponse.json({ error: "Failed to update balance" }, { status: 500 })
  } catch (error) {
    console.error("Unstake API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
