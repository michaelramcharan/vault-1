"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { ArrowLeft, ChevronDown, Shield, TrendingUp, Lock, AlertCircle, Clock, DollarSign } from "lucide-react"
import { VaultLogo } from "@/components/vault-logo"
import { MorphingBackground } from "@/components/morphing-background"
import { FloatingParticles } from "@/components/floating-particles"

interface FAQItem {
  id: string
  question: string
  answer: string
  category: "security" | "returns" | "general" | "technical"
  icon: React.ComponentType<{ className?: string }>
}

export default function FAQ() {
  const [openItems, setOpenItems] = useState<string[]>([])
  const [activeCategory, setActiveCategory] = useState<string>("all")

  const faqItems: FAQItem[] = [
    // Security Questions
    {
      id: "security-1",
      question: "How secure are my funds when staking with Vault?",
      answer:
        "Your funds are protected by multiple layers of security: multi-signature wallets requiring multiple approvals for any transaction, institutional-grade cold storage for the majority of funds, smart contract audits by leading security firms, insurance coverage up to $10M through our partners, and 24/7 monitoring systems. We never have direct access to withdraw your funds without your explicit consent.",
      category: "security",
      icon: Shield,
    },
    {
      id: "security-2",
      question: "What happens if Vault gets hacked or goes offline?",
      answer:
        "In the unlikely event of a security breach, your funds remain protected through our insurance coverage and decentralized architecture. Our smart contracts include emergency pause mechanisms and fund recovery procedures. Additionally, we maintain offline backup systems and partner with leading security firms for incident response. Your staking positions are recorded on-chain, ensuring transparency and recoverability.",
      category: "security",
      icon: Lock,
    },
    {
      id: "security-3",
      question: "Can I lose my staked SOL?",
      answer:
        "Staking with Vault carries minimal risk. The main risks are: temporary price fluctuations of SOL (market risk), early withdrawal penalties if you unstake before the lock period ends, and extremely rare smart contract risks (mitigated by audits and insurance). Your principal amount is never at risk from staking activities themselves - you will always be able to withdraw your original SOL plus any earned rewards.",
      category: "security",
      icon: AlertCircle,
    },
    {
      id: "security-4",
      question: "How do you protect against smart contract vulnerabilities?",
      answer:
        "Our smart contracts undergo rigorous security audits by top-tier firms including Trail of Bits and Quantstamp. We implement formal verification, extensive testing, and gradual rollouts. All contracts are open-source and have been battle-tested with millions in TVL. We also maintain a bug bounty program offering up to $100,000 for critical vulnerability discoveries.",
      category: "security",
      icon: Shield,
    },

    // Returns Questions
    {
      id: "returns-1",
      question: "How are the daily returns calculated and distributed?",
      answer:
        "Daily returns are calculated based on your staking plan's rate (1.2% for Core, 1.8% for Prime, 2.4% for Apex). Returns are automatically calculated every 24 hours and added to your available balance. The calculation is: (Staked Amount × Daily Rate) = Daily Reward. For example, staking 100 SOL in the Prime plan earns 1.8 SOL daily. Rewards compound if you restake them.",
      category: "returns",
      icon: TrendingUp,
    },
    {
      id: "returns-2",
      question: "Are the advertised returns guaranteed?",
      answer:
        "The daily rates shown (1.2%, 1.8%, 2.4%) are target rates based on current network conditions and our optimization strategies. While we strive to maintain these rates, actual returns may vary due to network performance, validator efficiency, and market conditions. Historical performance shows we've consistently met or exceeded target rates over 95% of the time. Returns are never guaranteed in DeFi.",
      category: "returns",
      icon: DollarSign,
    },
    {
      id: "returns-3",
      question: "When can I withdraw my staked SOL and rewards?",
      answer:
        "You can withdraw your rewards at any time with no restrictions. Your staked principal can be withdrawn after the lock period (15 days for Core, 30 days for Prime, 60 days for Apex). Early withdrawal is possible but incurs a 10% penalty on accumulated rewards. Once the lock period ends, you can withdraw your full principal plus all rewards instantly.",
      category: "returns",
      icon: Clock,
    },
    {
      id: "returns-4",
      question: "How do your returns compare to other staking platforms?",
      answer:
        "Our returns are competitive with leading platforms while offering superior security and user experience. Traditional Solana staking offers 5-7% APY, while our optimized strategies target 43.8% to 87.6% APY through advanced yield farming, MEV capture, and validator optimization. We achieve this through institutional partnerships, automated rebalancing, and proprietary algorithms.",
      category: "returns",
      icon: TrendingUp,
    },

    // General Questions
    {
      id: "general-1",
      question: "What is the minimum amount I can stake?",
      answer:
        "Minimum staking amounts vary by plan: Core Plan requires 1 SOL minimum, Prime Plan requires 10 SOL minimum, and Apex Plan requires 100 SOL minimum. These minimums ensure efficient gas usage and optimal reward distribution. You can stake any amount above the minimum, including fractional SOL amounts.",
      category: "general",
      icon: DollarSign,
    },
    {
      id: "general-2",
      question: "How do I get started with staking?",
      answer:
        "Getting started is simple: 1) Connect your Solana wallet (Phantom, Solflare, etc.), 2) Choose your staking plan based on your investment goals, 3) Deposit SOL into your Vault account, 4) Select the amount to stake and confirm the transaction. Your staking position will be active immediately and you'll start earning rewards within 24 hours.",
      category: "general",
      icon: Clock,
    },
    {
      id: "general-3",
      question: "What wallets are supported?",
      answer:
        "We support all major Solana wallets including Phantom, Solflare, Slope, Sollet, and any wallet compatible with the Solana Web3.js standard. We recommend Phantom for the best user experience. Hardware wallets like Ledger are also supported for maximum security. You maintain full custody of your wallet - we never store your private keys.",
      category: "general",
      icon: Lock,
    },

    // Technical Questions
    {
      id: "technical-1",
      question: "What blockchain technology does Vault use?",
      answer:
        "Vault is built on Solana, leveraging its high-speed, low-cost infrastructure. We use Solana's native staking mechanisms combined with our proprietary smart contracts for yield optimization. Our platform integrates with Solana's validator network and utilizes advanced features like stake pools and MEV extraction for enhanced returns.",
      category: "technical",
      icon: Shield,
    },
    {
      id: "technical-2",
      question: "How often are rewards calculated and distributed?",
      answer:
        "Rewards are calculated every 24 hours at 00:00 UTC and automatically distributed to your account. The calculation runs on our secure backend systems and is verified on-chain. You can track your rewards in real-time through your dashboard. There are no manual claims required - everything is automated for your convenience.",
      category: "technical",
      icon: Clock,
    },
  ]

  const categories = [
    { id: "all", name: "All Questions", icon: AlertCircle },
    { id: "security", name: "Security", icon: Shield },
    { id: "returns", name: "Returns", icon: TrendingUp },
    { id: "general", name: "General", icon: DollarSign },
    { id: "technical", name: "Technical", icon: Lock },
  ]

  const filteredFAQs = activeCategory === "all" ? faqItems : faqItems.filter((item) => item.category === activeCategory)

  const toggleItem = (id: string) => {
    setOpenItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <MorphingBackground />
      <FloatingParticles />

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-50 px-6 py-6 border-b border-gray-800/50 backdrop-blur-xl"
      >
        <nav className="flex items-center justify-between max-w-7xl mx-auto">
          <Link href="/">
            <motion.div
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <VaultLogo width={200} height={55} className="h-14 w-auto" />
            </motion.div>
          </Link>
          <div className="flex items-center space-x-6">
            <Link href="/" className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Back to Home</span>
            </Link>
            <Link href="/signin">
              <Button
                variant="outline"
                className="bg-transparent border-blue-500/30 text-blue-400 hover:bg-blue-500/10 hover:border-blue-400 hover:text-blue-300 transition-all duration-300 rounded-full px-6 font-medium"
              >
                Launch App
              </Button>
            </Link>
          </div>
        </nav>
      </motion.header>

      {/* Main Content */}
      <main className="relative z-10 px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Frequently Asked{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Questions
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Everything you need to know about staking with Vault, security measures, and earning returns
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  variant={activeCategory === category.id ? "default" : "outline"}
                  className={`${
                    activeCategory === category.id
                      ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white"
                      : "border-gray-700 text-gray-300 hover:bg-gray-800/50 hover:border-gray-600 hover:text-white"
                  } transition-all duration-300 rounded-full px-6 py-2`}
                >
                  <category.icon className="w-4 h-4 mr-2" />
                  {category.name}
                </Button>
              ))}
            </div>
          </motion.div>

          {/* FAQ Items */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-4"
          >
            {filteredFAQs.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm overflow-hidden hover:border-blue-500/30 transition-all duration-300">
                  <button
                    onClick={() => toggleItem(item.id)}
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-800/30 transition-colors duration-200"
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          item.category === "security"
                            ? "bg-gradient-to-r from-green-500 to-green-600"
                            : item.category === "returns"
                              ? "bg-gradient-to-r from-blue-500 to-cyan-400"
                              : item.category === "general"
                                ? "bg-gradient-to-r from-purple-500 to-purple-600"
                                : "bg-gradient-to-r from-gray-500 to-gray-600"
                        }`}
                      >
                        <item.icon className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-white pr-4">{item.question}</h3>
                    </div>
                    <motion.div
                      animate={{ rotate: openItems.includes(item.id) ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {openItems.includes(item.id) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pt-0">
                          <div className="pl-14">
                            <p className="text-gray-300 leading-relaxed">{item.answer}</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16"
          >
            <Card className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border-blue-500/30 backdrop-blur-sm p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
              <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
                Our team is here to help. Reach out to us for personalized support and detailed answers to your staking
                questions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-8 py-3 rounded-full font-medium transition-all duration-300">
                  Contact Support
                </Button>
                <Link href="/signin">
                  <Button
                    variant="outline"
                    className="border-gray-700 text-gray-300 hover:bg-gray-800/50 hover:border-gray-600 hover:text-white px-8 py-3 rounded-full font-medium transition-all duration-300"
                  >
                    Start Staking
                  </Button>
                </Link>
              </div>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
