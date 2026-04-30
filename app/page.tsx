import { CountdownTimer } from "@/components/countdown-timer"
import { FloatingPants } from "@/components/floating-pants"
import { NoPantsIcon } from "@/components/pants-icon"

function getNextNoPantsDay(): { date: Date; formatted: string } {
  const currentYear = new Date().getFullYear()
  const targetYear = currentYear + 1
  
  // Find first Sunday of January for target year
  const jan1 = new Date(targetYear, 0, 1)
  const dayOfWeek = jan1.getDay() // 0 = Sunday
  const daysUntilSunday = dayOfWeek === 0 ? 0 : 7 - dayOfWeek
  const firstSunday = new Date(targetYear, 0, 1 + daysUntilSunday)
  
  const formatted = `${targetYear}年${firstSunday.getMonth() + 1}月${firstSunday.getDate()}日`
  
  return { date: firstSunday, formatted }
}

export default function Home() {
  const { formatted } = getNextNoPantsDay()
  
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center px-4 py-12 overflow-hidden">
      <FloatingPants />
      
      <div className="relative z-10 w-full max-w-4xl mx-auto text-center">
        {/* Hero Section */}
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
            毎年1月の第1日曜日は「ノーパンツデー」！
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
        
        {/* Fun Facts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-border">
            <div className="text-3xl mb-2">🚇</div>
            <h3 className="font-semibold text-foreground mb-1">世界60都市以上</h3>
            <p className="text-sm text-muted-foreground">毎年世界中で開催される</p>
          </div>
          <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-border">
            <div className="text-3xl mb-2">📅</div>
            <h3 className="font-semibold text-foreground mb-1">2002年スタート</h3>
            <p className="text-sm text-muted-foreground">NYで始まったムーブメント</p>
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
