import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'cyberhunt_super_secret_key_123!';

// Load users from users.json
const usersFilePath = path.join(__dirname, '../../users.json');

router.post('/login', (req: Request, res: Response) => {
  try {
    const { agentId, accessKey } = req.body;
    
    if (!agentId || !accessKey) {
      res.status(400).json({ success: false, message: 'Agent ID and Access Key are required' });
    } else {
      const usersData = fs.readFileSync(usersFilePath, 'utf-8');
      const users = JSON.parse(usersData);

      console.log('Login attempt:', { agentId, accessKey });
      const user = users.find((u: any) => 
        u.id.toLowerCase() === agentId.trim().toLowerCase() && u.password === accessKey
      );
      console.log('Found user:', user);

      if (!user) {
        res.status(401).json({ success: false, message: 'Invalid agent ID or access key' });
      } else {
        // Create token (user only has id, so we just sign that)
        const token = jwt.sign(
          { id: user.id },
          JWT_SECRET,
          { expiresIn: '8h' }
        );

        // Remove password before sending user data
        const { password: _, ...safeUser } = user;

        res.json({
          success: true,
          token,
          user: safeUser,
          message: 'AUTHENTICATION SUCCESSFUL'
        });
      }
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Internal server error during authentication' });
  }
});

router.post('/logout', (_req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'LOGOUT SUCCESSFUL'
  });
});

export default router;
