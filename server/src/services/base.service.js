// base.service.js
import { httpStatus } from "../utils/http-status.js";
import { db } from "../models/index.js";
import AppError from "../utils/appError.js";
import { redisClient } from "../config/redis.js";

export class BaseService {
  constructor(args = {}, context = {}) {
    this.error = AppError;
    this.args = args;
    this.context = context;
    this.db = context.db || db;
    this.redis = context.redis || redisClient;
    this.serviceName = this.constructor.name;
    this.httpStatus = httpStatus;
    this.startTime = Date.now();
  }

  async execute() {
    try {
      const result = await this.run();
      if(result){

        this.logSuccess();
      }
      return this.buildSuccessResponse(result);
    } catch (error) {
      (`🟡 4 → message [base.service.js:28]`, error);
      let appError =
        error instanceof AppError
          ? error
          : new AppError(
              "Internal server error",
              this.httpStatus.INTERNAL_SERVER_ERROR,
              { code: "SERVER_ERROR", type: "SERVER_ERROR" },
              this.serviceName,
            );

      // ✅ attach service name if missing
      if (!appError.service) {
        appError.service = this.serviceName;
      }

      this.logError(appError.message);

      throw error;
    }
  }

  async run() {
    throw new Error("Method not implemented");
  }
  /**
   * Build standardized success response
   */
  buildSuccessResponse(result) {
    return {
      data: result, // raw result from service
      meta: {
        service: this.serviceName,
        executionTime: `${Date.now() - this.startTime}ms`,
        requestId: this.context?.requestId,
        timestamp: new Date().toISOString(),
      },
    };
  }

  /**
   * Log success for monitoring
   */
  logSuccess(message = "Operation successful") {
    (`[${this.serviceName}] ✓ Success`,
      {
        message: message,
        service: this.serviceName,
        executionTime: `${Date.now() - this.startTime}ms`,
        requestId: this.context?.requestId,
        timestamp: new Date().toISOString(),
      });
  }

  logError(message = "Operation failed") {
    console.error(`[${this.serviceName}] ✗ Error`, {
      message: message,
      service: this.serviceName,
      executionTime: `${Date.now() - this.startTime}ms`,
      requestId: this.context?.requestId,
      timestamp: new Date().toISOString(),
    });
  }
}
