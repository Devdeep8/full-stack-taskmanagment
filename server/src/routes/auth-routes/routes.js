// routes/authRoutes.js

import express from 'express';
import authController from '../../controllers/auth-controller/index.js';
import authMiddleware from '../../middlewares/authMiddleware.js';

const authRoutes = express.Router();

// Public routes
authRoutes.post('/register', authController.registerUser);
authRoutes.post('/login', authController.loginUser);
// authRoutes.post('/refresh', authController.refresh);
authRoutes.get("/me", authMiddleware.authenticate, authController.me);

authRoutes.get("/check-username" , authController.checkUsername)

// Protected routes
// authRoutes.post('/logout', authMiddleware.authenticate, authController.logout );

export default authRoutes;