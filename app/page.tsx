"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  ArrowRight,
  Shield,
  TrendingUp,
  Zap,
  Users,
  Award,
  Lock,
  BarChart3,
  Sparkles,
  Star,
  Cpu,
  Menu,
  X,
  Rocket,
} from "lucide-react"
import { VaultLogo } from "@/components/vault-logo"
import { MorphingBackground } from "@/components/morphing-background"
import { FloatingParticles } from "@/components/floating-particles"
import { AnimatedCounter } from "@/components/animated-counter"
import { CleanDataVisualization } from "@/components/clean-data-visualization"
import { StakingStats } from "@/components/staking-stats"
import { AccessibilityControls } from "@/components/accessibility-controls"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

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

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 6,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <MorphingBackground />
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="w-16 h-16 border-4 border-blue-500/20 border-t-blue-500 rounded-full mx-auto mb-6"
          />
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-2xl font-bold mb-2"
          >
            Initializing Vault
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-gray-400"
          >
            Preparing your staking experience...
          </motion.p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <MorphingBackground />
      <FloatingParticles />
      <AccessibilityControls />

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-50 px-4 lg:px-6 py-6 border-b border-gray-800/50 backdrop-blur-xl"
      >
        <nav className="flex items-center justify-between max-w-7xl mx-auto">
          <motion.div
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <VaultLogo width={180} height={50} className="h-12 w-auto" />
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link href="/why-us" className="text-gray-300 hover:text-white transition-colors">
              Why Us
            </Link>
            <Link href="/plans" className="text-gray-300 hover:text-white transition-colors">
              Staking Plans
            </Link>
            <Link href="/faq" className="text-gray-300 hover:text-white transition-colors">
              FAQ
            </Link>
            <Link href="/roadmap" className="text-gray-300 hover:text-white transition-colors">
              Roadmap
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
            <Link href="/signin">
              <Button className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-6 py-2 rounded-full font-medium transition-all duration-300 group relative overflow-hidden">
                <motion.div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Rocket className="w-4 h-4 mr-2 relative z-10" />
                <span className="relative z-10">Launch App</span>
              </Button>
            </Link>
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
                  href="/why-us"
                  className="text-gray-300 hover:text-white transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Why Us
                </Link>
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
                  href="/roadmap"
                  className="text-gray-300 hover:text-white transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Roadmap
                </Link>
                <div className="pt-4">
                  <Link href="/signin" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-6 py-2 rounded-full font-medium transition-all duration-300 group relative overflow-hidden">
                      <motion.div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <Rocket className="w-4 h-4 mr-2 relative z-10" />
                      <span className="relative z-10">Launch App</span>
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Hero Section */}
      <section className="relative z-10 px-4 lg:px-6 py-12 lg:py-24">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
          >
            <div className="space-y-8">
              <motion.div variants={itemVariants} className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-full px-4 py-2"
                >
                  <Sparkles className="w-4 h-4 text-blue-400" />
                  <span className="text-sm font-medium text-blue-300">Next-Gen Staking Protocol</span>
                </motion.div>

                <h1 className="text-4xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent">
                    Maximize Your
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    Solana Yields
                  </span>
                </h1>

                <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed max-w-2xl">
                  Experience the future of staking with{" "}
                  <span className="text-blue-400 font-semibold">institutional-grade security</span>,{" "}
                  <span className="text-cyan-400 font-semibold">optimized yields</span>, and{" "}
                  <span className="text-purple-400 font-semibold">seamless wallet integration</span>.
                </p>
              </motion.div>

              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
                <Link href="/plans">
                  <Button
                    size="lg"
                    className="group bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105"
                  >
                    Start Staking Now
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/roadmap">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-gray-600 text-gray-300 hover:bg-gray-800/50 hover:border-gray-500 hover:text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 bg-transparent"
                  >
                    View Roadmap
                  </Button>
                </Link>
              </motion.div>

              <motion.div variants={itemVariants} className="grid grid-cols-3 gap-6 pt-8">
                <div className="text-center">
                  <div className="text-2xl lg:text-3xl font-bold text-blue-400 mb-1">
                    <AnimatedCounter end={87.6} suffix="%" decimals={1} duration={2} />
                  </div>
                  <div className="text-sm text-gray-400">Max APY</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl lg:text-3xl font-bold text-cyan-400 mb-1">
                    <AnimatedCounter end={99.97} suffix="%" decimals={2} duration={2} />
                  </div>
                  <div className="text-sm text-gray-400">Uptime</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl lg:text-3xl font-bold text-purple-400 mb-1">
                    <AnimatedCounter end={24} suffix="h" decimals={0} duration={2} />
                  </div>
                  <div className="text-sm text-gray-400">Support</div>
                </div>
              </motion.div>
            </div>

            <motion.div variants={itemVariants} className="relative">
              <div className="relative z-10">
                <CleanDataVisualization />
              </div>
              <motion.div
                variants={floatingVariants}
                animate="animate"
                className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-xl"
              />
              <motion.div
                variants={floatingVariants}
                animate="animate"
                style={{ animationDelay: "2s" }}
                className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-xl"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 px-4 lg:px-6 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto">
          <StakingStats />
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 px-4 lg:px-6 py-12 lg:py-24">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <motion.div variants={itemVariants} className="space-y-4">
              <h2 className="text-3xl lg:text-5xl font-bold">
                <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Why Choose
                </span>{" "}
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Vault</span>
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Built for the next generation of DeFi with cutting-edge technology and institutional-grade security
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
            {[
              {
                icon: Shield,
                title: "Institutional Security",
                description: "Multi-signature wallets, hardware security modules, and formal verification protocols",
                gradient: "from-blue-500 to-blue-600",
                bgGradient: "from-blue-900/20 to-blue-800/10",
              },
              {
                icon: TrendingUp,
                title: "Optimized Yields",
                description: "AI-powered validator selection and MEV extraction for maximum returns",
                gradient: "from-green-500 to-green-600",
                bgGradient: "from-green-900/20 to-green-800/10",
              },
              {
                icon: Zap,
                title: "Lightning Fast",
                description: "Sub-second transaction processing with 99.97% uptime guarantee",
                gradient: "from-yellow-500 to-yellow-600",
                bgGradient: "from-yellow-900/20 to-yellow-800/10",
              },
              {
                icon: Users,
                title: "Community Driven",
                description: "Governed by token holders with transparent decision-making processes",
                gradient: "from-purple-500 to-purple-600",
                bgGradient: "from-purple-900/20 to-purple-800/10",
              },
              {
                icon: Award,
                title: "Proven Track Record",
                description: "Audited by top security firms with $100M+ in total value locked",
                gradient: "from-orange-500 to-orange-600",
                bgGradient: "from-orange-900/20 to-orange-800/10",
              },
              {
                icon: Lock,
                title: "Non-Custodial",
                description: "You maintain full control of your assets with our non-custodial architecture",
                gradient: "from-cyan-500 to-cyan-600",
                bgGradient: "from-cyan-900/20 to-cyan-800/10",
              },
            ].map((feature, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card
                  className={`relative overflow-hidden bg-gradient-to-br ${feature.bgGradient} border-gray-800/50 backdrop-blur-sm p-6 h-full hover:border-gray-700/50 transition-all duration-300 group hover:scale-105`}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                    initial={false}
                  />
                  <div className="relative z-10">
                    <div
                      className={`w-12 h-12 bg-gradient-to-r ${feature.gradient} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-blue-100 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                      {feature.description}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative z-10 px-4 lg:px-6 py-12 lg:py-24 bg-gradient-to-b from-transparent to-gray-900/20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <motion.div variants={itemVariants} className="space-y-4">
              <h2 className="text-3xl lg:text-5xl font-bold">
                <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">How It</span>{" "}
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Works</span>
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Start earning rewards in three simple steps with our streamlined staking process
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12"
          >
            {[
              {
                step: "01",
                title: "Connect Wallet",
                description: "Link your Solana wallet securely with our institutional-grade infrastructure",
                icon: Cpu,
              },
              {
                step: "02",
                title: "Choose Plan",
                description: "Select from our optimized staking plans designed for different risk profiles",
                icon: BarChart3,
              },
              {
                step: "03",
                title: "Earn Rewards",
                description: "Watch your SOL grow with daily compounding rewards and real-time tracking",
                icon: Star,
              },
            ].map((step, index) => (
              <motion.div key={index} variants={itemVariants} className="relative">
                <div className="text-center">
                  <motion.div
                    className="relative mx-auto mb-6"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full flex items-center justify-center mx-auto relative z-10">
                      <step.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-xs font-bold text-white">
                      {step.step}
                    </div>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-500/20 rounded-full blur-xl"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                    />
                  </motion.div>
                  <h3 className="text-xl font-semibold mb-3 text-white">{step.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{step.description}</p>
                </div>
                {index < 2 && (
                  <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-blue-500/50 to-transparent transform -translate-y-1/2 z-0" />
                )}
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
                <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Ready to</span>{" "}
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Start Earning?
                </span>
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Join thousands of investors who trust Vault with their Solana staking. Start earning rewards today.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/plans">
                <Button
                  size="lg"
                  className="group bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105"
                >
                  Explore Staking Plans
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/why-us">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-gray-600 text-gray-300 hover:bg-gray-800/50 hover:border-gray-500 hover:text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 bg-transparent"
                >
                  Learn More
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-gray-800/50 px-4 lg:px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <VaultLogo width={150} height={40} className="h-10 w-auto" />
              <p className="text-gray-400 text-sm leading-relaxed">
                The future of Solana staking with institutional-grade security and optimized yields.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Product</h4>
              <div className="space-y-2">
                <Link href="/plans" className="block text-gray-400 hover:text-white transition-colors text-sm">
                  Staking Plans
                </Link>
                <Link href="/roadmap" className="block text-gray-400 hover:text-white transition-colors text-sm">
                  Roadmap
                </Link>
                <Link href="/why-us" className="block text-gray-400 hover:text-white transition-colors text-sm">
                  Why Us
                </Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Support</h4>
              <div className="space-y-2">
                <Link href="/faq" className="block text-gray-400 hover:text-white transition-colors text-sm">
                  FAQ
                </Link>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors text-sm">
                  Documentation
                </a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors text-sm">
                  Contact
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Legal</h4>
              <div className="space-y-2">
                <a href="#" className="block text-gray-400 hover:text-white transition-colors text-sm">
                  Privacy Policy
                </a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors text-sm">
                  Terms of Service
                </a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors text-sm">
                  Risk Disclosure
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800/50 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © 2024 Vault. All rights reserved. Built with ❤️ for the Solana ecosystem.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
