"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { VaultLogo } from "@/components/vault-logo"
import { MorphingBackground } from "@/components/morphing-background"
import { FloatingParticles } from "@/components/floating-particles"

export default function TermsOfService() {
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
              Terms of{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Service</span>
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
                <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
                <p>
                  By accessing or using Vault's services, you agree to be bound by these Terms of Service and all
                  applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from
                  using or accessing this site and our services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">2. Description of Service</h2>
                <p>
                  Vault provides decentralized finance (DeFi) services including but not limited to cryptocurrency
                  staking, yield farming, liquidity provision, and related financial services on the Solana blockchain.
                  Our services are designed to help users earn rewards through various DeFi protocols and strategies.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">3. Eligibility</h2>
                <p>
                  You must be at least 18 years old and have the legal capacity to enter into contracts in your
                  jurisdiction. By using our services, you represent and warrant that you meet these eligibility
                  requirements and that all information you provide is accurate and complete.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">4. Account Registration and Security</h2>
                <p>
                  To access certain features, you may need to create an account. You are responsible for maintaining the
                  confidentiality of your account credentials and for all activities that occur under your account. You
                  must immediately notify us of any unauthorized use of your account.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">5. Staking and Investment Risks</h2>
                <p>
                  Cryptocurrency staking and DeFi activities involve significant risks, including but not limited to:
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-4">
                  <li>Market volatility and potential loss of principal</li>
                  <li>Smart contract vulnerabilities and technical risks</li>
                  <li>Regulatory changes that may affect service availability</li>
                  <li>Slashing risks in proof-of-stake networks</li>
                  <li>Impermanent loss in liquidity provision</li>
                </ul>
                <p className="mt-4">
                  You acknowledge that you understand these risks and that Vault does not guarantee any returns or
                  profits from staking activities.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">6. Fees and Payments</h2>
                <p>
                  Vault may charge fees for certain services. All applicable fees will be clearly disclosed before you
                  commit to any transaction. Fees are non-refundable unless otherwise specified. Network transaction
                  fees (gas fees) are separate and paid directly to the blockchain network.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">7. Vault Card Services</h2>
                <p>
                  Upon launch in 2026, the Vault Card will provide payment services allowing users to spend their
                  cryptocurrency holdings at point-of-sale merchants. Card services will be subject to additional terms
                  and conditions, regulatory compliance requirements, and partnership agreements with payment
                  processors.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">8. Prohibited Activities</h2>
                <p>You agree not to:</p>
                <ul className="list-disc pl-6 space-y-2 mt-4">
                  <li>Use our services for any illegal or unauthorized purpose</li>
                  <li>Attempt to manipulate or exploit our systems</li>
                  <li>Engage in money laundering or terrorist financing</li>
                  <li>Violate any applicable laws or regulations</li>
                  <li>Interfere with the security or integrity of our services</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">9. Intellectual Property</h2>
                <p>
                  All content, trademarks, and intellectual property on our platform are owned by Vault or our
                  licensors. You may not use, reproduce, or distribute any content without our express written
                  permission.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">10. Limitation of Liability</h2>
                <p>
                  To the maximum extent permitted by law, Vault shall not be liable for any indirect, incidental,
                  special, consequential, or punitive damages, including but not limited to loss of profits, data, or
                  use, arising out of or relating to your use of our services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">11. Indemnification</h2>
                <p>
                  You agree to indemnify and hold harmless Vault and its affiliates from any claims, damages, or
                  expenses arising out of your use of our services, violation of these terms, or infringement of any
                  third-party rights.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">12. Termination</h2>
                <p>
                  We may terminate or suspend your access to our services at any time, with or without cause, and with
                  or without notice. Upon termination, your right to use our services will cease immediately.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">13. Governing Law and Dispute Resolution</h2>
                <p>
                  These terms shall be governed by and construed in accordance with the laws of [Jurisdiction]. Any
                  disputes arising out of or relating to these terms shall be resolved through binding arbitration in
                  accordance with the rules of [Arbitration Organization].
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">14. Changes to Terms</h2>
                <p>
                  We reserve the right to modify these terms at any time. We will notify users of any material changes
                  by posting the updated terms on our website. Your continued use of our services after such changes
                  constitutes acceptance of the new terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">15. Contact Information</h2>
                <p>If you have any questions about these Terms of Service, please contact us at:</p>
                <div className="mt-4 p-4 bg-gray-900/50 rounded-lg border border-gray-800/50">
                  <p>Email: legal@vault.finance</p>
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
