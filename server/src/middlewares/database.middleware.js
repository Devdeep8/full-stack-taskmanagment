// src/middlewares/contextMiddleware.js
import { db } from "../models/index.js";         
import { redisClient } from "../config/redis.js"; 
import { v6 as uuidv6 } from "uuid";

export default  function contextMiddleware(req, res, next)  {
  const incomingId = req.headers["x-request-id"];
  const requestId = incomingId || uuidv6();
  req.requestId = requestId;
  res.setHeader("x-request-id", requestId);

  req.context = {
    db,
    redis: redisClient,
    requestId,
    startTime: Date.now()
  };

  next();
};
