/**
 * Newsletter Box Component
 *
 * Caixa de inscrição para captura de emails e inscrição na newsletter.
 * Inclui formulário com validação, estados de loading e sucesso, e integração
 * com hook useNewsletter.
 *
 * @module components/blog/newsletter-box
 * @fileoverview Componente de inscrição na newsletter
 * @author Rainer Teixeira
 * @version 2.0.0
 * @since 1.0.0
 *
 * @example
 * ```tsx
 * // Com valores padrão
 * <NewsletterBox />
 *
 * // Com valores customizados
 * <NewsletterBox
 *   title="Receba novidades"
 *   description="Fique por dentro das últimas atualizações"
 * />
 * ```
 *
 * Características:
 * - Formulário de email com validação
 * - Estados de loading e sucesso
 * - Integração com hook useNewsletter
 * - Design responsivo
 * - Acessibilidade completa
 * - Suporte a tema claro/escuro
 */

'use client';

import { Button } from '@rainersoft/ui';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@rainersoft/ui';
import { Input } from '@rainersoft/ui';
import { cn } from '@/lib/utils';
import { Check, Mail, Send } from 'lucide-react';
import { useNewsletter } from './hooks';

interface NewsletterBoxProps {
  title?: string;
  description?: string;
  className?: string;
}

export function NewsletterBox({
  title = '📬 Receba conteúdo técnico no seu email',
  description = 'Cadastre-se para receber novos artigos, tutoriais e dicas de desenvolvimento. 100% conteúdo de qualidade, zero spam!',
  className,
}: NewsletterBoxProps) {
  const { email, setEmail, isLoading, isSubscribed, handleSubmit } =
    useNewsletter();

  if (isSubscribed) {
    return (
      <Card
        className={cn(
          'dark:bg-linear-to-br dark:from-green-900/20 dark:to-emerald-900/20 dark:border-green-400/30',
          className
        )}
      >
        <CardContent className="p-6">
          <div className="flex items-center gap-3 text-green-600 dark:text-green-400">
            <Check className="h-6 w-6" />
            <div>
              <p className="font-semibold">Inscrição confirmada! ✅</p>
              <p className="text-sm text-muted-foreground">
                Você receberá nossos melhores conteúdos por email.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      className={cn(
        'dark:bg-linear-to-br dark:from-purple-900/20 dark:to-pink-900/20 dark:border-purple-400/30',
        className
      )}
    >
      <CardHeader>
        <CardTitle className="flex items-center gap-2 dark:text-purple-200">
          <Mail className="h-5 w-5" />
          {title}
        </CardTitle>
        <CardDescription className="dark:text-gray-300">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            disabled={isLoading}
            className="dark:bg-black/30 dark:border-purple-400/30"
          />
          <Button
            type="submit"
            disabled={isLoading}
            className="gap-2 dark:bg-purple-600 dark:hover:bg-purple-700"
          >
            {isLoading ? (
              'Enviando...'
            ) : (
              <>
                <Send className="h-4 w-4" />
                Inscrever
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
