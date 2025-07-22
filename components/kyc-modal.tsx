"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { X, Upload, Camera, CheckCircle, AlertCircle, FileText, CreditCard, User, Shield, Sparkles } from "lucide-react"

interface KYCModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

type KYCStep = "document-type" | "document-upload" | "selfie-upload" | "processing" | "success"
type DocumentType = "national-id" | "drivers-license" | "passport"

export function KYCModal({ isOpen, onClose, onSuccess }: KYCModalProps) {
  const [currentStep, setCurrentStep] = useState<KYCStep>("document-type")
  const [documentType, setDocumentType] = useState<DocumentType | null>(null)
  const [documentFile, setDocumentFile] = useState<File | null>(null)
  const [selfieFile, setSelfieFile] = useState<File | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const documentInputRef = useRef<HTMLInputElement>(null)
  const selfieInputRef = useRef<HTMLInputElement>(null)

  const documentTypes = [
    {
      id: "national-id" as DocumentType,
      name: "National ID",
      icon: CreditCard,
      description: "Government-issued national identity card",
    },
    {
      id: "drivers-license" as DocumentType,
      name: "Driver's License",
      icon: FileText,
      description: "Valid driver's license with photo",
    },
    {
      id: "passport" as DocumentType,
      name: "Passport",
      icon: User,
      description: "International passport document",
    },
  ]

  const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setDocumentFile(file)
      setTimeout(() => setCurrentStep("selfie-upload"), 500)
    }
  }

  const handleSelfieUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelfieFile(file)
      setTimeout(() => handleSubmit(), 500)
    }
  }

  const handleSubmit = async () => {
    setCurrentStep("processing")
    setIsProcessing(true)

    // Simulate processing
    await new Promise((resolve) => setTimeout(resolve, 3000))

    setCurrentStep("success")
    setTimeout(() => {
      onSuccess()
      onClose()
      resetForm()
    }, 2000)
  }

  const resetForm = () => {
    setCurrentStep("document-type")
    setDocumentType(null)
    setDocumentFile(null)
    setSelfieFile(null)
    setIsProcessing(false)
  }

  const handleClose = () => {
    onClose()
    setTimeout(resetForm, 300)
  }

  const stepVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md"
          >
            <Card className="bg-gray-900/95 border-gray-800/50 backdrop-blur-sm p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-white">KYC Verification</h2>
                    <p className="text-sm text-gray-400">Verify your identity to unlock all features</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={handleClose} className="text-gray-400 hover:text-white">
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">Progress</span>
                  <span className="text-sm text-blue-400">
                    {currentStep === "document-type" && "Step 1 of 3"}
                    {currentStep === "document-upload" && "Step 2 of 3"}
                    {currentStep === "selfie-upload" && "Step 3 of 3"}
                    {currentStep === "processing" && "Processing..."}
                    {currentStep === "success" && "Complete!"}
                  </span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <motion.div
                    className="bg-gradient-to-r from-blue-500 to-cyan-400 h-2 rounded-full"
                    initial={{ width: "0%" }}
                    animate={{
                      width:
                        currentStep === "document-type"
                          ? "20%"
                          : currentStep === "document-upload"
                            ? "40%"
                            : currentStep === "selfie-upload"
                              ? "60%"
                              : currentStep === "processing"
                                ? "80%"
                                : "100%",
                    }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>

              {/* Step Content */}
              <AnimatePresence mode="wait">
                {/* Step 1: Document Type Selection */}
                {currentStep === "document-type" && (
                  <motion.div
                    key="document-type"
                    variants={stepVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="space-y-4"
                  >
                    <div className="text-center mb-6">
                      <h3 className="text-lg font-semibold text-white mb-2">Select Document Type</h3>
                      <p className="text-sm text-gray-400">Choose the type of ID document you want to upload</p>
                    </div>

                    <div className="space-y-3">
                      {documentTypes.map((type) => {
                        const Icon = type.icon
                        return (
                          <motion.button
                            key={type.id}
                            onClick={() => {
                              setDocumentType(type.id)
                              setCurrentStep("document-upload")
                            }}
                            className="w-full p-4 bg-gray-800/50 border border-gray-700 rounded-lg hover:border-blue-500/50 hover:bg-gray-800/70 transition-all duration-300 text-left group"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-gradient-to-r from-gray-600 to-gray-700 group-hover:from-blue-500 group-hover:to-cyan-400 rounded-lg flex items-center justify-center transition-all duration-300">
                                <Icon className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <div className="text-white font-medium">{type.name}</div>
                                <div className="text-sm text-gray-400">{type.description}</div>
                              </div>
                            </div>
                          </motion.button>
                        )
                      })}
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Document Upload */}
                {currentStep === "document-upload" && (
                  <motion.div
                    key="document-upload"
                    variants={stepVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="space-y-4"
                  >
                    <div className="text-center mb-6">
                      <h3 className="text-lg font-semibold text-white mb-2">
                        Upload Your {documentTypes.find((t) => t.id === documentType)?.name}
                      </h3>
                      <p className="text-sm text-gray-400">Take a clear photo of your document</p>
                    </div>

                    <div className="space-y-4">
                      <input
                        ref={documentInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleDocumentUpload}
                        className="hidden"
                      />

                      <motion.button
                        onClick={() => documentInputRef.current?.click()}
                        className="w-full p-8 border-2 border-dashed border-gray-600 rounded-lg hover:border-blue-500/50 transition-all duration-300 group"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="text-center">
                          <Upload className="w-12 h-12 text-gray-400 group-hover:text-blue-400 mx-auto mb-4 transition-colors" />
                          <div className="text-white font-medium mb-2">Upload Document Photo</div>
                          <div className="text-sm text-gray-400">Click to select or drag and drop</div>
                        </div>
                      </motion.button>

                      <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                        <div className="flex items-start space-x-3">
                          <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                          <div className="text-sm text-blue-300">
                            <div className="font-medium mb-1">Tips for best results:</div>
                            <ul className="space-y-1 text-blue-200">
                              <li>• Ensure good lighting</li>
                              <li>• Keep document flat and fully visible</li>
                              <li>• Avoid glare and shadows</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Selfie Upload */}
                {currentStep === "selfie-upload" && (
                  <motion.div
                    key="selfie-upload"
                    variants={stepVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="space-y-4"
                  >
                    <div className="text-center mb-6">
                      <h3 className="text-lg font-semibold text-white mb-2">Take a Selfie</h3>
                      <p className="text-sm text-gray-400">Hold your document next to your face</p>
                    </div>

                    <div className="space-y-4">
                      <input
                        ref={selfieInputRef}
                        type="file"
                        accept="image/*"
                        capture="user"
                        onChange={handleSelfieUpload}
                        className="hidden"
                      />

                      <motion.button
                        onClick={() => selfieInputRef.current?.click()}
                        className="w-full p-8 border-2 border-dashed border-gray-600 rounded-lg hover:border-blue-500/50 transition-all duration-300 group"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="text-center">
                          <Camera className="w-12 h-12 text-gray-400 group-hover:text-blue-400 mx-auto mb-4 transition-colors" />
                          <div className="text-white font-medium mb-2">Take Selfie with Document</div>
                          <div className="text-sm text-gray-400">Click to open camera</div>
                        </div>
                      </motion.button>

                      <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                        <div className="flex items-start space-x-3">
                          <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                          <div className="text-sm text-yellow-300">
                            <div className="font-medium mb-1">Important:</div>
                            <ul className="space-y-1 text-yellow-200">
                              <li>• Hold your document clearly visible</li>
                              <li>• Face the camera directly</li>
                              <li>• Ensure your face is not covered</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Processing */}
                {currentStep === "processing" && (
                  <motion.div
                    key="processing"
                    variants={stepVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="text-center py-8"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      className="w-16 h-16 border-4 border-blue-500/20 border-t-blue-500 rounded-full mx-auto mb-6"
                    />
                    <h3 className="text-lg font-semibold text-white mb-2">Processing Your Documents</h3>
                    <p className="text-sm text-gray-400 mb-4">Our AI is verifying your identity...</p>
                    <div className="space-y-2 text-sm text-gray-300">
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                        ✓ Document uploaded successfully
                      </motion.div>
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>
                        ✓ Selfie captured and analyzed
                      </motion.div>
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}>
                        ✓ Identity verification complete
                      </motion.div>
                    </div>
                  </motion.div>
                )}

                {/* Step 5: Success */}
                {currentStep === "success" && (
                  <motion.div
                    key="success"
                    variants={stepVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="text-center py-8"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15 }}
                      className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6"
                    >
                      <CheckCircle className="w-8 h-8 text-white" />
                    </motion.div>
                    <motion.h3
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-lg font-semibold text-white mb-2"
                    >
                      Verification Complete!
                    </motion.h3>
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-sm text-gray-400 mb-4"
                    >
                      Your identity has been successfully verified
                    </motion.p>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 }}
                      className="flex items-center justify-center space-x-2 text-green-400"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span className="text-sm font-medium">All features unlocked!</span>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
