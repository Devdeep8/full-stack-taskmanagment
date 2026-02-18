// routes/authRoutes.js

import express from 'express';
import gamesController from '../../controllers/games-controller/index.js';

const gamesRoutes = express.Router();


gamesRoutes.get("/" , gamesController.getGames)
gamesRoutes.get("/:categorySlug/:gameSlug" , gamesController.getSingleGameByCategory)

export default gamesRoutes;