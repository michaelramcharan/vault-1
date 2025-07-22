"use client"

import { useState, useEffect } from "react"
import { stakingService, type StakingPosition, type UserBalance } from "@/lib/staking-service"

export function useStaking() {
  const [balance, setBalance] = useState<UserBalance>({
    totalBalance: 0,
    stakedAmount: 0,
    availableBalance: 0,
    totalRewards: 0,
  })
  const [positions, setPositions] = useState<StakingPosition[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const refreshData = () => {
    setBalance(stakingService.getBalance())
    setPositions(stakingService.getPositions())
  }

  useEffect(() => {
    refreshData()
    setIsLoading(false)

    // Refresh data every minute to show real-time updates
    const interval = setInterval(refreshData, 60000)
    return () => clearInterval(interval)
  }, [])

  const deposit = async (amount: number): Promise<boolean> => {
    const success = stakingService.deposit(amount)
    if (success) {
      refreshData()
    }
    return success
  }

  const withdraw = async (amount: number): Promise<boolean> => {
    const success = stakingService.withdraw(amount)
    if (success) {
      refreshData()
    }
    return success
  }

  const stake = async (
    planId: string,
    planName: string,
    amount: number,
    dailyRate: number,
    lockPeriod: number,
  ): Promise<boolean> => {
    const success = stakingService.stake(planId, planName, amount, dailyRate, lockPeriod)
    if (success) {
      refreshData()
    }
    return success
  }

  const unstake = async (positionId: string): Promise<boolean> => {
    const success = stakingService.unstake(positionId)
    if (success) {
      refreshData()
    }
    return success
  }

  const simulateTimeAdvance = (hours: number) => {
    stakingService.simulateTimeAdvance(hours)
    refreshData()
  }

  return {
    balance,
    positions,
    activePositions: positions.filter((p) => p.status === "active"),
    isLoading,
    deposit,
    withdraw,
    stake,
    unstake,
    simulateTimeAdvance,
    refreshData,
  }
}
