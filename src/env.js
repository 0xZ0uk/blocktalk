import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    NODE_ENV: z.enum(["development", "test", "production"]),
    EXPO_API_URL: z.string().min(1),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    // NEXT_PUBLIC_CLIENTVAR: z.string(),
    NEXT_PUBLIC_RPC_URL: z.string().min(1),
    NEXT_PUBLIC_OPENAI_API_KEY: z.string().min(1),
    NEXT_PUBLIC_UPSTASH_URL: z.string().min(1),
    NEXT_PUBLIC_UPSTASH_TOKEN: z.string().min(1),
    NEXT_PUBLIC_RPC_KEY: z.string().min(1),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    EXPO_API_URL: process.env.EXPO_API_URL,
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_RPC_URL: process.env.NEXT_PUBLIC_RPC_URL,
    NEXT_PUBLIC_OPENAI_API_KEY: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    NEXT_PUBLIC_UPSTASH_URL: process.env.NEXT_PUBLIC_UPSTASH_URL,
    NEXT_PUBLIC_UPSTASH_TOKEN: process.env.NEXT_PUBLIC_UPSTASH_TOKEN,
    NEXT_PUBLIC_RPC_KEY: process.env.NEXT_PUBLIC_RPC_KEY,
    // NEXT_PUBLIC_CLIENTVAR: process.env.NEXT_PUBLIC_CLIENTVAR,
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  /**
   * Makes it so that empty strings are treated as undefined. `SOME_VAR: z.string()` and
   * `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true,
});