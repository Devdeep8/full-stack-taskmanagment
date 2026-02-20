import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { connectDB } from "./config/db.js";
import { associateModels } from "./models/index.js";

import errorHandler from "./middlewares/error.middleware.js";
import reqMiddleware from "./middlewares/req.middleware.js";
import responseMiddleware from "./middlewares/response.middleware.js";
import router from "./routes/index.js";
import contextMiddleware from "./middlewares/database.middleware.js";

const app = express();
const PORT = process.env.PORT || 4000;

/*
====================================================
🔹 DATABASE INITIALIZATION
====================================================
*/
const startServer = async () => {
  try {
    await connectDB();
    associateModels();
    console.log("✅ Database connected");

    /*
    ====================================================
    🔹 MIDDLEWARES
    ====================================================
    */

    app.use(cookieParser());

    app.use(
      express.json({
        verify: (req, res, buff) => {
          req.rawBody = buff;
        },
      })
    );

    app.use(express.urlencoded({ extended: true }));

    app.use(
      cors({
        origin: process.env.FRONTEND_URL,
        credentials: true,
      })
    );

    app.use(reqMiddleware);
    app.use(contextMiddleware);
    app.use(responseMiddleware);

    /*
    ====================================================
    🔹 ROUTES
    ====================================================
    */

    app.get("/", (req, res) => {
      res.json({ status: "OK" });
    });

    app.use("/api/v1", router);

    /*
    ====================================================
    🔹 ERROR HANDLER
    ====================================================
    */

    app.use(errorHandler);

    /*
    ====================================================
    🚀 START SERVER (RENDER COMPATIBLE)
    ====================================================
    */

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
