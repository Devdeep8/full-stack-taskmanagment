// routes/authRoutes.js

import express from "express";
import gamesController from "../../controllers/games-controller/index.js";
import authMiddleware from "../../middlewares/authMiddleware.js";
import authController from "../../controllers/auth-controller/index.js";

const gamesRoutes = express.Router();

gamesRoutes.get("/", gamesController.getGames);
gamesRoutes.get(
  "/:categorySlug/:gameSlug",
  gamesController.getSingleGameByCategory,
);

gamesRoutes.post(
  "/export",
  authMiddleware.authenticate,
  gamesController.exportGames,
); // creates job
gamesRoutes.get(
  "/export/status/:jobId",
  authMiddleware.authenticate,
  gamesController.getExportStatus,
); // reads status

export default gamesRoutes;
