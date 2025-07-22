"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Check, Plus } from "lucide-react"
import { useStaking } from "@/hooks/use-staking"
import { CelebrationAnimation } from "@/components/celebration-animation"

interface StakingPlan {
  id: string
  name: string
  apy: string
  minStake: string
  lockPeriod: string
  dailyRewards: string
  dailyRate: number
  lockDays: number
  features: string[]
  description?: string
  popular?: boolean
  premium?: boolean
  icon: React.ComponentType<{ className?: string }>
}

interface StakingPlanCardProps {
  plan: StakingPlan
  onSelect: (planId: string) => void
}

export function StakingPlanCard({ plan, onSelect }: StakingPlanCardProps) {
  const Icon = plan.icon
  const { balance, stake } = useStaking()
  const [stakeAmount, setStakeAmount] = useState("")
  const [isStaking, setIsStaking] = useState(false)
  const [showStakeForm, setShowStakeForm] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)

  const minStakeAmount = Number.parseFloat(plan.minStake.replace(/[^0-9.]/g, ""))

  const handleStake = async () => {
    const amount = Number.parseFloat(stakeAmount)
    if (!amount || amount < minStakeAmount || amount > balance.availableBalance) {
      return
    }

    setIsStaking(true)
    try {
      const success = await stake(plan.id, plan.name, amount, plan.dailyRate, plan.lockDays)

      if (success) {
        setStakeAmount("")
        setShowStakeForm(false)
        setShowCelebration(true)
        onSelect(plan.id)
      }
    } finally {
      setIsStaking(false)
    }
  }

  const canStake =
    stakeAmount &&
    Number.parseFloat(stakeAmount) >= minStakeAmount &&
    Number.parseFloat(stakeAmount) <= balance.availableBalance

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        whileHover={{ scale: 1.02 }}
        className="relative"
      >
        {plan.popular && (
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
            <Badge className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-3 py-1 text-xs font-medium">
              Most Popular
            </Badge>
          </div>
        )}

        <Card
          className={`relative overflow-hidden h-full ${
            plan.premium
              ? "bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border-blue-500/30"
              : "bg-gray-900/50 border-gray-800/50"
          } backdrop-blur-sm transition-all duration-300 hover:border-blue-500/40`}
        >
          {plan.premium && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-cyan-400/5"
              animate={{ opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            />
          )}

          <div className="p-6 relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    plan.premium
                      ? "bg-gradient-to-r from-blue-500 to-cyan-400"
                      : "bg-gradient-to-r from-gray-600 to-gray-700"
                  }`}
                >
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{plan.name}</h3>
                  <p className="text-sm text-gray-400">Daily Rewards</p>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-baseline space-x-2 mb-2">
                <span className="text-3xl font-bold text-blue-400">{plan.dailyRewards}</span>
                <span className="text-sm text-gray-400">Daily</span>
              </div>
              {plan.description && (
                <div className="text-sm text-gray-300 italic mb-4 leading-relaxed">"{plan.description}"</div>
              )}
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Min Stake</span>
                <span className="text-white font-medium">{plan.minStake}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Lock Period</span>
                <span className="text-white font-medium">{plan.lockPeriod}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Available Balance</span>
                <span className="text-green-400 font-medium">{balance.availableBalance.toFixed(2)} SOL</span>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              {plan.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                  <span className="text-sm text-gray-300">{feature}</span>
                </div>
              ))}
            </div>

            {!showStakeForm ? (
              <Button
                onClick={() => setShowStakeForm(true)}
                disabled={balance.availableBalance < minStakeAmount}
                className={`w-full py-3 rounded-lg font-medium transition-all duration-300 ${
                  plan.premium
                    ? "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white shadow-lg shadow-blue-500/25"
                    : "bg-gray-800 hover:bg-gray-700 text-white border border-gray-700 hover:border-gray-600"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <Plus className="w-4 h-4 mr-2" />
                {plan.premium ? "Start Apex Staking" : plan.popular ? "Start Prime Staking" : "Start Core Staking"}
              </Button>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor={`stake-amount-${plan.id}`} className="text-sm font-medium text-gray-300">
                    Stake Amount (SOL)
                  </Label>
                  <Input
                    id={`stake-amount-${plan.id}`}
                    type="number"
                    value={stakeAmount}
                    onChange={(e) => setStakeAmount(e.target.value)}
                    className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500/20"
                    placeholder={`Min: ${minStakeAmount} SOL`}
                    step="0.01"
                    min={minStakeAmount}
                    max={balance.availableBalance}
                  />
                </div>

                <div className="flex space-x-2">
                  <Button
                    onClick={handleStake}
                    disabled={!canStake || isStaking}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white py-2 rounded-lg font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isStaking ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                        <span>Staking...</span>
                      </div>
                    ) : (
                      "Stake Now"
                    )}
                  </Button>
                  <Button
                    onClick={() => {
                      setShowStakeForm(false)
                      setStakeAmount("")
                    }}
                    variant="outline"
                    className="px-4 border-gray-700 text-gray-300 hover:bg-gray-800/50"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Card>
      </motion.div>

      <CelebrationAnimation
        isVisible={showCelebration}
        onComplete={() => setShowCelebration(false)}
        planName={plan.name}
        amount={Number.parseFloat(stakeAmount) || 0}
      />
    </>
  )
}
