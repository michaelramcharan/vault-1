"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, Star, Zap, Shield, Crown, Rocket } from "lucide-react"
import { VaultLogo } from "@/components/vault-logo"
import { StakingPlanCard } from "@/components/staking-plan-card"
import { MorphingBackground } from "@/components/morphing-background"
import { FloatingParticles } from "@/components/floating-particles"
import { useStaking } from "@/hooks/use-staking"

export default function StakingPlans() {
  const { balance } = useStaking()

  const stakingPlans = [
    {
      id: "core",
      name: "Core Plan",
      apy: "0.8%",
      minStake: "0.1 SOL",
      lockPeriod: "15 Days",
      dailyRewards: "0.8%",
      dailyRate: 0.8,
      lockDays: 15,
      features: [
        "Entry-level staking option",
        "Minimal lock-up requirements",
        "Fast turnaround",
        "Perfect for testing waters",
      ],
      description: "Short-term staking, long-term confidence. Perfect for agile portfolio movements.",
      icon: Star,
    },
    {
      id: "prime",
      name: "Prime Plan",
      apy: "1.3%",
      minStake: "5 SOL",
      lockPeriod: "30 Days",
      dailyRewards: "1.3%",
      dailyRate: 1.3,
      lockDays: 30,
      features: ["Optimized yield curves", "Smart rebalancing", "Enhanced capital efficiency", "Strategic compounding"],
      description: "Multiply your stake with optimized yield curves and automated growth.",
      popular: true,
      icon: Zap,
    },
    {
      id: "apex",
      name: "Apex Plan",
      apy: "2.2%",
      minStake: "10 SOL",
      lockPeriod: "60 Days",
      dailyRewards: "2.2%",
      dailyRate: 2.2,
      lockDays: 60,
      features: ["Peak daily yield", "Advanced liquidity engine", "Aggressive compounding", "Premium-tier benefits"],
      description: "Unlock next-level returns with smart compounding and top-tier staking mechanics.",
      premium: true,
      icon: Crown,
    },
  ]

  const handlePlanSelect = (planId: string) => {
    console.log("Selected plan:", planId)
    // Plan selection is now handled within the StakingPlanCard component
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <MorphingBackground />
      <FloatingParticles />

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-50 px-6 py-6 border-b border-gray-800/50 backdrop-blur-xl"
      >
        <nav className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-6">
            <Link href="/">
              <motion.div
                className="flex items-center space-x-3"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <VaultLogo width={240} height={65} className="h-16 w-auto" />
              </motion.div>
            </Link>
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/" className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm">Back to Home</span>
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/signin">
              <Button className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-6 py-2 rounded-full font-medium transition-all duration-300 group relative overflow-hidden">
                <motion.div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Rocket className="w-4 h-4 mr-2 relative z-10" />
                <span className="relative z-10">Launch App</span>
              </Button>
            </Link>
          </div>
        </nav>
      </motion.header>

      {/* Main Content */}
      <main className="relative z-10 px-6 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Vault{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Staking</span>{" "}
              Plans
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Choose your staking plan and start earning daily rewards with institutional-grade security
            </p>
          </motion.div>

          {/* Staking Plans */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-12"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Choose Your Staking Plan</h2>
              <p className="text-gray-400">Select the plan that best fits your investment strategy</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {stakingPlans.map((plan, index) => (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                >
                  <StakingPlanCard plan={plan} onSelect={handlePlanSelect} />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Shield className="w-6 h-6 text-blue-400" />
                <h3 className="text-xl font-semibold">Security First</h3>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Your assets are protected by multi-signature wallets, insurance coverage, and institutional-grade
                security protocols. We prioritize the safety of your investments above all else.
              </p>
            </Card>

            <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Zap className="w-6 h-6 text-cyan-400" />
                <h3 className="text-xl font-semibold">Instant Rewards</h3>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Earn daily rewards that are automatically distributed to your wallet. Watch your SOL grow with our
                optimized staking algorithms and compound interest features.
              </p>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
