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
export { SubcategorySelect } from './subcategory-select';
export { ImageUpload } from './Image-Upload';

// Estatísticas
export { StatsCards } from '@rainersoft/ui';

// Gráficos
export { ViewsChart, EngagementChart } from './charts';

// Hooks
export { useDashboardStats } from './hooks';

// Utils
export {
  formatNumber,
  calculateChange,
  formatPercentage,
  generateMockChartData,
  groupDataByPeriod,
} from '@rainersoft/utils';

// Login/Auth Components
export { RegisterForm, ForgotPasswordForm, ResetPasswordForm } from './login';

// Dashboard Page Components (para page.tsx)
export { ProfileHeader } from './profile-header';
export { QuickStats } from '@rainersoft/ui';
export { QuickActions } from '@rainersoft/ui';
export { RecentPostsList } from '@rainersoft/ui';
export { AnalyticsOverview } from '@rainersoft/ui';
export { HelpCenter } from '@rainersoft/ui';


