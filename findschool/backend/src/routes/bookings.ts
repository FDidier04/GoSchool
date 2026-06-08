import { Router } from 'express';

export const bookingRoutes = Router();

// Placeholder routes - to be implemented
bookingRoutes.get('/', (req, res) => {
  res.json({ success: true, message: 'Bookings endpoint' });
});

bookingRoutes.post('/', (req, res) => {
  res.json({ success: true, message: 'Create booking' });
});
