// src/middlewares/reqMiddleware.js
import { httpStatus } from "../utils/http-status.js";
import AppError from "../utils/appError.js";
import { v6 as uuidv6 } from "uuid";
import { db } from "../models/index.js";         
import { redisClient } from "../config/redis.js"; 

const reqMiddleware = async (req, res, next) => {
  try {
    // ------------------------
    // Request ID
    const incomingId = req.headers["x-request-id"];
    const requestId = incomingId || uuidv6();
    req.requestId = requestId;
    res.setHeader("x-request-id", requestId);

    // ------------------------
    // Validate body for POST/PUT/PATCH
    const METHODS_WITH_BODY = ["POST", "PUT", "PATCH"];
    if (METHODS_WITH_BODY.includes(req.method)) {
      const contentType = req.headers["content-type"];
      if (!contentType || !contentType.includes("application/json")) {
        throw new AppError(
          "Content-Type must be application/json",
          httpStatus.CONTENT_TYPE
        );
      }

      if (!req.body || Object.keys(req.body).length === 0) {
        throw new AppError(
          "Request body is required",
          httpStatus.BAD_REQUEST
        );
      }
    }

    // ------------------------
    // Attach DB, Redis, and base context
    req.context = {
      db,                  // Database client
      redis: redisClient,  // Redis client
      requestId,
      startTime: Date.now()
    };

    next();
  } catch (err) {
    next(err); 
  }
};

export default reqMiddleware;
