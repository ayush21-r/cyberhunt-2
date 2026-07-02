import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import users from '../../users.json';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'cyberhunt_super_secret_key_123!';

router.post('/login', (req: Request, res: Response) => {
  try {
    const { agentId, accessKey } = req.body;
    
    if (!agentId || !accessKey) {
      return res.status(400).json({ success: false, message: 'Agent ID and Access Key are required' });
    }
    
    console.log('Login attempt:', { agentId, accessKey });
    const user = users.find((u: any) => 
      u.id.toLowerCase() === agentId.trim().toLowerCase() && u.password === accessKey
    );
    console.log('Found user:', user);

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid agent ID or access key' });
    }

    // Create token (user only has id, so we just sign that)
    const token = jwt.sign(
      { id: user.id },
      JWT_SECRET,
      { expiresIn: '8h' }
    );

    // Remove password before sending user data
    const { password: _, ...safeUser } = user;

    return res.json({
      success: true,
      token,
      user: safeUser,
      message: 'AUTHENTICATION SUCCESSFUL'
    });
    
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error during authentication' });
  }
});

router.post('/logout', (_req: Request, res: Response) => {
  return res.json({
    success: true,
    message: 'LOGOUT SUCCESSFUL'
  });
});

export default router;
