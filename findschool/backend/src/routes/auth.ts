import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { db } from '../db/connection';

export const authRoutes = Router();

interface LoginRequest {
  email: string;
  password: string;
}

interface SignupRequest {
  email: string;
  password: string;
  fullName: string;
  role: 'student' | 'teacher' | 'professional' | 'school_admin';
}

// Signup
authRoutes.post('/signup', async (req: Request<{}, {}, SignupRequest>, res: Response) => {
  try {
    const { email, password, fullName, role } = req.body;

    // Validate input
    if (!email || !password || !fullName || !role) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields',
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await db.one(
      `INSERT INTO users (email, password, full_name, role) 
       VALUES ($1, $2, $3, $4) 
       RETURNING id, email, role`,
      [email, hashedPassword, fullName, role]
    );

    // Create JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: process.env.JWT_EXPIRY || '7d' }
    );

    res.status(201).json({
      success: true,
      data: { token, user },
    });
  } catch (error: any) {
    console.error('Signup error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Signup failed',
    });
  }
});

// Login
authRoutes.post('/login', async (req: Request<{}, {}, LoginRequest>, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Email and password are required',
      });
    }

    // Find user
    const user = await db.oneOrNone(
      'SELECT id, email, password, role FROM users WHERE email = $1',
      [email]
    );

    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Invalid email or password',
      });
    }

    // Verify password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        error: 'Invalid email or password',
      });
    }

    // Create JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: process.env.JWT_EXPIRY || '7d' }
    );

    res.json({
      success: true,
      data: { token },
    });
  } catch (error: any) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Login failed',
    });
  }
});
