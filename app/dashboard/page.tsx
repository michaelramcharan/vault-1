"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  ArrowLeft,
  Wallet,
  TrendingUp,
  Plus,
  Minus,
  Eye,
  EyeOff,
  ArrowUpRight,
  ArrowDownLeft,
  Clock,
  Shield,
  Zap,
  Bell,
  Settings,
  HelpCircle,
} from "lucide-react"
import { VaultLogo } from "@/components/vault-logo"
import { MorphingBackground } from "@/components/morphing-background"
import { FloatingParticles } from "@/components/floating-particles"
import { AnimatedCounter } from "@/components/animated-counter"
import { DepositModal } from "@/components/deposit-modal"
import { WithdrawModal } from "@/components/withdraw-modal"
import { NewStakingModal } from "@/components/new-staking-modal"
import { StakingPositions } from "@/components/staking-positions"
import { TransactionHistory } from "@/components/transaction-history"
import { PortfolioChart } from "@/components/portfolio-chart"
import { ReferralWidget } from "@/components/referral-widget"
import { SecurityWidget } from "@/components/security-widget"
import { NotificationToast, useNotifications } from "@/components/notification-toast"
import { useStaking } from "@/hooks/use-staking"

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [showBalance, setShowBalance] = useState(true)
  const [showDepositModal, setShowDepositModal] = useState(false)
  const [showWithdrawModal, setShowWithdrawModal] = useState(false)
  const [showNewStakingModal, setShowNewStakingModal] = useState(false)
  const { balance, isLoading: stakingLoading, activePositions } = useStaking()
  const { notifications, addNotification, removeNotification } = useNotifications()

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
      // Welcome notification
      addNotification({
        type: "info",
        title: "Welcome back!",
        message: "Your portfolio is ready for review.",
        duration: 4000,
      })
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  // Demo notifications for rewards only
  useEffect(() => {
    const interval = setInterval(() => {
      // Only show reward notifications
      addNotification({
        type: "success",
        title: "Rewards Earned",
        message: `You earned ${(Math.random() * 0.05 + 0.01).toFixed(4)} SOL from your staking positions`,
        duration: 6000,
      })
    }, 45000) // Every 45 seconds

    return () => clearInterval(interval)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.21, 1.11, 0.81, 0.99],
      },
    },
  }

  // Handle deposit success
  const handleDepositSuccess = (amount: number) => {
    addNotification({
      type: "success",
      title: "Deposit Submitted",
      message: `Your deposit of ${amount} SOL is being processed. You'll receive confirmation once verified.`,
      duration: 8000,
    })
  }

  // Handle withdrawal success
  const handleWithdrawSuccess = (amount: number) => {
    addNotification({
      type: "success",
      title: "Withdrawal Processed",
      message: `Your withdrawal of ${amount} SOL has been processed successfully.`,
      duration: 6000,
    })
  }

  // Handle staking success
  const handleStakingSuccess = (planName: string, amount: number) => {
    addNotification({
      type: "success",
      title: "Staking Position Created",
      message: `Successfully staked ${amount} SOL in ${planName}. Rewards will start accumulating immediately.`,
      duration: 8000,
    })
  }

  if (isLoading || stakingLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <MorphingBackground />
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="w-16 h-16 border-4 border-blue-500/20 border-t-blue-500 rounded-full mx-auto mb-6"
          />
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-2xl font-bold mb-2"
          >
            Loading Your Portfolio
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-gray-400"
          >
            Preparing your financial dashboard...
          </motion.p>
        </motion.div>
      </div>
    )
  }

  const portfolioChange =
    balance.totalRewards > 0 ? (balance.totalRewards / (balance.totalBalance - balance.totalRewards)) * 100 : 0

  return (
    <div className="min-h-screen bg-black text-white">
      <MorphingBackground />
      <FloatingParticles />

      {/* Notifications */}
      <NotificationToast notifications={notifications} onRemove={removeNotification} />

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-50 px-4 lg:px-6 py-6 border-b border-gray-800/50 backdrop-blur-xl"
      >
        <nav className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-4 lg:space-x-6">
            <Link href="/">
              <motion.div
                className="flex items-center space-x-3"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <VaultLogo width={180} height={50} className="h-12 w-auto" />
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
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-white relative"
              onClick={() =>
                addNotification({
                  type: "info",
                  title: "Notifications",
                  message: "You have 2 unread notifications",
                })
              }
            >
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs flex items-center justify-center text-white">
                2
              </span>
            </Button>
            <Link href="/settings">
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                <Settings className="w-5 h-5" />
              </Button>
            </Link>
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
              <HelpCircle className="w-5 h-5" />
            </Button>
          </div>
        </nav>
      </motion.header>

      {/* Main Content */}
      <main className="relative z-10 px-4 lg:px-6 py-6 lg:py-12">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section */}
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="mb-8">
            <motion.div
              variants={itemVariants}
              className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6"
            >
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold mb-2">
                  Welcome back,{" "}
                  <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    Investor
                  </span>
                </h1>
                <p className="text-gray-400 text-lg">Here's your portfolio overview</p>
              </div>
              <div className="flex items-center space-x-4 mt-4 lg:mt-0">
                <Button
                  onClick={() => setShowDepositModal(true)}
                  className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white px-6 py-2 rounded-full font-medium transition-all duration-300"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Deposit
                </Button>
                <Button
                  onClick={() => setShowWithdrawModal(true)}
                  variant="outline"
                  className="border-gray-700 text-gray-300 hover:bg-gray-800/50 hover:border-gray-600 hover:text-white px-6 py-2 rounded-full font-medium transition-all duration-300"
                >
                  <Minus className="w-4 h-4 mr-2" />
                  Withdraw
                </Button>
              </div>
            </motion.div>

            {/* Portfolio Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              <motion.div variants={itemVariants}>
                <Card className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border-blue-500/30 backdrop-blur-sm p-6 hover:border-blue-400/50 transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center">
                        <Wallet className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Total Portfolio</p>
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-white">
                            {showBalance ? (
                              <AnimatedCounter end={balance.totalBalance} suffix=" SOL" decimals={2} duration={1.5} />
                            ) : (
                              "••••••"
                            )}
                          </span>
                          <button
                            onClick={() => setShowBalance(!showBalance)}
                            className="text-gray-400 hover:text-white transition-colors"
                          >
                            {showBalance ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-green-400" />
                    <span className="text-green-400 text-sm font-medium">
                      +<AnimatedCounter end={portfolioChange} suffix="%" decimals={1} duration={1.5} />
                    </span>
                    <span className="text-gray-400 text-sm">from rewards</span>
                  </div>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm p-6 hover:border-blue-500/30 transition-all duration-300">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <Shield className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Staked Amount</p>
                      <div className="text-2xl font-bold text-white">
                        {showBalance ? (
                          <AnimatedCounter end={balance.stakedAmount} suffix=" SOL" decimals={2} duration={1.5} />
                        ) : (
                          "••••••"
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Zap className="w-4 h-4 text-blue-400" />
                    <span className="text-blue-400 text-sm font-medium">{activePositions.length} Active Positions</span>
                  </div>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm p-6 hover:border-blue-500/30 transition-all duration-300">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Total Rewards</p>
                      <div className="text-2xl font-bold text-white">
                        {showBalance ? (
                          <AnimatedCounter end={balance.totalRewards} suffix=" SOL" decimals={4} duration={1.5} />
                        ) : (
                          "••••••"
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-green-400" />
                    <span className="text-green-400 text-sm font-medium">Daily earnings</span>
                  </div>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm p-6 hover:border-blue-500/30 transition-all duration-300">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-lg flex items-center justify-center">
                      <Wallet className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Available Balance</p>
                      <div className="text-2xl font-bold text-white">
                        {showBalance ? (
                          <AnimatedCounter end={balance.availableBalance} suffix=" SOL" decimals={2} duration={1.5} />
                        ) : (
                          "••••••"
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-gray-400 text-sm">Ready to stake</span>
                  </div>
                </Card>
              </motion.div>
            </div>
          </motion.div>

          {/* Portfolio Chart and Quick Actions */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8"
          >
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <PortfolioChart />
            </motion.div>
            <motion.div variants={itemVariants}>
              <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm p-6 h-full">
                <h3 className="text-xl font-semibold mb-6">Quick Actions</h3>
                <div className="space-y-4">
                  <Button
                    onClick={() => setShowDepositModal(true)}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white py-3 rounded-lg font-medium transition-all duration-300 group"
                  >
                    <ArrowDownLeft className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                    Deposit SOL
                  </Button>
                  <Button
                    onClick={() => setShowWithdrawModal(true)}
                    variant="outline"
                    className="w-full border-gray-700 text-gray-300 hover:bg-gray-800/50 hover:border-gray-600 hover:text-white py-3 rounded-lg font-medium transition-all duration-300 group"
                  >
                    <ArrowUpRight className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                    Withdraw SOL
                  </Button>
                  <Button
                    onClick={() => setShowNewStakingModal(true)}
                    variant="outline"
                    className="w-full border-blue-500/30 text-blue-400 hover:bg-blue-500/10 hover:border-blue-400 hover:text-blue-300 py-3 rounded-lg font-medium transition-all duration-300 group bg-transparent"
                  >
                    <Plus className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                    New Staking Plan
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-gray-700 text-gray-300 hover:bg-gray-800/50 hover:border-gray-600 hover:text-white py-3 rounded-lg font-medium transition-all duration-300 group bg-transparent"
                    onClick={() =>
                      addNotification({
                        type: "success",
                        title: "Rewards Compounded",
                        message: "Your rewards have been automatically reinvested into your active positions",
                        duration: 6000,
                      })
                    }
                  >
                    <TrendingUp className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                    Compound Rewards
                  </Button>
                </div>
              </Card>
            </motion.div>
          </motion.div>

          {/* Main Dashboard Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8"
          >
            <motion.div variants={itemVariants} className="lg:col-span-2 space-y-6">
              <StakingPositions />
              <TransactionHistory />
            </motion.div>
            <motion.div variants={itemVariants} className="space-y-6">
              <ReferralWidget />
              <SecurityWidget />
            </motion.div>
          </motion.div>
        </div>
      </main>

      {/* Modals */}
      <AnimatePresence>
        {showDepositModal && <DepositModal onClose={() => setShowDepositModal(false)} />}
        {showWithdrawModal && <WithdrawModal onClose={() => setShowWithdrawModal(false)} />}
        {showNewStakingModal && <NewStakingModal onClose={() => setShowNewStakingModal(false)} />}
      </AnimatePresence>
    </div>
  )
}
