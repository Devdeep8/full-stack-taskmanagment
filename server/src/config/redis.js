import Redis from "ioredis";

export const redisClient = new Redis({
  host: "localhost",  // or docker container host
  port: 6379,
  maxRetriesPerRequest: null,
  enableReadyCheck: true,
});

redisClient.on("connect", () => console.log("✅ Redis connected"));
redisClient.on("error", (err) => console.error("Redis error:", err));
