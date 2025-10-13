/**
 * Exportações de Componentes UI
 * 
 * Barrel file para centralizar exportações dos componentes da pasta /ui.
 * Facilita importações permitindo importar múltiplos componentes de um único caminho.
 * 
 * Componentes incluídos:
 * - Badge: etiquetas/tags
 * - Button: botões com variantes
 * - Card: sistema de cards composable
 * - Separator: linhas divisórias
 * - Avatar: imagens de perfil com fallback
 * - Progress: barras de progresso
 * 
 * @fileoverview Barrel file de componentes UI
 * @author Rainer Teixeira
 * @version 1.0.0
 * @since 1.0.0
 * 
 * @example
 * // Importar múltiplos componentes
 * import { Button, Card, Badge } from '@/components/ui'
 */

/** Componente Badge e suas variantes de estilo */
export { Badge, badgeVariants } from './badge'

/** Componente Button e suas variantes de estilo */
export { Button, buttonVariants } from './button'

/** Sistema de Cards: container e subcomponentes */
export { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card'

/** Componente Separator: linha divisória horizontal/vertical */
export { Separator } from './separator'

/** Sistema de Avatar: imagem com fallback automático */
export { Avatar, AvatarFallback, AvatarImage } from './avatar'

/** Componente Progress: barra de progresso animada */
export { Progress } from './progress'