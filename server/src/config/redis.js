import Redis from "ioredis";

let redisClient;

if (process.env.NODE_ENV === "development") {
  // Production (Render)
  redisClient = new Redis(
    "rediss://red-d6c04uh4tr6s73d7n7tg:F4M8UGIDS6Vfn5AtXZw0UrxyiC5iRzjO@oregon-keyvalue.render.com:6379",
    {
      maxRetriesPerRequest: null,
      enableReadyCheck: true,
    },
  );
} else {
  // Local development
  redisClient = new Redis({
    host: process.env.REDIS_HOST || "127.0.0.1",
    port: process.env.REDIS_PORT || 6379,
    maxRetriesPerRequest: null,
    enableReadyCheck: true,
  });
}

redisClient.on("connect", () => {
  console.log("✅ Redis connected");
});

redisClient.on("error", (err) => {
  console.error("❌ Redis error:", err);
});

export { redisClient };
