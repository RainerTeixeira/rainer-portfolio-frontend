/**
 * Testes para DashboardService
 */

import { api } from '@/lib/api/client';
import { dashboardService } from '@/lib/api/services/dashboard.service';

// Mock do api client
jest.mock('@/lib/api/client', () => ({
  api: {
    get: jest.fn(),
  },
}));

describe('DashboardService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getStats', () => {
    it('deve lançar erro quando backend falhar', async () => {
      (api.get as jest.Mock).mockRejectedValue(new Error('Network error'));

      await expect(dashboardService.getStats()).rejects.toThrow(
        'Network error'
      );
    });

    it('deve retornar stats do backend quando disponível', async () => {
      const mockStats = {
        totalPosts: 50,
        totalViews: 20000,
        totalLikes: 1000,
        totalComments: 500,
        postsChange: 10.5,
        viewsChange: 20.3,
        likesChange: 15.2,
        commentsChange: 12.1,
      };

      (api.get as jest.Mock).mockResolvedValue({
        success: true,
        data: mockStats,
      });

      const stats = await dashboardService.getStats();

      expect(stats).toEqual(mockStats);
      expect(api.get).toHaveBeenCalledWith('/api/dashboard/stats');
    });
  });

  describe('getAnalytics', () => {
    it('deve lançar erro quando backend falhar', async () => {
      (api.get as jest.Mock).mockRejectedValue(new Error('Network error'));

      await expect(dashboardService.getAnalytics('30d')).rejects.toThrow(
        'Network error'
      );
    });

    it('deve retornar analytics do backend quando disponível', async () => {
      const mockAnalytics = {
        views: [{ date: '2024-01-01', views: 100, uniqueViews: 70 }],
        engagement: [{ date: '2024-01-01', likes: 10, comments: 5 }],
      };

      (api.get as jest.Mock).mockResolvedValue({
        success: true,
        data: mockAnalytics,
      });

      const analytics = await dashboardService.getAnalytics('30d');

      expect(analytics).toEqual(mockAnalytics);
      expect(api.get).toHaveBeenCalledWith('/api/dashboard/analytics', {
        params: { period: '30d' },
      });
    });

    it('deve lançar erro para período de 7 dias quando backend falhar', async () => {
      (api.get as jest.Mock).mockRejectedValue(new Error('Network error'));

      await expect(dashboardService.getAnalytics('7d')).rejects.toThrow(
        'Network error'
      );
    });

    it('deve lançar erro para período de 90 dias quando backend falhar', async () => {
      (api.get as jest.Mock).mockRejectedValue(new Error('Network error'));

      await expect(dashboardService.getAnalytics('90d')).rejects.toThrow(
        'Network error'
      );
    });
  });
});
