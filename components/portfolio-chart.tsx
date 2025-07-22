"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TrendingUp, TrendingDown } from "lucide-react"

type TimeFrame = "7D" | "30D" | "90D" | "1Y"

interface ChartDataPoint {
  day: string
  value: number
  date: Date
}

export function PortfolioChart() {
  const [selectedTimeFrame, setSelectedTimeFrame] = useState<TimeFrame>("7D")

  // Generate different data sets for each timeframe
  const generateChartData = (timeFrame: TimeFrame): ChartDataPoint[] => {
    const baseValue = 2400
    const now = new Date()

    switch (timeFrame) {
      case "7D":
        return [
          {
            day: "Mon",
            value: baseValue + Math.random() * 200 - 100,
            date: new Date(now.getTime() - 6 * 24 * 60 * 60 * 1000),
          },
          {
            day: "Tue",
            value: baseValue + Math.random() * 300 - 50,
            date: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000),
          },
          {
            day: "Wed",
            value: baseValue + Math.random() * 400 + 50,
            date: new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000),
          },
          {
            day: "Thu",
            value: baseValue + Math.random() * 350 + 100,
            date: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000),
          },
          {
            day: "Fri",
            value: baseValue + Math.random() * 420 + 150,
            date: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000),
          },
          {
            day: "Sat",
            value: baseValue + Math.random() * 380 + 120,
            date: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000),
          },
          { day: "Sun", value: baseValue + Math.random() * 447 + 200, date: now },
        ]
      case "30D":
        return Array.from({ length: 30 }, (_, i) => ({
          day: `${i + 1}`,
          value: baseValue + i * 15 + Math.random() * 200 - 100,
          date: new Date(now.getTime() - (29 - i) * 24 * 60 * 60 * 1000),
        }))
      case "90D":
        return Array.from({ length: 90 }, (_, i) => ({
          day: i % 10 === 0 ? `${i + 1}` : "",
          value: baseValue + i * 8 + Math.random() * 300 - 150,
          date: new Date(now.getTime() - (89 - i) * 24 * 60 * 60 * 1000),
        }))
      case "1Y":
        return Array.from({ length: 12 }, (_, i) => {
          const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
          return {
            day: monthNames[i],
            value: baseValue + i * 50 + Math.random() * 400 - 200,
            date: new Date(now.getFullYear(), i, 1),
          }
        })
      default:
        return []
    }
  }

  const chartData = generateChartData(selectedTimeFrame)
  const maxValue = Math.max(...chartData.map((d) => d.value))
  const minValue = Math.min(...chartData.map((d) => d.value))

  // Calculate performance metrics
  const firstValue = chartData[0]?.value || 0
  const lastValue = chartData[chartData.length - 1]?.value || 0
  const changePercent = firstValue > 0 ? ((lastValue - firstValue) / firstValue) * 100 : 0
  const changeAmount = lastValue - firstValue
  const isPositive = changePercent >= 0

  const timeFrameButtons: { key: TimeFrame; label: string }[] = [
    { key: "7D", label: "7D" },
    { key: "30D", label: "30D" },
    { key: "90D", label: "90D" },
    { key: "1Y", label: "1Y" },
  ]

  return (
    <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold mb-1">Portfolio Performance</h3>
          <div className="flex items-center space-x-2">
            {isPositive ? (
              <TrendingUp className="w-4 h-4 text-green-400" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-400" />
            )}
            <span className={`text-sm font-medium ${isPositive ? "text-green-400" : "text-red-400"}`}>
              {isPositive ? "+" : ""}
              {changePercent.toFixed(2)}% ({isPositive ? "+" : ""}
              {changeAmount.toFixed(2)} SOL)
            </span>
            <span className="text-gray-400 text-sm">
              {selectedTimeFrame === "7D" && "this week"}
              {selectedTimeFrame === "30D" && "this month"}
              {selectedTimeFrame === "90D" && "last 3 months"}
              {selectedTimeFrame === "1Y" && "this year"}
            </span>
          </div>
        </div>
        <div className="flex space-x-1">
          {timeFrameButtons.map((button) => (
            <Button
              key={button.key}
              size="sm"
              onClick={() => setSelectedTimeFrame(button.key)}
              className={`text-xs px-3 py-1 transition-all duration-300 ${
                selectedTimeFrame === button.key
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-transparent border border-gray-600 text-gray-300 hover:border-gray-500 hover:bg-gray-800/50"
              }`}
            >
              {button.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="relative h-48 mb-4">
        <motion.svg
          className="w-full h-full"
          viewBox="0 0 400 200"
          key={selectedTimeFrame}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Grid lines */}
          {[0, 1, 2, 3, 4].map((i) => (
            <line key={i} x1="0" y1={i * 50} x2="400" y2={i * 50} stroke="rgba(75, 85, 99, 0.2)" strokeWidth="1" />
          ))}

          {/* Chart line */}
          <motion.path
            d={`M ${chartData.map((d, i) => `${(i / (chartData.length - 1)) * 400},${200 - ((d.value - minValue) / (maxValue - minValue)) * 180}`).join(" L ")}`}
            fill="none"
            stroke={isPositive ? "url(#positiveGradient)" : "url(#negativeGradient)"}
            strokeWidth="3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />

          {/* Area fill */}
          <motion.path
            d={`M ${chartData.map((d, i) => `${(i / (chartData.length - 1)) * 400},${200 - ((d.value - minValue) / (maxValue - minValue)) * 180}`).join(" L ")} L 400,200 L 0,200 Z`}
            fill={isPositive ? "url(#positiveAreaGradient)" : "url(#negativeAreaGradient)"}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 0.3 }}
          />

          {/* Data points */}
          {chartData.map((d, i) => (
            <motion.circle
              key={i}
              cx={(i / (chartData.length - 1)) * 400}
              cy={200 - ((d.value - minValue) / (maxValue - minValue)) * 180}
              r="4"
              fill={isPositive ? "#10B981" : "#EF4444"}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: 0.8 + i * 0.05 }}
              className="cursor-pointer hover:r-6 transition-all"
            />
          ))}

          <defs>
            <linearGradient id="positiveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#06B6D4" />
            </linearGradient>
            <linearGradient id="negativeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#EF4444" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>
            <linearGradient id="positiveAreaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0.05" />
            </linearGradient>
            <linearGradient id="negativeAreaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#EF4444" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#EF4444" stopOpacity="0.05" />
            </linearGradient>
          </defs>
        </motion.svg>
      </div>

      <div className="flex justify-between text-sm text-gray-400">
        {selectedTimeFrame === "7D" && chartData.map((d, i) => <span key={i}>{d.day}</span>)}
        {selectedTimeFrame === "30D" &&
          chartData.filter((_, i) => i % 5 === 0).map((d, i) => <span key={i}>{d.day}</span>)}
        {selectedTimeFrame === "90D" &&
          chartData.filter((_, i) => i % 15 === 0).map((d, i) => <span key={i}>{d.day}</span>)}
        {selectedTimeFrame === "1Y" && chartData.map((d, i) => <span key={i}>{d.day}</span>)}
      </div>

      {/* Performance Summary */}
      <div className="mt-4 pt-4 border-t border-gray-800/50">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-xs text-gray-400 mb-1">Current Value</div>
            <div className="text-sm font-semibold text-white">{lastValue.toFixed(2)} SOL</div>
          </div>
          <div>
            <div className="text-xs text-gray-400 mb-1">Change</div>
            <div className={`text-sm font-semibold ${isPositive ? "text-green-400" : "text-red-400"}`}>
              {isPositive ? "+" : ""}
              {changeAmount.toFixed(2)} SOL
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-400 mb-1">Percentage</div>
            <div className={`text-sm font-semibold ${isPositive ? "text-green-400" : "text-red-400"}`}>
              {isPositive ? "+" : ""}
              {changePercent.toFixed(2)}%
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
