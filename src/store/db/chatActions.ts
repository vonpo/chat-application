import { ChatMessage, ChatMessageInput } from "../chat/ChatMessage";

export interface IChatActions {
  subscribe(onMessageReceived: (chatMessage: ChatMessage) => any): () => void;
  getMessages(): Promise<ChatMessage[]>;
  addMessage(chatMessage: ChatMessageInput): Promise<ChatMessage | undefined>;
}
