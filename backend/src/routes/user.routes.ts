import { Router, Request, Response } from 'express';

const router = Router();

/**
 * GET /api/v1/users/profile
 * Placeholder endpoint to fetch authenticated agent profile details.
 */
router.get('/profile', (_req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'Coming Soon'
  });
});

/**
 * GET /api/v1/users/leaderboard
 * Placeholder endpoint to fetch global scoreboard metrics.
 */
router.get('/leaderboard', (_req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'Coming Soon'
  });
});

export default router;
