/**
 * Design Tokens Demo Component
 *
 * Componente de demonstração do uso dos design tokens do @rainersoft/design-tokens
 * Mostra exemplos práticos de uso de cores, espaçamentos, tipografia e raios.
 *
 * @module components/ui/tokens-demo
 * @fileoverview Componente de demonstração dos design tokens
 * @author Rainer Teixeira
 * @version 1.0.0
 */

'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@rainersoft/ui';
import {
  getDarkColors,
  getLightColors,
  getRadius,
  getSpacing,
  getTypography,
} from '@/lib/utils/tokens';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function TokensDemo() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = theme === 'dark';
  const colors = isDark ? getDarkColors() : getLightColors();
  const spacing = getSpacing();
  const typography = getTypography();
  const radius = getRadius();

  return (
    <div className="space-y-6 p-6">
      {/* Cores */}
      <Card>
        <CardHeader>
          <CardTitle>Design Tokens - Cores</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-sm font-semibold mb-2">Brand Colors</h3>
            <div className="flex gap-2 flex-wrap">
              <div
                className="w-20 h-20 rounded-lg border"
                style={{ backgroundColor: colors.brand.primary }}
                title={colors.brand.primary}
              />
              <div
                className="w-20 h-20 rounded-lg border"
                style={{ backgroundColor: colors.brand.secondary }}
                title={colors.brand.secondary}
              />
              <div
                className="w-20 h-20 rounded-lg border"
                style={{ backgroundColor: colors.brand.tertiary }}
                title={colors.brand.tertiary}
              />
            </div>
          </div>

          {isDark && (
            <div>
              <h3 className="text-sm font-semibold mb-2">
                Accent Colors (Neon)
              </h3>
              <div className="flex gap-2 flex-wrap">
                <div
                  className="w-20 h-20 rounded-lg border"
                  style={{ backgroundColor: colors.accent.cyan }}
                  title={colors.accent.cyan}
                />
                <div
                  className="w-20 h-20 rounded-lg border"
                  style={{ backgroundColor: colors.accent.purple }}
                  title={colors.accent.purple}
                />
                <div
                  className="w-20 h-20 rounded-lg border"
                  style={{ backgroundColor: colors.accent.pink }}
                  title={colors.accent.pink}
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Espaçamento */}
      <Card>
        <CardHeader>
          <CardTitle>Design Tokens - Espaçamento</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(spacing).map(([key, value]) => (
            <div key={key} className="flex items-center gap-4">
              <span className="text-sm font-mono w-20">{key}</span>
              <div
                className="bg-primary h-4 rounded"
                style={{ width: value }}
              />
              <span className="text-xs text-muted-foreground font-mono">
                {value}
              </span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Tipografia */}
      <Card>
        <CardHeader>
          <CardTitle>Design Tokens - Tipografia</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {typography.headings && (
            <div>
              <h3 className="text-sm font-semibold mb-2">Headings</h3>
              <div className="space-y-2">
                <h1 style={{ fontSize: typography.headings.h1.fontSize }}>
                  Heading 1
                </h1>
                <h2 style={{ fontSize: typography.headings.h2.fontSize }}>
                  Heading 2
                </h2>
                <h3 style={{ fontSize: typography.headings.h3.fontSize }}>
                  Heading 3
                </h3>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Raio de Borda */}
      <Card>
        <CardHeader>
          <CardTitle>Design Tokens - Raio de Borda</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4 flex-wrap">
            {Object.entries(radius).map(([key, value]) => (
              <div key={key} className="text-center">
                <div
                  className="w-20 h-20 bg-primary mb-2"
                  style={{ borderRadius: value }}
                />
                <span className="text-xs font-mono">{key}</span>
                <br />
                <span className="text-xs text-muted-foreground font-mono">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
