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
    it('deve retornar stats mockadas quando backend falhar', async () => {
      (api.get as jest.Mock).mockRejectedValue(new Error('Network error'));

      const stats = await dashboardService.getStats();

      expect(stats).toBeDefined();
      expect(stats).toHaveProperty('totalPosts');
      expect(stats).toHaveProperty('totalViews');
      expect(stats).toHaveProperty('totalLikes');
      expect(stats).toHaveProperty('totalComments');
      expect(stats).toHaveProperty('postsChange');
      expect(stats).toHaveProperty('viewsChange');
      expect(stats).toHaveProperty('likesChange');
      expect(stats).toHaveProperty('commentsChange');
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
      expect(api.get).toHaveBeenCalledWith('/dashboard/stats');
    });
  });

  describe('getAnalytics', () => {
    it('deve retornar analytics mockadas quando backend falhar', async () => {
      (api.get as jest.Mock).mockRejectedValue(new Error('Network error'));

      const analytics = await dashboardService.getAnalytics('30d');

      expect(analytics).toBeDefined();
      expect(analytics).toHaveProperty('views');
      expect(analytics).toHaveProperty('engagement');
      expect(Array.isArray(analytics.views)).toBe(true);
      expect(Array.isArray(analytics.engagement)).toBe(true);
      expect(analytics.views.length).toBe(30);
      expect(analytics.engagement.length).toBe(30);
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
      expect(api.get).toHaveBeenCalledWith('/dashboard/analytics', {
        params: { period: '30d' },
      });
    });

    it('deve gerar dados mockados para período de 7 dias', async () => {
      (api.get as jest.Mock).mockRejectedValue(new Error('Network error'));

      const analytics = await dashboardService.getAnalytics('7d');

      expect(analytics.views.length).toBe(7);
      expect(analytics.engagement.length).toBe(7);
    });

    it('deve gerar dados mockados para período de 90 dias', async () => {
      (api.get as jest.Mock).mockRejectedValue(new Error('Network error'));

      const analytics = await dashboardService.getAnalytics('90d');

      expect(analytics.views.length).toBe(90);
      expect(analytics.engagement.length).toBe(90);
    });
  });
});
