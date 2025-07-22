"use client"

import { neon } from "@neondatabase/serverless"

// Database connection
const sql = neon(process.env.DATABASE_URL!)

export interface User {
  id: string
  email: string
  firstName?: string
  lastName?: string
  createdAt: Date
  emailVerified: boolean
  isActive: boolean
}

export interface UserBalance {
  id: string
  userId: string
  totalBalance: number
  stakedAmount: number
  availableBalance: number
  totalRewards: number
  updatedAt: Date
}

export interface StakingPlan {
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

export interface StakingPosition {
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

export interface Transaction {
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

export class DatabaseService {
  // User operations
  static async createUser(email: string, passwordHash: string, firstName?: string, lastName?: string): Promise<User> {
    const result = await sql`
      INSERT INTO users (email, password_hash, first_name, last_name)
      VALUES (${email}, ${passwordHash}, ${firstName}, ${lastName})
      RETURNING id, email, first_name as "firstName", last_name as "lastName", created_at as "createdAt", email_verified as "emailVerified", is_active as "isActive"
    `

    const user = result[0]

    // Create initial balance record
    await sql`
      INSERT INTO user_balances (user_id, total_balance, staked_amount, available_balance, total_rewards)
      VALUES (${user.id}, 0, 0, 0, 0)
    `

    return user
  }

  static async getUserByEmail(email: string): Promise<User | null> {
    const result = await sql`
      SELECT id, email, first_name as "firstName", last_name as "lastName", created_at as "createdAt", email_verified as "emailVerified", is_active as "isActive"
      FROM users 
      WHERE email = ${email} AND is_active = true
    `
    return result[0] || null
  }

  static async getUserById(id: string): Promise<User | null> {
    const result = await sql`
      SELECT id, email, first_name as "firstName", last_name as "lastName", created_at as "createdAt", email_verified as "emailVerified", is_active as "isActive"
      FROM users 
      WHERE id = ${id} AND is_active = true
    `
    return result[0] || null
  }

  static async verifyUserPassword(email: string): Promise<string | null> {
    const result = await sql`
      SELECT password_hash 
      FROM users 
      WHERE email = ${email} AND is_active = true
    `
    return result[0]?.password_hash || null
  }

  // Balance operations
  static async getUserBalance(userId: string): Promise<UserBalance | null> {
    const result = await sql`
      SELECT id, user_id as "userId", total_balance as "totalBalance", staked_amount as "stakedAmount", 
             available_balance as "availableBalance", total_rewards as "totalRewards", updated_at as "updatedAt"
      FROM user_balances 
      WHERE user_id = ${userId}
    `
    return result[0] || null
  }

  static async updateUserBalance(userId: string, balance: Partial<UserBalance>): Promise<UserBalance> {
    const updates = []
    const values = []

    if (balance.totalBalance !== undefined) {
      updates.push("total_balance = $" + (values.length + 2))
      values.push(balance.totalBalance)
    }
    if (balance.stakedAmount !== undefined) {
      updates.push("staked_amount = $" + (values.length + 2))
      values.push(balance.stakedAmount)
    }
    if (balance.availableBalance !== undefined) {
      updates.push("available_balance = $" + (values.length + 2))
      values.push(balance.availableBalance)
    }
    if (balance.totalRewards !== undefined) {
      updates.push("total_rewards = $" + (values.length + 2))
      values.push(balance.totalRewards)
    }

    const query = `
      UPDATE user_balances 
      SET ${updates.join(", ")}, updated_at = NOW()
      WHERE user_id = $1
      RETURNING id, user_id as "userId", total_balance as "totalBalance", staked_amount as "stakedAmount", 
                available_balance as "availableBalance", total_rewards as "totalRewards", updated_at as "updatedAt"
    `

    const result = await sql.unsafe(query, [userId, ...values])
    return result[0]
  }

  // Staking plan operations
  static async getStakingPlans(): Promise<StakingPlan[]> {
    const result = await sql`
      SELECT id, name, daily_rate as "dailyRate", min_stake_amount as "minStakeAmount", 
             lock_period_days as "lockPeriodDays", apy, is_active as "isActive", 
             is_popular as "isPopular", is_premium as "isPremium", features, description, created_at as "createdAt"
      FROM staking_plans 
      WHERE is_active = true
      ORDER BY daily_rate ASC
    `
    return result
  }

  static async getStakingPlan(id: string): Promise<StakingPlan | null> {
    const result = await sql`
      SELECT id, name, daily_rate as "dailyRate", min_stake_amount as "minStakeAmount", 
             lock_period_days as "lockPeriodDays", apy, is_active as "isActive", 
             is_popular as "isPopular", is_premium as "isPremium", features, description, created_at as "createdAt"
      FROM staking_plans 
      WHERE id = ${id} AND is_active = true
    `
    return result[0] || null
  }

  // Staking position operations
  static async createStakingPosition(
    userId: string,
    planId: string,
    amount: number,
    dailyRate: number,
    lockPeriodDays: number,
  ): Promise<StakingPosition> {
    const result = await sql`
      INSERT INTO staking_positions (user_id, plan_id, amount, daily_rate, lock_period_days)
      VALUES (${userId}, ${planId}, ${amount}, ${dailyRate}, ${lockPeriodDays})
      RETURNING id, user_id as "userId", plan_id as "planId", amount, daily_rate as "dailyRate", 
                start_date as "startDate", lock_period_days as "lockPeriodDays", status, 
                total_rewards as "totalRewards", last_reward_date as "lastRewardDate", 
                end_date as "endDate", created_at as "createdAt", updated_at as "updatedAt"
    `
    return result[0]
  }

  static async getUserStakingPositions(userId: string, status?: string): Promise<StakingPosition[]> {
    const whereClause = status ? sql`WHERE user_id = ${userId} AND status = ${status}` : sql`WHERE user_id = ${userId}`

    const result = await sql`
      SELECT id, user_id as "userId", plan_id as "planId", amount, daily_rate as "dailyRate", 
             start_date as "startDate", lock_period_days as "lockPeriodDays", status, 
             total_rewards as "totalRewards", last_reward_date as "lastRewardDate", 
             end_date as "endDate", created_at as "createdAt", updated_at as "updatedAt"
      FROM staking_positions 
      ${whereClause}
      ORDER BY created_at DESC
    `
    return result
  }

  static async updateStakingPosition(id: string, updates: Partial<StakingPosition>): Promise<StakingPosition> {
    const updateFields = []
    const values = []

    if (updates.status !== undefined) {
      updateFields.push("status = $" + (values.length + 2))
      values.push(updates.status)
    }
    if (updates.totalRewards !== undefined) {
      updateFields.push("total_rewards = $" + (values.length + 2))
      values.push(updates.totalRewards)
    }
    if (updates.lastRewardDate !== undefined) {
      updateFields.push("last_reward_date = $" + (values.length + 2))
      values.push(updates.lastRewardDate)
    }
    if (updates.endDate !== undefined) {
      updateFields.push("end_date = $" + (values.length + 2))
      values.push(updates.endDate)
    }

    const query = `
      UPDATE staking_positions 
      SET ${updateFields.join(", ")}, updated_at = NOW()
      WHERE id = $1
      RETURNING id, user_id as "userId", plan_id as "planId", amount, daily_rate as "dailyRate", 
                start_date as "startDate", lock_period_days as "lockPeriodDays", status, 
                total_rewards as "totalRewards", last_reward_date as "lastRewardDate", 
                end_date as "endDate", created_at as "createdAt", updated_at as "updatedAt"
    `

    const result = await sql.unsafe(query, [id, ...values])
    return result[0]
  }

  static async getPositionsForRewardCalculation(): Promise<StakingPosition[]> {
    const result = await sql`
      SELECT id, user_id as "userId", plan_id as "planId", amount, daily_rate as "dailyRate", 
             start_date as "startDate", lock_period_days as "lockPeriodDays", status, 
             total_rewards as "totalRewards", last_reward_date as "lastRewardDate", 
             end_date as "endDate", created_at as "createdAt", updated_at as "updatedAt"
      FROM staking_positions 
      WHERE status = 'active' 
      AND last_reward_date <= NOW() - INTERVAL '24 hours'
      ORDER BY last_reward_date ASC
    `
    return result
  }

  // Transaction operations
  static async createTransaction(
    userId: string,
    type: Transaction["type"],
    amount: number,
    status: Transaction["status"] = "completed",
    referenceId?: string,
    transactionHash?: string,
    metadata?: any,
  ): Promise<Transaction> {
    const result = await sql`
      INSERT INTO transactions (user_id, type, amount, status, reference_id, transaction_hash, metadata)
      VALUES (${userId}, ${type}, ${amount}, ${status}, ${referenceId}, ${transactionHash}, ${JSON.stringify(metadata)})
      RETURNING id, user_id as "userId", type, amount, status, reference_id as "referenceId", 
                transaction_hash as "transactionHash", metadata, created_at as "createdAt"
    `
    return result[0]
  }

  static async getUserTransactions(userId: string, limit = 50): Promise<Transaction[]> {
    const result = await sql`
      SELECT id, user_id as "userId", type, amount, status, reference_id as "referenceId", 
             transaction_hash as "transactionHash", metadata, created_at as "createdAt"
      FROM transactions 
      WHERE user_id = ${userId}
      ORDER BY created_at DESC
      LIMIT ${limit}
    `
    return result
  }

  // Batch operations for reward distribution
  static async processRewardDistribution(): Promise<void> {
    // Get all positions that need reward calculation
    const positions = await this.getPositionsForRewardCalculation()

    for (const position of positions) {
      const now = new Date()
      const timeSinceLastReward = now.getTime() - position.lastRewardDate.getTime()
      const hoursSinceLastReward = timeSinceLastReward / (1000 * 60 * 60)

      if (hoursSinceLastReward >= 24) {
        const daysPassed = Math.floor(hoursSinceLastReward / 24)
        const dailyReward = position.amount * (position.dailyRate / 100)
        const newRewards = dailyReward * daysPassed

        // Update position rewards
        const newLastRewardDate = new Date(position.lastRewardDate.getTime() + daysPassed * 24 * 60 * 60 * 1000)
        const newTotalRewards = position.totalRewards + newRewards

        await this.updateStakingPosition(position.id, {
          totalRewards: newTotalRewards,
          lastRewardDate: newLastRewardDate,
        })

        // Update user balance
        const currentBalance = await this.getUserBalance(position.userId)
        if (currentBalance) {
          await this.updateUserBalance(position.userId, {
            totalBalance: currentBalance.totalBalance + newRewards,
            availableBalance: currentBalance.availableBalance + newRewards,
            totalRewards: currentBalance.totalRewards + newRewards,
          })
        }

        // Create reward transaction
        await this.createTransaction(position.userId, "reward", newRewards, "completed", position.id, undefined, {
          planId: position.planId,
          daysPassed,
        })

        // Check if staking period is complete
        const daysSinceStart = (now.getTime() - position.startDate.getTime()) / (1000 * 60 * 60 * 24)
        if (daysSinceStart >= position.lockPeriodDays) {
          await this.updateStakingPosition(position.id, {
            status: "completed",
            endDate: now,
          })

          // Return staked amount to available balance
          if (currentBalance) {
            await this.updateUserBalance(position.userId, {
              availableBalance: currentBalance.availableBalance + position.amount + newRewards,
              stakedAmount: currentBalance.stakedAmount - position.amount,
            })
          }
        }
      }
    }
  }
}

export { sql }
