export interface ChatMessage {
  id: string;
  text: string;
  author: string;
  date: number;
  userId: string;
}

export interface ChatMessageInput {
  userId: string;
  text: string;
  author: string;
}
