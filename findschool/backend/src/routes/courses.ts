import { Router, Request, Response } from 'express';
import { db } from '../db/connection';
import { authenticate } from '../middleware/auth';

export const courseRoutes = Router();

// Get all courses
courseRoutes.get('/', async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 20;
    const offset = (page - 1) * pageSize;
    const schoolId = req.query.schoolId as string;

    let query = 'SELECT * FROM courses WHERE status = $1';
    let params: any[] = ['active'];

    if (schoolId) {
      query += ' AND school_id = $2';
      params.push(schoolId);
    }

    query += ` LIMIT ${pageSize} OFFSET ${offset}`;

    const courses = await db.manyOrNone(query, params);
    const countResult = await db.one('SELECT COUNT(*) as count FROM courses WHERE status = $1', ['active']);

    res.json({
      success: true,
      data: {
        data: courses,
        total: parseInt(countResult.count),
        page,
        pageSize,
        totalPages: Math.ceil(parseInt(countResult.count) / pageSize),
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Get course by ID
courseRoutes.get('/:id', async (req: Request, res: Response) => {
  try {
    const course = await db.oneOrNone(
      'SELECT * FROM courses WHERE id = $1',
      [req.params.id]
    );

    if (!course) {
      return res.status(404).json({
        success: false,
        error: 'Course not found',
      });
    }

    res.json({
      success: true,
      data: course,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Create course (school admin only)
courseRoutes.post('/', authenticate as any, async (req: any, res: Response) => {
  try {
    const {
      schoolId,
      title,
      description,
      series,
      level,
      duration,
      price,
      startDate,
      maxStudents,
      instructor,
    } = req.body;

    // Validate school admin
    const school = await db.oneOrNone(
      'SELECT id FROM schools WHERE id = $1',
      [schoolId]
    );

    if (!school) {
      return res.status(404).json({
        success: false,
        error: 'School not found',
      });
    }

    const course = await db.one(
      `INSERT INTO courses (school_id, title, description, series, level, duration, price, start_date, max_students, instructor)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
       RETURNING *`,
      [schoolId, title, description, series, level, duration, price, startDate, maxStudents, instructor]
    );

    res.status(201).json({
      success: true,
      data: course,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});
