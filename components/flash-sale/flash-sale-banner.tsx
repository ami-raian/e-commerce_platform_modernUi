"use client"

import { useState, useEffect } from "react"
import { Zap } from "lucide-react"
import { mockFlashSales } from "@/lib/mock-promos"

export function FlashSaleBanner() {
  const [activeFlashSale, setActiveFlashSale] = useState(mockFlashSales.find((s) => s.active))
  const [timeLeft, setTimeLeft] = useState("")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!activeFlashSale || !mounted) return

    const updateTimer = () => {
      const now = new Date()
      const endTime = new Date(activeFlashSale.endTime)
      const diff = endTime.getTime() - now.getTime()

      if (diff <= 0) {
        setActiveFlashSale(mockFlashSales.find((s) => s.active))
        return
      }

      const hours = Math.floor(diff / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)

      setTimeLeft(`${hours}h ${minutes}m ${seconds}s`)
    }

    updateTimer()
    const interval = setInterval(updateTimer, 1000)

    return () => clearInterval(interval)
  }, [activeFlashSale, mounted])

  if (!activeFlashSale || !mounted) return null

  return (
    <div className="bg-primary text-white rounded-lg p-4 md:p-6 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <Zap size={24} className="animate-pulse" />
        <div>
          <p className="font-semibold text-lg">{activeFlashSale.name}</p>
          <p className="text-white opacity-75 text-sm">{activeFlashSale.discount}% off selected items</p>
        </div>
      </div>

      <div className="text-center md:text-right">
        <p className="text-xs text-white opacity-75 mb-1">Sale ends in</p>
        <p className="text-xl font-bold font-mono">{timeLeft}</p>
      </div>
    </div>
  )
}
