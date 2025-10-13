/**
 * Componente TeamCard (Card de Membro da Equipe)
 * 
 * Card para exibir informações de membros da equipe/colaboradores.
 * Inclui nome, cargo, descrição e lista de habilidades.
 * 
 * Características:
 * - Badge com cargo/função
 * - Descrição textual
 * - Tags de habilidades em badges outline
 * - Hover com sombra aumentada
 * - Layout vertical responsivo
 * 
 * @fileoverview Card de apresentação de membro da equipe
 * @author Rainer Teixeira
 * @version 1.0.0
 * @since 1.0.0
 */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CARD_CLASSES } from "@/lib/utils"

/**
 * Props do componente TeamCard
 * 
 * @interface TeamCardProps
 * @property {string} name - Nome completo do membro
 * @property {string} role - Cargo/função (ex: "Desenvolvedor Full Stack")
 * @property {string} description - Descrição/biografia do membro
 * @property {string[]} skills - Lista de habilidades/tecnologias
 */
interface TeamCardProps {
  name: string
  role: string
  description: string
  skills: string[]
}

/**
 * Componente TeamCard
 * 
 * Renderiza card de apresentação de membro da equipe.
 * Ideal para páginas "Sobre" ou "Equipe".
 * 
 * Layout:
 * - Header: nome (título) + cargo (badge)
 * - Content: descrição + grid de skills
 * 
 * @param {TeamCardProps} props - Propriedades do card
 * @returns {JSX.Element} Card de membro da equipe
 * 
 * @example
 * <TeamCard 
 *   name="Rainer Teixeira"
 *   role="Desenvolvedor Full Stack"
 *   description="Especialista em React, Next.js e Node.js..."
 *   skills={["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL"]}
 * />
 */
export function TeamCard({ name, role, description, skills }: TeamCardProps) {
  return (
    <Card className={CARD_CLASSES.full}>
      {/** 
       * Header com nome e cargo
       * - Nome como CardTitle (h3)
       * - Cargo como Badge secundário
       */}
      <CardHeader className="space-y-2">
        <CardTitle className="text-xl">{name}</CardTitle>
        <Badge variant="secondary" className="w-fit">
          {role}
        </Badge>
      </CardHeader>
      
      {/** 
       * Conteúdo com descrição e skills
       */}
      <CardContent className="space-y-4">
        {/** Descrição/biografia */}
        <p className="text-muted-foreground leading-relaxed">{description}</p>
        
        {/** 
         * Grid de habilidades como badges outline
         * - flex-wrap para quebrar linha
         * - gap-2 entre badges
         * - variant outline para aparência mais leve
         */}
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
