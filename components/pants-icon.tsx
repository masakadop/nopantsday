"use client"

export function PantsIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="currentColor"
    >
      {/* Pants shape */}
      <path
        d="M20 15 L80 15 L82 25 L75 90 L55 90 L50 45 L45 90 L25 90 L18 25 Z"
        strokeWidth="3"
        stroke="currentColor"
        fill="currentColor"
        opacity="0.9"
      />
      {/* Belt */}
      <rect x="18" y="15" width="64" height="8" rx="2" fill="currentColor" />
      {/* Belt buckle */}
      <rect x="44" y="16" width="12" height="6" rx="1" fill="currentColor" opacity="0.6" />
    </svg>
  )
}

export function NoPantsIcon({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <PantsIcon className="w-full h-full opacity-30" />
      {/* Strike through circle */}
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 w-full h-full"
        fill="none"
        stroke="currentColor"
        strokeWidth="6"
      >
        <circle cx="50" cy="50" r="45" className="text-destructive" />
        <line x1="20" y1="80" x2="80" y2="20" className="text-destructive" />
      </svg>
    </div>
  )
}
