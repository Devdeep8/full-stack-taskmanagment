// src/middlewares/reqMiddleware.js
import { httpStatus } from "../utils/http-status.js";
import AppError from "../utils/appError.js";
import { v6 as uuidv6 } from "uuid";

const reqMiddleware = async (req, res, next) => {
  try {

    
    const incomingId = req.headers["x-request-id"];

    const requestId = incomingId || uuidv6();

    req.requestId = requestId;
    res.setHeader("x-request-id", requestId);
    // ------------------------
    // 1️⃣ Body & Content-Type checks (optional if needed)
    // ------------------------
    const METHODS_WITH_BODY = ["POST", "PUT", "PATCH"];
    if (METHODS_WITH_BODY.includes(req.method)) {
      const contentType = req.headers["content-type"];
      if (!contentType || !contentType.includes("application/json")) {
        const error = new AppError(
          "Content-Type must be application/json",
          httpStatus.CONTENT_TYPE,
        );

        throw error;
      }

      if (!req.body || Object.keys(req.body).length === 0) {
        const error = new AppError(
          "Request body is required",
          httpStatus.BAD_REQUEST,
        );
        throw error;
      }
    }

    // ✅ DB is healthy, body is okay → continue
    next();
  } catch (err) {
    next(err); // central error handler will send the response
  }
};

export default reqMiddleware;
