"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Shield, AlertTriangle } from "lucide-react"

interface TwoFactorVerifyProps {
  onVerify: (code: string) => Promise<boolean>
  onCancel: () => void
  title?: string
  description?: string
}

export function TwoFactorVerify({
  onVerify,
  onCancel,
  title = "Two-Factor Authentication",
  description = "Enter your 6-digit authentication code to continue",
}: TwoFactorVerifyProps) {
  const [code, setCode] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)
  const [error, setError] = useState("")

  const handleVerify = async () => {
    if (code.length !== 6) {
      setError("Please enter a 6-digit code")
      return
    }

    setIsVerifying(true)
    setError("")

    try {
      const isValid = await onVerify(code)
      if (!isValid) {
        setError("Invalid authentication code")
      }
    } catch (err) {
      setError("Verification failed. Please try again.")
    }

    setIsVerifying(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-md"
      >
        <Card className="bg-gray-900/95 border-gray-800/50 backdrop-blur-sm p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">{title}</h2>
              <p className="text-sm text-gray-400">{description}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="auth-code" className="text-sm font-medium text-gray-300">
                Authentication Code
              </Label>
              <Input
                id="auth-code"
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                className="bg-gray-800/50 border-gray-700 text-white text-center text-lg font-mono tracking-widest"
                placeholder="000000"
                maxLength={6}
                autoFocus
              />
            </div>

            {error && (
              <div className="flex items-center space-x-2 text-red-400 text-sm">
                <AlertTriangle className="w-4 h-4" />
                <span>{error}</span>
              </div>
            )}

            <div className="flex space-x-3">
              <Button
                onClick={onCancel}
                variant="outline"
                className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-800/50 bg-transparent"
              >
                Cancel
              </Button>
              <Button
                onClick={handleVerify}
                disabled={code.length !== 6 || isVerifying}
                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600"
              >
                {isVerifying ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    <span>Verifying...</span>
                  </div>
                ) : (
                  "Verify"
                )}
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  )
}
