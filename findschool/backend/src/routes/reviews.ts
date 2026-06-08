import { Router } from 'express';

export const reviewRoutes = Router();

// Placeholder routes - to be implemented
reviewRoutes.get('/', (req, res) => {
  res.json({ success: true, message: 'Reviews endpoint' });
});

reviewRoutes.post('/', (req, res) => {
  res.json({ success: true, message: 'Create review' });
});
