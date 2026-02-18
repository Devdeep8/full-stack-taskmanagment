// routes/authRoutes.js

import express from 'express';
import categoryController from '../../controllers/category-controller/index.js';

const categoriesRoutes = express.Router();


categoriesRoutes.get("/" , categoryController.getCategories)
categoriesRoutes.get("/:identifier" , categoryController.getSingleCategory)

export default categoriesRoutes; 