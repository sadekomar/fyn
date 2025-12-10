import { createClient } from "redis";
import { Request, Response } from "express";

// singleton redis client
const redisClient = createClient({
  url: process.env.REDIS_URL,
});

let connectionPromise: Promise<void> | null = null;

async function ensureConnected() {
  if (redisClient.isOpen) return;

  if (connectionPromise) {
    return connectionPromise;
  }

  connectionPromise = (async () => {
    try {
      await redisClient.connect();
      console.log("Redis client connected");
    } catch (error) {
      console.error("Failed to connect to Redis:", error);
      connectionPromise = null;
      throw error;
    }
  })();

  return connectionPromise;
}

redisClient.on("error", (err) => {
  console.error("Redis Client Error:", err);
});

redisClient.on("connect", () => {
  console.log("Redis client connecting...");
});

redisClient.on("ready", () => {
  console.log("Redis client ready");
});

// Higher order function and a key generator mofos
// why not add personality to our code i mean it's already bleak enough why not just add more to it now.
type CacheOptions<T> = {
  key: (req: Request) => string;
  handlerCallback: (req: Request, res: Response) => Promise<T>;
  ttlSeconds?: number;
};

export function withCache<T>({
  key,
  handlerCallback,
  ttlSeconds,
}: CacheOptions<T>) {
  return async (req: Request, res: Response) => {
    console.time("withCache");
    const cacheKey = key(req);
    await ensureConnected();

    try {
      const hit = await redisClient.get(cacheKey);
      if (hit) {
        console.log("cache hit");
        console.timeEnd("withCache");
        return res.status(200).json(JSON.parse(hit));
      }
    } catch (error) {
      console.error("Redis Cache Error (Safe to ignore):", error);
    }

    const payload = await handlerCallback(req, res);
    console.log("payload", payload);

    await redisClient.set(cacheKey, JSON.stringify(payload), {
      expiration: {
        type: "EX",
        value: ttlSeconds ?? 12 * 60 * 60,
      },
    });

    console.log("cache miss");
    console.timeEnd("withCache");
    return res.status(200).json(payload);
  };
}
