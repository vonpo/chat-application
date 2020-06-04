import {
  createContext,
  useReducer,
  Reducer,
  Dispatch,
  useContext,
  useEffect,
  useRef,
} from "react";
import { ChatMessage, ChatMessageInput } from "./ChatMessage";
import { useUser } from "../user/userContext";
import { ChatActions } from "../db";
import { useDetectPath } from "../../route/useDetectPath";

export interface Chat {
  messages: ChatMessage[];
  unreadMessages: ChatMessage[];
}

const initialState: Chat = {
  messages: [],
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

type SetMessages = {
  readonly type: "SetMessages";
  readonly value: ChatMessage[];
};

type Actions =
  | AddChatMessage
  | ReadAllMessages
  | AddUnreadChatMessage
  | SetMessages;

export const Index = createContext<{
  state: Chat;
  dispatch: Dispatch<Actions>;
  sendMessage(
    chatMessage: ChatMessageInput
  ): Promise<ChatMessage | undefined> | null;
}>({
  state: initialState,
  dispatch: () => null,
  sendMessage: () => null,
});

export const useChatContext = () => useContext(Index);
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
    case "SetMessages": {
      return {
        ...state,
        messages: action.value,
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
  const isChatTab = useDetectPath("/");
  const chatTabRef = useRef<boolean>(isChatTab);

  chatTabRef.current = isChatTab;

  /**
   * Send chat message.
   *
   * @param {ChatMessage} chatMessage
   */
  const sendMessage = (chatMessage: ChatMessage) => {
    return ChatActions.addMessage(chatMessage);
  };
  const [state, dispatch] = useReducer<Reducer<Chat, Actions>>(
    reducer,
    initialState
  );

  // Load remote messages.
  useEffect(() => {
    const unsubscribe = ChatActions.subscribe((chatMessage) => {
      if (id === chatMessage.userId || chatTabRef.current) {
        dispatch({ type: "AddChatMessage", value: chatMessage });
        return;
      }

      dispatch({ type: "AddUnreadChatMessage", value: chatMessage });
    });

    (async () => {
      const messages = await ChatActions.getMessages();

      dispatch({ type: "SetMessages", value: messages });
    })();

    return unsubscribe;
  }, []);

  return { state, dispatch, sendMessage };
};
