import { getClient } from "./redis";

const redis = getClient();

interface Message {
  sender: string;
  message: string;
  timestamp: number;
}

export class ChatService {
  async saveMessage(
    chatId: string,
    sender: string,
    message: string,
  ): Promise<void> {
    const messageObject: Message = {
      sender,
      message,
      timestamp: Date.now(),
    };

    await redis.rpush(`chat:${chatId}`, JSON.stringify(messageObject));
  }

  async retrieveMessages(chatId: string): Promise<Message[]> {
    const messagesString: string[] = await redis.lrange(
      `chat:${chatId}`,
      0,
      -1,
    );
    const messages: Message[] = messagesString.map((messageString) =>
      JSON.parse(messageString),
    );
    return messages;
  }
}
