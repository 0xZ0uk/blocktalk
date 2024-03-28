import { AIMessage, ChatMessage, HumanMessage } from "@langchain/core/messages";
import { Message as VercelChatMessage } from "ai";

export const convertVercelMessageToLangChainMessage = (
  message: VercelChatMessage,
) => {
  if (message.role === "user") {
    return new HumanMessage(message.content);
  } else if (message.role === "assistant") {
    return new AIMessage(message.content);
  } else {
    return new ChatMessage(message.content, message.role);
  }
};
