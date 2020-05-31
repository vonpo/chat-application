import { ChatMessage } from "../interfaces/ChatMessage";

type SetDarkTheme = {
  readonly type: "SetDarkTheme";
};

type SetWhiteTheme = {
  readonly type: "SetWhiteTheme";
};

type ChaneLanguage = {
  readonly type: "ChangeLanguage";
  readonly value: string;
};

type ChangeDateFormat = {
  readonly type: "ChangeDateFormat";
  readonly value: string;
};

type AddChatMessage = {
  readonly type: "AddChatMessage";
  readonly value: ChatMessage;
};
export type Actions =
  | SetDarkTheme
  | SetWhiteTheme
  | ChaneLanguage
  | ChangeDateFormat
  | AddChatMessage;
