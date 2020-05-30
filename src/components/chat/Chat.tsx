import * as React from "react";
import { FunctionComponent } from "react";

interface ChatMessageProps {
  id: string;
  text: string;
}

const ChatMessage: FunctionComponent<ChatMessageProps> = ({ text }) => {
  return <div>{text}</div>;
};

const chatMessages: ChatMessageProps[] = Array.from(Array(200).keys()).map(
  (e, index) => ({
    text: "asdas" + index,
    id: "test",
  })
);

export const Chat: FunctionComponent = () => {
  return <div>{chatMessages.map(ChatMessage)}</div>;
};
