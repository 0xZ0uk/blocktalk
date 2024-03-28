import { env } from "@/env";
import { ChatOpenAI } from "@langchain/openai";

export const chatgpt = new ChatOpenAI({
  openAIApiKey: env.NEXT_PUBLIC_OPENAI_API_KEY,
  modelName: "gpt-3.5-turbo-16k",
  streaming: true,
});
