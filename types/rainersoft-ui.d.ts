/**
 * @file rainersoft-ui.d.ts
 * @description Type definitions para o pacote @rainersoft/ui
 * 
 * Este arquivo fornece declarações de tipos para todos os componentes,
 * hooks e utilitários exportados pelo pacote @rainersoft/ui, habilitando
 * IntelliSense completo e verificação de tipos em projetos TypeScript.
 * 
 * @module types/rainersoft-ui
 * @author Rainer Teixeira
 * @version 2.0.0
 * @since 1.0.0
 * @license MIT
 * 
 * @example
 * ```tsx
 * import { Button, cn, Card } from '@rainersoft/ui';
 * 
 * const MyComponent = () => (
 *   <Card className={cn('p-4', 'bg-background')}>
 *     <Button variant="primary">Click me</Button>
 *   </Card>
 * );
 * ```
 */
declare module '@rainersoft/ui' {
  /**
   * Função utilitária para combinar classes CSS condicionalmente
   */
  export function cn(...inputs: any[]): string;
  
  /** Versão alternativa da função cn */
  export const cn2: any;
  
  /** Componente de animação do Framer Motion */
  export const motion: any;

  // Funções de Design Tokens
  export function getDarkColors(): any;
  export function getLightColors(): any;
  export function hexToRGB(hex: string): string;
  export function hexToRGBA(hex: string, alpha?: number): string;
  export function spacingTokens(): any;

  // Componentes de Avatar
  export const Avatar: any;
  export const AvatarFallback: any;
  export const AvatarImage: any;

  // Componentes de Botão
  export const Button: any;

  // Componentes de Card
  export const Card: any;
  export const CardContent: any;
  export const CardDescription: any;
  export const CardFooter: any;
  export const CardHeader: any;
  export const CardTitle: any;

  // Componentes de Carousel
  export const Carousel: any;
  export const CarouselContent: any;
  export const CarouselItem: any;
  export const CarouselNext: any;
  export const CarouselPrevious: any;

  // Componentes Sociais
  export const BookmarkButton: any;
  export const LikeButton: any;
  export const ReadingTime: any;
  export const ShareButton: any;

  // Componentes de Layout
  export const Badge: any;
  export const Separator: any;

  // Componentes de Diálogo
  export const AlertDialog: any;
  export const AlertDialogAction: any;
  export const AlertDialogCancel: any;
  export const AlertDialogContent: any;
  export const AlertDialogDescription: any;
  export const AlertDialogFooter: any;
  export const AlertDialogHeader: any;
  export const AlertDialogTitle: any;
  export const AlertDialogTrigger: any;
  export const Dialog: any;
  export const DialogContent: any;
  export const DialogDescription: any;
  export const DialogFooter: any;
  export const DialogHeader: any;
  export const DialogTitle: any;
  export const DialogTrigger: any;

  // Componentes de Painel Lateral
  export const Sheet: any;
  export const SheetContent: any;
  export const SheetDescription: any;
  export const SheetFooter: any;
  export const SheetHeader: any;
  export const SheetTitle: any;
  export const SheetTrigger: any;

  // Componentes de Dashboard
  export const AnalyticsOverview: any;
  export const HelpCenter: any;
  export const ProfileHeader: any;
  export const QuickActions: any;
  export const QuickStats: any;
  export const RecentPostsList: any;
  export const StatsCards: any;

  // Componentes de Formulário
  export const Checkbox: any;
  export const DatePicker: any;
  export const FileUpload: any;
  export const HighlightCard: any;
  export const Input: any;
  export const Label: any;
  export const PhoneInput: any;
  export const RadioGroup: any;
  export const RadioGroupItem: any;
  export const RangeSlider: any;
  export const ScrollArea: any;
  export const SearchInput: any;
  export const Select: any;
  export const SelectContent: any;
  export const SelectItem: any;
  export const SelectTrigger: any;
  export const SelectValue: any;
  export const Slider: any;
  export const Switch: any;
  export const TextArea: any;
  export const Textarea: any;
  export const TimePicker: any;

  // Componentes de Feedback
  export const Alert: any;
  export const AlertDescription: any;
  export const AlertTitle: any;
  export const EmptyState: any;
  export const KPI: any;
  export const Progress: any;
  export const Skeleton: any;
  export const Spinner: any;

  // Componentes de Navegação
  export const Accordion: any;
  export const AccordionContent: any;
  export const AccordionItem: any;
  export const AccordionTrigger: any;
  export const Command: any;
  export const CommandEmpty: any;
  export const CommandGroup: any;
  export const CommandInput: any;
  export const CommandItem: any;
  export const Tabs: any;
  export const TabsContent: any;
  export const TabsList: any;
  export const TabsTrigger: any;

  // Componentes de Menu Dropdown
  export const DropdownMenu: any;
  export const DropdownMenuCheckboxItem: any;
  export const DropdownMenuContent: any;
  export const DropdownMenuGroup: any;
  export const DropdownMenuItem: any;
  export const DropdownMenuLabel: any;
  export const DropdownMenuRadioGroup: any;
  export const DropdownMenuRadioItem: any;
  export const DropdownMenuSeparator: any;
  export const DropdownMenuShortcut: any;
  export const DropdownMenuSub: any;
  export const DropdownMenuSubContent: any;
  export const DropdownMenuSubTrigger: any;
  export const DropdownMenuTrigger: any;

  // Componentes de Popover
  export const Popover: any;
  export const PopoverContent: any;
  export const PopoverTrigger: any;

  // Componentes de Tooltip
  export const Tooltip: any;
  export const TooltipContent: any;
  export const TooltipProvider: any;
  export const TooltipTrigger: any;

  // Componentes de Menu de Navegação
  export const NavigationMenu: any;
  export const NavigationMenuContent: any;
  export const NavigationMenuIndicator: any;
  export const NavigationMenuItem: any;
  export const NavigationMenuLink: any;
  export const NavigationMenuList: any;
  export const NavigationMenuTrigger: any;
  export const NavigationMenuViewport: any;

  // Efeitos de Fundo
  export const CelestialBackground: any;
  export const FloatingGrid: any;
  export const MatrixBackground: any;
  export const ParticlesEffect: any;
  export const StarsBackground: any;

  // Componentes Utilitários
  export const BackToTop: any;
  export const CookieBanner: any;
  export const ErrorBoundary: any;
  export const InstallPrompt: any;
  export const LoadingScreen: any;
  export const PageHeader: any;
  export const ThemeToggle: any;
  export const Toaster: any;
  export const UpdateNotification: any;

  // Hooks
  export const useCarouselKeyboard: any;
  export const useIsMobile: any;
  export const usePWA: any;
  export const useTableOfContents: any;

  // Utilitários de Imagem
  export const convertToWebP: any;
  export const generatePlaceholder: any;
  export const getImageInfo: any;
  export const isAcceptedFormat: any;
  export const isWebP: any;
  export const prepareImageForUpload: any;
  export const resizeImage: any;
  export const supportsWebP: any;
}