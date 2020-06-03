import { ApolloClient } from "apollo-client";
import { InMemoryCache, NormalizedCacheObject } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import gql from "graphql-tag";
import { ChatMessage, ChatMessageInput } from "../chat/ChatMessage";
import { IChatActions } from "./chatActions";
import * as socketIo from "socket.io-client";

declare var SOCKET_URL: string;
declare var ENDPOINT_URL: string;

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: ENDPOINT_URL,
});

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  link,
});

const getMessages = async () => {
  const response = await client.query<{ messages: ChatMessage[] }>({
    query: gql`
      query {
        messages {
          text
          id
          date
          author
          userId
        }
      }
    `,
  });

  return response.data.messages;
};

const addMessage = async (chatMessage: ChatMessageInput) => {
  const response = await client.mutate<{
    success: boolean;
    message: ChatMessage;
  }>({
    variables: {
      message: chatMessage,
    },
    mutation: gql`
      mutation addMessage($message: ChatMessageInput) {
        addMessage(message: $message) {
          success
          message {
            text
            id
            date
            author
            userId
          }
        }
      }
    `,
  });

  return response.data?.message;
};

const subscribe = (onMessageReceived: (chatMessage: ChatMessage) => {}) => {
  const io = socketIo.connect(SOCKET_URL);

  io.on("CHAT_MESSAGE_ADDED", (chatMessage: ChatMessage) => {
    onMessageReceived(chatMessage);
  });

  return () => {
    io.disconnect();
  };
};

export const ChatActions: IChatActions = {
  subscribe,
  getMessages,
  addMessage,
};
