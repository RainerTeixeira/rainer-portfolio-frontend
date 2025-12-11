/**
 * Profile Form Component
 *
 * Formulário de perfil do dashboard com edição de informações do usuário,
 * upload de avatar via Cloudinary e dialogs para alteração de email e username.
 *
 * @module components/domain/dashboard/profile-form
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
import { ApiError } from '@/lib/api/client';
import { Button } from '@rainersoft/ui';
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  HighlightCard,
} from '@rainersoft/ui';
import { Input } from '@rainersoft/ui';
import { Label } from '@rainersoft/ui';
import { Separator } from '@rainersoft/ui';
import { Textarea } from '@rainersoft/ui';
import { cn } from '@/lib/portfolio';
import { MOTION } from '@rainersoft/design-tokens';
import { CheckCircle2, Globe, Save, UserCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

/**
 * Estilos constantes do form
 */
const FORM_STYLES = {
  /** Título de seção */
  title: cn(
    'text-base sm:text-lg md:text-xl font-semibold',
    'text-foreground dark:text-cyan-200 dark:font-mono dark:tracking-wider',
    'mb-2 sm:mb-3 group-hover:text-primary dark:group-hover:text-cyan-100',
    'transition-colors duration-200 ease-in-out'
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
    MOTION.TRANSITION.DEFAULT,
    'hover:border-primary/30 dark:hover:border-cyan-400/30'
  ),

  /** Botão secundário */
  buttonSecondary: cn(
    'bg-background/50 dark:bg-black/30',
    'border-border/50 dark:border-cyan-400/20',
    'text-foreground dark:text-cyan-300',
    'hover:bg-background dark:hover:bg-black/50',
    'hover:border-primary/40 dark:hover:border-cyan-400/40',
    MOTION.TRANSITION.DEFAULT
  ),
} as const;

interface ProfileFormProps {
  onSuccess?: () => void;
}

export function ProfileForm({ onSuccess }: ProfileFormProps) {
  const { user, updateProfile } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [connectionError, setConnectionError] = useState(false);
  const [errors, setErrors] = useState<{
    fullName?: string;
    nickname?: string;
    website?: string;
    bio?: string;
  }>({});

  const [fullNameValue, setFullNameValue] = useState('');
  const [nicknameValue, setNicknameValue] = useState('');
  const [bioValue, setBioValue] = useState('');
  const [websiteValue, setWebsiteValue] = useState('');

  // Sincroniza valores iniciais quando o usuário é carregado
  useEffect(() => {
    if (user) {
      setFullNameValue(user.fullName ?? '');
      setNicknameValue(user.nickname ?? '');
      setBioValue(user.bio ?? '');
      setWebsiteValue(user.website ?? '');
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fullName = fullNameValue.trim();
    const nickname = nicknameValue.trim();
    const bio = bioValue;
    const website = websiteValue;

    // Validações leves de frontend (UX) – backend continua como fonte de verdade
    const nextErrors: typeof errors = {};

    // fullName: mínimo 3, máximo 80 caracteres
    if (!fullName || fullName.length < 3) {
      nextErrors.fullName = 'Informe um nome com pelo menos 3 caracteres.';
    } else if (fullName.length > 80) {
      nextErrors.fullName = 'Nome muito longo (máximo 80 caracteres).';
    }

    // nickname: 3-30 chars, letras/números/._-
    const nicknameRegex = /^[a-zA-Z0-9._-]{3,30}$/;
    if (!nicknameRegex.test(nickname)) {
      nextErrors.nickname =
        'Nickname deve ter entre 3 e 30 caracteres e usar apenas letras, números, ponto, traço ou underscore.';
    }

    // bio: máximo 160 caracteres (se preenchida)
    if (bio && bio.length > 160) {
      nextErrors.bio = 'Bio muito longa (máximo 160 caracteres).';
    }

    // website: se preenchido, precisa parecer URL válida simples
    if (website) {
      try {
        // URL lança se for inválida; aceita tanto com quanto sem protocolo, adicionando http:// por padrão
        // para evitar validações muito rígidas no frontend.
        const candidate = website.startsWith('http') ? website : `https://${website}`;
        // eslint-disable-next-line no-new
        new URL(candidate);
      } catch {
        nextErrors.website = 'Informe uma URL válida (ex: https://seusite.com).';
      }
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});

    setLoading(true);
    setSuccess(false);
    setConnectionError(false);
    try {
      await updateProfile({
        fullName,
        nickname,
        bio,
        website,
        // Aqui é seguro usar non-null assertion porque já retornamos acima se !user
        avatar: user!.avatar,
      });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      const fieldErrors: typeof errors = {};

      if (err instanceof ApiError) {
        const msg = (err.message || '').toLowerCase();

        // Erro de conexão (backend offline / não acessível)
        if (err.status === 0) {
          setConnectionError(true);
        }

        // Conflitos de nickname/fullName vindos do backend (409)
        if (err.status === 409) {
          if (msg.includes('nickname')) {
            fieldErrors.nickname = err.message;
          } else if (msg.includes('nome')) {
            fieldErrors.fullName = err.message;
          }
        }
      }

      if (Object.keys(fieldErrors).length > 0) {
        setErrors(prev => ({ ...prev, ...fieldErrors }));
      } else {
        // Fallback genérico quando não é possível mapear para um campo específico
        // (mantém comportamento atual sem duplicar mensagens de backend)
        console.error('Erro ao atualizar perfil:', err);
      }
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  // Cálculo de validade do formulário para controlar visibilidade do botão
  const trimmedFullName = fullNameValue.trim();
  const trimmedNickname = nicknameValue.trim();
  const isFullNameValid = trimmedFullName.length >= 3 && trimmedFullName.length <= 80;
  const nicknameRegex = /^[a-zA-Z0-9._-]{3,30}$/;
  const isNicknameValid = nicknameRegex.test(trimmedNickname);
  const isBioValid = !bioValue || bioValue.length <= 160;
  let isWebsiteValid = true;
  if (websiteValue) {
    try {
      const candidate = websiteValue.startsWith('http')
        ? websiteValue
        : `https://${websiteValue}`;
      // eslint-disable-next-line no-new
      new URL(candidate);
    } catch {
      isWebsiteValid = false;
    }
  }

  const isFormValid = isFullNameValid && isNicknameValid && isBioValid && isWebsiteValid;

  return (
    <div className="space-y-4 xs:space-y-6 sm:space-y-8">
      <HighlightCard>
        <CardHeader className="relative {Z_INDEX_CLASSES.CONTENT}">
          {connectionError && (
            <div
              className={cn(
                'mb-3 flex items-center gap-2 rounded-md px-3 py-2 text-xs sm:text-sm',
                'bg-destructive/10 text-destructive border border-destructive/30'
              )}
            >
              <span>
                Não foi possível conectar ao servidor. Tente novamente em alguns instantes.
              </span>
            </div>
          )}
          <CardTitle className={FORM_STYLES.title}>
            Informações do Perfil
          </CardTitle>
          <CardDescription className={FORM_STYLES.description}>
            Atualize suas informações pessoais
          </CardDescription>
        </CardHeader>
        <CardContent className="relative {Z_INDEX_CLASSES.CONTENT}">
          <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
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
                  value={fullNameValue}
                  onChange={e => setFullNameValue(e.target.value)}
                  placeholder="Seu nome completo"
                  required
                  className={FORM_STYLES.input}
                  aria-invalid={!!errors.fullName || undefined}
                />
                {errors.fullName && (
                  <p className="mt-1 text-xs text-destructive">{errors.fullName}</p>
                )}
              </div>

              <div className="space-y-3">
                <Label htmlFor="nickname" className={FORM_STYLES.label}>
                  <UserCircle className="w-4 h-4" />
                  Nickname
                </Label>
                <Input
                  id="nickname"
                  name="nickname"
                  value={nicknameValue}
                  onChange={e => setNicknameValue(e.target.value)}
                  placeholder="Seu nome público (ex: rainerdev)"
                  required
                  className={FORM_STYLES.input}
                  aria-invalid={!!errors.nickname || undefined}
                />
                <p className="text-xs text-muted-foreground dark:text-gray-400">
                  Nome público usado na plataforma. Precisa ser único.
                </p>
                {errors.nickname && (
                  <p className="mt-1 text-xs text-destructive">{errors.nickname}</p>
                )}
              </div>

              <div className="space-y-3">
                <Label htmlFor="bio" className={FORM_STYLES.label}>
                  <UserCircle className="w-4 h-4" />
                  Bio
                </Label>
                <Textarea
                  id="bio"
                  name="bio"
                  value={bioValue}
                  onChange={e => setBioValue(e.target.value)}
                  placeholder="Conte um pouco sobre você..."
                  rows={4}
                  className={cn(FORM_STYLES.input, 'resize-none min-h-[100px]')}
                />
                <p className="text-xs text-muted-foreground dark:text-gray-400">
                  Breve descrição sobre você (máximo 160 caracteres)
                </p>
                {errors.bio && (
                  <p className="mt-1 text-xs text-destructive">{errors.bio}</p>
                )}
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
                  value={websiteValue}
                  onChange={e => setWebsiteValue(e.target.value)}
                  placeholder="https://seusite.com"
                  className={FORM_STYLES.input}
                  aria-invalid={!!errors.website || undefined}
                />
                {errors.website && (
                  <p className="mt-1 text-xs text-destructive">{errors.website}</p>
                )}
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
              {isFormValid && (
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
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      Salvando...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Salvar Alterações
                    </>
                  )}
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </HighlightCard>
    </div>
  );
}


