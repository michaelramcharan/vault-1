"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import {
  Settings,
  Users,
  TrendingUp,
  Eye,
  EyeOff,
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  BarChart3,
  DollarSign,
  Percent,
  Shield,
  Bell,
  Globe,
  Database,
  Activity,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Mail,
  Lock,
  Unlock,
  Ban,
  UserCheck,
  FileText,
  Download,
  RefreshCw,
  Search,
  PieChart,
  BarChart,
  TrendingDown,
  Zap,
  Server,
  HardDrive,
  Cpu,
  MemoryStick,
  Network,
  Code,
  Terminal,
  Bug,
  Cog,
  Sliders,
  Power,
} from "lucide-react"
import { VaultLogo } from "@/components/vault-logo"
import { MorphingBackground } from "@/components/morphing-background"

interface StakingPlan {
  id: string
  name: string
  dailyRate: number
  minStakeAmount: number
  lockPeriodDays: number
  apy: number
  isActive: boolean
  isPopular: boolean
  isPremium: boolean
  features: string[]
  description?: string
  maxStakeAmount?: number
  earlyWithdrawalFee?: number
  compoundingEnabled?: boolean
  autoReinvest?: boolean
}

interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  status: "active" | "suspended" | "pending" | "banned"
  totalStaked: number
  totalRewards: number
  joinDate: string
  lastLogin: string
  kycStatus: "pending" | "approved" | "rejected"
  twoFactorEnabled: boolean
  referralCode: string
  referredBy?: string
  totalReferrals: number
  country: string
  riskLevel: "low" | "medium" | "high"
}

interface SystemSettings {
  // Platform Settings
  platformName: string
  platformDescription: string
  supportEmail: string
  supportPhone: string
  maintenanceMode: boolean
  registrationEnabled: boolean
  kycRequired: boolean

  // Staking Settings
  minStakeAmount: number
  maxStakeAmount: number
  stakingEnabled: boolean
  compoundingEnabled: boolean
  autoReinvestEnabled: boolean

  // Withdrawal Settings
  minWithdrawalAmount: number
  maxWithdrawalAmount: number
  maxDailyWithdrawals: number
  withdrawalFee: number
  withdrawalProcessingTime: number
  withdrawalsEnabled: boolean

  // Referral Settings
  referralEnabled: boolean
  referralCommissionRate: number
  referralBonusEnabled: boolean
  newUserBonus: number
  referralTiers: number

  // Security Settings
  twoFactorRequired: boolean
  sessionTimeout: number
  maxLoginAttempts: number
  passwordMinLength: number
  ipWhitelistEnabled: boolean

  // Notification Settings
  emailNotificationsEnabled: boolean
  smsNotificationsEnabled: boolean
  pushNotificationsEnabled: boolean
  marketingEmailsEnabled: boolean

  // API Settings
  apiEnabled: boolean
  apiRateLimit: number
  webhooksEnabled: boolean

  // UI Settings
  darkModeDefault: boolean
  customThemeEnabled: boolean
  maintenanceBanner: string
  announcementBanner: string

  // Analytics Settings
  analyticsEnabled: boolean
  trackingEnabled: boolean
  dataRetentionDays: number
}

interface SystemStats {
  totalUsers: number
  activeUsers: number
  totalStaked: number
  totalRewards: number
  totalWithdrawals: number
  totalDeposits: number
  averageStakeAmount: number
  platformRevenue: number
  systemUptime: number
  apiCalls: number
  errorRate: number
  responseTime: number
}

interface Transaction {
  id: string
  userId: string
  userEmail: string
  type: "deposit" | "withdraw" | "stake" | "unstake" | "reward" | "referral"
  amount: number
  status: "pending" | "completed" | "failed" | "cancelled"
  createdAt: string
  completedAt?: string
  transactionHash?: string
  notes?: string
}

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [activeTab, setActiveTab] = useState("dashboard")
  const [isLoading, setIsLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDateRange, setSelectedDateRange] = useState("7d")

  // Data States
  const [plans, setPlans] = useState<StakingPlan[]>([
    {
      id: "core",
      name: "Core Staking",
      dailyRate: 0.8,
      minStakeAmount: 0.1,
      maxStakeAmount: 100,
      lockPeriodDays: 30,
      apy: 292,
      isActive: true,
      isPopular: false,
      isPremium: false,
      features: ["Daily rewards", "30-day lock", "Basic support"],
      description: "Perfect for beginners looking to start their staking journey",
      earlyWithdrawalFee: 5,
      compoundingEnabled: true,
      autoReinvest: false,
    },
    {
      id: "prime",
      name: "Prime Staking",
      dailyRate: 1.3,
      minStakeAmount: 5,
      maxStakeAmount: 500,
      lockPeriodDays: 60,
      apy: 474.5,
      isActive: true,
      isPopular: true,
      isPremium: false,
      features: ["Higher daily rewards", "60-day lock", "Priority support", "Bonus rewards"],
      description: "Most popular choice for serious investors",
      earlyWithdrawalFee: 3,
      compoundingEnabled: true,
      autoReinvest: true,
    },
    {
      id: "apex",
      name: "Apex Staking",
      dailyRate: 2.2,
      minStakeAmount: 10,
      maxStakeAmount: 1000,
      lockPeriodDays: 90,
      apy: 803,
      isActive: true,
      isPopular: false,
      isPremium: true,
      features: ["Maximum daily rewards", "90-day lock", "VIP support", "Exclusive perks", "MEV rewards"],
      description: "Elite tier for institutional investors",
      earlyWithdrawalFee: 2,
      compoundingEnabled: true,
      autoReinvest: true,
    },
  ])

  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      email: "john.doe@example.com",
      firstName: "John",
      lastName: "Doe",
      status: "active",
      totalStaked: 150.5,
      totalRewards: 45.2,
      joinDate: "2024-01-15",
      lastLogin: "2024-01-20",
      kycStatus: "approved",
      twoFactorEnabled: true,
      referralCode: "JOHN123",
      totalReferrals: 5,
      country: "United States",
      riskLevel: "low",
    },
    {
      id: "2",
      email: "jane.smith@example.com",
      firstName: "Jane",
      lastName: "Smith",
      status: "active",
      totalStaked: 89.3,
      totalRewards: 23.1,
      joinDate: "2024-01-18",
      lastLogin: "2024-01-21",
      kycStatus: "pending",
      twoFactorEnabled: false,
      referralCode: "JANE456",
      referredBy: "JOHN123",
      totalReferrals: 2,
      country: "Canada",
      riskLevel: "medium",
    },
  ])

  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: "tx1",
      userId: "1",
      userEmail: "john.doe@example.com",
      type: "deposit",
      amount: 100,
      status: "completed",
      createdAt: "2024-01-20T10:30:00Z",
      completedAt: "2024-01-20T10:35:00Z",
      transactionHash: "0x123...abc",
    },
    {
      id: "tx2",
      userId: "2",
      userEmail: "jane.smith@example.com",
      type: "stake",
      amount: 50,
      status: "completed",
      createdAt: "2024-01-20T14:15:00Z",
      completedAt: "2024-01-20T14:16:00Z",
    },
    {
      id: "tx3",
      userId: "1",
      userEmail: "john.doe@example.com",
      type: "withdraw",
      amount: 25,
      status: "pending",
      createdAt: "2024-01-21T09:20:00Z",
    },
  ])

  const [settings, setSettings] = useState<SystemSettings>({
    // Platform Settings
    platformName: "Vault Staking",
    platformDescription: "Advanced DeFi staking platform on Solana",
    supportEmail: "support@vault.com",
    supportPhone: "+1-800-VAULT-01",
    maintenanceMode: false,
    registrationEnabled: true,
    kycRequired: false,

    // Staking Settings
    minStakeAmount: 0.1,
    maxStakeAmount: 10000,
    stakingEnabled: true,
    compoundingEnabled: true,
    autoReinvestEnabled: true,

    // Withdrawal Settings
    minWithdrawalAmount: 0.1,
    maxWithdrawalAmount: 1000,
    maxDailyWithdrawals: 10,
    withdrawalFee: 0.01,
    withdrawalProcessingTime: 24,
    withdrawalsEnabled: true,

    // Referral Settings
    referralEnabled: true,
    referralCommissionRate: 0.15,
    referralBonusEnabled: true,
    newUserBonus: 0.1,
    referralTiers: 3,

    // Security Settings
    twoFactorRequired: false,
    sessionTimeout: 3600,
    maxLoginAttempts: 5,
    passwordMinLength: 8,
    ipWhitelistEnabled: false,

    // Notification Settings
    emailNotificationsEnabled: true,
    smsNotificationsEnabled: false,
    pushNotificationsEnabled: true,
    marketingEmailsEnabled: true,

    // API Settings
    apiEnabled: true,
    apiRateLimit: 1000,
    webhooksEnabled: true,

    // UI Settings
    darkModeDefault: true,
    customThemeEnabled: false,
    maintenanceBanner: "",
    announcementBanner: "🎉 Welcome to Vault Staking! Start earning rewards today!",

    // Analytics Settings
    analyticsEnabled: true,
    trackingEnabled: true,
    dataRetentionDays: 365,
  })

  const [stats, setStats] = useState<SystemStats>({
    totalUsers: 1234,
    activeUsers: 892,
    totalStaked: 45678.9,
    totalRewards: 12345.6,
    totalWithdrawals: 8901.2,
    totalDeposits: 54580.1,
    averageStakeAmount: 37.2,
    platformRevenue: 2345.8,
    systemUptime: 99.9,
    apiCalls: 156789,
    errorRate: 0.02,
    responseTime: 145,
  })

  const [editingPlan, setEditingPlan] = useState<StakingPlan | null>(null)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)

  const handleLogin = () => {
    if (password === "admin123") {
      setIsAuthenticated(true)
      setPassword("")
    } else {
      alert("Invalid password")
    }
  }

  const handleSavePlan = () => {
    if (!editingPlan) return
    setPlans((prev) => prev.map((plan) => (plan.id === editingPlan.id ? editingPlan : plan)))
    setEditingPlan(null)
  }

  const handleDeletePlan = (planId: string) => {
    if (confirm("Are you sure you want to delete this plan?")) {
      setPlans((prev) => prev.filter((plan) => plan.id !== planId))
    }
  }

  const handleAddPlan = () => {
    const newPlan: StakingPlan = {
      id: `plan_${Date.now()}`,
      name: "New Plan",
      dailyRate: 1.0,
      minStakeAmount: 1,
      maxStakeAmount: 100,
      lockPeriodDays: 30,
      apy: 365,
      isActive: true,
      isPopular: false,
      isPremium: false,
      features: ["Daily rewards"],
      description: "New staking plan",
      earlyWithdrawalFee: 5,
      compoundingEnabled: true,
      autoReinvest: false,
    }
    setPlans((prev) => [...prev, newPlan])
    setEditingPlan(newPlan)
  }

  const handleSaveSettings = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      alert("Settings saved successfully!")
    }, 1000)
  }

  const handleUserAction = (userId: string, action: string) => {
    setUsers((prev) =>
      prev.map((user) => {
        if (user.id === userId) {
          switch (action) {
            case "suspend":
              return { ...user, status: "suspended" as const }
            case "activate":
              return { ...user, status: "active" as const }
            case "ban":
              return { ...user, status: "banned" as const }
            default:
              return user
          }
        }
        return user
      }),
    )
  }

  const handleTransactionAction = (transactionId: string, action: string) => {
    setTransactions((prev) =>
      prev.map((tx) => {
        if (tx.id === transactionId) {
          switch (action) {
            case "approve":
              return { ...tx, status: "completed" as const, completedAt: new Date().toISOString() }
            case "reject":
              return { ...tx, status: "failed" as const }
            case "cancel":
              return { ...tx, status: "cancelled" as const }
            default:
              return tx
          }
        }
        return tx
      }),
    )
  }

  const filteredUsers = users.filter(
    (user) =>
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredTransactions = transactions.filter(
    (tx) =>
      tx.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <MorphingBackground />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 w-full max-w-md"
        >
          <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm p-8">
            <div className="text-center mb-8">
              <VaultLogo width={150} height={40} className="h-10 w-auto mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-white mb-2">Admin Control Panel</h1>
              <p className="text-gray-400">Enter password to access admin controls</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-300">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500/20 pr-10"
                    placeholder="Enter admin password"
                    onKeyPress={(e) => e.key === "Enter" && handleLogin()}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button
                onClick={handleLogin}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white py-2 rounded-lg font-medium transition-all duration-300"
              >
                Access Admin Panel
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <MorphingBackground />

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-50 px-4 lg:px-6 py-6 border-b border-gray-800/50 backdrop-blur-xl"
      >
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <VaultLogo width={150} height={40} className="h-10 w-auto" />
            <Badge className="bg-red-500/10 text-red-400 border-red-500/20">Admin Control Panel</Badge>
            {settings.maintenanceMode && (
              <Badge className="bg-orange-500/10 text-orange-400 border-orange-500/20">
                <AlertTriangle className="w-3 h-3 mr-1" />
                Maintenance Mode
              </Badge>
            )}
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <Activity className="w-4 h-4 text-green-400" />
              <span>System Online</span>
            </div>
            <Button
              onClick={() => setIsAuthenticated(false)}
              variant="outline"
              className="border-gray-700 text-gray-300 hover:bg-gray-800/50"
            >
              Logout
            </Button>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="relative z-10 px-4 lg:px-6 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-1 mb-8 bg-gray-900/50 rounded-lg p-1">
            {[
              { id: "dashboard", label: "Dashboard", icon: BarChart3 },
              { id: "users", label: "Users", icon: Users },
              { id: "plans", label: "Staking Plans", icon: TrendingUp },
              { id: "transactions", label: "Transactions", icon: DollarSign },
              { id: "settings", label: "Settings", icon: Settings },
              { id: "security", label: "Security", icon: Shield },
              { id: "system", label: "System", icon: Server },
              { id: "analytics", label: "Analytics", icon: PieChart },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md font-medium transition-all duration-200 text-sm ${
                  activeTab === tab.id
                    ? "bg-blue-600 text-white"
                    : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Dashboard Tab */}
          {activeTab === "dashboard" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Dashboard Overview</h2>
                <div className="flex items-center space-x-4">
                  <select
                    value={selectedDateRange}
                    onChange={(e) => setSelectedDateRange(e.target.value)}
                    className="bg-gray-800/50 border-gray-700 text-white rounded-md px-3 py-2 text-sm"
                  >
                    <option value="24h">Last 24 Hours</option>
                    <option value="7d">Last 7 Days</option>
                    <option value="30d">Last 30 Days</option>
                    <option value="90d">Last 90 Days</option>
                  </select>
                  <Button
                    onClick={() => window.location.reload()}
                    variant="outline"
                    size="sm"
                    className="border-gray-700 text-gray-300"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh
                  </Button>
                </div>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    label: "Total Users",
                    value: stats.totalUsers.toLocaleString(),
                    change: "+12.5%",
                    icon: Users,
                    color: "blue",
                    trend: "up",
                  },
                  {
                    label: "Total Staked",
                    value: `${stats.totalStaked.toLocaleString()} SOL`,
                    change: "+8.3%",
                    icon: TrendingUp,
                    color: "green",
                    trend: "up",
                  },
                  {
                    label: "Platform Revenue",
                    value: `${stats.platformRevenue.toLocaleString()} SOL`,
                    change: "+15.2%",
                    icon: DollarSign,
                    color: "purple",
                    trend: "up",
                  },
                  {
                    label: "System Uptime",
                    value: `${stats.systemUptime}%`,
                    change: "0.0%",
                    icon: Activity,
                    color: "green",
                    trend: "stable",
                  },
                ].map((stat, index) => (
                  <Card key={index} className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`w-12 h-12 bg-gradient-to-r from-${stat.color}-500 to-${stat.color}-600 rounded-lg flex items-center justify-center`}
                      >
                        <stat.icon className="w-6 h-6 text-white" />
                      </div>
                      <div
                        className={`flex items-center space-x-1 text-sm ${
                          stat.trend === "up"
                            ? "text-green-400"
                            : stat.trend === "down"
                              ? "text-red-400"
                              : "text-gray-400"
                        }`}
                      >
                        {stat.trend === "up" ? (
                          <TrendingUp className="w-4 h-4" />
                        ) : stat.trend === "down" ? (
                          <TrendingDown className="w-4 h-4" />
                        ) : (
                          <Activity className="w-4 h-4" />
                        )}
                        <span>{stat.change}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">{stat.label}</p>
                      <p className="text-2xl font-bold text-white">{stat.value}</p>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      onClick={() => setActiveTab("plans")}
                      className="bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-600/30"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Plan
                    </Button>
                    <Button
                      onClick={() => setActiveTab("users")}
                      className="bg-green-600/20 hover:bg-green-600/30 text-green-400 border border-green-600/30"
                    >
                      <Users className="w-4 h-4 mr-2" />
                      Manage Users
                    </Button>
                    <Button
                      onClick={() => setActiveTab("transactions")}
                      className="bg-purple-600/20 hover:bg-purple-600/30 text-purple-400 border border-purple-600/30"
                    >
                      <DollarSign className="w-4 h-4 mr-2" />
                      View Transactions
                    </Button>
                    <Button
                      onClick={() => setActiveTab("settings")}
                      className="bg-orange-600/20 hover:bg-orange-600/30 text-orange-400 border border-orange-600/30"
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Platform Settings
                    </Button>
                  </div>
                </Card>

                <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">System Status</h3>
                  <div className="space-y-4">
                    {[
                      { label: "API Status", status: "operational", icon: Globe },
                      { label: "Database", status: "operational", icon: Database },
                      { label: "Staking Engine", status: "operational", icon: Zap },
                      { label: "Notifications", status: "operational", icon: Bell },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <item.icon className="w-5 h-5 text-gray-400" />
                          <span className="text-gray-300">{item.label}</span>
                        </div>
                        <Badge className="bg-green-500/10 text-green-400 border-green-500/20">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          {item.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              {/* Recent Activity */}
              <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {transactions.slice(0, 5).map((tx) => (
                    <div
                      key={tx.id}
                      className="flex items-center justify-between py-3 border-b border-gray-800/50 last:border-b-0"
                    >
                      <div className="flex items-center space-x-4">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            tx.type === "deposit"
                              ? "bg-green-500/20 text-green-400"
                              : tx.type === "withdraw"
                                ? "bg-red-500/20 text-red-400"
                                : "bg-blue-500/20 text-blue-400"
                          }`}
                        >
                          {tx.type === "deposit" ? (
                            <TrendingUp className="w-5 h-5" />
                          ) : tx.type === "withdraw" ? (
                            <TrendingDown className="w-5 h-5" />
                          ) : (
                            <Activity className="w-5 h-5" />
                          )}
                        </div>
                        <div>
                          <p className="text-white font-medium">{tx.userEmail}</p>
                          <p className="text-gray-400 text-sm capitalize">
                            {tx.type} - {tx.amount} SOL
                          </p>
                        </div>
                      </div>
                      <Badge
                        className={
                          tx.status === "completed"
                            ? "bg-green-500/10 text-green-400"
                            : tx.status === "pending"
                              ? "bg-yellow-500/10 text-yellow-400"
                              : "bg-red-500/10 text-red-400"
                        }
                      >
                        {tx.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          )}

          {/* Users Tab */}
          {activeTab === "users" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">User Management</h2>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      placeholder="Search users..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="bg-gray-800/50 border-gray-700 text-white pl-10 w-64"
                    />
                  </div>
                  <Button
                    onClick={() => {
                      /* Export users */
                    }}
                    variant="outline"
                    className="border-gray-700 text-gray-300"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Total Users</p>
                      <p className="text-2xl font-bold text-white">{stats.totalUsers}</p>
                    </div>
                    <Users className="w-8 h-8 text-blue-400" />
                  </div>
                </Card>
                <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Active Users</p>
                      <p className="text-2xl font-bold text-white">{stats.activeUsers}</p>
                    </div>
                    <UserCheck className="w-8 h-8 text-green-400" />
                  </div>
                </Card>
                <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">KYC Pending</p>
                      <p className="text-2xl font-bold text-white">
                        {users.filter((u) => u.kycStatus === "pending").length}
                      </p>
                    </div>
                    <Clock className="w-8 h-8 text-yellow-400" />
                  </div>
                </Card>
              </div>

              <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm">
                <div className="p-6">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-800/50">
                          <th className="text-left py-3 px-4 text-gray-400 font-medium">User</th>
                          <th className="text-left py-3 px-4 text-gray-400 font-medium">Status</th>
                          <th className="text-left py-3 px-4 text-gray-400 font-medium">Total Staked</th>
                          <th className="text-left py-3 px-4 text-gray-400 font-medium">KYC</th>
                          <th className="text-left py-3 px-4 text-gray-400 font-medium">2FA</th>
                          <th className="text-left py-3 px-4 text-gray-400 font-medium">Risk</th>
                          <th className="text-left py-3 px-4 text-gray-400 font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredUsers.map((user) => (
                          <tr key={user.id} className="border-b border-gray-800/30 hover:bg-gray-800/20">
                            <td className="py-4 px-4">
                              <div>
                                <p className="text-white font-medium">
                                  {user.firstName} {user.lastName}
                                </p>
                                <p className="text-gray-400 text-sm">{user.email}</p>
                              </div>
                            </td>
                            <td className="py-4 px-4">
                              <Badge
                                className={
                                  user.status === "active"
                                    ? "bg-green-500/10 text-green-400"
                                    : user.status === "suspended"
                                      ? "bg-yellow-500/10 text-yellow-400"
                                      : user.status === "banned"
                                        ? "bg-red-500/10 text-red-400"
                                        : "bg-gray-500/10 text-gray-400"
                                }
                              >
                                {user.status}
                              </Badge>
                            </td>
                            <td className="py-4 px-4 text-white">{user.totalStaked} SOL</td>
                            <td className="py-4 px-4">
                              <Badge
                                className={
                                  user.kycStatus === "approved"
                                    ? "bg-green-500/10 text-green-400"
                                    : user.kycStatus === "pending"
                                      ? "bg-yellow-500/10 text-yellow-400"
                                      : "bg-red-500/10 text-red-400"
                                }
                              >
                                {user.kycStatus}
                              </Badge>
                            </td>
                            <td className="py-4 px-4">
                              {user.twoFactorEnabled ? (
                                <Lock className="w-4 h-4 text-green-400" />
                              ) : (
                                <Unlock className="w-4 h-4 text-red-400" />
                              )}
                            </td>
                            <td className="py-4 px-4">
                              <Badge
                                className={
                                  user.riskLevel === "low"
                                    ? "bg-green-500/10 text-green-400"
                                    : user.riskLevel === "medium"
                                      ? "bg-yellow-500/10 text-yellow-400"
                                      : "bg-red-500/10 text-red-400"
                                }
                              >
                                {user.riskLevel}
                              </Badge>
                            </td>
                            <td className="py-4 px-4">
                              <div className="flex items-center space-x-2">
                                <Button
                                  onClick={() => setEditingUser(user)}
                                  variant="ghost"
                                  size="sm"
                                  className="text-gray-400 hover:text-white"
                                >
                                  <Edit className="w-4 h-4" />
                                </Button>
                                {user.status === "active" ? (
                                  <Button
                                    onClick={() => handleUserAction(user.id, "suspend")}
                                    variant="ghost"
                                    size="sm"
                                    className="text-yellow-400 hover:text-yellow-300"
                                  >
                                    <Clock className="w-4 h-4" />
                                  </Button>
                                ) : (
                                  <Button
                                    onClick={() => handleUserAction(user.id, "activate")}
                                    variant="ghost"
                                    size="sm"
                                    className="text-green-400 hover:text-green-300"
                                  >
                                    <CheckCircle className="w-4 h-4" />
                                  </Button>
                                )}
                                <Button
                                  onClick={() => handleUserAction(user.id, "ban")}
                                  variant="ghost"
                                  size="sm"
                                  className="text-red-400 hover:text-red-300"
                                >
                                  <Ban className="w-4 h-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {/* Staking Plans Tab */}
          {activeTab === "plans" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Staking Plans Management</h2>
                <Button
                  onClick={handleAddPlan}
                  className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Plan
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {plans.map((plan) => (
                  <Card key={plan.id} className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <h3 className="text-lg font-semibold text-white">{plan.name}</h3>
                        {plan.isPopular && <Badge className="bg-blue-500/10 text-blue-400">Popular</Badge>}
                        {plan.isPremium && <Badge className="bg-purple-500/10 text-purple-400">Premium</Badge>}
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          onClick={() => setEditingPlan(plan)}
                          variant="ghost"
                          size="sm"
                          className="text-gray-400 hover:text-white"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          onClick={() => handleDeletePlan(plan.id)}
                          variant="ghost"
                          size="sm"
                          className="text-gray-400 hover:text-red-400"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Daily Rate:</span>
                        <span className="text-white font-medium">{plan.dailyRate}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">APY:</span>
                        <span className="text-green-400 font-medium">{plan.apy}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Min Stake:</span>
                        <span className="text-white font-medium">{plan.minStakeAmount} SOL</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Max Stake:</span>
                        <span className="text-white font-medium">{plan.maxStakeAmount} SOL</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Lock Period:</span>
                        <span className="text-white font-medium">{plan.lockPeriodDays} days</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Early Fee:</span>
                        <span className="text-white font-medium">{plan.earlyWithdrawalFee}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Status:</span>
                        <Badge
                          className={plan.isActive ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"}
                        >
                          {plan.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Compounding:</span>
                        <span className="text-white font-medium">{plan.compoundingEnabled ? "Yes" : "No"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Auto Reinvest:</span>
                        <span className="text-white font-medium">{plan.autoReinvest ? "Yes" : "No"}</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </motion.div>
          )}

          {/* Transactions Tab */}
          {activeTab === "transactions" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Transaction Management</h2>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      placeholder="Search transactions..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="bg-gray-800/50 border-gray-700 text-white pl-10 w-64"
                    />
                  </div>
                  <Button
                    onClick={() => {
                      /* Export transactions */
                    }}
                    variant="outline"
                    className="border-gray-700 text-gray-300"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                {[
                  {
                    label: "Total Deposits",
                    value: `${stats.totalDeposits.toLocaleString()} SOL`,
                    icon: TrendingUp,
                    color: "green",
                  },
                  {
                    label: "Total Withdrawals",
                    value: `${stats.totalWithdrawals.toLocaleString()} SOL`,
                    icon: TrendingDown,
                    color: "red",
                  },
                  {
                    label: "Pending",
                    value: transactions.filter((t) => t.status === "pending").length,
                    icon: Clock,
                    color: "yellow",
                  },
                  {
                    label: "Failed",
                    value: transactions.filter((t) => t.status === "failed").length,
                    icon: XCircle,
                    color: "red",
                  },
                ].map((stat, index) => (
                  <Card key={index} className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm">{stat.label}</p>
                        <p className="text-2xl font-bold text-white">{stat.value}</p>
                      </div>
                      <stat.icon className={`w-8 h-8 text-${stat.color}-400`} />
                    </div>
                  </Card>
                ))}
              </div>

              <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm">
                <div className="p-6">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-800/50">
                          <th className="text-left py-3 px-4 text-gray-400 font-medium">Transaction ID</th>
                          <th className="text-left py-3 px-4 text-gray-400 font-medium">User</th>
                          <th className="text-left py-3 px-4 text-gray-400 font-medium">Type</th>
                          <th className="text-left py-3 px-4 text-gray-400 font-medium">Amount</th>
                          <th className="text-left py-3 px-4 text-gray-400 font-medium">Status</th>
                          <th className="text-left py-3 px-4 text-gray-400 font-medium">Date</th>
                          <th className="text-left py-3 px-4 text-gray-400 font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredTransactions.map((tx) => (
                          <tr key={tx.id} className="border-b border-gray-800/30 hover:bg-gray-800/20">
                            <td className="py-4 px-4 text-white font-mono text-sm">{tx.id}</td>
                            <td className="py-4 px-4 text-white">{tx.userEmail}</td>
                            <td className="py-4 px-4">
                              <Badge
                                className={
                                  tx.type === "deposit"
                                    ? "bg-green-500/10 text-green-400"
                                    : tx.type === "withdraw"
                                      ? "bg-red-500/10 text-red-400"
                                      : "bg-blue-500/10 text-blue-400"
                                }
                              >
                                {tx.type}
                              </Badge>
                            </td>
                            <td className="py-4 px-4 text-white">{tx.amount} SOL</td>
                            <td className="py-4 px-4">
                              <Badge
                                className={
                                  tx.status === "completed"
                                    ? "bg-green-500/10 text-green-400"
                                    : tx.status === "pending"
                                      ? "bg-yellow-500/10 text-yellow-400"
                                      : tx.status === "failed"
                                        ? "bg-red-500/10 text-red-400"
                                        : "bg-gray-500/10 text-gray-400"
                                }
                              >
                                {tx.status}
                              </Badge>
                            </td>
                            <td className="py-4 px-4 text-gray-400">{new Date(tx.createdAt).toLocaleDateString()}</td>
                            <td className="py-4 px-4">
                              <div className="flex items-center space-x-2">
                                <Button
                                  onClick={() => setSelectedTransaction(tx)}
                                  variant="ghost"
                                  size="sm"
                                  className="text-gray-400 hover:text-white"
                                >
                                  <Eye className="w-4 h-4" />
                                </Button>
                                {tx.status === "pending" && (
                                  <>
                                    <Button
                                      onClick={() => handleTransactionAction(tx.id, "approve")}
                                      variant="ghost"
                                      size="sm"
                                      className="text-green-400 hover:text-green-300"
                                    >
                                      <CheckCircle className="w-4 h-4" />
                                    </Button>
                                    <Button
                                      onClick={() => handleTransactionAction(tx.id, "reject")}
                                      variant="ghost"
                                      size="sm"
                                      className="text-red-400 hover:text-red-300"
                                    >
                                      <XCircle className="w-4 h-4" />
                                    </Button>
                                  </>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {/* Settings Tab */}
          {activeTab === "settings" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Platform Settings</h2>
                <Button
                  onClick={handleSaveSettings}
                  disabled={isLoading}
                  className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white"
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      <span>Saving...</span>
                    </div>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Save All Settings
                    </>
                  )}
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Platform Settings */}
                <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm p-6">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <Globe className="w-5 h-5 mr-2" />
                    Platform Settings
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-300">Platform Name</Label>
                      <Input
                        value={settings.platformName}
                        onChange={(e) => setSettings((prev) => ({ ...prev, platformName: e.target.value }))}
                        className="bg-gray-800/50 border-gray-700 text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-300">Description</Label>
                      <Textarea
                        value={settings.platformDescription}
                        onChange={(e) => setSettings((prev) => ({ ...prev, platformDescription: e.target.value }))}
                        className="bg-gray-800/50 border-gray-700 text-white"
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-300">Support Email</Label>
                      <Input
                        type="email"
                        value={settings.supportEmail}
                        onChange={(e) => setSettings((prev) => ({ ...prev, supportEmail: e.target.value }))}
                        className="bg-gray-800/50 border-gray-700 text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-300">Support Phone</Label>
                      <Input
                        value={settings.supportPhone}
                        onChange={(e) => setSettings((prev) => ({ ...prev, supportPhone: e.target.value }))}
                        className="bg-gray-800/50 border-gray-700 text-white"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-medium text-gray-300">Maintenance Mode</Label>
                      <Switch
                        checked={settings.maintenanceMode}
                        onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, maintenanceMode: checked }))}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-medium text-gray-300">Registration Enabled</Label>
                      <Switch
                        checked={settings.registrationEnabled}
                        onCheckedChange={(checked) =>
                          setSettings((prev) => ({ ...prev, registrationEnabled: checked }))
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-medium text-gray-300">KYC Required</Label>
                      <Switch
                        checked={settings.kycRequired}
                        onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, kycRequired: checked }))}
                      />
                    </div>
                  </div>
                </Card>

                {/* Staking Settings */}
                <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm p-6">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Staking Settings
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-300">Min Stake Amount (SOL)</Label>
                      <Input
                        type="number"
                        value={settings.minStakeAmount}
                        onChange={(e) =>
                          setSettings((prev) => ({ ...prev, minStakeAmount: Number.parseFloat(e.target.value) }))
                        }
                        className="bg-gray-800/50 border-gray-700 text-white"
                        step="0.01"
                        min="0"
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-300">Max Stake Amount (SOL)</Label>
                      <Input
                        type="number"
                        value={settings.maxStakeAmount}
                        onChange={(e) =>
                          setSettings((prev) => ({ ...prev, maxStakeAmount: Number.parseFloat(e.target.value) }))
                        }
                        className="bg-gray-800/50 border-gray-700 text-white"
                        step="0.01"
                        min="0"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-medium text-gray-300">Staking Enabled</Label>
                      <Switch
                        checked={settings.stakingEnabled}
                        onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, stakingEnabled: checked }))}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-medium text-gray-300">Compounding Enabled</Label>
                      <Switch
                        checked={settings.compoundingEnabled}
                        onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, compoundingEnabled: checked }))}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-medium text-gray-300">Auto Reinvest Enabled</Label>
                      <Switch
                        checked={settings.autoReinvestEnabled}
                        onCheckedChange={(checked) =>
                          setSettings((prev) => ({ ...prev, autoReinvestEnabled: checked }))
                        }
                      />
                    </div>
                  </div>
                </Card>

                {/* Withdrawal Settings */}
                <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm p-6">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <DollarSign className="w-5 h-5 mr-2" />
                    Withdrawal Settings
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-300">Min Withdrawal (SOL)</Label>
                      <Input
                        type="number"
                        value={settings.minWithdrawalAmount}
                        onChange={(e) =>
                          setSettings((prev) => ({ ...prev, minWithdrawalAmount: Number.parseFloat(e.target.value) }))
                        }
                        className="bg-gray-800/50 border-gray-700 text-white"
                        step="0.01"
                        min="0"
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-300">Max Withdrawal (SOL)</Label>
                      <Input
                        type="number"
                        value={settings.maxWithdrawalAmount}
                        onChange={(e) =>
                          setSettings((prev) => ({ ...prev, maxWithdrawalAmount: Number.parseFloat(e.target.value) }))
                        }
                        className="bg-gray-800/50 border-gray-700 text-white"
                        step="0.01"
                        min="0"
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-300">Max Daily Withdrawals</Label>
                      <Input
                        type="number"
                        value={settings.maxDailyWithdrawals}
                        onChange={(e) =>
                          setSettings((prev) => ({ ...prev, maxDailyWithdrawals: Number.parseInt(e.target.value) }))
                        }
                        className="bg-gray-800/50 border-gray-700 text-white"
                        min="1"
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-300">Withdrawal Fee (SOL)</Label>
                      <Input
                        type="number"
                        value={settings.withdrawalFee}
                        onChange={(e) =>
                          setSettings((prev) => ({ ...prev, withdrawalFee: Number.parseFloat(e.target.value) }))
                        }
                        className="bg-gray-800/50 border-gray-700 text-white"
                        step="0.001"
                        min="0"
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-300">Processing Time (hours)</Label>
                      <Input
                        type="number"
                        value={settings.withdrawalProcessingTime}
                        onChange={(e) =>
                          setSettings((prev) => ({
                            ...prev,
                            withdrawalProcessingTime: Number.parseInt(e.target.value),
                          }))
                        }
                        className="bg-gray-800/50 border-gray-700 text-white"
                        min="1"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-medium text-gray-300">Withdrawals Enabled</Label>
                      <Switch
                        checked={settings.withdrawalsEnabled}
                        onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, withdrawalsEnabled: checked }))}
                      />
                    </div>
                  </div>
                </Card>

                {/* Referral Settings */}
                <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm p-6">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <Percent className="w-5 h-5 mr-2" />
                    Referral Settings
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-medium text-gray-300">Referral System Enabled</Label>
                      <Switch
                        checked={settings.referralEnabled}
                        onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, referralEnabled: checked }))}
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-300">Commission Rate (%)</Label>
                      <Input
                        type="number"
                        value={settings.referralCommissionRate * 100}
                        onChange={(e) =>
                          setSettings((prev) => ({
                            ...prev,
                            referralCommissionRate: Number.parseFloat(e.target.value) / 100,
                          }))
                        }
                        className="bg-gray-800/50 border-gray-700 text-white"
                        step="0.1"
                        min="0"
                        max="100"
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-300">New User Bonus (SOL)</Label>
                      <Input
                        type="number"
                        value={settings.newUserBonus}
                        onChange={(e) =>
                          setSettings((prev) => ({ ...prev, newUserBonus: Number.parseFloat(e.target.value) }))
                        }
                        className="bg-gray-800/50 border-gray-700 text-white"
                        step="0.01"
                        min="0"
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-300">Referral Tiers</Label>
                      <Input
                        type="number"
                        value={settings.referralTiers}
                        onChange={(e) =>
                          setSettings((prev) => ({ ...prev, referralTiers: Number.parseInt(e.target.value) }))
                        }
                        className="bg-gray-800/50 border-gray-700 text-white"
                        min="1"
                        max="10"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-medium text-gray-300">Referral Bonus Enabled</Label>
                      <Switch
                        checked={settings.referralBonusEnabled}
                        onCheckedChange={(checked) =>
                          setSettings((prev) => ({ ...prev, referralBonusEnabled: checked }))
                        }
                      />
                    </div>
                  </div>
                </Card>

                {/* Security Settings */}
                <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm p-6">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <Shield className="w-5 h-5 mr-2" />
                    Security Settings
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-medium text-gray-300">2FA Required</Label>
                      <Switch
                        checked={settings.twoFactorRequired}
                        onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, twoFactorRequired: checked }))}
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-300">Session Timeout (seconds)</Label>
                      <Input
                        type="number"
                        value={settings.sessionTimeout}
                        onChange={(e) =>
                          setSettings((prev) => ({ ...prev, sessionTimeout: Number.parseInt(e.target.value) }))
                        }
                        className="bg-gray-800/50 border-gray-700 text-white"
                        min="300"
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-300">Max Login Attempts</Label>
                      <Input
                        type="number"
                        value={settings.maxLoginAttempts}
                        onChange={(e) =>
                          setSettings((prev) => ({ ...prev, maxLoginAttempts: Number.parseInt(e.target.value) }))
                        }
                        className="bg-gray-800/50 border-gray-700 text-white"
                        min="1"
                        max="10"
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-300">Password Min Length</Label>
                      <Input
                        type="number"
                        value={settings.passwordMinLength}
                        onChange={(e) =>
                          setSettings((prev) => ({ ...prev, passwordMinLength: Number.parseInt(e.target.value) }))
                        }
                        className="bg-gray-800/50 border-gray-700 text-white"
                        min="6"
                        max="32"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-medium text-gray-300">IP Whitelist Enabled</Label>
                      <Switch
                        checked={settings.ipWhitelistEnabled}
                        onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, ipWhitelistEnabled: checked }))}
                      />
                    </div>
                  </div>
                </Card>

                {/* Notification Settings */}
                <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm p-6">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <Bell className="w-5 h-5 mr-2" />
                    Notification Settings
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-medium text-gray-300">Email Notifications</Label>
                      <Switch
                        checked={settings.emailNotificationsEnabled}
                        onCheckedChange={(checked) =>
                          setSettings((prev) => ({ ...prev, emailNotificationsEnabled: checked }))
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-medium text-gray-300">SMS Notifications</Label>
                      <Switch
                        checked={settings.smsNotificationsEnabled}
                        onCheckedChange={(checked) =>
                          setSettings((prev) => ({ ...prev, smsNotificationsEnabled: checked }))
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-medium text-gray-300">Push Notifications</Label>
                      <Switch
                        checked={settings.pushNotificationsEnabled}
                        onCheckedChange={(checked) =>
                          setSettings((prev) => ({ ...prev, pushNotificationsEnabled: checked }))
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-medium text-gray-300">Marketing Emails</Label>
                      <Switch
                        checked={settings.marketingEmailsEnabled}
                        onCheckedChange={(checked) =>
                          setSettings((prev) => ({ ...prev, marketingEmailsEnabled: checked }))
                        }
                      />
                    </div>
                  </div>
                </Card>

                {/* API Settings */}
                <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm p-6">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <Code className="w-5 h-5 mr-2" />
                    API Settings
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-medium text-gray-300">API Enabled</Label>
                      <Switch
                        checked={settings.apiEnabled}
                        onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, apiEnabled: checked }))}
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-300">Rate Limit (requests/hour)</Label>
                      <Input
                        type="number"
                        value={settings.apiRateLimit}
                        onChange={(e) =>
                          setSettings((prev) => ({ ...prev, apiRateLimit: Number.parseInt(e.target.value) }))
                        }
                        className="bg-gray-800/50 border-gray-700 text-white"
                        min="100"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-medium text-gray-300">Webhooks Enabled</Label>
                      <Switch
                        checked={settings.webhooksEnabled}
                        onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, webhooksEnabled: checked }))}
                      />
                    </div>
                  </div>
                </Card>

                {/* UI Settings */}
                <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm p-6">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <Sliders className="w-5 h-5 mr-2" />
                    UI Settings
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-medium text-gray-300">Dark Mode Default</Label>
                      <Switch
                        checked={settings.darkModeDefault}
                        onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, darkModeDefault: checked }))}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-medium text-gray-300">Custom Theme Enabled</Label>
                      <Switch
                        checked={settings.customThemeEnabled}
                        onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, customThemeEnabled: checked }))}
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-300">Maintenance Banner</Label>
                      <Textarea
                        value={settings.maintenanceBanner}
                        onChange={(e) => setSettings((prev) => ({ ...prev, maintenanceBanner: e.target.value }))}
                        className="bg-gray-800/50 border-gray-700 text-white"
                        rows={2}
                        placeholder="Maintenance message..."
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-300">Announcement Banner</Label>
                      <Textarea
                        value={settings.announcementBanner}
                        onChange={(e) => setSettings((prev) => ({ ...prev, announcementBanner: e.target.value }))}
                        className="bg-gray-800/50 border-gray-700 text-white"
                        rows={2}
                        placeholder="Announcement message..."
                      />
                    </div>
                  </div>
                </Card>

                {/* Analytics Settings */}
                <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm p-6">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <BarChart className="w-5 h-5 mr-2" />
                    Analytics Settings
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-medium text-gray-300">Analytics Enabled</Label>
                      <Switch
                        checked={settings.analyticsEnabled}
                        onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, analyticsEnabled: checked }))}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-medium text-gray-300">User Tracking Enabled</Label>
                      <Switch
                        checked={settings.trackingEnabled}
                        onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, trackingEnabled: checked }))}
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-300">Data Retention (days)</Label>
                      <Input
                        type="number"
                        value={settings.dataRetentionDays}
                        onChange={(e) =>
                          setSettings((prev) => ({ ...prev, dataRetentionDays: Number.parseInt(e.target.value) }))
                        }
                        className="bg-gray-800/50 border-gray-700 text-white"
                        min="30"
                        max="3650"
                      />
                    </div>
                  </div>
                </Card>
              </div>
            </motion.div>
          )}

          {/* Security Tab */}
          {activeTab === "security" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <h2 className="text-2xl font-bold text-white">Security & Compliance</h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm p-6">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <Shield className="w-5 h-5 mr-2" />
                    Security Overview
                  </h3>
                  <div className="space-y-4">
                    {[
                      { label: "SSL Certificate", status: "valid", icon: Lock, color: "green" },
                      {
                        label: "2FA Coverage",
                        status: `${users.filter((u) => u.twoFactorEnabled).length}/${users.length} users`,
                        icon: Shield,
                        color: "blue",
                      },
                      { label: "Failed Login Attempts", status: "12 (24h)", icon: AlertTriangle, color: "yellow" },
                      { label: "Suspicious Activity", status: "0 alerts", icon: Eye, color: "green" },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <item.icon className={`w-5 h-5 text-${item.color}-400`} />
                          <span className="text-gray-300">{item.label}</span>
                        </div>
                        <span className={`text-${item.color}-400 font-medium`}>{item.status}</span>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm p-6">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <FileText className="w-5 h-5 mr-2" />
                    Compliance Status
                  </h3>
                  <div className="space-y-4">
                    {[
                      { label: "KYC Compliance", status: "98% complete", icon: UserCheck, color: "green" },
                      { label: "AML Screening", status: "Active", icon: Search, color: "green" },
                      { label: "Data Protection", status: "GDPR Compliant", icon: Lock, color: "green" },
                      { label: "Audit Trail", status: "Complete", icon: FileText, color: "green" },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <item.icon className={`w-5 h-5 text-${item.color}-400`} />
                          <span className="text-gray-300">{item.label}</span>
                        </div>
                        <span className={`text-${item.color}-400 font-medium`}>{item.status}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Security Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button
                    onClick={() => alert("Security audit initiated")}
                    className="bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-600/30"
                  >
                    <Shield className="w-4 h-4 mr-2" />
                    Run Security Audit
                  </Button>
                  <Button
                    onClick={() => alert("Backup initiated")}
                    className="bg-green-600/20 hover:bg-green-600/30 text-green-400 border border-green-600/30"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Backup Database
                  </Button>
                  <Button
                    onClick={() => alert("Logs exported")}
                    className="bg-purple-600/20 hover:bg-purple-600/30 text-purple-400 border border-purple-600/30"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Export Logs
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}

          {/* System Tab */}
          {activeTab === "system" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <h2 className="text-2xl font-bold text-white">System Management</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { label: "CPU Usage", value: "45%", icon: Cpu, color: "blue" },
                  { label: "Memory Usage", value: "62%", icon: MemoryStick, color: "green" },
                  { label: "Disk Usage", value: "78%", icon: HardDrive, color: "yellow" },
                  { label: "Network I/O", value: "1.2 GB/s", icon: Network, color: "purple" },
                ].map((stat, index) => (
                  <Card key={index} className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm">{stat.label}</p>
                        <p className="text-2xl font-bold text-white">{stat.value}</p>
                      </div>
                      <stat.icon className={`w-8 h-8 text-${stat.color}-400`} />
                    </div>
                  </Card>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm p-6">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <Server className="w-5 h-5 mr-2" />
                    System Status
                  </h3>
                  <div className="space-y-4">
                    {[
                      { service: "Web Server", status: "running", uptime: "99.9%", icon: Globe },
                      { service: "Database", status: "running", uptime: "99.8%", icon: Database },
                      { service: "Redis Cache", status: "running", uptime: "99.9%", icon: Zap },
                      { service: "Background Jobs", status: "running", uptime: "99.7%", icon: Cog },
                      { service: "Email Service", status: "running", uptime: "99.5%", icon: Mail },
                    ].map((service, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <service.icon className="w-5 h-5 text-gray-400" />
                          <span className="text-gray-300">{service.service}</span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className="text-gray-400 text-sm">{service.uptime}</span>
                          <Badge className="bg-green-500/10 text-green-400">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            {service.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm p-6">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <Terminal className="w-5 h-5 mr-2" />
                    System Actions
                  </h3>
                  <div className="space-y-4">
                    <Button
                      onClick={() => alert("System restart initiated")}
                      className="w-full bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-600/30"
                    >
                      <Power className="w-4 h-4 mr-2" />
                      Restart System
                    </Button>
                    <Button
                      onClick={() => alert("Cache cleared")}
                      className="w-full bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-600/30"
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Clear Cache
                    </Button>
                    <Button
                      onClick={() => alert("Database optimized")}
                      className="w-full bg-green-600/20 hover:bg-green-600/30 text-green-400 border border-green-600/30"
                    >
                      <Database className="w-4 h-4 mr-2" />
                      Optimize Database
                    </Button>
                    <Button
                      onClick={() => alert("Logs rotated")}
                      className="w-full bg-purple-600/20 hover:bg-purple-600/30 text-purple-400 border border-purple-600/30"
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Rotate Logs
                    </Button>
                  </div>
                </Card>
              </div>
            </motion.div>
          )}

          {/* Analytics Tab */}
          {activeTab === "analytics" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Analytics & Reports</h2>
                <div className="flex items-center space-x-4">
                  <select
                    value={selectedDateRange}
                    onChange={(e) => setSelectedDateRange(e.target.value)}
                    className="bg-gray-800/50 border-gray-700 text-white rounded-md px-3 py-2 text-sm"
                  >
                    <option value="24h">Last 24 Hours</option>
                    <option value="7d">Last 7 Days</option>
                    <option value="30d">Last 30 Days</option>
                    <option value="90d">Last 90 Days</option>
                  </select>
                  <Button
                    onClick={() => alert("Report generated")}
                    variant="outline"
                    className="border-gray-700 text-gray-300"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Generate Report
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    label: "Revenue",
                    value: `${stats.platformRevenue.toLocaleString()} SOL`,
                    change: "+15.2%",
                    icon: DollarSign,
                    color: "green",
                  },
                  {
                    label: "Active Users",
                    value: stats.activeUsers.toLocaleString(),
                    change: "+8.3%",
                    icon: Users,
                    color: "blue",
                  },
                  {
                    label: "API Calls",
                    value: stats.apiCalls.toLocaleString(),
                    change: "+12.1%",
                    icon: Code,
                    color: "purple",
                  },
                  {
                    label: "Error Rate",
                    value: `${stats.errorRate}%`,
                    change: "-0.1%",
                    icon: Bug,
                    color: "red",
                  },
                ].map((stat, index) => (
                  <Card key={index} className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`w-12 h-12 bg-gradient-to-r from-${stat.color}-500 to-${stat.color}-600 rounded-lg flex items-center justify-center`}
                      >
                        <stat.icon className="w-6 h-6 text-white" />
                      </div>
                      <div
                        className={`flex items-center space-x-1 text-sm ${
                          stat.change.startsWith("+") ? "text-green-400" : "text-red-400"
                        }`}
                      >
                        {stat.change.startsWith("+") ? (
                          <TrendingUp className="w-4 h-4" />
                        ) : (
                          <TrendingDown className="w-4 h-4" />
                        )}
                        <span>{stat.change}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">{stat.label}</p>
                      <p className="text-2xl font-bold text-white">{stat.value}</p>
                    </div>
                  </Card>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Top Performing Plans</h3>
                  <div className="space-y-4">
                    {plans
                      .sort((a, b) => b.apy - a.apy)
                      .slice(0, 3)
                      .map((plan, index) => (
                        <div key={plan.id} className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                                index === 0 ? "bg-yellow-500" : index === 1 ? "bg-gray-400" : "bg-orange-500"
                              }`}
                            >
                              {index + 1}
                            </div>
                            <div>
                              <p className="text-white font-medium">{plan.name}</p>
                              <p className="text-gray-400 text-sm">{plan.apy}% APY</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-white font-medium">{plan.dailyRate}%</p>
                            <p className="text-gray-400 text-sm">Daily Rate</p>
                          </div>
                        </div>
                      ))}
                  </div>
                </Card>

                <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Recent Trends</h3>
                  <div className="space-y-4">
                    {[
                      { metric: "New Registrations", value: "+23%", trend: "up", period: "vs last week" },
                      { metric: "Staking Volume", value: "+15%", trend: "up", period: "vs last month" },
                      { metric: "Withdrawal Requests", value: "-8%", trend: "down", period: "vs last week" },
                      { metric: "Support Tickets", value: "-12%", trend: "down", period: "vs last month" },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                        <div>
                          <p className="text-white font-medium">{item.metric}</p>
                          <p className="text-gray-400 text-sm">{item.period}</p>
                        </div>
                        <div
                          className={`flex items-center space-x-2 ${
                            item.trend === "up" ? "text-green-400" : "text-red-400"
                          }`}
                        >
                          {item.trend === "up" ? (
                            <TrendingUp className="w-4 h-4" />
                          ) : (
                            <TrendingDown className="w-4 h-4" />
                          )}
                          <span className="font-medium">{item.value}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </motion.div>
          )}
        </div>
      </main>

      {/* Edit Plan Modal */}
      {editingPlan && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-4xl max-h-[90vh] overflow-y-auto"
          >
            <Card className="bg-gray-900/95 border-gray-800/50 backdrop-blur-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">Edit Staking Plan</h3>
                <Button
                  onClick={() => setEditingPlan(null)}
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <Label className="text-sm font-medium text-gray-300">Plan Name</Label>
                  <Input
                    value={editingPlan.name}
                    onChange={(e) => setEditingPlan({ ...editingPlan, name: e.target.value })}
                    className="bg-gray-800/50 border-gray-700 text-white"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-300">Daily Rate (%)</Label>
                  <Input
                    type="number"
                    value={editingPlan.dailyRate}
                    onChange={(e) => setEditingPlan({ ...editingPlan, dailyRate: Number.parseFloat(e.target.value) })}
                    className="bg-gray-800/50 border-gray-700 text-white"
                    step="0.01"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-300">Min Stake Amount (SOL)</Label>
                  <Input
                    type="number"
                    value={editingPlan.minStakeAmount}
                    onChange={(e) =>
                      setEditingPlan({ ...editingPlan, minStakeAmount: Number.parseFloat(e.target.value) })
                    }
                    className="bg-gray-800/50 border-gray-700 text-white"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-300">Max Stake Amount (SOL)</Label>
                  <Input
                    type="number"
                    value={editingPlan.maxStakeAmount || 0}
                    onChange={(e) =>
                      setEditingPlan({ ...editingPlan, maxStakeAmount: Number.parseFloat(e.target.value) })
                    }
                    className="bg-gray-800/50 border-gray-700 text-white"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-300">Lock Period (Days)</Label>
                  <Input
                    type="number"
                    value={editingPlan.lockPeriodDays}
                    onChange={(e) =>
                      setEditingPlan({ ...editingPlan, lockPeriodDays: Number.parseInt(e.target.value) })
                    }
                    className="bg-gray-800/50 border-gray-700 text-white"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-300">Early Withdrawal Fee (%)</Label>
                  <Input
                    type="number"
                    value={editingPlan.earlyWithdrawalFee || 0}
                    onChange={(e) =>
                      setEditingPlan({ ...editingPlan, earlyWithdrawalFee: Number.parseFloat(e.target.value) })
                    }
                    className="bg-gray-800/50 border-gray-700 text-white"
                    step="0.1"
                  />
                </div>
              </div>

              <div className="mb-6">
                <Label className="text-sm font-medium text-gray-300">Description</Label>
                <Textarea
                  value={editingPlan.description || ""}
                  onChange={(e) => setEditingPlan({ ...editingPlan, description: e.target.value })}
                  className="bg-gray-800/50 border-gray-700 text-white"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={editingPlan.isActive}
                    onChange={(e) => setEditingPlan({ ...editingPlan, isActive: e.target.checked })}
                    className="rounded border-gray-700 bg-gray-800"
                  />
                  <span className="text-gray-300">Active</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={editingPlan.isPopular}
                    onChange={(e) => setEditingPlan({ ...editingPlan, isPopular: e.target.checked })}
                    className="rounded border-gray-700 bg-gray-800"
                  />
                  <span className="text-gray-300">Popular</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={editingPlan.isPremium}
                    onChange={(e) => setEditingPlan({ ...editingPlan, isPremium: e.target.checked })}
                    className="rounded border-gray-700 bg-gray-800"
                  />
                  <span className="text-gray-300">Premium</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={editingPlan.compoundingEnabled}
                    onChange={(e) => setEditingPlan({ ...editingPlan, compoundingEnabled: e.target.checked })}
                    className="rounded border-gray-700 bg-gray-800"
                  />
                  <span className="text-gray-300">Compounding</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={editingPlan.autoReinvest}
                    onChange={(e) => setEditingPlan({ ...editingPlan, autoReinvest: e.target.checked })}
                    className="rounded border-gray-700 bg-gray-800"
                  />
                  <span className="text-gray-300">Auto Reinvest</span>
                </label>
              </div>

              <div className="flex justify-end space-x-4">
                <Button
                  onClick={() => setEditingPlan(null)}
                  variant="outline"
                  className="border-gray-700 text-gray-300 hover:bg-gray-800/50"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSavePlan}
                  className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Plan
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      )}

      {/* Edit User Modal */}
      {editingUser && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-2xl"
          >
            <Card className="bg-gray-900/95 border-gray-800/50 backdrop-blur-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">Edit User</h3>
                <Button
                  onClick={() => setEditingUser(null)}
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <Label className="text-sm font-medium text-gray-300">First Name</Label>
                  <Input
                    value={editingUser.firstName}
                    onChange={(e) => setEditingUser({ ...editingUser, firstName: e.target.value })}
                    className="bg-gray-800/50 border-gray-700 text-white"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-300">Last Name</Label>
                  <Input
                    value={editingUser.lastName}
                    onChange={(e) => setEditingUser({ ...editingUser, lastName: e.target.value })}
                    className="bg-gray-800/50 border-gray-700 text-white"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-300">Email</Label>
                  <Input
                    type="email"
                    value={editingUser.email}
                    onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                    className="bg-gray-800/50 border-gray-700 text-white"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-300">Country</Label>
                  <Input
                    value={editingUser.country}
                    onChange={(e) => setEditingUser({ ...editingUser, country: e.target.value })}
                    className="bg-gray-800/50 border-gray-700 text-white"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-300">Status</Label>
                  <select
                    value={editingUser.status}
                    onChange={(e) => setEditingUser({ ...editingUser, status: e.target.value as any })}
                    className="w-full bg-gray-800/50 border-gray-700 text-white rounded-md px-3 py-2"
                  >
                    <option value="active">Active</option>
                    <option value="suspended">Suspended</option>
                    <option value="banned">Banned</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-300">KYC Status</Label>
                  <select
                    value={editingUser.kycStatus}
                    onChange={(e) => setEditingUser({ ...editingUser, kycStatus: e.target.value as any })}
                    className="w-full bg-gray-800/50 border-gray-700 text-white rounded-md px-3 py-2"
                  >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-300">Risk Level</Label>
                  <select
                    value={editingUser.riskLevel}
                    onChange={(e) => setEditingUser({ ...editingUser, riskLevel: e.target.value as any })}
                    className="w-full bg-gray-800/50 border-gray-700 text-white rounded-md px-3 py-2"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-300">Referral Code</Label>
                  <Input
                    value={editingUser.referralCode}
                    onChange={(e) => setEditingUser({ ...editingUser, referralCode: e.target.value })}
                    className="bg-gray-800/50 border-gray-700 text-white"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <Button
                  onClick={() => setEditingUser(null)}
                  variant="outline"
                  className="border-gray-700 text-gray-300 hover:bg-gray-800/50"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    setUsers((prev) => prev.map((u) => (u.id === editingUser.id ? editingUser : u)))
                    setEditingUser(null)
                  }}
                  className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save User
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      )}

      {/* Transaction Details Modal */}
      {selectedTransaction && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-2xl"
          >
            <Card className="bg-gray-900/95 border-gray-800/50 backdrop-blur-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">Transaction Details</h3>
                <Button
                  onClick={() => setSelectedTransaction(null)}
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-300">Transaction ID</Label>
                    <p className="text-white font-mono">{selectedTransaction.id}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-300">User</Label>
                    <p className="text-white">{selectedTransaction.userEmail}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-300">Type</Label>
                    <Badge
                      className={
                        selectedTransaction.type === "deposit"
                          ? "bg-green-500/10 text-green-400"
                          : selectedTransaction.type === "withdraw"
                            ? "bg-red-500/10 text-red-400"
                            : "bg-blue-500/10 text-blue-400"
                      }
                    >
                      {selectedTransaction.type}
                    </Badge>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-300">Amount</Label>
                    <p className="text-white font-medium">{selectedTransaction.amount} SOL</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-300">Status</Label>
                    <Badge
                      className={
                        selectedTransaction.status === "completed"
                          ? "bg-green-500/10 text-green-400"
                          : selectedTransaction.status === "pending"
                            ? "bg-yellow-500/10 text-yellow-400"
                            : selectedTransaction.status === "failed"
                              ? "bg-red-500/10 text-red-400"
                              : "bg-gray-500/10 text-gray-400"
                      }
                    >
                      {selectedTransaction.status}
                    </Badge>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-300">Created</Label>
                    <p className="text-white">{new Date(selectedTransaction.createdAt).toLocaleString()}</p>
                  </div>
                </div>

                {selectedTransaction.transactionHash && (
                  <div>
                    <Label className="text-sm font-medium text-gray-300">Transaction Hash</Label>
                    <p className="text-white font-mono text-sm break-all">{selectedTransaction.transactionHash}</p>
                  </div>
                )}

                {selectedTransaction.notes && (
                  <div>
                    <Label className="text-sm font-medium text-gray-300">Notes</Label>
                    <p className="text-white">{selectedTransaction.notes}</p>
                  </div>
                )}
              </div>

              <div className="flex justify-end space-x-4 mt-6">
                <Button
                  onClick={() => setSelectedTransaction(null)}
                  variant="outline"
                  className="border-gray-700 text-gray-300 hover:bg-gray-800/50"
                >
                  Close
                </Button>
                {selectedTransaction.status === "pending" && (
                  <>
                    <Button
                      onClick={() => {
                        handleTransactionAction(selectedTransaction.id, "approve")
                        setSelectedTransaction(null)
                      }}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Approve
                    </Button>
                    <Button
                      onClick={() => {
                        handleTransactionAction(selectedTransaction.id, "reject")
                        setSelectedTransaction(null)
                      }}
                      className="bg-red-600 hover:bg-red-700 text-white"
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Reject
                    </Button>
                  </>
                )}
              </div>
            </Card>
          </motion.div>
        </div>
      )}
    </div>
  )
}
