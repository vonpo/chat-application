import * as React from "react";
import {
  createContext,
  useReducer,
  Reducer,
  Dispatch,
  useContext,
} from "react";
import {
  ChatMessage as ChatMessageProps,
  ChatMessage,
} from "../interfaces/ChatMessage";

export interface Settings {
  messages: ChatMessage[];
}

const mockMessages: ChatMessageProps[] = Array.from(Array(15).keys()).map(
  (e, index) => ({
    text: "asdas" + index,
    id: "test" + index,
    author: "test",
    date: Date.now(),
  })
);

const initialState: Settings = {
  messages: mockMessages,
};

type AddChatMessage = {
  readonly type: "AddChatMessage";
  readonly value: ChatMessage;
};

type Actions = AddChatMessage;

export const ChatContext = createContext<{
  state: Settings;
  dispatch: Dispatch<Actions>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const useChatContext = () => useContext(ChatContext);

const reducer = (state: Settings, action: Actions) => {
  switch (action.type) {
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
  const [state, dispatch] = useReducer<Reducer<Settings, Actions>>(
    reducer,
    initialState
  );

  return { state, dispatch };
};
