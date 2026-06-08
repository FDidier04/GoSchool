import { Router, Request, Response } from 'express';
import { db } from '../db/connection';

export const schoolRoutes = Router();

interface GeometryPoint {
  x: number;
  y: number;
}

// Get all schools with pagination
schoolRoutes.get('/', async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 20;
    const offset = (page - 1) * pageSize;

    const schools = await db.manyOrNone(
      `SELECT s.*, 
              ARRAY_AGG(ss.series) as series
       FROM schools s
       LEFT JOIN school_series ss ON s.id = ss.school_id
       GROUP BY s.id
       LIMIT $1 OFFSET $2`,
      [pageSize, offset]
    );

    const countResult = await db.one('SELECT COUNT(*) as count FROM schools');
    const total = parseInt(countResult.count);

    res.json({
      success: true,
      data: {
        data: schools,
        total,
        page,
        pageSize,
        totalPages: Math.ceil(total / pageSize),
      },
    });
  } catch (error: any) {
    console.error('Error fetching schools:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to fetch schools',
    });
  }
});

// Get schools by proximity
schoolRoutes.get('/nearby', async (req: Request, res: Response) => {
  try {
    const { latitude, longitude, radius } = req.query;

    if (!latitude || !longitude || !radius) {
      return res.status(400).json({
        success: false,
        error: 'Missing latitude, longitude, or radius',
      });
    }

    const schools = await db.manyOrNone(
      `SELECT s.*,
              ARRAY_AGG(ss.series) as series,
              ST_Distance(s.location, ST_GeomFromText('POINT($1 $2)', 4326)) / 1000 as distance_km
       FROM schools s
       LEFT JOIN school_series ss ON s.id = ss.school_id
       WHERE ST_DWithin(s.location, ST_GeomFromText('POINT($1 $2)', 4326), $3 * 1000)
       GROUP BY s.id
       ORDER BY distance_km ASC`,
      [longitude, latitude, radius]
    );

    res.json({
      success: true,
      data: schools,
    });
  } catch (error: any) {
    console.error('Error fetching nearby schools:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to fetch nearby schools',
    });
  }
});

// Get school by ID
schoolRoutes.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const school = await db.oneOrNone(
      `SELECT s.*,
              ARRAY_AGG(ss.series) as series
       FROM schools s
       LEFT JOIN school_series ss ON s.id = ss.school_id
       WHERE s.id = $1
       GROUP BY s.id`,
      [id]
    );

    if (!school) {
      return res.status(404).json({
        success: false,
        error: 'School not found',
      });
    }

    res.json({
      success: true,
      data: school,
    });
  } catch (error: any) {
    console.error('Error fetching school:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to fetch school',
    });
  }
});
