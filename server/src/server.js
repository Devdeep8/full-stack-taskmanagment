import dotenv from "dotenv";
dotenv.config(); 


import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
//db connection
import { connectDB } from "./config/db.js";
import { associateModels, db } from "./models/index.js";

//middleware
import errorHandler from "./middlewares/error.middleware.js";
import reqMiddleware from "./middlewares/req.middleware.js";
import responseMiddleware from "./middlewares/response.middleware.js";

//routes
import router from "./routes/index.js";
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//custom middleware
app.use(reqMiddleware)
app.use(responseMiddleware)

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  }),
);

app.get("/", async (req, res) => {
  console.log("health check");
  try {
    return res.status(200).json({
      status: "OK",
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.log(error);
  }
});

app.use('/api/v1', router)

//routes


//error handler
app.use(errorHandler);

// ✅ Connect to DB first, then start server
const startServer = async () => {
  await connectDB();
  associateModels();
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port http://localhost:${PORT}`);
  });
};

startServer();

export default app;
