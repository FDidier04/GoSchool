import { Router, Request, Response } from 'express';
import { db } from '../db/connection';
import { authenticate, authorize } from '../middleware/auth';

export const userRoutes = Router();

// Get current user profile
userRoutes.get('/me', authenticate as any, async (req: any, res: Response) => {
  try {
    const user = await db.oneOrNone(
      'SELECT id, email, full_name, role, avatar_url, phone_number, created_at FROM users WHERE id = $1',
      [req.user.id]
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found',
      });
    }

    res.json({
      success: true,
      data: user,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Update user profile
userRoutes.put('/me', authenticate as any, async (req: any, res: Response) => {
  try {
    const { fullName, phoneNumber, avatarUrl } = req.body;

    const user = await db.one(
      `UPDATE users 
       SET full_name = $2, phone_number = $3, avatar_url = $4, updated_at = CURRENT_TIMESTAMP
       WHERE id = $1
       RETURNING id, email, full_name, role, avatar_url, phone_number`,
      [req.user.id, fullName, phoneNumber, avatarUrl]
    );

    res.json({
      success: true,
      data: user,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Get user bookings
userRoutes.get('/bookings', authenticate as any, async (req: any, res: Response) => {
  try {
    const bookings = await db.manyOrNone(
      `SELECT b.*, c.title as course_title, s.name as school_name
       FROM bookings b
       JOIN courses c ON b.course_id = c.id
       JOIN schools s ON c.school_id = s.id
       WHERE b.student_id = $1
       ORDER BY b.booking_date DESC`,
      [req.user.id]
    );

    res.json({
      success: true,
      data: bookings,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});
