import { IChatActions } from "./chatActions";
import { ChatMessage, ChatMessageInput } from "../chat/ChatMessage";

const messages: ChatMessage[] = [];
let onMessageReceivedHandler: null | ((chatMessage: ChatMessage) => any);

const addMessage = (chatMessage: ChatMessageInput) => {
  const message = {
    ...chatMessage,
    id: Date.now().toString(),
    date: Date.now(),
  };

  messages.push(message);

  if (onMessageReceivedHandler) {
    onMessageReceivedHandler(message);
  }

  return Promise.resolve(message);
};

const getMessages = () => {
  return Promise.resolve([...messages]);
};

const subscribe = (onMessageReceived: (chatMessage: ChatMessage) => any) => {
  onMessageReceivedHandler = onMessageReceived;

  return () => {
    onMessageReceivedHandler = null;
  };
};

/**
 * Mock simple chat when backend is not provided.
 */
export const ChatActions: IChatActions = {
  subscribe,
  getMessages,
  addMessage,
};
