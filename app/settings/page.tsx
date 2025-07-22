"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import {
  ArrowLeft,
  User,
  Shield,
  Bell,
  Globe,
  Key,
  Smartphone,
  Mail,
  MapPin,
  Eye,
  EyeOff,
  CheckCircle,
  AlertTriangle,
  Save,
} from "lucide-react"
import { VaultLogo } from "@/components/vault-logo"
import { MorphingBackground } from "@/components/morphing-background"
import { TwoFactorSetup } from "@/components/two-factor-setup"
import { NotificationToast, useNotifications } from "@/components/notification-toast"

export default function Settings() {
  const [activeTab, setActiveTab] = useState("profile")
  const [showTwoFactorSetup, setShowTwoFactorSetup] = useState(false)
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const { notifications, addNotification, removeNotification } = useNotifications()

  // Form states
  const [profileData, setProfileData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main Street",
    city: "New York",
    country: "United States",
    postalCode: "10001",
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    rewardNotifications: true,
    securityAlerts: true,
    marketingEmails: false,
  })

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "security", label: "Security", icon: Shield },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "preferences", label: "Preferences", icon: Globe },
  ]

  const handleSaveProfile = () => {
    addNotification({
      type: "success",
      title: "Profile Updated",
      message: "Your profile information has been saved successfully.",
    })
  }

  const handleChangePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      addNotification({
        type: "error",
        title: "Password Mismatch",
        message: "New password and confirmation do not match.",
      })
      return
    }

    addNotification({
      type: "success",
      title: "Password Changed",
      message: "Your password has been updated successfully.",
    })

    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    })
  }

  const handleTwoFactorComplete = (secret: string) => {
    setTwoFactorEnabled(true)
    setShowTwoFactorSetup(false)
    addNotification({
      type: "success",
      title: "2FA Enabled",
      message: "Two-factor authentication has been successfully enabled for your account.",
    })
  }

  const handleDisableTwoFactor = () => {
    setTwoFactorEnabled(false)
    addNotification({
      type: "info",
      title: "2FA Disabled",
      message: "Two-factor authentication has been disabled. Your account is less secure.",
    })
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
    <div className="min-h-screen bg-black text-white">
      <MorphingBackground />
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
            <div className="flex items-center space-x-6">
              <Link
                href="/dashboard"
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm">Back to Dashboard</span>
              </Link>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Main Content */}
      <main className="relative z-10 px-4 lg:px-6 py-6 lg:py-12">
        <div className="max-w-7xl mx-auto">
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            <motion.div variants={itemVariants} className="mb-8">
              <h1 className="text-3xl lg:text-4xl font-bold mb-2">Account Settings</h1>
              <p className="text-gray-400 text-lg">Manage your account preferences and security settings</p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Sidebar */}
              <motion.div variants={itemVariants} className="lg:col-span-1">
                <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm p-6">
                  <nav className="space-y-2">
                    {tabs.map((tab) => {
                      const Icon = tab.icon
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                            activeTab === tab.id
                              ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                              : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                          <span>{tab.label}</span>
                        </button>
                      )
                    })}
                  </nav>
                </Card>
              </motion.div>

              {/* Content */}
              <motion.div variants={itemVariants} className="lg:col-span-3">
                <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm p-6">
                  {/* Profile Tab */}
                  {activeTab === "profile" && (
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-2xl font-semibold mb-2">Profile Information</h2>
                        <p className="text-gray-400">Update your personal information and contact details</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="firstName" className="text-sm font-medium text-gray-300">
                            First Name
                          </Label>
                          <Input
                            id="firstName"
                            value={profileData.firstName}
                            onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                            className="bg-gray-800/50 border-gray-700 text-white"
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastName" className="text-sm font-medium text-gray-300">
                            Last Name
                          </Label>
                          <Input
                            id="lastName"
                            value={profileData.lastName}
                            onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                            className="bg-gray-800/50 border-gray-700 text-white"
                          />
                        </div>
                        <div>
                          <Label htmlFor="email" className="text-sm font-medium text-gray-300">
                            Email Address
                          </Label>
                          <div className="relative">
                            <Input
                              id="email"
                              type="email"
                              value={profileData.email}
                              onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                              className="bg-gray-800/50 border-gray-700 text-white pl-10"
                            />
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="phone" className="text-sm font-medium text-gray-300">
                            Phone Number
                          </Label>
                          <Input
                            id="phone"
                            value={profileData.phone}
                            onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                            className="bg-gray-800/50 border-gray-700 text-white"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <Label htmlFor="address" className="text-sm font-medium text-gray-300">
                            Address
                          </Label>
                          <div className="relative">
                            <Input
                              id="address"
                              value={profileData.address}
                              onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                              className="bg-gray-800/50 border-gray-700 text-white pl-10"
                            />
                            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="city" className="text-sm font-medium text-gray-300">
                            City
                          </Label>
                          <Input
                            id="city"
                            value={profileData.city}
                            onChange={(e) => setProfileData({ ...profileData, city: e.target.value })}
                            className="bg-gray-800/50 border-gray-700 text-white"
                          />
                        </div>
                        <div>
                          <Label htmlFor="country" className="text-sm font-medium text-gray-300">
                            Country
                          </Label>
                          <Input
                            id="country"
                            value={profileData.country}
                            onChange={(e) => setProfileData({ ...profileData, country: e.target.value })}
                            className="bg-gray-800/50 border-gray-700 text-white"
                          />
                        </div>
                        <div>
                          <Label htmlFor="postalCode" className="text-sm font-medium text-gray-300">
                            Postal Code
                          </Label>
                          <Input
                            id="postalCode"
                            value={profileData.postalCode}
                            onChange={(e) => setProfileData({ ...profileData, postalCode: e.target.value })}
                            className="bg-gray-800/50 border-gray-700 text-white"
                          />
                        </div>
                      </div>

                      <Button
                        onClick={handleSaveProfile}
                        className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </Button>
                    </div>
                  )}

                  {/* Security Tab */}
                  {activeTab === "security" && (
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-2xl font-semibold mb-2">Security Settings</h2>
                        <p className="text-gray-400">Manage your account security and authentication methods</p>
                      </div>

                      {/* Two-Factor Authentication */}
                      <div className="p-4 bg-gray-800/30 rounded-lg border border-gray-700/50">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <Smartphone className="w-5 h-5 text-blue-400" />
                            <div>
                              <h3 className="font-medium text-white">Two-Factor Authentication</h3>
                              <p className="text-sm text-gray-400">
                                {twoFactorEnabled
                                  ? "2FA is enabled for your account"
                                  : "Add an extra layer of security"}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            {twoFactorEnabled && (
                              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Enabled
                              </Badge>
                            )}
                            <Button
                              onClick={twoFactorEnabled ? handleDisableTwoFactor : () => setShowTwoFactorSetup(true)}
                              variant={twoFactorEnabled ? "outline" : "default"}
                              className={
                                twoFactorEnabled
                                  ? "border-red-500/30 text-red-400 hover:bg-red-500/10"
                                  : "bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600"
                              }
                            >
                              {twoFactorEnabled ? "Disable" : "Enable"}
                            </Button>
                          </div>
                        </div>
                        {!twoFactorEnabled && (
                          <div className="flex items-start space-x-2 text-yellow-400 text-sm">
                            <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                            <span>
                              Two-factor authentication is required for withdrawals. Enable it to secure your account.
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Change Password */}
                      <div className="p-4 bg-gray-800/30 rounded-lg border border-gray-700/50">
                        <div className="flex items-center space-x-3 mb-4">
                          <Key className="w-5 h-5 text-blue-400" />
                          <div>
                            <h3 className="font-medium text-white">Change Password</h3>
                            <p className="text-sm text-gray-400">Update your account password</p>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="currentPassword" className="text-sm font-medium text-gray-300">
                              Current Password
                            </Label>
                            <div className="relative">
                              <Input
                                id="currentPassword"
                                type={showCurrentPassword ? "text" : "password"}
                                value={passwordData.currentPassword}
                                onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                                className="bg-gray-800/50 border-gray-700 text-white pr-10"
                              />
                              <button
                                type="button"
                                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                              >
                                {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                              </button>
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="newPassword" className="text-sm font-medium text-gray-300">
                              New Password
                            </Label>
                            <div className="relative">
                              <Input
                                id="newPassword"
                                type={showNewPassword ? "text" : "password"}
                                value={passwordData.newPassword}
                                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                className="bg-gray-800/50 border-gray-700 text-white pr-10"
                              />
                              <button
                                type="button"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                              >
                                {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                              </button>
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-300">
                              Confirm New Password
                            </Label>
                            <Input
                              id="confirmPassword"
                              type="password"
                              value={passwordData.confirmPassword}
                              onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                              className="bg-gray-800/50 border-gray-700 text-white"
                            />
                          </div>
                          <Button
                            onClick={handleChangePassword}
                            disabled={
                              !passwordData.currentPassword ||
                              !passwordData.newPassword ||
                              !passwordData.confirmPassword
                            }
                            className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600"
                          >
                            Change Password
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Notifications Tab */}
                  {activeTab === "notifications" && (
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-2xl font-semibold mb-2">Notification Preferences</h2>
                        <p className="text-gray-400">Choose how you want to receive notifications</p>
                      </div>

                      <div className="space-y-4">
                        {Object.entries(notificationSettings).map(([key, value]) => (
                          <div key={key} className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg">
                            <div>
                              <h3 className="font-medium text-white capitalize">
                                {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                              </h3>
                              <p className="text-sm text-gray-400">
                                {key === "emailNotifications" && "Receive notifications via email"}
                                {key === "pushNotifications" && "Receive push notifications in browser"}
                                {key === "rewardNotifications" && "Get notified when you earn rewards"}
                                {key === "securityAlerts" && "Important security-related notifications"}
                                {key === "marketingEmails" && "Promotional emails and updates"}
                              </p>
                            </div>
                            <Button
                              onClick={() => setNotificationSettings({ ...notificationSettings, [key]: !value })}
                              variant={value ? "default" : "outline"}
                              className={
                                value
                                  ? "bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600"
                                  : "border-gray-700 text-gray-300 hover:bg-gray-800/50"
                              }
                            >
                              {value ? "Enabled" : "Disabled"}
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Preferences Tab */}
                  {activeTab === "preferences" && (
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-2xl font-semibold mb-2">Preferences</h2>
                        <p className="text-gray-400">Customize your experience</p>
                      </div>

                      <div className="space-y-4">
                        <div className="p-4 bg-gray-800/30 rounded-lg">
                          <h3 className="font-medium text-white mb-2">Language</h3>
                          <select className="w-full bg-gray-800/50 border border-gray-700 text-white rounded-lg px-3 py-2">
                            <option value="en">English</option>
                            <option value="es">Spanish</option>
                            <option value="fr">French</option>
                            <option value="de">German</option>
                          </select>
                        </div>

                        <div className="p-4 bg-gray-800/30 rounded-lg">
                          <h3 className="font-medium text-white mb-2">Timezone</h3>
                          <select className="w-full bg-gray-800/50 border border-gray-700 text-white rounded-lg px-3 py-2">
                            <option value="UTC">UTC</option>
                            <option value="EST">Eastern Time</option>
                            <option value="PST">Pacific Time</option>
                            <option value="GMT">Greenwich Mean Time</option>
                          </select>
                        </div>

                        <div className="p-4 bg-gray-800/30 rounded-lg">
                          <h3 className="font-medium text-white mb-2">Currency Display</h3>
                          <select className="w-full bg-gray-800/50 border border-gray-700 text-white rounded-lg px-3 py-2">
                            <option value="SOL">SOL</option>
                            <option value="USD">USD</option>
                            <option value="EUR">EUR</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Two-Factor Setup Modal */}
      {showTwoFactorSetup && (
        <TwoFactorSetup onComplete={handleTwoFactorComplete} onCancel={() => setShowTwoFactorSetup(false)} />
      )}
    </div>
  )
}
