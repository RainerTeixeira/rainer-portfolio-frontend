/**
 * Change Email Dialog Component
 *
 * Dialog para alteração de email do usuário. Implementa fluxo de verificação
 * em duas etapas com código de confirmação enviado por email.
 *
 * @module components/dashboard/change-email-dialog
 * @fileoverview Dialog de alteração de email com verificação
 * @author Rainer Teixeira
 * @version 2.0.0
 * @since 1.0.0
 *
 * @example
 * ```tsx
 * <ChangeEmailDialog
 *   open={isOpen}
 *   onOpenChange={setIsOpen}
 *   cognitoSub="user-123"
 *   currentEmail="user@example.com"
 * />
 * ```
 *
 * Características:
 * - Fluxo de verificação em duas etapas
 * - Validação de email
 * - Código de confirmação
 * - Estados de loading e erro
 * - Integração com AWS Cognito
 * - Acessibilidade completa
 */

'use client';

import { Button } from '@rainersoft/ui';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@rainersoft/ui';
import { Input } from '@rainersoft/ui';
import { Label } from '@rainersoft/ui';
import { userService } from '@/lib/api';
import { Mail } from 'lucide-react';
import { useState } from 'react';

interface ChangeEmailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cognitoSub: string;
  currentEmail: string;
}

export function ChangeEmailDialog({
  open,
  onOpenChange,
  cognitoSub,
  currentEmail,
}: ChangeEmailDialogProps) {
  const [step, setStep] = useState<'email' | 'code'>('email');
  const [newEmail, setNewEmail] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRequestChange = async () => {
    if (!newEmail || !newEmail.includes('@')) {
      alert('❌ Digite um email válido');
      return;
    }

    setLoading(true);
    try {
      await userService.changeEmail({
        cognitoSub,
        newEmail,
      });

      alert('✅ Código de verificação enviado para o novo email!');
      setStep('code');
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Falha ao solicitar alteração';
      alert(`❌ Erro: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    if (!code || code.length !== 6) {
      alert('❌ Digite o código de 6 dígitos');
      return;
    }

    setLoading(true);
    try {
      await userService.verifyEmailChange({
        cognitoSub,
        code,
      });

      alert('✅ Email alterado com sucesso! Faça login novamente.');
      onOpenChange(false);
      window.location.href = '/dashboard/login';
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Código inválido';
      alert(`❌ Erro: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setStep('email');
    setNewEmail('');
    setCode('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5" />
            Alterar Email
          </DialogTitle>
          <DialogDescription>
            {step === 'email'
              ? 'Digite o novo email. Um código de verificação será enviado.'
              : 'Digite o código de 6 dígitos enviado para o novo email.'}
          </DialogDescription>
        </DialogHeader>

        {step === 'email' ? (
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="current-email">Email Atual</Label>
              <Input
                id="current-email"
                type="email"
                value={currentEmail}
                disabled
                className="bg-muted"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="new-email">Novo Email</Label>
              <Input
                id="new-email"
                type="email"
                value={newEmail}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setNewEmail(e.target.value)
                }
                placeholder="novoemail@example.com"
                autoFocus
              />
            </div>
          </div>
        ) : (
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="code">Código de Verificação</Label>
              <Input
                id="code"
                type="text"
                value={code}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setCode(e.target.value.replace(/\D/g, '').slice(0, 6))
                }
                placeholder="123456"
                maxLength={6}
                autoFocus
              />
              <p className="text-sm text-muted-foreground">
                Verifique sua caixa de entrada em <strong>{newEmail}</strong>
              </p>
            </div>
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={handleClose} disabled={loading}>
            Cancelar
          </Button>
          {step === 'email' ? (
            <Button onClick={handleRequestChange} disabled={loading}>
              {loading ? 'Enviando...' : 'Enviar Código'}
            </Button>
          ) : (
            <Button onClick={handleVerifyCode} disabled={loading}>
              {loading ? 'Verificando...' : 'Verificar Código'}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
