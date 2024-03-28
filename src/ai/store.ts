import { getClient } from "@/lib/redis";
import { UpstashRedisStore } from "@langchain/community/storage/upstash_redis";

const client = getClient();

export const store = new UpstashRedisStore({
  client,
});

export const encoder = new TextEncoder();
export const decoder = new TextDecoder();
