"use client"

import { useState, useEffect } from "react"
import { CountdownTimer } from "@/components/countdown-timer"
import { FloatingPants } from "@/components/floating-pants"
import { NoPantsIcon } from "@/components/pants-icon"

function getNoPantsDayInfo(): { date: Date; formatted: string; isToday: boolean } {
  const now = new Date()
  const currentYear = now.getFullYear()
  
  // No Pants Day is the first Friday of May
  const may1ThisYear = new Date(currentYear, 4, 1) // Month is 0-indexed, so 4 = May
  const dayOfWeekThisYear = may1ThisYear.getDay() // 0 = Sunday, 5 = Friday
  const daysUntilFridayThisYear = dayOfWeekThisYear <= 5 ? 5 - dayOfWeekThisYear : 7 - dayOfWeekThisYear + 5
  const firstFridayThisYear = new Date(currentYear, 4, 1 + daysUntilFridayThisYear)
  
  // Check if today is No Pants Day (using local time)
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const noPantsDayStart = new Date(firstFridayThisYear.getFullYear(), firstFridayThisYear.getMonth(), firstFridayThisYear.getDate())
  
  if (todayStart.getTime() === noPantsDayStart.getTime()) {
    const formatted = `${currentYear}年5月${firstFridayThisYear.getDate()}日（金）`
    return { date: firstFridayThisYear, formatted, isToday: true }
  }
  
  // If this year's No Pants Day hasn't passed, use it
  if (firstFridayThisYear > now) {
    const formatted = `${currentYear}年5月${firstFridayThisYear.getDate()}日（金）`
    return { date: firstFridayThisYear, formatted, isToday: false }
  }
  
  // Otherwise, calculate for next year
  const targetYear = currentYear + 1
  const may1NextYear = new Date(targetYear, 4, 1)
  const dayOfWeekNextYear = may1NextYear.getDay()
  const daysUntilFridayNextYear = dayOfWeekNextYear <= 5 ? 5 - dayOfWeekNextYear : 7 - dayOfWeekNextYear + 5
  const firstFridayNextYear = new Date(targetYear, 4, 1 + daysUntilFridayNextYear)
  
  const formatted = `${targetYear}年5月${firstFridayNextYear.getDate()}日（金）`
  return { date: firstFridayNextYear, formatted, isToday: false }
}

export default function Home() {
  const [noPantsDayInfo, setNoPantsDayInfo] = useState<{ formatted: string; isToday: boolean } | null>(null)
  
  useEffect(() => {
    // Calculate on client side to use local timezone
    const info = getNoPantsDayInfo()
    setNoPantsDayInfo({ formatted: info.formatted, isToday: info.isToday })
  }, [])
  
  // Show loading state while calculating on client
  if (!noPantsDayInfo) {
    return (
      <main className="relative min-h-screen flex flex-col items-center justify-center px-4 py-12 overflow-hidden">
        <FloatingPants />
        <div className="relative z-10 text-center">
          <NoPantsIcon className="w-24 h-24 md:w-32 md:h-32 text-primary animate-bounce-slow mx-auto" />
        </div>
      </main>
    )
  }
  
  const { formatted, isToday } = noPantsDayInfo
  
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center px-4 py-12 overflow-hidden">
      <FloatingPants />
      
      <div className="relative z-10 w-full max-w-4xl mx-auto text-center">
        {isToday ? (
          /* Celebration View - Today is No Pants Day! */
          <div className="mb-8 md:mb-12">
            <div className="inline-flex items-center justify-center mb-6 animate-bounce-slow">
              <NoPantsIcon className="w-32 h-32 md:w-40 md:h-40 text-primary" />
            </div>
            
            <div className="mb-6">
              <span className="inline-block bg-primary text-primary-foreground px-6 py-2 rounded-full text-lg md:text-xl font-bold animate-pulse-glow">
                TODAY!
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-foreground mb-6 text-balance">
              <span className="text-primary">本日は</span>
              <br />
              <span className="text-primary">ノーパンツデー！</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-8 text-pretty">
              おめでとうございます！
              <br />
              今日は世界中でノーパンツデーが開催されています！
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <span className="text-4xl animate-bounce-slow" style={{ animationDelay: "0s" }}>🎉</span>
              <span className="text-4xl animate-bounce-slow" style={{ animationDelay: "0.2s" }}>🎊</span>
              <span className="text-4xl animate-bounce-slow" style={{ animationDelay: "0.4s" }}>🚇</span>
              <span className="text-4xl animate-bounce-slow" style={{ animationDelay: "0.6s" }}>🎊</span>
              <span className="text-4xl animate-bounce-slow" style={{ animationDelay: "0.8s" }}>🎉</span>
            </div>
            
            <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-8 border border-primary/30 max-w-lg mx-auto">
              <h2 className="text-2xl font-bold text-foreground mb-4">参加のポイント</h2>
              <ul className="text-left text-muted-foreground space-y-3">
                <li className="flex items-start gap-2">
                  <span className="text-primary">1.</span>
                  <span>下半身は下着のみ、上半身は普通に着用</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">2.</span>
                  <span>何事もないように振る舞うのがルール</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">3.</span>
                  <span>公共のマナーとルールを守りましょう</span>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          /* Countdown View - Normal countdown display */
          <>
            <div className="mb-8 md:mb-12">
              <div className="inline-flex items-center justify-center mb-6 animate-bounce-slow">
                <NoPantsIcon className="w-24 h-24 md:w-32 md:h-32 text-primary" />
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4 text-balance">
                <span className="text-primary">ノーパンツデー</span>
                <br />
                <span className="text-2xl md:text-4xl lg:text-5xl">カウントダウン</span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
                毎年5月の第1金曜日は「ノーパンツデー」！
                <br className="hidden md:block" />
                世界中で電車やバスに下半身だけ下着姿で乗る
                <br className="hidden md:block" />
                ユニークなイベントです。
              </p>
            </div>
            
            {/* Target Date Badge */}
            <div className="mb-8">
              <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-6 py-3 rounded-full text-sm md:text-base font-medium border border-primary/20 animate-pulse-glow">
                <span className="text-lg">📅</span>
                次回開催: {formatted}
              </span>
            </div>
            
            {/* Countdown */}
            <div className="mb-12">
              <CountdownTimer />
            </div>
          </>
        )}
        
        {/* Fun Facts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-border">
            <div className="text-3xl mb-2">🚇</div>
            <h3 className="font-semibold text-foreground mb-1">世界60都市以上</h3>
            <p className="text-sm text-muted-foreground">毎年世界中で開催される</p>
          </div>
          <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-border">
            <div className="text-3xl mb-2">📅</div>
            <h3 className="font-semibold text-foreground mb-1">1980年代に誕生</h3>
            <p className="text-sm text-muted-foreground">テキサス州オースティン発祥</p>
          </div>
          <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-border">
            <div className="text-3xl mb-2">😄</div>
            <h3 className="font-semibold text-foreground mb-1">ルールはシンプル</h3>
            <p className="text-sm text-muted-foreground">普通の顔で振る舞うこと</p>
          </div>
        </div>
        
        {/* CTA */}
        <div className="space-y-4">
          <p className="text-muted-foreground text-sm">
            準備はできていますか？
          </p>
          <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-full text-lg font-semibold transition-all hover:scale-105 shadow-lg hover:shadow-xl">
            カレンダーに追加 📅
          </button>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="relative z-10 mt-16 text-center text-sm text-muted-foreground">
        <p>
          ※ノーパンツデーはパロディイベントです。
          <br />
          参加の際は公共のルールとマナーを守りましょう。
        </p>
      </footer>
    </main>
  )
}
