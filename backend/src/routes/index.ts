import { Router, Request, Response } from 'express';
import authRoutes from './auth.routes';
import userRoutes from './user.routes';
import teamRoutes from './team.routes';
import announcementRoutes from './announcement.routes';

const router = Router();

/**
 * GET /api/v1/health
 * Returns active link status parameters.
 */
router.get('/health', (_req: Request, res: Response): void => {
  res.json({
    status: 'OK',
    project: 'TechAlfa Cyber Hunt API',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

// Mount child routing gateways
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/teams', teamRoutes);
router.use('/announcements', announcementRoutes);

export default router;
