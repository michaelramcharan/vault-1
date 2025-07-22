"use client"

import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle, Star, Sparkles, Trophy, Heart, Zap, Shield, Gift, Rocket } from "lucide-react"
import { useEffect, useState } from "react"

interface AccountCreationCelebrationProps {
  isVisible: boolean
  onComplete: () => void
  userName: string
}

export function AccountCreationCelebration({ isVisible, onComplete, userName }: AccountCreationCelebrationProps) {
  const [stage, setStage] = useState(0)

  useEffect(() => {
    if (isVisible) {
      const timer1 = setTimeout(() => setStage(1), 800)
      const timer2 = setTimeout(() => setStage(2), 2000)
      const timer3 = setTimeout(() => setStage(3), 3200)
      const timer4 = setTimeout(() => setStage(4), 4400)
      const timer5 = setTimeout(() => {
        setStage(0)
        onComplete()
      }, 6000)

      return () => {
        clearTimeout(timer1)
        clearTimeout(timer2)
        clearTimeout(timer3)
        clearTimeout(timer4)
        clearTimeout(timer5)
      }
    }
  }, [isVisible, onComplete])

  const confettiPieces = Array.from({ length: 80 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    rotation: Math.random() * 360,
    color: ["#3B82F6", "#06B6D4", "#8B5CF6", "#F59E0B", "#EF4444", "#10B981", "#EC4899"][Math.floor(Math.random() * 7)],
    size: Math.random() * 12 + 6,
    delay: Math.random() * 0.8,
  }))

  const floatingIcons = [
    { Icon: Star, color: "#F59E0B", delay: 0.2 },
    { Icon: Sparkles, color: "#8B5CF6", delay: 0.4 },
    { Icon: Trophy, color: "#10B981", delay: 0.6 },
    { Icon: Heart, color: "#EC4899", delay: 0.8 },
    { Icon: Zap, color: "#3B82F6", delay: 1.0 },
    { Icon: Shield, color: "#06B6D4", delay: 1.2 },
    { Icon: Gift, color: "#EF4444", delay: 1.4 },
    { Icon: Rocket, color: "#F59E0B", delay: 1.6 },
  ]

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[100] flex items-center justify-center overflow-hidden"
        >
          {/* Animated Background */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-cyan-900/20"
            animate={{
              background: [
                "linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1), rgba(6, 182, 212, 0.1))",
                "linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(6, 182, 212, 0.1), rgba(59, 130, 246, 0.1))",
                "linear-gradient(225deg, rgba(6, 182, 212, 0.1), rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1))",
              ],
            }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
          />

          {/* Confetti */}
          {confettiPieces.map((piece) => (
            <motion.div
              key={piece.id}
              className="absolute rounded-full"
              style={{
                backgroundColor: piece.color,
                width: piece.size,
                height: piece.size,
                left: `${piece.x}%`,
                top: `${piece.y}%`,
              }}
              initial={{ scale: 0, rotate: 0, y: -100, opacity: 0 }}
              animate={{
                scale: [0, 1, 1, 0],
                rotate: [0, piece.rotation, piece.rotation * 2],
                y: [0, 100, 300],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 4,
                ease: "easeOut",
                delay: piece.delay,
              }}
            />
          ))}

          {/* Floating Icons */}
          {floatingIcons.map(({ Icon, color, delay }, index) => (
            <motion.div
              key={index}
              className="absolute"
              style={{
                left: `${15 + (index % 4) * 20}%`,
                top: `${20 + Math.floor(index / 4) * 30}%`,
              }}
              initial={{ scale: 0, rotate: -180, opacity: 0 }}
              animate={{
                scale: [0, 1.2, 1],
                rotate: [0, 360],
                opacity: [0, 1, 0.8],
                y: [-20, 20, -20],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                delay: delay,
                ease: "easeInOut",
              }}
            >
              <Icon className="w-8 h-8" style={{ color }} />
            </motion.div>
          ))}

          {/* Main Animation Container */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            className="text-center max-w-lg mx-auto p-8 relative z-10"
          >
            {/* Stage 0: Welcome */}
            <AnimatePresence mode="wait">
              {stage === 0 && (
                <motion.div
                  key="welcome"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 180 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="mb-6"
                >
                  <motion.div
                    className="w-32 h-32 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl"
                    animate={{
                      boxShadow: [
                        "0 0 50px rgba(59, 130, 246, 0.5)",
                        "0 0 80px rgba(139, 92, 246, 0.5)",
                        "0 0 50px rgba(6, 182, 212, 0.5)",
                      ],
                    }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <CheckCircle className="w-16 h-16 text-white" />
                  </motion.div>
                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl font-bold text-white mb-4"
                  >
                    Welcome to Vault!
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-xl text-gray-300"
                  >
                    Hello {userName}, your account is ready!
                  </motion.p>
                </motion.div>
              )}

              {/* Stage 1: Account Setup */}
              {stage === 1 && (
                <motion.div
                  key="setup"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="mb-6"
                >
                  <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/50">
                    <Shield className="w-12 h-12 text-white" />
                  </div>
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl font-bold text-white mb-3"
                  >
                    Account Secured
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-lg text-gray-300"
                  >
                    Your account is protected with enterprise-grade security
                  </motion.p>
                </motion.div>
              )}

              {/* Stage 2: Features Unlocked */}
              {stage === 2 && (
                <motion.div
                  key="features"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="mb-6"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-purple-500/50"
                  >
                    <Sparkles className="w-12 h-12 text-white" />
                  </motion.div>
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl font-bold text-white mb-3"
                  >
                    Features Unlocked!
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-lg text-gray-300"
                  >
                    Access to staking, rewards, and premium features
                  </motion.p>
                </motion.div>
              )}

              {/* Stage 3: Welcome Bonus */}
              {stage === 3 && (
                <motion.div
                  key="bonus"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="mb-6"
                >
                  <div className="w-24 h-24 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-yellow-500/50">
                    <Gift className="w-12 h-12 text-white" />
                  </div>
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl font-bold text-white mb-3"
                  >
                    Welcome Bonus!
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-lg text-gray-300"
                  >
                    You've received 0.1 SOL as a welcome gift!
                  </motion.p>
                </motion.div>
              )}

              {/* Stage 4: Ready to Start */}
              {stage === 4 && (
                <motion.div
                  key="ready"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="mb-6"
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    className="w-24 h-24 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-cyan-500/50"
                  >
                    <Rocket className="w-12 h-12 text-white" />
                  </motion.div>
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl font-bold text-white mb-3"
                  >
                    Ready to Launch!
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-lg text-gray-300"
                  >
                    Start your staking journey and earn rewards
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Progress Indicator */}
            <motion.div
              className="flex justify-center space-x-2 mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              {[0, 1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  className={`w-3 h-3 rounded-full ${i <= stage ? "bg-blue-400" : "bg-gray-600"}`}
                  animate={{
                    scale: i === stage ? [1, 1.3, 1] : 1,
                  }}
                  transition={{ duration: 0.5, repeat: i === stage ? Number.POSITIVE_INFINITY : 0 }}
                />
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
