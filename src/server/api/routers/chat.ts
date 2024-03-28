import { z } from "zod";
import { v4 as uuidv4 } from "uuid";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { getClient } from "@/lib/redis";

const messageSchema = z.object({
  id: z
    .string()
    .optional()
    .default(() => uuidv4())
    .describe("The message ID"),
  content: z.string().describe("The message content"),
  createdAt: z.string().optional().describe("The message creation timestamp"),
  role: z
    .enum(["user", "assistant", "function", "data", "system", "tool"])
    .default("user")
    .describe("The role of the message sender"),
});

export const chatRouter = createTRPCRouter({
  sendMessages: publicProcedure
    .input(
      z.object({
        messages: z.array(messageSchema).describe("The messages to send"),
        chatId: z.string().describe("The chat ID"),
        userId: z.string().describe("The user ID"),
      }),
    )
    .mutation(async ({ input }) => {
      const redis = getClient();
      await Promise.all(
        input.messages.map(async (message) => {
          const messageId = message.id;
          // Check if the message ID already exists in the set
          const isDuplicate = await redis.sismember(
            `chat:${input.userId}:${input.chatId}:messageIds`,
            messageId,
          );

          if (!isDuplicate) {
            // Add the message ID to the set
            await redis.sadd(
              `chat:${input.userId}:${input.chatId}:messageIds`,
              messageId,
            );
            // Add the message to the Redis list
            await redis.rpush(
              `chat:${input.userId}:${input.chatId}`,
              JSON.stringify(message),
            );
          }
        }),
      );
    }),
  getAll: publicProcedure
    .input(
      z.object({
        userId: z.string().describe("The user ID"),
      }),
    )
    .query(async ({ input }) => {
      const redis = getClient();
      const keys = await redis.keys(`chat:${input.userId}:*`);

      const chats: any[] = [];

      for (const key of keys) {
        const [, _userId, chatId] = key.split(":");

        const messages = await redis.lrange(
          `${key.replace(":messageIds", "")}`,
          0,
          -1,
        );

        const chat = {
          chatId,
          messages,
        };

        if (!chats.map((c: any) => c.chatId).includes(chat.chatId)) {
          chats.push(chat);
        }
      }

      return chats;
    }),
  getChatById: publicProcedure
    .input(
      z.object({
        userId: z.string().describe("The user ID"),
        chatId: z.string().describe("The chat ID"),
      }),
    )
    .query(async ({ input }) => {
      const redis = getClient();
      const messages = await redis.lrange(
        `chat:${input.userId}:${input.chatId}`,
        0,
        -1,
      );

      const chat = {
        chatId: input.chatId,
        messages: messages
          .map((m: string) => JSON.parse(JSON.stringify(m)))
          .sort(
            (a, b) =>
              new Date(a.createdAt as string).getTime() -
              new Date(b.createdAt as string).getTime(),
          ),
      };

      return chat;
    }),
});
