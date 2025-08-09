import * as React from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface SponsorCardProps {
  readonly name: string
  readonly logo: string
  readonly description: string
  readonly link?: string
  readonly type: 'main' | 'secondary' | 'premium' | 'exclusive'
  readonly location?: string
  readonly promotionsLink?: string
}

export default function SponsorCard({
  name,
  logo,
  description,
  link,
  type,
  location,
  promotionsLink,
}: SponsorCardProps) {
  const isMainSponsor = type === 'main'
  const isPremiumSponsor = type === 'premium'
  const isExclusiveSponsor = type === 'exclusive'

  let containerClasses = 'w-full overflow-hidden hover:shadow-lg transition-shadow duration-300'
  if (isExclusiveSponsor) {
    containerClasses += ' border-2 border-[var(--chart-3)] shadow-xl bg-gradient-to-br from-[var(--accent)] via-[var(--primary)] to-[var(--chart-3)] text-black'
  } else if (isPremiumSponsor) {
    containerClasses += ' border-2 border-[var(--chart-3)] shadow-xl bg-gradient-to-br from-[var(--accent)] via-[var(--primary)] to-[var(--chart-3)] text-black'
  } else if (isMainSponsor) {
    containerClasses += ' border-2 border-primary shadow-lg'
  } else {
    containerClasses += ' border border-border'
  }

  let logoSizeClass = 'w-32 h-32'
  if (isExclusiveSponsor) logoSizeClass = 'w-44 h-44'
  else if (isMainSponsor) logoSizeClass = 'w-40 h-40'
  else if (isPremiumSponsor) logoSizeClass = 'w-36 h-36'

  let titleSizeClass = 'text-xl'
  if (isExclusiveSponsor) titleSizeClass = 'text-3xl'
  else if (isMainSponsor || isPremiumSponsor) titleSizeClass = 'text-2xl'

  const linkColorClass = ((): string => {
    if (isExclusiveSponsor || isPremiumSponsor) return 'text-black'
    if (isMainSponsor) return 'text-primary'
    return 'text-muted-foreground'
  })()

  const descriptionTextClass = ((): string => {
    if (isExclusiveSponsor || isPremiumSponsor) return 'text-black'
    return 'text-muted-foreground'
  })()

  const titleColorClass = ((): string => {
    if (isExclusiveSponsor || isPremiumSponsor) return 'text-black'
    return 'text-foreground'
  })()
  
  if (isExclusiveSponsor) {
    return (
      <Card className={containerClasses}>
        <div className="flex flex-col md:grid md:grid-cols-[320px_1fr] gap-6">
          <div className="flex items-center justify-center p-6 md:p-8">
            <img
              src={logo}
              alt={`${name} logo`}
              className="object-contain w-56 h-56 md:w-64 md:h-64"
            />
          </div>
          <div className="p-6 md:p-8 flex flex-col gap-3">
            <div className="font-bold text-3xl text-foreground">{name}</div>
            <div className="flex flex-wrap items-center gap-3">
              {link && (
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-lg bg-black text-white px-3 py-1.5 text-sm font-medium shadow-sm hover:bg-black/90 transition-opacity"
                >
                  Visita il sito
                </a>
              )}
              {promotionsLink && (
                <a
                  href={promotionsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-lg border border-black text-black px-3 py-1.5 text-sm font-medium hover:bg-black hover:text-white transition-colors"
                >
                  Prodotti/Eventi
                </a>
              )}
            </div>
            <div className="text-base leading-relaxed text-foreground/90">
              {description}
            </div>
            {location && (
              <div className="mt-4 md:mt-auto text-sm text-foreground/80">
                Località: {location}
              </div>
            )}
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card className={containerClasses}>
      <CardHeader className="pb-4">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <img
              src={logo}
              alt={`${name} logo`}
              className={`object-contain ${logoSizeClass}`}
            />
          </div>
          <CardTitle className={`font-bold mb-2 ${titleSizeClass} ${titleColorClass}`}>
            {name}
          </CardTitle>
          {link && (
            <CardDescription
              className={`font-medium ${linkColorClass}`}
            >
              <a 
                href={link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:underline transition-colors duration-200"
              >
                Visita il sito
              </a>
            </CardDescription>
          )}
        </div>
      </CardHeader>
      
      <CardContent>
        <p className={`text-sm leading-relaxed text-center ${descriptionTextClass}`}>
          {description}
        </p>
      </CardContent>
    </Card>
  )
} 