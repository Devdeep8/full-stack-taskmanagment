// routes/index.js
import express from 'express';
import authRoutes from './auth-routes/routes.js';

const router = express.Router();

router.use('/auth', authRoutes);


export default router;