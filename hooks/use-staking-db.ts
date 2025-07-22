"use client"

import { useState, useEffect } from "react"
import { useAuth } from "./use-auth"

interface UserBalance {
  id: string
  userId: string
  totalBalance: number
  stakedAmount: number
  availableBalance: number
  totalRewards: number
  updatedAt: Date
}

interface StakingPosition {
  id: string
  userId: string
  planId: string
  amount: number
  dailyRate: number
  startDate: Date
  lockPeriodDays: number
  status: "active" | "completed" | "withdrawn"
  totalRewards: number
  lastRewardDate: Date
  endDate?: Date
  createdAt: Date
  updatedAt: Date
}

interface StakingPlan {
  id: string
  name: string
  dailyRate: number
  minStakeAmount: number
  lockPeriodDays: number
  apy: number
  isActive: boolean
  isPopular: boolean
  isPremium: boolean
  features: string[]
  description?: string
  createdAt: Date
}

interface Transaction {
  id: string
  userId: string
  type: "deposit" | "withdraw" | "stake" | "unstake" | "reward"
  amount: number
  status: "pending" | "completed" | "failed"
  referenceId?: string
  transactionHash?: string
  metadata?: any
  createdAt: Date
}

export function useStakingDB() {
  const { token, user } = useAuth()
  const [balance, setBalance] = useState<UserBalance | null>(null)
  const [positions, setPositions] = useState<StakingPosition[]>([])
  const [plans, setPlans] = useState<StakingPlan[]>([])
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const apiCall = async (endpoint: string, options: RequestInit = {}) => {
    if (!token) throw new Error("No authentication token")

    const response = await fetch(endpoint, {
      ...options,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        ...options.headers,
      },
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || "API request failed")
    }

    return response.json()
  }

  const refreshData = async () => {
    if (!token || !user) return

    try {
      const [balanceRes, positionsRes, plansRes, transactionsRes] = await Promise.all([
        apiCall("/api/staking/balance"),
        apiCall("/api/staking/positions"),
        fetch("/api/staking/plans").then((res) => res.json()),
        apiCall("/api/staking/transactions?limit=20"),
      ])

      setBalance(balanceRes.balance)
      setPositions(positionsRes.positions)
      setPlans(plansRes.plans)
      setTransactions(transactionsRes.transactions)
    } catch (error) {
      console.error("Failed to refresh data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (token && user) {
      refreshData()

      // Refresh data every minute to show real-time updates
      const interval = setInterval(refreshData, 60000)
      return () => clearInterval(interval)
    } else {
      setIsLoading(false)
    }
  }, [token, user])

  const deposit = async (amount: number): Promise<boolean> => {
    try {
      const result = await apiCall("/api/staking/balance", {
        method: "POST",
        body: JSON.stringify({ type: "deposit", amount }),
      })
      setBalance(result.balance)
      await refreshData() // Refresh to get updated transactions
      return true
    } catch (error) {
      console.error("Deposit failed:", error)
      return false
    }
  }

  const withdraw = async (amount: number): Promise<boolean> => {
    try {
      const result = await apiCall("/api/staking/balance", {
        method: "POST",
        body: JSON.stringify({ type: "withdraw", amount }),
      })
      setBalance(result.balance)
      await refreshData() // Refresh to get updated transactions
      return true
    } catch (error) {
      console.error("Withdraw failed:", error)
      return false
    }
  }

  const stake = async (planId: string, amount: number): Promise<boolean> => {
    try {
      const result = await apiCall("/api/staking/stake", {
        method: "POST",
        body: JSON.stringify({ planId, amount }),
      })
      setBalance(result.balance)
      await refreshData() // Refresh to get updated positions and transactions
      return true
    } catch (error) {
      console.error("Stake failed:", error)
      return false
    }
  }

  const unstake = async (positionId: string): Promise<boolean> => {
    try {
      const result = await apiCall("/api/staking/unstake", {
        method: "POST",
        body: JSON.stringify({ positionId }),
      })
      setBalance(result.balance)
      await refreshData() // Refresh to get updated positions and transactions
      return true
    } catch (error) {
      console.error("Unstake failed:", error)
      return false
    }
  }

  const processRewards = async (): Promise<boolean> => {
    try {
      await fetch("/api/staking/process-rewards", { method: "POST" })
      await refreshData() // Refresh to get updated balances and positions
      return true
    } catch (error) {
      console.error("Process rewards failed:", error)
      return false
    }
  }

  return {
    balance,
    positions,
    plans,
    transactions,
    activePositions: positions.filter((p) => p.status === "active"),
    isLoading,
    deposit,
    withdraw,
    stake,
    unstake,
    processRewards,
    refreshData,
  }
}
