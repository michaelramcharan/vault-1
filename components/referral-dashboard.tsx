"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Users, DollarSign, Copy, Share2, TrendingUp, Gift, Star, CheckCircle } from "lucide-react"
import { AnimatedCounter } from "@/components/animated-counter"
import { stakingService } from "@/lib/staking-service"

export function ReferralDashboard() {
  const [referralData] = useState(() => stakingService.getReferralData())
  const [copied, setCopied] = useState(false)

  const referralUrl = `https://vault.com/signup?ref=${referralData.code}`

  const copyReferralCode = () => {
    navigator.clipboard.writeText(referralData.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const copyReferralUrl = () => {
    navigator.clipboard.writeText(referralUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const shareReferral = () => {
    if (navigator.share) {
      navigator.share({
        title: "Join Vault - Premium Solana Staking",
        text: "Earn up to 87.6% APY with institutional-grade security. Use my referral code for exclusive benefits!",
        url: referralUrl,
      })
    } else {
      copyReferralUrl()
    }
  }

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

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="text-center space-y-4">
        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-full px-4 py-2">
          <Gift className="w-4 h-4 text-purple-400" />
          <span className="text-sm font-medium text-purple-300">Referral Program</span>
        </div>
        <h2 className="text-3xl lg:text-4xl font-bold">
          <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Earn More with
          </span>{" "}
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Referrals
          </span>
        </h2>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Earn {(referralData.commissionRate * 100).toFixed(1)}% commission on all staking rewards from users you refer
        </p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <motion.div variants={itemVariants}>
          <Card className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-purple-500/30 backdrop-blur-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Total Referrals</p>
                  <div className="text-2xl font-bold text-white">
                    <AnimatedCounter end={referralData.totalReferrals} duration={1.5} />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <span className="text-green-400 text-sm font-medium">Active referrals</span>
            </div>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 border-green-500/30 backdrop-blur-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Total Earned</p>
                  <div className="text-2xl font-bold text-white">
                    <AnimatedCounter end={referralData.totalCommission} suffix=" SOL" decimals={4} duration={1.5} />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="w-4 h-4 text-yellow-400" />
              <span className="text-yellow-400 text-sm font-medium">Commission earned</span>
            </div>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border-blue-500/30 backdrop-blur-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Commission Rate</p>
                  <div className="text-2xl font-bold text-white">
                    {(referralData.commissionRate * 100).toFixed(1)}%
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-blue-400" />
              <span className="text-blue-400 text-sm font-medium">On all rewards</span>
            </div>
          </Card>
        </motion.div>
      </motion.div>

      {/* Referral Code Section */}
      <motion.div variants={itemVariants}>
        <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Your Referral Code</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-300">Referral Code</Label>
              <div className="flex items-center space-x-2">
                <Input
                  value={referralData.code}
                  readOnly
                  className="bg-gray-800/50 border-gray-700 text-white font-mono"
                />
                <Button
                  onClick={copyReferralCode}
                  variant="outline"
                  className="border-gray-700 text-gray-300 hover:bg-gray-800/50 bg-transparent"
                >
                  {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-300">Referral URL</Label>
              <div className="flex items-center space-x-2">
                <Input
                  value={referralUrl}
                  readOnly
                  className="bg-gray-800/50 border-gray-700 text-white text-sm"
                />
                <Button
                  onClick={copyReferralUrl}
                  variant="outline"
                  className="border-gray-700 text-gray-300 hover:bg-gray-800/50 bg-transparent"
                >
                  <Copy className="w-4 h-4" />
                </Button>
                <Button
                  onClick={shareReferral}
                  className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white"
                >
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* How It Works */}
      <motion.div variants={itemVariants}>
        <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm p-6">
          <h3 className="text-xl font-semibold text-white mb-6">How Referrals Work</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: "1",
                title: "Share Your Code",
                description: "Share your unique referral code or link with friends and family",
                icon: Share2,
              },
              {
                step: "2",
                title: "They Start Staking",\
                description: "When they sign up and start
