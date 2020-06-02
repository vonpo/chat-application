import * as React from "react";
import {
  createContext,
  useReducer,
  Reducer,
  Dispatch,
  useContext,
  useEffect,
} from "react";
import { ChatMessage as ChatMessageProps, ChatMessage } from "./ChatMessage";
import { useUser } from "../user/userContext";

export interface Chat {
  messages: ChatMessage[];
  unreadMessages: ChatMessage[];
}

const mockMessages: ChatMessageProps[] = Array.from(Array(3).keys()).map(
  (e, index) => ({
    text: "asdas" + index,
    id: "test" + index,
    author: "test",
    userId: "anonymous",
    date: Date.now(),
  })
);

const initialState: Chat = {
  messages: mockMessages,
  unreadMessages: [],
};

type AddUnreadChatMessage = {
  readonly type: "AddUnreadChatMessage";
  readonly value: ChatMessage;
};

type AddChatMessage = {
  readonly type: "AddChatMessage";
  readonly value: ChatMessage;
};

type ReadAllMessages = {
  readonly type: "ReadAllMessages";
};

type Actions = AddChatMessage | ReadAllMessages | AddUnreadChatMessage;

export const ChatContext = createContext<{
  state: Chat;
  dispatch: Dispatch<Actions>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const useChatContext = () => useContext(ChatContext);
export const useUnreadMessagesContext = () => {
  const {
    state: { unreadMessages },
  } = useChatContext();

  return unreadMessages.length;
};
const reducer = (state: Chat, action: Actions) => {
  switch (action.type) {
    case "ReadAllMessages": {
      return {
        ...state,
        unreadMessages: [],
      };
    }
    case "AddUnreadChatMessage": {
      return {
        ...state,
        unreadMessages: [...state.unreadMessages, action.value],
        messages: [...state.messages, action.value],
      };
    }
    case "AddChatMessage": {
      return {
        ...state,
        messages: [...state.messages, action.value],
      };
    }
    default:
      return state;
  }
};

export const useChat = () => {
  const { id } = useUser();
  const [state, dispatch] = useReducer<Reducer<Chat, Actions>>(
    reducer,
    initialState
  );

  useEffect(() => {
    // TODO dev helper to add remove change messages.
    // @ts-ignore
    window.setChatMessage = (
      message: string,
      author: string,
      read: boolean
    ) => {
      dispatch({
        type: read ? "AddChatMessage" : "AddUnreadChatMessage",
        value: {
          userId: id,
          author: author,
          date: Date.now(),
          id: Date.now().toString(),
          text: message,
        },
      });
    };

    // @ts-ignore
    window.readAllMessages = () => {
      dispatch({
        type: "ReadAllMessages",
      });
    };
  });
  return { state, dispatch };
};
