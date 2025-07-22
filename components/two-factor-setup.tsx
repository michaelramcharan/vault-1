"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Shield, Smartphone, Copy, CheckCircle, AlertTriangle } from "lucide-react"
import QRCode from "qrcode"

interface TwoFactorSetupProps {
  onComplete: (secret: string) => void
  onCancel: () => void
}

export function TwoFactorSetup({ onComplete, onCancel }: TwoFactorSetupProps) {
  const [step, setStep] = useState(1)
  const [secret] = useState("JBSWY3DPEHPK3PXP") // In real app, generate this server-side
  const [qrCodeUrl, setQrCodeUrl] = useState("")
  const [verificationCode, setVerificationCode] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)
  const [error, setError] = useState("")

  // Generate QR code when component mounts
  useState(() => {
    const generateQR = async () => {
      const otpauth = `otpauth://totp/Vault:user@example.com?secret=${secret}&issuer=Vault`
      try {
        const url = await QRCode.toDataURL(otpauth)
        setQrCodeUrl(url)
      } catch (err) {
        console.error("Error generating QR code:", err)
      }
    }
    generateQR()
  })

  const copySecret = () => {
    navigator.clipboard.writeText(secret)
  }

  const verifyCode = async () => {
    if (verificationCode.length !== 6) {
      setError("Please enter a 6-digit code")
      return
    }

    setIsVerifying(true)
    setError("")

    // Simulate verification (in real app, verify with server)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // For demo, accept any 6-digit code
    if (verificationCode.length === 6) {
      onComplete(secret)
    } else {
      setError("Invalid verification code")
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
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">Setup Two-Factor Authentication</h2>
              <p className="text-sm text-gray-400">Secure your account with 2FA</p>
            </div>
          </div>

          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-lg font-medium text-white mb-2">Step 1: Scan QR Code</h3>
                <p className="text-sm text-gray-400 mb-4">
                  Use Google Authenticator or any TOTP app to scan this QR code
                </p>

                {qrCodeUrl && (
                  <div className="bg-white p-4 rounded-lg inline-block mb-4">
                    <img src={qrCodeUrl || "/placeholder.svg"} alt="2FA QR Code" className="w-48 h-48" />
                  </div>
                )}

                <div className="bg-gray-800/50 p-3 rounded-lg">
                  <p className="text-xs text-gray-400 mb-2">Or enter this secret manually:</p>
                  <div className="flex items-center space-x-2">
                    <code className="text-sm font-mono text-white bg-gray-700/50 px-2 py-1 rounded flex-1">
                      {secret}
                    </code>
                    <Button onClick={copySecret} size="sm" variant="ghost">
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <Button
                onClick={() => setStep(2)}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600"
              >
                <Smartphone className="w-4 h-4 mr-2" />
                I've Added the Account
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-lg font-medium text-white mb-2">Step 2: Verify Setup</h3>
                <p className="text-sm text-gray-400 mb-4">Enter the 6-digit code from your authenticator app</p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="verification-code" className="text-sm font-medium text-gray-300">
                    Verification Code
                  </Label>
                  <Input
                    id="verification-code"
                    type="text"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    className="bg-gray-800/50 border-gray-700 text-white text-center text-lg font-mono tracking-widest"
                    placeholder="000000"
                    maxLength={6}
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
                    onClick={verifyCode}
                    disabled={verificationCode.length !== 6 || isVerifying}
                    className="flex-1 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600"
                  >
                    {isVerifying ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                        <span>Verifying...</span>
                      </div>
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Verify & Enable
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Card>
      </motion.div>
    </motion.div>
  )
}
