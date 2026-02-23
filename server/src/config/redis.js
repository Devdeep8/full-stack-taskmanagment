import Redis from "ioredis";

const redisClient = new Redis(
  process.env.NODE_ENV === "production"
    ? process.env.REDIS_URL
    : {
        host: process.env.REDIS_HOST || "127.0.0.1",
        port: process.env.REDIS_PORT || 6379,
      },
  {
    maxRetriesPerRequest: null,
    enableReadyCheck: true,
  }
);

redisClient.on("connect", () => {
  console.log("✅ Redis connected");
});

redisClient.on("error", (err) => {
  console.error("❌ Redis error:", err);
});

export { redisClient };
