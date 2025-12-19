"use client";

import { Button } from "@rainersoft/ui";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@rainersoft/ui";
import { Badge } from "@rainersoft/ui";
import { Mail, ShieldCheck, ShieldAlert } from "lucide-react";
import { cn } from '@rainersoft/ui';

interface EmailStatusDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  email: string;
  emailVerified: boolean;
}

export function EmailStatusDialog({
  open,
  onOpenChange,
  email,
  emailVerified,
}: EmailStatusDialogProps) {
  const statusLabel = emailVerified ? "Email verificado" : "Email não verificado";
  const statusIcon = emailVerified ? ShieldCheck : ShieldAlert;
  const StatusIcon = statusIcon;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[440px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5" />
            Status do Email
          </DialogTitle>
          <DialogDescription>
            Veja o email associado à sua conta e o status de verificação.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-1">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Email principal
            </p>
            <p className="text-sm sm:text-base font-mono break-all">
              {email || "Nenhum email encontrado"}
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Status de verificação
            </p>
            <div className="flex items-center gap-2">
              <Badge
                variant={emailVerified ? "default" : "outline"}
                className={cn(
                  "flex items-center gap-1 px-2.5 py-1 text-xs font-semibold",
                  emailVerified
                    ? "bg-emerald-500/15 text-emerald-500 border-emerald-500/30"
                    : "bg-amber-500/8 text-amber-500 border-amber-500/30"
                )}
              >
                <StatusIcon className="w-3.5 h-3.5" />
                <span>{statusLabel}</span>
              </Badge>
              {!emailVerified && (
                <p className="text-xs text-muted-foreground">
                  Para alterar o email ou reenviar confirmação, use o modal de alteração
                  de email.
                </p>
              )}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Fechar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
