"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowLeft, Rocket, Shield, TrendingUp, CreditCard, Globe, Brain, CheckCircle, Clock, Star } from "lucide-react"
import { VaultLogo } from "@/components/vault-logo"
import { MorphingBackground } from "@/components/morphing-background"
import { FloatingParticles } from "@/components/floating-particles"

export default function Roadmap() {
  const roadmapItems = [
    {
      year: "2024",
      quarter: "Q1-Q4",
      title: "Foundation & Core Infrastructure",
      status: "in-progress",
      features: [
        "Liquid Staking Protocol with MEV-boost integration",
        "Automated Yield Optimization Engine",
        "Multi-signature Treasury Management",
        "Cross-chain Bridge Infrastructure (Solana ↔ Ethereum)",
        "Institutional-grade Custody Solutions",
        "Advanced Risk Management Framework",
      ],
      description:
        "Building the foundational infrastructure for secure, scalable DeFi operations with institutional-grade security and compliance.",
      icon: Shield,
      color: "blue",
    },
    {
      year: "2025",
      quarter: "Q1-Q4",
      title: "Advanced Trading & Derivatives",
      status: "planned",
      features: [
        "Algorithmic Trading Strategies with AI optimization",
        "Perpetual Futures and Options Trading",
        "Flash Loan Aggregation Protocol",
        "Decentralized Margin Trading Platform",
        "Synthetic Asset Creation and Management",
        "Advanced Portfolio Analytics Dashboard",
      ],
      description:
        "Expanding into sophisticated trading instruments and AI-powered investment strategies for maximum yield generation.",
      icon: TrendingUp,
      color: "cyan",
    },
    {
      year: "2026",
      quarter: "Q1-Q4",
      title: "Vault Card & Payment Revolution",
      status: "planned",
      features: [
        "🎯 Vault Card Launch - Spend crypto at 50M+ merchants worldwide",
        "Real-time Crypto-to-Fiat Settlement Engine",
        "Up to 5% SOL Cashback Rewards Program",
        "Mobile NFC Payments with Biometric Security",
        "Merchant API Integration Platform",
        "Cross-border Payment Solutions",
      ],
      description:
        "Revolutionary payment card that bridges DeFi and traditional finance, allowing seamless spending with crypto rewards.",
      icon: CreditCard,
      color: "purple",
      highlight: true,
    },
    {
      year: "2027",
      quarter: "Q1-Q4",
      title: "Regulatory Compliance & Banking",
      status: "planned",
      features: [
        "Full Banking License Acquisition",
        "FDIC Insurance Integration",
        "Traditional Banking API Connectivity",
        "Regulatory Compliance Automation",
        "Institutional Investment Products",
        "AI-powered Robo-advisor Platform",
      ],
      description:
        "Achieving full regulatory compliance and traditional banking integration while maintaining DeFi innovation.",
      icon: Globe,
      color: "green",
    },
    {
      year: "2028",
      quarter: "Q1-Q4",
      title: "Next-Gen Financial Ecosystem",
      status: "planned",
      features: [
        "Decentralized Identity (DID) Integration",
        "Real Estate Tokenization Platform",
        "Quantum-resistant Security Protocols",
        "Carbon Credit Trading Marketplace",
        "Metaverse Asset Management",
        "Global Financial Inclusion Initiative",
      ],
      description:
        "Building the future of finance with cutting-edge technology and global accessibility for the next billion users.",
      icon: Brain,
      color: "orange",
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-400" />
      case "in-progress":
        return <Clock className="w-5 h-5 text-blue-400" />
      default:
        return <Star className="w-5 h-5 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500/10 text-green-400 border-green-500/20"
      case "in-progress":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20"
      default:
        return "bg-gray-500/10 text-gray-400 border-gray-500/20"
    }
  }

  const getCardColor = (color: string, highlight?: boolean) => {
    const baseColors = {
      blue: "border-blue-500/30 bg-blue-900/10",
      cyan: "border-cyan-500/30 bg-cyan-900/10",
      purple: "border-purple-500/30 bg-purple-900/10",
      green: "border-green-500/30 bg-green-900/10",
      orange: "border-orange-500/30 bg-orange-900/10",
    }

    if (highlight) {
      return `${baseColors[color as keyof typeof baseColors]} ring-2 ring-purple-500/20`
    }

    return baseColors[color as keyof typeof baseColors] || baseColors.blue
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
          <div className="flex items-center space-x-6">
            <Link href="/">
              <motion.div
                className="flex items-center space-x-3"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <VaultLogo width={240} height={65} className="h-16 w-auto" />
              </motion.div>
            </Link>
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/" className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm">Back to Home</span>
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/signin">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-6 py-2 rounded-full font-medium transition-all duration-300 group relative overflow-hidden"
              >
                <motion.div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Rocket className="w-4 h-4 mr-2 inline relative z-10" />
                <span className="relative z-10">Launch App</span>
              </motion.button>
            </Link>
          </div>
        </nav>
      </motion.header>

      {/* Main Content */}
      <main className="relative z-10 px-6 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Vault{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Roadmap</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Our 5-year journey to revolutionize decentralized finance, culminating in the groundbreaking Vault Card
              that bridges crypto and traditional payments with SOL rewards.
            </p>
          </motion.div>

          {/* Roadmap Timeline */}
          <div className="space-y-12">
            {roadmapItems.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className={`relative ${index % 2 === 0 ? "lg:pr-8" : "lg:pl-8 lg:ml-auto"} lg:w-1/2`}
              >
                {/* Timeline connector */}
                <div
                  className="hidden lg:block absolute top-8 w-4 h-4 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transform -translate-y-1/2 z-10"
                  style={{
                    [index % 2 === 0 ? "right" : "left"]: "-8px",
                  }}
                />

                <Card
                  className={`${getCardColor(item.color, item.highlight)} backdrop-blur-sm p-8 relative overflow-hidden`}
                >
                  {item.highlight && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5"
                      animate={{ opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                    />
                  )}

                  <div className="relative z-10">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-4">
                        <div
                          className={`w-12 h-12 rounded-lg bg-gradient-to-r ${
                            item.color === "blue"
                              ? "from-blue-500 to-blue-600"
                              : item.color === "cyan"
                                ? "from-cyan-500 to-cyan-600"
                                : item.color === "purple"
                                  ? "from-purple-500 to-purple-600"
                                  : item.color === "green"
                                    ? "from-green-500 to-green-600"
                                    : "from-orange-500 to-orange-600"
                          } flex items-center justify-center`}
                        >
                          <item.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-white">{item.year}</h3>
                          <p className="text-sm text-gray-400">{item.quarter}</p>
                        </div>
                      </div>
                      <Badge className={`${getStatusColor(item.status)} flex items-center space-x-1`}>
                        {getStatusIcon(item.status)}
                        <span className="capitalize">{item.status.replace("-", " ")}</span>
                      </Badge>
                    </div>

                    {/* Title and Description */}
                    <h4 className="text-xl font-semibold text-white mb-3">{item.title}</h4>
                    <p className="text-gray-300 mb-6 leading-relaxed">{item.description}</p>

                    {/* Features */}
                    <div className="space-y-3">
                      <h5 className="text-lg font-medium text-white mb-3">Key Features:</h5>
                      <div className="grid gap-3">
                        {item.features.map((feature, featureIndex) => (
                          <motion.div
                            key={featureIndex}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.2 + featureIndex * 0.1 }}
                            className={`flex items-start space-x-3 p-3 rounded-lg ${
                              feature.includes("🎯") ? "bg-purple-500/10 border border-purple-500/20" : "bg-gray-800/30"
                            }`}
                          >
                            <div
                              className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                                feature.includes("🎯") ? "bg-purple-400" : "bg-blue-400"
                              }`}
                            />
                            <span
                              className={`text-sm leading-relaxed ${
                                feature.includes("🎯") ? "text-purple-200 font-medium" : "text-gray-300"
                              }`}
                            >
                              {feature}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Timeline Line */}
          <div
            className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-cyan-400 to-purple-500 transform -translate-x-1/2"
            style={{ height: "100%", top: "200px" }}
          />

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="text-center mt-16"
          >
            <Card className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-blue-500/30 backdrop-blur-sm p-8">
              <h3 className="text-2xl font-bold text-white mb-4">Ready to Join the Future?</h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Be part of the DeFi revolution and get early access to groundbreaking features, including the exclusive
                Vault Card launching in 2026.
              </p>
              <Link href="/signin">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-full font-medium transition-all duration-300 group relative overflow-hidden"
                >
                  <motion.div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-pink-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Rocket className="w-5 h-5 mr-2 inline relative z-10" />
                  <span className="relative z-10">Start Your Journey</span>
                </motion.button>
              </Link>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
