/**
 * Exportações de Hooks do Dashboard
 * 
 * Barrel file para centralizar exportações dos hooks
 * 
 * @fileoverview Dashboard hooks exports
 * @author Rainer Teixeira
 */

export { useDashboardStats } from './use-dashboard-stats'
export { useAnalyticsData } from './use-analytics-data'
export { usePasswordStrength } from './use-password-strength'
export type { PasswordStrength } from './use-password-strength'
export { useUpload, useBlogCoverUpload, useBlogContentUpload, useImageCompression } from './use-upload'
export type { UploadState } from './use-upload'

