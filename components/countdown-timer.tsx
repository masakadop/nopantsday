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
  
  // No Pants Day is the first Friday of May
  // Find first Friday of May for current year first
  const may1ThisYear = new Date(currentYear, 4, 1) // Month is 0-indexed, so 4 = May
  const dayOfWeekThisYear = may1ThisYear.getDay() // 0 = Sunday, 5 = Friday
  const daysUntilFridayThisYear = dayOfWeekThisYear <= 5 ? 5 - dayOfWeekThisYear : 7 - dayOfWeekThisYear + 5
  const firstFridayThisYear = new Date(currentYear, 4, 1 + daysUntilFridayThisYear)
  
  // If this year's No Pants Day hasn't passed, use it
  if (firstFridayThisYear > now) {
    return firstFridayThisYear
  }
  
  // Otherwise, calculate for next year
  const targetYear = currentYear + 1
  const may1NextYear = new Date(targetYear, 4, 1)
  const dayOfWeekNextYear = may1NextYear.getDay()
  const daysUntilFridayNextYear = dayOfWeekNextYear <= 5 ? 5 - dayOfWeekNextYear : 7 - dayOfWeekNextYear + 5
  const firstFridayNextYear = new Date(targetYear, 4, 1 + daysUntilFridayNextYear)
  
  return firstFridayNextYear
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
