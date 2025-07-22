"use client"

import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle, Star, Sparkles, Trophy, Heart, Zap, Shield } from "lucide-react"
import { useEffect, useState } from "react"

interface CelebrationAnimationProps {
  isVisible: boolean
  onComplete: () => void
  planName: string
  amount: number
}

export function CelebrationAnimation({ isVisible, onComplete, planName, amount }: CelebrationAnimationProps) {
  const [stage, setStage] = useState(0)

  useEffect(() => {
    if (isVisible) {
      const timer1 = setTimeout(() => setStage(1), 500)
      const timer2 = setTimeout(() => setStage(2), 1500)
      const timer3 = setTimeout(() => setStage(3), 2500)
      const timer4 = setTimeout(() => {
        setStage(0)
        onComplete()
      }, 4000)

      return () => {
        clearTimeout(timer1)
        clearTimeout(timer2)
        clearTimeout(timer3)
        clearTimeout(timer4)
      }
    }
  }, [isVisible, onComplete])

  const confettiPieces = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    rotation: Math.random() * 360,
    color: ["#3B82F6", "#06B6D4", "#8B5CF6", "#F59E0B", "#EF4444", "#10B981"][Math.floor(Math.random() * 6)],
    size: Math.random() * 8 + 4,
  }))

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center"
        >
          {/* Confetti */}
          {confettiPieces.map((piece) => (
            <motion.div
              key={piece.id}
              className="absolute w-2 h-2 rounded-full"
              style={{
                backgroundColor: piece.color,
                width: piece.size,
                height: piece.size,
                left: `${piece.x}%`,
                top: `${piece.y}%`,
              }}
              initial={{ scale: 0, rotate: 0, y: -100 }}
              animate={{
                scale: [0, 1, 1, 0],
                rotate: [0, piece.rotation, piece.rotation * 2],
                y: [0, 100, 200],
              }}
              transition={{
                duration: 3,
                ease: "easeOut",
                delay: Math.random() * 0.5,
              }}
            />
          ))}

          {/* Main Animation Container */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            className="text-center max-w-md mx-auto p-8"
          >
            {/* Stage 0: Initial Success */}
            <AnimatePresence mode="wait">
              {stage === 0 && (
                <motion.div
                  key="success"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 180 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="mb-6"
                >
                  <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-500/50">
                    <CheckCircle className="w-12 h-12 text-white" />
                  </div>
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-2xl font-bold text-white mb-2"
                  >
                    Staking Successful!
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-gray-300"
                  >
                    Your {amount} SOL is now earning rewards
                  </motion.p>
                </motion.div>
              )}

              {/* Stage 1: Trust Building */}
              {stage === 1 && (
                <motion.div
                  key="trust"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="mb-6"
                >
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/50">
                    <Shield className="w-10 h-10 text-white" />
                  </div>
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-2xl font-bold text-white mb-2"
                  >
                    Secured & Protected
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-gray-300"
                  >
                    Your funds are protected by institutional-grade security
                  </motion.p>
                </motion.div>
              )}

              {/* Stage 2: Earning Rewards */}
              {stage === 2 && (
                <motion.div
                  key="earning"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="mb-6"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className="w-20 h-20 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-yellow-500/50"
                  >
                    <Zap className="w-10 h-10 text-white" />
                  </motion.div>
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-2xl font-bold text-white mb-2"
                  >
                    Earning Rewards!
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-gray-300"
                  >
                    Your {planName} plan is generating daily returns
                  </motion.p>
                </motion.div>
              )}

              {/* Stage 3: Welcome to Community */}
              {stage === 3 && (
                <motion.div
                  key="community"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="mb-6"
                >
                  <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/50">
                    <Heart className="w-10 h-10 text-white" />
                  </div>
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-2xl font-bold text-white mb-2"
                  >
                    Welcome to Vault!
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-gray-300"
                  >
                    You're now part of our exclusive staking community
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Floating Icons */}
            <div className="absolute inset-0 pointer-events-none">
              {[Star, Sparkles, Trophy].map((Icon, index) => (
                <motion.div
                  key={index}
                  className="absolute"
                  style={{
                    left: `${20 + index * 30}%`,
                    top: `${30 + index * 20}%`,
                  }}
                  animate={{
                    y: [-10, 10, -10],
                    rotate: [0, 360],
                    scale: [0.8, 1.2, 0.8],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: index * 0.5,
                  }}
                >
                  <Icon className="w-6 h-6 text-blue-400" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
