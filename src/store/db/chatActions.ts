import { ChatMessage, ChatMessageInput } from "../chat/ChatMessage";

export interface IChatActions {
  getMessages(): Promise<ChatMessage[]>;
  addMessage(chatMessage: ChatMessageInput): Promise<ChatMessage | undefined>;
}
