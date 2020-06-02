import { ApolloClient } from "apollo-client";
import { InMemoryCache, NormalizedCacheObject } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import gql from "graphql-tag";
import { ChatMessage, ChatMessageInput } from "../chat/ChatMessage";
import { IChatActions } from "./chatActions";
import { WebSocketLink } from "apollo-link-ws";
import { split } from "apollo-link";
import { getMainDefinition } from "apollo-utilities";

const cache = new InMemoryCache();
const httpLink = new HttpLink({
  uri: "http://localhost:4000/",
});

const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000/`,
  options: {
    reconnect: true,
  },
});

const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

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
  const observable = client.subscribe<{ addedMessage: ChatMessage }>({
    query: gql`
      subscription {
        addedMessage {
          text
          id
          userId
        }
      }
    `,
  });
  console.info("observing");
  observable.subscribe({
    next(value) {
      console.info(value, "xxxxxxxxxxxxx");
    },
  });
};

export const ChatActions: IChatActions = {
  subscribe,
  getMessages,
  addMessage,
};
