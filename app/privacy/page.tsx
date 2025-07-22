"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { VaultLogo } from "@/components/vault-logo"
import { MorphingBackground } from "@/components/morphing-background"
import { FloatingParticles } from "@/components/floating-particles"

export default function PrivacyPolicy() {
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
        </nav>
      </motion.header>

      {/* Main Content */}
      <main className="relative z-10 px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Privacy{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Policy</span>
            </h1>
            <p className="text-xl text-gray-400">Last updated: January 21, 2025</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="prose prose-invert prose-blue max-w-none"
          >
            <div className="space-y-8 text-gray-300 leading-relaxed">
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
                <p>
                  Vault ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how
                  we collect, use, disclose, and safeguard your information when you use our decentralized finance
                  platform and services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">2. Information We Collect</h2>
                <h3 className="text-xl font-semibold text-white mb-3">Personal Information</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Email address and contact information</li>
                  <li>Account credentials and authentication data</li>
                  <li>Identity verification documents (KYC/AML compliance)</li>
                  <li>Payment and transaction information</li>
                </ul>

                <h3 className="text-xl font-semibold text-white mb-3 mt-6">Blockchain Data</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Wallet addresses and public keys</li>
                  <li>Transaction history and blockchain interactions</li>
                  <li>Staking positions and reward distributions</li>
                  <li>Smart contract interactions</li>
                </ul>

                <h3 className="text-xl font-semibold text-white mb-3 mt-6">Technical Information</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>IP address and device information</li>
                  <li>Browser type and operating system</li>
                  <li>Usage patterns and analytics data</li>
                  <li>Cookies and tracking technologies</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">3. How We Use Your Information</h2>
                <p>We use your information to:</p>
                <ul className="list-disc pl-6 space-y-2 mt-4">
                  <li>Provide and maintain our DeFi services</li>
                  <li>Process transactions and staking operations</li>
                  <li>Verify your identity and comply with regulations</li>
                  <li>Communicate with you about your account and services</li>
                  <li>Improve our platform and develop new features</li>
                  <li>Detect and prevent fraud and security threats</li>
                  <li>Comply with legal obligations and regulatory requirements</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">4. Vault Card Data Processing</h2>
                <p>When the Vault Card launches in 2026, we will process additional data including:</p>
                <ul className="list-disc pl-6 space-y-2 mt-4">
                  <li>Biometric data for card authentication</li>
                  <li>Transaction data from point-of-sale systems</li>
                  <li>Location data for fraud prevention</li>
                  <li>Merchant and purchase information</li>
                  <li>Cashback and rewards program data</li>
                </ul>
                <p className="mt-4">
                  All biometric data will be encrypted and stored securely, with additional consent obtained before
                  processing.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">5. Information Sharing and Disclosure</h2>
                <p>We may share your information with:</p>
                <ul className="list-disc pl-6 space-y-2 mt-4">
                  <li>Service providers and business partners</li>
                  <li>Regulatory authorities and law enforcement</li>
                  <li>Payment processors and financial institutions</li>
                  <li>Blockchain networks and validators</li>
                  <li>Third-party security and compliance services</li>
                </ul>
                <p className="mt-4">
                  We do not sell your personal information to third parties for marketing purposes.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">6. Data Security</h2>
                <p>We implement industry-standard security measures to protect your information, including:</p>
                <ul className="list-disc pl-6 space-y-2 mt-4">
                  <li>End-to-end encryption for sensitive data</li>
                  <li>Multi-signature wallet security</li>
                  <li>Regular security audits and penetration testing</li>
                  <li>Access controls and authentication protocols</li>
                  <li>Secure data storage and transmission</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">7. Blockchain Privacy Considerations</h2>
                <p>
                  Please note that blockchain transactions are publicly visible and immutable. While we implement
                  privacy-preserving technologies where possible, some information may be permanently recorded on public
                  blockchains.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">8. Cookies and Tracking</h2>
                <p>
                  We use cookies and similar technologies to enhance your experience, analyze usage patterns, and
                  provide personalized services. You can control cookie settings through your browser preferences.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">9. Data Retention</h2>
                <p>
                  We retain your information for as long as necessary to provide our services, comply with legal
                  obligations, and resolve disputes. Blockchain data may be retained indefinitely due to the immutable
                  nature of distributed ledgers.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">10. Your Rights</h2>
                <p>Depending on your jurisdiction, you may have the right to:</p>
                <ul className="list-disc pl-6 space-y-2 mt-4">
                  <li>Access and review your personal information</li>
                  <li>Correct inaccurate or incomplete data</li>
                  <li>Delete your personal information (subject to legal requirements)</li>
                  <li>Object to or restrict processing of your data</li>
                  <li>Data portability and transfer rights</li>
                  <li>Withdraw consent for data processing</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">11. International Data Transfers</h2>
                <p>
                  Your information may be transferred to and processed in countries other than your own. We ensure
                  appropriate safeguards are in place for international transfers, including standard contractual
                  clauses and adequacy decisions.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">12. Children's Privacy</h2>
                <p>
                  Our services are not intended for individuals under 18 years of age. We do not knowingly collect
                  personal information from children. If we become aware of such collection, we will take steps to
                  delete the information.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">13. Changes to This Policy</h2>
                <p>
                  We may update this Privacy Policy periodically. We will notify you of material changes by posting the
                  updated policy on our website and, where appropriate, through other communication channels.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">14. Contact Us</h2>
                <p>If you have questions about this Privacy Policy or our data practices, please contact us:</p>
                <div className="mt-4 p-4 bg-gray-900/50 rounded-lg border border-gray-800/50">
                  <p>Email: privacy@vault.finance</p>
                  <p>Data Protection Officer: dpo@vault.finance</p>
                  <p>Address: [Company Address]</p>
                </div>
              </section>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
