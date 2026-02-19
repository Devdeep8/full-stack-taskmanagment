// routes/authRoutes.js

import express from 'express';
import userController from '../../controllers/user-controller/index.js';
import authMiddleware from '../../middlewares/authMiddleware.js';

const userRoutes = express.Router();

userRoutes.use(authMiddleware.authenticate)
userRoutes.patch("/:identifier" , userController.updateUser)

export default userRoutes; 