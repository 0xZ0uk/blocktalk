import { createOpenAIFunctionsAgent } from "langchain/agents";
import { chatgpt } from "./models/chatgpt-3-turbo";
import { prompt } from "./prompts/system";
import { tools } from "./tools/solana";

export const agent = await createOpenAIFunctionsAgent({
  llm: chatgpt,
  tools,
  prompt,
});
