/**
 * Change Username Dialog Component
 *
 * Dialog para alteração de nickname/username do usuário. Valida formato,
 * verifica disponibilidade em tempo real e suporta modo obrigatório para
 * novos usuários.
 *
 * @module components/domain/dashboard/change-username-dialog
 * @fileoverview Dialog de alteração de nickname com validação
 * @author Rainer Teixeira
 * @version 2.0.0
 * @since 1.0.0
 *
 * @example
 * ```tsx
 * <ChangeUsernameDialog
 *   open={isOpen}
 *   onOpenChange={setIsOpen}
 *   cognitoSub="user-123"
 *   currentUsername="username"
 *   required={false}
 * />
 * ```
 *
 * Características:
 * - Validação de formato de nickname
 * - Verificação de disponibilidade em tempo real
 * - Estados de loading, erro e sucesso
 * - Modo obrigatório (required)
 * - Integração com AWS Cognito
 * - Componente NicknameAvailability
 * - Acessibilidade completa
 */

'use client';

import { Alert, AlertDescription } from '@rainersoft/ui';
import { Button } from '@rainersoft/ui';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@rainersoft/ui';
import { Input } from '@rainersoft/ui';
import { Label } from '@rainersoft/ui';
import { cn } from '@rainersoft/ui';
import { GRADIENT_DIRECTIONS } from '@rainersoft/design-tokens';
// Design tokens via CSS variables (imported in globals.css)
import { AlertCircle, CheckCircle2, Loader2, User } from 'lucide-react';
import { useState } from 'react';
import { NicknameAvailability } from './login/nickname-availability';
import { publicAuth } from '@/lib/api';

interface ChangeUsernameDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cognitoSub: string;
  currentUsername: string;
  /** Se true, não permite fechar o dialog até ter nickname válido */
  required?: boolean;
}

export function ChangeUsernameDialog({
  open,
  onOpenChange,
  cognitoSub,
  currentUsername,
  required = false,
}: ChangeUsernameDialogProps) {
  const [newNickname, setNewNickname] = useState(currentUsername);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [validationMessage, setValidationMessage] = useState<string>('');

  // Validação: apenas letras e números, sem caracteres especiais e sem @
  const validateNickname = (nickname: string) => {
    if (!nickname) {
      setValidationMessage('');
      return false;
    }

    if (nickname.length < 3) {
      setValidationMessage('Nickname deve ter pelo menos 3 caracteres');
      return false;
    }

    if (nickname.length > 30) {
      setValidationMessage('Nickname deve ter no máximo 30 caracteres');
      return false;
    }

    // Apenas letras e números - sem @, underscore ou outros caracteres especiais
    if (!/^[a-zA-Z0-9]+$/.test(nickname)) {
      setValidationMessage(
        'Apenas letras e números são permitidos (sem @, underscore ou outros caracteres especiais)'
      );
      return false;
    }

    if (nickname.includes('@')) {
      setValidationMessage('O caractere @ não é permitido');
      return false;
    }

    setValidationMessage('');
    return true;
  };

  const handleNicknameChange = (value: string) => {
    // Remove caracteres especiais, @, underscore, espaços e converte para minúsculas
    const cleanValue = value.toLowerCase().replace(/[^a-z0-9]/g, '');
    setNewNickname(cleanValue);

    // Validação
    const valid = validateNickname(cleanValue);
    setIsValid(valid);

    // Disponibilidade será verificada pelo componente NicknameAvailability
    if (cleanValue === currentUsername || cleanValue.length < 3) {
      setIsAvailable(false);
    }
  };

  const canSubmit =
    isValid &&
    isAvailable &&
    !loading &&
    newNickname !== currentUsername &&
    newNickname.length >= 3;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newNickname || newNickname === currentUsername) {
      setError('Digite um nickname diferente do atual');
      return;
    }

    if (!validateNickname(newNickname)) {
      setError(validationMessage || 'Nickname inválido');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await publicAuth.updateNickname(cognitoSub, newNickname);

      setSuccess(true);

      // Se required=true, atualizar o contexto do usuário antes de fazer logout
      if (required) {
        // Atualizar localStorage com novo nickname
        try {
          const userData = localStorage.getItem('user');
          if (userData) {
            const user = JSON.parse(userData);
            user.username = newNickname;
            user.nickname = newNickname;
            localStorage.setItem('user', JSON.stringify(user));
          }
        } catch (e) {
          console.warn('Erro ao atualizar user no localStorage:', e);
        }

        // Aguardar 1s para mostrar mensagem de sucesso
        setTimeout(() => {
          // Fechar dialog antes de fazer logout
          onOpenChange(false);

          // Aguardar mais 1s e fazer logout para novo login
          setTimeout(() => {
            void publicAuth.logout();
            window.location.href = '/dashboard/login';
          }, 1000);
        }, 1000);
      } else {
        // Aguardar 2s e fazer logout para novo login
        setTimeout(() => {
          void publicAuth.logout();
          window.location.href = '/dashboard/login';
        }, 2000);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao alterar nickname');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = (open: boolean) => {
    // Se required=true e não tem nickname válido, não permite fechar
    if (
      required &&
      !success &&
      (!isValid || !isAvailable || newNickname.length < 3)
    ) {
      return; // Não fecha
    }

    if (!loading && !open) {
      setNewNickname(currentUsername);
      setError(null);
      setSuccess(false);
      setValidationMessage('');
      setIsValid(false);
      setIsAvailable(false);
      onOpenChange(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={handleClose}
      // Se required=true, desabilita fechar clicando fora ou pressionando ESC
      modal={true}
    >
      <DialogContent
        className={cn(
          'sm:max-w-[500px]',
          'dark:bg-black/50 dark:border-cyan-400/30',
          // Esconder botão X quando required
          required && !success && '[&>button]:hidden'
        )}
        // Se required=true, não permite fechar clicando fora
        onInteractOutside={(e: Event) => {
          if (required && !success) {
            e.preventDefault();
          }
        }}
        onEscapeKeyDown={(e: KeyboardEvent) => {
          if (required && !success) {
            e.preventDefault();
          }
        }}
      >
        <DialogHeader className="space-y-3">
          <DialogTitle
            className={cn(
              'text-2xl flex items-center gap-2',
              'dark:text-cyan-200'
            )}
          >
            <User className="w-5 h-5" />
            {required && !currentUsername
              ? 'Criar Nickname'
              : 'Alterar Nickname'}
          </DialogTitle>
          <DialogDescription className="dark:text-cyan-400/70 text-muted-foreground">
            {required && !currentUsername ? (
              <>
                <span className="font-semibold text-amber-500 dark:text-amber-400">
                  ⚠️ Obrigatório:
                </span>{' '}
                Você precisa criar um nickname para continuar. Este campo não
                pode ser fechado até você criar um nickname válido.
                <br />
                <br />
                Após criar, você precisará fazer login novamente.
              </>
            ) : (
              'Após alterar, você precisará fazer login novamente.'
            )}
          </DialogDescription>
        </DialogHeader>

        {success ? (
          <Alert className="border-green-500 bg-green-50 dark:bg-green-950/20 dark:border-green-400">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            <AlertDescription className="text-green-700 dark:text-green-400">
              Nickname alterado com sucesso! Redirecionando para login...
            </AlertDescription>
          </Alert>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label
                htmlFor="current-nickname"
                className={cn('text-base font-semibold', 'dark:text-cyan-200')}
              >
                Nickname Atual
              </Label>
              <Input
                id="current-nickname"
                value={currentUsername || 'Não definido'}
                disabled
                className={cn(
                  'bg-muted dark:bg-black/40 dark:border-cyan-400/30'
                )}
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="new-nickname"
                className={cn('text-base font-semibold', 'dark:text-cyan-200')}
              >
                Novo Nickname
              </Label>
              <Input
                id="new-nickname"
                value={newNickname}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleNicknameChange(e.target.value)
                }
                placeholder="meunickname"
                disabled={loading}
                required
                className={cn(
                  'dark:bg-black/40 dark:border-cyan-400/30',
                  'dark:text-cyan-100 dark:placeholder:text-cyan-400/40',
                  validationMessage && 'border-red-500 dark:border-red-500',
                  isValid &&
                    newNickname.length >= 3 &&
                    !validationMessage &&
                    'border-green-500 dark:border-green-500'
                )}
                maxLength={30}
              />
              <div className="space-y-1">
                <p
                  className={cn(
                    'text-xs',
                    validationMessage
                      ? 'text-red-600 dark:text-red-400'
                      : 'text-muted-foreground dark:text-cyan-400/60'
                  )}
                >
                  {validationMessage ||
                    '3-30 caracteres: apenas letras e números (sem @, underscore ou outros caracteres especiais)'}
                </p>
                {isValid &&
                  newNickname !== currentUsername &&
                  newNickname.length >= 3 && (
                    <NicknameAvailability
                      username={newNickname}
                      onAvailabilityChange={setIsAvailable}
                      excludeCognitoSub={cognitoSub}
                    />
                  )}
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              {!required && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleClose(false)}
                  disabled={loading}
                  className={cn(
                    'flex-1',
                    'dark:border-cyan-400/30 dark:text-cyan-300',
                    'dark:hover:bg-cyan-400/10'
                  )}
                >
                  Cancelar
                </Button>
              )}
              <Button
                type="submit"
                disabled={!canSubmit}
                className={cn(
                  required ? 'w-full' : 'flex-1',
                  `${GRADIENT_DIRECTIONS.TO_RIGHT} from-cyan-500 to-blue-600`,
                  'dark:from-cyan-600 dark:to-cyan-700 dark:hover:from-cyan-700 dark:hover:to-cyan-800',
                  'text-white'
                )}
              >
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {required && !currentUsername
                  ? 'Criar Nickname'
                  : 'Alterar Nickname'}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}


