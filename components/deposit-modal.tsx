"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X, ArrowDownLeft, Copy, ExternalLink, Upload, FileImage, CheckCircle } from "lucide-react"
import { useStaking } from "@/hooks/use-staking"

interface DepositModalProps {
  onClose: () => void
}

export function DepositModal({ onClose }: DepositModalProps) {
  const [amount, setAmount] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [uploadPreview, setUploadPreview] = useState<string | null>(null)
  const [depositStep, setDepositStep] = useState<"form" | "confirmation">("form")
  const { deposit } = useStaking()
  const depositAddress = "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU"

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type.startsWith("image/")) {
      setUploadedFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setUploadPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDeposit = async () => {
    if (!amount || Number.parseFloat(amount) <= 0) return

    setIsLoading(true)
    try {
      // Simulate deposit process
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Add the deposited amount to the user's balance
      const success = await deposit(Number.parseFloat(amount))

      if (success) {
        setDepositStep("confirmation")
        // Auto close after showing confirmation
        setTimeout(() => {
          onClose()
        }, 3000)
      }
    } catch (error) {
      console.error("Deposit failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const copyAddress = () => {
    navigator.clipboard.writeText(depositAddress)
  }

  if (depositStep === "confirmation") {
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
          <Card className="bg-gray-900/95 border-gray-800/50 backdrop-blur-sm p-6 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 25 }}
              className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <CheckCircle className="w-8 h-8 text-white" />
            </motion.div>
            <h2 className="text-xl font-semibold text-white mb-2">Deposit Submitted!</h2>
            <p className="text-gray-400 mb-4">
              Your deposit of {amount} SOL has been submitted for verification.
              {uploadedFile && " Your receipt has been uploaded for admin review."}
            </p>
            <p className="text-sm text-gray-500">
              Funds will be available after admin verification (usually within 1-2 hours)
            </p>
          </Card>
        </motion.div>
      </motion.div>
    )
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
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                <ArrowDownLeft className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">Deposit SOL</h2>
                <p className="text-sm text-gray-400">Add funds to your wallet</p>
              </div>
            </div>
            <Button onClick={onClose} variant="ghost" size="sm" className="text-gray-400 hover:text-white">
              <X className="w-5 h-5" />
            </Button>
          </div>

          <div className="space-y-6">
            {/* Deposit Address */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-300">Deposit Address</Label>
              <div className="flex items-center space-x-2 p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                <span className="text-sm text-gray-300 font-mono flex-1 truncate">{depositAddress}</span>
                <Button onClick={copyAddress} variant="ghost" size="sm" className="text-gray-400 hover:text-white p-1">
                  <Copy className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-1">
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-gray-500">Only send SOL to this address. Other tokens will be lost.</p>
            </div>

            {/* Amount Input */}
            <div className="space-y-2">
              <Label htmlFor="amount" className="text-sm font-medium text-gray-300">
                Amount (SOL)
              </Label>
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

            {/* Quick Amount Buttons */}
            <div className="grid grid-cols-4 gap-2">
              {[1, 5, 10, 25].map((value) => (
                <Button
                  key={value}
                  onClick={() => setAmount(value.toString())}
                  variant="outline"
                  size="sm"
                  className="border-gray-700 text-gray-300 hover:bg-gray-800/50 hover:border-gray-600 hover:text-white"
                >
                  {value}
                </Button>
              ))}
            </div>

            {/* Receipt Upload */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-300">
                Upload Transfer Receipt <span className="text-gray-500">(Optional)</span>
              </Label>
              <div className="border-2 border-dashed border-gray-700 rounded-lg p-4 hover:border-gray-600 transition-colors">
                {uploadPreview ? (
                  <div className="space-y-3">
                    <img
                      src={uploadPreview || "/placeholder.svg"}
                      alt="Receipt preview"
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <FileImage className="w-4 h-4 text-green-400" />
                        <span className="text-sm text-gray-300 truncate">{uploadedFile?.name}</span>
                      </div>
                      <Button
                        onClick={() => {
                          setUploadedFile(null)
                          setUploadPreview(null)
                        }}
                        variant="ghost"
                        size="sm"
                        className="text-gray-400 hover:text-white"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <label className="cursor-pointer block text-center">
                    <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-400 mb-1">Click to upload receipt</p>
                    <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                  </label>
                )}
              </div>
              <p className="text-xs text-gray-500">
                Upload your transfer receipt to help admins verify your deposit faster
              </p>
            </div>

            {/* Deposit Button */}
            <Button
              onClick={handleDeposit}
              disabled={!amount || Number.parseFloat(amount) <= 0 || isLoading}
              className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white py-3 rounded-lg font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  <span>Processing...</span>
                </div>
              ) : (
                `Submit Deposit Request`
              )}
            </Button>

            <div className="text-xs text-gray-500 text-center">
              Deposits are manually verified by admins. Processing time: 1-2 hours during business hours.
            </div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  )
}
