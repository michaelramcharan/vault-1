"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, Copy, Share2, TrendingUp, Wallet, CheckCircle } from "lucide-react"
import { AnimatedCounter } from "@/components/animated-counter"

export function ReferralWidget() {
  const [referralCode] = useState("VAULT2024XYZ")
  const [copied, setCopied] = useState(false)

  // Updated referral stats - only earnings from staking investments
  const referralStats = {
    totalReferrals: 12,
    activeStakers: 8, // Referrals who have active staking positions
    totalEarnings: 2.4567, // 15% commission from referral staking rewards
    thisMonth: 0.8234,
  }

  const copyReferralLink = () => {
    const referralLink = `https://vault.finance/signup?ref=${referralCode}`
    navigator.clipboard.writeText(referralLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const shareReferral = () => {
    const referralLink = `https://vault.finance/signup?ref=${referralCode}`
    const text = `Join me on Vault Finance and start earning up to 2.2% daily rewards on your SOL! Use my referral link: ${referralLink}`

    if (navigator.share) {
      navigator.share({
        title: "Join Vault Finance",
        text: text,
        url: referralLink,
      })
    } else {
      // Fallback to copying
      navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
          <Users className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white">Referral Program</h3>
          <p className="text-sm text-gray-400">Earn 15% from referral staking rewards</p>
        </div>
      </div>

      {/* Referral Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-3 bg-gray-800/30 rounded-lg">
          <div className="flex items-center space-x-2 mb-1">
            <Users className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-gray-400">Total Referrals</span>
          </div>
          <div className="text-2xl font-bold text-white">
            <AnimatedCounter end={referralStats.totalReferrals} duration={1} />
          </div>
        </div>
        <div className="p-3 bg-gray-800/30 rounded-lg">
          <div className="flex items-center space-x-2 mb-1">
            <TrendingUp className="w-4 h-4 text-green-400" />
            <span className="text-sm text-gray-400">Active Stakers</span>
          </div>
          <div className="text-2xl font-bold text-white">
            <AnimatedCounter end={referralStats.activeStakers} duration={1} />
          </div>
        </div>
      </div>

      {/* Earnings */}
      <div className="p-4 bg-gradient-to-r from-green-500/10 to-green-600/10 border border-green-500/20 rounded-lg mb-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <Wallet className="w-4 h-4 text-green-400" />
            <span className="text-sm text-green-400 font-medium">Commission Earnings</span>
          </div>
          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">15% Rate</Badge>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-gray-400">Total Earned</div>
            <div className="text-lg font-semibold text-white">
              <AnimatedCounter end={referralStats.totalEarnings} suffix=" SOL" decimals={4} duration={1.5} />
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-400">This Month</div>
            <div className="text-lg font-semibold text-green-400">
              +<AnimatedCounter end={referralStats.thisMonth} suffix=" SOL" decimals={4} duration={1.5} />
            </div>
          </div>
        </div>
      </div>

      {/* How it Works */}
      <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg mb-6">
        <h4 className="text-sm font-medium text-blue-400 mb-2">How Referral Rewards Work</h4>
        <ul className="text-xs text-gray-300 space-y-1">
          <li>• Invite friends to join Vault Finance</li>
          <li>• Earn 15% commission when they stake in any plan</li>
          <li>• Commission is calculated from their staking rewards</li>
          <li>• Earnings are added to your available balance</li>
          <li>• No limit on referrals or earnings</li>
        </ul>
      </div>

      {/* Referral Link */}
      <div className="space-y-3">
        <div>
          <label className="text-sm font-medium text-gray-300 mb-2 block">Your Referral Code</label>
          <div className="flex items-center space-x-2">
            <div className="flex-1 bg-gray-800/50 border border-gray-700 rounded-lg px-3 py-2">
              <code className="text-sm font-mono text-blue-400">{referralCode}</code>
            </div>
            <Button
              onClick={copyReferralLink}
              size="sm"
              className={`${
                copied ? "bg-green-600 hover:bg-green-700" : "bg-gray-700 hover:bg-gray-600"
              } transition-colors`}
            >
              {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        <div className="flex space-x-2">
          <Button
            onClick={copyReferralLink}
            variant="outline"
            className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-800/50 bg-transparent"
          >
            <Copy className="w-4 h-4 mr-2" />
            Copy Link
          </Button>
          <Button
            onClick={shareReferral}
            variant="outline"
            className="flex-1 border-blue-500/30 text-blue-400 hover:bg-blue-500/10 bg-transparent"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>
      </div>
    </Card>
  )
}
