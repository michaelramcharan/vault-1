"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Shield, TrendingUp, Clock, Star, Zap } from "lucide-react"
import { AnimatedCounter } from "@/components/animated-counter"

interface StakingPosition {
  id: string
  planName: string
  planType: "Core" | "Prime" | "Apex"
  amount: number
  dailyRate: number
  totalRewards: number
  daysRemaining: number
  totalDays: number
  status: "active" | "completed"
  isPopular?: boolean
  isPremium?: boolean
}

export function StakingPositions() {
  const [positions] = useState<StakingPosition[]>([
    {
      id: "1",
      planName: "Core Plan",
      planType: "Core",
      amount: 5.5,
      dailyRate: 0.8,
      totalRewards: 0.2156,
      daysRemaining: 27,
      totalDays: 30,
      status: "active",
    },
    {
      id: "2",
      planName: "Prime Plan",
      planType: "Prime",
      amount: 12.0,
      dailyRate: 1.3,
      totalRewards: 1.872,
      daysRemaining: 18,
      totalDays: 60,
      status: "active",
      isPopular: true,
    },
    {
      id: "3",
      planName: "Apex Plan",
      planType: "Apex",
      amount: 25.0,
      dailyRate: 2.2,
      totalRewards: 8.25,
      daysRemaining: 75,
      totalDays: 90,
      status: "active",
      isPremium: true,
    },
  ])

  const getPlanColor = (planType: string) => {
    switch (planType) {
      case "Core":
        return "from-blue-500 to-blue-600"
      case "Prime":
        return "from-purple-500 to-purple-600"
      case "Apex":
        return "from-yellow-500 to-yellow-600"
      default:
        return "from-gray-500 to-gray-600"
    }
  }

  const getPlanIcon = (planType: string) => {
    switch (planType) {
      case "Core":
        return Shield
      case "Prime":
        return TrendingUp
      case "Apex":
        return Zap
      default:
        return Shield
    }
  }

  return (
    <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-white">Active Staking Positions</h3>
          <p className="text-sm text-gray-400">Your current staking investments</p>
        </div>
        <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
          {positions.filter((p) => p.status === "active").length} Active
        </Badge>
      </div>

      <div className="space-y-4">
        {positions.map((position) => {
          const Icon = getPlanIcon(position.planType)
          const progress = ((position.totalDays - position.daysRemaining) / position.totalDays) * 100
          const dailyReward = (position.amount * position.dailyRate) / 100

          return (
            <motion.div
              key={position.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-gray-800/30 rounded-lg border border-gray-700/50 hover:border-blue-500/30 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-10 h-10 bg-gradient-to-r ${getPlanColor(position.planType)} rounded-lg flex items-center justify-center`}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium text-white">{position.planName}</h4>
                      {position.isPopular && (
                        <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 text-xs">
                          <Star className="w-3 h-3 mr-1" />
                          Popular
                        </Badge>
                      )}
                      {position.isPremium && (
                        <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 text-xs">Premium</Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-400">{position.dailyRate}% daily rewards</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold text-white">
                    <AnimatedCounter end={position.amount} suffix=" SOL" decimals={2} duration={1} />
                  </div>
                  <div className="text-sm text-gray-400">Staked Amount</div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <div className="text-sm text-gray-400">Daily Reward</div>
                  <div className="text-green-400 font-medium">
                    +<AnimatedCounter end={dailyReward} suffix=" SOL" decimals={4} duration={1} />
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Total Earned</div>
                  <div className="text-blue-400 font-medium">
                    <AnimatedCounter end={position.totalRewards} suffix=" SOL" decimals={4} duration={1} />
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Days Remaining</div>
                  <div className="text-white font-medium flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{position.daysRemaining}</span>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Status</div>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Active</Badge>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Progress</span>
                  <span className="text-white">{Math.round(progress)}%</span>
                </div>
                <div className="w-full bg-gray-700/50 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className={`h-2 bg-gradient-to-r ${getPlanColor(position.planType)} rounded-full`}
                  />
                </div>
              </div>

              {/* Note about no unstaking */}
              <div className="mt-3 p-2 bg-blue-500/10 border border-blue-500/20 rounded text-xs text-blue-400">
                <Shield className="w-3 h-3 inline mr-1" />
                Staking positions are locked until completion for maximum security and rewards
              </div>
            </motion.div>
          )
        })}
      </div>

      {positions.length === 0 && (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-gray-800/50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-gray-400" />
          </div>
          <h4 className="text-lg font-medium text-white mb-2">No Active Positions</h4>
          <p className="text-gray-400 mb-4">Start staking to earn daily rewards</p>
          <Button className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600">
            Start Staking
          </Button>
        </div>
      )}
    </Card>
  )
}
