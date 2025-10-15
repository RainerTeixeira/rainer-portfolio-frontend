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
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogTrigger,
  DialogClose 
} from './dialog'

/** 
 * Modais de login removidos.
 * Use a página dedicada: /dashboard/login
 */

/** Componente BackToTop: botão voltar ao topo */
export { BackToTopButton } from './back-to-top'
export { BackToTopButton as BackToTop } from './back-to-top'

/** Componente Skeleton: loading placeholders */
export { Skeleton } from './skeleton'

/** Componente Tooltip: tooltips informativos */
export { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from './tooltip'

/** Componente Sheet: drawer lateral */
export { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter, SheetClose } from './sheet'

// ══════════════════════════════════════════════════════════════
// NOVOS COMPONENTES ADICIONADOS
// ══════════════════════════════════════════════════════════════

/** Componente Select: dropdown select */
export { 
  Select, 
  SelectGroup, 
  SelectValue, 
  SelectTrigger, 
  SelectContent, 
  SelectLabel, 
  SelectItem, 
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton
} from './select'

/** Componente Tabs: navegação em abas */
export { Tabs, TabsList, TabsTrigger, TabsContent } from './tabs'

/** Componente Switch: toggle switch */
export { Switch } from './switch'

/** Componente Popover: popover contextual */
export { Popover, PopoverTrigger, PopoverContent } from './popover'

/** Componente DropdownMenu: menu dropdown */
export { 
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
} from './dropdown-menu'

/** Componente Checkbox: checkbox para seleção */
export { Checkbox } from './checkbox'

/** Componente Form: formulários com validação */
export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
} from './form'

/** Componente Alert: alertas e mensagens */
export { Alert, AlertTitle, AlertDescription } from './alert'

/** Componente AlertDialog: dialogs de confirmação */
export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from './alert-dialog'

/** Componente Command: command palette (Ctrl+K) */
export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
} from './command'

/** Componente ScrollArea: área de scroll customizada */
export { ScrollArea, ScrollBar } from './scroll-area'