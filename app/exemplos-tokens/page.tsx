/**
 * Página de Exemplos - Design Tokens
 *
 * Demonstração prática do uso dos design tokens expandidos:
 * - Cores com estados (hover, active, disabled, focus)
 * - Tipografia hierárquica (H1-H6, subtítulos, corpo, legendas)
 * - Acessibilidade WCAG AA
 * - Integração com Tailwind + shadcn/ui
 *
 * @module app/exemplos-tokens/page
 * @fileoverview Página de exemplos de uso dos design tokens
 * @author Rainer Teixeira
 * @version 1.0.0
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
import { tokens, validateContrast } from '@rainersoft/design-tokens';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function ExemplosTokensPage() {
  const { resolvedTheme } = useTheme();

  /**
   * Estado de montagem do componente.
   * Previne hidratação incorreta ao acessar window/theme no servidor.
   */
  const [mounted, setMounted] = useState(false);

  /**
   * Informações de contraste WCAG calculadas.
   * Valida contraste entre cores primárias, secundárias e accent com background.
   */
  const [contrastInfo, setContrastInfo] = useState<{
    primary: ReturnType<typeof validateContrast>;
    secondary: ReturnType<typeof validateContrast>;
    accent: ReturnType<typeof validateContrast>;
  } | null>(null);

  /**
   * Marca componente como montado após renderização no cliente.
   * Necessário para evitar erros de hidratação com useTheme.
   */
  useEffect(() => {
    setMounted(true);
  }, []);

  /**
   * Calcula informações de contraste WCAG baseado no tema atual.
   * Executa sempre que tema ou estado de montagem mudam.
   */
  useEffect(() => {
    if (!mounted) return;

    const isDark = resolvedTheme === 'dark';
    const colors = isDark ? tokens.colors.dark : tokens.colors.light;

    setContrastInfo({
      primary: validateContrast(
        colors.primary.base,
        colors.background.primary,
        {
          largeText: false,
        }
      ),
      secondary: validateContrast(
        colors.secondary.base,
        colors.background.primary,
        {
          largeText: false,
        }
      ),
      accent: validateContrast(colors.accent.base, colors.background.primary, {
        largeText: false,
      }),
    });
  }, [mounted, resolvedTheme]);

  /**
   * Retorna null durante SSR para evitar hidratação incorreta.
   * Componente só renderiza após montagem no cliente.
   */
  if (!mounted) return null;

  /**
   * Obtém cores e tipografia baseados no tema atual.
   * Usado para aplicar tokens dinamicamente conforme tema do sistema.
   */
  const isDark = resolvedTheme === 'dark';
  const colors = isDark ? tokens.colors.dark : tokens.colors.light;
  const typography = tokens.typography;

  // Safety check: ensure typography structure exists
  if (!typography || !typography.headings || !typography.headings.h1) {
    console.error('Typography structure is missing or incomplete:', {
      typography,
      hasTypography: !!typography,
      hasHeadings: !!(typography && typography.headings),
      hasH1: !!(typography && typography.headings && typography.headings.h1),
      tokensKeys: Object.keys(tokens),
    });
    return (
      <div className="min-h-screen bg-background py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold text-red-500">
            Error: Typography tokens not available
          </h1>
          <p className="mt-4 text-gray-600">
            Please check the design tokens package structure and restart the dev
            server.
          </p>
          <pre className="mt-4 p-4 bg-gray-100 rounded text-xs overflow-auto">
            {JSON.stringify(
              {
                hasTypography: !!typography,
                typographyKeys: typography ? Object.keys(typography) : [],
              },
              null,
              2
            )}
          </pre>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 px-6">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header com Título e Subtítulo */}
        <header className="space-y-4">
          <h1
            className="font-display font-black"
            style={{
              fontSize: typography.headings.h1.fontSize,
              fontWeight: typography.headings.h1.fontWeight,
              lineHeight: typography.headings.h1.lineHeight,
              letterSpacing: typography.headings.h1.letterSpacing,
              marginBottom: typography.headings.h1.marginBottom,
              color: colors.text.primary,
            }}
          >
            Design Tokens em Ação
          </h1>
          <p
            className="font-body"
            style={{
              fontSize: typography.subtitle.large.fontSize,
              fontWeight: typography.subtitle.large.fontWeight,
              lineHeight: typography.subtitle.large.lineHeight,
              color: colors.text.secondary,
            }}
          >
            Demonstração prática dos tokens expandidos: cores, tipografia e
            acessibilidade
          </p>
        </header>

        {/* Parágrafo de Texto com Boa Legibilidade */}
        <section className="space-y-4">
          <h2
            className="font-display font-bold"
            style={{
              fontSize: typography.headings.h2.fontSize,
              fontWeight: typography.headings.h2.fontWeight,
              lineHeight: typography.headings.h2.lineHeight,
              color: colors.text.primary,
            }}
          >
            Tipografia Hierárquica
          </h2>
          <p
            className="font-body"
            style={{
              fontSize: typography.body.large.fontSize,
              fontWeight: typography.body.large.fontWeight,
              lineHeight: typography.body.large.lineHeight,
              color: colors.text.primary,
            }}
          >
            Este parágrafo demonstra o uso do token de tipografia para corpo de
            texto grande. A legibilidade é garantida através de tamanho adequado
            (1.125rem), altura de linha confortável (1.625) e contraste WCAG AA.
            O texto é responsivo e se adapta perfeitamente em diferentes
            dispositivos.
          </p>
          <p
            className="font-body"
            style={{
              fontSize: typography.body.medium.fontSize,
              fontWeight: typography.body.medium.fontWeight,
              lineHeight: typography.body.medium.lineHeight,
              color: colors.text.secondary,
            }}
          >
            Este é um exemplo de texto médio usando o token body.medium. Ideal
            para conteúdo secundário e descrições que precisam de boa
            legibilidade sem ocupar muito espaço.
          </p>
        </section>

        {/* Botões Primário e Secundário Estilizados */}
        <section className="space-y-4">
          <h2
            className="font-display font-bold"
            style={{
              fontSize: typography.headings.h2.fontSize,
              fontWeight: typography.headings.h2.fontWeight,
              lineHeight: typography.headings.h2.lineHeight,
              color: colors.text.primary,
            }}
          >
            Botões com Estados
          </h2>
          <div className="flex flex-wrap gap-4">
            {/* Botão Primário */}
            <Button
              variant="default"
              size="lg"
              className="font-body"
              style={{
                backgroundColor: colors.primary.base,
                color: colors.primary.text,
                fontSize: typography.button.medium.fontSize,
                fontWeight: typography.button.medium.fontWeight,
                lineHeight: typography.button.medium.lineHeight,
                letterSpacing: typography.button.medium.letterSpacing,
              }}
              onMouseEnter={(e: React.MouseEvent<HTMLElement>) => {
                e.currentTarget.style.backgroundColor = colors.primary.hover;
              }}
              onMouseLeave={(e: React.MouseEvent<HTMLElement>) => {
                e.currentTarget.style.backgroundColor = colors.primary.base;
              }}
              onMouseDown={(e: React.MouseEvent<HTMLElement>) => {
                e.currentTarget.style.backgroundColor = colors.primary.active;
              }}
              onMouseUp={(e: React.MouseEvent<HTMLElement>) => {
                e.currentTarget.style.backgroundColor = colors.primary.hover;
              }}
              onFocus={(e: React.FocusEvent<HTMLElement>) => {
                e.currentTarget.style.outline = `2px solid ${colors.primary.focus}`;
                e.currentTarget.style.outlineOffset = '2px';
              }}
              onBlur={(e: React.FocusEvent<HTMLElement>) => {
                e.currentTarget.style.outline = 'none';
              }}
            >
              Botão Primário
            </Button>

            {/* Botão Secundário */}
            <Button
              variant="outline"
              size="lg"
              className="font-body"
              style={{
                borderColor: colors.secondary.border,
                color: colors.secondary.base,
                fontSize: typography.button.medium.fontSize,
                fontWeight: typography.button.medium.fontWeight,
                backgroundColor: 'transparent',
              }}
              onMouseEnter={(e: React.MouseEvent<HTMLElement>) => {
                e.currentTarget.style.backgroundColor =
                  colors.secondary.backgroundHover;
                e.currentTarget.style.borderColor =
                  colors.secondary.borderHover;
              }}
              onMouseLeave={(e: React.MouseEvent<HTMLElement>) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.borderColor = colors.secondary.border;
              }}
              onFocus={(e: React.FocusEvent<HTMLElement>) => {
                e.currentTarget.style.outline = `2px solid ${colors.secondary.focus}`;
                e.currentTarget.style.outlineOffset = '2px';
              }}
              onBlur={(e: React.FocusEvent<HTMLElement>) => {
                e.currentTarget.style.outline = 'none';
              }}
            >
              Botão Secundário
            </Button>

            {/* Botão Accent */}
            <Button
              variant="default"
              size="lg"
              className="font-body"
              style={{
                backgroundColor: colors.accent.base,
                color: colors.accent.text,
                fontSize: typography.button.medium.fontSize,
                fontWeight: typography.button.medium.fontWeight,
              }}
              onMouseEnter={(e: React.MouseEvent<HTMLElement>) => {
                e.currentTarget.style.backgroundColor = colors.accent.hover;
              }}
              onMouseLeave={(e: React.MouseEvent<HTMLElement>) => {
                e.currentTarget.style.backgroundColor = colors.accent.base;
              }}
            >
              Botão Accent
            </Button>

            {/* Botão Disabled */}
            <Button
              disabled
              variant="default"
              size="lg"
              className="font-body"
              style={{
                backgroundColor: colors.primary.disabled,
                color: colors.primary.textDisabled,
                fontSize: typography.button.medium.fontSize,
                cursor: 'not-allowed',
              }}
            >
              Botão Desabilitado
            </Button>
          </div>
        </section>

        {/* Cards com Background, Texto e Ação */}
        <section className="space-y-4">
          <h2
            className="font-display font-bold"
            style={{
              fontSize: typography.headings.h2.fontSize,
              fontWeight: typography.headings.h2.fontWeight,
              lineHeight: typography.headings.h2.lineHeight,
              color: colors.text.primary,
            }}
          >
            Cards com Tokens
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card Primário */}
            <Card
              style={{
                backgroundColor: colors.surface.primary,
                borderColor: colors.border.primary,
              }}
              className="transition-all hover:shadow-lg"
              onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
                e.currentTarget.style.borderColor = colors.primary.border;
                e.currentTarget.style.backgroundColor = colors.surface.hover;
              }}
              onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
                e.currentTarget.style.borderColor = colors.border.primary;
                e.currentTarget.style.backgroundColor = colors.surface.primary;
              }}
            >
              <CardHeader>
                <CardTitle
                  className="font-display"
                  style={{
                    fontSize: typography.headings.h4.fontSize,
                    fontWeight: typography.headings.h4.fontWeight,
                    color: colors.text.primary,
                  }}
                >
                  Card Primário
                </CardTitle>
                <CardDescription
                  className="font-body"
                  style={{
                    fontSize: typography.body.small.fontSize,
                    color: colors.text.secondary,
                  }}
                >
                  Demonstração de card usando tokens de cores e tipografia
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p
                  className="font-body mb-4"
                  style={{
                    fontSize: typography.body.medium.fontSize,
                    lineHeight: typography.body.medium.lineHeight,
                    color: colors.text.primary,
                  }}
                >
                  Este card utiliza tokens de surface, border e text para criar
                  uma interface consistente e acessível.
                </p>
                <Button
                  variant="default"
                  size="sm"
                  className="font-body"
                  style={{
                    backgroundColor: colors.primary.base,
                    color: colors.primary.text,
                  }}
                >
                  Ação
                </Button>
              </CardContent>
            </Card>

            {/* Card Secundário */}
            <Card
              style={{
                backgroundColor: colors.surface.secondary,
                borderColor: colors.border.secondary,
              }}
              className="transition-all hover:shadow-lg"
            >
              <CardHeader>
                <CardTitle
                  className="font-display"
                  style={{
                    fontSize: typography.headings.h4.fontSize,
                    fontWeight: typography.headings.h4.fontWeight,
                    color: colors.text.primary,
                  }}
                >
                  Card Secundário
                </CardTitle>
                <CardDescription
                  className="font-body"
                  style={{
                    fontSize: typography.body.small.fontSize,
                    color: colors.text.secondary,
                  }}
                >
                  Surface secundária com tokens de tipografia
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p
                  className="font-body mb-4"
                  style={{
                    fontSize: typography.body.medium.fontSize,
                    lineHeight: typography.body.medium.lineHeight,
                    color: colors.text.primary,
                  }}
                >
                  Hierarquia visual clara através de diferentes níveis de
                  surface e text.
                </p>
                <Button
                  size="sm"
                  variant="outline"
                  className="font-body"
                  style={{
                    borderColor: colors.secondary.border,
                    color: colors.secondary.base,
                  }}
                >
                  Ação
                </Button>
              </CardContent>
            </Card>

            {/* Card com Status */}
            <Card
              style={{
                backgroundColor: colors.status.success.background,
                borderColor: colors.status.success.border,
              }}
              className="transition-all hover:shadow-lg"
            >
              <CardHeader>
                <CardTitle
                  className="font-display"
                  style={{
                    fontSize: typography.headings.h4.fontSize,
                    fontWeight: typography.headings.h4.fontWeight,
                    color: colors.status.success.textOnBackground,
                  }}
                >
                  Card de Status
                </CardTitle>
                <CardDescription
                  className="font-body"
                  style={{
                    fontSize: typography.body.small.fontSize,
                    color: colors.status.success.textOnBackground,
                    opacity: 0.8,
                  }}
                >
                  Tokens de status com cores semânticas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p
                  className="font-body mb-4"
                  style={{
                    fontSize: typography.body.medium.fontSize,
                    color: colors.status.success.textOnBackground,
                  }}
                >
                  Status colors garantem feedback visual claro e acessível.
                </p>
                <Button
                  variant="default"
                  size="sm"
                  className="font-body"
                  style={{
                    backgroundColor: colors.status.success.base,
                    color: colors.status.success.text,
                  }}
                >
                  Sucesso
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Informações de Acessibilidade */}
        {contrastInfo && (
          <section className="space-y-4">
            <h2
              className="font-display font-bold"
              style={{
                fontSize: typography.headings.h2.fontSize,
                fontWeight: typography.headings.h2.fontWeight,
                lineHeight: typography.headings.h2.lineHeight,
                color: colors.text.primary,
              }}
            >
              Validação de Contraste WCAG
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card
                style={{
                  backgroundColor: colors.surface.primary,
                  borderColor: contrastInfo.primary.valid
                    ? colors.status.success.border
                    : colors.status.error.border,
                }}
              >
                <CardHeader>
                  <CardTitle
                    className="font-body"
                    style={{
                      fontSize: typography.label.medium.fontSize,
                      fontWeight: typography.label.medium.fontWeight,
                      color: colors.text.primary,
                    }}
                  >
                    Primary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p
                    className="font-body text-sm"
                    style={{ color: colors.text.secondary }}
                  >
                    {contrastInfo.primary.message}
                  </p>
                  <p
                    className="font-mono text-xs mt-2"
                    style={{ color: colors.text.tertiary }}
                  >
                    Contraste: {contrastInfo.primary.contrast.toFixed(2)}:1
                  </p>
                </CardContent>
              </Card>

              <Card
                style={{
                  backgroundColor: colors.surface.primary,
                  borderColor: contrastInfo.secondary.valid
                    ? colors.status.success.border
                    : colors.status.error.border,
                }}
              >
                <CardHeader>
                  <CardTitle
                    className="font-body"
                    style={{
                      fontSize: typography.label.medium.fontSize,
                      fontWeight: typography.label.medium.fontWeight,
                      color: colors.text.primary,
                    }}
                  >
                    Secondary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p
                    className="font-body text-sm"
                    style={{ color: colors.text.secondary }}
                  >
                    {contrastInfo.secondary.message}
                  </p>
                  <p
                    className="font-mono text-xs mt-2"
                    style={{ color: colors.text.tertiary }}
                  >
                    Contraste: {contrastInfo.secondary.contrast.toFixed(2)}:1
                  </p>
                </CardContent>
              </Card>

              <Card
                style={{
                  backgroundColor: colors.surface.primary,
                  borderColor: contrastInfo.accent.valid
                    ? colors.status.success.border
                    : colors.status.error.border,
                }}
              >
                <CardHeader>
                  <CardTitle
                    className="font-body"
                    style={{
                      fontSize: typography.label.medium.fontSize,
                      fontWeight: typography.label.medium.fontWeight,
                      color: colors.text.primary,
                    }}
                  >
                    Accent
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p
                    className="font-body text-sm"
                    style={{ color: colors.text.secondary }}
                  >
                    {contrastInfo.accent.message}
                  </p>
                  <p
                    className="font-mono text-xs mt-2"
                    style={{ color: colors.text.tertiary }}
                  >
                    Contraste: {contrastInfo.accent.contrast.toFixed(2)}:1
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>
        )}

        {/* Hierarquia de Títulos */}
        <section className="space-y-4">
          <h2
            className="font-display font-bold"
            style={{
              fontSize: typography.headings.h2.fontSize,
              fontWeight: typography.headings.h2.fontWeight,
              lineHeight: typography.headings.h2.lineHeight,
              color: colors.text.primary,
            }}
          >
            Hierarquia de Títulos (H1-H6)
          </h2>
          <div className="space-y-6">
            <h1
              className="font-display"
              style={{
                fontSize: typography.headings.h1.fontSize,
                fontWeight: typography.headings.h1.fontWeight,
                lineHeight: typography.headings.h1.lineHeight,
                letterSpacing: typography.headings.h1.letterSpacing,
                color: colors.text.primary,
              }}
            >
              Heading 1 - Título Principal
            </h1>
            <h2
              className="font-display"
              style={{
                fontSize: typography.headings.h2.fontSize,
                fontWeight: typography.headings.h2.fontWeight,
                lineHeight: typography.headings.h2.lineHeight,
                letterSpacing: typography.headings.h2.letterSpacing,
                color: colors.text.primary,
              }}
            >
              Heading 2 - Seção Principal
            </h2>
            <h3
              className="font-display"
              style={{
                fontSize: typography.headings.h3.fontSize,
                fontWeight: typography.headings.h3.fontWeight,
                lineHeight: typography.headings.h3.lineHeight,
                letterSpacing: typography.headings.h3.letterSpacing,
                color: colors.text.primary,
              }}
            >
              Heading 3 - Subseção
            </h3>
            <h4
              className="font-body"
              style={{
                fontSize: typography.headings.h4.fontSize,
                fontWeight: typography.headings.h4.fontWeight,
                lineHeight: typography.headings.h4.lineHeight,
                color: colors.text.primary,
              }}
            >
              Heading 4 - Título de Card
            </h4>
            <h5
              className="font-body"
              style={{
                fontSize: typography.headings.h5.fontSize,
                fontWeight: typography.headings.h5.fontWeight,
                lineHeight: typography.headings.h5.lineHeight,
                color: colors.text.primary,
              }}
            >
              Heading 5 - Subtítulo Menor
            </h5>
            <h6
              className="font-body"
              style={{
                fontSize: typography.headings.h6.fontSize,
                fontWeight: typography.headings.h6.fontWeight,
                lineHeight: typography.headings.h6.lineHeight,
                letterSpacing: typography.headings.h6.letterSpacing,
                color: colors.text.primary,
              }}
            >
              Heading 6 - Título Mínimo
            </h6>
          </div>
        </section>

        {/* Subtítulos e Legendas */}
        <section className="space-y-4">
          <h2
            className="font-display font-bold"
            style={{
              fontSize: typography.headings.h2.fontSize,
              fontWeight: typography.headings.h2.fontWeight,
              lineHeight: typography.headings.h2.lineHeight,
              color: colors.text.primary,
            }}
          >
            Subtítulos e Legendas
          </h2>
          <div className="space-y-4">
            <p
              className="font-body"
              style={{
                fontSize: typography.subtitle.large.fontSize,
                fontWeight: typography.subtitle.large.fontWeight,
                lineHeight: typography.subtitle.large.lineHeight,
                color: colors.text.secondary,
              }}
            >
              Subtítulo Grande - Ideal para descrições de seções
            </p>
            <p
              className="font-body"
              style={{
                fontSize: typography.subtitle.medium.fontSize,
                fontWeight: typography.subtitle.medium.fontWeight,
                lineHeight: typography.subtitle.medium.lineHeight,
                color: colors.text.secondary,
              }}
            >
              Subtítulo Médio - Para informações secundárias
            </p>
            <p
              className="font-body"
              style={{
                fontSize: typography.subtitle.small.fontSize,
                fontWeight: typography.subtitle.small.fontWeight,
                lineHeight: typography.subtitle.small.lineHeight,
                color: colors.text.tertiary,
              }}
            >
              Subtítulo Pequeno - Para metadados e informações auxiliares
            </p>
            <p
              className="font-body"
              style={{
                fontSize: typography.caption.large.fontSize,
                fontWeight: typography.caption.large.fontWeight,
                lineHeight: typography.caption.large.lineHeight,
                letterSpacing: typography.caption.large.letterSpacing,
                color: colors.text.tertiary,
              }}
            >
              Legenda Grande - Para notas e referências
            </p>
            <p
              className="font-body"
              style={{
                fontSize: typography.caption.medium.fontSize,
                fontWeight: typography.caption.medium.fontWeight,
                lineHeight: typography.caption.medium.lineHeight,
                letterSpacing: typography.caption.medium.letterSpacing,
                color: colors.text.tertiary,
              }}
            >
              Legenda Média - Para timestamps e labels pequenos
            </p>
            <p
              className="font-body"
              style={{
                fontSize: typography.caption.small.fontSize,
                fontWeight: typography.caption.small.fontWeight,
                lineHeight: typography.caption.small.lineHeight,
                letterSpacing: typography.caption.small.letterSpacing,
                color: colors.text.tertiary,
              }}
            >
              Legenda Pequena - Para informações mínimas
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}


