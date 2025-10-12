import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

interface PostCardProps {
  title: string
  description: string
  date?: string
  category?: string
  link?: string
  image?: string
}

export function PostCard({ title, description, date, category, link, image }: PostCardProps) {
  return (
    <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden">
      {image && (
        <div className="relative h-48 w-full">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
      <CardHeader className="space-y-3">
        <div className="flex items-center justify-between">
          {category && (
            <Badge variant="secondary" className="text-xs">
              {category}
            </Badge>
          )}
          {date && (
            <span className="text-xs text-muted-foreground">{date}</span>
          )}
        </div>
        <CardTitle className="text-xl leading-tight">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CardDescription className="text-sm leading-relaxed">
          {description}
        </CardDescription>
        {link && (
          <a 
            href={link} 
            className="inline-flex items-center text-sm font-medium text-primary hover:underline transition-colors"
          >
            Ler mais →
          </a>
        )}
      </CardContent>
    </Card>
  )
}
