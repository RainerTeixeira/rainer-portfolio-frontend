/**
 * Profile Form Component
 *
 * Formulário de perfil do dashboard com edição de informações do usuário,
 * upload de avatar via Cloudinary e dialogs para alteração de email e username.
 *
 * @module components/dashboard/profile-form
 * @fileoverview Formulário de perfil com upload de avatar
 * @author Rainer Teixeira
 * @version 2.0.0
 * @since 1.0.0
 *
 * @example
 * ```tsx
 * <ProfileForm />
 * ```
 *
 * Características:
 * - Formulário completo de perfil
 * - Upload de avatar com Cloudinary
 * - Edição de nome, email, bio
 * - Dialogs de alteração de email e username
 * - Integração com sistema de autenticação
 * - Validação de campos
 * - Layout responsivo
 * - Acessibilidade completa
 */

'use client';

import { useAuthContext } from '@/components/providers/auth-context-provider';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { cloudinaryService } from '@/lib/api/services/cloudinary.service';
import { cn } from '@/lib/utils';
import {
  BACKDROP_BLUR,
  BORDER_RADIUS,
  GRADIENT_DIRECTIONS,
  SHADOWS,
  TRANSITIONS,
} from '@rainer/design-tokens';
import {
  Camera,
  CheckCircle2,
  Globe,
  Mail,
  Save,
  User,
  UserCircle,
} from 'lucide-react';
import { useState } from 'react';
import { ChangeEmailDialog } from './change-email-dialog';
import { ChangeUsernameDialog } from './change-username-dialog';

/**
 * Estilos constantes do form
 */
const FORM_STYLES = {
  /** Card premium com glassmorphism */
  card: cn(
    'text-left bg-card/60 dark:bg-black/50',
    BACKDROP_BLUR.XL,
    BORDER_RADIUS['2XL'],
    'p-4 xs:p-5 sm:p-6 md:p-8',
    'border border-border/50 dark:border-cyan-400/20',
    'hover:border-primary/40 dark:hover:border-cyan-400/50',
    'hover:bg-card/80 dark:hover:bg-black/70',
    `hover:${SHADOWS.XXLARGE} hover:shadow-primary/10 dark:hover:shadow-cyan-500/20`,
    TRANSITIONS.SLOW,
    'h-full flex flex-col group',
    'relative overflow-hidden',
    `before:absolute before:inset-0 ${GRADIENT_DIRECTIONS.TO_BR}`,
    'before:from-primary/0 before:via-primary/0 before:to-primary/0',
    'hover:before:from-primary/5 hover:before:via-transparent hover:before:to-primary/5',
    'dark:hover:before:from-cyan-400/5 dark:hover:before:via-transparent dark:hover:before:to-purple-400/5',
    `before:${TRANSITIONS.SLOW} before:pointer-events-none`
  ),

  /** Título de seção */
  title: cn(
    'text-base sm:text-lg md:text-xl font-semibold',
    'text-foreground dark:text-cyan-200 dark:font-mono dark:tracking-wider',
    'mb-2 sm:mb-3 group-hover:text-primary dark:group-hover:text-cyan-100',
    TRANSITIONS.COLORS
  ),

  /** Descrição de seção */
  description: cn(
    'text-xs sm:text-sm text-muted-foreground dark:text-gray-300',
    'mb-4 sm:mb-6'
  ),

  /** Label de input */
  label: cn(
    'text-sm sm:text-base font-semibold',
    'text-foreground dark:text-cyan-300',
    'flex items-center gap-2 mb-2'
  ),

  /** Input premium */
  input: cn(
    'bg-background/50 dark:bg-black/30',
    'border-border/50 dark:border-cyan-400/20',
    'focus:border-primary/50 dark:focus:border-cyan-400/50',
    'focus:ring-2 focus:ring-primary/20 dark:focus:ring-cyan-400/20',
    TRANSITIONS.NORMAL,
    'hover:border-primary/30 dark:hover:border-cyan-400/30'
  ),

  /** Botão secundário */
  buttonSecondary: cn(
    'bg-background/50 dark:bg-black/30',
    'border-border/50 dark:border-cyan-400/20',
    'text-foreground dark:text-cyan-300',
    'hover:bg-background dark:hover:bg-black/50',
    'hover:border-primary/40 dark:hover:border-cyan-400/40',
    TRANSITIONS.NORMAL
  ),
} as const;

export function ProfileForm() {
  const { user, updateProfile } = useAuthContext();
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const [showUsernameDialog, setShowUsernameDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [avatarUrl, setAvatarUrl] = useState(user?.avatar || '');
  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validar tamanho (2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert('❌ Imagem muito grande. Máximo 2MB.');
      return;
    }

    // Validar tipo
    if (!file.type.startsWith('image/')) {
      alert('❌ Apenas imagens são permitidas.');
      return;
    }

    // Upload para Cloudinary
    setUploadingAvatar(true);
    try {
      // Mostrar preview temporário enquanto faz upload
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarUrl(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Fazer upload para Cloudinary
      const cloudinaryUrl = await cloudinaryService.uploadAvatar(file);
      setAvatarUrl(cloudinaryUrl);
      console.log('✅ Avatar enviado para Cloudinary:', cloudinaryUrl);
    } catch (error) {
      const err = error as Error;
      alert(`❌ Erro ao fazer upload: ${err.message}`);
      console.error('Erro ao fazer upload de avatar:', err);
    } finally {
      setUploadingAvatar(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    setLoading(true);
    setSuccess(false);
    try {
      await updateProfile({
        fullName: formData.get('fullName') as string,
        bio: formData.get('bio') as string,
        website: formData.get('website') as string,
        avatar: avatarUrl,
      });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch {
      alert('❌ Erro ao atualizar perfil');
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  const getInitials = (fullName: string) => {
    return fullName
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="space-y-4 xs:space-y-6 sm:space-y-8">
      {/* Avatar Section */}
      <Card className={FORM_STYLES.card}>
        <CardHeader className="relative {Z_INDEX_CLASSES.CONTENT}">
          <CardTitle className={FORM_STYLES.title}>Foto de Perfil</CardTitle>
          <CardDescription className={FORM_STYLES.description}>
            Sua imagem de perfil pública
          </CardDescription>
        </CardHeader>
        <CardContent className="relative {Z_INDEX_CLASSES.CONTENT}">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 xs:gap-6">
            <div className="relative group">
              <Avatar
                className={cn(
                  'h-20 w-20 xs:h-24 xs:w-24 sm:h-28 sm:w-28',
                  'border-4 border-border/50 dark:border-cyan-400/30',
                  'transition-all duration-500',
                  'group-hover:scale-105 group-hover:border-primary/50 dark:group-hover:border-cyan-400/50',
                  'group-hover:shadow-xl group-hover:shadow-primary/20 dark:group-hover:shadow-cyan-500/30'
                )}
              >
                <AvatarImage
                  src={avatarUrl || user.avatar}
                  alt={user.fullName}
                  className="object-cover"
                />
                <AvatarFallback
                  className={cn(
                    'text-xl xs:text-2xl sm:text-3xl',
                    'bg-linear-to-br from-primary/20 to-primary/10',
                    'dark:from-cyan-400/20 dark:to-purple-400/10',
                    'dark:text-cyan-300 font-bold'
                  )}
                >
                  {getInitials(user.fullName)}
                </AvatarFallback>
              </Avatar>
              <div
                className={cn(
                  'absolute inset-0 flex items-center justify-center',
                  'bg-black/60 dark:bg-black/80 rounded-full',
                  'opacity-0 group-hover:opacity-100',
                  'transition-opacity {ANIMATION_DURATION.NORMAL} cursor-pointer',
                  'backdrop-blur-sm'
                )}
              >
                {uploadingAvatar ? (
                  <div className="w-6 h-6 xs:w-8 xs:h-8 animate-spin {BORDER_RADIUS.FULL} border-2 border-white border-t-transparent" />
                ) : (
                  <Camera className="w-6 h-6 xs:w-8 xs:h-8 text-white" />
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                disabled={uploadingAvatar}
                className="absolute inset-0 {OPACITY.NONE} cursor-pointer disabled:cursor-not-allowed {BORDER_RADIUS.FULL}"
                aria-label="Alterar foto de perfil"
              />
            </div>
            <div className="flex-1 w-full sm:w-auto min-w-0">
              <label htmlFor="avatar-upload" className="cursor-pointer">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className={cn(
                    FORM_STYLES.buttonSecondary,
                    'w-full sm:w-auto',
                    'flex items-center justify-center gap-2'
                  )}
                  asChild
                >
                  <span>
                    <Camera className="w-4 h-4" />
                    <span className="text-xs sm:text-sm">Alterar Foto</span>
                  </span>
                </Button>
              </label>
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
              <p
                className={cn(
                  'text-xs xs:text-sm text-muted-foreground',
                  'dark:text-gray-400 mt-2',
                  'text-center sm:text-left'
                )}
              >
                JPG, PNG ou GIF. Máximo 2MB.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Profile Info */}
      <Card className={FORM_STYLES.card}>
        <CardHeader className="relative {Z_INDEX_CLASSES.CONTENT}">
          <CardTitle className={FORM_STYLES.title}>
            Informações do Perfil
          </CardTitle>
          <CardDescription className={FORM_STYLES.description}>
            Atualize suas informações pessoais
          </CardDescription>
        </CardHeader>
        <CardContent className="relative {Z_INDEX_CLASSES.CONTENT}">
          <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
            {/* Credentials Section */}
            <div className="space-y-4 sm:space-y-6">
              <div className="space-y-3">
                <Label htmlFor="email" className={FORM_STYLES.label}>
                  <Mail className="w-4 h-4" />
                  Email
                </Label>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <Input
                    id="email"
                    type="email"
                    value={user.email}
                    disabled
                    className={cn(FORM_STYLES.input, 'flex-1 bg-muted/50')}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setShowEmailDialog(true)}
                    className={cn(
                      FORM_STYLES.buttonSecondary,
                      'w-full sm:w-auto whitespace-nowrap'
                    )}
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Alterar
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground dark:text-gray-400">
                  Email gerenciado pelo Cognito
                </p>
              </div>

              <div className="space-y-3">
                <Label htmlFor="username" className={FORM_STYLES.label}>
                  <User className="w-4 h-4" />
                  Username
                </Label>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <Input
                    id="username"
                    value={user.nickname}
                    disabled
                    className={cn(FORM_STYLES.input, 'flex-1 bg-muted/50')}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setShowUsernameDialog(true)}
                    className={cn(
                      FORM_STYLES.buttonSecondary,
                      'w-full sm:w-auto whitespace-nowrap'
                    )}
                  >
                    <User className="w-4 h-4 mr-2" />
                    Alterar
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground dark:text-gray-400">
                  Username gerenciado pelo Cognito
                </p>
              </div>
            </div>

            <Separator className="my-6 sm:my-8 bg-border/50 dark:bg-cyan-400/20" />

            {/* Editable Fields */}
            <div className="space-y-4 sm:space-y-6">
              <div className="space-y-3">
                <Label htmlFor="fullName" className={FORM_STYLES.label}>
                  <UserCircle className="w-4 h-4" />
                  Nome Completo
                </Label>
                <Input
                  id="fullName"
                  name="fullName"
                  defaultValue={user.fullName}
                  placeholder="Seu nome completo"
                  required
                  className={FORM_STYLES.input}
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="bio" className={FORM_STYLES.label}>
                  <UserCircle className="w-4 h-4" />
                  Bio
                </Label>
                <Textarea
                  id="bio"
                  name="bio"
                  defaultValue={user.bio}
                  placeholder="Conte um pouco sobre você..."
                  rows={4}
                  className={cn(FORM_STYLES.input, 'resize-none min-h-[100px]')}
                />
                <p className="text-xs text-muted-foreground dark:text-gray-400">
                  Breve descrição sobre você (máximo 160 caracteres)
                </p>
              </div>

              <div className="space-y-3">
                <Label htmlFor="website" className={FORM_STYLES.label}>
                  <Globe className="w-4 h-4" />
                  Website
                </Label>
                <Input
                  id="website"
                  name="website"
                  type="url"
                  defaultValue={user.website}
                  placeholder="https://seusite.com"
                  className={FORM_STYLES.input}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 sm:pt-6 border-t border-border/50 dark:border-cyan-400/20">
              {success && (
                <div
                  className={cn(
                    'flex items-center gap-2 px-4 py-2 rounded-lg',
                    'bg-green-500/10 dark:bg-green-400/10',
                    'border border-green-500/20 dark:border-green-400/20',
                    'text-green-700 dark:text-green-300',
                    'animate-in fade-in slide-in-from-left-5 duration-300'
                  )}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    Perfil atualizado com sucesso!
                  </span>
                </div>
              )}
              <Button
                type="submit"
                disabled={loading}
                size="lg"
                className={cn(
                  'w-full sm:w-auto',
                  'bg-primary hover:bg-primary/90',
                  'dark:bg-cyan-400 dark:hover:bg-cyan-500',
                  'dark:text-black font-semibold',
                  'shadow-lg shadow-primary/20 dark:shadow-cyan-500/20',
                  'hover:shadow-xl hover:shadow-primary/30 dark:hover:shadow-cyan-500/30',
                  'transition-all duration-300',
                  'disabled:opacity-50 disabled:cursor-not-allowed'
                )}
              >
                {loading ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin {BORDER_RADIUS.FULL} border-2 border-current border-t-transparent" />
                    Salvando...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Salvar Alterações
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Dialogs */}
      <ChangeEmailDialog
        open={showEmailDialog}
        onOpenChange={setShowEmailDialog}
        cognitoSub={user.cognitoSub}
        currentEmail={user.email}
      />

      <ChangeUsernameDialog
        open={showUsernameDialog}
        onOpenChange={setShowUsernameDialog}
        cognitoSub={user.cognitoSub}
        currentUsername={user.nickname}
      />
    </div>
  );
}
