import { BufferMemory } from "langchain/memory";
import { UpstashRedisChatMessageHistory } from "@langchain/community/stores/message/upstash_redis";
import { getClient } from "@/lib/redis";

const client = getClient();

export const memory = new BufferMemory({
  chatHistory: new UpstashRedisChatMessageHistory({
    sessionId: new Date().toISOString(), // Or some other unique identifier for the conversation
    client,
  }),
});
