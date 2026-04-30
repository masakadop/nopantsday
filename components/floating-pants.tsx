"use client"

import { useEffect, useState } from "react"
import { PantsIcon } from "./pants-icon"

interface FloatingPant {
  id: number
  left: number
  delay: number
  duration: number
  size: number
  rotation: number
}

export function FloatingPants() {
  const [pants, setPants] = useState<FloatingPant[]>([])
  
  useEffect(() => {
    const newPants: FloatingPant[] = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 8 + Math.random() * 6,
      size: 20 + Math.random() * 30,
      rotation: Math.random() * 360,
    }))
    setPants(newPants)
  }, [])
  
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {pants.map((pant) => (
        <div
          key={pant.id}
          className="absolute animate-float text-primary/15"
          style={{
            left: `${pant.left}%`,
            animationDelay: `${pant.delay}s`,
            animationDuration: `${pant.duration}s`,
            width: pant.size,
            height: pant.size,
            transform: `rotate(${pant.rotation}deg)`,
          }}
        >
          <PantsIcon className="w-full h-full" />
        </div>
      ))}
    </div>
  )
}
