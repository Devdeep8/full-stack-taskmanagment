// base.controller.js
import { httpStatus } from "../utils/http-status.js";
import AppError from "../utils/appError.js";

export class BaseController {
  constructor() {
    this.httpStatus = httpStatus;
    this.controllerName = this.constructor.name;
  }

  /**
   * Wrap async controller methods to catch errors
   */
  asyncHandler = (fn) => {
    return async (req, res, next) => {
      try {
        await fn(req, res, next);
      } catch (error) {
        next(error);
      }
    };
  };

  /**
   * Execute a service and attach result to res.locals
   */
  async executeService(ServiceClass, req, res, args = {}) {
    const context = this.buildContext(req);
    const service = new ServiceClass(args, context);
    const result = await service.execute();
    
    // Attach to res.locals for response middleware
    res.locals.serviceResult = result;
    return result;
  }

  /**
   * Build context from request
   */
  buildContext(req) {
    return {
      requestId: req.id || req.headers['x-request-id'],
      user: req.user,
      ip: req.ip,
      userAgent: req.get('user-agent'),
      path: req.path,
      method: req.method,
    };
  }

  /**
   * Extract pagination params from query
   */
  getPaginationParams(req) {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    return { page, limit, offset };
  }

  /**
   * Extract filter params from query
   */
  getFilterParams(req, allowedFilters = []) {
    const filters = {};
    
    allowedFilters.forEach(filter => {
      if (req.query[filter] !== undefined) {
        filters[filter] = req.query[filter];
      }
    });

    return filters;
  }

  /**
   * Extract sort params from query
   */
  getSortParams(req, defaultSort = 'createdAt', defaultOrder = 'DESC') {
    return {
      sortBy: req.query.sortBy || defaultSort,
      order: req.query.order?.toUpperCase() || defaultOrder,
    };
  }

  /**
   * Extract search params from query
   */
  getSearchParams(req) {
    return {
      search: req.query.search || req.query.q || '',
      searchFields: req.query.searchFields?.split(',') || [],
    };
  }

  /**
   * Validate required fields
   */
  validateRequired(data, requiredFields = []) {
    const missing = requiredFields.filter(field => !data[field]);
    
    if (missing.length > 0) {
      throw new AppError(
        `Missing required fields: ${missing.join(', ')}`,
        this.httpStatus.BAD_REQUEST,
        { code: 'VALIDATION_ERROR', type: 'VALIDATION_ERROR' },
        this.controllerName
      );
    }
  }

  /**
   * Validate allowed fields (prevent mass assignment)
   */
  validateAllowedFields(data, allowedFields = []) {
    const extraFields = Object.keys(data).filter(
      field => !allowedFields.includes(field)
    );
    
    if (extraFields.length > 0) {
      throw new AppError(
        `Unexpected fields: ${extraFields.join(', ')}`,
        this.httpStatus.BAD_REQUEST,
        { code: 'INVALID_FIELDS', type: 'VALIDATION_ERROR' },
        this.controllerName
      );
    }
  }

  /**
   * Pick only allowed fields from object
   */
  pickFields(data, allowedFields = []) {
    return allowedFields.reduce((acc, field) => {
      if (data[field] !== undefined) {
        acc[field] = data[field];
      }
      return acc;
    }, {});
  }

  /**
   * Parse query params into database-ready filters
   */
  parseQueryFilters(req, filterMapping = {}) {
    const filters = {};
    
    Object.entries(filterMapping).forEach(([queryParam, dbField]) => {
      if (req.query[queryParam]) {
        filters[dbField] = req.query[queryParam];
      }
    });

    return filters;
  }

  /**
   * Set status code for response middleware
   */
  setStatusCode(res, statusCode) {
    res.locals.statusCode = statusCode;
  }
}