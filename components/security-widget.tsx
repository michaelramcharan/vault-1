"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Shield, Smartphone, Key, AlertTriangle, CheckCircle, FileCheck, Camera } from "lucide-react"
import { KYCModal } from "@/components/kyc-modal"

export function SecurityWidget() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
  const [emailVerified] = useState(true)
  const [phoneVerified] = useState(false)
  const [kycVerified, setKycVerified] = useState(false)
  const [showKYCModal, setShowKYCModal] = useState(false)

  const securityScore =
    (emailVerified ? 25 : 0) + (twoFactorEnabled ? 25 : 0) + (phoneVerified ? 25 : 0) + (kycVerified ? 25 : 0)

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-400"
    if (score >= 60) return "text-yellow-400"
    return "text-red-400"
  }

  const getScoreBg = (score: number) => {
    if (score >= 80) return "from-green-500 to-green-600"
    if (score >= 60) return "from-yellow-500 to-yellow-600"
    return "from-red-500 to-red-600"
  }

  const handleKYCSuccess = () => {
    setKycVerified(true)
  }

  return (
    <>
      <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div
              className={`w-10 h-10 bg-gradient-to-r ${getScoreBg(securityScore)} rounded-lg flex items-center justify-center`}
            >
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">Security</h3>
              <p className="text-sm text-gray-400">Account protection status</p>
            </div>
          </div>
          <div className="text-right">
            <div className={`text-2xl font-bold ${getScoreColor(securityScore)}`}>{securityScore}%</div>
            <div className="text-xs text-gray-400">Security Score</div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <div>
                <div className="text-sm font-medium text-white">Email Verification</div>
                <div className="text-xs text-gray-400">Your email is verified</div>
              </div>
            </div>
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Active</Badge>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
            <div className="flex items-center space-x-3">
              <Smartphone className={`w-5 h-5 ${twoFactorEnabled ? "text-green-400" : "text-gray-400"}`} />
              <div>
                <div className="text-sm font-medium text-white">Two-Factor Authentication</div>
                <div className="text-xs text-gray-400">
                  {twoFactorEnabled ? "2FA is enabled" : "Enable 2FA for better security"}
                </div>
              </div>
            </div>
            <Button
              size="sm"
              onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
              className={
                twoFactorEnabled
                  ? "bg-green-500/20 text-green-400 border-green-500/30 hover:bg-green-500/30"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }
            >
              {twoFactorEnabled ? "Enabled" : "Enable"}
            </Button>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
            <div className="flex items-center space-x-3">
              <Key className="w-5 h-5 text-gray-400" />
              <div>
                <div className="text-sm font-medium text-white">Phone Verification</div>
                <div className="text-xs text-gray-400">Add phone number for recovery</div>
              </div>
            </div>
            <Button
              size="sm"
              variant="outline"
              className="border-gray-700 text-gray-300 hover:bg-gray-800/50 bg-transparent"
            >
              Add Phone
            </Button>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
            <div className="flex items-center space-x-3">
              <FileCheck className={`w-5 h-5 ${kycVerified ? "text-green-400" : "text-gray-400"}`} />
              <div>
                <div className="text-sm font-medium text-white">KYC Verification</div>
                <div className="text-xs text-gray-400">
                  {kycVerified ? "Identity verified" : "Verify your identity to unlock all features"}
                </div>
              </div>
            </div>
            <Button
              size="sm"
              onClick={() => setShowKYCModal(true)}
              className={
                kycVerified
                  ? "bg-green-500/20 text-green-400 border-green-500/30 hover:bg-green-500/30"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }
              disabled={kycVerified}
            >
              {kycVerified ? (
                <div className="flex items-center space-x-1">
                  <CheckCircle className="w-3 h-3" />
                  <span>Verified</span>
                </div>
              ) : (
                <div className="flex items-center space-x-1">
                  <Camera className="w-3 h-3" />
                  <span>Verify</span>
                </div>
              )}
            </Button>
          </div>

          {securityScore < 100 && (
            <div className="flex items-start space-x-3 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-sm font-medium text-yellow-400">Security Recommendation</div>
                <div className="text-xs text-gray-300 mt-1">
                  {!kycVerified && "Complete KYC verification to unlock all features. "}
                  {!twoFactorEnabled && "Enable 2FA for enhanced security. "}
                  {!phoneVerified && "Add phone verification for account recovery."}
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>

      <KYCModal isOpen={showKYCModal} onClose={() => setShowKYCModal(false)} onSuccess={handleKYCSuccess} />
    </>
  )
}
