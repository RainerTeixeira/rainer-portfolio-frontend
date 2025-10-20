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
 * - ParticlesEffect: partículas decorativas para dark mode
 * - PageHeader: header padronizado para páginas internas
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

/** Componente ParticlesEffect: partículas decorativas para dark mode */
export { ParticlesEffect } from './particles-effect'

/** Componente PageHeader: header padronizado para páginas internas */
export { PageHeader } from './page-header'

/** Componente InstallPrompt: prompt de instalação PWA */
export { InstallPrompt } from './install-prompt'

/** Componente UpdateNotification: notificação de atualização PWA */
export { UpdateNotification } from './update-notification'

/** Componentes de formulário */
export { Input } from './input'
export { Label } from './label'
export { Textarea } from './textarea'

/** Sistema de Dialog/Modal */
export {
  Dialog, DialogClose, DialogContent,
  DialogDescription, DialogFooter, DialogHeader,
  DialogTitle, DialogTrigger
} from './dialog'

/** 
 * Modais de login removidos.
 * Use a página dedicada: /dashboard/login
 */

/** Componente BackToTop: botão voltar ao topo */
export { BackToTopButton as BackToTop, BackToTopButton } from './back-to-top'

/** Componente Skeleton: loading placeholders */
export { Skeleton } from './skeleton'

/** Componente Tooltip: tooltips informativos */
export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltip'

/** Componente Sheet: drawer lateral */
export { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from './sheet'

// ══════════════════════════════════════════════════════════════
// NOVOS COMPONENTES ADICIONADOS
// ══════════════════════════════════════════════════════════════

/** Componente Select: dropdown select */
export {
  Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectScrollDownButton, SelectScrollUpButton, SelectSeparator, SelectTrigger, SelectValue
} from './select'

/** Componente Tabs: navegação em abas */
export { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs'

/** Componente Switch: toggle switch */
export { Switch } from './switch'

/** Componente Popover: popover contextual */
export { Popover, PopoverContent, PopoverTrigger } from './popover'

/** Componente DropdownMenu: menu dropdown */
export {
  DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator,
  DropdownMenuShortcut, DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger, DropdownMenuTrigger
} from './dropdown-menu'

/** Componente Checkbox: checkbox para seleção */
export { Checkbox } from './checkbox'

/** Componente Form: formulários com validação */
export {
  Form, FormControl,
  FormDescription, FormField, FormItem,
  FormLabel, FormMessage, useFormField
} from './form'

/** Componente Alert: alertas e mensagens */
export { Alert, AlertDescription, AlertTitle } from './alert'

/** Componente AlertDialog: dialogs de confirmação */
export {
  AlertDialog, AlertDialogAction,
  AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, AlertDialogPortal, AlertDialogTitle, AlertDialogTrigger
} from './alert-dialog'

/** Componente Command: command palette (Ctrl+K) */
export {
  Command,
  CommandDialog, CommandEmpty,
  CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut
} from './command'

/** Componente ScrollArea: área de scroll customizada */
export { ScrollArea, ScrollBar } from './scroll-area'

// ============================================================================
// ENTERPRISE COMPONENTS - Adicionados Outubro 2025
// ============================================================================

/** Loading States: componentes padronizados de carregamento */
export {
  EmptyState, FullPageLoader,
  InlineLoader, LoadingSpinner, SkeletonGrid
} from './loading-states'
