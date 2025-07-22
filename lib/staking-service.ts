"use client"

export interface StakingPosition {
  id: string
  planId: string
  planName: string
  amount: number
  dailyRate: number
  startDate: Date
  lockPeriod: number // in days
  status: "active" | "completed" | "withdrawn"
  totalRewards: number
  lastRewardDate: Date
  referralCode?: string
}

export interface UserBalance {
  totalBalance: number
  stakedAmount: number
  availableBalance: number
  totalRewards: number
  referralEarnings: number
}

export interface ReferralData {
  code: string
  totalReferrals: number
  totalCommission: number
  commissionRate: number
  referredUsers: Array<{
    id: string
    joinDate: Date
    totalStaked: number
    commissionEarned: number
  }>
}

export class StakingService {
  private static instance: StakingService
  private positions: StakingPosition[] = []
  private balance: UserBalance = {
    totalBalance: 0,
    stakedAmount: 0,
    availableBalance: 0,
    totalRewards: 0,
    referralEarnings: 0,
  }
  private referralData: ReferralData = {
    code: this.generateReferralCode(),
    totalReferrals: 0,
    totalCommission: 0,
    commissionRate: 0.15, // 15% commission rate
    referredUsers: [],
  }

  static getInstance(): StakingService {
    if (!StakingService.instance) {
      StakingService.instance = new StakingService()
    }
    return StakingService.instance
  }

  constructor() {
    this.loadFromStorage()
    this.startRewardCalculation()
  }

  private generateReferralCode(): string {
    return `VAULT${Math.random().toString(36).substr(2, 6).toUpperCase()}`
  }

  private loadFromStorage() {
    if (typeof window !== "undefined") {
      const savedPositions = localStorage.getItem("vault_staking_positions")
      const savedBalance = localStorage.getItem("vault_balance")
      const savedReferralData = localStorage.getItem("vault_referral_data")

      if (savedPositions) {
        this.positions = JSON.parse(savedPositions).map((pos: any) => ({
          ...pos,
          startDate: new Date(pos.startDate),
          lastRewardDate: new Date(pos.lastRewardDate),
        }))
      }

      if (savedBalance) {
        this.balance = JSON.parse(savedBalance)
      }

      if (savedReferralData) {
        this.referralData = {
          ...JSON.parse(savedReferralData),
          referredUsers: JSON.parse(savedReferralData).referredUsers.map((user: any) => ({
            ...user,
            joinDate: new Date(user.joinDate),
          })),
        }
      }
    }
  }

  private saveToStorage() {
    if (typeof window !== "undefined") {
      localStorage.setItem("vault_staking_positions", JSON.stringify(this.positions))
      localStorage.setItem("vault_balance", JSON.stringify(this.balance))
      localStorage.setItem("vault_referral_data", JSON.stringify(this.referralData))
    }
  }

  private startRewardCalculation() {
    // Check for rewards every minute
    setInterval(() => {
      this.calculateAndDistributeRewards()
    }, 60000) // 1 minute

    // Initial calculation
    this.calculateAndDistributeRewards()
  }

  private calculateAndDistributeRewards() {
    const now = new Date()
    let totalNewRewards = 0

    this.positions.forEach((position) => {
      if (position.status !== "active") return

      const timeSinceLastReward = now.getTime() - position.lastRewardDate.getTime()
      const hoursSinceLastReward = timeSinceLastReward / (1000 * 60 * 60)

      // Calculate rewards for every 24 hours that have passed
      if (hoursSinceLastReward >= 24) {
        const daysPassed = Math.floor(hoursSinceLastReward / 24)
        const dailyReward = position.amount * (position.dailyRate / 100)
        const newRewards = dailyReward * daysPassed

        position.totalRewards += newRewards
        position.lastRewardDate = new Date(position.lastRewardDate.getTime() + daysPassed * 24 * 60 * 60 * 1000)
        totalNewRewards += newRewards

        // Process referral commission if applicable
        if (position.referralCode) {
          const commission = newRewards * this.referralData.commissionRate
          this.balance.referralEarnings += commission
          this.referralData.totalCommission += commission
          totalNewRewards += commission
        }

        // Check if staking period is complete
        const daysSinceStart = (now.getTime() - position.startDate.getTime()) / (1000 * 60 * 60 * 24)
        if (daysSinceStart >= position.lockPeriod) {
          position.status = "completed"
          // Return staked amount to available balance
          this.balance.availableBalance += position.amount
          this.balance.stakedAmount -= position.amount
        }
      }
    })

    if (totalNewRewards > 0) {
      this.balance.totalRewards += totalNewRewards
      this.balance.availableBalance += totalNewRewards
      this.balance.totalBalance += totalNewRewards
      this.saveToStorage()
    }
  }

  deposit(amount: number): boolean {
    if (amount <= 0) return false

    this.balance.availableBalance += amount
    this.balance.totalBalance += amount
    this.saveToStorage()
    return true
  }

  withdraw(amount: number): boolean {
    if (amount <= 0 || amount > this.balance.availableBalance) return false

    this.balance.availableBalance -= amount
    this.balance.totalBalance -= amount
    this.saveToStorage()
    return true
  }

  stake(
    planId: string,
    planName: string,
    amount: number,
    dailyRate: number,
    lockPeriod: number,
    referralCode?: string,
  ): boolean {
    if (amount <= 0 || amount > this.balance.availableBalance) return false

    const position: StakingPosition = {
      id: `stake_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      planId,
      planName,
      amount,
      dailyRate,
      startDate: new Date(),
      lockPeriod,
      status: "active",
      totalRewards: 0,
      lastRewardDate: new Date(),
      referralCode,
    }

    this.positions.push(position)
    this.balance.availableBalance -= amount
    this.balance.stakedAmount += amount

    // Process referral if code provided
    if (referralCode && referralCode !== this.referralData.code) {
      this.processReferralCommission(amount, referralCode)
    }

    this.saveToStorage()
    return true
  }

  private processReferralCommission(stakedAmount: number, referralCode: string) {
    // Calculate 15% commission on the staked amount
    const commission = stakedAmount * this.referralData.commissionRate

    // Add commission to available balance (instant reward)
    this.balance.availableBalance += commission
    this.balance.totalBalance += commission
    this.balance.referralEarnings += commission

    // Update referral data
    this.referralData.totalCommission += commission
    this.referralData.totalReferrals += 1

    // Add to referred users
    this.referralData.referredUsers.push({
      id: `user_${Date.now()}`,
      joinDate: new Date(),
      totalStaked: stakedAmount,
      commissionEarned: commission,
    })

    // Keep only last 10 referrals for display
    if (this.referralData.referredUsers.length > 10) {
      this.referralData.referredUsers = this.referralData.referredUsers.slice(-10)
    }
  }

  unstake(positionId: string): boolean {
    const position = this.positions.find((p) => p.id === positionId)
    if (!position || position.status !== "active") return false

    // Check if lock period is complete
    const now = new Date()
    const daysSinceStart = (now.getTime() - position.startDate.getTime()) / (1000 * 60 * 60 * 24)

    if (daysSinceStart < position.lockPeriod) {
      // Early withdrawal penalty (lose 10% of rewards)
      position.totalRewards *= 0.9
    }

    position.status = "withdrawn"
    this.balance.availableBalance += position.amount + position.totalRewards
    this.balance.stakedAmount -= position.amount
    this.saveToStorage()
    return true
  }

  getBalance(): UserBalance {
    return { ...this.balance }
  }

  getPositions(): StakingPosition[] {
    return [...this.positions]
  }

  getActivePositions(): StakingPosition[] {
    return this.positions.filter((p) => p.status === "active")
  }

  getReferralData(): ReferralData {
    return { ...this.referralData }
  }

  updateReferralCommissionRate(rate: number): void {
    this.referralData.commissionRate = Math.max(0, Math.min(1, rate)) // Clamp between 0 and 1
    this.saveToStorage()
  }

  // Simulate time for testing (advance time by hours)
  simulateTimeAdvance(hours: number) {
    const now = new Date()
    this.positions.forEach((position) => {
      if (position.status === "active") {
        position.lastRewardDate = new Date(position.lastRewardDate.getTime() - hours * 60 * 60 * 1000)
      }
    })
    this.calculateAndDistributeRewards()
  }
}

export const stakingService = StakingService.getInstance()
