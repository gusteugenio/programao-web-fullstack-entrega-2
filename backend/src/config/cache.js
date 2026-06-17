import expressRedisCache from "express-redis-cache";

export const cache = expressRedisCache({
  host: process.env.REDIS_HOST || "127.0.0.1",
  port: Number(process.env.REDIS_PORT || 6379),
  auth_pass: process.env.REDIS_PASSWORD || undefined,
  prefix: "books-api",
  expire: Number(process.env.CACHE_TTL_SECONDS || 60),
});

cache.on("error", (error) => {
  console.error("Redis cache error:", error.message);
});
