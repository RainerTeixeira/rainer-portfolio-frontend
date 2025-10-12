import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface TeamCardProps {
  name: string
  role: string
  description: string
  skills: string[]
}

export function TeamCard({ name, role, description, skills }: TeamCardProps) {
  return (
    <Card className="hover:shadow-lg transition-all duration-300">
      <CardHeader className="space-y-2">
        <CardTitle className="text-xl">{name}</CardTitle>
        <Badge variant="secondary" className="w-fit">
          {role}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground leading-relaxed">{description}</p>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, idx) => (
            <Badge key={idx} variant="outline" className="text-xs">
              {skill}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
