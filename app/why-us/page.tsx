"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Shield,
  TrendingUp,
  Zap,
  Database,
  Cpu,
  Globe,
  CheckCircle,
  X,
  ArrowRight,
  Award,
  Target,
  Layers,
  Network,
  Brain,
  Menu,
} from "lucide-react"
import { VaultLogo } from "@/components/vault-logo"
import { WalletConnection } from "@/components/wallet-connection"
import { MorphingBackground } from "@/components/morphing-background"
import { FloatingParticles } from "@/components/floating-particles"

export default function WhyUs() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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

  const technicalAdvantages = [
    {
      icon: Brain,
      title: "Advanced Validator Selection Algorithm",
      description:
        "ML-driven selection analyzing 200+ metrics including performance history, commission rates, and network participation",
      metrics: "99.97% uptime accuracy",
      gradient: "from-blue-500 to-blue-600",
    },
    {
      icon: Zap,
      title: "Real-Time Yield Optimization Engine",
      description: "Microsecond-level rebalancing with MEV extraction and cross-validator arbitrage opportunities",
      metrics: "15% MEV capture rate",
      gradient: "from-green-500 to-green-600",
    },
    {
      icon: Shield,
      title: "Multi-Signature Security Infrastructure",
      description: "Enterprise HSMs with formal verification using TLA+ specifications and Byzantine fault tolerance",
      metrics: "Military-grade encryption",
      gradient: "from-purple-500 to-purple-600",
    },
    {
      icon: Target,
      title: "Institutional-Grade Risk Management",
      description: "Monte Carlo simulations with VaR calculations and real-time portfolio optimization algorithms",
      metrics: "99.9% risk accuracy",
      gradient: "from-orange-500 to-orange-600",
    },
    {
      icon: Network,
      title: "High-Performance Infrastructure",
      description: "Sub-10ms latency with 10,000+ TPS capacity using optimized Rust implementations",
      metrics: "<10ms response time",
      gradient: "from-cyan-500 to-cyan-600",
    },
    {
      icon: Layers,
      title: "Advanced DeFi Integration Layer",
      description: "50+ protocol integrations with automated rebalancing and cross-chain yield farming",
      metrics: "50+ integrations",
      gradient: "from-pink-500 to-pink-600",
    },
  ]

  const competitiveBenchmark = [
    {
      metric: "APY Range",
      vault: "43.8% - 87.6%",
      traditional: "5% - 7%",
      advantage: "+1,150%",
    },
    {
      metric: "Validator Uptime",
      vault: "99.97%",
      traditional: "98.5%",
      advantage: "+1.47%",
    },
    {
      metric: "MEV Extraction",
      vault: "15% capture rate",
      traditional: "0%",
      advantage: "∞",
    },
    {
      metric: "Reward Distribution",
      vault: "Real-time",
      traditional: "Epoch-based",
      advantage: "24/7",
    },
    {
      metric: "Risk Management",
      vault: "Quantitative",
      traditional: "Manual",
      advantage: "Automated",
    },
    {
      metric: "Slashing Protection",
      vault: "Insurance backed",
      traditional: "None",
      advantage: "100% covered",
    },
  ]

  const technicalSpecs = [
    {
      category: "Smart Contract Architecture",
      icon: Cpu,
      specs: [
        "SPL Token Program compliance with CPI optimization",
        "Anchor framework with IDL-based type safety",
        "Program Derived Addresses (PDA) for deterministic accounts",
        "Cross-program invocation (CPI) with privilege escalation",
      ],
    },
    {
      category: "Consensus & Validation",
      icon: Globe,
      specs: [
        "Proof-of-History (PoH) timestamp verification",
        "Tower BFT consensus participation scoring",
        "Validator performance metrics with 200+ data points",
        "Real-time slashing condition monitoring",
      ],
    },
    {
      category: "MEV & Arbitrage",
      icon: TrendingUp,
      specs: [
        "Jito MEV-boost integration with priority fee optimization",
        "Cross-DEX arbitrage with Jupiter aggregator",
        "Flashloan-based liquidation strategies",
        "Sandwich attack protection mechanisms",
      ],
    },
    {
      category: "Risk & Compliance",
      icon: Shield,
      specs: [
        "Real-time VaR calculation with Monte Carlo simulations",
        "AML/KYC integration with Chainalysis",
        "Regulatory compliance with MiCA standards",
        "Immutable audit trails with cryptographic proofs",
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      <MorphingBackground />
      <FloatingParticles />

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
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/" className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm">Back to Home</span>
              </Link>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link href="/plans" className="text-gray-300 hover:text-white transition-colors">
              Staking Plans
            </Link>
            <Link href="/faq" className="text-gray-300 hover:text-white transition-colors">
              FAQ
            </Link>
            <Link href="/dashboard" className="text-gray-300 hover:text-white transition-colors">
              Dashboard
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>

          <div className="hidden lg:block">
            <WalletConnection />
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden mt-4 py-4 border-t border-gray-800/50"
            >
              <div className="flex flex-col space-y-4">
                <Link
                  href="/plans"
                  className="text-gray-300 hover:text-white transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Staking Plans
                </Link>
                <Link
                  href="/faq"
                  className="text-gray-300 hover:text-white transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  FAQ
                </Link>
                <Link
                  href="/dashboard"
                  className="text-gray-300 hover:text-white transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <div className="pt-4">
                  <WalletConnection />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Hero Section */}
      <section className="relative z-10 px-4 lg:px-6 py-12 lg:py-24">
        <div className="max-w-7xl mx-auto">
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="text-center mb-16">
            <motion.div variants={itemVariants} className="space-y-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-full px-4 py-2"
              >
                <Award className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-medium text-blue-300">Technical Excellence</span>
              </motion.div>

              <h1 className="text-4xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent">
                  Why Vault Leads
                </span>
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Solana Staking
                </span>
              </h1>

              <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed max-w-4xl mx-auto">
                Built on cutting-edge infrastructure with{" "}
                <span className="text-blue-400 font-semibold">institutional-grade security</span>,{" "}
                <span className="text-cyan-400 font-semibold">advanced algorithms</span>, and{" "}
                <span className="text-purple-400 font-semibold">quantitative risk management</span>.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Technical Advantages */}
      <section className="relative z-10 px-4 lg:px-6 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="mb-16"
          >
            <motion.div variants={itemVariants} className="text-center space-y-4">
              <h2 className="text-3xl lg:text-5xl font-bold">
                <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Technical</span>{" "}
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Advantages
                </span>
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Our proprietary technology stack delivers unmatched performance and security
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {technicalAdvantages.map((advantage, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="relative overflow-hidden bg-gray-900/50 border-gray-800/50 backdrop-blur-sm p-6 h-full hover:border-blue-500/30 transition-all duration-300 group">
                  <div className="relative z-10">
                    <div
                      className={`w-12 h-12 bg-gradient-to-r ${advantage.gradient} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <advantage.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-white">{advantage.title}</h3>
                    <p className="text-gray-400 leading-relaxed mb-4">{advantage.description}</p>
                    <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20">{advantage.metrics}</Badge>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Competitive Benchmark */}
      <section className="relative z-10 px-4 lg:px-6 py-12 lg:py-16 bg-gradient-to-b from-transparent to-gray-900/20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="mb-16"
          >
            <motion.div variants={itemVariants} className="text-center space-y-4">
              <h2 className="text-3xl lg:text-5xl font-bold">
                <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Competitive
                </span>{" "}
                <span className="bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
                  Benchmark
                </span>
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                See how Vault outperforms traditional staking solutions across key metrics
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-800/50">
                      <th className="text-left p-6 text-gray-300 font-semibold">Metric</th>
                      <th className="text-left p-6 text-blue-400 font-semibold">Vault</th>
                      <th className="text-left p-6 text-gray-400 font-semibold">Traditional</th>
                      <th className="text-left p-6 text-green-400 font-semibold">Advantage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {competitiveBenchmark.map((row, index) => (
                      <motion.tr
                        key={index}
                        variants={itemVariants}
                        className="border-b border-gray-800/30 hover:bg-gray-800/20 transition-colors"
                      >
                        <td className="p-6 text-white font-medium">{row.metric}</td>
                        <td className="p-6 text-blue-400 font-semibold">{row.vault}</td>
                        <td className="p-6 text-gray-400">{row.traditional}</td>
                        <td className="p-6 text-green-400 font-semibold">{row.advantage}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="relative z-10 px-4 lg:px-6 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="mb-16"
          >
            <motion.div variants={itemVariants} className="text-center space-y-4">
              <h2 className="text-3xl lg:text-5xl font-bold">
                <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Technical</span>{" "}
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Specifications
                </span>
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Deep dive into our advanced technology stack and implementation details
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {technicalSpecs.map((spec, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm p-6 h-full">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                      <spec.icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">{spec.category}</h3>
                  </div>
                  <div className="space-y-3">
                    {spec.specs.map((item, specIndex) => (
                      <div key={specIndex} className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-300 text-sm leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* System Architecture */}
      <section className="relative z-10 px-4 lg:px-6 py-12 lg:py-16 bg-gradient-to-b from-transparent to-gray-900/20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="mb-16"
          >
            <motion.div variants={itemVariants} className="text-center space-y-4">
              <h2 className="text-3xl lg:text-5xl font-bold">
                <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">System</span>{" "}
                <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  Architecture
                </span>
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Three-layer architecture designed for maximum security, performance, and scalability
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                layer: "Data Layer",
                icon: Database,
                description: "Real-time market data aggregation and validator metrics collection",
                features: ["200+ validator metrics", "Sub-second data updates", "Historical analytics", "Risk scoring"],
                gradient: "from-blue-500 to-blue-600",
              },
              {
                layer: "Execution Layer",
                icon: Cpu,
                description: "Automated rebalancing and MEV extraction with smart routing",
                features: ["Microsecond rebalancing", "MEV optimization", "Cross-validator arbitrage", "Yield farming"],
                gradient: "from-green-500 to-green-600",
              },
              {
                layer: "Security Layer",
                icon: Shield,
                description: "Multi-signature governance and institutional custody solutions",
                features: [
                  "Hardware security modules",
                  "Formal verification",
                  "Multi-sig wallets",
                  "Insurance coverage",
                ],
                gradient: "from-purple-500 to-purple-600",
              },
            ].map((layer, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="relative overflow-hidden bg-gray-900/50 border-gray-800/50 backdrop-blur-sm p-6 h-full hover:border-blue-500/30 transition-all duration-300 group">
                  <div className="relative z-10">
                    <div
                      className={`w-12 h-12 bg-gradient-to-r ${layer.gradient} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <layer.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-white">{layer.layer}</h3>
                    <p className="text-gray-400 leading-relaxed mb-6">{layer.description}</p>
                    <div className="space-y-2">
                      {layer.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                          <span className="text-gray-300 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-4 lg:px-6 py-12 lg:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-8"
          >
            <motion.div variants={itemVariants} className="space-y-6">
              <h2 className="text-3xl lg:text-5xl font-bold">
                <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Experience the
                </span>{" "}
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Future of Staking
                </span>
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Join the next generation of institutional investors leveraging advanced technology for superior returns.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/plans">
                <Button
                  size="lg"
                  className="group bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105"
                >
                  Start Advanced Staking
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-gray-600 text-gray-300 hover:bg-gray-800/50 hover:border-gray-500 hover:text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 bg-transparent"
                >
                  View Dashboard
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
