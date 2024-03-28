import { env } from "@/env";
import { Redis } from "@upstash/redis";

export const getClient = () => {
  if (!env.NEXT_PUBLIC_UPSTASH_URL || !env.NEXT_PUBLIC_UPSTASH_TOKEN) {
    throw new Error(
      "UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN must be set in the environment",
    );
  }
  const client = new Redis({
    url: env.NEXT_PUBLIC_UPSTASH_URL,
    token: env.NEXT_PUBLIC_UPSTASH_TOKEN,
  });
  return client;
};
