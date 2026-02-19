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

// 🔹 DB Init
let isConnected = false;

const initDB = async () => {
  if (!isConnected) {
    await connectDB();
    associateModels();
    isConnected = true;
    console.log("✅ Database connected");
  }
};

// 🔹 Middlewares
app.use(cookieParser());

app.use(
  express.json({
    verify: (req, res, buff) => {
      req.rawBody = buff;
    },
  })
);

app.use(express.urlencoded({ extended: true }));

app.use(reqMiddleware);
app.use(contextMiddleware);
app.use(responseMiddleware);

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

// 🔹 Routes
app.get("/", (req, res) => {
  res.json({ status: "OK" });
});

app.use("/api/v1", router);

app.use(errorHandler);

/*
====================================================
✅ LOCAL MODE → run with app.listen
====================================================
*/
if (process.env.NODE_ENV !== "production") {
  initDB().then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Local server running on http://localhost:${PORT}`);
    });
  });
} 
 
/*
====================================================
☁️ VERCEL MODE → just export app
====================================================
*/
export default app;
