/**
 * Utilitários para Formatação de Estatísticas
 *
 * Funções auxiliares para formatar dados do dashboard
 *
 * @fileoverview Stats formatting utilities
 * @author Rainer Teixeira
 */

/**
 * Formata número grande com abreviação (1.5k, 2.3M, etc)
 */
export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k';
  }
  return num.toString();
}

/**
 * Calcula percentual de mudança entre dois valores
 */
export function calculateChange(current: number, previous: number): number {
  if (previous === 0) return 100;
  return Math.round(((current - previous) / previous) * 100);
}

/**
 * Formata percentual com sinal
 */
export function formatPercentage(value: number): string {
  const sign = value > 0 ? '+' : '';
  return `${sign}${value}%`;
}

/**
 * Gera dados de exemplo para gráficos
 */
export function generateMockChartData(days: number) {
  const data = [];
  const now = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);

    data.push({
      date: date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
      }),
      views: Math.floor(Math.random() * 1000) + 500,
      uniqueViews: Math.floor(Math.random() * 700) + 300,
      likes: Math.floor(Math.random() * 100) + 50,
      comments: Math.floor(Math.random() * 50) + 10,
    });
  }

  return data;
}

/**
 * Agrupa dados por período
 */
export function groupDataByPeriod(
  data: Array<Record<string, unknown>>
  // period: "day" | "week" | "month" // Pode ser usado futuramente para agrupamento
): Array<Record<string, unknown>> {
  // Implementação simplificada - pode ser expandida
  return data;
}


