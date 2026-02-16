// routes/index.js
import express from 'express';
import authRoutes from './auth-routes/routes.js';
import gamesRoutes from './game-routes/routes.js';
import categoriesRoutes from './category-routes/routes.js';
const router = express.Router();

router.use('/auth', authRoutes);
router.use('/games', gamesRoutes)
router.use('/categories', categoriesRoutes)


export default router;