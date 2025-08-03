import * as React from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface PersonCardProps {
  name: string
  surname: string
  image: string
  role: string
  description: string
}

export default function PersonCard({ 
  name, 
  surname, 
  image, 
  role, 
  description 
}: PersonCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="pb-4">
        <div className="text-center">
          <CardTitle className="text-xl font-bold text-foreground mb-2">
            {name} {surname}
          </CardTitle>
          <CardDescription className="text-primary font-medium">
            {role}
          </CardDescription>
        </div>
      </CardHeader>
      
      <div className="px-6 pb-4">
        <div className="flex justify-center mb-4">
          <img
            src={image}
            alt={`${name} ${surname}`}
            className="w-48 h-48 object-cover rounded-lg shadow-md"
          />
        </div>
      </div>
      
      <CardContent>
        <p className="text-sm text-muted-foreground leading-relaxed text-center">
          {description}
        </p>
      </CardContent>
    </Card>
  )
} 