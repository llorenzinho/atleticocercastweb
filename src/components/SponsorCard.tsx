import * as React from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface SponsorCardProps {
  name: string
  logo: string
  description: string
  link?: string
  type: 'main' | 'secondary'
}

export default function SponsorCard({ 
  name, 
  logo, 
  description, 
  link,
  type 
}: SponsorCardProps) {
  const isMainSponsor = type === 'main'
  
  return (
    <Card className={`w-full overflow-hidden hover:shadow-lg transition-shadow duration-300 ${
      isMainSponsor 
        ? 'border-2 border-primary shadow-lg' 
        : 'border border-border'
    }`}>
      <CardHeader className="pb-4">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <img
              src={logo}
              alt={`${name} logo`}
              className={`object-contain ${
                isMainSponsor ? 'w-40 h-40' : 'w-32 h-32'
              }`}
            />
          </div>
          <CardTitle className={`font-bold text-foreground mb-2 ${
            isMainSponsor ? 'text-2xl' : 'text-xl'
          }`}>
            {name}
          </CardTitle>
          {link && (
            <CardDescription className={`font-medium ${
              isMainSponsor ? 'text-primary' : 'text-muted-foreground'
            }`}>
              <a 
                href={link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:underline transition-colors duration-200"
              >
                Visit Website
              </a>
            </CardDescription>
          )}
        </div>
      </CardHeader>
      
      <CardContent>
        <p className="text-sm text-muted-foreground leading-relaxed text-center">
          {description}
        </p>
      </CardContent>
    </Card>
  )
} 