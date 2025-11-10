/**
 * Share Button Component
 *
 * Botão de compartilhamento com menu de opções de compartilhamento social.
 * Suporta múltiplas plataformas (Facebook, Twitter, LinkedIn), compartilhamento
 * nativo via Web Share API e geração de QR code.
 *
 * @module components/blog/social/share-button
 * @fileoverview Botão de compartilhamento com múltiplas opções
 * @author Rainer Teixeira
 * @version 2.0.0
 * @since 1.0.0
 *
 * @example
 * ```tsx
 * <ShareButton
 *   url="https://example.com/post"
 *   title="Título do Post"
 *   description="Descrição do post"
 *   variant="default"
 * />
 * ```
 *
 * Características:
 * - Menu dropdown com opções de compartilhamento
 * - Compartilhamento nativo (Web Share API)
 * - QR Code para compartilhamento
 * - Múltiplas plataformas (Facebook, Twitter, LinkedIn)
 * - Copiar link para clipboard
 * - Notificações toast
 * - Acessibilidade completa
 */

'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Check,
  Facebook,
  Link as LinkIcon,
  Linkedin,
  MessageCircle,
  QrCode,
  Send,
  Share2,
  Twitter,
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { useState } from 'react';
import { toast } from 'sonner';

interface ShareButtonProps {
  url: string;
  title: string;
  description?: string;
  variant?: 'default' | 'ghost' | 'outline';
  size?: 'sm' | 'default' | 'lg';
  showLabel?: boolean;
}

export function ShareButton({
  url,
  title,
  description = '',
  variant = 'outline',
  size = 'sm',
  showLabel = true,
}: ShareButtonProps) {
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);

  const shareUrl =
    typeof window !== 'undefined' ? `${window.location.origin}${url}` : url;

  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast.success('Link copiado para a área de transferência!');

      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Erro ao copiar:', error);
      toast.error('Erro ao copiar link');
    }
  }

  async function shareNative() {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description,
          url: shareUrl,
        });
        toast.success('Compartilhado com sucesso!');
      } catch (error) {
        if (error instanceof Error && error.name !== 'AbortError') {
          console.error('Erro ao compartilhar:', error);
        }
      }
    }
  }

  function shareOnPlatform(platform: string) {
    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedTitle = encodeURIComponent(title);
    // const encodedDescription = encodeURIComponent(description) // Pode ser usado futuramente

    const urls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      whatsapp: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
      telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
      reddit: `https://reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`,
    };

    const platformUrl = urls[platform as keyof typeof urls];
    if (platformUrl) {
      window.open(
        platformUrl,
        '_blank',
        'noopener,noreferrer,width=600,height=600'
      );
    }
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={variant} size={size} className="gap-2">
            <Share2 className="h-4 w-4" />
            {showLabel && <span>Compartilhar</span>}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Compartilhar em</DropdownMenuLabel>
          <DropdownMenuSeparator />

          {/* Native Share API (mobile) */}
          {typeof navigator !== 'undefined' && 'share' in navigator && (
            <>
              <DropdownMenuItem onClick={shareNative}>
                <Share2 className="mr-2 h-4 w-4" />
                Compartilhar...
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </>
          )}

          {/* Social Media */}
          <DropdownMenuItem onClick={() => shareOnPlatform('facebook')}>
            <Facebook className="mr-2 h-4 w-4 text-blue-600" />
            Facebook
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => shareOnPlatform('twitter')}>
            <Twitter className="mr-2 h-4 w-4 text-sky-500" />
            Twitter / X
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => shareOnPlatform('linkedin')}>
            <Linkedin className="mr-2 h-4 w-4 text-blue-700" />
            LinkedIn
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => shareOnPlatform('whatsapp')}>
            <MessageCircle className="mr-2 h-4 w-4 text-green-600" />
            WhatsApp
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => shareOnPlatform('telegram')}>
            <Send className="mr-2 h-4 w-4 text-blue-500" />
            Telegram
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          {/* Copy Link */}
          <DropdownMenuItem onClick={copyToClipboard}>
            {copied ? (
              <>
                <Check className="mr-2 h-4 w-4 text-green-500" />
                <span className="text-green-500">Link copiado!</span>
              </>
            ) : (
              <>
                <LinkIcon className="mr-2 h-4 w-4" />
                Copiar link
              </>
            )}
          </DropdownMenuItem>

          {/* QR Code */}
          <DropdownMenuItem onClick={() => setShowQR(true)}>
            <QrCode className="mr-2 h-4 w-4" />
            QR Code
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* QR Code Dialog */}
      <Dialog open={showQR} onOpenChange={setShowQR}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Compartilhar via QR Code</DialogTitle>
            <DialogDescription>
              Escaneie o QR Code abaixo para acessar este conteúdo
            </DialogDescription>
          </DialogHeader>

          <div className="flex justify-center p-6 bg-white rounded-lg">
            <QRCodeSVG value={shareUrl} size={256} level="H" includeMargin />
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setShowQR(false)}
            >
              Fechar
            </Button>
            <Button className="flex-1" onClick={copyToClipboard}>
              <LinkIcon className="mr-2 h-4 w-4" />
              Copiar Link
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
