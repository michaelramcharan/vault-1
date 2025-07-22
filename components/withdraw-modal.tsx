"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X, ArrowUpRight, AlertTriangle, Shield } from "lucide-react"
import { TwoFactorVerify } from "@/components/two-factor-verify"

interface WithdrawModalProps {
  onClose: () => void
}

export function WithdrawModal({ onClose }: WithdrawModalProps) {
  const [step, setStep] = useState(1) // 1: Form, 2: 2FA Verification, 3: Success
  const [amount, setAmount] = useState("")
  const [address, setAddress] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showTwoFactorVerify, setShowTwoFactorVerify] = useState(false)
  const availableBalance = 1596.9

  const handleWithdraw = async () => {
    if (!amount || !address || Number.parseFloat(amount) <= 0) return

    // Check if 2FA is enabled (in real app, check from user settings)
    const twoFactorEnabled = true // This would come from user settings

    if (!twoFactorEnabled) {
      // Show error that 2FA is required
      alert("Two-factor authentication is required for withdrawals. Please enable 2FA in your settings.")
      return
    }

    setShowTwoFactorVerify(true)
  }

  const handleTwoFactorVerify = async (code: string): Promise<boolean> => {
    setIsLoading(true)

    // Simulate 2FA verification
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // For demo, accept any 6-digit code
    if (code.length === 6) {
      setShowTwoFactorVerify(false)
      setStep(3) // Success step
      setIsLoading(false)
      return true
    }

    setIsLoading(false)
    return false
  }

  const setMaxAmount = () => {
    setAmount((availableBalance / 100).toString()) // Convert from USD to SOL (approximate)
  }

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
        className="w-full max-w-md"
      >
        <Card className="bg-gray-900/95 border-gray-800/50 backdrop-blur-sm p-6">
          {step === 1 && (
            <>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-red-600 rounded-lg flex items-center justify-center">
                    <ArrowUpRight className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-white">Withdraw SOL</h2>
                    <p className="text-sm text-gray-400">Send funds to external wallet</p>
                  </div>
                </div>
                <Button onClick={onClose} variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="space-y-6">
                {/* Available Balance */}
                <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-blue-400">Available Balance</span>
                    <span className="text-lg font-semibold text-white">${availableBalance.toFixed(2)}</span>
                  </div>
                </div>

                {/* Recipient Address */}
                <div className="space-y-2">
                  <Label htmlFor="address" className="text-sm font-medium text-gray-300">
                    Recipient Address
                  </Label>
                  <Input
                    id="address"
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500/20 font-mono text-sm"
                    placeholder="Enter Solana wallet address"
                  />
                </div>

                {/* Amount Input */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="amount" className="text-sm font-medium text-gray-300">
                      Amount (SOL)
                    </Label>
                    <Button
                      onClick={setMaxAmount}
                      variant="ghost"
                      size="sm"
                      className="text-blue-400 hover:text-blue-300 text-xs"
                    >
                      Max
                    </Button>
                  </div>
                  <div className="relative">
                    <Input
                      id="amount"
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500/20"
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">SOL</div>
                  </div>
                </div>

                {/* 2FA Required Notice */}
                <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Shield className="w-4 h-4 text-blue-400" />
                    <span className="text-sm text-blue-400 font-medium">Security Verification Required</span>
                  </div>
                  <div className="text-xs text-gray-400">
                    Two-factor authentication is required to complete this withdrawal
                  </div>
                </div>

                {/* Network Fee Info */}
                <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <AlertTriangle className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm text-yellow-400 font-medium">Network Fee</span>
                  </div>
                  <div className="text-xs text-gray-400">
                    A small network fee (~0.000005 SOL) will be deducted from your withdrawal
                  </div>
                </div>

                {/* Withdraw Button */}
                <Button
                  onClick={handleWithdraw}
                  disabled={!amount || !address || Number.parseFloat(amount) <= 0 || isLoading}
                  className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white py-3 rounded-lg font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      <span>Processing...</span>
                    </div>
                  ) : (
                    `Withdraw ${amount || "0"} SOL`
                  )}
                </Button>

                <div className="text-xs text-gray-500 text-center">
                  Withdrawals are processed immediately and cannot be reversed
                </div>
              </div>
            </>
          )}

          {step === 3 && (
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto">
                <ArrowUpRight className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-white mb-2">Withdrawal Successful</h2>
                <p className="text-gray-400">
                  Your withdrawal of {amount} SOL has been processed successfully and sent to your wallet.
                </p>
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

      {/* Two-Factor Verification Modal */}
      <AnimatePresence>
        {showTwoFactorVerify && (
          <TwoFactorVerify
            onVerify={handleTwoFactorVerify}
            onCancel={() => setShowTwoFactorVerify(false)}
            title="Verify Withdrawal"
            description="Enter your 6-digit authentication code to confirm this withdrawal"
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}
