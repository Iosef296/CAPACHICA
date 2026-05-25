import React from "react"

interface PageHeroProps {
  title: string
  subtitle?: string
  emoji?: string
  tag?: string
}

export default function PageHero({ title, subtitle, emoji, tag }: PageHeroProps) {
  return (
    <div className="page-hero">
      {emoji && <div style={{ fontSize: "3rem", marginBottom: 16 }}>{emoji}</div>}
      {tag && (
        <div className="section-tag" style={{ justifyContent: "center", marginBottom: 12 }}>
          <div className="section-tag-bar" />
          <span className="section-tag-text">{tag}</span>
        </div>
      )}
      <h1 className="page-hero-title">{title}</h1>
      {subtitle && <p className="page-hero-sub">{subtitle}</p>}
    </div>
  )
}
