// src/middlewares/reqMiddleware.js
import { httpStatus } from "../utils/http-status.js";
import AppError from "../utils/appError.js";


const reqMiddleware = async (req, res, next) => {
  try {
    // ------------------------


    // ------------------------
    // Validate body for POST/PUT/PATCH
    const METHODS_WITH_BODY = ["POST", "PUT", "PATCH"];
    if (METHODS_WITH_BODY.includes(req.method)) {
      const contentType = req.headers["content-type"];
      if (!contentType || !contentType.includes("application/json")) {
        throw new AppError(
          "Content-Type must be application/json",
          httpStatus.CONTENT_TYPE,
        );
      }
    }

    // ------------------------
    // Attach DB, Redis, and base context

    next();
  } catch (err) {
    next(err);
  }
};

export default reqMiddleware;
