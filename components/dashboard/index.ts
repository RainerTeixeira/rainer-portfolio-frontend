/**
 * Exportações de Componentes do Dashboard
 *
 * Barrel file para centralizar exportações do dashboard
 *
 * @fileoverview Dashboard components exports
 * @author Rainer Teixeira
 */

// Editor e Upload
export { Editor } from './Editor';
export { ImageUpload } from './ImageUpload';

// Estatísticas
export { StatsCards } from './stats-cards';

// Gráficos
export { ViewsChart, EngagementChart } from './charts';

// Hooks
export { useDashboardStats, useAnalyticsData } from './hooks';

// Utils
export {
  formatNumber,
  calculateChange,
  formatPercentage,
  generateMockChartData,
  groupDataByPeriod,
} from './utils';

// Login/Auth Components
export { RegisterForm, ForgotPasswordForm, ResetPasswordForm } from './login';

// Dashboard Page Components (para page.tsx)
export { ProfileHeader } from './profile-header';
export { QuickStats } from './quick-stats';
export { QuickActions } from './quick-actions';
export { RecentPostsList } from './recent-posts-list';
export { AnalyticsOverview } from './analytics-overview';
export { HelpCenter } from './help-center';
