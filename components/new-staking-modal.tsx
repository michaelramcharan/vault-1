"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { X, Shield, TrendingUp, Zap, Star, Calculator, CheckCircle } from "lucide-react"
import { AnimatedCounter } from "@/components/animated-counter"

interface NewStakingModalProps {
  onClose: () => void
}

interface StakingPlan {
  id: string
  name: string
  dailyRate: number
  minStake: number
  lockPeriod: number
  apy: number
  isPopular?: boolean
  isPremium?: boolean
  features: string[]
  icon: any
  gradient: string
}

export function NewStakingModal({ onClose }: NewStakingModalProps) {
  const [selectedPlan, setSelectedPlan] = useState<StakingPlan | null>(null)
  const [stakeAmount, setStakeAmount] = useState("")
  const [autoCompound, setAutoCompound] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState(1) // 1: Plan Selection, 2: Amount & Confirmation, 3: Success

  const availableBalance = 45.67

  const stakingPlans: StakingPlan[] = [
    {
      id: "core",
      name: "Core Plan",
      dailyRate: 0.8,
      minStake: 0.1,
      lockPeriod: 30,
      apy: 29.2,
      features: ["Daily rewards", "30-day lock", "Basic support", "Secure staking"],
      icon: Shield,
      gradient: "from-blue-500 to-blue-600",
    },
    {
      id: "prime",
      name: "Prime Plan",
      dailyRate: 1.3,
      minStake: 5,
      lockPeriod: 60,
      apy: 47.45,
      isPopular: true,
      features: ["Higher daily rewards", "60-day lock", "Priority support", "Auto-compound option", "Bonus rewards"],
      icon: TrendingUp,
      gradient: "from-purple-500 to-purple-600",
    },
    {
      id: "apex",
      name: "Apex Plan",
      dailyRate: 2.2,
      minStake: 10,
      lockPeriod: 90,
      apy: 80.3,
      isPremium: true,
      features: [
        "Maximum daily rewards",
        "90-day lock",
        "VIP support",
        "Auto-compound included",
        "Exclusive bonuses",
        "Early access to new features",
      ],
      icon: Zap,
      gradient: "from-yellow-500 to-yellow-600",
    },
  ]

  const calculateRewards = () => {
    if (!selectedPlan || !stakeAmount) return { daily: 0, total: 0 }

    const amount = Number.parseFloat(stakeAmount)
    const daily = (amount * selectedPlan.dailyRate) / 100
    const total = daily * selectedPlan.lockPeriod

    return { daily, total }
  }

  const handleStake = async () => {
    if (!selectedPlan || !stakeAmount || Number.parseFloat(stakeAmount) < selectedPlan.minStake) return

    setIsLoading(true)

    // Simulate staking process
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setStep(3)
    setIsLoading(false)
  }

  const setQuickAmount = (percentage: number) => {
    const amount = (availableBalance * percentage) / 100
    setStakeAmount(amount.toFixed(2))
  }

  const rewards = calculateRewards()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-4xl max-h-[90vh] overflow-y-auto"
      >
        <Card className="bg-gray-900/95 border-gray-800/50 backdrop-blur-sm p-6">
          {/* Step 1: Plan Selection */}
          {step === 1 && (
            <>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-semibold text-white">Choose Staking Plan</h2>
                  <p className="text-sm text-gray-400">Select a plan that fits your investment goals</p>
                </div>
                <Button onClick={onClose} variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stakingPlans.map((plan) => {
                  const Icon = plan.icon
                  return (
                    <motion.div
                      key={plan.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`relative p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                        selectedPlan?.id === plan.id
                          ? "border-blue-500 bg-blue-500/10"
                          : "border-gray-700/50 bg-gray-800/30 hover:border-gray-600"
                      }`}
                      onClick={() => setSelectedPlan(plan)}
                    >
                      {plan.isPopular && (
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                          <Badge className="bg-purple-500 text-white border-purple-400">
                            <Star className="w-3 h-3 mr-1" />
                            Most Popular
                          </Badge>
                        </div>
                      )}
                      {plan.isPremium && (
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                          <Badge className="bg-yellow-500 text-black border-yellow-400">Premium</Badge>
                        </div>
                      )}

                      <div className="text-center mb-4">
                        <div
                          className={`w-16 h-16 bg-gradient-to-r ${plan.gradient} rounded-full flex items-center justify-center mx-auto mb-3`}
                        >
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-1">{plan.name}</h3>
                        <div className="text-3xl font-bold text-white mb-1">{plan.dailyRate}%</div>
                        <div className="text-sm text-gray-400">Daily Rewards</div>
                      </div>

                      <div className="space-y-3 mb-6">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Min Stake:</span>
                          <span className="text-white">{plan.minStake} SOL</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Lock Period:</span>
                          <span className="text-white">{plan.lockPeriod} days</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">APY:</span>
                          <span className="text-green-400 font-medium">{plan.apy}%</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        {plan.features.map((feature, index) => (
                          <div key={index} className="flex items-center space-x-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                            <span className="text-gray-300">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )
                })}
              </div>

              <div className="flex justify-end mt-6">
                <Button
                  onClick={() => setStep(2)}
                  disabled={!selectedPlan}
                  className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 px-8"
                >
                  Continue
                </Button>
              </div>
            </>
          )}

          {/* Step 2: Amount & Confirmation */}
          {step === 2 && selectedPlan && (
            <>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-semibold text-white">Stake in {selectedPlan.name}</h2>
                  <p className="text-sm text-gray-400">Enter the amount you want to stake</p>
                </div>
                <Button onClick={onClose} variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column - Staking Form */}
                <div className="space-y-6">
                  {/* Available Balance */}
                  <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-blue-400">Available Balance</span>
                      <span className="text-lg font-semibold text-white">{availableBalance} SOL</span>
                    </div>
                  </div>

                  {/* Amount Input */}
                  <div className="space-y-3">
                    <Label htmlFor="stake-amount" className="text-sm font-medium text-gray-300">
                      Stake Amount (SOL)
                    </Label>
                    <div className="relative">
                      <Input
                        id="stake-amount"
                        type="number"
                        value={stakeAmount}
                        onChange={(e) => setStakeAmount(e.target.value)}
                        className="bg-gray-800/50 border-gray-700 text-white text-lg font-semibold pr-16"
                        placeholder="0.00"
                        step="0.01"
                        min={selectedPlan.minStake}
                        max={availableBalance}
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">SOL</div>
                    </div>

                    {/* Quick Amount Buttons */}
                    <div className="flex space-x-2">
                      <Button
                        onClick={() => setQuickAmount(25)}
                        variant="outline"
                        size="sm"
                        className="border-gray-700 text-gray-300 hover:bg-gray-800/50 bg-transparent"
                      >
                        25%
                      </Button>
                      <Button
                        onClick={() => setQuickAmount(50)}
                        variant="outline"
                        size="sm"
                        className="border-gray-700 text-gray-300 hover:bg-gray-800/50 bg-transparent"
                      >
                        50%
                      </Button>
                      <Button
                        onClick={() => setQuickAmount(75)}
                        variant="outline"
                        size="sm"
                        className="border-gray-700 text-gray-300 hover:bg-gray-800/50 bg-transparent"
                      >
                        75%
                      </Button>
                      <Button
                        onClick={() => setStakeAmount(availableBalance.toString())}
                        variant="outline"
                        size="sm"
                        className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10 bg-transparent"
                      >
                        Max
                      </Button>
                    </div>

                    {/* Minimum Stake Warning */}
                    {stakeAmount && Number.parseFloat(stakeAmount) < selectedPlan.minStake && (
                      <div className="text-red-400 text-sm">Minimum stake amount is {selectedPlan.minStake} SOL</div>
                    )}
                  </div>

                  {/* Auto-Compound Option */}
                  {(selectedPlan.id === "prime" || selectedPlan.id === "apex") && (
                    <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-medium text-green-400">Auto-Compound Rewards</div>
                          <div className="text-xs text-gray-400">Automatically reinvest daily rewards</div>
                        </div>
                        <Button
                          onClick={() => setAutoCompound(!autoCompound)}
                          variant={autoCompound ? "default" : "outline"}
                          size="sm"
                          className={
                            autoCompound
                              ? "bg-green-600 hover:bg-green-700"
                              : "border-green-500/30 text-green-400 hover:bg-green-500/10 bg-transparent"
                          }
                        >
                          {autoCompound ? "Enabled" : "Enable"}
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Column - Reward Calculator */}
                <div className="space-y-6">
                  <div className="p-4 bg-gray-800/30 rounded-lg border border-gray-700/50">
                    <div className="flex items-center space-x-2 mb-4">
                      <Calculator className="w-5 h-5 text-blue-400" />
                      <h3 className="text-lg font-semibold text-white">Reward Calculator</h3>
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Daily Reward:</span>
                        <span className="text-green-400 font-medium">
                          +<AnimatedCounter end={rewards.daily} suffix=" SOL" decimals={4} duration={1} />
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Total Rewards:</span>
                        <span className="text-blue-400 font-medium">
                          <AnimatedCounter end={rewards.total} suffix=" SOL" decimals={4} duration={1} />
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Final Amount:</span>
                        <span className="text-white font-semibold">
                          <AnimatedCounter
                            end={Number.parseFloat(stakeAmount || "0") + rewards.total}
                            suffix=" SOL"
                            decimals={4}
                            duration={1}
                          />
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Plan Summary */}
                  <div className="p-4 bg-gray-800/30 rounded-lg border border-gray-700/50">
                    <h3 className="text-lg font-semibold text-white mb-3">Plan Summary</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Plan:</span>
                        <span className="text-white">{selectedPlan.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Daily Rate:</span>
                        <span className="text-white">{selectedPlan.dailyRate}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Lock Period:</span>
                        <span className="text-white">{selectedPlan.lockPeriod} days</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">APY:</span>
                        <span className="text-green-400">{selectedPlan.apy}%</span>
                      </div>
                      {autoCompound && (
                        <div className="flex justify-between">
                          <span className="text-gray-400">Auto-Compound:</span>
                          <span className="text-green-400">Enabled</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between mt-6">
                <Button
                  onClick={() => setStep(1)}
                  variant="outline"
                  className="border-gray-700 text-gray-300 hover:bg-gray-800/50 bg-transparent"
                >
                  Back
                </Button>
                <Button
                  onClick={handleStake}
                  disabled={
                    !stakeAmount ||
                    Number.parseFloat(stakeAmount) < selectedPlan.minStake ||
                    Number.parseFloat(stakeAmount) > availableBalance ||
                    isLoading
                  }
                  className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 px-8"
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      <span>Creating Position...</span>
                    </div>
                  ) : (
                    `Stake ${stakeAmount || "0"} SOL`
                  )}
                </Button>
              </div>
            </>
          )}

          {/* Step 3: Success */}
          {step === 3 && selectedPlan && (
            <div className="text-center space-y-6">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-white mb-2">Staking Position Created!</h2>
                <p className="text-gray-400 mb-4">
                  You have successfully staked {stakeAmount} SOL in the {selectedPlan.name}
                </p>
                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <div className="text-sm text-green-400">
                    Your daily rewards of {rewards.daily.toFixed(4)} SOL will start accumulating immediately
                  </div>
                </div>
              </div>
              <Button
                onClick={onClose}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600"
              >
                Done
              </Button>
            </div>
          )}
        </Card>
      </motion.div>
    </motion.div>
  )
}
