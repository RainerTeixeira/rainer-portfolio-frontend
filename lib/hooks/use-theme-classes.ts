/**
 * Hook para classes condicionais baseadas no tema
 * Dark Mode: Cyberpunk futurista
 * Light Mode: Profissional clean
 */

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function useThemeClasses() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === 'dark';

  return {
    isDark,
    mounted,
    // Títulos de seção
    sectionTitle: isDark ? 'section-title section-title-dark' : 'section-title section-title-light',
    // Cards
    card: isDark ? 'card-professional card-professional-dark' : 'card-professional card-professional-light',
    // Badges
    badge: isDark ? 'badge-cyberpunk' : 'badge-professional',
    // Botões
    btnPrimary: isDark ? 'btn-cyberpunk' : 'btn btn-primary',
    // Texto destaque
    textAccent: isDark ? 'text-cyberpunk' : 'text-blue-600',
  };
}
