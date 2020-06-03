import { ChatActions as ApolloChat } from "./apollo";
import { ChatActions as FakeChat } from "./fake";

declare var IN_MEMORY_CHAT: boolean;

export const ChatActions = IN_MEMORY_CHAT ? FakeChat : ApolloChat;
