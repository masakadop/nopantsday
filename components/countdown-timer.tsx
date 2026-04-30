"use client"

import { useEffect, useState } from "react"

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function getNextNoPantsDay(): Date {
  const now = new Date()
  const currentYear = now.getFullYear()
  
  // No Pants Day is typically the first Sunday of January
  // For 2027, we'll calculate the first Sunday of January
  let targetYear = currentYear + 1
  
  // Find first Sunday of January for target year
  const jan1 = new Date(targetYear, 0, 1)
  const dayOfWeek = jan1.getDay() // 0 = Sunday
  const daysUntilSunday = dayOfWeek === 0 ? 0 : 7 - dayOfWeek
  const firstSunday = new Date(targetYear, 0, 1 + daysUntilSunday)
  
  return firstSunday
}

function calculateTimeLeft(targetDate: Date): TimeLeft {
  const now = new Date()
  const difference = targetDate.getTime() - now.getTime()
  
  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  }
  
  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  }
}

export function CountdownTimer() {
  const [mounted, setMounted] = useState(false)
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const targetDate = getNextNoPantsDay()
  
  useEffect(() => {
    setMounted(true)
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate))
    }, 1000)
    
    setTimeLeft(calculateTimeLeft(targetDate))
    
    return () => clearInterval(timer)
  }, [targetDate])
  
  if (!mounted) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {[0, 0, 0, 0].map((_, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center bg-card rounded-2xl p-6 md:p-8 shadow-lg border border-border"
          >
            <span className="text-5xl md:text-7xl font-bold text-primary tabular-nums">
              --
            </span>
            <span className="text-sm md:text-base text-muted-foreground mt-2">
              {["日", "時間", "分", "秒"][index]}
            </span>
          </div>
        ))}
      </div>
    )
  }
  
  const timeUnits = [
    { value: timeLeft.days, label: "日", labelEn: "DAYS" },
    { value: timeLeft.hours, label: "時間", labelEn: "HOURS" },
    { value: timeLeft.minutes, label: "分", labelEn: "MIN" },
    { value: timeLeft.seconds, label: "秒", labelEn: "SEC" },
  ]
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
      {timeUnits.map((unit, index) => (
        <div
          key={index}
          className="group flex flex-col items-center justify-center bg-card rounded-2xl p-6 md:p-8 shadow-lg border border-border hover:scale-105 transition-transform duration-300 hover:shadow-xl"
        >
          <span className="text-5xl md:text-7xl font-bold text-primary tabular-nums transition-all duration-300 group-hover:text-secondary">
            {String(unit.value).padStart(2, "0")}
          </span>
          <span className="text-sm md:text-base text-muted-foreground mt-2 font-medium">
            {unit.label}
          </span>
          <span className="text-xs text-muted-foreground/60 uppercase tracking-widest">
            {unit.labelEn}
          </span>
        </div>
      ))}
    </div>
  )
}
